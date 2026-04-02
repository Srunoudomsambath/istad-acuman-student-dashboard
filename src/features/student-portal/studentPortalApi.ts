import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { LearningDetail } from "@/lib/types/learning";
import type { Scholar, StudentEnrollment } from "@/lib/types/student";

const baseUrl =
  `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}${process.env.NEXT_PUBLIC_API_VERSION ?? ""}` || "/";

export const studentPortalApi = createApi({
  reducerPath: "studentPortalApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["StudentPortalProfile", "StudentPortalEnrollment", "LearningDetail"],
  endpoints: (builder) => ({
    getCurrentStudentProfile: builder.query<Scholar, void>({
      query: () => "/students/me",
      providesTags: [{ type: "StudentPortalProfile", id: "me" }],
    }),

    getStudentEnrollments: builder.query<StudentEnrollment[], void>({
      query: () => "/students/me/enrollments",
      transformResponse: (response: { enrollments: StudentEnrollment[] }) =>
        response.enrollments,
      providesTags: [{ type: "StudentPortalEnrollment", id: "LIST" }],
    }),

    getDegreeCourseDetail: builder.query<LearningDetail, string>({
      query: (slug) => `/lms/courses/${slug}`,
      providesTags: (result, error, slug) => [{ type: "LearningDetail", id: `degree-${slug}` }],
    }),

    getScholarshipDetail: builder.query<LearningDetail, string>({
      query: (slug) => `/exstad/scholarships/${slug}`,
      providesTags: (result, error, slug) => [
        { type: "LearningDetail", id: `scholarship-${slug}` },
      ],
    }),
  }),
});

export const {
  useGetCurrentStudentProfileQuery,
  useGetStudentEnrollmentsQuery,
  useGetDegreeCourseDetailQuery,
  useGetScholarshipDetailQuery,
} = studentPortalApi;
