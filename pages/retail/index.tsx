import { ROUTES } from "@/common/constants";
import Header from "@/components/Header";
import { Envelope, QuickActions, RecentRecord } from "@/components/pages/home";

export default function Home() {
  return (
    <div className="rt-min-h-screen rt-bg-[#f5f5f5] rt-flex rt-flex-col">
      <Header
        navLabel="ငွေလွှဲမှတ်တမ်း"
        boldLabel
        navLink={ROUTES.HOME}
        longHeader
      />
      <Envelope />
      <main className="rt-w-full rt-flex rt-flex-col rt-flex-1 rt-pt-4 rt-gap-[25px]">
        <QuickActions />
        <RecentRecord />
      </main>
    </div>
  );
}
