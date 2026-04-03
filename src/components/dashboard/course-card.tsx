import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, GraduationCap, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { StudentCourse } from "@/lib/types/course";

type CourseCardProps = {
  course: StudentCourse;
  layout?: "card" | "list";
};

export function CourseCard({ course, layout = "card" }: CourseCardProps) {
  if (layout === "list") {
    return (
      <Card className="group overflow-hidden border-border/60 bg-card/80 py-0 shadow-sm transition-all duration-200 hover:shadow-md">
        <CardContent className="flex items-center gap-5 px-5 py-5">
          {/* Logo */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
            <Image
              src={course.logo}
              alt={`${course.title} logo`}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          {/* Main info */}
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-sm font-semibold tracking-tight truncate">
                {course.title}
              </h3>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {course.level}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <GraduationCap className="size-3 shrink-0" />
                {course.instructor}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3 shrink-0" />
                {course.credit} credits
              </span>
              <span className="flex items-center gap-1">
                <Users className="size-3 shrink-0" />
                {course.studentsJoined} students
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="hidden w-36 shrink-0 space-y-1.5 sm:block">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>

          {/* Action */}
          <Button asChild variant="ghost" size="sm" className="shrink-0 gap-1 text-xs">
            <Link href={`/student/courses/${course.slug}`}>
              View
              <ArrowRight className="size-3" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // -- Default card layout --------------------------------------------------
  return (
    <Card className="group overflow-hidden border-border/60 bg-card/80 py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{course.level}</Badge>
              <Badge variant="outline">
                Year {course.year} - Semester {course.semester}
              </Badge>
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              {course.title}
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {course.description}
            </p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary/10">
            <Image
              src={course.logo}
              alt={`${course.title} logo`}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 rounded-lg border bg-muted/40 px-2.5 py-2">
            <CalendarDays className="size-3.5 shrink-0" />
            <span className="truncate">{course.credit} credits</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border bg-muted/40 px-2.5 py-2">
            <GraduationCap className="size-3.5 shrink-0" />
            <span className="truncate">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border bg-muted/40 px-2.5 py-2">
            <Users className="size-3.5 shrink-0" />
            <span className="truncate">{course.studentsJoined} students</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <Progress value={course.progress} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t bg-muted/20 p-4">
        <Button asChild variant="ghost" className="gap-1">
          <Link href={`/student/courses/${course.slug}`}>
            View detail
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
