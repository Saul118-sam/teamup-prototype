(function () {
  "use strict";

  const config = window.TEAMUP_SUPABASE || {};
  const configured = Boolean(config.url && config.publishableKey);
  let client = null;
  let currentUser = null;
  let activeChannel = null;

  function assertReady() {
    if (!configured || !client) throw new Error("TeamUp cloud backend is not configured yet.");
  }

  function initials(name = "") {
    const value = name.trim();
    if (!value) return "TU";
    const words = value.split(/\s+/).filter(Boolean);
    return (words.length > 1 ? words.slice(0, 2).map(word => word[0]).join("") : value.slice(0, 2)).toUpperCase();
  }

  function avatarColor(userId = "") {
    const colors = ["avatar-blue", "avatar-violet", "avatar-green", "avatar-amber", "avatar-coral"];
    const score = Array.from(userId).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[score % colors.length];
  }

  function hktTime(value) {
    if (!value) return "";
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Hong_Kong"
    }).format(new Date(value));
  }

  function displayName(profile, fallbackEmail = "") {
    return profile?.display_name || fallbackEmail.split("@")[0] || "TeamUp member";
  }

  function throwIfError(result) {
    if (result.error) throw result.error;
    return result.data;
  }

  async function initialize(onAuthChange) {
    if (!configured) return { configured: false, session: null };
    if (!window.supabase?.createClient) throw new Error("Supabase library failed to load.");
    client = window.supabase.createClient(config.url, config.publishableKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });

    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    currentUser = data.session?.user || null;

    client.auth.onAuthStateChange((event, session) => {
      currentUser = session?.user || null;
      if (typeof onAuthChange === "function") {
        window.setTimeout(() => onAuthChange(event, session), 0);
      }
    });
    return { configured: true, session: data.session };
  }

  async function sendMagicLink(email, redirectTo) {
    assertReady();
    return throwIfError(await client.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo, shouldCreateUser: true }
    }));
  }

  async function signOut() {
    assertReady();
    await client.auth.signOut();
  }

  async function loadWorkspace(preferredTeamId) {
    assertReady();
    const userResult = await client.auth.getUser();
    const user = throwIfError(userResult).user;
    if (!user) return { user: null, teams: [] };
    currentUser = user;

    const memberships = throwIfError(await client
      .from("team_members")
      .select("team_id,role,joined_at")
      .eq("user_id", user.id)
      .order("joined_at", { ascending: true }));

    if (!memberships.length) {
      const ownProfile = throwIfError(await client.from("profiles").select("*").eq("id", user.id).maybeSingle());
      return { user, profile: ownProfile, teams: [] };
    }

    const teamIds = memberships.map(item => item.team_id);
    const teams = throwIfError(await client.from("teams").select("*").in("id", teamIds));
    const teamId = teamIds.includes(preferredTeamId) ? preferredTeamId : teamIds[0];
    const team = teams.find(item => item.id === teamId);
    const membership = memberships.find(item => item.team_id === teamId);

    const memberRows = throwIfError(await client
      .from("team_members")
      .select("team_id,user_id,role,joined_at")
      .eq("team_id", teamId)
      .order("joined_at", { ascending: true }));
    const memberIds = memberRows.map(item => item.user_id);
    const profiles = memberIds.length
      ? throwIfError(await client.from("profiles").select("id,display_name,avatar_url,created_at").in("id", memberIds))
      : [];
    const profileMap = new Map(profiles.map(profile => [profile.id, profile]));

    const eventRows = throwIfError(await client
      .from("events")
      .select("*")
      .eq("team_id", teamId)
      .order("event_date", { ascending: true })
      .order("start_time", { ascending: true }));
    const eventIds = eventRows.map(item => item.id);
    const attendanceRows = eventIds.length
      ? throwIfError(await client.from("attendance").select("event_id,user_id,status").in("event_id", eventIds))
      : [];
    const messageRows = throwIfError(await client
      .from("messages")
      .select("id,team_id,event_id,user_id,body,created_at")
      .eq("team_id", teamId)
      .order("created_at", { ascending: true })
      .limit(300));

    const emailFallback = user.email || "";
    const ownProfile = profileMap.get(user.id);
    const currentName = displayName(ownProfile, emailFallback);
    const members = memberRows.map(row => {
      const profile = profileMap.get(row.user_id);
      const name = displayName(profile, row.user_id === user.id ? emailFallback : "");
      return {
        id: row.user_id,
        name,
        initials: initials(name),
        role: row.role,
        color: avatarColor(row.user_id),
        status: row.user_id === user.id ? "online" : "member",
        email: row.user_id === user.id ? emailFallback : ""
      };
    });

    const attendanceByEvent = new Map();
    attendanceRows.forEach(row => {
      if (!attendanceByEvent.has(row.event_id)) attendanceByEvent.set(row.event_id, {});
      const profile = profileMap.get(row.user_id);
      attendanceByEvent.get(row.event_id)[displayName(profile, row.user_id === user.id ? emailFallback : "")] = row.status;
    });

    const events = eventRows.map(row => ({
      id: row.id,
      type: row.event_type,
      titleZh: row.title_zh,
      titleEn: row.title_en || row.title_zh,
      date: row.event_date,
      meetTime: String(row.meet_time || row.start_time || "").slice(0, 5),
      startTime: String(row.start_time || "").slice(0, 5),
      endTime: String(row.end_time || "").slice(0, 5),
      venue: row.venue || "",
      notesZh: row.notes || "",
      notesEn: row.notes || "",
      status: row.status,
      attendance: Object.fromEntries(members.map(member => [
        member.name,
        attendanceByEvent.get(row.id)?.[member.name] || "pending"
      ]))
    }));

    const teamMessages = [];
    const threads = Object.fromEntries(events.map(event => [event.id, []]));
    messageRows.forEach(row => {
      const profile = profileMap.get(row.user_id);
      const author = displayName(profile, row.user_id === user.id ? emailFallback : "");
      const item = {
        id: row.id,
        userId: row.user_id,
        author,
        initials: initials(author),
        color: avatarColor(row.user_id),
        time: hktTime(row.created_at),
        textZh: row.body,
        textEn: row.body,
        mine: row.user_id === user.id
      };
      if (row.event_id) {
        if (!threads[row.event_id]) threads[row.event_id] = [];
        threads[row.event_id].push(item);
      } else {
        teamMessages.push(item);
      }
    });

    return {
      user,
      profile: ownProfile,
      currentName,
      currentRole: membership.role,
      teams,
      team,
      state: {
        events,
        messages: teamMessages,
        threads,
        members,
        currentView: "home",
        previousView: "home"
      }
    };
  }

  async function createTeam(name, sport = "volleyball") {
    assertReady();
    return throwIfError(await client.rpc("create_team_with_owner", { p_name: name, p_sport: sport }));
  }

  async function createInvite(teamId) {
    assertReady();
    return throwIfError(await client.rpc("create_team_invite", { p_team_id: teamId }));
  }

  async function acceptInvite(token) {
    assertReady();
    return throwIfError(await client.rpc("accept_team_invite", { p_token: token }));
  }

  async function sendMessage(teamId, body, eventId = null) {
    assertReady();
    return throwIfError(await client.from("messages").insert({
      team_id: teamId,
      event_id: eventId,
      user_id: currentUser.id,
      body
    }).select().single());
  }

  async function createEvent(teamId, values) {
    assertReady();
    return throwIfError(await client.from("events").insert({
      team_id: teamId,
      created_by: currentUser.id,
      event_type: values.type,
      title_zh: values.title,
      title_en: values.title,
      event_date: values.date,
      meet_time: values.meetTime || values.startTime,
      start_time: values.startTime,
      end_time: values.endTime || null,
      venue: values.venue,
      notes: values.notes || "",
      status: "confirmed"
    }).select().single());
  }

  async function setAttendance(eventId, status) {
    assertReady();
    return throwIfError(await client.from("attendance").upsert({
      event_id: eventId,
      user_id: currentUser.id,
      status,
      updated_at: new Date().toISOString()
    }, { onConflict: "event_id,user_id" }).select().single());
  }

  function subscribe(teamId, onChange) {
    assertReady();
    if (activeChannel) client.removeChannel(activeChannel);
    let timer;
    const notify = () => {
      clearTimeout(timer);
      timer = setTimeout(() => onChange?.(), 350);
    };
    activeChannel = client.channel(`teamup-${teamId}-${Date.now()}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "messages", filter: `team_id=eq.${teamId}` }, notify)
      .on("postgres_changes", { event: "*", schema: "public", table: "events", filter: `team_id=eq.${teamId}` }, notify)
      .on("postgres_changes", { event: "*", schema: "public", table: "team_members", filter: `team_id=eq.${teamId}` }, notify)
      .on("postgres_changes", { event: "*", schema: "public", table: "attendance" }, notify)
      .subscribe();
    return () => {
      clearTimeout(timer);
      if (activeChannel) client.removeChannel(activeChannel);
      activeChannel = null;
    };
  }

  window.TeamUpBackend = {
    configured,
    initialize,
    sendMagicLink,
    signOut,
    loadWorkspace,
    createTeam,
    createInvite,
    acceptInvite,
    sendMessage,
    createEvent,
    setAttendance,
    subscribe
  };
})();
