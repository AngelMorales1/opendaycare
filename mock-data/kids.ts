import fs from "node:fs";
import path from "node:path";
import type { Kid } from "@/components/kid-card";

export type { Kid };

export function getKids(): Kid[] {
  const file = path.join(process.cwd(), "mock-data", "kids.json");
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw) as Kid[];
}