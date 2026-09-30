# Gideon: phone test checklist and data backup

Use this after each release. Test on at least one Android phone and one iPhone,
with two accounts: an **AG leader** (you) and a **member** (a helper's phone).

Mark each item ✅ or write what went wrong.

## 1. Getting in

- [ ] New account: the welcome screen asks for your name and requires ticking "I agree" to the Privacy Notice.
- [ ] "Read the Privacy Notice" opens the full notice inside the welcome screen.
- [ ] An existing member sees the one-time "Your privacy" screen, can agree, and then reaches Home.
- [ ] Back up the account with Google (Profile → Back Up My Account) and sign in on a second phone with the same account.
- [ ] Language switch (EN/TL) changes the new screens.

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

- [ ] Journey tab shows all 8 levels; Home shows "Your next step".
- [ ] In a lesson, tapping a Bible reading opens the passage in a sheet with the verses highlighted (Tagalog too).
- [ ] Ticking all four steps completes the lesson; the level progress updates.
- [ ] With a mentor: turn on progress sharing (My AG); the mentor sees it in My Disciples and confirms the checkpoint; the level completes and the certificate prints.

## 5. Prayer, meetings, testimonies

- [ ] AG Prayer Wall: post named, anonymous, and urgent requests; "I prayed" counts once per person.
- [ ] Meetings: leader adds a weekly AG meeting; members see it in their own time zone; "Add to calendar" works; "I'm here" check-in appears during the meeting.
- [ ] Testimony: share one with "My AG"; it appears in the My AG tab for another member, not for someone outside the AG.

## 6. Bible and audio

- [ ] English chapter: 🎧 plays the human-narrated recording; it keeps playing with the screen off and moves to the next chapter.
- [ ] Tagalog chapter: 🎧 reads with the phone's voice and highlights each verse.
- [ ] Profile → Daily Quiet-Time Reminder adds a daily event to the phone calendar.

## 7. Private things stay private

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

## Before every rules deploy

```sh
cd firestore-tests
npm test        # all suites must pass
```
