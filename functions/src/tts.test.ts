import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSsml } from "./tts";

test("pauses after sentences and commas", () => {
  const ssml = buildSsml("The LORD is my shepherd; I shall not want. He leads me.", "en", "male");
  assert.equal(
    ssml,
    '<speak><prosody rate="92%" pitch="-1st">The Lord is my shepherd; <break time="180ms"/> I shall not want. <break time="550ms"/> He leads me.</prosody></speak>'
  );
});

test("text can't break out of the SSML", () => {
  const ssml = buildSsml('Tom & Jerry <break time="10s"/> said "hi"', "tl", "female");
  assert.ok(!ssml.includes('<break time="10s"'));
  assert.ok(ssml.includes("Tom &amp; Jerry"));
  assert.ok(ssml.startsWith('<speak><prosody rate="90%" pitch="+0st">'));
});
