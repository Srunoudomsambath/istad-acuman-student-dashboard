import type { Audit } from "@/types";
import type { Achievement as BackendAchievement } from "@/types/achievement";

export type ProjectAchievement = BackendAchievement & {
  highlights: string[];
  featured?: boolean;
};

const audit = (createdAt: string): Audit => ({
  createdBy: "admin",
  createdAt,
  updatedBy: "admin",
  updatedAt: createdAt,
});

export const studentProjectAchievements: ProjectAchievement[] = [
  {
    uuid: "proj-k-quicksight",
    title: "K-QuickSight",
    description:
      "Catalyze your data journey with our powerful analytics toolkit for data prep, modeling, and dashboard storytelling.",
    icon: "KQ",
    program: "Data Analytics",
    achievementType: "Project",
    tag: "1st | Advanced",
    video: "#video-k-quicksight",
    link: "#k-quicksight",
    audit: audit("2026-01-12"),
    featured: true,
    highlights: ["Data Prep Made Easy", "Intelligent Insights", "User-Friendly Dashboards"],
  },
  {
    uuid: "proj-automatex",
    title: "AutomateX",
    description:
      "DevOps platform for deploying database services, software releases, and domain workflows with less manual work.",
    icon: "AX",
    program: "DevOps",
    achievementType: "Project",
    tag: "1st | Advanced",
    video: "#video-automatex",
    link: "#automatex",
    audit: audit("2026-01-28"),
    highlights: ["Deploy Database", "Deploy Software", "Deploy Domain Name"],
  },
  {
    uuid: "proj-campus-flow",
    title: "CampusFlow",
    description:
      "Student portal project built during the foundation track with course progress, attendance, and assignment tracking.",
    icon: "CF",
    program: "Full Stack",
    achievementType: "Project",
    tag: "2nd | Foundation",
    video: "#video-campus-flow",
    link: "#campus-flow",
    audit: audit("2026-02-14"),
    highlights: ["Login System", "Course Dashboard", "Attendance Tracker"],
  },
  {
    uuid: "proj-it-professional",
    title: "IT Professional Demo",
    description:
      "Professional capstone project focused on communication, deployment planning, team workflow, and final presentation.",
    icon: "IT",
    program: "IT Professional",
    achievementType: "Capstone",
    tag: "Final | Professional",
    video: "#video-it-professional",
    link: "#it-professional",
    audit: audit("2026-03-08"),
    highlights: ["Presentation Deck", "Team Collaboration", "Demo Day"],
  },
];
