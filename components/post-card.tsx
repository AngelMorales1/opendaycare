export type Post = {
  id: string;
  childInitial: string;
  name: string;
  avatarBg: string;
  avatarColor: string;
  avatarIcon?: "megaphone";
  time: string;
  badge: {
    label: string;
    bg: string;
    dot: string;
    color: string;
  };
  audience: string;
  body: string;
  photo?: { label: string };
  likes: number;
  comments: number;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-card border border-border rounded-[20px] py-4 px-4 md:py-5 md:px-[22px] shadow-[0_4px_16px_-12px_rgba(120,90,60,.5)]">
      <div className="flex items-center gap-3 mb-3.5">
        <div
          className="size-11 rounded-full flex items-center justify-center flex-none font-fredoka font-semibold text-[17px]"
          style={{ background: post.avatarBg, color: post.avatarColor }}
        >
          {post.avatarIcon === "megaphone" ? (
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
              <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
          ) : (
            post.childInitial
          )}
        </div>
        <div className="flex-1">
          <div className="font-fredoka font-semibold text-[16.5px] text-ink">
            {post.name}
          </div>
          <div className="text-[12.5px] text-muted-light">{post.time}</div>
        </div>
        <div
          className="flex items-center gap-[7px] px-3 py-1.5 rounded-full"
          style={{ background: post.badge.bg }}
        >
          <span
            className="size-2 rounded-full"
            style={{ background: post.badge.dot }}
          />
          <span
            className="text-xs font-extrabold tracking-[0.5px]"
            style={{ color: post.badge.color }}
          >
            {post.badge.label}
          </span>
        </div>
      </div>

      <div className="text-[12.5px] text-muted-light mb-2.5">{post.audience}</div>
      <p className="text-[15.5px] leading-[1.55] text-body m-0">{post.body}</p>

      {post.photo && (
        <a
          href="foto.dc.html"
          className="flex flex-col items-center justify-center gap-2 mt-3.5 border-[1.5px] border-dashed border-photo-border rounded-2xl bg-photo-bg h-50 text-photo-text"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
          </svg>
          <span className="text-[13.5px]">Foto · {post.photo.label}</span>
        </a>
      )}

      <div className="flex items-center gap-[18px] mt-4 pt-3.5 border-t border-divider">
        <span className="flex items-center gap-[7px] text-accent-soft font-bold text-sm">
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="#E0654A"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          {post.likes}
        </span>
        <a
          href="detalle-publicacion.dc.html"
          className="flex items-center gap-[7px] text-muted font-bold text-sm"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
          </svg>
          {post.comments}
        </a>
        <span className="flex-1" />
        <a href="crear-publicacion.dc.html" className="text-accent-dark font-extrabold text-sm">
          Editar
        </a>
      </div>
    </div>
  );
}
