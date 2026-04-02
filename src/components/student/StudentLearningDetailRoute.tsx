"use client";

import { skipToken } from "@reduxjs/toolkit/query";

import { LearningDetailPage } from "@/components/student/LearningDetailPage";
import {
  useGetDegreeCourseDetailQuery,
  useGetScholarshipDetailQuery,
} from "@/features/student-portal/studentPortalApi";

type StudentLearningDetailRouteProps = {
  kind: "degree" | "scholarship";
  slug: string;
};

export function StudentLearningDetailRoute({
  kind,
  slug,
}: StudentLearningDetailRouteProps) {
  const degreeQuery = useGetDegreeCourseDetailQuery(
    kind === "degree" ? slug : skipToken
  );
  const scholarshipQuery = useGetScholarshipDetailQuery(
    kind === "scholarship" ? slug : skipToken
  );

  const query = kind === "degree" ? degreeQuery : scholarshipQuery;

  if (query.isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Loading details...
      </div>
    );
  }

  if (!query.data) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-card p-6 text-sm text-muted-foreground">
        Detail not found.
      </div>
    );
  }

  return (
    <LearningDetailPage
      detail={query.data}
      backHref={kind === "degree" ? "/student/courses" : "/student"}
      backLabel={kind === "degree" ? "Back to courses" : "Back to dashboard"}
      pageLabel={kind === "degree" ? "Course Detail" : "Scholarship Detail"}
    />
  );
}
