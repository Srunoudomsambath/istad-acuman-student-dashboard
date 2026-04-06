"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  BriefcaseBusiness,
  CalendarRange,
  DollarSign,
  Globe2,
  GraduationCap,
  ShieldCheck,
  User,
} from "lucide-react";

import { ProfileCard } from "@/components/dashboard/profile-card";
import { Badge } from "@/components/ui/badge";
import { studentCareers, studentProfile, studentSpecialists } from "@/lib/mock/student";
import {
  getStoredStudentProfile,
  STUDENT_PROFILE_UPDATED_EVENT,
} from "@/lib/student-profile-storage";

function scholarStatusBadgeClass(status: string) {
  switch (status) {
    case "ACTIVE":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400";
    case "GRADUATED":
      return "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-400";
    case "SUSPENDED":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400";
    case "DROPPED":
      return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-400";
    default:
      return "border-border bg-muted text-muted-foreground";
  }
}

function visibilityBadgeClass(isPublic: boolean) {
  return isPublic
    ? "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-400"
    : "border-border bg-muted text-muted-foreground";
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(studentProfile);

  useEffect(() => {
    const syncProfile = () => setProfile(getStoredStudentProfile());

    syncProfile();
    window.addEventListener("storage", syncProfile);
    window.addEventListener(STUDENT_PROFILE_UPDATED_EVENT, syncProfile);

    return () => {
      window.removeEventListener("storage", syncProfile);
      window.removeEventListener(STUDENT_PROFILE_UPDATED_EVENT, syncProfile);
    };
  }, []);

  const overviewItems = [
    {
      icon: <ShieldCheck className="size-3.5" />,
      label: "Status",
      value: (
        <Badge
          variant="outline"
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${scholarStatusBadgeClass(profile.status)}`}
        >
          {profile.status}
        </Badge>
      ),
    },
    {
      icon: <Globe2 className="size-3.5" />,
      label: "Visibility",
      value: (
        <Badge
          variant="outline"
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${visibilityBadgeClass(profile.isPublic)}`}
        >
          {profile.isPublic ? "Public" : "Private"}
        </Badge>
      ),
    },
    { icon: <User className="size-3.5" />, label: "English Name", value: profile.englishName },
    { icon: <User className="size-3.5" />, label: "Khmer Name", value: profile.khmerName },
    { icon: <CalendarRange className="size-3.5" />, label: "Date of Birth", value: profile.dob },
    { icon: <Globe2 className="size-3.5" />, label: "Place of Birth", value: profile.placeOfBirth },
    {
      icon: <Globe2 className="size-3.5" />,
      label: "Studying Abroad",
      value: profile.isAbroad ? "Yes" : "No",
    },
    {
      icon: <Briefcase className="size-3.5" />,
      label: "Employment",
      value: profile.isEmployed ? "Employed" : "Unemployed",
    },
  ];

  return (
    <div className="h-full space-y-6 overflow-hidden">
      <div className="grid h-full gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
        <div className="xl:sticky xl:top-0 xl:h-fit">
          <ProfileCard student={profile} />
        </div>

        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="sticky top-0 z-10 border-b border-border bg-card px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Scholar Overview</p>
            <p className="text-xs text-muted-foreground">Profile, career and abroad details</p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="divide-y divide-border/60">
              {overviewItems.map(({ icon, label, value }) => (
                <div key={label} className="flex items-center justify-between px-5 py-3">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    {icon}
                    {label}
                  </span>
                  <span className="text-xs font-semibold capitalize text-foreground">{value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-border px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Career Journey
                </p>
                <BriefcaseBusiness className="size-4 text-muted-foreground" />
              </div>

              <div className="space-y-3">
                {studentCareers.map((career) => (
                  <div
                    key={career.uuid}
                    className="rounded-xl border border-border/60 bg-muted/20 px-4 py-4 transition hover:bg-muted/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 space-y-1">
                        <p className="text-sm font-semibold text-foreground">{career.position}</p>
                        <p className="text-sm text-muted-foreground">{career.company}</p>
                      </div>

                      <Badge variant="outline" className="shrink-0 text-[10px]">
                        {career.companyType}
                      </Badge>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <CalendarRange className="size-3.5" />
                        {career.startDate} - {career.endDate}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium text-foreground">
                        <DollarSign className="size-3.5 text-muted-foreground" />
                        {career.salary}/month
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-border px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Study Abroad
                </p>
                <GraduationCap className="size-4 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                {studentSpecialists.map((item) => (
                  <div
                    key={item.uuid}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-4 py-3 transition hover:bg-muted/30"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-foreground">
                        {item.universityName}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.specialist} - {item.degreeType}
                      </p>
                    </div>

                    <Badge className="shrink-0 text-[10px]">{item.country}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
