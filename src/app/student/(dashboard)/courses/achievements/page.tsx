import Link from "next/link";
import { ExternalLink, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { studentProjectAchievements } from "@/lib/mock/student-project-achievements";

function toneForProgram(program: string) {
  const value = program.toLowerCase();

  if (value.includes("data")) return "from-sky-500/15 to-cyan-500/5";
  if (value.includes("devops")) return "from-emerald-500/15 to-teal-500/5";
  if (value.includes("full stack")) return "from-violet-500/15 to-fuchsia-500/5";
  return "from-amber-500/15 to-orange-500/5";
}

export default function BachelorAchievementsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Achievements
        </h1>
        <p className="max-w-2xl text-sm leading-5 text-muted-foreground">
          Browse standout projects and capstones completed during your studies.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {studentProjectAchievements.map((achievement) => (
          <Card
            key={achievement.uuid}
            className="overflow-hidden border-border/60 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <CardContent className="space-y-4 p-6">
              <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${toneForProgram(achievement.program)}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_35%)]" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-semibold">
                    {achievement.program}
                  </Badge>
                  <Badge variant="outline" className="rounded-full bg-background/70 px-3 py-1 text-[11px] font-semibold">
                    {achievement.achievementType}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
                  <div className="mt-3 flex size-16 items-center justify-center rounded-2xl border border-white/40 bg-white/30 text-xl font-bold text-foreground shadow-sm backdrop-blur-sm">
                    {achievement.icon}
                  </div>
                  <p className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                    {achievement.title}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{achievement.program}</p>
                  </div>
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {achievement.tag}
                  </Badge>
                </div>

                <p className="text-sm leading-5 text-muted-foreground">
                  {achievement.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {achievement.highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/60 bg-background/70 px-2.5 py-0.5 text-[11px] font-medium text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <Button asChild size="sm" className="gap-2">
                    <Link href={achievement.link}>
                      <ExternalLink className="size-4" />
                      View project
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <Link href={achievement.video}>
                      <PlayCircle className="size-4" />
                      Watch video
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
