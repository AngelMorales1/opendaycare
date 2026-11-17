export default function ComposePrompt() {
  return (
    <a
      href="crear-publicacion.dc.html"
      className="flex items-center gap-3.5 bg-card border border-border rounded-[18px] py-3.5 px-4 md:px-[18px] mb-6 shadow-[0_4px_14px_-10px_rgba(120,90,60,.4)]"
    >
      <div className="size-10 rounded-full bg-avatar-coral text-white font-fredoka font-semibold text-base flex items-center justify-center flex-none">
        C
      </div>
      <span className="flex-1 text-muted-light text-[15px]">
        Compartí un momento…
      </span>
      <span className="size-[38px] rounded-xl bg-accent-bg text-accent-soft flex items-center justify-center">
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
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </span>
    </a>
  );
}
