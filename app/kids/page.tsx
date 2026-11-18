import Link from "next/link";
import AppShell from "@/components/app-shell";
import KidsList from "@/components/kids-list";
import { kids } from "@/mock-data/kids";

export default function KidsPage() {
  return (
    <AppShell>
      <div className="max-w-[880px] w-full mx-auto px-4 md:px-10 py-6 md:py-[34px] pb-20">
        <div className="flex items-end justify-between gap-4 mb-[22px]">
          <div>
            <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-accent mb-1">
              GESTIÓN
            </div>
            <h1 className="font-fredoka font-semibold text-3xl m-0 text-ink">
              Niños
            </h1>
          </div>
          <Link
            href="/kids/new"
            className="flex items-center gap-2 px-[18px] py-[11px] rounded-[14px] bg-gradient-to-b from-button-from to-button-to text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,.75)]"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Agregar niño
          </Link>
        </div>

        <KidsList kids={kids} />
      </div>
    </AppShell>
  );
}