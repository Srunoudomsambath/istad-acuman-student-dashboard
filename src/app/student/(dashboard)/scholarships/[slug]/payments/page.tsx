import {
  formatCurrency,
  formatDate,
  getInstallmentRemaining,
  PaymentOverviewSection,
  RecentHistorySection,
  ScholarshipTrackingSection,
  scholarshipPrograms,
  paymentHistory,
} from "@/components/student/payments";

function buildOverview(programTitle: string) {
  const program = scholarshipPrograms.find((item) => item.programTitle === programTitle) ?? scholarshipPrograms[0];
  const installments = program.installments.map((installment) => ({ ...installment, groupTitle: program.programTitle }));
  const today = new Date("2026-04-02T00:00:00");
  const totalFee = installments.reduce((sum, item) => sum + item.amount, 0);
  const totalPaid = installments.reduce((sum, item) => sum + item.paidAmount, 0);
  const totalRemaining = installments.reduce((sum, item) => sum + (item.amount - item.paidAmount), 0);
  const overdueInstallments = installments.filter((item) => item.amount - item.paidAmount > 0 && new Date(item.dueDate) < today);
  const overdueAmount = overdueInstallments.reduce((sum, item) => sum + (item.amount - item.paidAmount), 0);
  const nextDueInstallment = installments.filter((item) => item.amount - item.paidAmount > 0).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
  const progress = totalFee === 0 ? 0 : Math.round((totalPaid / totalFee) * 100);
  const isOverdue = overdueAmount > 0;

  return {
    program,
    overview: {
      progress,
      summaryCards: [
        { label: "Total", value: formatCurrency(totalFee), tone: "text-foreground" },
        { label: "Paid", value: formatCurrency(totalPaid), tone: "text-emerald-600" },
        { label: "Balance", value: formatCurrency(totalRemaining), tone: totalRemaining > 0 ? "text-rose-500" : "text-emerald-600" },
        { label: "Next Due", value: nextDueInstallment ? formatDate(nextDueInstallment.dueDate) : "No due", tone: isOverdue ? "text-destructive" : "text-amber-600" },
      ],
      metricValue: formatCurrency(totalPaid),
      nextDueLine: nextDueInstallment ? `${nextDueInstallment.groupTitle} - ${formatCurrency(getInstallmentRemaining(nextDueInstallment))} due ${formatDate(nextDueInstallment.dueDate)}` : undefined,
      alertTitle: isOverdue ? "Overdue payment" : "Payments on track",
      alertMessage: isOverdue ? `${formatCurrency(overdueAmount)} overdue. Due ${formatDate(nextDueInstallment.dueDate)}` : nextDueInstallment ? `Next due: ${formatCurrency(getInstallmentRemaining(nextDueInstallment))} on ${formatDate(nextDueInstallment.dueDate)}.` : "All current plans are fully paid.",
      isOverdue,
    },
  };
}

export default function ScholarshipPaymentsPage() {
  const { program, overview } = buildOverview("IT Professional Scholarship");
  const history = paymentHistory.filter((item) => item.studyType === "Scholarship");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Payments
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Track the scholarship fee plan, review due dates, and monitor your payment status.
        </p>
      </div>

      <PaymentOverviewSection
        {...overview}
        metricLabel="Paid"
        eyebrow="Scholarship"
        title="Scholarship Payment Overview"
        description="Overview for the active scholarship payment plan."
      />

      <ScholarshipTrackingSection programs={[program]} />
      <RecentHistorySection items={history} />
    </div>
  );
}
