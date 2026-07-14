# Chosen Gen AG Online Bible Study

A simple responsive landing page for the **Chosen Gen AG Online Bible Study**.

When the site opens, an ambient welcome screen presents Matthew 18:20. The verse gently zooms into place for 8 seconds, remains still for 2 seconds so visitors can read it, then reveals the Bible-study journey. Visitors who request reduced motion skip this animation.

## Live website

- Firebase Hosting: https://chosen-gen--ag-bible-study.web.app
- GitHub Pages: https://yoon167.github.io/chosen-gen-ag-online-bible-study/

## How it works

1. Select **Begin the journey** to reveal Part 1.
2. Select **Join Part 1 on Zoom** to open the first Zoom meeting.
3. After completing Part 1, select **I have finished Part 1**. Its section is hidden and Part 2 is revealed.
4. After Part 2, select **I have finished Part 2** to see the Bible-verse encouragement screen.

Progress is stored only in the browser using `localStorage`, so a visitor who refreshes the page stays on their current step. **Start again** clears that saved progress.

Each Zoom button is locked by default and has a live countdown using **Qatar time (UTC+3)**. Part 1 unlocks every Tuesday at 8:00 PM and Part 2 unlocks every Tuesday at 8:40 PM. After each scheduled session starts, its Zoom button becomes clickable until the end of Tuesday in Qatar.

## Files

- `index.html` — page structure and the supplied Zoom links
- `styles.css` — visual design, responsive layout, and animations
- `script.js` — sequential session visibility, saved progress, and Qatar-time button countdowns
- `firebase.js` — Firebase Analytics initialization for the configured Chosen Gen project
- `firebase.json` and `.firebaserc` — Firebase Hosting deployment configuration

Open `index.html` in a browser to use the site.
