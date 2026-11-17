"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const isKids = pathname === "/kids" || (pathname?.startsWith("/kids/") ?? false);
  const isFeed = pathname === "/";

  const navItemClass = (active: boolean) =>
    `flex items-center gap-3 px-3 py-[11px] rounded-xl text-[14.5px] ${
      active
        ? "bg-accent-bg text-accent font-extrabold"
        : "bg-transparent text-muted-dark font-semibold"
    }`;

  return (
    <aside className="w-[248px] flex-none bg-card border-r border-border flex flex-col py-6 px-4 sticky top-0 h-screen">
      <a href="index.dc.html" className="flex items-center gap-[11px] px-2 pt-1 pb-[22px]">
        <div className="size-[38px] rounded-xl bg-[linear-gradient(155deg,var(--color-gradient-start),var(--color-avatar-coral))] flex items-center justify-center flex-none">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </div>
        <div>
          <div className="font-fredoka font-semibold text-[17px] text-ink leading-none">
            OpenDayCare
          </div>
          <div className="text-[11.5px] text-muted-light mt-0.5">Sala Soles</div>
        </div>
      </a>

      <a
        href="crear-publicacion.dc.html"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-[14px] bg-gradient-to-b from-button-from to-button-to text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,.75)] mb-[18px]"
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
        Nueva publicación
      </a>

      <nav className="flex flex-col gap-1 flex-1">
        <Link
          href="/"
          className={navItemClass(isFeed)}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
          </svg>
          Feed
        </Link>
        <Link
          href="/kids"
          className={navItemClass(isKids)}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="7" r="3" />
            <circle cx="17" cy="9" r="2.4" />
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" />
          </svg>
          Niños
        </Link>
        <a
          href="avisos.dc.html"
          className="flex items-center gap-3 px-3 py-[11px] rounded-xl bg-transparent text-muted-dark font-semibold text-[14.5px]"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          Avisos
        </a>
        <a
          href="mi-cuenta.dc.html"
          className="flex items-center gap-3 px-3 py-[11px] rounded-xl bg-transparent text-muted-dark font-semibold text-[14.5px]"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Mi cuenta
        </a>
      </nav>

      <div className="border-t border-border pt-3.5 mt-2.5">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <div className="size-[38px] rounded-full bg-avatar-coral text-white font-fredoka font-semibold text-base flex items-center justify-center flex-none">
            C
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-sm text-ink">Caro Giménez</div>
            <div className="text-xs text-muted-light">Maestra · Soles</div>
          </div>
          <a
            href="login.dc.html"
            title="Cerrar sesión"
            className="flex-none size-8 rounded-[10px] bg-cream text-muted flex items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
}