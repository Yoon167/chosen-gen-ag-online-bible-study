# Gideon: phone test checklist and data backup

Use this after each release. Test on at least one Android phone and one iPhone,
with two accounts: an **AG leader** (you) and a **member** (a helper's phone).

Mark each item ✅ or write what went wrong.

## 1. Getting in

- [ ] Opening the app shows the sunrise landing page; the people walk, the rays turn, and nothing flickers or stutters (check in the browser **and** in the installed app).
- [ ] "Watch Introduction" plays the 30-second film smoothly, cutting through black between scenes, and returns to the landing page.
- [ ] "Explore Features" walks through the 10-step tour preview and ends with "Start Journey".
- [ ] Opening the landing page alone creates no account; tapping "Start Journey" does (one account only).
- [ ] New account: the welcome screen asks for your name and requires ticking "I agree" to the Privacy Notice.
- [ ] "Read the Privacy Notice" opens the full notice inside the welcome screen.
- [ ] An existing member sees the one-time "Your privacy" screen, can agree, and then reaches Home.
- [ ] Back up the account with Google (Profile → Back Up My Account) and sign in on a second phone with the same account.
- [ ] Language switch (EN/TL) changes the new screens.
- [ ] After the welcome screen, the App Tour starts by itself and spotlights each part; Profile → "Restart App Tour" runs it again.
- [ ] Profile → Install Gideon installs the app (Android), or shows the Add to Home Screen steps (iPhone, Messenger, computer). The iPhone launch screen shows the logo.
- [ ] Profile → Larger text makes every page easier to read.

## 2. AG (Accountability Group)

- [ ] Leader: My AG → "Invite someone" shows a QR code and link; Copy and Share work.
- [ ] Member: scanning the QR (or opening the link) lands on My AG with the invited AG highlighted.
- [ ] Member taps "Join AG"; leader sees the request in Manage Members and approves it.
- [ ] Leader: Manage Members → set a role (Assistant Leader, Mentor), a mentor, and an accountability partner.
- [ ] Profile shows the right role and AG name (e.g. "AG Leader · DD3 AG").

## 3. Weekly check-in

- [ ] Member: Home shows "Weekly check-in is waiting"; the check-in form saves.
- [ ] Partner sees the check-in, taps "I prayed for you" with a note; the member sees it.
- [ ] Leader: Leader Dashboard shows how many checked in and who hasn't, but never the answers.
- [ ] A member who is not the partner cannot see the check-in.

## 4. Discipleship journey

- [ ] Journey tab shows all the levels; Home shows "Your next step". Someone not yet in an AG sees lessons locked with a "Join your AG" note.
- [ ] In a lesson, tapping a Bible reading opens the passage in a sheet with the verses highlighted (Tagalog too).
- [ ] Ticking all four steps completes the lesson; the level progress updates.
- [ ] A lesson's reflection and quiz save; Badges unlock as lessons and habits add up.
- [ ] Spiritual Gifts test gives results and keeps them.
- [ ] "Use in an AG meeting" on a lesson opens the meeting guide; "Present" shows one part at a time in large type.
- [ ] With a mentor: turn on progress sharing (My AG); the mentor sees it in My Disciples and confirms the checkpoint; the level completes and the certificate prints.

## 5. Prayer, meetings, testimonies

- [ ] AG Prayer Wall: post named, anonymous, and urgent requests; "I prayed" counts once per person.
- [ ] Meetings: leader adds a weekly AG meeting; members see it in their own time zone; "Add to calendar" works; "I'm here" check-in appears during the meeting.
- [ ] Before a meeting, members answer "I'm coming" / "Can't"; the count and names update for everyone in the AG.
- [ ] AG announcements: leader posts one (pinned too); members see it on Home and can hide that card in Notifications.
- [ ] Sermon notes: leader posts an outline with blanks; members fill them in and see their answers later.
- [ ] Group reading plan: leader starts one; members tick their days and see who read.
- [ ] My Oikos: add people, share the list with the AG, pray for them.
- [ ] Testimony: share one with "My AG"; it appears in the My AG tab for another member, not for someone outside the AG.

## 6. Help, feelings and looking back

- [ ] Help in the Struggle: temptation, fear and doubt each show steps, verses (tap to read) and a prayer.
- [ ] Verses for How I Feel: each feeling shows comfort, verses and a prayer.
- [ ] Prayer & Fasting: the prayer timer chimes and vibrates at the end; a fast can be started and ended.
- [ ] What God Has Done: answered prayers, testimonies and milestones appear; "Share" makes an image.
- [ ] Home shows "Your week with God" after some activity; it can be turned off under Notifications.
- [ ] Memory verses: add one from a Bible verse; it comes back for review on the right days.

## 7. Bible and audio

- [ ] English chapter: 🎧 plays the human-narrated recording; it keeps playing with the screen off and moves to the next chapter.
- [ ] Tagalog chapter: 🎧 reads with the phone's voice and highlights each verse.
- [ ] Profile → Notifications & Reminders adds the quiet-time, memory and check-in reminders to the phone calendar.
- [ ] Tap a verse → "Share as image" makes a verse card.
- [ ] Offline Download: download the Bible and lessons, turn on airplane mode, and read them in the installed app.

## 8. National admin

- [ ] Profile → National Dashboard shows every AG, the totals, and what needs attention; Refresh and the CSV report work.
- [ ] Profile → AG Applications: approve and reject a test application.

## 9. Private things stay private

- [ ] Spiritual Assessment: requires "I understand and agree", a PIN, and a recovery code; results appear; lock and unlock work.
- [ ] Profile → Privacy & Delete Account: on a **test account only**, delete the account and confirm it signs out and its data is gone.

## Data backup (free plan)

The free Spark plan has no automatic backups. Until you upgrade:

1. **Monthly:** Leader Dashboard → download the members report (CSV) and keep it somewhere safe.
2. **Before big changes:** export the Firestore data. This needs the Blaze plan (it uses Cloud Storage):
   ```sh
   gcloud firestore export gs://YOUR-BACKUP-BUCKET/$(date +%F)
   ```
3. **When you move to Blaze:** turn on scheduled daily backups in Firebase Console → Firestore → Backups.

Spiritual Assessment answers are encrypted on each phone, so a backup never contains readable answers.

## App Check (bot protection, free)

App Check is built in but stays off until it has a key:

1. Create a **reCAPTCHA v3** key at <https://www.google.com/recaptcha/admin> for `gideon-app.web.app` (and `chosen-gen--ag-bible-study.web.app` if used).
2. Firebase Console → App Check → Apps → register the web app with reCAPTCHA v3 and paste the **secret** key.
3. Build with the **site** key: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY=... npm run build`, then deploy.
4. Watch App Check → Metrics for a week. When nearly all requests are verified, turn on **Enforce** for Cloud Firestore (older installed copies must have updated first).

## Before every rules deploy

```sh
cd firestore-tests
npm test        # all suites must pass
```
