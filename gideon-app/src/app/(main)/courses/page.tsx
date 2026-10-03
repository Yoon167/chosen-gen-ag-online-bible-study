import { COURSES } from "@/lib/content/courses";
import { CourseCards, CourseHeader } from "@/components/courses/course-client";
import { Bi } from "@/components/courses/bi";

/** Discipleship Courses: deep Bible studies from salvation to maturity. */
export default function CoursesPage() {
  return (
    <div>
      <CourseHeader
        back={false}
        title={{ en: "Discipleship Courses", tl: "Mga Kurso sa Pagkadisipulo" }}
        subtitle={{ en: "From salvation to maturity", tl: "Mula kaligtasan hanggang kapanahunan" }}
      />
      <div className="space-y-4 px-5 pb-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <Bi
            t={{
              en: "Bible-based studies with key verses, context, application, journal questions, prayer and a weekly challenge. Study alone or with your AG.",
              tl: "Mga pag-aaral na nakabatay sa Bibliya na may mahahalagang talata, konteksto, aplikasyon, mga tanong sa journal, panalangin, at lingguhang hamon. Mag-aral nang mag-isa o kasama ang iyong AG.",
            }}
          />
        </p>
        <CourseCards
          courses={COURSES.map((c) => ({ id: c.id, title: c.title, summary: c.summary, icon: c.icon, lessonIds: c.lessons.map((l) => l.id) }))}
        />
      </div>
    </div>
  );
}
