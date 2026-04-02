import type { Installment, PaymentStatus } from "@/components/student/payments/types";

export function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}.00`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getInstallmentRemaining(installment: Installment) {
  return installment.amount - installment.paidAmount;
}

export function getStatusBadgeClass(status: PaymentStatus | "Active" | "Completed") {
  const styles: Record<PaymentStatus | "Active" | "Completed", string> = {
    Paid: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
    Overdue:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
    Partial:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800",
    Pending: "bg-muted text-muted-foreground border-border",
    Active:
      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-400 dark:border-sky-800",
    Completed:
      "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
  };

  return styles[status];
}

export function getCollectionTotals(installments: Installment[]) {
  const total = installments.reduce((sum, item) => sum + item.amount, 0);
  const paid = installments.reduce((sum, item) => sum + item.paidAmount, 0);
  const remaining = installments.reduce(
    (sum, item) => sum + getInstallmentRemaining(item),
    0
  );
  const progress = total === 0 ? 0 : Math.round((paid / total) * 100);

  return { total, paid, remaining, progress };
}
