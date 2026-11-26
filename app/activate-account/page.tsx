import Link from "next/link";
import { getKids } from "@/mock-data/kids";

export default function ActivateAccountPage() {
  const kids = getKids();
  const invited = kids.find((k) => k.id === "mateo-fernandez")!;
  const invitedName = invited.name.split(" ")[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF4EC] px-6 py-10 md:px-10 md:py-[40px]">
      <div className="w-full max-w-[440px]">
        <div className="size-[58px] rounded-[18px] bg-[linear-gradient(155deg,#F8C3A8,#F2937A)] flex items-center justify-center mb-[22px] shadow-[0_12px_26px_-10px_rgba(238,129,100,.65)]">
          <svg
            width="30"
            height="30"
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

        <h1 className="font-fredoka font-semibold text-[32px] leading-[1.15] m-0 mb-2 text-ink">
          Bienvenida a OpenDayCare
        </h1>
        <p className="m-0 mb-[26px] text-muted text-[15.5px] leading-[1.55]">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para
          activar la cuenta.
        </p>

        <div className="flex items-center gap-[14px] bg-white border-[1.5px] border-[#EADFD0] rounded-[16px] p-[14px_16px] mb-[22px]">
          <div
            className="size-11 rounded-full flex items-center justify-center flex-none font-fredoka font-semibold text-[19px]"
            style={{ backgroundColor: invited.avatarBg, color: invited.avatarColor }}
          >
            {invited.initial}
          </div>
          <div>
            <div className="text-[13px] text-muted">Te invitaron a seguir a</div>
            <div className="font-fredoka font-semibold text-[17px] text-ink">
              {invitedName} · Sala {invited.room ?? "Soles"}
            </div>
          </div>
        </div>

        <div className="text-[12px] font-bold tracking-[0.7px] text-muted mb-2">
          CÓDIGO DE INVITACIÓN
        </div>
        <input
          defaultValue="7K4P9"
          className="w-full px-4 py-[14px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[18px] tracking-[3px] font-bold text-ink mb-[18px] font-fredoka focus:outline-none focus:border-accent"
        />

        <div className="text-[12px] font-bold tracking-[0.7px] text-muted mb-2">
          EMAIL
        </div>
        <input
          type="email"
          defaultValue="lucia.fernandez@gmail.com"
          className="w-full px-4 py-[14px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink mb-[18px] focus:outline-none focus:border-accent"
        />

        <div className="text-[12px] font-bold tracking-[0.7px] text-muted mb-2">
          CREAR CONTRASEÑA
        </div>
        <input
          type="password"
          defaultValue="contraseña"
          className="w-full px-4 py-[14px] rounded-[14px] border-[1.5px] border-[#F2A78E] bg-white text-[15px] text-ink mb-[18px] focus:outline-none focus:border-accent"
        />

        <label className="flex items-start gap-3 bg-[#FBF1D6] rounded-[14px] p-[14px_16px] mb-6 cursor-pointer">
          <span className="flex-none size-6 rounded-lg bg-[#5FB97E] flex items-center justify-center mt-[1px]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="text-[14px] text-[#8A7234] leading-[1.45]">
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro
            de la app.
          </span>
        </label>

        <a
          href="familia-feed.dc.html"
          className="block text-center w-full py-[15px] rounded-[15px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-base shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)]"
        >
          Activar mi cuenta
        </a>

        <p className="text-center mt-[22px] mb-0 text-muted text-[14.5px]">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="text-accent-dark font-extrabold">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}