import { BookOpenCheck, CalendarRange, GraduationCap } from "lucide-react";

import { CourseCard } from "@/components/dashboard/course-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { studentCourses } from "@/lib/mock/courses";

export default function CoursesPage() {
  const stats = [
    {
      title: "Active courses",
      value: String(studentCourses.length),
      description: "Courses currently visible in the student portal",
      icon: BookOpenCheck,
    },
    {
      title: "Current semester",
      value: "1",
      description: "Bachelor track semester in progress",
      icon: CalendarRange,
    },
    {
      title: "Course level",
      value: "Bachelor",
      description: "Aligned with ISTAD academic pathway",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
        <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Courses
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              View enrolled classes and subject progress
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              This page shows the student&apos;s course list, semester progress,
              and direct links to each class detail.
            </p>
          </div>
          <div className="rounded-2xl border bg-background/60 p-5">
            <div className="flex items-center justify-between">
              <p className="font-medium">Enrollment snapshot</p>
              <Badge>Scholarship</Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Students can review the current learning path, instructor profile,
              course progression, and available curriculum content.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {studentCourses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}
