import { BottomNav } from "@/components/layout/bottom-nav";
import { QuickAddFab } from "@/components/layout/quick-add-fab";
import { WelcomeGate } from "@/components/auth/welcome-gate";
import { LanguageProvider } from "@/lib/i18n";
import { BackgroundMusic } from "@/lib/background-music";
import { TourAutostart, TourProvider } from "@/components/tour/tour-provider";
import { LiveBanner } from "@/components/teaching/live-follow";
import { PushRefresher } from "@/components/profile/push-settings";
import { ActivityPing } from "@/components/activity-ping";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <LanguageProvider>
    <TourProvider>
    <BackgroundMusic />
    <WelcomeGate>
      <div className="relative mx-auto flex min-h-screen w-full max-w-xl flex-col">
        <main className="flex-1 pb-28 safe-top">
          <LiveBanner />
          {children}
        </main>
        <QuickAddFab />
        <BottomNav />
      </div>
      <TourAutostart />
      <PushRefresher />
      <ActivityPing />
    </WelcomeGate>
    </TourProvider>
    </LanguageProvider>
  );
}
