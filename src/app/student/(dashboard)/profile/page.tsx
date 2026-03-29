import {
  BookMarked,
  BriefcaseBusiness,
  Building2,
  DollarSign,
  Globe2,
  GraduationCap,
  Heart,
  MapPin,
  Phone,
  Quote,
  ScrollText,
  University,
  User,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProfileCard } from "@/components/dashboard/profile-card";
import {
  studentCareers,
  studentCompletedCourses,
  studentProfile,
  studentSpecialists,
} from "@/lib/mock/student";
import { transcriptYears } from "@/lib/mock/transcript";

export default function ProfilePage() {
  return (
    <div className="space-y-6">

      {/* ── Row 1: Profile Card + Scholar Profile ── */}
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ProfileCard student={studentProfile} />

        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-6 py-3">
            <User className="size-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Scholar Profile
            </span>
          </div>

          <div className="flex flex-col justify-between divide-y divide-border">
            {/* Status */}
            <div className="flex items-start gap-3.5 p-5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                <ScrollText className="size-4 text-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Scholar Status</p>
                <p className="mt-0.5 text-sm font-semibold capitalize text-foreground">{studentProfile.status}</p>
                <p className="text-xs text-muted-foreground">Current standing in the scholarship program</p>
              </div>
            </div>

            {/* Visibility */}
            <div className="flex items-start gap-3.5 p-5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                <Globe2 className="size-4 text-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Profile Visibility</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">
                  {studentProfile.isPublic ? "Public" : "Private"}
                </p>
                <p className="text-xs text-muted-foreground">Who can view this scholar profile</p>
              </div>
            </div>

            {/* Names */}
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">English Name</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{studentProfile.englishName}</p>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Khmer Name</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{studentProfile.khmerName}</p>
              </div>
            </div>

            {/* Footer flags */}
            <div className="flex flex-wrap items-center gap-2 bg-muted/30 px-5 py-3">
              {studentProfile.isAbroad && (
                <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-[10px]">Abroad</Badge>
              )}
              {studentProfile.isEmployed && (
                <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-[10px]">Employed</Badge>
              )}
              {!studentProfile.isAbroad && !studentProfile.isEmployed && (
                <span className="text-xs text-muted-foreground">No active flags</span>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ── Row 2: Quick stats ── */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: <BriefcaseBusiness className="size-4 text-foreground" />,
            label: "Career Path",
            value: studentCareers[0]?.position ?? "—",
            sub: studentCareers[0] ? `${studentCareers[0].company} · ${studentCareers[0].companyType}` : "No career listed",
          },
          {
            icon: <Globe2 className="size-4 text-foreground" />,
            label: "Abroad Option",
            value: studentSpecialists[1]?.country ?? "—",
            sub: studentSpecialists[1]?.specialist ?? "No specialization listed",
          },
          {
            icon: <BookMarked className="size-4 text-foreground" />,
            label: "Completed Courses",
            value: studentCompletedCourses.length,
            sub: "courses finished",
          },
        ].map(({ icon, label, value, sub }) => (
          <div
            key={label}
            className="flex items-center gap-3.5 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
              {icon}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
              <p className="mt-0.5 truncate text-base font-bold text-foreground">{value}</p>
              <p className="truncate text-xs text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Row 3: Careers + Abroad ── */}
      <div className="grid gap-6 xl:grid-cols-2">

        {/* Scholar Careers */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-6 py-3">
            <BriefcaseBusiness className="size-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Scholar Careers
            </span>
            <Badge variant="secondary" className="ml-auto rounded-full px-2 py-0 text-[10px]">
              {studentCareers.length}
            </Badge>
          </div>
          <div className="divide-y divide-border">
            {studentCareers.map((career) => (
              <div key={career.uuid} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{career.company}</p>
                    <p className="text-xs text-muted-foreground">{career.position}</p>
                  </div>
                  <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-[10px] capitalize">
                    {career.companyType}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <DollarSign className="size-3.5" />
                    <span>${career.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Heart className="size-3.5" />
                    <span>{career.interest}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scholar Abroad */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-6 py-3">
            <Globe2 className="size-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Scholar Abroad
            </span>
            <Badge variant="secondary" className="ml-auto rounded-full px-2 py-0 text-[10px]">
              {studentSpecialists.length}
            </Badge>
          </div>
          <div className="divide-y divide-border">
            {studentSpecialists.map((specialist) => (
              <div key={specialist.uuid} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{specialist.universityName}</p>
                    <p className="text-xs text-muted-foreground">{specialist.specialist}</p>
                  </div>
                  <Badge className="rounded-full px-2.5 py-0.5 text-[10px]">
                    {specialist.country}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <GraduationCap className="size-3.5" />
                    <span>{specialist.degreeType}</span>
                  </div>
                </div>
                {specialist.about && (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{specialist.about}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Row 4: Official Transcript ── */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-6 py-3">
          <ScrollText className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Official Transcript
          </span>
        </div>

        <div className="space-y-0 divide-y divide-border">
          {transcriptYears.map((year) => (
            <div key={year.year}>
              {/* Year header */}
              <div className="flex items-center justify-between bg-muted/20 px-6 py-3">
                <h3 className="text-sm font-semibold text-foreground">{year.year}</h3>
                <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-[10px]">
                  {year.courses.length} courses
                </Badge>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-14 pl-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">No</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Course Title</TableHead>
                    <TableHead className="w-24 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Credit</TableHead>
                    <TableHead className="w-24 pr-6 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {year.courses.map((course) => (
                    <TableRow
                      key={`${year.year}-${course.no}`}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/30"
                    >
                      <TableCell className="pl-6 text-xs text-muted-foreground">
                        {String(course.no).padStart(2, "0")}
                      </TableCell>
                      <TableCell className="text-sm text-foreground">{course.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{course.credit}</TableCell>
                      <TableCell className="pr-6 text-right text-sm font-semibold text-foreground">
                        {course.grade}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}