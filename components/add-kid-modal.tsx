"use client";

import { useState } from "react";
import { addKid } from "@/app/kids/actions";

const ROOMS = ["Soles", "Lunas", "Estrellas", "Nubes"];

export default function AddKidModal() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setError(null);
    setPending(true);
    const formData = new FormData(form);
    const result = await addKid(formData);
    setPending(false);
    if (result.ok) {
      form.reset();
      setOpen(false);
    } else {
      setError(result.error);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
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
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-10 overflow-y-auto"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Agregar niño"
        >
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[520px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera */}
            <div className="flex items-center justify-between px-5 py-5 md:px-[26px] md:py-5 border-b border-[#ECE0D0]">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted-dark font-bold text-[15px]"
              >
                Cancelar
              </button>
              <span className="font-fredoka font-semibold text-[18px] text-ink">
                Agregar niño
              </span>
              <button
                type="submit"
                disabled={pending}
                className="text-accent font-extrabold text-[15px] disabled:opacity-50"
              >
                {pending ? "Guardando…" : "Guardar"}
              </button>
            </div>

            {/* Formulario */}
            <div className="px-5 py-6 md:px-[26px] md:py-6">
              {error && (
                <div className="mb-4 rounded-[12px] bg-[#FBDAD6] text-[#C5413A] text-[14px] font-bold px-4 py-3">
                  {error}
                </div>
              )}

              <div className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-2">
                NOMBRE COMPLETO
              </div>
              <input
                name="name"
                required
                placeholder="Ej. Martina López"
                className="w-full px-4 py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink mb-[18px] focus:outline-none focus:border-accent"
                suppressHydrationWarning
              />

              <div className="flex flex-col md:flex-row gap-[14px] mb-[18px]">
                <div className="flex-1">
                  <div className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-2">
                    FECHA DE NACIMIENTO
                  </div>
                  <input
                    name="birthDate"
                    type="date"
                    required
                    className="w-full px-4 py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink focus:outline-none focus:border-accent [&::-webkit-calendar-picker-indicator]:opacity-60"
                    suppressHydrationWarning
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-2">
                    SALA
                  </div>
                  <div className="relative">
                    <select
                      name="room"
                      defaultValue="Soles"
                      className="w-full appearance-none px-4 py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink font-bold focus:outline-none focus:border-accent"
                      suppressHydrationWarning
                    >
                      {ROOMS.map((room) => (
                        <option key={room} value={room}>
                          {room}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#B0A290"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-2">
                ALERGIAS (ETIQUETAS)
              </div>
              <input
                name="allergies"
                placeholder="Ej. Maní, Lactosa"
                className="w-full px-4 py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink mb-[18px] focus:outline-none focus:border-accent"
                suppressHydrationWarning
              />

              <div className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-2">
                NOTAS MÉDICAS
              </div>
              <textarea
                name="notes"
                placeholder="Indicaciones, medicación, contactos…"
                className="w-full min-h-[90px] resize-y px-4 py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink leading-[1.5] focus:outline-none focus:border-accent"
                suppressHydrationWarning
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}