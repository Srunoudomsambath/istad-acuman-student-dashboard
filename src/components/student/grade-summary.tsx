import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "../ui/card";

type GradeItem = {
  subject: string;
  grade: string;
  score: number;
};

type Semester = {
  id: string;
  label: string;
  year: string;
  gpa: number;
  maxGpa: number;
  grades: GradeItem[];
};

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
    <div className="grid grid-cols-[minmax(0,1fr)_40px_48px] items-center gap-3 rounded-xl border border-border/60 bg-background/50 px-3 py-2.5">
      <p className="truncate text-sm font-medium text-foreground">{subject}</p>
      <span className={`text-right text-sm font-semibold ${color}`}>{grade}</span>
      <span className="text-right text-xs text-muted-foreground">{score}%</span>
    </div>
  );
}

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

export function GradeCard({
  semesters,
  loading = false,
}: {
  semesters?: Semester[];
  loading?: boolean;
}) {
  const placeholder: Semester[] = [
    {
      id: "s1",
      label: "Semester 1",
      year: "2022-2023",
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
      year: "2022-2023",
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
      year: "2023-2024",
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
      year: "2023-2024",
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
  const topGradeCount = semester.grades.filter((item) => item.score >= 85).length;
  const averageScore = Math.round(
    semester.grades.reduce((sum, item) => sum + item.score, 0) / semester.grades.length
  );

  return (
    <Card className="overflow-hidden border-border/60 bg-card/80 py-0 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-5 py-3.5">
        <div className="space-y-0.5">
          <p className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
            {semester.label}
          </p>
          <p className="text-xs text-muted-foreground">{semester.year}</p>
        </div>

        <div className="flex items-center gap-2">
          <SemesterDots total={data.length} current={index} onChange={setIndex} />
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              disabled={index === 0}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous semester"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              onClick={next}
              disabled={index === data.length - 1}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next semester"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      <CardContent className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-2 rounded-xl border border-border/60 bg-muted/10 p-3">
          <div>
            <p className="text-[11px] text-muted-foreground">Courses</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{semester.grades.length}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Top Grades</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{topGradeCount}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Avg. Score</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{averageScore}%</p>
          </div>
        </div>

        <div className="space-y-2">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-11 animate-pulse rounded-xl bg-muted" />
              ))
            : semester.grades.map((g, rowIndex) => (
                <GradeRow key={`${g.subject}-${rowIndex}`} {...g} />
              ))}
        </div>
      </CardContent>

      <CardFooter className="block border-t border-border/60 px-5 py-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Semester GPA</span>
          <span className="text-sm font-semibold text-foreground">
            {loading ? "-" : `${semester.gpa.toFixed(2)} / ${semester.maxGpa.toFixed(2)}`}
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
