"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { CourseCard } from "@/components/dashboard/course-card";
import { Card, CardContent } from "@/components/ui/card";
import type { StudentCourse } from "@/lib/types/course";

type CourseProgressCardProps = {
  courses: StudentCourse[];
  perPage?: number;
};

export function CourseProgressCard({
  courses,
  perPage = 3,
}: CourseProgressCardProps) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(courses.length / perPage);
  const visibleCourses = courses.slice(page * perPage, page * perPage + perPage);
  const averageProgress =
    courses.length > 0
      ? Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)
      : 0;

  return (
    <Card className="overflow-hidden border-border/60 bg-card/80 py-0 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-5 py-3.5">
        <div className="space-y-0.5">
          <p className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
            Course Progress
          </p>
          <p className="text-xs text-muted-foreground">Your enrolled courses</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-[11px] text-muted-foreground">
            Avg {averageProgress}%
          </span>
          <span className="text-xs text-muted-foreground">
            {page + 1} / {totalPages || 1}
          </span>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next page"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      <CardContent className="space-y-3 p-4">
        {courses.length === 0 ? (
          <p className="text-sm text-muted-foreground">No courses available</p>
        ) : (
          visibleCourses.map((course) => (
            <CourseCard key={course.slug} course={course} layout="list" />
          ))
        )}
      </CardContent>
    </Card>
  );
}
