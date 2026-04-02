import { http, HttpResponse } from "msw";

import {
  getDegreeLearningDetailBySlug,
  getScholarshipLearningDetailBySlug,
  studentPortalEnrollments,
  studentPortalProfile,
} from "@/mocks/data/student-portal";

export const handlers = [
  http.get("*/students/me", () => {
    return HttpResponse.json(studentPortalProfile);
  }),

  http.get("*/students/me/enrollments", () => {
    return HttpResponse.json({ enrollments: studentPortalEnrollments });
  }),

  http.get("*/lms/courses/:slug", ({ params }) => {
    const detail = getDegreeLearningDetailBySlug(String(params.slug));

    if (!detail) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(detail);
  }),

  http.get("*/exstad/scholarships/:slug", ({ params }) => {
    const detail = getScholarshipLearningDetailBySlug(String(params.slug));

    if (!detail) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(detail);
  }),
];
