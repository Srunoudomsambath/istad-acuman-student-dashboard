export type StudentScheduleScope = "course" | "general" | "personal";
export type StudentScheduleCategory =
  | "assignment"
  | "quiz"
  | "midterm"
  | "final"
  | "ceremony"
  | "sports"
  | "meeting";
export type StudentScheduleStatus = "Today" | "Soon" | "Upcoming" | "Done";

export type StudentScheduleItem = {
  id: string;
  title: string;
  courseTitle?: string;
  courseSlug?: string;
  date: string;
  time: string;
  scope: StudentScheduleScope;
  category: StudentScheduleCategory;
  status: StudentScheduleStatus;
  description?: string;
  location?: string;
};

export const studentScheduleItems: StudentScheduleItem[] = [
  {
    id: "wd-assignment-3",
    title: "Assignment 3 - REST API",
    courseTitle: "Web Development",
    courseSlug: "web-development",
    date: "2026-03-28",
    time: "09:30",
    scope: "course",
    category: "assignment",
    status: "Today",
    description: "Submit the API demo and short reflection.",
    location: "LMS submission",
  },
  {
    id: "db-er-diagram",
    title: "ER Diagram Submission",
    courseTitle: "Database Systems",
    courseSlug: "database",
    date: "2026-03-30",
    time: "13:00",
    scope: "course",
    category: "assignment",
    status: "Soon",
    description: "Upload the finalized entity relationship diagram.",
    location: "Classroom upload",
  },
  {
    id: "campus-football-day",
    title: "Football Day",
    date: "2026-03-31",
    time: "15:00",
    scope: "general",
    category: "sports",
    status: "Soon",
    description: "Open campus student activity and team games.",
    location: "Main field",
  },
  {
    id: "react-wireframe",
    title: "Wireframe Review",
    courseTitle: "React Development",
    courseSlug: "react",
    date: "2026-04-02",
    time: "10:00",
    scope: "course",
    category: "meeting",
    status: "Soon",
    description: "Review the UI wireframes with feedback from class.",
    location: "Design lab",
  },
  {
    id: "midterm-db",
    title: "Midterm Exam",
    courseTitle: "Database Systems",
    courseSlug: "database",
    date: "2026-04-05",
    time: "08:30",
    scope: "course",
    category: "midterm",
    status: "Upcoming",
    description: "Midterm coverage: normalization, joins, and SQL queries.",
    location: "Room B204",
  },
  {
    id: "student-club-meeting",
    title: "Student Club Meeting",
    date: "2026-04-08",
    time: "16:00",
    scope: "general",
    category: "meeting",
    status: "Upcoming",
    description: "General student council planning and announcements.",
    location: "Student hall",
  },
  {
    id: "closing-ceremony",
    title: "Closing Ceremony",
    date: "2026-04-12",
    time: "09:00",
    scope: "general",
    category: "ceremony",
    status: "Upcoming",
    description: "Campus-wide semester closing event and awards.",
    location: "Auditorium",
  },
  {
    id: "wd-final",
    title: "Final Project Demo",
    courseTitle: "Web Development",
    courseSlug: "web-development",
    date: "2026-04-20",
    time: "14:30",
    scope: "course",
    category: "final",
    status: "Upcoming",
    description: "Present the final project and deployment link.",
    location: "Demo room",
  },
  {
    id: "personal-review",
    title: "Portfolio Review",
    date: "2026-04-25",
    time: "11:00",
    scope: "personal",
    category: "meeting",
    status: "Upcoming",
    description: "Private review of progress and next goals.",
    location: "Advising desk",
  },
  {
    id: "campus-sports-fest",
    title: "Sports Festival",
    date: "2026-05-03",
    time: "08:00",
    scope: "general",
    category: "sports",
    status: "Upcoming",
    description: "Campus-wide sports event and community activities.",
    location: "Main field",
  },
];

export function getUpcomingScheduleItems() {
  return [...studentScheduleItems].sort((a, b) => a.date.localeCompare(b.date));
}