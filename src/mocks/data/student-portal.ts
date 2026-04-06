import { studentCourses } from "@/lib/mock/courses";
import { exstadLearningDetails } from "@/lib/mock/exstad-courses";
import { studentProfile } from "@/lib/mock/student";
import type { LearningDetail } from "@/lib/types/learning";

function mapDegreeCourseToLearningDetail(
  course: (typeof studentCourses)[number]
): LearningDetail {
  return {
    source: "lms",
    type: "degree",
    slug: course.slug,
    title: course.title,
    code: course.code,
    description: course.description,
    yearLabel: `Year ${course.year} | Semester ${course.semester}`,
    creditLabel: `${course.credit} total`,
    theoryLabel: String(course.theory),
    practiceLabel: String(course.practice),
    internshipLabel: course.internship,
    instructor: course.instructor,
    instructorRole: course.instructorRole,
    studentsJoined: course.studentsJoined,
    classStart: course.classStart,
    progress: course.progress,
    level: course.level,
    track: course.track,
    roster: course.roster,
    status: course.status,
    assessment: course.assessment,
    curriculum: course.curriculum,
  };
}

export const studentPortalProfile = studentProfile;
export const studentPortalEnrollments = studentProfile.enrollments;
export const degreeLearningDetails = studentCourses.map(mapDegreeCourseToLearningDetail);
export const scholarshipLearningDetails = exstadLearningDetails;

export function getDegreeLearningDetailBySlug(slug: string) {
  return degreeLearningDetails.find((detail) => detail.slug === slug) ?? null;
}

export function getScholarshipLearningDetailBySlug(slug: string) {
  return scholarshipLearningDetails.find((detail) => detail.slug === slug) ?? null;
}
