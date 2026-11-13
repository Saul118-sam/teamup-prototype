# TeamUp shared backend setup

TeamUp uses Supabase for passwordless email login, the shared PostgreSQL database, team invitations and live updates.

## 1. Create the project

1. Create a free Supabase project.
2. Open **SQL Editor**.
3. Copy and run all of `supabase/schema.sql`.

## 2. Configure login redirects

In Supabase **Authentication → URL Configuration** set:

- Site URL: `https://saul118-sam.github.io/teamup-prototype/`
- Redirect URL: `https://saul118-sam.github.io/teamup-prototype/**`

Email Magic Link login is enabled by default on hosted Supabase projects.

## 3. Connect the website

In Supabase **Project Settings → API**, copy the Project URL and the browser-safe publishable key. Put them into `dist/supabase-config.js`:

```js
window.TEAMUP_SUPABASE = {
  url: "https://YOUR_PROJECT.supabase.co",
  publishableKey: "YOUR_PUBLISHABLE_KEY"
};
```

The publishable key is designed for browser use and is protected by the Row Level Security rules in `supabase/schema.sql`.

Never use or commit a `service_role` key. It bypasses Row Level Security.

## 4. Test

1. Open the TeamUp site and enter your email.
2. Click the one-time link in the email.
3. Create the first test team (the default name is `臻子 Aspiring`).
4. Use **邀請隊員** to copy a seven-day invite link.
5. Open the link in another browser and sign in with another email.
6. Send a Team Chat message and confirm that it appears for both users.

## What the security rules enforce

- Signed-out visitors cannot read team data.
- A signed-in user can only read teams they belong to.
- Only admins or captains can create events and invitation links.
- Members can only change their own attendance.
- Members can post messages only as themselves.
- Invite tokens expire after seven days and allow up to 20 joins.
