export { highDegreeProgram, paymentHistory, scholarshipPrograms } from "@/components/student/payments/mock-data";
export { HighDegreeTrackingSection } from "@/components/student/payments/high-degree-tracking-section";
export { InstallmentTable } from "@/components/student/payments/installment-table";
export { PaymentOverviewSection } from "@/components/student/payments/payment-overview-section";
export { PaymentTabs, TabsContent } from "@/components/student/payments/payment-tabs";
export { RecentHistorySection } from "@/components/student/payments/recent-history-section";
export { ScholarshipTrackingSection } from "@/components/student/payments/scholarship-tracking-section";
export type {
  HighDegreeProgram,
  HighDegreeTerm,
  Installment,
  PaymentHistoryItem,
  PaymentStatus,
  ScholarshipProgram,
  StudyType,
} from "@/components/student/payments/types";
export {
  formatCurrency,
  formatDate,
  getCollectionTotals,
  getInstallmentRemaining,
  getStatusBadgeClass,
} from "@/components/student/payments/utils";

