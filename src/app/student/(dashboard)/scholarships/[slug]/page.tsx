import { StudentLearningDetailRoute } from "@/components/student/StudentLearningDetailRoute";
import { exstadLearningDetails } from "@/lib/mock/exstad-courses";

type ScholarshipPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return exstadLearningDetails.map((detail) => ({ slug: detail.slug }));
}

export default function ScholarshipDetailPage({ params }: ScholarshipPageProps) {
  return <StudentLearningDetailRoute kind="scholarship" slug={params.slug} />;
}
