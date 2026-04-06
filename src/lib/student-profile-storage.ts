import { studentProfile as defaultStudentProfile } from "@/lib/mock/student";
import type { Scholar } from "@/lib/types/student";

export const STUDENT_PROFILE_STORAGE_KEY = "student-dashboard.profile";
export const STUDENT_PROFILE_UPDATED_EVENT = "student-profile-updated";

export function getStoredStudentProfile(): Scholar {
  if (typeof window === "undefined") {
    return defaultStudentProfile;
  }

  try {
    const rawProfile = window.localStorage.getItem(STUDENT_PROFILE_STORAGE_KEY);

    if (!rawProfile) {
      return defaultStudentProfile;
    }

    const parsedProfile = JSON.parse(rawProfile) as Partial<Scholar>;

    return {
      ...defaultStudentProfile,
      ...parsedProfile,
      completedCourses: parsedProfile.completedCourses ?? defaultStudentProfile.completedCourses,
      careers: parsedProfile.careers ?? defaultStudentProfile.careers,
      specialists: parsedProfile.specialists ?? defaultStudentProfile.specialists,
      certificates: parsedProfile.certificates ?? defaultStudentProfile.certificates,
      achievements: parsedProfile.achievements ?? defaultStudentProfile.achievements,
      badges: parsedProfile.badges ?? defaultStudentProfile.badges,
      payments: parsedProfile.payments ?? defaultStudentProfile.payments,
      enrollments: parsedProfile.enrollments ?? defaultStudentProfile.enrollments,
    };
  } catch {
    return defaultStudentProfile;
  }
}

export function saveStudentProfile(profile: Scholar) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STUDENT_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new CustomEvent(STUDENT_PROFILE_UPDATED_EVENT, { detail: profile }));
}
