import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/app-shell";
import { getKids } from "@/mock-data/kids";

export const instant = false;

export default async function KidProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kids = getKids();
  const kid = kids.find((k) => k.id === id);
  if (!kid) notFound();

  const parentStatusStyle = (status: "ACTIVA" | "PENDIENTE") =>
    status === "ACTIVA"
      ? { bg: "#CFEBD8", color: "#3E9B6C" }
      : { bg: "#F7E7A6", color: "#9A7B1E" };

  return (
    <AppShell>
      <div className="max-w-[820px] w-full mx-auto px-4 md:px-10 py-6 md:py-[34px] pb-20">
        <Link
          href="/kids"
          className="flex items-center gap-[7px] text-muted font-bold text-[14px] mb-5"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver a Niños
        </Link>

        <div className="flex gap-[26px] items-start flex-wrap">
          <div className="flex-1 min-w-[300px] flex flex-col gap-[18px]">
            <div className="flex items-center gap-[18px]">
              <div
                className="size-[84px] rounded-full flex items-center justify-center flex-none font-fredoka font-semibold text-[34px]"
                style={{ backgroundColor: kid.avatarBg, color: kid.avatarColor }}
              >
                {kid.initial}
              </div>
              <div className="flex-1">
                <h1 className="font-fredoka font-semibold text-[28px] m-0 text-ink">
                  {kid.name}
                </h1>
                <p className="mt-[3px] text-muted text-[15px]">
                  {kid.age} · Sala {kid.room ?? "Soles"}
                </p>
              </div>
              <a
                href="agregar-nino.dc.html"
                className="border border-border bg-card text-muted-dark font-bold text-[14px] px-4 py-[9px] rounded-xl"
              >
                Editar
              </a>
            </div>

            {kid.allergyNote && (
              <div className="flex gap-[14px] bg-[#FBDAD6] rounded-2xl p-4 md:px-[18px]">
                <div className="size-10 rounded-[11px] bg-[#F4A8A0] flex items-center justify-center flex-none">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                    <path d="M12 9v4M12 17h.01" />
                  </svg>
                </div>
                <div>
                  <div className="font-extrabold text-[15px] text-[#C5413A] mb-[2px]">
                    Alergias y notas
                  </div>
                  <div className="text-[14.5px] leading-[1.5] text-[#B25249]">
                    {kid.allergyNote}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex justify-between px-[18px] py-[15px] border-b border-divider">
                <span className="text-muted text-[14.5px]">Fecha de nacimiento</span>
                <span className="font-extrabold text-ink text-[14.5px]">
                  {kid.birthDate ?? "—"}
                </span>
              </div>
              <div className="flex justify-between px-[18px] py-[15px] border-b border-divider">
                <span className="text-muted text-[14.5px]">Sala</span>
                <span className="font-extrabold text-ink text-[14.5px]">
                  {kid.room ?? "Soles"}
                </span>
              </div>
              <div className="flex justify-between px-[18px] py-[15px] border-b border-divider">
                <span className="text-muted text-[14.5px]">Ingreso</span>
                <span className="font-extrabold text-ink text-[14.5px]">
                  {kid.enrollment ?? "—"}
                </span>
              </div>
              {kid.medicalNotes && (
                <div className="flex justify-between px-[18px] py-[15px]">
                  <span className="text-muted text-[14.5px]">Notas médicas</span>
                  <span className="font-extrabold text-ink text-[14.5px] text-right max-w-[60%]">
                    {kid.medicalNotes}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="w-[300px] flex-none flex flex-col gap-[14px]">
            <a
              href="resumen-dia.dc.html"
              className="flex items-center justify-center gap-[9px] w-full py-[13px] rounded-[14px] bg-ink text-white font-extrabold text-[15px]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
              Resumen del día
            </a>

            <div className="bg-card border border-border rounded-2xl p-[16px_18px]">
              <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-muted-darker mb-[14px]">
                PADRES VINCULADOS
              </div>
              <div className="flex flex-col gap-[14px]">
                {(kid.linkedParents ?? []).map((parent, idx) => {
                  const style = parentStatusStyle(parent.status);
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        className="size-10 rounded-full flex items-center justify-center flex-none font-fredoka font-semibold text-base text-white"
                        style={{ backgroundColor: parent.avatarBg }}
                      >
                        {parent.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-[14.5px] text-ink">
                          {parent.name}
                        </div>
                        <div className="text-[12.5px] text-muted-light">{parent.role}</div>
                      </div>
                      <span
                        className="flex-none text-[10.5px] font-extrabold px-[9px] py-1 rounded-full"
                        style={{ backgroundColor: style.bg, color: style.color }}
                      >
                        {parent.status}
                      </span>
                    </div>
                  );
                })}
                <a
                  href="vincular-padre.dc.html"
                  className="flex items-center gap-3 pt-2"
                >
                  <span className="size-10 rounded-full border-[1.5px] border-dashed border-border flex items-center justify-center text-muted flex-none">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                  <span className="font-extrabold text-[14.5px] text-accent-dark">
                    Vincular otro padre
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}