import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[1.05fr_1fr] bg-[#FBF4EC]">
      {/* Panel de marketing */}
      <div className="relative overflow-hidden bg-[linear-gradient(155deg,#F6A98E_0%,#F2937A_45%,#EC7E62_100%)] flex flex-col justify-between px-6 py-10 md:px-[60px] md:py-14 text-white">
        <div className="absolute w-[420px] h-[420px] rounded-full bg-white/12 -top-[140px] -right-[120px]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-white/10 -bottom-[110px] -left-[80px]" />

        <div className="relative flex items-center gap-[13px]">
          <div className="size-[46px] rounded-[14px] bg-white/22 flex items-center justify-center">
            <svg
              width="26"
              height="26"
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
          <span className="font-fredoka font-semibold text-[21px] tracking-[0.5px]">
            OpenDayCare
          </span>
        </div>

        <div className="relative">
          <h1 className="font-fredoka font-semibold text-[30px] md:text-[42px] leading-[1.12] m-0 mb-[18px]">
            El día de cada niño,
            <br />
            compartido con su familia.
          </h1>
          <p className="text-[15px] md:text-[17px] leading-[1.6] m-0 max-w-[430px] text-white/92">
            Publicá momentos, gestioná las salas y mantené a las familias cerca,
            desde un solo lugar.
          </p>
        </div>

        <div className="relative text-[14px] text-white/90">🌿 Guardería Sala Soles</div>
      </div>

      {/* Formulario */}
      <div className="flex items-center justify-center px-6 py-10 md:px-10 md:py-[40px]">
        <div className="w-full max-w-[392px]">
          <h2 className="font-fredoka font-semibold text-[30px] m-0 mb-[6px] text-ink">
            Iniciar sesión
          </h2>
          <p className="m-0 mb-7 text-muted text-[15px]">
            Ingresá para ver el día de hoy.
          </p>

          <div className="text-[12px] font-bold tracking-[0.7px] text-muted mb-[8px]">
            EMAIL
          </div>
          <input
            type="email"
            defaultValue="caro@opendaycare.com"
            className="w-full px-4 py-[14px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink mb-[18px] focus:outline-none focus:border-accent"
          />

          <div className="text-[12px] font-bold tracking-[0.7px] text-muted mb-[8px]">
            CONTRASEÑA
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-[14px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-ink mb-[10px] focus:outline-none focus:border-accent"
          />

          <div className="text-right mb-5">
            <span className="text-accent-dark text-[13.5px] font-bold cursor-pointer">
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <Link
            href="/"
            className="block text-center w-full py-[15px] rounded-[15px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-base shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)]"
          >
            Iniciar sesión
          </Link>

          <p className="text-center mt-6 mb-0 text-muted text-[14.5px]">
            ¿Te invitó la guardería?{" "}
            <Link href="/activate-account" className="text-accent-dark font-extrabold">
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}