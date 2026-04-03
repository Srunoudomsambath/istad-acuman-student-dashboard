import type { LearningDetail } from "@/lib/types/learning";

export const exstadLearningDetails: LearningDetail[] = [
  {
    source: "exstad",
    type: "scholarship",
    slug: "full-stack-scholarship",
    title: "Full Stack Scholarship",
    code: "FSS",
    description:
      "A scholarship-based full stack track focused on practical web application development.",
    yearLabel: "Scholarship Cohort 2025",
    creditLabel: "1 focused track",
    theoryLabel: "0",
    practiceLabel: "Hands-on",
    internshipLabel: "N/A",
    instructor: "Mr. Sokha",
    instructorRole: "Scholarship Mentor",
    studentsJoined: 28,
    classStart: "2/03/2025",
    progress: 73,
    level: "Scholarship",
    track: "Full Stack",
    roster: ["\u1785\u17C5 \u1794\u17BC\u179A\u17C9\u17B6 Chao Bora", "\u179F\u17BB\u1781 \u178A\u17B6\u179A\u17C9\u17B6 Sok Dara", "\u1785\u17B6\u1793\u17CB \u179A\u17C9\u17B6\u179C\u17B8 Chan Ravy", "\u179B\u17B9\u1798 \u179F\u17B8\u17A0\u17B6 Lim Seyha"],
    status: "active",
    curriculum: [
      {
        uuid: "fss-slide",
        type: "Slide",
        title: "Full stack foundations",
        description: "Overview of frontend, backend, and deployment workflow.",
      },
      {
        uuid: "fss-video",
        type: "Video",
        title: "Recorded workshop",
        description: "Mentor-led session on building an end-to-end student project.",
      },
      {
        uuid: "fss-mini",
        type: "Mini Project",
        title: "Student dashboard build",
        description: "Create a working dashboard with authentication and course tracking.",
      },
      {
        uuid: "fss-lecture",
        type: "Lecture",
        title: "Live mentoring class",
        description: "Weekly scholarship class for code review and implementation support.",
      },
      {
        uuid: "fss-file-microservices-curriculum",
        type: "File",
        title: "ITP - Spring Microservices Curriculum - V1.pdf",
        description: "Reference curriculum document for review before we finalize the in-page curriculum structure.",
        href: "/ITP%20-%20Spring%20Microservices%20Curriculum%20-%20V1.pdf",
      },
    ],
  },
];

export function getExstadLearningDetailBySlug(slug: string) {
  return exstadLearningDetails.find((detail) => detail.slug === slug) ?? null;
}
