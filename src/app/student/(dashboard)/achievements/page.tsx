import Link from "next/link";
import {
  Award,
  Code2,
  ExternalLink,
  GraduationCap,
  Layers3,
  PlayCircle,
  ScrollText,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

function ProjectCard({
  project,
}: {
  project: (typeof studentProjectAchievements)[number];
}) {
  const isLink = Boolean(project.link && project.link !== "#");
  const isVideo = Boolean(project.video && project.video !== "#");

  return (
    <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="space-y-5 p-5">
        <div
          className={`relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br ${toneForProgram(project.program)} aspect-[16/10]`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_35%)]" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
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
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span className="text-[11px] uppercase tracking-[0.35em] text-foreground/60">
              Project Image
            </span>
            <div className="mt-4 flex size-20 items-center justify-center rounded-3xl border border-white/40 bg-white/30 text-2xl font-bold text-foreground shadow-sm backdrop-blur-sm">
              {project.icon}
            </div>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              {project.title}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground">{project.program}</p>
            </div>
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              {project.tag}
            </Badge>
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[11px] font-medium text-foreground"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
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

function SummaryCard({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  hint: string;
}) {
  return (
    <Card className="border-border/60 bg-card/80 shadow-sm">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function AchievementsPage() {
  const projects = studentProjectAchievements;
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];
  const totalPrograms = new Set(projects.map((project) => project.program)).size;
  const foundationCount = projects.filter((project) =>
    project.tag.toLowerCase().includes("foundation")
  ).length;
  const advancedCount = projects.filter((project) =>
    project.tag.toLowerCase().includes("advanced")
  ).length;
  const professionalCount = projects.filter((project) =>
    project.tag.toLowerCase().includes("professional")
  ).length;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
        <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <Sparkles className="size-3.5" />
              Project Achievement
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Student project showcase
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              This page highlights the projects a student completed during
              foundation, full stack, data analytics, and IT professional tracks.
              The layout matches the backend achievement fields, so we can switch
              to live API data later without changing the screen design.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full px-3 py-1">Pre-university</Badge>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                {projects.length} projects
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                {totalPrograms} programs
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button asChild size="sm" className="gap-2">
                <Link href="#project-grid">
                  <ScrollText className="size-4" />
                  View projects
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href={`#${featuredProject.uuid}`}>
                  <Award className="size-4" />
                  Featured work
                </Link>
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>

      <div id="project-grid" className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.uuid} project={project} />
        ))}
      </div>
    </div>
  );
}
