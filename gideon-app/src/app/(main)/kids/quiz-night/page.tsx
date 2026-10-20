import { KidsQuizNight } from "@/components/kids/quiz-night";

/** Bible Quiz Night: the whole class plays on one screen, above the app's bars. */
export default function KidsQuizNightPage() {
  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto">
      <KidsQuizNight />
    </div>
  );
}
