import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ActivitySquare,
  ArrowLeft,
  Award,
  BookOpen,
  BookOpenCheck,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronRight,
  FileText,
  GraduationCap,
  Layers3,
  PlayCircle,
  TrendingUp,
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

     <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

        <div>
          {/* ── Top meta bar ── */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-6 py-3">
            <Badge className="rounded-full px-3 py-0.5 text-xs">{course.level}</Badge>
            <Badge variant="secondary" className="rounded-full px-3 py-0.5 text-xs">
              Year {course.year} · Semester {course.semester}
            </Badge>
            <Badge variant="outline" className="rounded-full px-3 py-0.5 font-mono text-xs tracking-wider">
              {course.code}
            </Badge>
            <span className="ml-auto hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
              <BookOpen className="size-3.5" />
              Course Detail
            </span>
          </div>

          {/* ── Main body ── */}
          <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
            {/* Left — Title + Stats + Progress */}
            <div className="space-y-6 border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {course.title}
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
              </div>

              {/* Stat pills row */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <Award className="size-3.5" />, label: "Credits", value: `${course.credit} total` },
                  { icon: <GraduationCap className="size-3.5" />, label: "Theory", value: course.theory },
              { icon: <Briefcase className="size-3.5" />, label: "Practice", value: course.practice },
              { icon: <Building2 className="size-3.5" />, label: "Internship", value: course.internship },

                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 rounded-lg border border-border bg-muted/30 px-3.5 py-2.5"
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      {icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="text-sm font-semibold leading-tight text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress block */}
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Semester Progress</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Keep momentum and finish the remaining work strong.</p>
                  </div>
                  <span className="text-2xl font-bold tabular-nums text-foreground">{completionPercent}%</span>
                </div>
                <Progress value={completionPercent} className="h-1.5" />
                <p className="mt-2 text-right text-xs font-medium text-muted-foreground">{progressLabel}</p>
              </div>
            </div>

            {/* Right — Info cards */}
            <div className="flex flex-col divide-y divide-border">
              <div className="flex items-start gap-3.5 p-5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                  <GraduationCap className="size-4 text-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Instructor</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{course.instructor}</p>
                  <p className="text-xs text-muted-foreground">{course.instructorRole}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                  <CalendarDays className="size-4 text-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Class Start</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{course.classStart}</p>
                  <p className="text-xs text-muted-foreground">{course.studentsJoined} students joined</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                  <Users className="size-4 text-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Enrollment</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{course.studentsJoined} active learners</p>
                  <p className="text-xs text-muted-foreground">{course.roster.length} names in roster</p>
                </div>
              </div>

           <div className="flex items-start gap-3.5 p-5">
  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
    <ActivitySquare className="size-4 text-foreground" />
  </div>
  <div>
    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Status</p>
    <p className="mt-0.5 text-sm font-semibold text-foreground capitalize">{course.status ?? "Active"}</p>
    <p className="text-xs text-muted-foreground">Current course status</p>
  </div>
</div>
             

            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-3 ">
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

    
      </div>
    </div>
  );
}


