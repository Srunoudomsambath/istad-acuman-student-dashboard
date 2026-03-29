import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '../ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type GradeItem = {
  subject: string;
  grade: string;
  score: number;
};

type Semester = {
  id: string;
  label: string;          // e.g. "Semester 1"
  year: string;           // e.g. "2023–2024"
  gpa: number;
  maxGpa: number;
  grades: GradeItem[];
};

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
    <div className="flex items-center gap-5 py-4">
      {/* Subject */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold text-foreground">
          {subject}
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* BIG progress bar */}
        <div className="h-2.5 w-28 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-current opacity-90 transition-all duration-500"
            style={{ width: `${score}%`, color: "inherit" }}
          />
        </div>

        {/* Grade */}
        <span className={`w-8 text-center text-base font-bold ${color}`}>
          {grade}
        </span>

        {/* Score */}
        <span className="w-12 text-right text-sm text-muted-foreground">
          {score}%
        </span>
      </div>
    </div>
  );
}


// ─── Semester Dots ────────────────────────────────────────────────────────────
function SemesterDots({
  total,
  current,
  onChange,
}: {
  total: number;
  current: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === current
              ? "w-4 bg-foreground"
              : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
          }`}
          aria-label={`Go to semester ${i + 1}`}
        />
      ))}
    </div>
  );
}

// ─── GradeCard ────────────────────────────────────────────────────────────────
export function GradeCard({
  semesters,
  loading = false,
}: {
  /**
   * Pass your real semesters array from the API here.
   * The component falls back to placeholder data when this is undefined/empty.
   */
  semesters?: Semester[];
  loading?: boolean;
}) {
  // ── Placeholder data (remove once API is wired up) ────────────────────────
  const placeholder: Semester[] = [
    {
      id: "s1",
      label: "Semester 1",
      year: "2022–2023",
      gpa: 3.45,
      maxGpa: 4.0,
      grades: [
        { subject: "Introduction to CS", grade: "A", score: 92 },
        { subject: "Calculus I", grade: "B+", score: 79 },
        { subject: "English Composition", grade: "A-", score: 88 },
        { subject: "Physics I", grade: "B", score: 74 },
        { subject: "Physics I", grade: "B", score: 74 },
      ],
    },
    {
      id: "s2",
      label: "Semester 2",
      year: "2022–2023",
      gpa: 3.61,
      maxGpa: 4.0,
      grades: [
        { subject: "Data Structures", grade: "A", score: 94 },
        { subject: "Calculus II", grade: "B+", score: 81 },
        { subject: "Discrete Math", grade: "A-", score: 86 },
        { subject: "Physics II", grade: "B+", score: 80 },
        { subject: "Physics I", grade: "B", score: 74 },
      ],
    },
    {
      id: "s3",
      label: "Semester 3",
      year: "2023–2024",
      gpa: 3.52,
      maxGpa: 4.0,
      grades: [
        { subject: "Web Development", grade: "A", score: 91 },
        { subject: "Database Systems", grade: "B+", score: 78 },
        { subject: "UI/UX Design", grade: "A-", score: 87 },
        { subject: "Data Structures", grade: "B", score: 72 },
        { subject: "Networking Basics", grade: "A", score: 90 },
      ],
    },
    {
      id: "s4",
      label: "Semester 4",
      year: "2023–2024",
      gpa: 3.78,
      maxGpa: 4.0,
      grades: [
        { subject: "Machine Learning", grade: "A", score: 95 },
        { subject: "Software Engineering", grade: "A-", score: 89 },
        { subject: "Cloud Computing", grade: "A", score: 93 },
        { subject: "Computer Networks", grade: "B+", score: 82 },
      ],
    },
  ];

  const data = semesters && semesters.length > 0 ? semesters : placeholder;

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(data.length - 1, i + 1));

  const semester = data[index];
  const gpaPercent = (semester.gpa / semester.maxGpa) * 100;

  return (
    <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
      {/* ── Header — same sizing as PanelHeader, semester-switcher style ──────── */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-6 py-4">
        {/* Left: label (lg/xl like CardTitle) + year (sm muted like description) */}
        <div className="space-y-1">
          <p className="text-lg font-semibold leading-none tracking-tight sm:text-xl">
            {semester.label}
          </p>
          <p className="text-sm leading-6 text-muted-foreground">{semester.year}</p>
        </div>

        {/* Right: dots + arrows — same icon size as PanelHeader actions */}
        <div className="flex items-center gap-2">
          <SemesterDots total={data.length} current={index} onChange={setIndex} />
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous semester"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={next}
              disabled={index === data.length - 1}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next semester"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Grade rows ──────────────────────────────────────────────────────── */}
<CardContent className="divide-y divide-border/60 px-6 py-5 space-y-2 min-h-[300px]">        {loading
          ? // Skeleton rows while API loads
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 animate-pulse">
                <div className="flex-1 h-2.5 rounded bg-muted" />
                <div className="h-1.5 w-20 rounded-full bg-muted" />
                <div className="w-6 h-2.5 rounded bg-muted" />
                <div className="w-8 h-2.5 rounded bg-muted" />
              </div>
            ))
          : semester.grades.map((g) => (
              <GradeRow key={g.subject} {...g} />
            ))}
      </CardContent>

      {/* ── Footer: GPA ─────────────────────────────────────────────────────── */}
      <CardFooter className="block border-t border-border/60 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Semester GPA</span>
          <span className="text-sm font-bold text-foreground">
            {loading ? "—" : `${semester.gpa.toFixed(2)} / ${semester.maxGpa.toFixed(2)}`}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground/80 transition-all duration-500"
            style={{ width: loading ? "0%" : `${gpaPercent}%` }}
          />
        </div>
      </CardFooter>
    </Card>
  );
}