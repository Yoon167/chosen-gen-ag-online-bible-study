import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7V8FXgLlxgoXMVjvnLyOB8_2cyCQtZ_U",
  authDomain: "chosen-gen--ag-bible-study.firebaseapp.com",
  projectId: "chosen-gen--ag-bible-study",
  storageBucket: "chosen-gen--ag-bible-study.firebasestorage.app",
  messagingSenderId: "512379848782",
  appId: "1:512379848782:web:067d5e59826adf58ff1b1f",
  measurementId: "G-3LTE2G37H6",
};

const app = initializeApp(firebaseConfig);

isSupported()
  .then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  })
  .catch(() => {
    // Analytics is optional and does not affect the Bible study experience.
  });

export { app };