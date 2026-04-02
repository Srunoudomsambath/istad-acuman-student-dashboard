import {
  HighDegreeTrackingSection,
  PaymentOverviewSection,
  PaymentTabs,
  RecentHistorySection,
  ScholarshipTrackingSection,
  TabsContent,
  formatCurrency,
  formatDate,
  getInstallmentRemaining,
  highDegreeProgram,
  paymentHistory,
  scholarshipPrograms,
} from "@/components/student/payments";
import type { ReactNode } from "react";

type OverviewItem = {
  amount: number;
  paidAmount: number;
  dueDate: string;
  groupTitle: string;
};

type OverviewResult = {
  progress: number;
  summaryCards: { label: string; value: string; tone: string }[];
  metricValue: string;
  nextDueLine?: string;
  alertTitle: string;
  alertMessage: string;
  isOverdue: boolean;
};

function buildOverview(installments: OverviewItem[]): OverviewResult {
  const today = new Date("2026-04-02T00:00:00");
  const totalFee = installments.reduce((sum, item) => sum + item.amount, 0);
  const totalPaid = installments.reduce((sum, item) => sum + item.paidAmount, 0);
  const totalRemaining = installments.reduce(
    (sum, item) => sum + (item.amount - item.paidAmount),
    0
  );
  const overdueInstallments = installments.filter(
    (item) => item.amount - item.paidAmount > 0 && new Date(item.dueDate) < today
  );
  const overdueAmount = overdueInstallments.reduce(
    (sum, item) => sum + (item.amount - item.paidAmount),
    0
  );
  const nextDueInstallment = installments
    .filter((item) => item.amount - item.paidAmount > 0)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
  const progress = totalFee === 0 ? 0 : Math.round((totalPaid / totalFee) * 100);
  const nextDueDate = nextDueInstallment ? new Date(nextDueInstallment.dueDate) : null;
  const daysUntilDue = nextDueDate
    ? Math.ceil((nextDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null;
  const isOverdue = overdueAmount > 0;
  const isNearDue = !isOverdue && daysUntilDue !== null && daysUntilDue <= 3;

  const alertTitle = isOverdue
    ? "Overdue payment"
    : isNearDue
      ? "Upcoming payment"
      : "Payments on track";

  const alertMessage = isOverdue
    ? nextDueInstallment
      ? `${formatCurrency(overdueAmount)} overdue. Due ${formatDate(nextDueInstallment.dueDate)}`
      : `${formatCurrency(overdueAmount)} is overdue.`
    : isNearDue && nextDueInstallment
      ? `Next due: ${formatCurrency(getInstallmentRemaining(nextDueInstallment))} on ${formatDate(nextDueInstallment.dueDate)}.`
      : nextDueInstallment
        ? `Next due: ${formatCurrency(getInstallmentRemaining(nextDueInstallment))} on ${formatDate(nextDueInstallment.dueDate)}.`
        : "All current plans are fully paid.";

  const summaryCards = [
    { label: "Total", value: formatCurrency(totalFee), tone: "text-foreground" },
    { label: "Paid", value: formatCurrency(totalPaid), tone: "text-emerald-600" },
    {
      label: "Balance",
      value: formatCurrency(totalRemaining),
      tone: totalRemaining > 0 ? "text-rose-500" : "text-emerald-600",
    },
    {
      label: "Next Due",
      value: nextDueInstallment ? formatDate(nextDueInstallment.dueDate) : "No due",
      tone: isOverdue ? "text-destructive" : "text-amber-600",
    },
  ];

  const nextDueLine = nextDueInstallment
    ? `${nextDueInstallment.groupTitle} - ${formatCurrency(getInstallmentRemaining(nextDueInstallment))} due ${formatDate(nextDueInstallment.dueDate)}`
    : undefined;

  return {
    progress,
    summaryCards,
    metricValue: formatCurrency(totalPaid),
    nextDueLine,
    alertTitle,
    alertMessage,
    isOverdue,
  };
}

export default function PaymentsPage() {
  const bachelorInstallments = highDegreeProgram.terms.flatMap((term) =>
    term.installments.map((installment) => ({
      ...installment,
      groupTitle: `${highDegreeProgram.programTitle} / ${term.label}`,
    }))
  );

  const preUniversityProgram =
    scholarshipPrograms.find((program) => program.programTitle === "Pre-University Foundation") ??
    scholarshipPrograms[0];
  const itProfessionalProgram =
    scholarshipPrograms.find((program) => program.programTitle === "IT Professional Scholarship") ??
    scholarshipPrograms[1];

  const preUniversityInstallments = preUniversityProgram.installments.map((installment) => ({
    ...installment,
    groupTitle: preUniversityProgram.programTitle,
  }));
  const itProfessionalInstallments = itProfessionalProgram.installments.map((installment) => ({
    ...installment,
    groupTitle: itProfessionalProgram.programTitle,
  }));

  const allInstallments = [
    ...bachelorInstallments,
    ...itProfessionalInstallments,
    ...preUniversityInstallments,
  ];

  const overallOverview = buildOverview(allInstallments);
  const bachelorOverview = buildOverview(bachelorInstallments);
  const itProfessionalOverview = buildOverview(itProfessionalInstallments);
  const preUniversityOverview = buildOverview(preUniversityInstallments);

  const activePlanCount = 1 + scholarshipPrograms.length;
  const overallSummaryCards = [
    { label: "Total", value: overallOverview.summaryCards[0].value, tone: "text-foreground" },
    { label: "Paid", value: overallOverview.summaryCards[1].value, tone: "text-emerald-600" },
    {
      label: "Balance",
      value: overallOverview.summaryCards[2].value,
      tone: overallOverview.summaryCards[2].tone,
    },
    { label: "Active Plans", value: String(activePlanCount), tone: "text-foreground" },
  ];
  const overallNextLine = `Active plans: 1 high-degree and ${scholarshipPrograms.length} scholarship.`;

  const planOverviews = [
    { label: "High-degree", overview: bachelorOverview },
    { label: "IT Professional Scholarship", overview: itProfessionalOverview },
    { label: "Pre-University Foundation", overview: preUniversityOverview },
  ];

  const summaryAlertSource =
    planOverviews.find((item) => item.overview.alertTitle === "Overdue payment") ?? {
      label: "Overall",
      overview: overallOverview,
    };

  const summaryUpcomingSource =
    planOverviews.find((item) => item.overview.alertTitle === "Upcoming payment") ??
    planOverviews.find(
      (item) =>
        item.overview.alertTitle === "Payments on track" &&
        item.overview.alertMessage.startsWith("Next due:")
    );

  const summaryAlertTitle = summaryAlertSource.overview.alertTitle;
  const summaryAlertMessage: ReactNode =
    summaryAlertSource.label === "Overall"
      ? summaryAlertSource.overview.alertMessage
      : (
          <>
            <p>{summaryAlertSource.label}</p>
            <p>{summaryAlertSource.overview.alertMessage}</p>
          </>
        );

  const summarySecondaryAlertTitle =
    summaryUpcomingSource && summaryUpcomingSource.label !== summaryAlertSource.label
      ? summaryUpcomingSource.overview.alertTitle
      : undefined;

  const summarySecondaryAlertMessage: ReactNode =
    summaryUpcomingSource && summaryUpcomingSource.label !== summaryAlertSource.label
      ? (
          <>
            <p>{summaryUpcomingSource.label}</p>
            <p>{summaryUpcomingSource.overview.alertMessage}</p>
          </>
        )
      : undefined;

  const bachelorHistory = paymentHistory.filter((item) => item.studyType === "High-degree");
  const preUniversityHistory = paymentHistory.filter((item) =>
    item.description.includes("Foundation")
  );
  const itProfessionalHistory = paymentHistory.filter(
    (item) => item.description.includes("IT Professional") || item.description.includes("ITP")
  );

  return (
    <PaymentTabs>
      <TabsContent value="summary" className="space-y-4">
        <PaymentOverviewSection
          {...overallOverview}
          summaryCards={overallSummaryCards}
          nextDueLine={overallNextLine}
          metricLabel="Paid"
          title="Payment Summary"
          description="Overall payment progress across all active plans."
          alertTitle={summaryAlertTitle}
          alertMessage={summaryAlertMessage}
          secondaryAlertTitle={summarySecondaryAlertTitle}
          secondaryAlertMessage={summarySecondaryAlertMessage}
        />
        <RecentHistorySection items={paymentHistory} />
      </TabsContent>

      <TabsContent value="bachelor" className="space-y-4">
        <PaymentOverviewSection
          {...bachelorOverview}
          metricLabel="Paid"
          eyebrow="Bachelor"
          title="Bachelor Payment Overview"
          description="Overview for the bachelor payment plan and all semester activity."
        />
        <HighDegreeTrackingSection program={highDegreeProgram} />
        <RecentHistorySection items={bachelorHistory} />
      </TabsContent>

      <TabsContent value="itp" className="space-y-4">
        <PaymentOverviewSection
          {...itProfessionalOverview}
          metricLabel="Paid"
          eyebrow="Scholarship"
          title="IT Professional Scholarship Overview"
          description="Overview for the IT Professional Scholarship payment plan."
        />
        <ScholarshipTrackingSection programs={[itProfessionalProgram]} />
        <RecentHistorySection items={itProfessionalHistory} />
      </TabsContent>

      <TabsContent value="pre-university" className="space-y-4">
        <PaymentOverviewSection
          {...preUniversityOverview}
          metricLabel="Paid"
          eyebrow="Scholarship"
          title="Pre-University Foundation Overview"
          description="Overview for the Pre-University Foundation payment plan."
        />
        <ScholarshipTrackingSection programs={[preUniversityProgram]} />
        <RecentHistorySection items={preUniversityHistory} />
      </TabsContent>
    </PaymentTabs>
  );
}
