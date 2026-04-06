import {
  formatCurrency,
  formatDate,
  getInstallmentRemaining,
  highDegreeProgram,
  HighDegreeTrackingSection,
  PaymentOverviewSection,
  RecentHistorySection,
  paymentHistory,
} from "@/components/student/payments";

function buildOverview() {
  const installments = highDegreeProgram.terms.flatMap((term) =>
    term.installments.map((installment) => ({
      ...installment,
      groupTitle: `${highDegreeProgram.programTitle} / ${term.label}`,
    }))
  );

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
  const isOverdue = overdueAmount > 0;

  return {
    progress,
    summaryCards: [
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
    ],
    metricValue: formatCurrency(totalPaid),
    nextDueLine: nextDueInstallment
      ? `${nextDueInstallment.groupTitle} - ${formatCurrency(getInstallmentRemaining(nextDueInstallment))} due ${formatDate(nextDueInstallment.dueDate)}`
      : undefined,
    alertTitle: isOverdue ? "Overdue payment" : "Payments on track",
    alertMessage: isOverdue
      ? `${formatCurrency(overdueAmount)} overdue. Due ${formatDate(nextDueInstallment.dueDate)}`
      : nextDueInstallment
        ? `Next due: ${formatCurrency(getInstallmentRemaining(nextDueInstallment))} on ${formatDate(nextDueInstallment.dueDate)}.`
        : "All current plans are fully paid.",
    isOverdue,
  };
}

export default function BachelorPaymentsPage() {
  const overview = buildOverview();
  const bachelorHistory = paymentHistory.filter((item) => item.studyType === "High-degree");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Payments
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Track tuition progress, review term installments, and keep an eye on overdue balances.
        </p>
      </div>

      <PaymentOverviewSection
        {...overview}
        metricLabel="Paid"
        eyebrow="Bachelor"
        title="Bachelor Payment Overview"
        description="Overview for the bachelor payment plan and current installment activity."
      />

      <HighDegreeTrackingSection program={highDegreeProgram} />
      <RecentHistorySection items={bachelorHistory} />
    </div>
  );
}
