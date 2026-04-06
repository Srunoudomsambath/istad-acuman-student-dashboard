import Link from "next/link";
import { ExternalLink, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studentProjectAchievements } from "@/lib/mock/student-project-achievements";

function toneForProgram(program: string) {
  const value = program.toLowerCase();

  if (value.includes("data")) {
    return "from-sky-500/15 to-cyan-500/5 text-sky-700 dark:text-sky-400";
  }
  if (value.includes("devops")) {
    return "from-emerald-500/15 to-teal-500/5 text-emerald-700 dark:text-emerald-400";
  }
  if (value.includes("full stack")) {
    return "from-violet-500/15 to-fuchsia-500/5 text-violet-700 dark:text-violet-400";
  }
  return "from-amber-500/15 to-orange-500/5 text-amber-700 dark:text-amber-400";
}

function statusBadgeClass(status: string) {
  if (status === "Approved") {
    return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800";
  }
  if (status === "Rejected") {
    return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800";
  }
  return "bg-muted text-muted-foreground border-border";
}

function ProjectCard({
  project,
}: {
  project: (typeof studentProjectAchievements)[number];
}) {
  const isLink = Boolean(project.link && project.link !== "#");
  const isVideo = Boolean(project.video && project.video !== "#");

  return (
    <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="space-y-4 p-6">
        <div
          className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${toneForProgram(project.program)}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_35%)]" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 text-[11px] font-semibold"
            >
              {project.program}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full bg-background/70 px-3 py-1 text-[11px] font-semibold"
            >
              {project.achievementType}
            </Badge>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
            <span className="text-[11px] uppercase tracking-[0.35em] text-foreground/60">
              Project Image
            </span>
            <div className="mt-3 flex size-16 items-center justify-center rounded-2xl border border-white/40 bg-white/30 text-xl font-bold text-foreground shadow-sm backdrop-blur-sm">
              {project.icon}
            </div>
            <p className="mt-3 text-xl font-semibold tracking-tight text-foreground">
              {project.title}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground">{project.program}</p>
            </div>
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              {project.tag}
            </Badge>
          </div>

          <p className="text-sm leading-5 text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border/60 bg-background/70 px-2.5 py-0.5 text-[11px] font-medium text-foreground"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {isLink ? (
              <Button asChild size="sm" className="gap-2">
                <Link href={project.link}>
                  <ExternalLink className="size-4" />
                  View project
                </Link>
              </Button>
            ) : null}
            {isVideo ? (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href={project.video}>
                  <PlayCircle className="size-4" />
                  Watch video
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AchievementsPage() {
  const projects = studentProjectAchievements;
  const requestRows = [
    {
      uuid: "request-1",
      name: "K-QuickSight",
      logo: "KQ",
      program: "Data Analytics",
      type: "Project",
      status: "Pending",
    },
    {
      uuid: "request-2",
      name: "AutomateX",
      logo: "AX",
      program: "DevOps",
      type: "Project",
      status: "Approved",
    },
    {
      uuid: "request-3",
      name: "CampusFlow",
      logo: "CF",
      program: "Full Stack",
      type: "Project",
      status: "Rejected",
    },
    {
      uuid: "request-4",
      name: "IT Professional Demo",
      logo: "IT",
      program: "IT Professional",
      type: "Capstone",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge
              variant="secondary"
              className="rounded-full text-[11px] font-semibold"
            >
              My Achievements
            </Badge>
            <span>Track student project completions, skills earned, and milestones</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Achievements
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              View all the projects and milestones you have completed during your
              studies. This overview shows your progress across courses, tracks, and
              personal projects.
            </p>
          </div>
        </div>

        <Button asChild className="self-start">
          <Link href="/student/achievements/request">Request Achievement</Link>
        </Button>
      </div>

      <Tabs defaultValue="achievement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="achievement">Achievement</TabsTrigger>
          <TabsTrigger value="request-achievement">Request Achievement</TabsTrigger>
        </TabsList>

        <TabsContent value="achievement">
          <div id="project-grid" className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.uuid} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="request-achievement">
          <Card className="overflow-hidden border-border/60 bg-card/90 shadow-sm p-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableHead className="pl-6 font-medium text-muted-foreground">Logo</TableHead>
                    <TableHead className="font-medium text-muted-foreground">Name</TableHead>
                    <TableHead className="font-medium text-muted-foreground">Program</TableHead>
                    <TableHead className="font-medium text-muted-foreground">
                      Program Type
                    </TableHead>
                    <TableHead className="pr-6 font-medium text-muted-foreground">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {requestRows.map((row) => (
                    <TableRow
                      key={row.uuid}
                      className="group border-border/50 transition-colors hover:bg-muted/35"
                    >
                      <TableCell className="pl-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-muted/30 text-sm font-semibold text-foreground">
                          {row.logo}
                        </div>
                      </TableCell>

                      <TableCell className="font-medium text-foreground">
                        {row.name}
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        {row.program}
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        {row.type}
                      </TableCell>

                      <TableCell className="pr-6">
                        <Badge
                          variant="outline"
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusBadgeClass(row.status)}`}
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
















