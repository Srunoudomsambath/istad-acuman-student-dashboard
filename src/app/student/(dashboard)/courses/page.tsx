"use client";

import { useState, useMemo } from "react";
import {
  Award,
  BookOpenCheck,
  CheckCircle2,
  Circle,
  Clock,
  TrendingUp,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { ReactElement } from "react";

import { CourseCard } from "@/components/dashboard/course-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { studentCourses } from "@/lib/mock/courses";

type Trend = "up" | "down" | "flat";

type AttendanceItem = {
  subject: string;
  attended: number;
  total: number;
};

type DeadlineItem = {
  title: string;
  course: string;
  due: string;
  done: boolean;
};

type GradeItem = {
  subject: string;
  grade: string;
  score: number;
};

const STATUS_OPTIONS = ["On Track", "At Risk", "Completed"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

const PAGE_SIZE = 6;

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string;
  sub: string;
  trend: Trend;
  icon: React.ElementType;
}) {
  const trendColor =
    trend === "up"
      ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400"
      : trend === "down"
        ? "text-red-500 bg-red-50 dark:bg-red-950/40 dark:text-red-400"
        : "text-muted-foreground bg-muted";

  const trendSymbol = trend === "up" ? "+" : trend === "down" ? "-" : "=";

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card px-5 py-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>
      <p className="text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium ${trendColor}`}
        >
          {trendSymbol} {sub}
        </span>
        <span className="text-[11px] text-muted-foreground">vs last semester</span>
      </div>
    </div>
  );
}

// ─── Panel Header ─────────────────────────────────────────────────────────────
function PanelHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactElement;
}) {
  return (
    <CardHeader className="border-b border-border/60 bg-muted/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
          {description && (
            <p className="text-sm leading-6 text-muted-foreground">{description}</p>
          )}
        </div>
        {action}
      </div>
    </CardHeader>
  );
}

// ─── Attendance Row ───────────────────────────────────────────────────────────
function AttendanceRow({ subject, attended, total }: AttendanceItem) {
  const pct = Math.round((attended / total) * 100);
  const color =
    pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-400" : "bg-red-500";

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{subject}</p>
        <p className="text-[11px] text-muted-foreground">
          {attended}/{total} classes
        </p>
      </div>
      <div className="flex w-28 items-center gap-2 sm:w-32">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full ${color} transition-all`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="w-8 text-right text-xs font-semibold text-foreground">
          {pct}%
        </span>
      </div>
    </div>
  );
}

// ─── Deadline Row ─────────────────────────────────────────────────────────────
function DeadlineRow({ title, course, due, done }: DeadlineItem) {
  return (
    <div className="flex items-start gap-3 py-3">
      {done ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
      ) : (
        <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
      )}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${done ? "text-muted-foreground line-through" : "text-foreground"}`}
        >
          {title}
        </p>
        <p className="text-[11px] text-muted-foreground">{course}</p>
      </div>
      <span
        className={`shrink-0 text-[11px] font-medium ${done ? "text-muted-foreground" : "text-amber-600 dark:text-amber-400"}`}
      >
        {due}
      </span>
    </div>
  );
}

// ─── Grade Row ────────────────────────────────────────────────────────────────
function GradeRow({ subject, grade, score }: GradeItem) {
  const color =
    score >= 85
      ? "text-emerald-600 dark:text-emerald-400"
      : score >= 70
        ? "text-sky-600 dark:text-sky-400"
        : score >= 50
          ? "text-amber-600 dark:text-amber-400"
          : "text-red-500";

  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground">{subject}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-current opacity-70 transition-all"
            style={{ width: `${score}%`, color: "inherit" }}
          />
        </div>
        <span className={`w-6 text-center text-xs font-bold ${color}`}>{grade}</span>
        <span className="w-8 text-right text-[11px] text-muted-foreground">
          {score}%
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);
  const [page, setPage] = useState(1);

  const toggleStatus = (status: Status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const stats = [
    {
      label: "Enrolled courses",
      value: String(studentCourses.length),
      sub: "2",
      trend: "up" as Trend,
      icon: BookOpenCheck,
    },
    { label: "Avg. attendance", value: "84%", sub: "3%", trend: "down" as Trend, icon: Clock },
    { label: "GPA (semester)", value: "3.52", sub: "0.14", trend: "up" as Trend, icon: TrendingUp },
    { label: "Credits completed", value: "18", sub: "0", trend: "flat" as Trend, icon: Award },
  ];

  const attendance: AttendanceItem[] = [
    { subject: "Web Development", attended: 22, total: 26 },
    { subject: "Database Systems", attended: 18, total: 24 },
    { subject: "UI/UX Design", attended: 24, total: 26 },
    { subject: "Data Structures", attended: 14, total: 22 },
    { subject: "Networking Basics", attended: 20, total: 24 },
  ];

  const deadlines: DeadlineItem[] = [
    { title: "Assignment 3 - REST API", course: "Web Development", due: "Today", done: false },
    { title: "ER Diagram Submission", course: "Database Systems", due: "Mar 30", done: false },
    { title: "Wireframe Review", course: "UI/UX Design", due: "Apr 2", done: false },
    { title: "Lab Report #4", course: "Data Structures", due: "Mar 25", done: true },
    { title: "Quiz 2 Revision", course: "Networking Basics", due: "Mar 22", done: true },
  ];

  const grades: GradeItem[] = [
    { subject: "Web Development", grade: "A", score: 91 },
    { subject: "Database Systems", grade: "B+", score: 78 },
    { subject: "UI/UX Design", grade: "A-", score: 87 },
    { subject: "Data Structures", grade: "B", score: 72 },
    { subject: "Networking Basics", grade: "A", score: 90 },
  ];

  const onTrackCourses = studentCourses.filter((c) => c.progress >= 70).length;
  const pendingDeadlines = deadlines.filter((d) => !d.done).length;
  const hasActiveFilters = selectedStatuses.length > 0;

  const filteredCourses = useMemo(() => {
    // Reset to page 1 whenever filters/search change
    setPage(1);
    return studentCourses.filter((course) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        (course.title ?? "").toLowerCase().includes(q) ||
        (course.instructor ?? "").toLowerCase().includes(q);

      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes((course.status ?? "") as Status);

      return matchesSearch && matchesStatus;
    });
  }, [search, selectedStatuses]);

  const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const startItem = filteredCourses.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(page * PAGE_SIZE, filteredCourses.length);

  return (
    <div className="flex flex-col gap-5">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="rounded-full text-[11px] font-semibold">
            Scholarship
          </Badge>
          <span>Semester 1 - 2024 - 2025</span>
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Courses
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Track progress across your active courses, stay ahead of deadlines, keep an
            eye on attendance and grades.
          </p>
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── Attendance + Deadlines ──────────────────────────────────── */}
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
          <PanelHeader
            title="Attendance overview"
            description="A quick view of where you are staying consistent and where you need to catch up."
            action={<Badge variant="secondary" className="self-start">84% average</Badge>}
          />
          <CardContent className="divide-y divide-border/60 px-5">
            {attendance.map((item) => (
              <AttendanceRow key={item.subject} {...item} />
            ))}
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
          <PanelHeader
            title="Upcoming deadlines"
            description="Prioritized by urgency, with completed tasks clearly marked."
            action={
              <Badge variant="secondary" className="self-start">
                {pendingDeadlines} pending
              </Badge>
            }
          />
          <CardContent className="divide-y divide-border/60 px-5">
            {deadlines.map((item) => (
              <DeadlineRow key={item.title} {...item} />
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
        <PanelHeader
          title="Grade summary"
          action={<span className="text-xs text-muted-foreground">Auto-synced</span>}
        />
        <CardContent className="divide-y divide-border/60 px-5">
          {grades.map((g) => (
            <GradeRow key={g.subject} {...g} />
          ))}
        </CardContent>
        <CardFooter className="block border-t border-border/60 px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Semester GPA</span>
            <span className="text-sm font-bold text-foreground">3.52 / 4.00</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[88%] rounded-full bg-foreground/80" />
          </div>
        </CardFooter>
      </Card>

      {/* ── Courses ─────────────────────────────────────────────────── */}
      <div className="grid gap-3">
        <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
          <PanelHeader
            title={`Enrolled courses (${studentCourses.length})`}
            description="Open any card to jump into the course detail page."
            action={
              <span className="text-xs text-muted-foreground">{onTrackCourses} on track</span>
            }
          />

          {/* Search & Filter bar */}
          <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by course or instructor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pl-8 text-sm"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={hasActiveFilters ? "default" : "outline"}
                  size="sm"
                  className="h-8 gap-1.5 px-3 text-xs"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filter
                  {hasActiveFilters && (
                    <span className="ml-0.5 rounded-full bg-background/20 px-1.5 py-0.5 text-[10px] font-semibold leading-none">
                      {selectedStatuses.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel className="text-xs">Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {STATUS_OPTIONS.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={() => toggleStatus(status)}
                    className="text-xs"
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
                {hasActiveFilters && (
                  <>
                    <DropdownMenuSeparator />
                    <button
                      onClick={() => setSelectedStatuses([])}
                      className="w-full px-2 py-1.5 text-left text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear filters
                    </button>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Course grid or empty state */}
          <CardContent className="p-4">
            {paginatedCourses.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {paginatedCourses.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="mb-3 h-8 w-8 text-muted-foreground/30" />
                <p className="text-sm font-medium text-foreground">No courses found</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try adjusting your search or clearing the filters.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedStatuses([]);
                  }}
                  className="mt-3 text-xs font-medium underline underline-offset-2 hover:no-underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </CardContent>

          {/* Pagination footer — only shown when there's more than one page */}
          {totalPages > 1 && (
            <CardFooter className="flex items-center justify-between border-t border-border/60 px-5 py-3">
              <p className="text-[11px] text-muted-foreground">
                Showing {startItem}–{endItem} of {filteredCourses.length} courses
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  aria-label="First page"
                >
                  <ChevronsLeft className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>

                {/* Page number pills */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <Button
                    key={n}
                    variant={n === page ? "default" : "outline"}
                    size="icon"
                    className="h-7 w-7 text-[11px]"
                    onClick={() => setPage(n)}
                    aria-label={`Page ${n}`}
                    aria-current={n === page ? "page" : undefined}
                  >
                    {n}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                  aria-label="Last page"
                >
                  <ChevronsRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>

    </div>
  );
}