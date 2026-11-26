import AppShell from "@/components/app-shell";
import AddKidModal from "@/components/add-kid-modal";
import KidsList from "@/components/kids-list";
import { getKids } from "@/mock-data/kids";

export default function KidsPage() {
  const kids = getKids();
  return (
    <AppShell>
      <div className="max-w-[880px] w-full mx-auto px-4 md:px-10 py-6 md:py-[34px] pb-20">
        <div className="flex items-end justify-between gap-4 mb-[22px]">
          <div>
            <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-accent mb-1">
              GESTIÓN
            </div>
            <h1 className="font-fredoka font-semibold text-3xl m-0 text-ink">
              Niños
            </h1>
          </div>
          <AddKidModal />
        </div>

        <KidsList kids={kids} />
      </div>
    </AppShell>
  );
}