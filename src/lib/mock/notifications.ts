import type { StudentNotification } from "@/lib/types/student";

export const studentNotifications: StudentNotification[] = [
  {
    uuid: "notification-final-exam",
    title: "Final Exam Result Y2S2",
    summary: "The final exam results for Year 2 Semester 2 are now available.",
    date: "Feb 2, 2026",
    category: "Grades",
    unread: true,
  },
  {
    uuid: "notification-schedule-y3s1",
    title: "Schedule Year 3 Semester 1",
    summary: "The next semester course schedule has been published.",
    date: "Feb 1, 2026",
    category: "Schedule",
    unread: true,
  },
  {
    uuid: "notification-midterm",
    title: "Midterm Results",
    summary: "Midterm review outcomes are ready for student review.",
    date: "Jan 28, 2026",
    category: "Grades",
    unread: false,
  },
  {
    uuid: "notification-replacement",
    title: "Replacement Exam Notice",
    summary: "Replacement exam guidance for selected subjects is available.",
    date: "Jan 24, 2026",
    category: "Exam",
    unread: false,
  },
];
