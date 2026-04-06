"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Download } from "lucide-react";

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
import { getExstadLearningDetailBySlug } from "@/lib/mock/exstad-courses";

type ScholarshipTranscriptSubject = {
  code: string;
  subject: string;
  credit: number;
  score: number;
  grade: string;
};

type ScholarshipMonth = {
  id: string;
  label: string;
  duration: string;
  average: number;
  subjects: ScholarshipTranscriptSubject[];
};

type TranscriptPreviewState = {
  title: string;
  pageLabel: string;
  imageSrc: string;
};

const scholarshipMonths: ScholarshipMonth[] = [
  {
    id: "month-1",
    label: "Month 1",
    duration: "Weeks 1 - 4",
    average: 93.0,
    subjects: [
      { code: "ITP101", subject: "Problem Solving", credit: 2, score: 95, grade: "A" },
      { code: "ITP102", subject: "HTML & CSS", credit: 3, score: 93, grade: "A" },
      { code: "ITP103", subject: "JavaScript Basics", credit: 3, score: 91, grade: "A-" },
    ],
  },
  {
    id: "month-2",
    label: "Month 2",
    duration: "Weeks 5 - 8",
    average: 92.0,
    subjects: [
      { code: "ITP201", subject: "React Fundamentals", credit: 3, score: 94, grade: "A" },
      { code: "ITP202", subject: "Spring Boot API", credit: 3, score: 90, grade: "A-" },
      { code: "ITP203", subject: "Database Design", credit: 2, score: 92, grade: "A" },
    ],
  },
  {
    id: "month-3",
    label: "Month 3",
    duration: "Weeks 9 - 12",
    average: 93.33,
    subjects: [
      { code: "ITP301", subject: "Project Implementation", credit: 4, score: 97, grade: "A" },
      { code: "ITP302", subject: "Deployment", credit: 2, score: 89, grade: "B+" },
      { code: "ITP303", subject: "Presentation Skills", credit: 2, score: 94, grade: "A" },
    ],
  },
];

const officialTranscript = {
  title: "Official Scholarship Transcript",
  description: "Final scholarship transcript across the full 3-month study period.",
  downloadHref: "/transcripts/pucyy.png",
  imageSrc: "/transcripts/pucyy.png",
} as const;

const chartConfig = {
  score: {
    label: "Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function gradeBadgeClass(grade: string) {
  if (grade.startsWith("A")) {
    return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/40";
  }

  if (grade.startsWith("B")) {
    return "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/40";
  }

  return "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/40";
}

export default function ScholarshipTranscriptPage({ params }: { params: { slug: string } }) {
  const detail = getExstadLearningDetailBySlug(params.slug);

  if (!detail) {
    notFound();
  }

  const [preview, setPreview] = useState<TranscriptPreviewState | null>(null);

  const allSubjects = scholarshipMonths.flatMap((month) => month.subjects);
  const totalCredits = allSubjects.reduce((sum, item) => sum + item.credit, 0);
  const overallScore = (allSubjects.reduce((sum, item) => sum + item.score, 0) / allSubjects.length).toFixed(2);
  const overallChartData = scholarshipMonths.map((month) => ({
    month: month.label,
    average: month.average,
  }));
  const finalGrade = "A";

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Transcript
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Review your scholarship transcript, monthly subject results, and official document in one clean transcript view.
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
              <Card className="h-fit self-start border-border/60 bg-card/90 py-0 shadow-sm">
                <CardHeader className="border-b border-border/60 px-5 py-4">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-semibold text-foreground">
                      Subject Results
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Monthly scholarship performance across the full 3-month term.
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="px-4 py-4 sm:px-5">
                  <Tabs defaultValue="overall" className="space-y-4">
                    <TabsList className="h-10 flex-wrap justify-start rounded-md p-1">
                      <TabsTrigger value="overall" className="px-3 py-1.5 text-sm">
                        Overall
                      </TabsTrigger>
                      {scholarshipMonths.map((month) => (
                        <TabsTrigger key={month.id} value={month.id} className="px-3 py-1.5 text-sm">
                          {month.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <TabsContent value="overall" className="mt-0 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="rounded-full px-2.5 py-1 text-[11px] font-medium">
                          Full 3-Month Comparison
                        </Badge>
                        <Badge variant="outline" className="rounded-full px-2.5 py-1 text-[11px] font-medium">
                          Overall Average {overallScore}
                        </Badge>
                      </div>

                      <ChartContainer config={chartConfig} className="h-[260px] w-full">
                        <BarChart data={overallChartData} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
                          <CartesianGrid vertical={false} strokeDasharray="3 3" />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            domain={[0, 100]}
                            ticks={[0, 20, 40, 60, 80, 100]}
                          />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" hideLabel />}
                          />
                          <Bar dataKey="average" fill="var(--color-score)" radius={[8, 8, 0, 0]} maxBarSize={64} />
                        </BarChart>
                      </ChartContainer>
                    </TabsContent>

                    {scholarshipMonths.map((month) => {
                      const chartData = month.subjects.map((item) => ({
                        subject: item.subject,
                        shortLabel: item.code,
                        score: item.score,
                      }));

                      return (
                        <TabsContent key={month.id} value={month.id} className="mt-0 space-y-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="rounded-full px-2.5 py-1 text-[11px] font-medium">
                              {month.duration}
                            </Badge>
                            <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[11px] font-medium">
                              Average {month.average.toFixed(2)}
                            </Badge>
                          </div>

                          <ChartContainer config={chartConfig} className="h-[260px] w-full">
                            <BarChart data={chartData} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
                              <CartesianGrid vertical={false} strokeDasharray="3 3" />
                              <XAxis dataKey="shortLabel" tickLine={false} axisLine={false} tickMargin={10} />
                              <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                domain={[0, 100]}
                                ticks={[0, 20, 40, 60, 80, 100]}
                              />
                              <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" hideLabel />}
                              />
                              <Bar dataKey="score" fill="var(--color-score)" radius={[8, 8, 0, 0]} maxBarSize={56} />
                            </BarChart>
                          </ChartContainer>

                          <Card className="overflow-hidden rounded-xl border-border/60 bg-card/90 py-0 shadow-sm">
                            <CardContent className="p-0">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-muted/10 hover:bg-muted/10">
                                    <TableHead className="w-16 pl-6 font-medium text-muted-foreground">No</TableHead>
                                    <TableHead className="font-medium text-muted-foreground">Subject</TableHead>
                                    <TableHead className="w-24 font-medium text-muted-foreground">Credit</TableHead>
                                    <TableHead className="w-24 font-medium text-muted-foreground">Score</TableHead>
                                    <TableHead className="w-28 font-medium text-muted-foreground">Grade</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {month.subjects.map((item, index) => (
                                    <TableRow key={item.code} className="border-border/50 transition-colors hover:bg-muted/20">
                                      <TableCell className="pl-6 text-sm text-foreground">{index + 1}</TableCell>
                                      <TableCell className="py-4 font-medium text-foreground">
                                        <div className="space-y-0.5">
                                          <p>{item.subject}</p>
                                          <p className="text-[11px] font-normal text-muted-foreground">{item.code}</p>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-sm text-muted-foreground">{item.credit}</TableCell>
                                      <TableCell className="text-sm text-muted-foreground">{item.score.toFixed(2)}</TableCell>
                                      <TableCell>
                                        <Badge
                                          variant="secondary"
                                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${gradeBadgeClass(item.grade)}`}
                                        >
                                          {item.grade}
                                        </Badge>
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

              <Card className="h-fit self-start overflow-hidden border-border/60 bg-card/90 py-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="border-b border-border/60 px-5 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Transcript Summary
                    </p>
                  </div>
                  <div className="divide-y divide-border/60">
                    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Program</p>
                      <p className="max-w-[140px] text-right text-sm font-semibold text-foreground">{detail.title}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Study Duration</p>
                      <p className="text-lg font-semibold tracking-tight text-foreground">3 Months</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Overall Score</p>
                      <p className="text-lg font-semibold tracking-tight text-foreground">{overallScore}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Total Subjects</p>
                      <p className="text-lg font-semibold tracking-tight text-foreground">{allSubjects.length}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Total Credits</p>
                      <p className="text-lg font-semibold tracking-tight text-foreground">{totalCredits}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Final Grade</p>
                      <p className="text-lg font-semibold tracking-tight text-foreground">{finalGrade}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-0">
            <Card className="overflow-hidden rounded-xl border border-border/70 bg-card py-0 shadow-none">
              <CardContent className="p-0 py-0">
                <Accordion type="multiple" defaultValue={["official"]} className="divide-y divide-border/70">
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
                          1 page
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
                        <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/10">
                          <div className="border-b border-border/60 px-4 py-2 text-xs font-medium text-muted-foreground">
                            {officialTranscript.title} Page 1
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setPreview({
                                title: officialTranscript.title,
                                pageLabel: `${officialTranscript.title} Page 1`,
                                imageSrc: officialTranscript.imageSrc,
                              })
                            }
                            className="block w-full bg-muted/20 transition hover:bg-muted/30"
                          >
                            <Image
                              src={officialTranscript.imageSrc}
                              alt={officialTranscript.title}
                              width={1200}
                              height={1700}
                              className="mx-auto h-auto w-full max-w-[420px] bg-white object-contain"
                            />
                          </button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={Boolean(preview)} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-auto p-4 sm:p-6">
          {preview ? (
            <div className="space-y-3">
              <div>
                <DialogTitle>{preview.title}</DialogTitle>
                <p className="text-sm text-muted-foreground">{preview.pageLabel}</p>
              </div>
              <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/10">
                <Image
                  src={preview.imageSrc}
                  alt={preview.title}
                  width={1600}
                  height={2200}
                  className="mx-auto h-auto w-full max-w-4xl bg-white object-contain"
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}





