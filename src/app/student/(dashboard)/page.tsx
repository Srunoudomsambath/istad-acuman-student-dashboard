"use client";

import {
  Award,
  BookOpen,
  FileBadge2,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";

import { CourseProgressCard } from "@/components/dashboard/CourseProgressCard";
import { NotificationList } from "@/components/dashboard/notification-list";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { studentCourses } from "@/lib/mock/courses";
import {
  studentAchievements,
  studentCertificates,
  studentProfile,
} from "@/lib/mock/student";
import { studentNotifications } from "@/lib/mock/notifications";
import { formatPhnomPenhDate, getPhnomPenhDate } from "@/lib/phnom-penh-date";
import { GradeCard } from "@/components/student/grade-summary";



export default function StudentDashboardPage() {
  const today = getPhnomPenhDate();
  const stats = [
    {
      title: "Total Courses",
      value: String(studentCourses.length),
      description: "Enrolled and active academic courses",
      icon: BookOpen,
    },
    {
      title: "Achievements",
      value: String(studentAchievements.length),
      description: "Scholar awards and recognitions",
      icon: Award,
    },
    {
      title: "Certificates",
      value: String(studentCertificates.length),
      description: "Completed program certificates",
      icon: FileBadge2,
    },
    {
      title: "GPA",
      value: "3.72",
      description: "Estimated academic average",
      icon: GraduationCap,
    },
  ];



  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
        <CardContent className="space-y-6 p-5">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {formatPhnomPenhDate(today, { weekday: "long" })}
                  </span>
                  <span className="mx-1.5">·</span>
                  {formatPhnomPenhDate(today, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full">Year {studentProfile.year}</Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Generation {studentProfile.generation}
                  </Badge>
                  <Badge variant="outline" className="rounded-full">
                    {studentProfile.major}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Welcome back
                </p>
                <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                  {studentProfile.englishName}
                  <span className="text-muted-foreground">
                    {" "}- {studentProfile.khmerName}
                  </span>
                </h2>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                  {studentProfile.bio}
                </p>
              </div>

              <blockquote className="rounded-xl border bg-muted/40 px-4 py-3 text-sm italic leading-relaxed">
                {studentProfile.quote}
              </blockquote>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative h-[240px] w-full max-w-sm">
                <Image
                  src="/teacher.png"
                  alt="Dashboard Illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <CourseProgressCard courses={studentCourses} perPage={2} />
        {/* <NotificationList notifications={studentNotifications} /> */}
        <GradeCard/>
      </div>
      
    </div>
  );
}