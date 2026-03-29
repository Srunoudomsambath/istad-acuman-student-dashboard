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
  perPage = 2,
}: CourseProgressCardProps) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(courses.length / perPage);
  const visibleCourses = courses.slice(
    page * perPage,
    page * perPage + perPage
  );

  return (
    <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
      
      {/* ─── HEADER (Same as GradeCard) ───────────────────────── */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-6 py-4">
        
        {/* LEFT */}
        <div className="space-y-1">
          <p className="text-lg font-semibold leading-none tracking-tight sm:text-xl">
            Course Progress
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Your enrolled courses
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {page + 1} / {totalPages || 1}
          </span>

          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            onClick={() =>
              setPage((p) => Math.min(totalPages - 1, p + 1))
            }
            disabled={page === totalPages - 1}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* ─── CONTENT ─────────────────────────────────────────── */}
      <CardContent className="p-5">
        {courses.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No courses available
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {visibleCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}