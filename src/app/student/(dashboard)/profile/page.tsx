import {
  Briefcase,
  BriefcaseBusiness,
  DollarSign,
  Globe2,
  GraduationCap,
  Heart,
  ScrollText,
  ShieldCheck,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

      {/* ── Row 1: Profile Card + Scholar Overview ── */}
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ProfileCard student={studentProfile} />

        {/* Scholar Overview — profile info + careers + abroad all in one card */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Scholar Overview</p>
            <p className="text-xs text-muted-foreground">Profile, career and abroad details</p>
          </div>

          {/* Profile rows */}
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
                <span className="flex items-center gap-2 text-xs text-muted-foreground">{icon}{label}</span>
                <span className="text-xs font-semibold capitalize text-foreground">{value}</span>
              </div>
            ))}
          </div>

       {/* ───────── Career Journey ───────── */}
<div className="border-t border-border pt-4 space-y-3">

  <div className="flex items-center justify-between px-5">
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      Career Journey
    </p>
    <BriefcaseBusiness className="size-4 text-muted-foreground" />
  </div>

  <div className="space-y-2 px-3 pb-2">
    {studentCareers.map((career) => (
      <div
        key={career.uuid}
        className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-4 py-3 hover:bg-muted/30 transition"
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">
            {career.position}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {career.company}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <Badge variant="outline" className="text-[10px] capitalize">
            {career.companyType}
          </Badge>
          <span className="flex items-center gap-1 text-xs font-medium text-foreground">
            <DollarSign className="size-3 text-muted-foreground" />
            {career.salary}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

{/* ───────── Study Abroad ───────── */}
<div className="border-t border-border pt-4 space-y-3">

  <div className="flex items-center justify-between px-5">
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      Study Abroad
    </p>
    <GraduationCap className="size-4 text-muted-foreground" />
  </div>

  <div className="space-y-2 px-3 pb-2">
    {studentSpecialists.map((item) => (
      <div
        key={item.uuid}
        className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-4 py-3 hover:bg-muted/30 transition"
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">
            {item.universityName}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {item.specialist} · {item.degreeType}
          </p>
        </div>

        <Badge className="text-[10px] shrink-0">
          {item.country}
        </Badge>
      </div>
    ))}
  </div>
</div>

          
        </div>
      </div>

 

    </div>
  );
}