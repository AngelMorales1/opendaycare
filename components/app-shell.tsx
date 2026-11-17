"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-cream">
      {/* Desktop sidebar */}
      <div className="hidden md:block md:sticky md:top-0 md:h-screen">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute left-0 top-0 h-full w-[248px] max-w-[85vw] bg-card shadow-xl flex flex-col">
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Cerrar menú"
                className="size-8 rounded-[10px] bg-cream text-muted flex items-center justify-center"
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
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 md:h-screen">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Abrir menú"
            className="size-10 rounded-xl bg-cream text-muted flex items-center justify-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <span className="font-fredoka font-semibold text-ink">OpenDayCare</span>
          <span className="ml-auto text-xs text-muted-light">Sala Soles</span>
        </header>

        <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
