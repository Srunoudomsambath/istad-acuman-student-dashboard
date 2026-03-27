import { BookMarked, BriefcaseBusiness, Globe2 } from "lucide-react";

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
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ProfileCard student={studentProfile} />

        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle>Scholar Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <div className="rounded-2xl border bg-background/70 p-4">
              <p className="text-sm font-medium">Current status</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Current status in the scholarship program.
              </p>
              <Badge className="mt-3">{studentProfile.status}</Badge>
            </div>
            <div className="rounded-2xl border bg-background/70 p-4">
              <p className="text-sm font-medium">Visibility</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Visibility of scholar profile.
              </p>
              <Badge variant="secondary" className="mt-3">
                {studentProfile.isPublic ? "Public" : "Private"}
              </Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  English name
                </p>
                <p className="mt-1 font-medium">{studentProfile.englishName}</p>
              </div>
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Khmer name
                </p>
                <p className="mt-1 font-medium">{studentProfile.khmerName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardContent className="p-5">
            <BriefcaseBusiness className="size-5 text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Career path</p>
            <p className="mt-1 text-lg font-semibold">{studentCareers[0]?.position}</p>
            <p className="text-sm text-muted-foreground">
              {studentCareers[0]?.company} - {studentCareers[0]?.companyType}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardContent className="p-5">
            <Globe2 className="size-5 text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Abroad option</p>
            <p className="mt-1 text-lg font-semibold">
              {studentSpecialists[1]?.country}
            </p>
            <p className="text-sm text-muted-foreground">
              {studentSpecialists[1]?.specialist}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardContent className="p-5">
            <BookMarked className="size-5 text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Completed courses</p>
            <p className="mt-1 text-3xl font-semibold">
              {studentCompletedCourses.length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle>Scholar careers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-5">
            {studentCareers.map((career) => (
              <div
                key={career.uuid}
                className="rounded-2xl border bg-background/70 p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{career.company}</p>
                  <Badge variant="secondary">{career.companyType}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {career.position} - ${career.salary}
                </p>
                <p className="mt-2 text-sm">{career.interest}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle>Scholar abroad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-5">
            {studentSpecialists.map((specialist) => (
              <div
                key={specialist.uuid}
                className="rounded-2xl border bg-background/70 p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{specialist.universityName}</p>
                  <Badge>{specialist.country}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {specialist.degreeType} - {specialist.specialist}
                </p>
                <p className="mt-2 text-sm">{specialist.about}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle>Official Transcript</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-5">
          {transcriptYears.map((year) => (
            <div key={year.year} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{year.year}</h3>
                <Badge variant="secondary">{year.courses.length} courses</Badge>
              </div>
              <div className="rounded-2xl border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">No</TableHead>
                      <TableHead>Course Title</TableHead>
                      <TableHead className="w-24">Credit</TableHead>
                      <TableHead className="w-24 text-right">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {year.courses.map((course) => (
                      <TableRow key={`${year.year}-${course.no}`}>
                        <TableCell>{course.no}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.credit}</TableCell>
                        <TableCell className="text-right font-medium">
                          {course.grade}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
