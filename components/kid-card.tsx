import Link from "next/link";

export type LinkedParent = {
  initial: string;
  avatarBg: string;
  name: string;
  role: string;
  status: "ACTIVA" | "PENDIENTE";
};

export type Kid = {
  id: string;
  initial: string;
  avatarBg: string;
  avatarColor: string;
  name: string;
  age: string;
  parents: string;
  status?: "ACTIVA" | "PENDIENTE" | "MANÍ" | "LACTOSA" | "VINCULAR";
  allergyNote?: string;
  birthDate?: string;
  room?: string;
  enrollment?: string;
  linkedParents?: LinkedParent[];
};

const statusStyles: Record<string, { bg: string; color: string }> = {
  MANÍ: { bg: "#FBD8CC", color: "#D9684A" },
  LACTOSA: { bg: "#FBD8CC", color: "#D9684A" },
  VINCULAR: { bg: "#F9D2DE", color: "#C56486" },
  ACTIVA: { bg: "#CFEBD8", color: "#3E9B6C" },
  PENDIENTE: { bg: "#F7E7A6", color: "#9A7B1E" },
};

export default function KidCard({ kid }: { kid: Kid }) {
  const style = kid.status ? statusStyles[kid.status] : undefined;
  return (
    <Link
      href={`/kids/${kid.id}`}
      className="kid flex items-center gap-[14px] min-w-0 bg-card border border-border rounded-[18px] p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,.5)] transition-all duration-150 hover:border-accent hover:-translate-y-0.5"
    >
      <div
        className="size-12 rounded-full flex items-center justify-center flex-none font-fredoka font-semibold text-[19px]"
        style={{ backgroundColor: kid.avatarBg, color: kid.avatarColor }}
      >
        {kid.initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-fredoka font-semibold text-base text-ink">{kid.name}</div>
        <div className="text-[13px] text-muted-light">
          {kid.age} · {kid.parents}
        </div>
      </div>
      {kid.status && style ? (
        <span
          className="flex-none text-[11px] font-extrabold px-[9px] py-[5px] rounded-full"
          style={{ backgroundColor: style.bg, color: style.color }}
        >
          {kid.status}
        </span>
      ) : (
        <svg
          className="flex-none"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CBB89F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </Link>
  );
}