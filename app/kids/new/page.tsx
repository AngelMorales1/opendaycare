import Link from "next/link";

export default function AddKidPage() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-[#F6ECDF] px-4 py-10 md:px-6 md:py-[40px]">
      <div className="w-full max-w-[520px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)] overflow-hidden">
        {/* Cabecera */}
        <div className="flex items-center justify-between px-5 py-5 md:px-[26px] md:py-5 border-b border-[#ECE0D0]">
          <Link
            href="/kids"
            className="text-muted-dark font-bold text-[15px]"
          >
            Cancelar
          </Link>
          <span className="font-fredoka font-semibold text-[18px] text-ink">
            Agregar niño
          </span>
          <Link href="/kids" className="text-accent font-extrabold text-[15px]">
            Guardar
          </Link>
        </div>

        {/* Formulario */}
        <div className="px-5 py-6 md:px-[26px] md:py-6">
          <div className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-2">
            NOMBRE COMPLETO
          </div>
          <input
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
                placeholder="dd/mm/aaaa"
                className="w-full px-4 py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink focus:outline-none focus:border-accent"
              />
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-2">
                SALA
              </div>
              <div className="flex items-center gap-2 px-4 py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink font-bold">
                Soles
                <span className="flex-1" />
                <svg
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
            placeholder="Ej. Maní, Lactosa"
            className="w-full px-4 py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink mb-[18px] focus:outline-none focus:border-accent"
            suppressHydrationWarning
          />

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-muted mb-2">
            NOTAS MÉDICAS
          </div>
          <textarea
            placeholder="Indicaciones, medicación, contactos…"
            className="w-full min-h-[90px] resize-y px-4 py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink leading-[1.5] focus:outline-none focus:border-accent"
            suppressHydrationWarning
          />
        </div>
      </div>
    </div>
  );
}