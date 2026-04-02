export type LearningSource = "lms" | "exstad";

export type LearningType = "degree" | "scholarship" | "short-course";

export type StudentEnrollment = {
  id: string;
  source: LearningSource;
  type: LearningType;
  title: string;
  slug: string;
  url: string;
  status: "active" | "completed" | "paused";
};

export type LearningCurriculumItem = {
  uuid: string;
  type: "Slide" | "Video" | "Mini Project" | "Lecture" | "File";
  title: string;
  description: string;
  href?: string;
};

export type LearningDetail = {
  source: LearningSource;
  type: LearningType;
  slug: string;
  title: string;
  code: string;
  description: string;
  yearLabel: string;
  creditLabel: string;
  theoryLabel: string;
  practiceLabel: string;
  internshipLabel: string;
  instructor: string;
  instructorRole: string;
  studentsJoined: number;
  classStart: string;
  progress: number;
  level: string;
  track: string;
  roster: string[];
  status?: string;
  curriculum: LearningCurriculumItem[];
};
