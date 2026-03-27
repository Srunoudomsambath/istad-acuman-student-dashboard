import Link from "next/link";
import { ArrowRight, CalendarDays, GraduationCap, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { StudentCourse } from "@/lib/types/course";
import Image from "next/image";

type CourseCardProps = {
  course: StudentCourse;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="group overflow-hidden border-border/60 bg-card/80 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
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
         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 overflow-hidden">
  <Image
    src={course.logo} // should be image path or URL
    alt="Course Logo"
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
      <CardFooter className="flex items-center justify-between border-t bg-muted/20 p-5">
        <p className="text-sm text-muted-foreground">{course.summary}</p>
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


