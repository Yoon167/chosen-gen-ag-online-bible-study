const slides = [
  {
    title: "What God Can Do",
    description: "Introduces the study and its central truth: understanding what God can do begins with knowing who God is. The lesson is anchored in Ephesians 3:20.",
  },
  {
    title: "Who God Is Before What God Can Do",
    description: "Contrasts a focus on God’s actions and miracles with a focus on His identity and character. The teaching emphasizes that action always flows from identity.",
  },
  {
    title: "The Signatures of the Creator",
    description: "Romans 1:20 points to God through creation. The cosmological argument says creation requires a Creator; the teleological argument says design requires a Designer.",
  },
  {
    title: "Human Philosophy vs. Divine Revelation",
    description: "Reviews atheism, agnosticism, polytheism, and pantheism, then affirms the biblical truth from Isaiah 45:5: there is one Creator God and faith must be anchored in Scripture.",
  },
  {
    title: "The God of the Bible",
    description: "Introduces the names revealed in Exodus 3:14: Elohim, the Creator God; El, the Strong One; Adonai, the Lord and Master; and Jehovah, the Covenant-Keeping God.",
  },
  {
    title: "Identity Becomes Action",
    description: "Connects God’s revealed identity to His present actions. Because of who He is, believers can confidently trust what He does.",
  },
  {
    title: "God Can Provide",
    description: "Jehovah-Jireh in Genesis 22:14 reveals God as the ultimate Provider. The application is to trust Him with financial, emotional, and spiritual needs.",
  },
  {
    title: "God Can Give Peace",
    description: "Jehovah-Shalom in John 14:27 teaches that true peace comes from God and remains available even when circumstances are difficult, fearful, or confusing.",
  },
  {
    title: "God Can Guide",
    description: "Jehovah-Raah in Psalm 23:1 presents God as the Shepherd who guides daily. His guidance is sought through prayer, Scripture, and wisdom for life decisions.",
  },
  {
    title: "The Equation of Compassion",
    description: "Clarifies mercy and grace: mercy withholds the punishment deserved, while grace gives blessing that is not deserved. Romans 5:20 declares that grace is greater than sin.",
  },
  {
    title: "Loving the Unlovable",
    description: "God is love (1 John 4:8), and He loved people while they were still sinners (Romans 5:8). The cross assures every person of His personal and saving love.",
  },
  {
    title: "The Greatest Thing God Can Do",
    description: "Presents the gospel: all have sinned (Romans 3:23), sin brings death (Romans 6:23), and God gave His Son in mercy, grace, and love so that people may be saved (John 3:16).",
  },
  {
    title: "The Inseparable Connection",
    description: "Summarizes the lesson: who God is shapes what He does and how He loves. His identity guarantees His actions, and His power is matched by personal care.",
  },
  {
    title: "The Perspective Shift",
    description: "Invites a personal response to Christ as Lord and Savior. The final challenge is to stop looking at the size of the problem and start looking at the size of God.",
  },
  {
    title: "Closing Promise",
    description: "Returns to Ephesians 3:20 as a closing assurance that God is able to do exceeding abundantly above all that is asked or imagined. To God be all the glory. Amen.",
  },
];

const activeSlide = document.querySelector("#active-slide");
const slideCounter = document.querySelector("#slide-counter");
const slideTitle = document.querySelector("#slide-title");
const slideDescription = document.querySelector("#slide-description");
const previousButton = document.querySelector("#previous-slide");
const nextButton = document.querySelector("#next-slide");
const thumbnails = document.querySelector("#slide-thumbnails");
const browserOpen = document.querySelector("#browser-open");
const browserOpenLink = document.querySelector("#browser-open-link");

let currentSlide = 0;

function showChromeLinkForMessenger() {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isMetaInAppBrowser = /FBAN|FBAV|FB_IAB|Messenger/i.test(navigator.userAgent);

  if (!isAndroid || !isMetaInAppBrowser) {
    return;
  }

  const teachingUrl = new URL(window.location.href);
  teachingUrl.searchParams.set("v", "messenger-browser-1");
  teachingUrl.hash = "";

  browserOpenLink.href = `intent://${teachingUrl.host}${teachingUrl.pathname}${teachingUrl.search}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(teachingUrl.href)};end`;
  browserOpen.hidden = false;
}

function getSlideIndexFromHash() {
  const match = window.location.hash.match(/^#slide-(\d{1,2})$/);
  if (!match) {
    return 0;
  }

  const index = Number(match[1]) - 1;
  return index >= 0 && index < slides.length ? index : 0;
}

function getImagePath(index) {
  return `assets/previous-teaching/slide-${String(index + 1).padStart(2, "0")}.jpg`;
}

function renderThumbnails() {
  const fragment = document.createDocumentFragment();

  slides.forEach((slide, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "slide-thumbnail";
    button.dataset.slideIndex = String(index);
    button.setAttribute("aria-label", `Show slide ${index + 1}: ${slide.title}`);

    const image = document.createElement("img");
    image.src = getImagePath(index);
    image.alt = "";
    image.loading = index < 3 ? "eager" : "lazy";
    image.decoding = "async";

    const label = document.createElement("span");
    label.textContent = String(index + 1);

    button.append(image, label);
    fragment.append(button);
  });

  thumbnails.append(fragment);
}

function renderSlide(index, updateHash = true) {
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];

  activeSlide.classList.remove("is-entering");
  activeSlide.src = getImagePath(currentSlide);
  activeSlide.alt = `Slide ${currentSlide + 1}: ${slide.title}`;
  activeSlide.addEventListener("load", () => activeSlide.classList.add("is-entering"), { once: true });

  slideCounter.textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
  slideTitle.textContent = slide.title;
  slideDescription.textContent = slide.description;
  previousButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === slides.length - 1;

  const thumbnailButtons = thumbnails.querySelectorAll(".slide-thumbnail");
  thumbnailButtons.forEach((button, buttonIndex) => {
    const isCurrent = buttonIndex === currentSlide;
    button.classList.toggle("is-current", isCurrent);
    button.setAttribute("aria-current", isCurrent ? "true" : "false");
  });

  const currentThumbnail = thumbnailButtons[currentSlide];
  currentThumbnail?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });

  if (updateHash) {
    history.replaceState(null, "", `#slide-${currentSlide + 1}`);
  }
}

previousButton.addEventListener("click", () => renderSlide(currentSlide - 1));
nextButton.addEventListener("click", () => renderSlide(currentSlide + 1));

thumbnails.addEventListener("click", (event) => {
  const button = event.target.closest(".slide-thumbnail");
  if (!button) {
    return;
  }

  renderSlide(Number(button.dataset.slideIndex));
});

window.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return;
  }

  if (event.key === "ArrowLeft" && currentSlide > 0) {
    event.preventDefault();
    renderSlide(currentSlide - 1);
  }

  if (event.key === "ArrowRight" && currentSlide < slides.length - 1) {
    event.preventDefault();
    renderSlide(currentSlide + 1);
  }

  if (event.key === "Home") {
    event.preventDefault();
    renderSlide(0);
  }

  if (event.key === "End") {
    event.preventDefault();
    renderSlide(slides.length - 1);
  }
});

window.addEventListener("hashchange", () => {
  const requestedSlide = getSlideIndexFromHash();
  if (requestedSlide !== currentSlide) {
    renderSlide(requestedSlide, false);
  }
});

renderThumbnails();
renderSlide(getSlideIndexFromHash(), false);
showChromeLinkForMessenger();
