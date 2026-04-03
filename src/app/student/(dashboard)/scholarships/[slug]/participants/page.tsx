import { BachelorSectionHeader } from "@/components/student/BachelorSectionHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getExstadLearningDetailBySlug } from "@/lib/mock/exstad-courses";

function getInitials(name: string) {
  const englishParts = name
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2);

  return englishParts.map((part) => part[0]?.toUpperCase()).join("") || "ST";
}

export default function ScholarshipParticipantsPage({ params }: { params: { slug: string } }) {
  const detail = getExstadLearningDetailBySlug(params.slug);
  const participants = (detail?.roster ?? []).map((participant, index) => ({
    id: `${participant}-${index}`,
    fullName: participant,
    role: "Student",
  }));

  return (
    <div className="space-y-6">
      <BachelorSectionHeader
        title="Scholarship Participants"
        description="See the current roster of learners in this scholarship cohort."
      />

      <Card className="overflow-hidden border-border/60 bg-card/90 p-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                <TableHead className="w-20 pl-6 font-medium text-muted-foreground">Profile</TableHead>
                <TableHead className="font-medium text-muted-foreground">Name</TableHead>
                <TableHead className="pr-6 font-medium text-muted-foreground">Roles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant) => (
                <TableRow
                  key={participant.id}
                  className="group border-border/50 transition-colors hover:bg-muted/35"
                >
                  <TableCell className="pl-6">
                    <Avatar className="size-9 border border-border/60">
                      <AvatarFallback className="text-xs font-semibold text-foreground">
                        {getInitials(participant.fullName)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{participant.fullName}</TableCell>
                  <TableCell className="pr-6 text-sm text-muted-foreground">{participant.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}