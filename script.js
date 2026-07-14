const STORAGE_KEY = "chosen-gen-bible-study-progress";
const QATAR_OFFSET_MS = 3 * 60 * 60 * 1000;
const TUESDAY = 2;
const LOADING_DURATION_MS = 10000;
const LOADING_EXIT_DURATION_MS = 650;

const sessions = {
  "part-1": { hour: 20, minute: 0, label: "Join Part 1 on Zoom" },
  "part-2": { hour: 20, minute: 40, label: "Join Part 2 on Zoom" },
};

const welcomePanel = document.querySelector("#welcome-panel");
const startButton = document.querySelector("#start-button");
const journey = document.querySelector("#journey");
const partOnePanel = document.querySelector("#part-one-panel");
const partTwoPanel = document.querySelector("#part-two-panel");
const encouragement = document.querySelector("#encouragement");
const stepOne = document.querySelector("#step-one");
const stepTwo = document.querySelector("#step-two");
const progressCopy = document.querySelector("#progress-copy");
const resetButton = document.querySelector("#reset-button");
const nextStudyCountdown = document.querySelector("#next-study-countdown");
const loadingScreen = document.querySelector("#loading-screen");
const appContent = document.querySelector("#app-content");

function getQatarClock(now = new Date()) {
  return new Date(now.getTime() + QATAR_OFFSET_MS);
}

function getNextSessionStart(session, now = new Date()) {
  const qatarClock = getQatarClock(now);
  const daysUntilTuesday = (TUESDAY - qatarClock.getUTCDay() + 7) % 7;
  let start = Date.UTC(
    qatarClock.getUTCFullYear(),
    qatarClock.getUTCMonth(),
    qatarClock.getUTCDate() + daysUntilTuesday,
    session.hour,
    session.minute,
  ) - QATAR_OFFSET_MS;

  if (start <= now.getTime()) {
    start += 7 * 24 * 60 * 60 * 1000;
  }

  return start;
}

function isSessionAvailable(session, now = new Date()) {
  const qatarClock = getQatarClock(now);
  const isTuesday = qatarClock.getUTCDay() === TUESDAY;
  const currentTime = qatarClock.getUTCHours() * 60 + qatarClock.getUTCMinutes();
  const sessionTime = session.hour * 60 + session.minute;

  return isTuesday && currentTime >= sessionTime;
}

function formatCountdown(milliseconds) {
  let remainingSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const days = Math.floor(remainingSeconds / 86400);
  remainingSeconds %= 86400;
  const hours = Math.floor(remainingSeconds / 3600);
  remainingSeconds %= 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const pad = (value) => String(value).padStart(2, "0");

  return `${days ? `${days}d ` : ""}${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

function updateSessionAvailability() {
  const now = new Date();

  Object.entries(sessions).forEach(([sessionId, session]) => {
    const available = isSessionAvailable(session, now);
    const joinButton = document.querySelector(`[data-join="${sessionId}"]`);
    const joinLabel = document.querySelector(`[data-join-label="${sessionId}"]`);
    const countdown = document.querySelector(`[data-countdown="${sessionId}"]`);
    const status = document.querySelector(`[data-session-status="${sessionId}"]`);

    joinButton.setAttribute("aria-disabled", String(!available));
    joinButton.tabIndex = available ? 0 : -1;
    joinLabel.textContent = available ? session.label : `${sessionId === "part-1" ? "Part 1" : "Part 2"} opens soon`;
    status.textContent = available ? "Ready to join" : "Locked until schedule";
    status.classList.toggle("status--waiting", !available);

    if (available) {
      countdown.textContent = "Zoom room is available now · Qatar time";
      return;
    }

    const sessionStart = getNextSessionStart(session, now);
    countdown.textContent = `Opens in ${formatCountdown(sessionStart - now.getTime())} · Qatar time`;
  });

  const firstSession = sessions["part-1"];
  nextStudyCountdown.textContent = isSessionAvailable(firstSession, now)
    ? "Part 1 is available now · Qatar time"
    : `Part 1 opens in ${formatCountdown(getNextSessionStart(firstSession, now) - now.getTime())} · Qatar time`;
}

function getProgress() {
  return localStorage.getItem(STORAGE_KEY) || "welcome";
}

function setProgress(progress) {
  localStorage.setItem(STORAGE_KEY, progress);
  render(progress);
}

function setStepState(step, state) {
  step.classList.remove("is-current", "is-complete");

  if (state) {
    step.classList.add(state);
  }
}

function render(progress) {
  const hasStarted = progress !== "welcome";
  welcomePanel.hidden = hasStarted;
  journey.hidden = !hasStarted;

  partOnePanel.hidden = progress !== "part-1";
  partTwoPanel.hidden = progress !== "part-2";
  encouragement.hidden = progress !== "complete";

  if (progress === "part-1") {
    setStepState(stepOne, "is-current");
    setStepState(stepTwo, "");
    progressCopy.textContent = "Step 1 of 2";
  }

  if (progress === "part-2") {
    setStepState(stepOne, "is-complete");
    setStepState(stepTwo, "is-current");
    progressCopy.textContent = "Step 2 of 2";
  }

  if (progress === "complete") {
    setStepState(stepOne, "is-complete");
    setStepState(stepTwo, "is-complete");
    progressCopy.textContent = "Journey complete";
  }
}

function revealStudy() {
  document.body.classList.remove("is-loading");
  appContent.removeAttribute("aria-hidden");
  appContent.removeAttribute("inert");
  loadingScreen.classList.add("is-complete");

  window.setTimeout(() => {
    loadingScreen.remove();
  }, LOADING_EXIT_DURATION_MS);
}

startButton.addEventListener("click", () => setProgress("part-1"));

document.querySelectorAll("[data-complete]").forEach((button) => {
  button.addEventListener("click", () => {
    const nextProgress = button.dataset.complete === "part-1" ? "part-2" : "complete";
    setProgress(nextProgress);
  });
});

document.querySelectorAll("[data-join]").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (button.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
    }
  });
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  render("welcome");
});

render(getProgress());
updateSessionAvailability();
setInterval(updateSessionAvailability, 1000);

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealStudy();
} else {
  window.setTimeout(revealStudy, LOADING_DURATION_MS);
}
