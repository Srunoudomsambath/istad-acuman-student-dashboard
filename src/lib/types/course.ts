export type CourseCurriculumItem = {
  uuid: string;
  type: "Slide" | "Video" | "Mini Project" | "Lecture";
  title: string;
  description: string;
};

export type StudentCourse = {
  slug: string;
  code: string;
  title: string;
  description: string;
  year: number;
  semester: number;
  credit: number;
  theory: number;
  practice: number;
  internship: string;
  instructor: string;
  instructorRole: string;
  studentsJoined: number;
  classStart: string;
  progress: number;
  level: string;
  track: string;
  logo: string;
  summary: string;
  roster: string[];
  curriculum: CourseCurriculumItem[];
  status?:string;
};
