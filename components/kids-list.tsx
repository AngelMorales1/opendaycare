"use client";

import { useState } from "react";
import KidCard from "@/components/kid-card";
import type { Kid } from "@/components/kid-card";

export default function KidsList({ kids }: { kids: Kid[] }) {
  const [query, setQuery] = useState("");

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const normalized = normalize(query);
  const filtered = normalized
    ? kids.filter((kid) => normalize(kid.name).includes(normalized))
    : kids;

  return (
    <>
      <div className="flex items-center gap-[11px] bg-card border border-border rounded-[14px] px-4 py-3 mb-[22px]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#B0A290"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar niño…"
          className="flex-1 border-none bg-transparent text-[15px] text-ink placeholder:text-muted-light focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3 mb-[14px]">
        <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-ink">
          SALA SOLES
        </span>
        <span className="text-[13px] text-muted-light">
          {filtered.length} {filtered.length === 1 ? "niño" : "niños"}
        </span>
        <span className="flex-1 h-px bg-divider-light" />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted text-center py-8">No se encontraron niños.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
          {filtered.map((kid) => (
            <KidCard key={kid.id} kid={kid} />
          ))}
        </div>
      )}
    </>
  );
}