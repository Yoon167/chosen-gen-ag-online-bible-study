import { doc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { app } from "./firebase.js";

const topicId = new URLSearchParams(window.location.search).get("topic");
const title = document.querySelector("#teaching-title");
const subtitle = document.querySelector("#teaching-subtitle");
const verse = document.querySelector("#teaching-verse");
const localDeck = document.querySelector("#local-deck");
const savedPresentation = document.querySelector("#saved-presentation");
const presentationMessage = document.querySelector("#saved-presentation-message");
const presentationFrame = document.querySelector("#saved-presentation-frame");
const presentationLink = document.querySelector("#saved-presentation-link");

function getPresentationEmbedUrl(value) {
  try {
    const url = new URL(value, window.location.href);
    const slidesMatch = (url.hostname === "docs.google.com" || url.hostname === "slides.google.com")
      ? url.pathname.match(/^\/presentation(?:\/u\/\d+)?\/d\/([A-Za-z0-9_-]+)/)
      : null;
    if (slidesMatch) {
      return `https://docs.google.com/presentation/d/${slidesMatch[1]}/embed?start=false&loop=false&delayms=3000`;
    }

    const driveMatch = url.hostname === "drive.google.com"
      ? url.pathname.match(/^\/file\/d\/([A-Za-z0-9_-]+)/)
      : null;
    if (driveMatch) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }
  } catch {
    return "";
  }

  return "";
}

function showUnavailable(message) {
  presentationMessage.textContent = message;
  presentationFrame.hidden = true;
  presentationLink.hidden = true;
}

async function loadSavedPresentation() {
  if (!topicId || !/^[A-Za-z0-9_-]{1,128}$/.test(topicId)) {
    return;
  }

  localDeck.hidden = true;
  savedPresentation.hidden = false;

  try {
    const snapshot = await getDoc(doc(getFirestore(app), "topics", topicId));
    if (!snapshot.exists()) {
      showUnavailable("This saved teaching is no longer available.");
      return;
    }

    const topic = snapshot.data();
    const resourceUrl = typeof topic.resourceUrl === "string" ? topic.resourceUrl.trim() : "";
    const embedUrl = getPresentationEmbedUrl(resourceUrl);
    if (!embedUrl) {
      showUnavailable("This teaching does not have a viewable Google Slides or Google Drive presentation.");
      return;
    }

    const topicTitle = typeof topic.title === "string" && topic.title.trim() ? topic.title.trim() : "Previous teaching";
    const description = typeof topic.description === "string" ? topic.description.trim() : "";
    const topicVerse = typeof topic.verse === "string" ? topic.verse.trim() : "";
    document.title = `Previous Teaching | ${topicTitle}`;
    title.textContent = topicTitle;
    subtitle.textContent = description || "Saved Bible study teaching";
    verse.textContent = topicVerse;
    verse.hidden = !topicVerse;
    presentationMessage.hidden = true;
    presentationFrame.src = embedUrl;
    presentationFrame.title = `${topicTitle} presentation`;
    presentationFrame.hidden = false;
    presentationLink.href = resourceUrl;
    presentationLink.hidden = false;
  } catch {
    showUnavailable("The saved presentation could not be loaded. Please try again later.");
  }
}

loadSavedPresentation();