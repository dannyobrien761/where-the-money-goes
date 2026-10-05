import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Public files must not mention or link the private build tooling.
// Checks every file git does not ignore, tracked or not.

const SELF = "lib/__tests__/no-private-refs.test.ts";
const SKIP = new Set([".gitignore", SELF]);

const FORBIDDEN = [
  "prompts/",
  "prompt-0",
  "prompt-1",
  "Prompt 0",
  "Prompt 1",
  "CLAUDE.md",
  "docs/framework.md",
  "docs/PROGRESS.md",
  "product-brief",
  ".claude/",
];

const files = execSync("git ls-files --cached --others --exclude-standard", {
  encoding: "utf8",
})
  .split("\n")
  .map((f) => f.trim())
  .filter((f) => f && !SKIP.has(f));

const texts = files.flatMap((path) => {
  let buf: Buffer;
  try {
    buf = readFileSync(path);
  } catch {
    return []; // listed by git but deleted in the working tree
  }
  if (buf.subarray(0, 8000).includes(0)) return []; // binary
  return [{ path, lines: buf.toString("utf8").split(/\r?\n/) }];
});

describe("public files do not reference private build tooling", () => {
  it("finds files to check", () => {
    expect(texts.length).toBeGreaterThan(10);
  });

  it.each(FORBIDDEN)("no public file contains %j", (needle) => {
    const hits = texts.flatMap(({ path, lines }) =>
      lines.flatMap((line, i) => (line.includes(needle) ? [`${path}:${i + 1}`] : [])),
    );
    expect(hits).toEqual([]);
  });
});
