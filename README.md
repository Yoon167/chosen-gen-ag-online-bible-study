# Chosen Gen AG Online Bible Study

A simple responsive landing page for the **Chosen Gen AG Online Bible Study**.

When the site opens, an ambient welcome screen presents Matthew 18:20. The verse gently zooms into place for 8 seconds, remains still for 2 seconds so visitors can read it, then reveals the Bible-study journey.

## Live website

- Firebase Hosting: https://chosen-gen--ag-bible-study.web.app
- GitHub Pages: https://yoon167.github.io/chosen-gen-ag-online-bible-study/
- Updated previous teaching: https://chosen-gen--ag-bible-study.web.app/previous-teaching.html?v=messenger-browser-1

## How it works

1. Select **Begin the journey** to reveal Part 1.
2. Select **Join Part 1 on Zoom** to open the first Zoom meeting.
3. After completing Part 1, select **I have finished Part 1**. Its section is hidden and Part 2 is revealed.
4. After Part 2, select **I have finished Part 2** to see the Bible-verse encouragement screen.
5. Select **Go to previous teaching** to open the web-based *What God Can Do* slide deck. It uses the provided PDF as visual slides and adds a short description beneath each one.

Progress is stored only in the browser using `localStorage`, so a visitor who refreshes the page stays on their current step. **Start again** clears that saved progress.

Each Zoom button is locked by default and has a live countdown using **Qatar time (UTC+3)**. Part 1 unlocks every Tuesday at 8:00 PM and Part 2 unlocks every Tuesday at 8:40 PM. After each scheduled session starts, its Zoom button becomes clickable until the end of Tuesday in Qatar.

## Weekly teaching manager

Topics are stored centrally in Firestore, not in a visitor's browser. Every saved teaching remains in the **Teaching library** on the home page. The earliest scheduled Tuesday on or after today is automatically shown as the upcoming study and its Part 1 / Part 2 Zoom links replace the default links.

### One-time Firebase setup

1. In the [Firebase console](https://console.firebase.google.com/), open the `chosen-gen--ag-bible-study` project and create a **Cloud Firestore** database.
2. In **Authentication**, enable **Email/Password**, then create one dedicated admin account. Do not add a public sign-up feature.
3. Copy that account's **User UID** from Firebase Authentication and replace `REPLACE_WITH_YOUR_FIREBASE_AUTH_UID` in `firestore.rules`.
4. Deploy the rule and updated site:

```powershell
firebase deploy --only firestore:rules,hosting
```

The rule allows everyone to read the teaching library but only that one Firebase account can create, edit, or delete a topic.

### Every Tuesday

1. Open `https://chosen-gen--ag-bible-study.web.app/manage-topics.html`.
2. Sign in with the dedicated admin account.
3. Select the Tuesday date, enter the topic, optional verse, Zoom links, and an optional teaching-resource link, then select **Save teaching**.

The new topic appears immediately for visitors. There is no need to edit code, publish again, or ask for another prompt each week. Use **Edit** for corrections or **Delete** to remove a saved teaching.

## Files

- `index.html` — page structure and the supplied Zoom links
- `styles.css` — visual design, responsive layout, and animations
- `script.js` — sequential session visibility, saved progress, and Qatar-time button countdowns
- `topics.js` — loads the public Firestore teaching archive and next scheduled topic
- `manage-topics.html` and `manage-topics.js` — authenticated no-code topic manager
- `firestore.rules` — public-read, admin-only-write Firestore rules
- `previous-teaching.html` and `previous-teaching.js` — accessible web slide deck for the previous teaching
- `assets/previous-teaching/` — slide images rendered from the provided *Divine_Identity.pdf* source
- `firebase.js` — Firebase Analytics initialization for the configured Chosen Gen project
- `firebase.json` and `.firebaserc` — Firebase Hosting deployment configuration

Open `index.html` in a browser to use the site.
