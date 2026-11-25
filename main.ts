// Entry runner for the "One-Liner Marathon".
// A single joke, one line, no setup paragraph and no garnish: a memory
// so unreliable its owner makes a new friend in the mirror. The program
// writes it to /output/entry.txt and keeps the directory otherwise empty.
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I'm not saying my memory is bad, but I just introduced myself to my own reflection and we really hit it off.";

function sweep(dir: string): void {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const out = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(out, { recursive: true });
  sweep(out);
  writeFileSync(join(out, "entry.txt"), JOKE + "\n", "utf8");
}

main();
