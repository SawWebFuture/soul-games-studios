import fs from "node:fs";
import path from "node:path";
import { Store } from "./types";

const dataPath = path.join(process.cwd(), "data", "subagents.json");
const seedPath = path.join(process.cwd(), "data", "seed.json");

function ensureStore() {
  if (!fs.existsSync(dataPath)) {
    const seed = fs.readFileSync(seedPath, "utf8");
    fs.writeFileSync(dataPath, seed, "utf8");
  }
}

export function readStore(): Store {
  ensureStore();
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

export function writeStore(next: Store): void {
  fs.writeFileSync(dataPath, JSON.stringify(next, null, 2), "utf8");
}
