import { test } from "node:test";
import assert from "node:assert/strict";
import { dayOfYear, daySlot, localParts, nextStart, runStart, weekKeyIn, weekSlot } from "./time";

test("slots", () => {
  const t = Date.UTC(2026, 9, 4, 22, 0, 5); // Sun 22:00:05 UTC
  assert.equal(runStart(t), Date.UTC(2026, 9, 4, 22, 0));
  assert.equal(daySlot(t), 88);
  assert.equal(weekSlot(t), 88);
});

test("Manila 06:00 is the next day there", () => {
  const t = Date.UTC(2026, 9, 4, 22, 0);
  assert.deepEqual(localParts(t, "Asia/Manila"), { date: "2026-10-05", weekday: 1 });
  assert.equal(weekKeyIn(t, "Asia/Manila"), "2026-10-05");
  assert.equal(weekKeyIn(t, "Asia/Qatar"), "2026-10-05");
  assert.equal(weekKeyIn(t, "Etc/UTC"), "2026-09-28");
  assert.equal(localParts(t, "Not/AZone").date, "2026-10-04");
});

test("day of year matches the app", () => {
  assert.equal(dayOfYear("2026-01-01"), 1);
  assert.equal(dayOfYear("2026-12-31"), 365);
});

test("weekly meetings roll forward", () => {
  const week = 7 * 24 * 3600 * 1000;
  assert.equal(nextStart(1000, true, 1000 + 2 * week + 5), 1000 + 3 * week);
  assert.equal(nextStart(1000, false, 5000), 1000);
  assert.equal(nextStart(9000, true, 5000), 9000);
});
