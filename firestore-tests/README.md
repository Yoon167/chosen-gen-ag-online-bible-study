# Firestore rules tests

Tests for [`../firestore.rules`](../firestore.rules), run against the local
Firestore emulator (needs Java). Run them before every rules deploy:

```sh
cd firestore-tests
npm install     # first time only
npm test
```

| File | Covers |
|---|---|
| `vault.test.mjs` | Spiritual Assessment vault: ciphertext only, owner only, no guest sessions, no vault replacement |
| `church.test.mjs` | Church roles, join requests, approvals, role changes by rank, mentors, progress sharing |
| `applications.test.mjs` | Church registration and national admin approval |
| `prayer-wall.test.mjs` | Church prayer wall, anonymous posts, one "I prayed" per person |
| `meetings.test.mjs` | Church meetings and attendance check-in |

The national admin uid in the tests must match `isAdmin()` in the rules.
