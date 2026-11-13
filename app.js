const STORAGE_KEY = "teamup-prototype-state-v1";
const LANGUAGE_KEY = "teamup-prototype-language";

const translations = {
  zh: {
    home: "首頁", chat: "Team Chat", chatShort: "Chat", calendar: "月曆", team: "球隊", create: "新增",
    demoNote: "現時使用虛構Demo資料，稍後先加入真實球隊。", adminRole: "管理員",
    thursdayEyebrow: "星期五 · 下午", goodEvening: "下午好", homeSubhead: "下一場訓練仲有兩日，記得睇埋最新安排。",
    createEvent: "建立活動", nextEvent: "下一場活動", confirmed: "已確認", training: "訓練", match: "比賽", social: "聚會",
    going: "去", maybe: "未定", notGoing: "唔去", noReply: "未覆", viewDetails: "查看詳情",
    quickActions: "快速操作", newEvent: "新增活動", teamChat: "球隊討論", inviteMember: "邀請隊員", openCalendar: "查看月曆",
    officialUpdates: "OFFICIAL UPDATES", announcements: "球隊公告", viewAll: "查看全部", pinned: "已置頂", openEvent: "打開活動",
    announcementText: "星期日訓練改用二號場，請大家提早15分鐘到場熱身。", comingUp: "COMING UP", upcomingEvents: "未來活動",
    teamSpace: "TEAM SPACE", onlineNow: "人在線", pinnedUpdate: "置頂公告", messagePlaceholder: "講啲同球隊有關嘅事…",
    chatGuideline: "THIS SPACE IS FOR", sportOnly: "球隊正事，同運動有關嘅討論。", guideEvents: "訓練、比賽及場地安排",
    guideTactics: "球衣、裝備及戰術討論", guideUpdates: "球隊公告及重要更新", whatsappTitle: "WhatsApp留畀吹水。",
    whatsappCopy: "正式球隊資訊集中喺度，就唔怕畀其他訊息沖走。", seasonSchedule: "SEASON SCHEDULE",
    calendarSubhead: "訓練、比賽同球隊活動，一個地方睇晒。", threeEvents: "3個活動", agenda: "列表", month: "月份",
    yourTeam: "YOUR TEAM", demoRoster: "虛構球隊資料 · 之後可隨時換成臻子Aspiring", members: "名成員",
    responseRate: "今月回覆率", messagesThisWeek: "本週訊息", roster: "ROSTER", teamMembers: "球隊成員", searchMembers: "搜尋成員",
    demoControls: "Demo控制", resetCopy: "重設所有本機示範資料，包括新增活動及訊息。", resetDemo: "重設Demo", back: "返回",
    stayUpdated: "STAY UPDATED", notifications: "通知", venueChanged: "場地已更改", mentionedYou: "Iris提及咗你",
    mentionText: "@Samuel 今場係咪着深色衫？", newResponse: "有新出席回覆", responseText: "Marco會出席星期日晚訓練。",
    notificationSettings: "通知設定", importantOnly: "只接收公告、活動更新及Mentions", newTeamEvent: "NEW TEAM EVENT",
    eventTitle: "活動名稱", eventType: "類型", date: "日期", meetTime: "集合時間", startTime: "開始時間", venue: "場地",
    notes: "裝備及備註", cancel: "取消", rsvpQuestion: "你會唔會出席？", rsvpHelp: "回覆會即時更新畀球隊管理員。",
    eventDiscussion: "活動討論", discussionHelp: "只討論今次活動，資料唔會畀其他Chat沖走。", attendance: "出席名單",
    addCalendar: "加入月曆", share: "分享活動", send: "發送", noMessages: "未有討論。", eventCreated: "活動已建立",
    inviteCopied: "邀請連結已複製", responseSaved: "出席回覆已更新", messageSent: "訊息已發送", demoReset: "Demo已重設",
    fieldRequired: "請填寫活動名稱、日期、時間及場地。", copied: "已複製", justNow: "剛剛", admin: "管理員", member: "隊員", coach: "教練"
  },
  en: {
    home: "Home", chat: "Team Chat", chatShort: "Chat", calendar: "Calendar", team: "Team", create: "Create",
    demoNote: "This prototype uses fictional demo data. Real team details can be added later.", adminRole: "Administrator",
    thursdayEyebrow: "Friday · Afternoon", goodEvening: "Good afternoon", homeSubhead: "The next training is in two days. Check the latest update.",
    createEvent: "Create event", nextEvent: "Next event", confirmed: "Confirmed", training: "Training", match: "Match", social: "Social",
    going: "Going", maybe: "Maybe", notGoing: "Away", noReply: "No reply", viewDetails: "View details",
    quickActions: "Quick actions", newEvent: "New event", teamChat: "Team chat", inviteMember: "Invite member", openCalendar: "Open calendar",
    officialUpdates: "OFFICIAL UPDATES", announcements: "Team announcements", viewAll: "View all", pinned: "Pinned", openEvent: "Open event",
    announcementText: "Sunday training has moved to Court 2. Please arrive 15 minutes early to warm up.", comingUp: "COMING UP", upcomingEvents: "Upcoming events",
    teamSpace: "TEAM SPACE", onlineNow: "online", pinnedUpdate: "Pinned update", messagePlaceholder: "Say something about the team…",
    chatGuideline: "THIS SPACE IS FOR", sportOnly: "Team business and sport-related conversations.", guideEvents: "Training, matches and venue plans",
    guideTactics: "Kit, equipment and tactics", guideUpdates: "Official team updates", whatsappTitle: "Keep the banter on WhatsApp.",
    whatsappCopy: "Official team information stays here, where it cannot get buried.", seasonSchedule: "SEASON SCHEDULE",
    calendarSubhead: "Training, matches and team events in one place.", threeEvents: "3 events", agenda: "Agenda", month: "Month",
    yourTeam: "YOUR TEAM", demoRoster: "Fictional demo team · replace with 臻子 Aspiring later", members: "members",
    responseRate: "response this month", messagesThisWeek: "messages this week", roster: "ROSTER", teamMembers: "Team members", searchMembers: "Search members",
    demoControls: "Demo controls", resetCopy: "Reset all local demo content, including new events and messages.", resetDemo: "Reset demo", back: "Back",
    stayUpdated: "STAY UPDATED", notifications: "Notifications", venueChanged: "Venue changed", mentionedYou: "Iris mentioned you",
    mentionText: "@Samuel are we wearing dark shirts?", newResponse: "New attendance response", responseText: "Marco is going to Sunday training.",
    notificationSettings: "Notification settings", importantOnly: "Only announcements, event updates and mentions", newTeamEvent: "NEW TEAM EVENT",
    eventTitle: "Event title", eventType: "Type", date: "Date", meetTime: "Meet time", startTime: "Start time", venue: "Venue",
    notes: "Equipment and notes", cancel: "Cancel", rsvpQuestion: "Will you attend?", rsvpHelp: "Your response updates instantly for the team admin.",
    eventDiscussion: "Event discussion", discussionHelp: "Keep this conversation connected to the event.", attendance: "Attendance",
    addCalendar: "Add to calendar", share: "Share event", send: "Send", noMessages: "No discussion yet.", eventCreated: "Event created",
    inviteCopied: "Invite link copied", responseSaved: "Attendance updated", messageSent: "Message sent", demoReset: "Demo reset",
    fieldRequired: "Please complete the title, date, time and venue.", copied: "Copied", justNow: "Just now", admin: "Admin", member: "Member", coach: "Coach"
  }
};

const initialState = () => ({
  events: [
    {
      id: "training-1", type: "training", titleZh: "星期日晚訓練", titleEn: "Sunday evening training", date: "2026-11-15",
      meetTime: "19:45", startTime: "20:00", endTime: "22:00", venue: "Harbour Sports Centre · Court 2",
      notesZh: "深色衫、自備水樽。場地已改為二號場。", notesEn: "Dark shirts. Bring your own water bottle. Venue changed to Court 2.", status: "confirmed",
      attendance: { Samuel: "pending", "Coach Alex": "going", Iris: "going", Marco: "going", Tina: "going", Jay: "going", Chloe: "going", Kelvin: "going", Nicole: "going", Brian: "going", Mandy: "maybe", Oscar: "maybe", Leo: "away", Chris: "away", Jamie: "away", Ada: "pending", Ken: "pending", Vivian: "pending" }
    },
    {
      id: "match-1", type: "match", titleZh: "友誼賽 vs Northside", titleEn: "Friendly vs Northside", date: "2026-11-22",
      meetTime: "17:30", startTime: "18:00", endTime: "20:00", venue: "Kowloon Sports Hall · Main Court",
      notesZh: "帶深淺兩套球衣。", notesEn: "Bring both dark and light kits.", status: "confirmed",
      attendance: { Samuel: "going", "Coach Alex": "going", Iris: "going", Marco: "maybe", Tina: "going", Jay: "going", Chloe: "going", Kelvin: "pending", Nicole: "going", Brian: "away", Mandy: "pending", Oscar: "going" }
    },
    {
      id: "social-1", type: "social", titleZh: "月尾球隊聚餐", titleEn: "End-of-month team dinner", date: "2026-11-29",
      meetTime: "19:15", startTime: "19:30", endTime: "21:30", venue: "Mong Kok · Venue TBC",
      notesZh: "餐廳稍後確認。", notesEn: "Restaurant to be confirmed.", status: "draft",
      attendance: { Samuel: "maybe", "Coach Alex": "going", Iris: "going", Marco: "going", Tina: "maybe", Jay: "pending", Chloe: "pending" }
    }
  ],
  messages: [
    { id: 1, author: "Coach Alex", initials: "AL", color: "avatar-violet", time: "11:03", textZh: "星期日訓練轉咗二號場，主要會做接發同防守轉攻。", textEn: "Sunday training has moved to Court 2. We will focus on reception and transition attack." },
    { id: 2, author: "Iris", initials: "IK", color: "avatar-green", time: "11:18", textZh: "今場係咪着深色衫？我可以帶多兩個波。", textEn: "Are we wearing dark shirts? I can bring two extra balls.", reaction: "🏐 3" },
    { id: 3, author: "Marco", initials: "MT", color: "avatar-amber", time: "11:24", textZh: "係，深色衫。我會早少少到幫手開場。", textEn: "Yes, dark shirts. I will arrive early to help set up." },
    { id: 4, author: "Samuel", initials: "SL", color: "avatar-blue", time: "11:31", textZh: "收到，我已經更新咗活動頁面。", textEn: "Got it. I have updated the event page.", mine: true }
  ],
  threads: {
    "training-1": [
      { author: "Iris", initials: "IK", color: "avatar-green", time: "10:42", textZh: "今次會唔會練接發輪次？", textEn: "Are we working on reception rotations?" },
      { author: "Coach Alex", initials: "AL", color: "avatar-violet", time: "10:55", textZh: "會，頭一個鐘集中接發，之後打六對六。", textEn: "Yes. First hour on reception, then six versus six." }
    ],
    "match-1": [{ author: "Coach Alex", initials: "AL", color: "avatar-violet", time: "Yesterday", textZh: "陣容會喺下星期訓練後公布。", textEn: "The lineup will be announced after next week's training." }],
    "social-1": []
  },
  members: [
    { name: "Samuel", initials: "SL", role: "admin", color: "avatar-blue", status: "online" },
    { name: "Coach Alex", initials: "AL", role: "coach", color: "avatar-violet", status: "online" },
    { name: "Iris", initials: "IK", role: "member", color: "avatar-green", status: "online" },
    { name: "Marco", initials: "MT", role: "member", color: "avatar-amber", status: "online" },
    { name: "Tina", initials: "TC", role: "member", color: "avatar-coral", status: "offline" },
    { name: "Jay", initials: "JL", role: "member", color: "avatar-blue", status: "offline" },
    { name: "Chloe", initials: "CW", role: "member", color: "avatar-violet", status: "offline" },
    { name: "Kelvin", initials: "KL", role: "member", color: "avatar-green", status: "offline" },
    { name: "Nicole", initials: "NY", role: "member", color: "avatar-coral", status: "offline" },
    { name: "Brian", initials: "BL", role: "member", color: "avatar-amber", status: "offline" },
    { name: "Mandy", initials: "ML", role: "member", color: "avatar-blue", status: "offline" },
    { name: "Oscar", initials: "OW", role: "member", color: "avatar-violet", status: "offline" }
  ],
  currentView: "home",
  previousView: "home"
});

let state = loadState();
let language = localStorage.getItem(LANGUAGE_KEY) || "zh";
let toastTimer;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && Array.isArray(saved.events) ? saved : initialState();
  } catch {
    return initialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function t(key) {
  return translations[language][key] || translations.zh[key] || key;
}

function eventTitle(event) {
  return language === "en" ? (event.titleEn || event.titleZh || event.title) : (event.titleZh || event.titleEn || event.title);
}

function eventNotes(event) {
  return language === "en" ? (event.notesEn || event.notesZh || "") : (event.notesZh || event.notesEn || "");
}

function applyTranslations() {
  document.documentElement.lang = language === "zh" ? "zh-HK" : "en";
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const value = t(element.dataset.i18n);
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const value = t(element.dataset.i18nPlaceholder);
    if (value) element.placeholder = value;
  });
  document.getElementById("languageButton").textContent = language === "zh" ? "EN" : "繁";
  renderAll();
}

function formatEventDate(dateString, style = "short") {
  const date = new Date(`${dateString}T12:00:00`);
  if (style === "weekday") return new Intl.DateTimeFormat(language === "zh" ? "zh-HK" : "en-GB", { weekday: "short" }).format(date);
  if (style === "long") return new Intl.DateTimeFormat(language === "zh" ? "zh-HK" : "en-GB", { month: "long", day: "numeric", weekday: "long" }).format(date);
  return new Intl.DateTimeFormat(language === "zh" ? "zh-HK" : "en-GB", { month: "short", day: "numeric" }).format(date);
}

function typeLabel(type) {
  return t(type === "match" ? "match" : type === "social" ? "social" : "training");
}

function statusCounts(event) {
  const values = Object.values(event.attendance || {});
  return {
    going: values.filter(value => value === "going").length,
    maybe: values.filter(value => value === "maybe").length,
    away: values.filter(value => value === "away").length,
    pending: values.filter(value => value === "pending").length
  };
}

function renderAll() {
  renderFeaturedEvent();
  renderUpcomingEvents();
  renderCalendar();
  renderMembers();
  renderMessages();
  if (state.currentEventId) renderEventDetail(state.currentEventId);
}

function renderFeaturedEvent() {
  const event = state.events[0];
  if (!event) return;
  const counts = statusCounts(event);
  document.querySelector("[data-featured-title]").textContent = eventTitle(event);
  document.querySelector("[data-featured-time]").textContent = `${event.meetTime} ${language === "zh" ? "集合" : "meet"} · ${event.startTime} ${language === "zh" ? "開始" : "start"}`;
  document.querySelector("[data-featured-venue]").textContent = event.venue;
  document.getElementById("homeGoingCount").textContent = counts.going;
  document.getElementById("homeMaybeCount").textContent = counts.maybe;
  document.getElementById("homeAwayCount").textContent = counts.away;
  document.getElementById("homePendingCount").textContent = counts.pending;
  const date = new Date(`${event.date}T12:00:00`);
  const dateBlock = document.querySelector(".event-date-block");
  dateBlock.querySelector(".event-day").textContent = date.getDate();
  dateBlock.querySelector("strong").textContent = new Intl.DateTimeFormat("en", { month: "short" }).format(date).toUpperCase();
  dateBlock.querySelector("small").textContent = new Intl.DateTimeFormat("en", { weekday: "short" }).format(date).toUpperCase();
  document.querySelectorAll('[data-action="open-event"][data-event-id="training-1"]').forEach(button => button.dataset.eventId = event.id);
}

function renderUpcomingEvents() {
  const container = document.getElementById("upcomingEventsList");
  container.innerHTML = state.events.slice(1, 4).map(event => {
    const date = new Date(`${event.date}T12:00:00`);
    return `<article class="upcoming-row" data-action="open-event" data-event-id="${escapeHtml(event.id)}">
      <div class="mini-date"><strong>${date.getDate()}</strong><span>${new Intl.DateTimeFormat("en", { month: "short" }).format(date).toUpperCase()}</span></div>
      <div><h4>${escapeHtml(eventTitle(event))}</h4><p>${escapeHtml(event.startTime)} · ${escapeHtml(event.venue)}</p></div>
      <span class="event-tag">${escapeHtml(typeLabel(event.type))}</span>
    </article>`;
  }).join("");
}

function renderCalendar() {
  const agenda = document.getElementById("calendarAgenda");
  agenda.innerHTML = state.events.map(event => {
    const date = new Date(`${event.date}T12:00:00`);
    const counts = statusCounts(event);
    return `<article class="agenda-card" data-action="open-event" data-event-id="${escapeHtml(event.id)}">
      <div class="agenda-date"><strong>${date.getDate()}</strong><span>${new Intl.DateTimeFormat("en", { month: "short" }).format(date).toUpperCase()}</span></div>
      <div><span class="event-tag">${escapeHtml(typeLabel(event.type))}</span><h3>${escapeHtml(eventTitle(event))}</h3><p>${escapeHtml(event.startTime)}–${escapeHtml(event.endTime || "")} · ${escapeHtml(event.venue)}</p></div>
      <div class="agenda-attendance">✓ ${counts.going} ${escapeHtml(t("going"))}</div>
    </article>`;
  }).join("");

  const grid = document.getElementById("calendarMonthGrid");
  const dayNames = language === "zh" ? ["一","二","三","四","五","六","日"] : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  let cells = dayNames.map(day => `<div class="month-cell header">${day}</div>`).join("");
  const leading = 6;
  for (let i = 0; i < leading; i++) cells += `<div class="month-cell outside">${26 + i}</div>`;
  for (let day = 1; day <= 30; day++) {
    const event = state.events.find(item => new Date(`${item.date}T12:00:00`).getDate() === day && item.date.startsWith("2026-11"));
    cells += `<div class="month-cell">${day}${event ? `<div class="calendar-event-dot" data-action="open-event" data-event-id="${escapeHtml(event.id)}">${escapeHtml(eventTitle(event))}</div>` : ""}</div>`;
  }
  grid.innerHTML = cells;
}

function renderMembers(filter = "") {
  const container = document.getElementById("memberList");
  const normalized = filter.toLowerCase();
  const filtered = state.members.filter(member => member.name.toLowerCase().includes(normalized));
  container.innerHTML = filtered.map(member => `<article class="member-row">
    <span class="avatar ${member.color}">${escapeHtml(member.initials)}</span>
    <div><h4>${escapeHtml(member.name)}</h4><p>${member.name === "Samuel" ? "samuel@demo.team" : `${member.name.toLowerCase().replaceAll(" ", ".")}@demo.team`}</p></div>
    <span class="role-pill">${escapeHtml(t(member.role))}</span>
    <span class="member-status">${member.status === "online" ? (language === "zh" ? "在線" : "Online") : (language === "zh" ? "成員" : "Member")}</span>
  </article>`).join("");
}

function renderMessages() {
  const container = document.getElementById("teamMessageList");
  container.innerHTML = `<div class="date-divider">${language === "zh" ? "今日" : "Today"}</div>` + state.messages.map(message => `<article class="message ${message.mine ? "mine" : ""}">
    <span class="avatar ${message.color}">${escapeHtml(message.initials)}</span>
    <div class="message-content"><div class="message-line"><strong>${escapeHtml(message.author)}</strong><span>${escapeHtml(message.time)}</span></div><p>${escapeHtml(language === "en" ? (message.textEn || message.textZh) : (message.textZh || message.textEn))}</p>${message.reaction ? `<span class="reaction">${escapeHtml(message.reaction)}</span>` : ""}</div>
  </article>`).join("");
  requestAnimationFrame(() => { container.scrollTop = container.scrollHeight; });
}

function renderEventDetail(eventId) {
  const event = state.events.find(item => item.id === eventId);
  if (!event) return;
  state.currentEventId = eventId;
  const counts = statusCounts(event);
  const myStatus = event.attendance?.Samuel || "pending";
  const threads = state.threads[eventId] || [];
  const attendees = Object.entries(event.attendance || {}).filter(([, value]) => value === "going").slice(0, 8);
  document.getElementById("eventDetailContent").innerHTML = `<div class="event-detail-grid">
    <div>
      <section class="panel event-hero">
        <p class="eyebrow">${escapeHtml(typeLabel(event.type).toUpperCase())} · ${escapeHtml(t(event.status === "confirmed" ? "confirmed" : "maybe"))}</p>
        <h1>${escapeHtml(eventTitle(event))}</h1>
        <div class="event-hero-meta">
          <div><span>${escapeHtml(t("date"))}</span><strong>${escapeHtml(formatEventDate(event.date, "long"))}</strong></div>
          <div><span>${escapeHtml(t("meetTime"))} / ${escapeHtml(t("startTime"))}</span><strong>${escapeHtml(event.meetTime)} / ${escapeHtml(event.startTime)}</strong></div>
          <div><span>${escapeHtml(t("venue"))}</span><strong>${escapeHtml(event.venue)}</strong></div>
          <div><span>${escapeHtml(t("notes"))}</span><strong>${escapeHtml(eventNotes(event) || "—")}</strong></div>
        </div>
        <div class="form-actions"><button class="secondary-button" data-action="download-calendar" data-event-id="${escapeHtml(event.id)}">＋ ${escapeHtml(t("addCalendar"))}</button><button class="primary-button" data-action="share-event" data-event-id="${escapeHtml(event.id)}">↗ ${escapeHtml(t("share"))}</button></div>
      </section>
      <section class="panel event-thread-panel">
        <h3>${escapeHtml(t("eventDiscussion"))}</h3><p>${escapeHtml(t("discussionHelp"))}</p>
        <div class="event-thread-list">${threads.length ? threads.map(item => `<article class="thread-item"><span class="avatar ${item.color}">${escapeHtml(item.initials)}</span><div><h4>${escapeHtml(item.author)}<small>${escapeHtml(item.time)}</small></h4><p>${escapeHtml(language === "en" ? (item.textEn || item.textZh) : (item.textZh || item.textEn))}</p></div></article>`).join("") : `<p>${escapeHtml(t("noMessages"))}</p>`}</div>
        <form class="thread-form" data-event-thread-form="${escapeHtml(event.id)}"><input name="message" autocomplete="off" placeholder="${escapeHtml(t("messagePlaceholder"))}" /><button class="primary-button" type="submit">${escapeHtml(t("send"))}</button></form>
      </section>
    </div>
    <aside>
      <section class="panel rsvp-panel"><h3>${escapeHtml(t("rsvpQuestion"))}</h3><p>${escapeHtml(t("rsvpHelp"))}</p><div class="rsvp-options">
        <button class="rsvp-option going ${myStatus === "going" ? "active" : ""}" data-rsvp="going" data-event-id="${escapeHtml(event.id)}">✓ ${escapeHtml(t("going"))}</button>
        <button class="rsvp-option maybe ${myStatus === "maybe" ? "active" : ""}" data-rsvp="maybe" data-event-id="${escapeHtml(event.id)}">? ${escapeHtml(t("maybe"))}</button>
        <button class="rsvp-option away ${myStatus === "away" ? "active" : ""}" data-rsvp="away" data-event-id="${escapeHtml(event.id)}">× ${escapeHtml(t("notGoing"))}</button>
      </div></section>
      <section class="panel attendance-panel" style="margin-top:18px"><h3>${escapeHtml(t("attendance"))}</h3><p>${counts.going} ${escapeHtml(t("going"))} · ${counts.pending} ${escapeHtml(t("noReply"))}</p><div class="attendance-list">${attendees.map(([name]) => { const member = state.members.find(item => item.name === name) || { initials: name.slice(0,2).toUpperCase(), color: "avatar-blue" }; return `<div class="attendance-person"><span class="avatar ${member.color}">${escapeHtml(member.initials)}</span><strong>${escapeHtml(name)}</strong><span>✓ ${escapeHtml(t("going"))}</span></div>`; }).join("")}</div></section>
    </aside>
  </div>`;
}

function showView(viewName, { updatePrevious = true } = {}) {
  if (updatePrevious && state.currentView !== "event") state.previousView = state.currentView || "home";
  state.currentView = viewName;
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("active", view.id === `view-${viewName}`));
  document.querySelectorAll(".nav-item[data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === viewName));
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.getElementById("mainContent").focus({ preventScroll: true });
  saveState();
}

function openEvent(eventId) {
  state.previousView = state.currentView === "event" ? state.previousView : state.currentView;
  renderEventDetail(eventId);
  showView("event", { updatePrevious: false });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

async function copyText(text, successMessage = t("copied")) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const input = document.createElement("textarea"); input.value = text; document.body.append(input); input.select(); document.execCommand("copy"); input.remove();
  }
  showToast(successMessage);
}

function eventShareText(event) {
  return `${eventTitle(event)}\n${formatEventDate(event.date, "long")} · ${event.startTime}\n${event.venue}\n${location.origin}${location.pathname}#event-${event.id}`;
}

function openCreateEvent() {
  const backdrop = document.getElementById("eventModalBackdrop");
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(() => backdrop.querySelector('input[name="title"]').focus(), 30);
}

function closeCreateEvent() {
  document.getElementById("eventModalBackdrop").hidden = true;
  document.body.style.overflow = "";
}

function notificationDrawer(open) {
  document.getElementById("notificationDrawer").classList.toggle("open", open);
  document.getElementById("drawerOverlay").classList.toggle("open", open);
}

function downloadCalendar(event) {
  const compactDate = event.date.replaceAll("-", "");
  const start = `${compactDate}T${event.startTime.replace(":", "")}00`;
  const end = `${compactDate}T${(event.endTime || event.startTime).replace(":", "")}00`;
  const content = ["BEGIN:VCALENDAR","VERSION:2.0","BEGIN:VEVENT",`DTSTART:${start}`,`DTEND:${end}`,`SUMMARY:${eventTitle(event)}`,`LOCATION:${event.venue}`,`DESCRIPTION:${eventNotes(event)}`,"END:VEVENT","END:VCALENDAR"].join("\r\n");
  const url = URL.createObjectURL(new Blob([content], { type: "text/calendar" }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${event.id}.ics`; anchor.click(); URL.revokeObjectURL(url);
}

document.addEventListener("click", async event => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    showView(viewButton.dataset.view);
    if (viewButton.dataset.view === "chat") document.querySelectorAll(".nav-badge").forEach(badge => badge.textContent = "0");
    return;
  }

  const rsvp = event.target.closest("[data-rsvp]");
  if (rsvp) {
    const target = state.events.find(item => item.id === rsvp.dataset.eventId);
    if (target) { target.attendance.Samuel = rsvp.dataset.rsvp; saveState(); renderAll(); showToast(t("responseSaved")); }
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "go-home") showView("home");
  if (action === "open-create-event") openCreateEvent();
  if (action === "close-create-event") closeCreateEvent();
  if (action === "open-event") openEvent(actionButton.dataset.eventId);
  if (action === "back-from-event") showView(state.previousView || "home", { updatePrevious: false });
  if (action === "copy-invite") copyText(`${location.origin}${location.pathname}?join=demo-team`, t("inviteCopied"));
  if (action === "close-notifications") notificationDrawer(false);
  if (action === "show-chat-info") showToast(language === "zh" ? "Team Chat只保留球隊同運動相關討論" : "Team Chat is for team and sport-related discussion");
  if (action === "reset-demo" && confirm(language === "zh" ? "確定重設所有Demo資料？" : "Reset all demo data?")) { localStorage.removeItem(STORAGE_KEY); state = initialState(); saveState(); renderAll(); showView("home"); showToast(t("demoReset")); }
  if (action === "download-calendar") { const target = state.events.find(item => item.id === actionButton.dataset.eventId); if (target) downloadCalendar(target); }
  if (action === "share-event") {
    const target = state.events.find(item => item.id === actionButton.dataset.eventId); if (!target) return;
    const text = eventShareText(target);
    if (navigator.share) { try { await navigator.share({ title: eventTitle(target), text }); } catch {} } else copyText(text);
  }
});

document.getElementById("notificationButton").addEventListener("click", () => notificationDrawer(true));
document.getElementById("drawerOverlay").addEventListener("click", () => notificationDrawer(false));
document.getElementById("languageButton").addEventListener("click", () => {
  language = language === "zh" ? "en" : "zh";
  localStorage.setItem(LANGUAGE_KEY, language);
  applyTranslations();
});

document.getElementById("teamMessageForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("teamMessageInput");
  const text = input.value.trim();
  if (!text) return;
  state.messages.push({ id: Date.now(), author: "Samuel", initials: "SL", color: "avatar-blue", time: t("justNow"), textZh: text, textEn: text, mine: true });
  input.value = ""; saveState(); renderMessages(); showToast(t("messageSent"));
});

document.getElementById("createEventForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const title = String(form.get("title") || "").trim();
  const date = String(form.get("date") || "");
  const startTime = String(form.get("startTime") || "");
  const venue = String(form.get("venue") || "").trim();
  if (!title || !date || !startTime || !venue) { showToast(t("fieldRequired")); return; }
  const id = `event-${Date.now()}`;
  state.events.push({ id, type: form.get("type"), titleZh: title, titleEn: title, date, meetTime: form.get("meetTime") || startTime, startTime, endTime: "", venue, notesZh: form.get("notes") || "", notesEn: form.get("notes") || "", status: "confirmed", attendance: Object.fromEntries(state.members.map(member => [member.name, member.name === "Samuel" ? "going" : "pending"])) });
  state.threads[id] = [];
  saveState(); event.currentTarget.reset(); closeCreateEvent(); renderAll(); showToast(t("eventCreated")); openEvent(id);
});

document.addEventListener("submit", event => {
  const form = event.target.closest("[data-event-thread-form]");
  if (!form) return;
  event.preventDefault();
  const input = form.elements.message;
  const text = input.value.trim();
  if (!text) return;
  const eventId = form.dataset.eventThreadForm;
  state.threads[eventId] ||= [];
  state.threads[eventId].push({ author: "Samuel", initials: "SL", color: "avatar-blue", time: t("justNow"), textZh: text, textEn: text });
  input.value = ""; saveState(); renderEventDetail(eventId); showToast(t("messageSent"));
});

document.getElementById("memberSearch").addEventListener("input", event => renderMembers(event.target.value));
document.querySelectorAll("[data-calendar-mode]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-calendar-mode]").forEach(item => item.classList.toggle("active", item === button));
  const month = button.dataset.calendarMode === "month";
  document.getElementById("calendarAgenda").hidden = month;
  document.getElementById("calendarMonthGrid").hidden = !month;
}));

document.getElementById("eventModalBackdrop").addEventListener("click", event => { if (event.target === event.currentTarget) closeCreateEvent(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") { closeCreateEvent(); notificationDrawer(false); } });

if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));

applyTranslations();
showView(state.currentView === "event" ? "home" : (state.currentView || "home"), { updatePrevious: false });
