const topicId = new URLSearchParams(window.location.search).get("topic");
const title = document.querySelector("#teaching-title");
const subtitle = document.querySelector("#teaching-subtitle");
const verse = document.querySelector("#teaching-verse");
const savedPresentation = document.querySelector("#saved-presentation");
const presentationMessage = document.querySelector("#saved-presentation-message");
const presentationFrame = document.querySelector("#saved-presentation-frame");
const presentationLink = document.querySelector("#saved-presentation-link");
const fullscreenButton = document.querySelector("#presentation-fullscreen-button");
const presentationMetadata = document.querySelector("#presentation-metadata");
const slidePreviousButton = document.querySelector("#slide-previous");
const slideNextButton = document.querySelector("#slide-next");
const slideLabel = document.querySelector("#slide-label");
const slideTitle = document.querySelector("#slide-title");
const slideDescription = document.querySelector("#slide-description");
const slideRecap = document.querySelector("#slide-recap");
const summarySection = document.querySelector("#presentation-summary");
const testimonyElement = document.querySelector("#topic-testimony");
const notesElement = document.querySelector("#topic-notes");
const commentsSection = document.querySelector("#presentation-comments");
const commentsList = document.querySelector("#topic-comments");

let slideNotes = [];
let currentSlideIndex = 0;

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
  fullscreenButton?.setAttribute("hidden", "");
  presentationMetadata?.setAttribute("hidden", "");
  summarySection?.setAttribute("hidden", "");
}

function updateSlideView() {
  if (!presentationMetadata || !slideNotes.length) {
    return;
  }

  const note = slideNotes[currentSlideIndex];
  slideLabel.textContent = `Slide ${currentSlideIndex + 1} of ${slideNotes.length}`;
  slideTitle.textContent = note.title || `Slide ${currentSlideIndex + 1}`;
  slideDescription.textContent = note.description || "No description provided for this slide.";
  slideRecap.textContent = note.recap || "No recap provided.";

  slidePreviousButton.disabled = currentSlideIndex === 0;
  slideNextButton.disabled = currentSlideIndex >= slideNotes.length - 1;
}

async function enterPresentationFullscreen() {
  const target = savedPresentation || presentationFrame;
  if (!target) {
    return;
  }

  try {
    if (target.requestFullscreen) {
      await target.requestFullscreen({ navigationUI: "hide" });
    } else if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen({ navigationUI: "hide" });
    }

    if (screen.orientation?.lock) {
      try {
        await screen.orientation.lock("landscape");
      } catch {
        // Orientation lock may fail on some browsers.
      }
    }
  } catch {
    // Fullscreen may be blocked by browser policy. The presentation still loads normally.
  }
}

async function exitPresentationFullscreen() {
  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen();
    } catch {
      // ignore failure
    }
  }
}

function updateFullscreenButton() {
  if (!fullscreenButton) {
    return;
  }

  const isFull = Boolean(document.fullscreenElement);
  fullscreenButton.textContent = isFull ? "Exit full screen" : "View full screen";
}

function handleFullscreenChange() {
  const isFull = Boolean(document.fullscreenElement);
  savedPresentation?.classList.toggle("is-fullscreen", isFull);
  updateFullscreenButton();
}

window.addEventListener("fullscreenchange", handleFullscreenChange);

async function loadSavedPresentation() {
  if (!topicId || !/^[A-Za-z0-9_-]{1,128}$/.test(topicId)) {
    showUnavailable("Select a saved teaching from the Teaching Library.");
    return;
  }

  try {
    const [{ doc, getDoc, getFirestore }, { app }] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js"),
      import("./firebase.js"),
    ]);
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

    slideNotes = Array.isArray(topic.slideNotes) ? topic.slideNotes : [];
    currentSlideIndex = 0;

    if (slideNotes.length) {
      presentationMetadata?.removeAttribute("hidden");
      updateSlideView();
    } else {
      presentationMetadata?.setAttribute("hidden", "");
    }

    if (fullscreenButton) {
      fullscreenButton.hidden = false;
      updateFullscreenButton();
      fullscreenButton.addEventListener("click", async () => {
        if (document.fullscreenElement) {
          await exitPresentationFullscreen();
        } else {
          await enterPresentationFullscreen();
        }
      });
    }

    if (topic.testimony || topic.notes || (Array.isArray(topic.comments) && topic.comments.length)) {
      summarySection?.removeAttribute("hidden");
      testimonyElement.textContent = topic.testimony || "No testimony has been added.";
      notesElement.textContent = topic.notes || "No notes have been added.";
      if (Array.isArray(topic.comments) && topic.comments.length) {
        commentsSection?.removeAttribute("hidden");
        commentsList.replaceChildren();
        topic.comments.forEach((comment) => {
          const item = document.createElement("li");
          item.textContent = comment;
          commentsList.appendChild(item);
        });
      } else {
        commentsSection?.setAttribute("hidden", "");
      }
    } else {
      summarySection?.setAttribute("hidden", "");
    }

    slidePreviousButton?.addEventListener("click", () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex -= 1;
        updateSlideView();
      }
    });

    slideNextButton?.addEventListener("click", () => {
      if (currentSlideIndex < slideNotes.length - 1) {
        currentSlideIndex += 1;
        updateSlideView();
      }
    });
  } catch {
    showUnavailable("The saved presentation could not be loaded. Please try again later.");
  }
}

loadSavedPresentation();