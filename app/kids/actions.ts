"use server";

import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import type { Kid } from "@/components/kid-card";

const MONTHS_SHORT = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

function formatDateLabel(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS_SHORT[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatMonthYear(date: Date): string {
  const month = MONTHS_SHORT[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
}

const AVATAR_COLORS = [
  { bg: "#A9D9E8", color: "#1F7A93" },
  { bg: "#F4B8CC", color: "#C44A7A" },
  { bg: "#B9DEC4", color: "#3E8B62" },
  { bg: "#F4DC8E", color: "#9A7B1E" },
  { bg: "#C9B6E8", color: "#7B5FC0" },
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseDate(iso: string): Date | null {
  // Native <input type="date"> delivers an ISO string (yyyy-mm-dd).
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const date = new Date(iso + "T00:00:00");
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export type AddKidResult =
  | { ok: true }
  | { ok: false; error: string };

export async function addKid(formData: FormData): Promise<AddKidResult> {
  const name = String(formData.get("name") ?? "").trim();
  const birthDateRaw = String(formData.get("birthDate") ?? "").trim();
  const room = String(formData.get("room") ?? "Soles").trim() || "Soles";
  const allergies = String(formData.get("allergies") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!name) {
    return { ok: false, error: "El nombre completo es obligatorio." };
  }

  const birthDate = parseDate(birthDateRaw);
  if (!birthDate) {
    return {
      ok: false,
      error: "Fecha inválida. Seleccioná una fecha válida.",
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (birthDate > today) {
    return { ok: false, error: "La fecha de nacimiento no puede ser futura." };
  }

  const ageMs = today.getTime() - birthDate.getTime();
  const ageYears = Math.floor(ageMs / (365.25 * 24 * 60 * 60 * 1000));
  if (ageYears < 0 || ageYears > 6) {
    return {
      ok: false,
      error: "La edad debe estar entre 0 y 6 años.",
    };
  }

  const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  const idBase = slugify(name);
  const file = path.join(process.cwd(), "mock-data", "kids.json");
  const kids = JSON.parse(fs.readFileSync(file, "utf8")) as Kid[];

  let id = idBase;
  let suffix = 2;
  while (kids.some((k) => k.id === id)) {
    id = `${idBase}-${suffix}`;
    suffix += 1;
  }

  const birthDateLabel = formatDateLabel(birthDate);

  const newKid: Kid = {
    id,
    initial: name.charAt(0).toUpperCase(),
    avatarBg: color.bg,
    avatarColor: color.color,
    name,
    age: `${ageYears} ${ageYears === 1 ? "año" : "años"}`,
    parents: "sin padres vinculados",
    allergyNote: allergies
      ? allergies
      : "Sin alergias conocidas.",
    medicalNotes: notes || undefined,
    birthDate: birthDateLabel,
    room,
    enrollment: formatMonthYear(today),
    linkedParents: [],
  };

  kids.push(newKid);
  fs.writeFileSync(file, JSON.stringify(kids, null, 2) + "\n", "utf8");

  revalidatePath("/kids");
  return { ok: true };
}