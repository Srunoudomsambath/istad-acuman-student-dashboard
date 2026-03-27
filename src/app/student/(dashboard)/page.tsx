import {
  Award,
  BookOpen,
  FileBadge2,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import { CourseCard } from "@/components/dashboard/course-card";
import { NotificationList } from "@/components/dashboard/notification-list";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { studentCourses } from "@/lib/mock/courses";
import {
  studentAchievements,
  studentBadges,
  studentCertificates,
  studentProfile,
} from "@/lib/mock/student";
import { studentNotifications } from "@/lib/mock/notifications";
import Image from "next/image";

export default function StudentDashboardPage() {
  
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
    <div className="space-y-6">

<Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
  <CardContent className="p-6 space-y-8">

    {/* HERO SECTION */}
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

      {/* LEFT CONTENT */}
      <div className="space-y-6">

        {/* DATE + BADGES */}
        <div className="space-y-3">
         <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {new Date().toLocaleDateString("en-GB", { weekday: "long" })}
            </span>
            <span className="mx-1.5">·</span>
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>

          <div className="flex flex-wrap items-center gap-2">
 <Badge className="rounded-full">Year {studentProfile.year}</Badge>
<Badge variant="secondary" className="rounded-full">Generation {studentProfile.generation}</Badge>
<Badge variant="outline" className="rounded-full">{studentProfile.major}</Badge>
          </div>
        </div>

        {/* WELCOME TEXT */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Welcome back
          </p>

          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl leading-tight">
            {studentProfile.englishName}
            <span className="text-muted-foreground">
              {" "}— {studentProfile.khmerName}
            </span>
          </h2>

          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {studentProfile.bio}
          </p>
        </div>

        {/* QUOTE */}
        <blockquote className="rounded-xl border bg-muted/40 px-4 py-3 text-sm italic leading-relaxed">
          “{studentProfile.quote}”
        </blockquote>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center lg:justify-end">
        <div className="relative w-full max-w-sm h-[260px]">
          <Image
            src="/teacher.png"
            alt="Dashboard Illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>

    {/* STATS SECTION */}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>

  </CardContent>
</Card>

    
{/* 
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ProfileCard student={studentProfile} />
        <NotificationList notifications={studentNotifications} />
      </div> */}

    <Card className="border-border/60 bg-card/80 shadow-sm">
  <CardContent className="p-6 space-y-4">
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        Enrolled courses
      </p>
      <h3 className="text-2xl font-semibold tracking-tight">
        Course progress overview
      </h3>
    </div>
    <div className="grid gap-4 lg:grid-cols-3">
      {studentCourses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  </CardContent>
</Card>
    </div>
  );
}
