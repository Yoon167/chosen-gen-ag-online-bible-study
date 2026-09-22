import { BottomNav } from "@/components/layout/bottom-nav";
import { QuickAddFab } from "@/components/layout/quick-add-fab";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-xl flex-col">
      <main className="flex-1 pb-28 safe-top">{children}</main>
      <QuickAddFab />
      <BottomNav />
    </div>
  );
}
