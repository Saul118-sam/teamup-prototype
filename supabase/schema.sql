-- TeamUp MVP schema for Supabase.
-- Run this once in a fresh Supabase project's SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  sport text not null default 'volleyball',
  timezone text not null default 'Asia/Hong_Kong',
  currency text not null default 'HKD',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('admin','captain','finance','coach','member')),
  joined_at timestamptz not null default now(),
  primary key (team_id, user_id)
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  created_by uuid not null references public.profiles(id),
  event_type text not null default 'training' check (event_type in ('training','match','social','meeting')),
  title_zh text not null check (char_length(title_zh) between 1 and 120),
  title_en text,
  event_date date not null,
  meet_time time,
  start_time time not null,
  end_time time,
  venue text,
  notes text,
  status text not null default 'confirmed' check (status in ('draft','confirmed','cancelled','completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attendance (
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null check (status in ('going','maybe','away','pending')),
  updated_at timestamptz not null default now(),
  primary key (event_id, user_id)
);

create table if not exists public.messages (
  id bigint generated always as identity primary key,
  team_id uuid not null references public.teams(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);

create table if not exists public.team_invitations (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  token uuid not null unique default gen_random_uuid(),
  created_by uuid not null references public.profiles(id),
  role text not null default 'member' check (role in ('captain','finance','coach','member')),
  expires_at timestamptz not null default (now() + interval '7 days'),
  max_uses integer not null default 20 check (max_uses between 1 and 100),
  uses_count integer not null default 0 check (uses_count >= 0),
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists team_members_user_id_idx on public.team_members(user_id);
create index if not exists events_team_date_idx on public.events(team_id, event_date, start_time);
create index if not exists messages_team_created_idx on public.messages(team_id, created_at);
create index if not exists attendance_user_idx on public.attendance(user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1), 'TeamUp member')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_team_member(p_team_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.team_members
    where team_id = p_team_id and user_id = (select auth.uid())
  );
$$;

create or replace function public.is_team_admin(p_team_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.team_members
    where team_id = p_team_id
      and user_id = (select auth.uid())
      and role in ('admin','captain')
  );
$$;

create or replace function public.create_team_with_owner(p_name text, p_sport text default 'volleyball')
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_team uuid;
begin
  if v_user is null then raise exception 'Sign in required'; end if;
  if nullif(trim(p_name), '') is null then raise exception 'Team name is required'; end if;

  insert into public.profiles (id, display_name)
  select id, coalesce(split_part(email, '@', 1), 'TeamUp member')
  from auth.users where id = v_user
  on conflict (id) do nothing;

  insert into public.teams (name, sport, created_by)
  values (trim(p_name), coalesce(nullif(trim(p_sport), ''), 'volleyball'), v_user)
  returning id into v_team;

  insert into public.team_members (team_id, user_id, role)
  values (v_team, v_user, 'admin');
  return v_team;
end;
$$;

create or replace function public.create_team_invite(p_team_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_token uuid;
begin
  if not public.is_team_admin(p_team_id) then raise exception 'Only a team admin can invite members'; end if;
  insert into public.team_invitations (team_id, created_by)
  values (p_team_id, auth.uid())
  returning token into v_token;
  return v_token;
end;
$$;

create or replace function public.accept_team_invite(p_token uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_invite public.team_invitations%rowtype;
begin
  if v_user is null then raise exception 'Sign in required'; end if;
  select * into v_invite
  from public.team_invitations
  where token = p_token
  for update;

  if not found then raise exception 'Invite not found'; end if;
  if v_invite.revoked_at is not null then raise exception 'Invite was revoked'; end if;
  if v_invite.expires_at <= now() then raise exception 'Invite has expired'; end if;
  if v_invite.uses_count >= v_invite.max_uses then raise exception 'Invite is full'; end if;

  insert into public.team_members (team_id, user_id, role)
  values (v_invite.team_id, v_user, v_invite.role)
  on conflict (team_id, user_id) do nothing;

  update public.team_invitations
  set uses_count = uses_count + 1
  where id = v_invite.id;
  return v_invite.team_id;
end;
$$;

alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.events enable row level security;
alter table public.attendance enable row level security;
alter table public.messages enable row level security;
alter table public.team_invitations enable row level security;

drop policy if exists "profiles shared team read" on public.profiles;
create policy "profiles shared team read" on public.profiles for select to authenticated
using (
  id = (select auth.uid()) or exists (
    select 1
    from public.team_members mine
    join public.team_members theirs on theirs.team_id = mine.team_id
    where mine.user_id = (select auth.uid()) and theirs.user_id = profiles.id
  )
);
drop policy if exists "profiles own update" on public.profiles;
create policy "profiles own update" on public.profiles for update to authenticated
using (id = (select auth.uid())) with check (id = (select auth.uid()));

drop policy if exists "teams member read" on public.teams;
create policy "teams member read" on public.teams for select to authenticated
using (public.is_team_member(id));
drop policy if exists "teams admin update" on public.teams;
create policy "teams admin update" on public.teams for update to authenticated
using (public.is_team_admin(id)) with check (public.is_team_admin(id));

drop policy if exists "members team read" on public.team_members;
create policy "members team read" on public.team_members for select to authenticated
using (public.is_team_member(team_id));
drop policy if exists "members admin update" on public.team_members;
create policy "members admin update" on public.team_members for update to authenticated
using (public.is_team_admin(team_id)) with check (public.is_team_admin(team_id));

drop policy if exists "events member read" on public.events;
create policy "events member read" on public.events for select to authenticated
using (public.is_team_member(team_id));
drop policy if exists "events admin insert" on public.events;
create policy "events admin insert" on public.events for insert to authenticated
with check (created_by = (select auth.uid()) and public.is_team_admin(team_id));
drop policy if exists "events admin update" on public.events;
create policy "events admin update" on public.events for update to authenticated
using (public.is_team_admin(team_id)) with check (public.is_team_admin(team_id));
drop policy if exists "events admin delete" on public.events;
create policy "events admin delete" on public.events for delete to authenticated
using (public.is_team_admin(team_id));

drop policy if exists "attendance team read" on public.attendance;
create policy "attendance team read" on public.attendance for select to authenticated
using (exists (select 1 from public.events e where e.id = event_id and public.is_team_member(e.team_id)));
drop policy if exists "attendance own insert" on public.attendance;
create policy "attendance own insert" on public.attendance for insert to authenticated
with check (user_id = (select auth.uid()) and exists (select 1 from public.events e where e.id = event_id and public.is_team_member(e.team_id)));
drop policy if exists "attendance own update" on public.attendance;
create policy "attendance own update" on public.attendance for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

drop policy if exists "messages team read" on public.messages;
create policy "messages team read" on public.messages for select to authenticated
using (public.is_team_member(team_id));
drop policy if exists "messages member insert" on public.messages;
create policy "messages member insert" on public.messages for insert to authenticated
with check (
  user_id = (select auth.uid())
  and public.is_team_member(team_id)
  and (event_id is null or exists (select 1 from public.events e where e.id = event_id and e.team_id = messages.team_id))
);
drop policy if exists "messages own delete" on public.messages;
create policy "messages own delete" on public.messages for delete to authenticated
using (user_id = (select auth.uid()) or public.is_team_admin(team_id));

revoke all on public.profiles, public.teams, public.team_members, public.events, public.attendance, public.messages, public.team_invitations from anon;
revoke all on public.team_invitations from authenticated;
grant select, update on public.profiles to authenticated;
grant select, update on public.teams to authenticated;
grant select, update on public.team_members to authenticated;
grant select, insert, update, delete on public.events to authenticated;
grant select, insert, update on public.attendance to authenticated;
grant select, insert, delete on public.messages to authenticated;
grant usage, select on sequence public.messages_id_seq to authenticated;

revoke all on function public.create_team_with_owner(text, text) from public, anon;
revoke all on function public.create_team_invite(uuid) from public, anon;
revoke all on function public.accept_team_invite(uuid) from public, anon;
revoke all on function public.is_team_member(uuid) from public, anon;
revoke all on function public.is_team_admin(uuid) from public, anon;
revoke all on function public.handle_new_user() from public, anon;
grant execute on function public.create_team_with_owner(text, text) to authenticated;
grant execute on function public.create_team_invite(uuid) to authenticated;
grant execute on function public.accept_team_invite(uuid) to authenticated;
grant execute on function public.is_team_member(uuid) to authenticated;
grant execute on function public.is_team_admin(uuid) to authenticated;

do $$
begin
  alter publication supabase_realtime add table public.messages;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.events;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.attendance;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.team_members;
exception when duplicate_object then null;
end $$;
