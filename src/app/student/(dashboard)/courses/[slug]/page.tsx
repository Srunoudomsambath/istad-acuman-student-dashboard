import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, UserRound, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getCourseBySlug, studentCourses } from "@/lib/mock/courses";

type CoursePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return studentCourses.map((course) => ({ slug: course.slug }));
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const groupedCurriculum = course.curriculum.reduce<Record<string, string[]>>(
    (accumulator, item) => {
      accumulator[item.type] ??= [];
      accumulator[item.type].push(`${item.title} - ${item.description}`);
      return accumulator;
    },
    {
      Slide: [],
      Video: [],
      "Mini Project": [],
      Lecture: [],
    }
  );

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
        <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>{course.level}</Badge>
              <Badge variant="secondary">
                Year {course.year} Semester {course.semester}
              </Badge>
              <Badge variant="outline">{course.track}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Course detail
              </p>
              <h2 className="text-3xl font-semibold tracking-tight">
                {course.title}
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {course.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Credit", String(course.credit)],
                ["Theory", String(course.theory)],
                ["Practice", String(course.practice)],
                ["Internship", course.internship],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-2 text-base font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border bg-background/60 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <h3 className="text-xl font-semibold">{course.instructor}</h3>
                </div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <UserRound className="size-5" />
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {course.instructorRole}
              </p>
            </div>

            <div className="rounded-2xl border bg-background/60 p-5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-muted-foreground" />
                  <span>{course.studentsJoined} students joined</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-muted-foreground" />
                  <span>Start {course.classStart}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {course.roster.map((student) => (
                  <Badge key={student} variant="secondary">
                    {student}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle>Course Curriculum</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <Tabs defaultValue="Slide" className="w-full">
              <TabsList className="mb-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                {Object.keys(groupedCurriculum).map((item) => (
                  <TabsTrigger key={item} value={item}>
                    {item}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(groupedCurriculum).map(([key, items]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  {items.length > 0 ? (
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border bg-background/70 p-4"
                        >
                          <div className="mt-1 flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {key.slice(0, 2).toUpperCase()}
                          </div>
                          <p className="text-sm leading-6 text-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No curriculum data available.
                    </p>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle>Course Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <p className="text-sm leading-6 text-muted-foreground">
              What you will learn in this course?
            </p>
            <div className="space-y-3">
              {course.curriculum.map((item) => (
                <div
                  key={item.uuid}
                  className="flex items-center justify-between rounded-2xl border bg-background/70 px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </div>
              ))}
            </div>
            <div className="rounded-2xl border bg-primary/5 p-4">
              <p className="text-sm font-medium">Course Logo</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {course.code} - {course.summary}
              </p>
            </div>
            <Button className="w-full">Download course outline</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


