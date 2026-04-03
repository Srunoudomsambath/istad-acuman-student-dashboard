import {
  CalendarDays,
  ClipboardList,
  FileText,
  GraduationCap,
  Megaphone,
} from "lucide-react";

import { BachelorSectionHeader } from "@/components/student/BachelorSectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type InfoGroup = {
  id: string;
  title: string;
  icon: typeof Megaphone;
  items: string[];
};

const infoGroups: InfoGroup[] = [
  {
    id: "announcements",
    title: "Announcements",
    icon: Megaphone,
    items: [
      "Announcements Forum",
      "Channel Announcement: https://t.me/+_1rRyHD9kA04OTFl",
    ],
  },
  {
    id: "rules",
    title: "Exam Rules & Internal Documents",
    icon: FileText,
    items: [
      "Internal regulations for exam entry",
      "Information for blacklist.png",
      "Internal regulations 2024-2025 file",
    ],
  },
  {
    id: "student-lists",
    title: "Student Lists",
    icon: ClipboardList,
    items: [
      "List of students taking replacement exams Y2S2",
      "1Info.jpg",
      "SV45.jpg",
      "Final term student list Y2S2",
      "Midterm student list Y2S2",
      "List of students taking replacement exams Y2S1",
      "Final term student list Y2S1",
      "Midterm student list Y2S1",
    ],
  },
  {
    id: "results",
    title: "Exam Results",
    icon: GraduationCap,
    items: [
      "Final exam results Y2S2",
      "Midterm exam results Y2S2",
      "Replacement exam results Y2S2",
      "Final exam results Y2S1",
      "Midterm exam results Y2S1",
    ],
  },
  {
    id: "schedules",
    title: "Schedules",
    icon: CalendarDays,
    items: [
      "Schedule Year 3 Semester 1",
      "Final term exam schedule Year 2 Semester 2",
      "Replacement schedule Year 2 Semester 2 effective February 02, 2026",
      "Midterm exam schedule Year 2 Semester 2",
      "Schedule Year 2 Semester 2 (Update)",
      "Schedule Year 2 Semester 2",
      "Final term exam schedule Year 2 Semester 1",
      "Replacement schedule Year 2 Semester 1 effective July 14, 2025",
      "Midterm exam schedule Year 2 Semester 1",
      "Schedule Year 2 Semester 1 (Update)",
    ],
  },
];

export default function BachelorInformationPage() {
  return (
    <div className="space-y-6">
      <BachelorSectionHeader
        title="Information"
        description="Centralize announcements, rules, schedules, results, and supporting files for bachelor students such as the SV45 group."
      />

      <Card className="overflow-hidden border-border/60 bg-card/90 shadow-sm">
        <CardContent className="p-0">
          <Accordion type="multiple" className="divide-y divide-border/60">
            {infoGroups.map((group) => {
              const Icon = group.icon;

              return (
                <AccordionItem
                  key={group.id}
                  value={group.id}
                  className="border-b-0 px-6"
                >
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-muted/30 text-muted-foreground">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{group.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {group.items.length} item{group.items.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="space-y-2">
                      {group.items.map((item, index) => (
                        <div
                          key={`${group.id}-${index}`}
                          className="flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-background/70 px-4 py-3"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">{item}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className="shrink-0 rounded-full text-[11px]"
                          >
                            File
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
