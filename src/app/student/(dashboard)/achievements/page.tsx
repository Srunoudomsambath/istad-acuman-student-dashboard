import { Award, BadgeCheck, Medal, ScrollText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  studentAchievements,
  studentBadges,
  studentCertificates,
  studentCompletedCourses,
} from "@/lib/mock/student";

export default function AchievementsPage() {
  const overview = [
    {
      title: "Completed courses",
      value: studentCompletedCourses.length,
      icon: ScrollText,
    },
    {
      title: "Certificates",
      value: studentCertificates.length,
      icon: BadgeCheck,
    },
    {
      title: "Achievements",
      value: studentAchievements.length,
      icon: Award,
    },
    {
      title: "Badges",
      value: studentBadges.length,
      icon: Medal,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Scholar award
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Performance, certificates, and recognition
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              This section groups achievements, certificates, and scholar badges
              so the student can review academic milestones at a glance.
            </p>
          </div>
          <div className="rounded-2xl border bg-background/60 p-5">
            <p className="text-sm font-medium">Top achievement</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Award className="size-5" />
              </div>
              <div>
                <p className="font-semibold">Top Performer</p>
                <p className="text-sm text-muted-foreground">
                  December 1, 2023
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overview.map((item) => (
          <Card key={item.title} className="border-border/60 bg-card/80 shadow-sm">
            <CardContent className="flex items-start justify-between gap-4 p-5">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="text-3xl font-semibold">{item.value}</p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-5">
            {studentAchievements.map((achievement) => (
              <div
                key={achievement.uuid}
                className="rounded-2xl border bg-background/70 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{achievement.title}</p>
                      <Badge>{achievement.code}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {achievement.date}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/60 bg-card/80 shadow-sm">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5">
              {studentBadges.map((badge) => (
                <div
                  key={badge.uuid}
                  className="rounded-2xl border bg-background/70 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{badge.title}</p>
                        <Badge variant="secondary">{badge.code}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {badge.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {badge.date}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/80 shadow-sm">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle>Certificates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5">
              {studentCertificates.map((certificate) => (
                <div
                  key={certificate.uuid}
                  className="rounded-2xl border bg-background/70 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{certificate.title}</p>
                        <Badge variant="outline">{certificate.code}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {certificate.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {certificate.issuedAt}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
