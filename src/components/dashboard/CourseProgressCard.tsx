"use client";

import { useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

import { CourseCard } from "@/components/dashboard/course-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StudentCourse } from "@/lib/types/course";

type CourseProgressCardProps = {
  courses: StudentCourse[];
  perPage?: number;
};

export function CourseProgressCard({ courses, perPage = 2 }: CourseProgressCardProps) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(courses.length / perPage);
  const visibleCourses = courses.slice(page * perPage, page * perPage + perPage);

  return (
    <Card className="border-border/60 bg-card/80 shadow-sm">
      <CardHeader className="border-b bg-muted/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="size-5 text-primary" />
            Course progress
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-2 gap-3">
          {visibleCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}