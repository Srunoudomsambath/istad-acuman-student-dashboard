export type TranscriptCourse = {
  no: number;
  title: string;
  credit: number;
  grade: string;
};

export type TranscriptYear = {
  year: string;
  courses: TranscriptCourse[];
};
