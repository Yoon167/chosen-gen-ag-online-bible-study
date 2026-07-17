import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { app } from "./firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);
const authPanel = document.querySelector("#auth-panel");
const editor = document.querySelector("#topic-editor");
const signInForm = document.querySelector("#sign-in-form");
const signOutButton = document.querySelector("#sign-out-button");
const authMessage = document.querySelector("#auth-message");
const signedInUser = document.querySelector("#signed-in-user");
const topicForm = document.querySelector("#topic-form");
const topicDate = document.querySelector("#topic-date");
const cancelEditButton = document.querySelector("#cancel-edit-button");
const editorMessage = document.querySelector("#editor-message");
const savedTopicsList = document.querySelector("#saved-topics-list");
const savedTopicsStatus = document.querySelector("#saved-topics-status");

let unsubscribeTopics;
let savedTopics = new Map();

function setMessage(element, message, isError = false) {
  element.textContent = message;
  element.classList.toggle("is-error", isError);
}

function isTuesday(date) {
  const parsedDate = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsedDate.getTime()) && parsedDate.getUTCDay() === 2;
}

function normalizeUrl(value, fieldLabel) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return "";
  }

  try {
    const url = new URL(trimmedValue, window.location.href);
    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.href;
    }
  } catch {
    // The message below is clearer than exposing a browser parsing error.
  }

  throw new Error(`${fieldLabel} must be a valid website link.`);
}

function getTopicFromForm() {
  const formData = new FormData(topicForm);
  const date = String(formData.get("date") || "");
  const title = String(formData.get("title") || "").trim();

  if (!isTuesday(date)) {
    throw new Error("Please choose a Tuesday date.");
  }

  if (!title) {
    throw new Error("A topic title is required.");
  }

  return {
    date,
    title,
    description: String(formData.get("description") || "").trim(),
    verse: String(formData.get("verse") || "").trim(),
    part1Url: normalizeUrl(String(formData.get("part1Url") || ""), "Part 1 Zoom link"),
    part2Url: normalizeUrl(String(formData.get("part2Url") || ""), "Part 2 Zoom link"),
    resourceUrl: normalizeUrl(String(formData.get("resourceUrl") || ""), "Teaching resource link"),
    updatedAt: serverTimestamp(),
  };
}

function formatTopicDate(date) {
  return new Intl.DateTimeFormat("en-QA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function resetTopicForm() {
  topicForm.reset();
  delete topicForm.dataset.topicId;
  topicDate.disabled = false;
  cancelEditButton.hidden = true;
  setMessage(editorMessage, "");
}

function createSavedTopic(topic) {
  const item = document.createElement("article");
  item.className = "saved-topic";

  const details = document.createElement("div");
  const date = document.createElement("p");
  date.className = "saved-topic__date";
  date.textContent = formatTopicDate(topic.date);
  const title = document.createElement("h3");
  title.textContent = topic.title;
  const description = document.createElement("p");
  description.textContent = topic.description || "No description added.";
  details.append(date, title, description);

  const actions = document.createElement("div");
  actions.className = "saved-topic__actions";
  const edit = document.createElement("button");
  edit.type = "button";
  edit.className = "saved-topic__button";
  edit.dataset.editTopic = topic.id;
  edit.textContent = "Edit";
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "saved-topic__button saved-topic__button--danger";
  remove.dataset.deleteTopic = topic.id;
  remove.textContent = "Delete";
  actions.append(edit, remove);

  item.append(details, actions);
  return item;
}

function renderSavedTopics(topics) {
  savedTopics = new Map(topics.map((topic) => [topic.id, topic]));
  savedTopicsList.replaceChildren();

  if (!topics.length) {
    const emptyState = document.createElement("p");
    emptyState.className = "saved-topics__empty";
    emptyState.textContent = "No teachings saved yet.";
    savedTopicsList.append(emptyState);
    savedTopicsStatus.textContent = "0 saved";
    return;
  }

  const fragment = document.createDocumentFragment();
  topics.forEach((topic) => fragment.append(createSavedTopic(topic)));
  savedTopicsList.append(fragment);
  savedTopicsStatus.textContent = `${topics.length} saved`;
}

function subscribeToTopics() {
  unsubscribeTopics?.();
  const topicsQuery = query(collection(db, "topics"), orderBy("date", "desc"));

  unsubscribeTopics = onSnapshot(
    topicsQuery,
    (snapshot) => {
      const topics = snapshot.docs.map((topicDocument) => ({
        id: topicDocument.id,
        ...topicDocument.data(),
      }));
      renderSavedTopics(topics);
    },
    () => {
      savedTopicsStatus.textContent = "Unable to load teachings";
      setMessage(editorMessage, "Your account is signed in, but it does not have permission to manage topics.", true);
    },
  );
}

function startEditing(topic) {
  topicForm.dataset.topicId = topic.id;
  topicDate.value = topic.date;
  topicDate.disabled = true;
  topicForm.elements.title.value = topic.title || "";
  topicForm.elements.description.value = topic.description || "";
  topicForm.elements.verse.value = topic.verse || "";
  topicForm.elements.part1Url.value = topic.part1Url || "";
  topicForm.elements.part2Url.value = topic.part2Url || "";
  topicForm.elements.resourceUrl.value = topic.resourceUrl || "";
  cancelEditButton.hidden = false;
  setMessage(editorMessage, `Editing ${formatTopicDate(topic.date)}.`);
  topicForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getAuthErrorMessage(error) {
  if (error.code === "auth/invalid-credential") {
    return "The email or password is not correct.";
  }

  if (error.code === "auth/too-many-requests") {
    return "Too many attempts. Please wait before trying again.";
  }

  return "Sign in could not be completed. Please try again.";
}

signInForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(signInForm);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  setMessage(authMessage, "Signing in...");
  try {
    await signInWithEmailAndPassword(auth, email, password);
    signInForm.reset();
    setMessage(authMessage, "");
  } catch (error) {
    setMessage(authMessage, getAuthErrorMessage(error), true);
  }
});

signOutButton.addEventListener("click", async () => {
  await signOut(auth);
});

topicForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const topic = getTopicFromForm();
    const savedTopicId = topicForm.dataset.topicId || topic.date;
    await setDoc(doc(db, "topics", savedTopicId), topic, { merge: true });
    resetTopicForm();
    setMessage(editorMessage, "Teaching saved. It is now available on the public site.");
  } catch (error) {
    setMessage(editorMessage, error.message || "Teaching could not be saved.", true);
  }
});

cancelEditButton.addEventListener("click", resetTopicForm);

savedTopicsList.addEventListener("click", async (event) => {
  const editButton = event.target.closest("[data-edit-topic]");
  if (editButton) {
    startEditing(savedTopics.get(editButton.dataset.editTopic));
    return;
  }

  const deleteButton = event.target.closest("[data-delete-topic]");
  if (!deleteButton) {
    return;
  }

  const topic = savedTopics.get(deleteButton.dataset.deleteTopic);
  if (!topic || !window.confirm(`Delete “${topic.title}”? This cannot be undone.`)) {
    return;
  }

  try {
    await deleteDoc(doc(db, "topics", topic.id));
    if (topicForm.dataset.topicId === topic.id) {
      resetTopicForm();
    }
    setMessage(editorMessage, "Teaching deleted.");
  } catch {
    setMessage(editorMessage, "Teaching could not be deleted.", true);
  }
});

onAuthStateChanged(auth, (user) => {
  const isSignedIn = Boolean(user);
  authPanel.hidden = isSignedIn;
  editor.hidden = !isSignedIn;

  if (!user) {
    unsubscribeTopics?.();
    unsubscribeTopics = undefined;
    savedTopics = new Map();
    resetTopicForm();
    return;
  }

  signedInUser.textContent = user.email || "Signed in";
  subscribeToTopics();
});