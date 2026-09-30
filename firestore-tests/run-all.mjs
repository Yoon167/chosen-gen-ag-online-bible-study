// Runs every *.test.mjs file against the running Firestore emulator, one at a
// time, and fails if any of them fails. Started by `npm test`.
import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

const files = readdirSync(new URL(".", import.meta.url)).filter((f) => f.endsWith(".test.mjs")).sort();
let failed = 0;
for (const file of files) {
  console.log(`\n=== ${file}`);
  const result = spawnSync(process.execPath, [file], { cwd: new URL(".", import.meta.url), stdio: ["ignore", "pipe", "pipe"], encoding: "utf8" });
  // The SDK logs every expected PERMISSION_DENIED; show only our own result lines.
  const lines = result.stdout.split("\n").filter((l) => /^(ok|FAIL|ALL PASSED|\d+ FAILED)/.test(l));
  console.log(lines.join("\n"));
  if (result.status !== 0) {
    failed++;
    if (!lines.length) console.log(result.stderr);
  }
}
console.log(failed ? `\n${failed} test file(s) failed` : `\nAll ${files.length} test files passed`);
process.exit(failed ? 1 : 0);
