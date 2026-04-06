"use client";

import { useMemo, useState } from "react";
import type { ElementType } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { studentCourses } from "@/lib/mock/courses";
import {
  getUpcomingScheduleItems,
  type StudentScheduleItem,
  type StudentScheduleScope,
} from "@/lib/mock/schedule";
import {
  formatPhnomPenhDate,
  getPhnomPenhDate,
  getPhnomPenhDateKey,
  parsePhnomPenhDateKey,
} from "@/lib/phnom-penh-date";

type ViewMode = "Daily" | "Weekly" | "Monthly";
type ScopeFilter = "all" | StudentScheduleScope;

type CalendarCell = {
  date: Date;
  inMonth: boolean;
  key: string;
};

function dateKey(date: Date) {
  return getPhnomPenhDateKey(date);
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function startOfWeek(date: Date) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - copy.getDay());
  return copy;
}

function formatMonthTitle(date: Date) {
  return formatPhnomPenhDate(date, { month: "long", year: "numeric" }, "en-US");
}

function formatShortLabel(dateKeyValue: string) {
  return formatPhnomPenhDate(
    parsePhnomPenhDateKey(dateKeyValue),
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    },
    "en-US"
  );
}

function buildCalendarCells(viewDate: Date) {
  const firstDay = startOfMonth(viewDate);
  const lastDay = endOfMonth(viewDate);
  const cells: CalendarCell[] = [];

  const startGrid = new Date(firstDay);
  startGrid.setDate(firstDay.getDate() - firstDay.getDay());

  const endGrid = new Date(lastDay);
  endGrid.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

  const cursor = new Date(startGrid);
  while (cursor <= endGrid) {
    cells.push({
      date: new Date(cursor),
      inMonth: cursor.getMonth() === viewDate.getMonth(),
      key: dateKey(cursor),
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return cells;
}

function buildWeekCells(viewDate: Date) {
  const weekStart = startOfWeek(viewDate);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return {
      date,
      key: dateKey(date),
      inMonth: true,
    };
  });
}

function matchesScope(item: StudentScheduleItem, scopeFilter: ScopeFilter) {
  return scopeFilter === "all" || item.scope === scopeFilter;
}

function matchesSearch(item: StudentScheduleItem, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    item.title,
    item.courseTitle,
    item.location,
    item.description,
    item.category,
    item.scope,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function scopeLabel(scope: StudentScheduleScope) {
  if (scope === "course") return "Course";
  if (scope === "general") return "General";
  return "Personal";
}

function scopeTone(scope: StudentScheduleScope) {
  if (scope === "course") {
    return "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400";
  }
  if (scope === "general") {
    return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400";
  }
  return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400";
}

function categoryLabel(category: StudentScheduleItem["category"]) {
  switch (category) {
    case "assignment":
      return "Assignment";
    case "quiz":
      return "Quiz";
    case "midterm":
      return "Midterm";
    case "final":
      return "Final";
    case "ceremony":
      return "Ceremony";
    case "sports":
      return "Sports";
    case "meeting":
      return "Meeting";
    default:
      return category;
  }
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: ElementType;
}) {
  return (
    <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="size-4" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            Schedule
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <p className="text-xs leading-5 text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}

function EventChip({ item }: { item: StudentScheduleItem }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/80 px-2 py-1.5 text-[11px] leading-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="truncate font-medium text-foreground">{item.title}</p>
        <span className={`shrink-0 rounded-full px-2 py-0.5 ${scopeTone(item.scope)}`}>
          {scopeLabel(item.scope)}
        </span>
      </div>
      <p className="truncate text-muted-foreground">
        {item.courseTitle ?? item.location ?? "Campus event"}
      </p>
    </div>
  );
}

function DaySummary({
  label,
  items,
  emptyLabel,
}: {
  label: string;
  items: StudentScheduleItem[];
  emptyLabel: string;
}) {
  return (
    <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
      <CardHeader className="border-b border-border/60 bg-gradient-to-r from-background via-muted/20 to-background">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg sm:text-xl">{label}</CardTitle>
            <p className="text-sm leading-5 text-muted-foreground">
              {items.length} item{items.length === 1 ? "" : "s"} on this day
            </p>
          </div>
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Day view
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border/60 bg-background/70 p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <Badge variant="secondary" className="rounded-full px-2 py-0 text-[10px]">
                      {categoryLabel(item.category)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.courseTitle ?? item.location ?? "General event"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Track date {formatPhnomPenhDate(parsePhnomPenhDateKey(item.date), { month: "short", day: "numeric" })} at {item.time}
                  </p>
                </div>
                <Badge variant="secondary" className={`rounded-full px-3 py-1 text-[11px] ${scopeTone(item.scope)}`}>
                  {scopeLabel(item.scope)}
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border/60 bg-background/60 px-5 py-4 text-sm text-muted-foreground">
            {emptyLabel}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function shiftMonth(date: Date, offset: number) {
  return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}

export default function SchedulePage() {
  const [viewDate, setViewDate] = useState(() => getPhnomPenhDate());
  const [viewMode, setViewMode] = useState<ViewMode>("Monthly");
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>("all");
  const [search, setSearch] = useState("");
  const [selectedDateKey, setSelectedDateKey] = useState(() => getPhnomPenhDateKey());

  const scheduleItems = useMemo(() => getUpcomingScheduleItems(), []);
  const calendarCells = useMemo(() => buildCalendarCells(viewDate), [viewDate]);
  const weekCells = useMemo(() => buildWeekCells(viewDate), [viewDate]);

  const filteredItems = useMemo(() => {
    return scheduleItems.filter(
      (item) => matchesScope(item, scopeFilter) && matchesSearch(item, search)
    );
  }, [scheduleItems, scopeFilter, search]);

  const currentMonthKey = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, "0")}`;
  const todayDate = getPhnomPenhDate();
  const todayKey = getPhnomPenhDateKey(todayDate);
  const todayLabel = formatPhnomPenhDate(todayDate, { month: "short", day: "numeric" });
  const selectedDateLabel = formatPhnomPenhDate(parsePhnomPenhDateKey(selectedDateKey), {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const monthItems = filteredItems.filter((item) => item.date.startsWith(currentMonthKey));
  const selectedItems = filteredItems.filter((item) => item.date === selectedDateKey);
  const nextTrack = filteredItems.find((item) => item.status !== "Done") ?? filteredItems[0] ?? scheduleItems[0];
  const activeCourses = studentCourses.length;
  const pendingTracks = filteredItems.filter((item) => item.status !== "Done").length;
  const todayCount = filteredItems.filter((item) => item.date === todayKey).length;
  const focusProgress = Math.round(
    studentCourses.reduce((sum, course) => sum + course.progress, 0) / studentCourses.length
  );
  const courseCount = monthItems.filter((item) => item.scope === "course").length;
  const generalCount = monthItems.filter((item) => item.scope === "general").length;
  const personalCount = monthItems.filter((item) => item.scope === "personal").length;
  const visibleItems =
    viewMode === "Monthly"
      ? monthItems
      : viewMode === "Weekly"
        ? filteredItems.filter((item) => weekCells.some((cell) => cell.key === item.date))
        : selectedItems;

  const goPrevMonth = () => {
    setViewDate((current) => {
      const next = shiftMonth(current, -1);
      setSelectedDateKey(dateKey(next));
      return next;
    });
  };

  const goNextMonth = () => {
    setViewDate((current) => {
      const next = shiftMonth(current, 1);
      setSelectedDateKey(dateKey(next));
      return next;
    });
  };

  const goToday = () => {
    const today = getPhnomPenhDate();
    setViewDate(today);
    setSelectedDateKey(getPhnomPenhDateKey(today));
  };

  const monthTitle = formatMonthTitle(viewDate);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="rounded-full text-[11px] font-semibold">
            My Schedule
          </Badge>
          <span>Track dates come from course, general, and personal events</span>
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Schedule
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            A monthly view of class deadlines, campus events, and personal reminders. You can switch months, filter by scope, and click any day for details.
          </p>
        </div>
      </div>


      <Card className="overflow-hidden rounded-[28px] border-4 border-border/50 bg-card/80 shadow-sm">
        <CardHeader className="border-b border-border/60 bg-muted/20 px-5 py-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-xl border border-border/60 bg-background p-1 shadow-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg"
                  onClick={goPrevMonth}
                  aria-label="Previous month"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 rounded-lg px-3"
                  onClick={goToday}
                >
                  Today
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg"
                  onClick={goNextMonth}
                  aria-label="Next month"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                {monthTitle}
                <CalendarDays className="size-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-[22rem]">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search events, courses, or places"
                  className="h-11 rounded-xl border-border/60 bg-background pl-10 pr-4"
                />
              </div>
              <div className="inline-flex items-center rounded-xl border border-border/60 bg-background p-1 shadow-sm">
                {(["Daily", "Weekly", "Monthly"] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === viewMode ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-3 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "All", value: "all" as ScopeFilter },
              { label: "Course", value: "course" as ScopeFilter },
              { label: "General", value: "general" as ScopeFilter },
              { label: "Personal", value: "personal" as ScopeFilter },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setScopeFilter(item.value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${scopeFilter === item.value ? "border-primary bg-primary/10 text-primary" : "border-border/60 bg-background text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {viewMode === "Monthly" ? (
            <div className="grid grid-cols-7 overflow-hidden rounded-[24px] border border-border/60 bg-border/60">
              {[
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ].map((day) => (
                <div
                  key={day}
                  className="border-b border-r border-border/60 bg-card px-3 py-4 text-center text-sm font-medium text-foreground last:border-r-0"
                >
                  {day}
                </div>
              ))}

              {calendarCells.map((cell) => {
                const items = filteredItems.filter((item) => item.date === cell.key);
                const isToday = cell.key === todayKey;
                const isSelected = cell.key === selectedDateKey;
                const outOfMonth = !cell.inMonth;
                const fade = outOfMonth
                  ? "bg-[repeating-linear-gradient(-45deg,rgba(0,0,0,0.035)_0,rgba(0,0,0,0.035)_4px,transparent_4px,transparent_8px)]"
                  : "";

                return (
                  <button
                    key={cell.key}
                    type="button"
                    onClick={() => setSelectedDateKey(cell.key)}
                    className={`min-h-36 border-r border-b border-border/60 bg-card p-3 text-left last:border-r-0 ${fade} ${isToday ? "bg-primary/5" : ""} ${isSelected ? "ring-2 ring-primary ring-inset" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col items-start gap-1">
                        <span
                          className={`inline-flex size-8 items-center justify-center rounded-full text-sm font-semibold ${isToday ? "bg-emerald-700 text-white" : outOfMonth ? "bg-muted text-muted-foreground" : "bg-muted text-foreground"}`}
                        >
                          {cell.date.getDate()}
                        </span>
                        {isToday ? (
                          <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                            Today
                          </span>
                        ) : null}
                      </div>
                      {items.length > 0 ? (
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                          {items.length}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3 space-y-2">
                      {items.slice(0, 2).map((item) => (
                        <EventChip key={item.id} item={item} />
                      ))}
                      {items.length > 2 ? (
                        <p className="text-[11px] text-muted-foreground">
                          +{items.length - 2} more
                        </p>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : viewMode === "Weekly" ? (
            <div className="grid gap-3 md:grid-cols-7">
              {weekCells.map((cell) => {
                const items = filteredItems.filter((item) => item.date === cell.key);
                const isToday = cell.key === todayKey;
                const isSelected = cell.key === selectedDateKey;

                return (
                  <button
                    key={cell.key}
                    type="button"
                    onClick={() => setSelectedDateKey(cell.key)}
                    className={`space-y-3 rounded-2xl border p-3 text-left transition-shadow ${isSelected ? "border-primary shadow-md" : "border-border/60 bg-card/80 hover:shadow-sm"} ${isToday ? "bg-primary/5" : "bg-card"}`}
                  >
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        {formatPhnomPenhDate(cell.date, { weekday: "short" }, "en-US")}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`inline-flex size-8 items-center justify-center rounded-full text-sm font-semibold ${isToday ? "bg-emerald-700 text-white" : "bg-muted text-foreground"}`}>
                          {cell.date.getDate()}
                        </span>
                        {isToday ? <Badge className="rounded-full px-2 py-0 text-[10px]">Today</Badge> : null}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {items.slice(0, 2).map((item) => (
                        <EventChip key={item.id} item={item} />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <DaySummary
              label={selectedDateLabel}
              items={selectedItems}
              emptyLabel="No events scheduled for this day. Select another date or switch back to Monthly."
            />
          )}
        </CardContent>
      </Card>

    <div className="grid gap-3 xl:grid-cols-[1fr_340px]">
  {/* â”€â”€ Upcoming track dates (now in the wide column) â”€â”€ */}
  <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
    <CardHeader className="border-b border-border/60 from-background via-muted/20 to-background px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <CardTitle className="text-lg sm:text-xl">Upcoming track dates</CardTitle>
          <p className="text-sm leading-5 text-muted-foreground">
            Sorted by date and filtered to the current scope.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Pending: {pendingTracks}
          </Badge>
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Next: {formatShortLabel(nextTrack.date)}
          </Badge>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-3 p-4">
      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-background/70 px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Course</p>
          <p className="text-sm font-semibold text-foreground">{courseCount}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/70 px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">General</p>
          <p className="text-sm font-semibold text-foreground">{generalCount}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/70 px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Personal</p>
          <p className="text-sm font-semibold text-foreground">{personalCount}</p>
        </div>
      </div>
      {monthItems.length > 0 ? (
        monthItems.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border/60 bg-background/70 p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <Badge variant="secondary" className={`rounded-full px-2 py-0 text-[10px] ${scopeTone(item.scope)}`}>
                    {scopeLabel(item.scope)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.courseTitle ?? item.location ?? "Campus event"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Track date {formatPhnomPenhDate(parsePhnomPenhDateKey(item.date), { month: "short", day: "numeric" })} at {item.time}
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                {item.status}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-dashed border-border/60 bg-background/60 px-5 py-4 text-sm text-muted-foreground">
          Nothing matches your current filters.
        </div>
      )}
    </CardContent>
  </Card>

  {/* â”€â”€ Selected day (now in the narrow 340px column) â”€â”€ */}
  <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
    <CardHeader className="border-b border-border/60 from-background via-muted/20 to-background px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <CardTitle className="text-lg sm:text-xl">Selected day</CardTitle>
          <p className="text-sm leading-5 text-muted-foreground">
            Click any day in the calendar to inspect its events.
          </p>
        </div>
        <Badge variant="secondary" className="rounded-full px-3 py-1">
          {selectedDateLabel}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-3 p-4">
      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-background/70 px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Events</p>
          <p className="text-sm font-semibold text-foreground">{selectedItems.length} scheduled</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/70 px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Course</p>
          <p className="text-sm font-semibold text-foreground">
            {selectedItems.filter((item) => item.scope === "course").length} course
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/70 px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Status</p>
          <p className="text-sm font-semibold text-foreground">
            {selectedItems.some((item) => item.status === "Today") ? "Active today" : "Queued"}
          </p>
        </div>
      </div>
      {selectedItems.length > 0 ? (
        selectedItems.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border/60 bg-background/70 p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <Badge variant="secondary" className={`rounded-full px-2 py-0 text-[10px] ${scopeTone(item.scope)}`}>
                    {scopeLabel(item.scope)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.courseTitle ?? item.location ?? "Campus event"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {categoryLabel(item.category)} at {item.time}
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                {item.status}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-dashed border-border/60 bg-background/60 px-5 py-4 text-sm text-muted-foreground">
          No events found for the selected day and filter.
        </div>
      )}
    </CardContent>
  </Card>
</div>
    </div>
  );
}
