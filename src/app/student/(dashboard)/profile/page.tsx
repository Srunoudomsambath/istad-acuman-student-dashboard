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

export default function ProfilePage() {
  return (
    <div className="space-y-6 h-full overflow-hidden">
      <div className="grid gap-6 h-full xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
        <div className="xl:sticky xl:top-0 xl:h-fit">
          <ProfileCard student={studentProfile} />
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm h-full overflow-y-auto">
          <div className="border-b border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Scholar Overview</p>
            <p className="text-xs text-muted-foreground">Profile, career and abroad details</p>
          </div>

          <div className="divide-y divide-border/60">
            {[
              { icon: <ShieldCheck className="size-3.5" />, label: "Status", value: studentProfile.status },
              { icon: <Globe2 className="size-3.5" />, label: "Visibility", value: studentProfile.isPublic ? "Public" : "Private" },
              { icon: <User className="size-3.5" />, label: "English Name", value: studentProfile.englishName },
              { icon: <User className="size-3.5" />, label: "Khmer Name", value: studentProfile.khmerName },
              { icon: <Globe2 className="size-3.5" />, label: "Studying Abroad", value: studentProfile.isAbroad ? "Yes" : "No" },
              { icon: <Briefcase className="size-3.5" />, label: "Employment", value: studentProfile.isEmployed ? "Employed" : "Unemployed" },
            ].map(({ icon, label, value }) => (
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
                About Profile
              </p>
              <User className="size-4 text-muted-foreground" />
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
              <p className="text-sm leading-6 text-foreground">{studentProfile.bio}</p>
            </div>
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
                      {item.specialist} · {item.degreeType}
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
  );
}
