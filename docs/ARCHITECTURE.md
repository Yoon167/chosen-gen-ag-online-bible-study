# Gideon: A Christian Journey — Platform Architecture

Blueprint for growing Gideon from a single-church app (Chosen Gen AG) into a
multi-church discipleship platform for the Philippines. It is written against
the code as it exists today (`gideon-app/`, `firestore.rules`) so each section
says what changes, not only what the end state looks like.

Contents

1. System architecture
2. Firebase database structure
3. Firestore collections
4. Security rules
5. User roles
6. UI/UX screens
7. National admin dashboard
8. Pastor dashboard
9. Church dashboard
10. Mobile app screens
11. Web app screens
12. API structure
13. Feature roadmap
14. Multi-church architecture
15. Tech stack
16. Deployment plan
17. Security and privacy plan (including the Spiritual Assessment vault)
18. Philippines-wide expansion strategy

---

## 0. Where the app is today

| Area | Current state | Consequence for scaling |
|---|---|---|
| Frontend | Next.js 16, `output: "export"` (static), PWA, Tailwind + shadcn, EN/TL i18n | Good fit. No server runtime, so privileged logic must live in Cloud Functions. |
| Auth | Anonymous sign-in, optional account linking | Anonymous accounts vanish when a phone is wiped. Sensitive features (assessment, church membership, leadership) must require a real account. |
| Data | `users/{uid}/…` private subtrees, `topics`, `communityTestimonies` | Single-tenant: no `churchId` anywhere. |
| Roles | `member` / `leader` on the user doc; one hard-coded admin UID in rules | Any leader can read **every** user profile and promote **anyone** to leader. Fine for one church, unsafe for many. |
| Meetings | Hard-coded weekly Google Meet link in `lib/content/church-meetings.ts` (Part 2 removed) | Needs to become per-church data. |
| Bible | bible-api.com (EN, WEB) + getbible.net (Tagalog, Ang Dating Biblia) | Both public-domain texts, so generating and caching audio is allowed. |

The plan keeps this stack and adds a Cloud Functions backend, church
tenancy, and custom-claims roles. No rewrite is needed.

---

## 0.1 Current decision: free tier first (Spark plan, no Cloud Functions)

For now Gideon stays on the free Spark plan. Cloud Functions need the Blaze
plan, so everything in this document that says "function" either moves into the
client (with Firestore rules doing the enforcement) or waits. Blaze keeps the
same free quota and only bills above it, so upgrading later is not a rewrite.
Set a budget alert on the day you switch.

**Spark limits to watch.** Check current numbers in the Firebase pricing page.

| Resource | Free limit | What uses it |
|---|---|---|
| Firestore reads | 50,000 / day | Every list, dashboard and rule `get()` |
| Firestore writes | 20,000 / day | Prayers, notes, progress, likes |
| Firestore storage | 1 GiB | Fine for years at one to a few churches |
| Hosting transfer | ~360 MB / day | App downloads **and the background music** in `/audio`. This is the first limit you are likely to hit. |
| Auth | Email and Google: free. Phone (SMS) and MFA: need Blaze / Identity Platform | Skip phone login and MFA for now |

Spark is realistic for about one to five churches. Upgrade when reads or Hosting
transfer regularly pass about 70% of the daily limit.

**How each part works without functions**

| Feature | Free-tier approach | Trade-off versus the full design |
|---|---|---|
| Login | Email and **Google** (done), guest → account upgrade keeps the same uid | No phone login, no MFA |
| Roles | Role lives in `churches/{cid}/members/{uid}`. Rules read it with `get()` instead of custom claims. Rules enforce "only rank 6 can change roles, never above their own" | Each `get()` costs one read |
| Church registration | Applicant writes `churchApplications`. The national admin approves **in the app**. Rules allow only the admin to create `churches/{id}` and the first Senior Pastor membership | Approval is several client writes instead of one atomic function. Use a Firestore batch write so it stays all-or-nothing |
| Spiritual Assessment vault | **Unchanged.** Encryption and scoring already run on the device | None. This feature fits the free tier completely |
| AI reflection / Gideon AI | Wait. An AI API key cannot be put in client code | Possible free option later: Firebase AI Logic with the Gemini free tier (check terms and data use before sending anything sensitive) |
| Audio Bible | Web Speech API on the device (free, works offline) | Voice quality and Tagalog voice availability depend on the phone. Pre-generated natural voices wait for Blaze |
| Meetings | Leaders paste Meet or Teams links; "Add to calendar" downloads an `.ics` file with a reminder alarm | No automatic link creation and no server push reminders; the phone's calendar does the reminding |
| Counters (prayed, likes) | Client uses `increment(1)`; rules allow a change of exactly +1 or -1 together with the matching `prayedBy/{uid}` doc | Small drift is possible; acceptable |
| Pastor stats | Pastor dashboard computes from the roster and progress summaries when opened | Fine for a few hundred members; switch to nightly stats docs on Blaze |
| Anonymous prayer | The post stores no `authorUid`. The author keeps the post id on their device and cannot edit it later; a ministry leader can remove it | Not editable after posting |
| Moderation | New posts start as `held`; ministry leaders approve in a queue | No AI pre-screening |
| Audit log | Client appends to `auditLogs` in the same batch as the action; rules require `actorUid == auth.uid` and forbid updates and deletes | Users cannot tamper with it, but it is not independent of the client |
| Backups | Manual export from the console once a month | Scheduled backups need Blaze |

**Free-tier build order**

1. Google login (done), and ask existing members to back up their account
2. Spiritual Assessment vault: fully free and the most requested private feature
3. `churches/chosen-gen-ag` structure + roles in membership docs + rules tests on the emulator (the emulator is free)
4. Church registration and approval
5. Journey levels 1–4 with mentor checkpoints
6. Prayer wall, anonymous and emergency prayer (in-app alert only)
7. Audio Bible with device voices

---

## 1. Full system architecture

```
                    ┌───────────────────────────────────────────────────┐
  Android / iOS     │  Gideon client (Next.js static export, PWA)       │
  (Capacitor shell) │  • UI, offline cache (Firestore IndexedDB)        │
  Desktop browser ──►  • Web Crypto vault (assessment encryption)       │
                    │  • Audio Bible player (cached audio + Web Speech) │
                    └──────┬───────────────┬───────────────┬────────────┘
                           │ Auth          │ reads/writes  │ callable fns
                           ▼               ▼               ▼
                 ┌──────────────┐ ┌────────────────┐ ┌──────────────────────┐
                 │ Firebase Auth│ │ Cloud Firestore│ │ Cloud Functions (v2) │
                 │ + Identity   │ │ (rules enforce │ │ asia-southeast1      │
                 │ Platform MFA │ │  tenancy/roles)│ │ • church approval    │
                 └──────┬───────┘ └───────┬────────┘ │ • role/claims mgmt   │
                        │ custom claims   │ triggers │ • stats aggregation  │
                        └─────────────────┴─────────►│ • moderation         │
                                                     │ • Gideon AI proxy    │
                                                     │ • Meet/Teams/Calendar│
                                                     │ • reminders (FCM)    │
                                                     │ • audit log writer   │
                                                     └──┬───────┬────────┬──┘
                                                        │       │        │
                         ┌──────────────────────────────┘       │        └───────────┐
                         ▼                                      ▼                    ▼
               ┌──────────────────┐              ┌─────────────────────┐  ┌────────────────────┐
               │ Cloud Storage    │              │ Claude API          │  │ Google Calendar /  │
               │ lesson videos,   │              │ (Gideon AI, mod.)   │  │ Meet, MS Graph     │
               │ TTS audio, certs │              │ zero-retention      │  │ (Teams) via OAuth  │
               └──────────────────┘              └─────────────────────┘  └────────────────────┘
                         │
                         ▼
               ┌──────────────────┐      ┌───────────────────────────────┐
               │ Firebase Hosting │      │ BigQuery (Firestore export)   │
               │ + CDN            │      │ national analytics, no PII    │
               └──────────────────┘      └───────────────────────────────┘
```

Design principles

1. **Client is untrusted.** Anything that grants power (approving a church,
   changing a role, issuing a certificate) happens in a Cloud Function that
   checks the caller's claims and writes an audit log. Firestore rules deny
   these writes from clients.
2. **Tenancy by `churchId`.** Every church-owned document lives under
   `churches/{churchId}/…`, and rules compare it to the caller's claim.
3. **Aggregates, not raw data, for oversight.** Pastors and overseers read
   pre-computed stats documents. They never query across members' private
   subtrees. This is what keeps the pastor dashboard about care rather than
   surveillance, and it keeps Firestore read costs flat as churches grow.
4. **The Spiritual Assessment is encrypted on the device.** The server stores
   ciphertext only. See §17.1.
5. **Offline first.** Many members are on prepaid mobile data. Lessons, Bible
   text, audio and the user's own data must work without a connection.

---

## 2. Firebase database structure

One Firebase project per environment (`gideon-dev`, `gideon-staging`,
`gideon-prod`). Data splits into five zones with different access patterns:

| Zone | Path root | Who reads | Who writes |
|---|---|---|---|
| Public catalogue | `churchesPublic`, `curriculum`, `bibleAudio` | Everyone signed in | Functions / national admin |
| Church tenant | `churches/{churchId}/…` | Members of that church (scoped by role) | Members (own items), leaders, functions |
| Private member | `users/{uid}/…` | Owner only | Owner only |
| Encrypted vault | `users/{uid}/vault/…` | Owner only (ciphertext) | Owner only (ciphertext shape enforced) |
| System | `auditLogs`, `churchApplications`, `moderation`, `rateLimits` | National admin (via functions) | Functions only |

Roles are stored in **two places**:

- **Custom claims** on the Auth token (`role`, `churchId`, `churchRole`,
  `regionId`, `districtId`). Rules read these for free, with no `get()` cost.
- **A membership document** (`churches/{churchId}/members/{uid}`) that is the
  source of truth and is readable in the UI. A Cloud Function keeps the claims in
  sync whenever the membership document changes.

---

## 3. Firestore collections

`★` = new, `✎` = exists today and changes, unmarked = exists and stays.

```
★ regions/{regionId}                       name, overseerUids[]
★ districts/{districtId}                   name, regionId, leaderUids[]

★ churchApplications/{appId}               submitted by an applicant
    churchName, pastorName, location, province, city, email, phone, website,
    denomination, memberCount, submittedBy (uid), status: pending|approved|rejected,
    reviewNote, reviewedBy, reviewedAt, createdAt

★ churchesPublic/{churchId}                shown in "Find your church"
    name, city, province, denomination, logoUrl, joinPolicy: open|approval|code,
    status: active|suspended

★ churches/{churchId}                      private church settings
    name, pastorUid, regionId, districtId, timezone, createdAt, plan,
    ★ members/{uid}                         churchRole, joinedAt, groupIds[],
                                             mentorUid, status: pending|active|left,
                                             shareProgressWithMentor: bool
    ★ groups/{groupId}                      name, type: cell|ministry|class, leaderUids[]
    ★ mentorships/{id}                      mentorUid, discipleUid, status, startedAt
    ★ meetings/{meetingId}                  title, type, startsAt, recurrence,
                                             platform, link, groupId?, createdBy
        ★ attendance/{uid}                  present, checkedInAt
    ★ prayerWall/{prayerId}                 authorUid (null if anonymous*),
                                             category, text, urgent, prayedCount,
                                             answered, visibility: church|group
        ★ prayedBy/{uid}
    ★ posts/{postId}                        type: testimony|story|update|event|mentor,
                                             authorUid, body, mediaUrls[], likeCount,
                                             commentCount, moderation: ok|held|removed
        ★ comments/{commentId}
        ★ likes/{uid}
    ★ announcements/{id}
    ★ stats/{period}                        written ONLY by functions (see §8)
    ✎ topics/{topicId}                       moves from root `topics` (teaching library)

✎ users/{uid}                              private profile
    displayName, photoUrl, language, primaryChurchId, createdAt, lastActiveAt
    (role field removed: roles now live in claims + membership)
    prayers/, notes/, testimonies/, milestones/, devotions/, bibleBookmarks/,
    bibleHighlights/, bibleNotes/, readingPlans/, meetings/   (existing, unchanged)
    ★ journeyProgress/{levelId}             lessonsDone[], assignmentsDone[],
                                             reflectionsDone[], mentorCheckpoints{},
                                             startedAt, completedAt
    ★ prayerReminders/{id}
    ★ answeredPrayers/{id}
    ★ aiConversations/{id}                  optional, user-controlled, auto-deleted after 30 days
    ★ vault/keys                            wrapped data-encryption key (see §17.1)
    ★ vault/assessments/{id}                { ct, iv, v, createdAt }  (ciphertext only)
    ★ vault/summary                         { ct, iv, v, updatedAt }  (ciphertext only)

★ curriculum/{levelId}                     level 1–8 metadata
    ★ lessons/{lessonId}                    videoUrl, readingPlan[], assignment,
                                             reflectionQuestions[], prayerExercise,
                                             checkpoint: none|mentor|pastor, order

★ certificates/{certId}                    uid, churchId, levelId, issuedBy, issuedAt,
                                             verifyCode (public verification page)
★ prayerPartners/{pairId}                  churchId, uids[2], since, active
★ auditLogs/{id}                           actorUid, action, target, churchId, at, meta
★ moderation/{reportId}                    churchId, target path, reason, reporterUid, status
★ rateLimits/{uid_action}                  counters for anti-spam (functions only)

✎ communityTestimonies/{id}                → migrates to churches/{churchId}/posts (type testimony)
```

\* Anonymous prayer requests: the client writes the request through a callable
function, and the function stores `authorUid: null`. The author's uid goes only
into `users/{uid}/prayers` so they can still edit or remove the request. Nobody in
the church, including the pastor, can link the request to its author.

Indexes to create up front: `prayerWall (category, createdAt desc)`,
`posts (moderation, createdAt desc)`, `meetings (startsAt)`,
`members (status, churchRole)`, `churchApplications (status, createdAt)`.

---

## 4. Security rules

Draft of the v2 rules. They depend on custom claims, so deploy them together
with the claims migration (Phase 1, §13). Test every rule with the Firestore
emulator (`@firebase/rules-unit-testing`) in CI before deploying.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ---------- helpers ----------
    function signedIn()      { return request.auth != null; }
    function realAccount()   { return signedIn() && request.auth.token.firebase.sign_in_provider != 'anonymous'; }
    function isSelf(uid)     { return signedIn() && request.auth.uid == uid; }
    function claims()        { return request.auth.token; }
    function isNational()    { return signedIn() && claims().role == 'national_admin'; }
    function inChurch(cid)   { return signedIn() && claims().churchId == cid; }
    function churchRank(cid) {
      // member=1 mentor=2 cell_leader=3 ministry_leader=4 associate_pastor=5 senior_pastor=6
      return inChurch(cid) ? claims().get('churchRank', 1) : 0;
    }
    function atLeast(cid, rank) { return churchRank(cid) >= rank; }
    function mfa()           { return signedIn() && claims().firebase.get('sign_in_second_factor', null) != null; }
    function unchanged(keys) { return !request.resource.data.diff(resource.data).affectedKeys().hasAny(keys); }

    // ---------- public catalogue ----------
    match /churchesPublic/{cid}     { allow read: if signedIn(); allow write: if false; }
    match /curriculum/{levelId}/{rest=**} { allow read: if signedIn(); allow write: if false; }
    match /certificates/{certId}    { allow read: if isSelf(resource.data.uid) || isNational();
                                      allow write: if false; }

    // ---------- church applications ----------
    match /churchApplications/{appId} {
      allow create: if realAccount()
        && request.resource.data.submittedBy == request.auth.uid
        && request.resource.data.status == 'pending'
        && request.resource.data.keys().hasOnly(['churchName','pastorName','location','province',
             'city','email','phone','website','denomination','memberCount','submittedBy','status','createdAt']);
      allow read: if isSelf(resource.data.submittedBy) || isNational();
      allow update, delete: if false;          // approval goes through a function
    }

    // ---------- church tenant ----------
    match /churches/{cid} {
      allow read: if inChurch(cid) || isNational();
      allow write: if false;                   // settings change via function (audited)

      match /members/{uid} {
        // A member sees their own record, and leaders see the roster.
        allow read: if isSelf(uid) || atLeast(cid, 3) || isNational();
        // Join request: self, pending, lowest rank only.
        allow create: if realAccount() && isSelf(uid)
          && request.resource.data.status == 'pending'
          && request.resource.data.churchRole == 'member';
        // Members may only toggle their own sharing preference.
        allow update: if isSelf(uid)
          && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['shareProgressWithMentor']);
        allow delete: if isSelf(uid);          // leave church
      }

      match /groups/{gid}       { allow read: if inChurch(cid); allow write: if atLeast(cid, 5); }
      match /mentorships/{id}   { allow read: if isSelf(resource.data.mentorUid) || isSelf(resource.data.discipleUid) || atLeast(cid, 5);
                                  allow write: if atLeast(cid, 5); }
      match /announcements/{id} { allow read: if inChurch(cid); allow write: if atLeast(cid, 4); }
      match /stats/{period}     { allow read: if atLeast(cid, 3) || isNational(); allow write: if false; }
      match /topics/{tid}       { allow read: if inChurch(cid); allow write: if atLeast(cid, 3); }

      match /meetings/{mid} {
        allow read: if inChurch(cid);
        allow write: if atLeast(cid, 3);
        match /attendance/{uid} {
          allow read: if isSelf(uid) || atLeast(cid, 3);
          allow create: if isSelf(uid) && inChurch(cid);   // self check-in
          allow update, delete: if atLeast(cid, 3);        // leader corrects roll
        }
      }

      match /prayerWall/{pid} {
        allow read: if inChurch(cid);
        allow create: if inChurch(cid) && realAccount()
          && request.resource.data.authorUid == request.auth.uid
          && request.resource.data.text.size() <= 2000
          && request.resource.data.prayedCount == 0;
        allow update: if isSelf(resource.data.authorUid) && unchanged(['authorUid','prayedCount']);
        allow delete: if isSelf(resource.data.authorUid) || atLeast(cid, 4);
        match /prayedBy/{uid} { allow read: if inChurch(cid);
                                allow create, delete: if isSelf(uid) && inChurch(cid); }
      }

      match /posts/{postId} {
        allow read: if inChurch(cid) && (resource.data.moderation == 'ok' || isSelf(resource.data.authorUid) || atLeast(cid, 4));
        allow create: if inChurch(cid) && realAccount()
          && request.resource.data.authorUid == request.auth.uid
          && request.resource.data.moderation == 'held'      // functions release to 'ok'
          && request.resource.data.likeCount == 0 && request.resource.data.commentCount == 0;
        allow update: if isSelf(resource.data.authorUid) && unchanged(['authorUid','moderation','likeCount','commentCount']);
        allow delete: if isSelf(resource.data.authorUid) || atLeast(cid, 4);
        match /likes/{uid}    { allow read: if inChurch(cid); allow create, delete: if isSelf(uid) && inChurch(cid); }
        match /comments/{c}   { allow read: if inChurch(cid);
                                allow create: if inChurch(cid) && request.resource.data.authorUid == request.auth.uid
                                              && request.resource.data.body.size() <= 1000;
                                allow delete: if isSelf(resource.data.authorUid) || atLeast(cid, 4); }
      }
    }

    // ---------- private member data ----------
    match /users/{uid} {
      allow read, create, update, delete: if isSelf(uid);   // no leader access any more

      match /vault/keys {
        allow read, write: if isSelf(uid) && realAccount();
      }
      match /vault/{kind}/{docId} {
        // Enforce ciphertext shape so a client bug can never store plaintext answers.
        allow read, delete: if isSelf(uid) && realAccount();
        allow create, update: if isSelf(uid) && realAccount()
          && request.resource.data.keys().hasOnly(['ct','iv','v','createdAt','updatedAt'])
          && request.resource.data.ct is string && request.resource.data.iv is string;
      }
      match /journeyProgress/{levelId} {
        allow read, write: if isSelf(uid);
        // Mentor checkpoints are written by a function after mentor sign-off.
      }
      match /{sub}/{docId} { allow read, write: if isSelf(uid); }
    }

    // ---------- system (functions only) ----------
    match /auditLogs/{id}    { allow read: if isNational(); allow write: if false; }
    match /moderation/{id}   { allow create: if signedIn() && request.resource.data.reporterUid == request.auth.uid;
                               allow read, update: if false; }
    match /rateLimits/{id}   { allow read, write: if false; }
    match /regions/{id}      { allow read: if signedIn(); allow write: if false; }
    match /districts/{id}    { allow read: if signedIn(); allow write: if false; }
  }
}
```

Changes from today's rules

- `isAdmin()` with a hard-coded UID becomes the `national_admin` claim.
- Leaders **lose** read access to `users/{uid}`. Leaders see the church roster
  (`members/`) and `stats/`. They do not see private prayers, notes or journals.
- A leader can no longer promote anyone. Role changes go through
  `setChurchRole`, which checks that the caller outranks both the target's
  current role and the new role.
- Storage rules follow the same pattern: `churches/{cid}/**` by claim,
  `users/{uid}/**` owner only, `curriculum/**` and `bibleAudio/**` read-only.

---

## 5. User roles

| # | Role | Scope | Claim | Can do | Cannot do |
|---|---|---|---|---|---|
| 1 | National Admin | All | `role: national_admin` (MFA required) | Approve or reject churches, suspend churches, manage regions and districts, read the audit log, read national aggregates | Read any member's private data or vault. Read church prayer walls unless invited. |
| 2 | Regional Overseer | Region | `regionId`, `role: overseer` | Read aggregate stats for the churches in the region, support pastors | Read individual member data |
| 3 | District Leader | District | `districtId`, `role: district` | Same as overseer, for the district | Read individual member data |
| 4 | Senior Pastor | Church | `churchRank: 6` | Everything in the church: roles, groups, mentors, reports, settings | Read vaults. Read private prayers. |
| 5 | Associate Pastor | Church | `churchRank: 5` | Assign mentors, manage groups, sign off pastor checkpoints | Change senior-pastor settings or roles above rank 4 |
| 6 | Ministry Leader | Church | `churchRank: 4` | Announcements, moderation, their ministry's groups and meetings | Assign roles |
| 7 | Cell Leader | Church | `churchRank: 3` | Their cell's meetings, attendance, roster, cell-level stats | Other cells' detail |
| 8 | Mentor | Church | `churchRank: 2` | Progress of disciples **who opted in** (`shareProgressWithMentor`), mentor checkpoints | See disciples who did not opt in |
| 9 | Member | Church | `churchRank: 1` | Own journey, prayer wall, feed, meetings, assessment | — |

Rules for role changes

- Only a function (`setChurchRole`) changes roles. The caller must have a
  higher rank than both the target's current role and the requested role.
- National admin sets the first Senior Pastor when the church is approved.
- A church can have at most one Senior Pastor. A transfer needs the current
  Senior Pastor's confirmation, or a national admin action with a written reason
  in the audit log.
- Rank 5 and above must turn on MFA before the role takes effect.

---

## 6. UI/UX design system

Brand

| Token | Light | Dark | Use |
|---|---|---|---|
| `--primary` (Deep Blue) | `#14295C` | `#8FA8E8` | Navigation, primary buttons, headers |
| `--accent` (Gold) | `#C9A227` | `#E0BF52` | Highlights, progress, certificates, verse of the day |
| `--background` | `#FFFFFF` | `#0B1224` | Page |
| `--surface` | `#F6F7FB` | `#131C33` | Cards |
| `--text` | `#0F172A` | `#E7ECF7` | Body |
| `--danger` | `#B42318` | `#F97066` | Emergency prayer, destructive actions |

- Type: a serif for scripture (e.g. Lora or Source Serif) and a humanist sans for UI (the current Tailwind stack is fine).
- Tone: warm and pastoral. Say "Your journey", "Pray with", "Grow". Avoid "Performance", "Compliance", "Tracking" in member-facing text.
- Accessibility: WCAG 2.2 AA contrast in both themes, minimum 44px tap targets, and text that scales to 200%.
- Every screen ships with English and Tagalog strings (the existing `i18n.tsx` pattern).
- Motion: short and gentle (Framer Motion is already installed). Honour `prefers-reduced-motion`.

---

## 7. National admin dashboard (web, desktop first)

```
┌ Gideon National ─────────────────────────────────────────────────────────┐
│ Applications (12 pending)  Churches  Regions  Analytics  Audit  Settings │
├──────────────────────────────────────────────────────────────────────────┤
│ ┌ KPIs ────────────────────────────────────────────────────────────────┐ │
│ │ Active churches 412 │ Active disciples 38,210 │ L2+ completion 41%   │ │
│ └──────────────────────────────────────────────────────────────────────┘ │
│ ┌ Pending applications ─────────────┐ ┌ Growth by region (map) ──────┐ │
│ │ Grace AG Iloilo · 120 · 2d ago  ▶ │ │   Luzon ▇▇▇▇  Visayas ▇▇     │ │
│ │ Victory Fellowship Tarlac · 3d  ▶ │ │   Mindanao ▇  OFW ▇          │ │
│ └───────────────────────────────────┘ └──────────────────────────────┘ │
│ ┌ Churches needing support ─────────────────────────────────────────┐   │
│ │ No active mentor in 30 days · Low lesson engagement · No pastor   │   │
│ └───────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

Application review screen: the applicant's details, a verification checklist
(pastor contact called, denomination confirmed, SEC or denominational
registration seen), approve or reject with a required note. Approving calls
`approveChurch`, which:

1. generates a `churchId` (slug plus a short random suffix, e.g. `grace-ag-iloilo-7k2f`),
2. creates `churches/{id}` and `churchesPublic/{id}`,
3. makes the applicant Senior Pastor (membership plus claims),
4. writes an audit log entry and emails the pastor.

Rejecting stores the note and notifies the applicant, who can reapply.

---

## 8. Pastor dashboard (care, not surveillance)

The pastor sees **people who need care** and **church-level trends**. The
pastor does not see what people wrote in private.

```
┌ Grace AG Iloilo · Pastor ───────────────────────── This week ▾ ─────────┐
│ ┌ Who to reach out to ──────────────────────────────────────────────┐   │
│ │ 🕊  Ana R.      Asked for pastoral follow-up (from her prayer req)│   │
│ │ 🌱  6 new believers have no mentor yet            [Assign mentors]│   │
│ │ ⏸  4 disciples inactive 21+ days (shared with mentor)   [View]   │   │
│ └───────────────────────────────────────────────────────────────────┘   │
│ ┌ Journey ─────────────┐ ┌ Attendance ──────────┐ ┌ Prayer ──────────┐ │
│ │ L1 ▇▇▇▇▇ 48          │ │ Sun  ▁▃▅▆▇  +8%      │ │ 37 requests      │ │
│ │ L2 ▇▇▇ 31            │ │ Cells ▂▄▄▅▆          │ │ 12 answered 🙌   │ │
│ │ L3 ▇▇ 17 … L8 ▏1     │ │                      │ │ 2 urgent         │ │
│ └──────────────────────┘ └──────────────────────┘ └──────────────────┘ │
│ ┌ Lesson completion ───────────────┐ ┌ Mentors ───────────────────────┐ │
│ │ L2 · "Assurance" 82%             │ │ Bro. Mark · 4 disciples · ✔    │ │
│ │ L2 · "Prayer"    54%  ◀ review   │ │ Sis. Joy  · 6 disciples · ⚠ load│ │
│ └──────────────────────────────────┘ └────────────────────────────────┘ │
│ [Groups] [Meetings] [Leaders] [Reports ▸ PDF / CSV]                      │
└──────────────────────────────────────────────────────────────────────────┘
```

Data sources

- Charts read `churches/{cid}/stats/{yyyy-ww}` and `{yyyy-mm}`, which a
  scheduled function computes nightly from membership, attendance,
  `journeyProgress` counters and prayer wall counts.
- "Who to reach out to" appears only for members who **asked** for follow-up,
  have **no mentor**, or have **opted in** to sharing with their mentor.
- Assessment data never appears here. A member can press "Ask my pastor
  to pray with me" in their assessment results, which sends a message they
  write themselves. Their answers stay in the vault.
- Reports export aggregates plus the roster. The export itself is logged in
  `auditLogs`.

---

## 9. Church dashboard (what the whole church sees)

This is the member's "My Church" tab:

- Church header: name, pastor, service times, location map, giving link (later)
- Upcoming meetings with a one-tap **Join** (Meet or Teams) and **Add to calendar**
- Announcements
- Prayer wall (church or group)
- Community feed (testimonies, faith stories, events)
- My group and my mentor
- Church journey progress ("The church completed 214 lessons this month"). Aggregates only.

Leaders get an extra **Manage** tab with the roster, groups, meetings,
attendance, announcements and the moderation queue.

---

## 10. Mobile app screens

Bottom navigation (five tabs, extending the current `bottom-nav.tsx`):

| Tab | Screens |
|---|---|
| **Home** | Greeting and streak · Verse of the day · Continue lesson · Next meeting · Prayer reminders · Quick add (FAB) |
| **Bible** | Book grid · Chapter reader · **Audio player** (mini bar and full sheet) · Plans · Bookmarks, highlights, notes · History |
| **Journey** | Level map (L1–L8) · Level detail · Lesson (video, reading, reflection, prayer exercise, assignment) · Mentor checkpoint · Certificates · **Spiritual Assessment** (vault) |
| **Church** | Find or join church · My church · Meetings · Prayer wall · Feed · Groups · (Leaders: Manage) |
| **Me** | Profile · My prayers and answered journal · Notes · Testimonies · Gideon AI · Settings (language, theme, voice, security/MFA, privacy and data export/delete) |

Key flows

1. **Onboarding:** welcome and language → continue as guest *or* create an
   account → find your church (search by city, or enter an invite code) → join
   request → Level 1 starts.
2. **Assessment:** intro and privacy explainer → create vault PIN and save
   the recovery code → questions (one topic per page, "skip" always available)
   → results on the device → optional "Pray with my pastor" or "Get AI
   reflection" (§17.1).
3. **Emergency prayer:** a red button on the prayer wall → short text →
   notifies the prayer team and on-duty leaders by push. If the text looks like
   self-harm, the app also shows crisis hotlines (NCMH Crisis Hotline 1553; check
   the numbers before launch).

Audio Bible player (full sheet)

```
┌──────────────────────────────┐
│  Juan 3  ·  Tagalog (ADB)    │
│  16 Sapagka't gayon na lamang│  ◀ verse being read is highlighted in gold,
│  inibig ng Dios ang sanlibutan│    auto-scrolls
│  ...                         │
│  ─────────●──────── 2:14/6:02│
│   ⏮ verse   ⏯   verse ⏭     │
│  0.75× 1× 1.25× 1.5×          │
│  Voice: ♀ Maria  ♂ Jose      │
│  ⬇ Save offline   🔖  ↗ Share │
└──────────────────────────────┘
```

---

## 11. Web app screens

The same PWA runs responsively. At `lg` and wider:

- A left sidebar replaces the bottom nav. Reader and dashboards use two columns.
- **Leader console** (`/manage/*`): roster table with filters, group
  builder, meeting scheduler with a recurrence editor, attendance grid,
  moderation queue, report builder.
- **National console** (`/national/*`): applications, church directory,
  regions, analytics, audit log. It is a separate route group whose layout checks the
  `national_admin` claim and requires MFA.
- **Public pages** (no login): landing page, church application form,
  certificate verification (`/verify/{code}`), privacy policy.

Because the app is a static export, the role checks in these layouts are
for UX only. Rules and functions do the real enforcement.

---

## 12. API structure (Cloud Functions v2, `asia-southeast1`)

Callable functions (HTTPS, App Check enforced, auth required):

| Function | Caller | Purpose |
|---|---|---|
| `submitChurchApplication` | Signed-in user | Validates, rate-limits (1 per 24h), writes application |
| `approveChurch` / `rejectChurch` | National admin + MFA | §7 workflow |
| `suspendChurch` | National admin + MFA | Sets status and revokes claims |
| `requestJoinChurch` / `approveMember` | Member / cell leader+ | Membership and claims sync |
| `setChurchRole` | Rank above target | Role change, claims sync, audit |
| `assignMentor` | Associate pastor+ | Creates mentorship, notifies both |
| `signOffCheckpoint` | Mentor/pastor | Writes the checkpoint to the disciple's `journeyProgress` |
| `issueCertificate` | Pastor (L5+), system (L1–4) | Generates PDF to Storage and a verify code |
| `createMeeting` | Cell leader+ | Optional Meet/Teams link creation and calendar invites |
| `postAnonymousPrayer` | Member | Strips identity (§3) |
| `sendEmergencyPrayer` | Member | FCM to the prayer team, rate-limited |
| `askGideonAI` | Real account | Claude proxy with system prompt, safety, quota |
| `aiAssessmentReflection` | Real account | Takes category levels only, never raw answers (§17.1) |
| `exportMyData` / `deleteMyAccount` | Self | Data subject rights |
| `reportContent` | Member | Moderation queue |

Triggers

| Trigger | Action |
|---|---|
| `onDocumentWritten churches/{cid}/members/{uid}` | Sync custom claims, audit |
| `onDocumentCreated …/posts/{id}` | AI and keyword moderation → `ok` or `held` |
| `onDocumentCreated …/prayedBy/{uid}` | Increment `prayedCount` |
| `onDocumentWritten users/{uid}/journeyProgress/{lvl}` | Update church counters (no content copied) |
| `onSchedule every 15 min` | Meeting reminders (T-24h, T-1h) via FCM |
| `onSchedule nightly` | `stats/` aggregation, retention cleanup, backup verification |
| `beforeUserSignedIn` (blocking) | Reject suspended users, enforce MFA for rank 5+ |

HTTP (public)

- `GET /verify/{code}`: certificate verification (Hosting rewrite)
- `POST /oauth/google/callback`, `/oauth/microsoft/callback`: meeting integrations

### Gideon AI

- Model: `claude-sonnet-5-5` for conversation and `claude-haiku-4-5-20251001` for
  moderation and classification. Calls go through the function so the API key
  never reaches the client.
- The system prompt makes Gideon AI:
  - answer from Scripture with references, and say when Christians disagree
    on a point instead of settling it;
  - never present itself as a pastor, counselor or replacement for church;
  - point the user to their pastor, church fellowship, Scripture and prayer,
    at a natural point in each conversation;
  - on signs of crisis (self-harm, abuse, danger), stop coaching, give
    PH crisis resources, and offer "Tell my pastor";
  - not diagnose medical or mental-health conditions, and not give legal advice.
- Quota: for example 30 messages a day per user, stored in `rateLimits`.
- Conversations are stored only if the user turns on "Save chats", and are
  deleted after 30 days.

---

## 13. Feature roadmap

| Phase | Goal | Scope |
|---|---|---|
| **0 — Now** (done) | Single church | Bible EN/TL, devotions, prayer, notes, testimonies, teaching slides, meetings (Part 1 only) |
| **1 — Foundation** (≈6–8 wks) | Safe to add a 2nd church | Real accounts (email, Google, phone) with a guest→account upgrade; Cloud Functions project; custom claims; `churches/` tenancy; migrate Chosen Gen AG as church #1; v2 rules plus emulator tests; audit log; App Check |
| **2 — Churches** (≈6 wks) | Onboard 5–10 pilot churches | Application and approval, church directory, join flow, roles, groups, per-church meetings plus reminders, attendance, church prayer wall, announcements |
| **3 — Discipleship** (≈8 wks) | Journey levels 1–4 | Curriculum CMS, lessons (video, reading, reflection, prayer, assignment), mentor assignment and checkpoints, certificates, pastor dashboard v1 |
| **4 — Private care** (≈6 wks) | Spiritual Assessment | Vault (§17.1), on-device scoring, verses and lesson suggestions, crypto-shred delete, external privacy review before launch |
| **5 — Voice and AI** (≈6 wks) | Audio Bible, Gideon AI | Pre-generated TTS audio (EN/TL, male/female), offline download, verse sync; Gideon AI with safety evals |
| **6 — Community** (≈6 wks) | Feed | Posts, comments, likes, share cards, moderation, prayer partners, anonymous and emergency prayer |
| **7 — Scale** | National | Regions and districts, overseer dashboards, BigQuery analytics, Capacitor store apps, MFA for leaders, Meet/Teams OAuth, calendar sync |
| **8 — Future** | Ecosystem | Levels 5–8 content, courses, pastor training, seminary partners, church planting and missions, counseling center (licensed partners), volunteers, donations (PH payment gateway), job board, marketplace |

Build levels 5–8 only once real churches have finished levels 1–4. Their
content should be written with denominational partners, and pastors (not the
app) should confirm Level 7–8 candidates.

---

## 14. Scalable multi-church architecture

Target: 10,000 churches, 2–3 million members.

- **Tenancy:** a shared Firestore database, partitioned by `churchId` in the path.
  Firestore scales horizontally per document. This avoids a hot collection
  because each church's writes go to its own subtree.
- **Hot counters** (`prayedCount`, `likeCount`, attendance totals): increment
  in triggers with `FieldValue.increment`. Use distributed counter shards only for
  documents that get more than about 1 write per second (national totals).
- **Read cost:** dashboards read 1–3 `stats` documents instead of N members.
  The prayer wall and feed paginate (20 per page) with cursors.
- **Claims size:** claims are limited to 1,000 bytes, so store one primary `churchId`.
  People who serve in several churches switch context with a function that
  re-issues their claims.
- **Denormalisation:** `churchesPublic` is a thin copy for search. Use Algolia
  or Typesense once the directory passes about 2,000 churches and needs fuzzy
  city search.
- **Analytics:** Firestore → BigQuery export extension (stats, membership,
  journey counters only; never `users/*/vault`, prayers or notes), with Looker
  Studio for national reports.
- **Region:** functions and Storage in `asia-southeast1` (Singapore) for latency.
  The Firestore location of the existing project cannot be changed. Check it
  (Console → Firestore → location) before Phase 1. If it is a US
  location, decide then whether to start `gideon-prod` fresh in Asia and migrate.
- **Media:** lesson video on a CDN-backed store with multiple bitrates (480p
  default on mobile data). TTS audio as small Opus/AAC files per chapter in
  Storage with long-lived cache headers (the `/audio/**` header pattern already exists).

---

## 15. Recommended tech stack

| Layer | Choice | Why |
|---|---|---|
| Client | **Keep** Next.js 16 static export + React 19 + Tailwind 4 + shadcn/Base UI | Already built and fast. Static export deploys to Hosting with no server. |
| Store apps | **Capacitor** wrapping the same build | Gives Play Store / App Store presence, native push and background audio without a rewrite |
| Auth | Firebase Auth → **Identity Platform** (for MFA: TOTP plus SMS) | Needed for leader MFA and blocking functions |
| Database | Cloud Firestore | Already in use, offline cache, rules |
| Backend | Cloud Functions 2nd gen (TypeScript, Node 22) | Callable functions plus triggers, same language as the client |
| Storage | Cloud Storage for Firebase | Videos, audio, certificates |
| Push | Firebase Cloud Messaging | Reminders, emergency prayer |
| Abuse | App Check (Play Integrity / App Attest / reCAPTCHA Enterprise) | Blocks scripted clients |
| AI | Claude API (Sonnet 5.5 chat, Haiku 4.5 moderation) | Via functions only |
| TTS | Google Cloud Text-to-Speech (`fil-PH` and `en-US`/`en-PH` voices, male and female), pre-generated per chapter | Natural voices, offline-capable. Web Speech API as a fallback |
| Crypto | Web Crypto API (AES-GCM-256, PBKDF2-SHA-256 ≥ 600k iterations) | Built into browsers, no dependency |
| Meetings | Google Calendar API (Meet links), Microsoft Graph (Teams), `.ics` for everyone else | |
| Analytics | Firebase Analytics (screen and event, no content) + BigQuery | |
| Testing | Vitest, Playwright, Firestore emulator rules tests | |
| CI/CD | GitHub Actions + Firebase CLI | |
| Errors | Sentry or Firebase Crashlytics (Capacitor) with PII scrubbing | |

---

## 16. Deployment plan

Environments

| Env | Project | Deployed from | Data |
|---|---|---|---|
| dev | `gideon-dev` | Local plus emulators | Seed data |
| staging | `gideon-staging` | `main` branch, automatic | Synthetic, never real members |
| prod | `gideon-prod` (today: `chosen-gen--ag-bible-study`) | Git tag `v*`, manual approval | Real |

Pipeline (GitHub Actions)

1. Lint, typecheck, unit tests
2. Firestore and Storage **rules tests on the emulator**. A failure blocks the deploy.
3. `next build` (static export)
4. Deploy to staging: hosting, functions, rules, indexes
5. Playwright smoke tests against staging
6. On tag: deploy to a prod Hosting **preview channel**, run smoke tests, then promote
7. Rules and functions deploy before hosting whenever a release needs both

Operations

- Scheduled Firestore backups: daily managed backups with 14-day retention plus weekly
  exports to a separate locked bucket with 90-day retention. Restore to staging once a
  quarter to confirm backups work.
- Budget alerts at 50/80/100% of the monthly budget. Alert on function error rate and AI
  spend.
- The service worker already avoids hard reloads after a deploy (recent commit). Keep
  `no-cache` on HTML and hashed immutable assets.

Migration of the current church (Phase 1)

1. Create `churches/chosen-gen-ag` and copy `topics` to `churches/chosen-gen-ag/topics`.
2. For each `users/{uid}` with `role`: create a membership, set claims, remove `role`.
3. Move `communityTestimonies` to `posts` of type `testimony`.
4. Deploy the v2 rules. Keep reading the old paths for one release as a fallback.
5. The legacy root site (`manage-topics.html`, `topics.js`) still writes
   `part2Url`. Retire it, or at least hide the Part 2 field, now that
   Part 2 is removed.

---

## 17. Security and privacy plan

### 17.1 Spiritual Assessment vault

**The requirement and the constraint.** "Even administrators should not see raw
answers" cannot be met with Firestore rules alone. Anyone with owner access to the
Firebase project can read any document in the console, and backups contain everything.
The only real guarantee is that **the server never has the plaintext or the key.**
That is what this design does.

Key management (all on the device, Web Crypto):

```
passphrase (vault PIN, 6+ digits or words; separate from login because
            Google/phone logins have no password)
   │ PBKDF2-SHA-256, random 16-byte salt, 600,000 iterations
   ▼
KEK (key-encryption key, never stored)
   │ AES-KW / AES-GCM wrap
   ▼
DEK (random 256-bit data key, generated once)  ──► stored wrapped in users/{uid}/vault/keys
   │                                                 { wrappedDek, salt, iter, v,
   │                                                   recoveryWrappedDek }
   ▼
AES-GCM-256 (random 96-bit IV per record)
   ▼
users/{uid}/vault/assessments/{id} = { ct, iv, v, createdAt }
```

- **Recovery code:** at setup, generate a random recovery key, show it once
  ("write this down"), and store a second copy of the DEK wrapped with it. If the user loses
  both the PIN and the code, the data cannot be recovered. **That is the point**,
  and the setup screen must say it plainly.
- **Rules enforce shape.** Only `ct`, `iv`, `v` and timestamps are accepted (§4), so
  a client bug cannot store plaintext.
- **The server sees only** the fact that a record exists and when it was written.
- **Unlocked session:** the DEK is held in memory only. It locks again after 5 minutes idle or
  when the app goes to the background.

Scoring without exposing answers (default, fully on the device)

- Each question maps to a category (fear, anxiety, doubt, occult exposure,
  addiction, forgiveness, prayer life, Bible habits, and so on) with a
  weighted rubric shipped in the app bundle.
- The client computes the **Personal Spiritual Growth Score**, the **areas
  needing prayer**, **suggested verses** (static mapping category → verses) and
  **suggested lessons** (category → curriculum lesson IDs). Nothing leaves the
  device.
- The summary is encrypted with the same DEK into `vault/summary`. The
  area names are sensitive too ("occult involvement"), so they are never stored
  in plaintext.

Optional AI reflection (explicit, per use)

- The user presses "Get a deeper reflection", sees exactly what will be sent,
  and confirms.
- The client sends **category levels only** (for example `{fear: "high", prayer_life:
  "growing", forgiveness: "struggling"}`), never the answers or free text.
- `aiAssessmentReflection` forwards the levels to Claude without logging the
  request body. The response is encrypted on the device before storage.
- Be honest in the UI: during this call the category levels are processed by
  the server and the AI provider. That is why the feature is optional and off by
  default.

Deletion

- "Delete my assessment": deletes the record.
- "Delete everything": deletes all `vault/*` **and the wrapped key**. With the
  key gone, any copy in backups is unreadable (crypto-shredding), which
  covers the "permanently" requirement even for data still inside the backup
  retention window.

Limits to state honestly in the privacy policy

- A web app gets its code from our servers. Someone who could change the deployed
  code could, in principle, ship a version that captures the PIN. Mitigations: a
  strict CSP, no third-party scripts on vault screens, protected deploys
  (reviewed tags, two-person approval for prod), and Subresource Integrity where
  possible.
- A compromised or shared phone is outside our control. Auto-lock and "no preview
  in app switcher" reduce the risk.
- Anonymous (guest) accounts cannot use the vault, because the data would be lost with the device.

### 17.2 Legal: Philippine Data Privacy Act (RA 10173)

Religious and spiritual information is **sensitive personal information** under the
DPA. The same applies to health-adjacent data (addiction, anxiety). This requires:

- **Specific, informed consent** at signup, again before the assessment, and again
  before AI reflection. Record the consent version and time.
- **A Data Protection Officer** registered with the National Privacy
  Commission. Registration is required when processing sensitive information of 1,000 or more
  people. Gideon will pass that threshold, so plan for it in Phase 2.
- A **Privacy Impact Assessment** before Phase 4.
- **Breach notification** to the NPC and affected users within 72 hours.
- **Data subject rights:** access and export (`exportMyData`), correction, erasure
  (`deleteMyAccount`), and objection.
- **Minors:** under 18 need parent or guardian consent, and the assessment is not
  offered to under-18s by default. Church leaders are not guardians for this purpose.
- Aligning with GDPR as well costs little and covers OFW members in the EU,
  and it matches the "international standards" goal.

Get a Philippine privacy lawyer to review the consent text and policy before Phase 4.
This document is not legal advice.

### 17.3 Platform security controls

| Threat | Control |
|---|---|
| Account takeover | Email, Google or phone login; MFA required for rank 5+ and national admin; blocking function rejects suspended users |
| Privilege escalation | Roles only via functions; rank checks; claims are the only thing rules trust; audit log on every change |
| Cross-church data leaks | `churchId` claim checked on every tenant path; emulator tests for "church A cannot read church B" |
| Leader overreach | Leaders read aggregates and opt-in data only; no rule grants leaders access to `users/{uid}` |
| Spam / bots | App Check; per-user rate limits (posts, prayers, comments, AI, applications); new accounts start in `held` moderation for 7 days |
| Abusive content | Haiku 4.5 classifier plus keyword list (EN/TL/Taglish) → `held`; report button; ministry leader moderation queue |
| Emergency button abuse | 3 per day limit; leaders can mute a user's emergency flag |
| XSS | React escaping; no `dangerouslySetInnerHTML` on user content; strict CSP via Hosting headers |
| Secrets | API keys (Claude, TTS, Graph) only in Secret Manager, used by functions |
| Data loss | Daily backups, restore drills, soft delete for 30 days on church content |
| Audit | `auditLogs` for approvals, role changes, exports, suspensions, moderation actions; read-only, 2-year retention |

Data retention

| Data | Retention |
|---|---|
| Vault | Until the user deletes it; crypto-shred on account deletion |
| AI chats | Off by default; 30 days if on |
| Prayer wall | Owner controls; answered or archived after 12 months |
| Audit logs | 2 years |
| Deleted accounts | Removed within 30 days, including from BigQuery |
| Backups | 14 days (daily) / 90 days (weekly) |

---

## 18. Philippines-wide church expansion strategy

**Principle:** grow through relationships and existing church networks, with
pastors in the lead. The app serves the pastor's ministry. It must never compete with it.

Stage 1 — Prove it in one church (Chosen Gen AG, now)
- Measure: weekly active members, lessons per member, prayers answered, mentor pairs.
- Collect 5–10 short testimonies (with consent) about how the app helped discipleship.

Stage 2 — Pilot network (5–10 churches, one denomination)
- Start inside one network, for example Assemblies of God or another network your
  leadership already has ties with. Pastors trust peers more than apps.
- Mix the pilots: city, provincial and OFW churches (Chosen Gen AG's
  own Qatar context shows the OFW angle matters, since Filipino churches abroad are
  highly connected back home).
- Give each pilot a Gideon contact person and a monthly pastor call.

Stage 3 — Regional through overseers
- Recruit regional overseers and district leaders as champions. Give them the overseer dashboard,
  which shows health across their churches without exposing members.
- Run "Gideon Discipleship Summits" by region (Luzon, Visayas, Mindanao)
  with a half-day hands-on onboarding for pastors and cell leaders.

Stage 4 — National and multilingual
- Add languages in order of reach: Cebuano, Ilocano and Hiligaynon (content and Bible
  text, where a public-domain or licensed translation exists).
- Partner with Bible colleges and seminaries for Level 5–8 content and pastor training.
- Offer a free tier for small churches (most PH churches have fewer than 100 members), with
  sustainability from partner denominations, donors, and optional premium features
  for large churches. Do not charge members.

Adoption tactics tuned to PH realities
- **Low data:** lessons as audio-first with downloadable 480p video; text-only mode; the
  whole app works offline after first sync.
- **Low-end Android:** keep the JS bundle small and test on 2–3 GB RAM phones.
- **Facebook-first habits:** share cards for verses and testimonies that open the
  app, and a church invite link or QR code for Sunday screens.
- **Trust:** show the privacy promise in Tagalog in plain words on the assessment
  screen ("Hindi ito makikita ng pastor mo o ng kahit sino").
- **Leader capacity:** most small-church pastors are bi-vocational. Make the
  pastor dashboard useful in 5 minutes a week.

Success metrics (national)
- Churches active in the last 30 days, and median members per church
- % of new believers with a mentor within 14 days
- Level 1→2 and 2→3 progression
- Weekly Bible reading days per active member
- Answered prayers logged
- Mentor retention (active mentors after 6 months)

---

## Appendix: decisions to confirm

1. Firestore location of the current project (determines whether prod moves to a new project).
2. Which denomination or network is the first pilot.
3. Who is the Data Protection Officer.
4. Who writes Level 1–4 curriculum content and who approves it theologically.
5. Budget ceiling for AI and TTS per month. This sets the quotas in §12.
