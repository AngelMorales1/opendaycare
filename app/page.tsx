import AppShell from "@/components/app-shell";
import ComposePrompt from "@/components/compose-prompt";
import PostCard from "@/components/post-card";
import { posts } from "@/mock-data/mock";

export default function Home() {
  return (
    <AppShell>
      <div className="max-w-[760px] w-full mx-auto px-4 md:px-10 py-6 md:py-[34px] pb-20">
        <div className="mb-6">
          <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-accent mb-1">
            GUARDERÍA · SALA SOLES
          </div>
          <h1 className="font-fredoka font-semibold text-3xl m-0 text-ink">
            Buenas, Caro
          </h1>
          <p className="mt-[5px] text-muted-light text-[14.5px]">
            12 niños · martes 17 jun
          </p>
        </div>

        <ComposePrompt />

        <div className="flex items-center gap-3.5 mb-3.5">
          <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-muted-darker">
            PUBLICADO HOY
          </span>
          <span className="flex-1 h-px bg-divider-light" />
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
