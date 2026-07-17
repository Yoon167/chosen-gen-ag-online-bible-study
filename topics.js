import { getFirestore, collection, onSnapshot, orderBy, query } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { app } from "./firebase.js";

const db = getFirestore(app);
const QATAR_OFFSET_MS = 3 * 60 * 60 * 1000;

const fallbackTopics = [
  {
    id: "what-god-can-do",
    title: "What God Can Do",
    description: "Knowing the True God Through His Attributes",
    resourceUrl: "previous-teaching.html?v=messenger-browser-1",
  },
];

const archive = document.querySelector("#topic-archive-list");
const archiveStatus = document.querySelector("#topic-archive-status");
const currentTopic = document.querySelector("#current-topic");
let hasReceivedTopics = false;

function getQatarDate(now = new Date()) {
  const qatarClock = new Date(now.getTime() + QATAR_OFFSET_MS);
  return qatarClock.toISOString().slice(0, 10);
}

function isScheduledTopic(topic) {
  return typeof topic.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(topic.date);
}

function normalizeTopic(id, value) {
  if (!value || typeof value.title !== "string" || !value.title.trim()) {
    return null;
  }

  return {
    id,
    date: isScheduledTopic(value) ? value.date : "",
    title: value.title.trim(),
    description: typeof value.description === "string" ? value.description.trim() : "",
    verse: typeof value.verse === "string" ? value.verse.trim() : "",
    part1Url: typeof value.part1Url === "string" ? value.part1Url.trim() : "",
    part2Url: typeof value.part2Url === "string" ? value.part2Url.trim() : "",
    resourceUrl: typeof value.resourceUrl === "string" ? value.resourceUrl.trim() : "",
  };
}

function getSafeUrl(value) {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value, window.location.href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

function formatTopicDate(date) {
  if (!date) {
    return "Previous teaching";
  }

  return new Intl.DateTimeFormat("en-QA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function updateText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function updateJoinLink(selector, url) {
  const safeUrl = getSafeUrl(url);
  if (!safeUrl) {
    return;
  }

  document.querySelectorAll(selector).forEach((link) => {
    link.href = safeUrl;
  });
}

function getUpcomingTopic(topics) {
  const today = getQatarDate();
  return topics
    .filter(isScheduledTopic)
    .sort((first, second) => first.date.localeCompare(second.date))
    .find((topic) => topic.date >= today);
}

function renderCurrentTopic(topics) {
  const topic = getUpcomingTopic(topics);
  if (!topic) {
    if (currentTopic) {
      currentTopic.hidden = true;
    }
    return;
  }

  currentTopic.hidden = false;
  updateText("[data-current-topic-title]", topic.title);
  updateText("[data-current-topic-date]", formatTopicDate(topic.date));

  if (topic.description) {
    updateText("[data-current-topic-description]", topic.description);
  }

  updateText("[data-session-topic]", topic.title);
  updateJoinLink("[data-join='part-1']", topic.part1Url);
  updateJoinLink("[data-join='part-2']", topic.part2Url);
}

function createTopicCard(topic) {
  const card = document.createElement("article");
  card.className = "topic-card";

  const meta = document.createElement("p");
  meta.className = "topic-card__date";
  meta.textContent = formatTopicDate(topic.date);

  const title = document.createElement("h3");
  title.textContent = topic.title;

  const description = document.createElement("p");
  description.className = "topic-card__description";
  description.textContent = topic.description || "Bible study teaching";

  card.append(meta, title, description);

  if (topic.verse) {
    const verse = document.createElement("p");
    verse.className = "topic-card__verse";
    verse.textContent = topic.verse;
    card.append(verse);
  }

  const resourceUrl = getSafeUrl(topic.resourceUrl);
  if (resourceUrl) {
    const resource = document.createElement("a");
    resource.className = "topic-card__resource";
    resource.href = resourceUrl;
    resource.textContent = "Open teaching";
    card.append(resource);
  }

  return card;
}

function renderArchive(topics, statusMessage) {
  if (!archive) {
    return;
  }

  const visibleTopics = topics.length ? topics : fallbackTopics;
  const fragment = document.createDocumentFragment();

  visibleTopics.forEach((topic) => fragment.append(createTopicCard(topic)));
  archive.replaceChildren(fragment);

  if (archiveStatus) {
    archiveStatus.textContent = statusMessage;
  }
}

function renderTopics(topics) {
  renderCurrentTopic(topics);
  renderArchive(topics, topics.length ? `${topics.length} teaching${topics.length === 1 ? "" : "s"} saved` : "No new topics have been added yet.");
}

renderArchive([], "Loading teaching archive...");

window.setTimeout(() => {
  if (!hasReceivedTopics) {
    renderArchive([], "Teaching library is being prepared.");
  }
}, 4000);

const topicsQuery = query(collection(db, "topics"), orderBy("date", "desc"));
onSnapshot(
  topicsQuery,
  (snapshot) => {
    hasReceivedTopics = true;
    const topics = snapshot.docs
      .map((document) => normalizeTopic(document.id, document.data()))
      .filter(Boolean);
    renderTopics(topics);
  },
  () => {
    renderArchive([], "The teaching archive will appear here once it is connected.");
  },
);