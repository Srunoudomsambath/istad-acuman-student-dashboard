"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type TranscriptCourse = {
  code: string;
  title: string;
  credit: number;
  grade: string;
  point: number;
};

type TranscriptSemester = {
  id: string;
  label: string;
  gpa: string;
  credits: number;
  courses: TranscriptCourse[];
};

type TranscriptYear = {
  id: string;
  label: string;
  semesters: TranscriptSemester[];
};

type FlattenedSemester = TranscriptSemester & {
  yearLabel: string;
};

type TranscriptPreviewState =
  | {
      kind: "image";
      title: string;
      pageLabel: string;
      imageSrc: string;
    }
  | {
      kind: "pdf";
      title: string;
      pageLabel: string;
      pageNumber: number;
    };

const transcriptYears: TranscriptYear[] = [
  {
    id: "year-1",
    label: "Year 1",
    semesters: [
      {
        id: "y1s1",
        label: "Semester 1",
        gpa: "3.70",
        credits: 15,
        courses: [
          { code: "WEB101", title: "Web Development", credit: 3, grade: "A", point: 4.0 },
          { code: "DBS101", title: "Database Systems", credit: 3, grade: "B+", point: 3.5 },
          { code: "ENG101", title: "English for IT", credit: 3, grade: "A-", point: 3.7 },
          { code: "MTH101", title: "Discrete Mathematics", credit: 3, grade: "B+", point: 3.5 },
          { code: "CLS101", title: "Computer Literacy", credit: 3, grade: "A", point: 4.0 },
        ],
      },
      {
        id: "y1s2",
        label: "Semester 2",
        gpa: "3.48",
        credits: 15,
        courses: [
          { code: "ALG102", title: "Algorithms", credit: 3, grade: "B+", point: 3.5 },
          { code: "NET103", title: "Networking Basics", credit: 3, grade: "B", point: 3.0 },
          { code: "CPL102", title: "C Programming", credit: 3, grade: "A-", point: 3.7 },
          { code: "PHY101", title: "Physics for Computing", credit: 3, grade: "B+", point: 3.5 },
          { code: "ACA100", title: "Academic Skills", credit: 3, grade: "A", point: 4.0 },
        ],
      },
    ],
  },
  {
    id: "year-2",
    label: "Year 2",
    semesters: [
      {
        id: "y2s1",
        label: "Semester 1",
        gpa: "3.82",
        credits: 15,
        courses: [
          { code: "REA201", title: "React Development", credit: 4, grade: "A", point: 4.0 },
          { code: "SPR210", title: "Spring Boot", credit: 3, grade: "A-", point: 3.7 },
          { code: "DSA205", title: "Data Structures", credit: 3, grade: "A", point: 4.0 },
          { code: "UIX210", title: "UI/UX Design", credit: 2, grade: "B+", point: 3.5 },
          { code: "STA201", title: "Statistics", credit: 3, grade: "B+", point: 3.5 },
        ],
      },
      {
        id: "y2s2",
        label: "Semester 2",
        gpa: "3.60",
        credits: 15,
        courses: [
          { code: "MOB220", title: "Flutter Development", credit: 4, grade: "A-", point: 3.7 },
          { code: "API225", title: "API Development", credit: 3, grade: "B+", point: 3.5 },
          { code: "DBA221", title: "Advanced Database", credit: 3, grade: "B+", point: 3.5 },
          { code: "OOP220", title: "Object-Oriented Programming", credit: 3, grade: "A-", point: 3.7 },
          { code: "PMT200", title: "Project Management", credit: 2, grade: "B", point: 3.0 },
        ],
      },
    ],
  },
  {
    id: "year-3",
    label: "Year 3",
    semesters: [
      {
        id: "y3s1",
        label: "Semester 1",
        gpa: "3.74",
        credits: 15,
        courses: [
          { code: "SYS301", title: "System Analysis and Design", credit: 3, grade: "A-", point: 3.7 },
          { code: "SEC310", title: "Cybersecurity Fundamentals", credit: 3, grade: "B+", point: 3.5 },
          { code: "AI301", title: "Introduction to AI", credit: 3, grade: "A", point: 4.0 },
          { code: "RES300", title: "Research Methods", credit: 3, grade: "B+", point: 3.5 },
          { code: "CLD305", title: "Cloud Computing", credit: 3, grade: "A-", point: 3.7 },
        ],
      },
      {
        id: "y3s2",
        label: "Semester 2",
        gpa: "3.68",
        credits: 15,
        courses: [
          { code: "ML302", title: "Machine Learning Basics", credit: 3, grade: "B+", point: 3.5 },
          { code: "DEV320", title: "DevOps Essentials", credit: 3, grade: "A-", point: 3.7 },
          { code: "TST301", title: "Software Testing", credit: 3, grade: "A", point: 4.0 },
          { code: "UXR300", title: "User Research", credit: 3, grade: "B+", point: 3.5 },
          { code: "ENT310", title: "Entrepreneurship", credit: 3, grade: "B+", point: 3.5 },
        ],
      },
    ],
  },
  {
    id: "year-4",
    label: "Year 4",
    semesters: [
      {
        id: "y4s1",
        label: "Semester 1",
        gpa: "3.88",
        credits: 15,
        courses: [
          { code: "INT401", title: "Internship I", credit: 3, grade: "A", point: 4.0 },
          { code: "ARC410", title: "Software Architecture", credit: 3, grade: "A-", point: 3.7 },
          { code: "CAP401", title: "Capstone Project I", credit: 3, grade: "A", point: 4.0 },
          { code: "LDR400", title: "Leadership in Tech", credit: 3, grade: "B+", point: 3.5 },
          { code: "ETH401", title: "IT Ethics", credit: 3, grade: "A-", point: 3.7 },
        ],
      },
      {
        id: "y4s2",
        label: "Semester 2",
        gpa: "3.92",
        credits: 15,
        courses: [
          { code: "INT402", title: "Internship II", credit: 3, grade: "A", point: 4.0 },
          { code: "CAP402", title: "Capstone Project II", credit: 3, grade: "A", point: 4.0 },
          { code: "MGT420", title: "IT Project Governance", credit: 3, grade: "A-", point: 3.7 },
          { code: "DSN410", title: "Design Systems", credit: 3, grade: "A-", point: 3.7 },
          { code: "PRS400", title: "Professional Seminar", credit: 3, grade: "A", point: 4.0 },
        ],
      },
    ],
  },
];

const allSemesters: FlattenedSemester[] = transcriptYears.flatMap((year) =>
  year.semesters.map((semester) => ({
    ...semester,
    yearLabel: year.label,
  }))
);

const totalCredits = allSemesters.reduce((sum, semester) => sum + semester.credits, 0);
const completedCourses = allSemesters.reduce((sum, semester) => sum + semester.courses.length, 0);
const cumulativeGpa = (
  allSemesters.reduce((sum, semester) => sum + Number(semester.gpa), 0) / allSemesters.length
).toFixed(2);

const overallChartData = allSemesters.map((semester) => ({
  semester: `${semester.yearLabel.replace("Year ", "Y")}-${semester.label.replace("Semester ", "S")}`,
  gpa: Number(semester.gpa),
}));

const chartConfig = {
  gpa: {
    label: "GPA",
    color: "var(--chart-1)",
  },
  point: {
    label: "Point",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const foundationTranscript = {
  title: "Foundation Transcript",
  description: "Foundation-year academic transcript.",
  downloadHref: "/transcripts/pucyy.png",
  imageSrc: "/transcripts/pucyy.png",
} as const;

const officialTranscript = {
  title: "Official Transcript",
  description: "Complete academic transcript across all available pages.",
  downloadHref: "/transcripts/offical-transcript.pdf",
  pdfSrc: "/transcripts/offical-transcript.pdf",
} as const;

function gradeBadgeClass(grade: string) {
  if (grade.startsWith("A")) {
    return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/40";
  }

  if (grade.startsWith("B")) {
    return "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/40";
  }

  return "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/40";
}

export default function BachelorTranscriptPage() {
  const [officialTranscriptPages, setOfficialTranscriptPages] = useState(0);
  const [officialTranscriptFile, setOfficialTranscriptFile] = useState<string | null>(null);
  const [officialTranscriptError, setOfficialTranscriptError] = useState<string | null>(null);
  const [preview, setPreview] = useState<TranscriptPreviewState | null>(null);

  useEffect(() => {
    let active = true;

    async function loadOfficialTranscript() {
      try {
        setOfficialTranscriptError(null);
        const response = await fetch(officialTranscript.pdfSrc);

        if (!response.ok) {
          throw new Error(`Failed to fetch transcript PDF (${response.status})`);
        }

        const fileBlob = await response.blob();
        const objectUrl = URL.createObjectURL(fileBlob);

        if (active) {
          setOfficialTranscriptFile(objectUrl);
        } else {
          URL.revokeObjectURL(objectUrl);
        }
      } catch (error) {
        if (active) {
          setOfficialTranscriptError(
            error instanceof Error ? error.message : "Failed to load PDF file."
          );
        }
      }
    }

    loadOfficialTranscript();

    return () => {
      active = false;
      setOfficialTranscriptFile((currentUrl) => {
        if (currentUrl) {
          URL.revokeObjectURL(currentUrl);
        }
        return null;
      });
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Transcript
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Review your semester results, completed credits, and cumulative GPA in one clean transcript view.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="h-10 justify-start rounded-md p-1">
          <TabsTrigger value="overview" className="px-4 py-1.5 text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="documents" className="px-4 py-1.5 text-sm">
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
            <Card className="border-border/60 bg-card/90 py-0 shadow-sm">
              <CardHeader className="border-b border-border/60 px-5 py-4">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold text-foreground">
                    Subject Results
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Semester performance across the full bachelor study period.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-4 py-4 sm:px-5">
                <Tabs defaultValue="overall" className="space-y-4">
                  <TabsList className="h-10 flex-wrap justify-start rounded-md p-1">
                    <TabsTrigger value="overall" className="px-3 py-1.5 text-sm">
                      Overall
                    </TabsTrigger>
                    {allSemesters.map((semester) => (
                      <TabsTrigger key={semester.id} value={semester.id} className="px-3 py-1.5 text-sm">
                        {semester.yearLabel.replace("Year ", "Y")}-{semester.label.replace("Semester ", "S")}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="overall" className="mt-0 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="rounded-full px-2.5 py-1 text-[11px] font-medium">
                        Full Program Comparison
                      </Badge>
                      <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[11px] font-medium">
                        Overall GPA {cumulativeGpa}
                      </Badge>
                    </div>

                    <ChartContainer config={chartConfig} className="h-[260px] w-full">
                      <BarChart data={overallChartData} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="semester" tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          domain={[0, 4]}
                          ticks={[0, 1, 2, 3, 4]}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />
                        <Bar dataKey="gpa" fill="var(--color-gpa)" radius={[8, 8, 0, 0]} maxBarSize={52} />
                      </BarChart>
                    </ChartContainer>
                  </TabsContent>

                  {allSemesters.map((semester) => {
                    const chartData = semester.courses.map((course) => ({
                      code: course.code,
                      point: course.point,
                    }));

                    return (
                      <TabsContent key={semester.id} value={semester.id} className="mt-0 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="rounded-full px-2.5 py-1 text-[11px] font-medium">
                            {semester.yearLabel} {semester.label}
                          </Badge>
                          <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[11px] font-medium">
                            GPA {semester.gpa}
                          </Badge>
                          <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[11px] font-medium">
                            {semester.credits} credits
                          </Badge>
                        </div>

                        <ChartContainer config={chartConfig} className="h-[260px] w-full">
                          <BarChart data={chartData} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis dataKey="code" tickLine={false} axisLine={false} tickMargin={10} />
                            <YAxis
                              tickLine={false}
                              axisLine={false}
                              tickMargin={8}
                              domain={[0, 4]}
                              ticks={[0, 1, 2, 3, 4]}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />
                            <Bar dataKey="point" fill="var(--color-point)" radius={[8, 8, 0, 0]} maxBarSize={56} />
                          </BarChart>
                        </ChartContainer>

                        <Card className="overflow-hidden rounded-xl border-border/60 bg-card/90 py-0 shadow-sm">
                          <CardContent className="p-0">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/10 hover:bg-muted/10">
                                  <TableHead className="w-16 pl-6 font-medium text-muted-foreground">No</TableHead>
                                  <TableHead className="font-medium text-muted-foreground">Course Title</TableHead>
                                  <TableHead className="w-24 font-medium text-muted-foreground">Credit</TableHead>
                                  <TableHead className="w-28 font-medium text-muted-foreground">Grade</TableHead>
                                  <TableHead className="w-24 pr-6 text-right font-medium text-muted-foreground">Point</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {semester.courses.map((course, index) => (
                                  <TableRow
                                    key={`${semester.id}-${course.code}`}
                                    className="border-border/50 transition-colors hover:bg-muted/20"
                                  >
                                    <TableCell className="pl-6 text-sm text-foreground">{index + 1}</TableCell>
                                    <TableCell className="py-4 font-medium text-foreground">
                                      <div className="space-y-0.5">
                                        <p>{course.title}</p>
                                        <p className="text-[11px] font-normal text-muted-foreground">{course.code}</p>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{course.credit}</TableCell>
                                    <TableCell>
                                      <Badge
                                        variant="secondary"
                                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${gradeBadgeClass(course.grade)}`}
                                      >
                                        {course.grade}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="pr-6 text-right text-sm text-muted-foreground">
                                      {course.point.toFixed(1)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </CardContent>
            </Card>

            <Card className="h-fit self-start border-border/60 bg-card/90 py-0 shadow-sm">
              <CardContent className="p-0">
                <div className="border-b border-border/60 px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Transcript Summary
                  </p>
                </div>
                <div className="divide-y divide-border/60">
                  <div className="px-5 py-4">
                    <p className="text-xs text-muted-foreground">Study Period</p>
                    <p className="mt-1 text-base font-semibold text-foreground">2022 - 2026</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-muted-foreground">Overall GPA</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{cumulativeGpa}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-muted-foreground">Total Semesters</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{allSemesters.length}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-muted-foreground">Total Subjects</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{completedCourses}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-muted-foreground">Total Credits</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{totalCredits}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-0">
          <Card className="overflow-hidden rounded-xl border border-border/70 bg-card py-0 shadow-none">
            <CardContent className="p-0 py-0">
              <Accordion type="multiple" defaultValue={["foundation"]} className="divide-y divide-border/70">
                <AccordionItem value="foundation" className="border-b border-border/70 last:border-b-0">
                  <div className="flex items-start justify-between gap-3 px-5 py-5 sm:px-6">
                    <AccordionTrigger className="py-0 text-[16px] font-medium text-foreground hover:no-underline data-[state=open]:bg-transparent [&>svg]:order-first [&>svg]:mr-4 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-primary [&>svg]:-rotate-90 [&[data-state=open]>svg]:rotate-0">
                      <div className="space-y-1 text-left">
                        <p>{foundationTranscript.title}</p>
                        <p className="text-sm font-normal text-muted-foreground">{foundationTranscript.description}</p>
                      </div>
                    </AccordionTrigger>
                    <div className="flex shrink-0 items-center gap-2 pt-0.5">
                      <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[11px] font-medium">
                        1 page
                      </Badge>
                      <Button asChild variant="outline" size="sm">
                        <a href={foundationTranscript.downloadHref} download>
                          <Download className="size-4" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                  <AccordionContent className="pb-0">
                    <div className="px-5 pb-6 sm:px-6">
                      <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/10">
                        <div className="border-b border-border/60 px-4 py-2 text-xs font-medium text-muted-foreground">
                          {foundationTranscript.title} Page 1
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setPreview({
                              kind: "image",
                              title: foundationTranscript.title,
                              pageLabel: `${foundationTranscript.title} Page 1`,
                              imageSrc: foundationTranscript.imageSrc,
                            })
                          }
                          className="block w-full bg-muted/20 transition hover:bg-muted/30"
                        >
                          <Image
                            src={foundationTranscript.imageSrc}
                            alt={foundationTranscript.title}
                            width={1200}
                            height={1700}
                            className="mx-auto h-auto w-full max-w-3xl bg-white object-contain"
                          />
                        </button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="official" className="border-b border-border/70 last:border-b-0">
                  <div className="flex items-start justify-between gap-3 px-5 py-5 sm:px-6">
                    <AccordionTrigger className="py-0 text-[16px] font-medium text-foreground hover:no-underline data-[state=open]:bg-transparent [&>svg]:order-first [&>svg]:mr-4 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-primary [&>svg]:-rotate-90 [&[data-state=open]>svg]:rotate-0">
                      <div className="space-y-1 text-left">
                        <p>{officialTranscript.title}</p>
                        <p className="text-sm font-normal text-muted-foreground">{officialTranscript.description}</p>
                      </div>
                    </AccordionTrigger>
                    <div className="flex shrink-0 items-center gap-2 pt-0.5">
                      <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[11px] font-medium">
                        {officialTranscriptPages > 0 ? `${officialTranscriptPages} pages` : "PDF"}
                      </Badge>
                      <Button asChild variant="outline" size="sm">
                        <a href={officialTranscript.downloadHref} download>
                          <Download className="size-4" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                  <AccordionContent className="pb-0">
                    <div className="px-5 pb-6 sm:px-6">
                      {officialTranscriptError ? (
                        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-8 text-center text-xs text-destructive">
                          {officialTranscriptError}
                        </div>
                      ) : officialTranscriptFile ? (
                        <Document
                          file={officialTranscriptFile}
                          onLoadSuccess={({ numPages }) => setOfficialTranscriptPages(numPages)}
                          onLoadError={(error) => setOfficialTranscriptError(error.message)}
                          loading={
                            <div className="rounded-lg border border-border/60 bg-muted/20 px-4 py-8 text-center text-xs text-muted-foreground">
                              Loading transcript...
                            </div>
                          }
                          className="space-y-3"
                        >
                          {Array.from({ length: officialTranscriptPages }, (_, index) => (
                            <div
                              key={`official-transcript-page-${index + 1}`}
                              className="overflow-hidden rounded-lg border border-border/60 bg-muted/30"
                            >
                              <div className="border-b border-border/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                {officialTranscript.title} - Page {index + 1}
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setPreview({
                                    kind: "pdf",
                                    title: officialTranscript.title,
                                    pageLabel: `${officialTranscript.title} - Page ${index + 1}`,
                                    pageNumber: index + 1,
                                  })
                                }
                                className="flex w-full justify-center bg-muted/40 px-4 py-5 transition hover:bg-muted/50"
                              >
                                <div className="shadow-2xl shadow-black/50 ring-1 ring-border/60">
                                  <Page
                                    pageNumber={index + 1}
                                    width={420}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                  />
                                </div>
                              </button>
                            </div>
                          ))}
                        </Document>
                      ) : (
                        <div className="rounded-lg border border-border/60 bg-muted/20 px-4 py-8 text-center text-xs text-muted-foreground">
                          Loading transcript...
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={Boolean(preview)} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-auto p-4 sm:p-6">
          {preview ? (
            <div className="space-y-3">
              <div>
                <DialogTitle>{preview.title}</DialogTitle>
                <p className="text-sm text-muted-foreground">{preview.pageLabel}</p>
              </div>
              <div className="flex justify-center overflow-hidden rounded-xl border border-border/60 bg-muted/10 p-4">
                {preview.kind === "image" ? (
                  <Image
                    src={preview.imageSrc}
                    alt={preview.title}
                    width={1600}
                    height={2200}
                    className="h-auto w-full max-w-4xl bg-white object-contain"
                  />
                ) : officialTranscriptFile ? (
                  <div className="shadow-2xl shadow-black/50 ring-1 ring-border/60">
                    <Page
                      pageNumber={preview.pageNumber}
                      width={820}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                ) : (
                  <div className="rounded-lg border border-border/60 bg-muted/20 px-4 py-8 text-center text-xs text-muted-foreground">
                    Loading transcript...
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}


