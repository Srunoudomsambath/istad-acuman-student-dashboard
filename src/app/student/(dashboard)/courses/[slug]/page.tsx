import { StudentLearningDetailRoute } from "@/components/student/StudentLearningDetailRoute";
import { studentCourses } from "@/lib/mock/courses";

type CoursePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return studentCourses.map((course) => ({ slug: course.slug }));
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  return <StudentLearningDetailRoute kind="degree" slug={params.slug} />;
}
