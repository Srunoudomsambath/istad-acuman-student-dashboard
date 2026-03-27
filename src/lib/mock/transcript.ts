import type { TranscriptYear } from "@/lib/types/transcript";

export const transcriptYears: TranscriptYear[] = [
  {
    year: "Year 1",
    courses: [
      { no: 1, title: "Web Development", credit: 3, grade: "A" },
      { no: 2, title: "Database", credit: 3, grade: "B+" },
    ],
  },
  {
    year: "Year 2",
    courses: [
      { no: 1, title: "React", credit: 4, grade: "A" },
      { no: 2, title: "Spring Boot", credit: 3, grade: "B" },
    ],
  },
];
