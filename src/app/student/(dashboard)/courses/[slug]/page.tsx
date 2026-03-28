import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChevronRight,
  FileText,
  GraduationCap,
  Layers3,
  PlayCircle,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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

const curriculumTypeMeta = {
  Slide: {
    label: "Slides",
    icon: FileText,
  },
  Video: {
    label: "Videos",
    icon: PlayCircle,
  },
  "Mini Project": {
    label: "Mini Project",
    icon: Layers3,
  },
  Lecture: {
    label: "Lectures",
    icon: BookOpen,
  },
} as const;

export function generateStaticParams() {
  return studentCourses.map((course) => ({ slug: course.slug }));
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 shadow-sm">
      <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

function CurriculumItemCard({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: keyof typeof curriculumTypeMeta;
}) {
  const Icon = curriculumTypeMeta[type].icon;

  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-background/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
      <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-foreground">{title}</p>
          <Badge variant="secondary" className="rounded-full">
            {curriculumTypeMeta[type].label}
          </Badge>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </div>
  );
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const progressLabel = course.progress >= 80 ? "Excellent" : course.progress >= 60 ? "On track" : "Needs focus";
  const completionPercent = Math.round(course.progress);
  const totalCurriculum = course.curriculum.length;
  const curriculumByType = course.curriculum.reduce<Record<string, (typeof course.curriculum)[number][]>>(
    (accumulator, item) => {
      accumulator[item.type] ??= [];
      accumulator[item.type].push(item);
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
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm" className="gap-2 px-0 text-muted-foreground hover:text-foreground">
          <Link href="/student/courses">
            <ArrowLeft className="size-4" />
            Back to courses
          </Link>
        </Button>
        <Badge variant="secondary" className="rounded-full px-3 py-1">
          {course.track}
        </Badge>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_32%)]" />
        <div className="relative grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full px-3 py-1">{course.level}</Badge>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                Year {course.year} - Semester {course.semester}
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                {course.code}
              </Badge>
            </div>

            <div className="space-y-3">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                <BookOpen className="size-3.5" />
                Course detail
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {course.title}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                {course.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatPill label="Credits" value={`${course.credit} total`} />
              <StatPill label="Instructor" value={course.instructor} />
              <StatPill label="Progress" value={`${completionPercent}% ${progressLabel}`} />
            </div>

            <div className="space-y-2 rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Semester progress
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Keep momentum steady and finish the remaining work strong.
                  </p>
                </div>
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  {completionPercent}%
                </p>
              </div>
              <Progress value={completionPercent} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Card className="border-border/60 bg-background/75 shadow-sm">
              <CardContent className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>Instructor</span>
                  <GraduationCap className="size-4" />
                </div>
                <p className="text-xl font-semibold text-foreground">
                  {course.instructor}
                </p>
                <p className="text-sm text-muted-foreground">
                  {course.instructorRole}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-background/75 shadow-sm">
              <CardContent className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>Class start</span>
                  <CalendarDays className="size-4" />
                </div>
                <p className="text-xl font-semibold text-foreground">
                  {course.classStart}
                </p>
                <p className="text-sm text-muted-foreground">
                  {course.studentsJoined} students joined
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-background/75 shadow-sm sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <CardContent className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>Enrollment snapshot</span>
                  <Users className="size-4" />
                </div>
                <p className="text-xl font-semibold text-foreground">
                  {course.studentsJoined} active learners
                </p>
                <p className="text-sm text-muted-foreground">
                  {course.roster.length} names currently visible in the mock roster.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-muted/20">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-xl">Curriculum map</CardTitle>
                <p className="text-sm leading-6 text-muted-foreground">
                  Browse lesson types by tab, then drill into each item in the list below.
                </p>
              </div>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                {totalCurriculum} items
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <Tabs defaultValue="Slide" className="w-full">
              <TabsList className="mb-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                {Object.entries(curriculumTypeMeta).map(([key, meta]) => (
                  <TabsTrigger key={key} value={key} className="gap-2">
                    <meta.icon className="size-4" />
                    {meta.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(curriculumTypeMeta).map(([key, meta]) => {
                const items = curriculumByType[key] ?? [];
                return (
                  <TabsContent key={key} value={key} className="mt-0">
                    {items.length > 0 ? (
                      <div className="space-y-3">
                        {items.map((item) => (
                          <CurriculumItemCard
                            key={item.uuid}
                            type={item.type}
                            title={item.title}
                            description={item.description}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 p-6 text-sm text-muted-foreground">
                        No {meta.label.toLowerCase()} available yet.
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
            <CardHeader className="border-b border-border/60 bg-muted/20">
              <CardTitle className="text-xl">Course details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Theory
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {course.theory} credits
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Practice
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {course.practice} credits
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/70 p-4 sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Internship
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {course.internship}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-primary/5 p-4">
                <p className="text-sm font-medium text-foreground">Summary</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {course.summary}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
            <CardHeader className="border-b border-border/60 bg-muted/20">
              <CardTitle className="text-xl">Roster preview</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="flex flex-wrap gap-2">
                {course.roster.map((student) => (
                  <Badge key={student} variant="secondary" className="rounded-full px-3 py-1">
                    {student}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/60 bg-background/40 p-5">
              <Button className="w-full gap-2">
                Download course outline
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}


