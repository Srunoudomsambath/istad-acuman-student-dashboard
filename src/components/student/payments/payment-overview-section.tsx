import type { ReactNode } from "react";
import { AlertTriangle, Siren } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SummaryCard = {
  label: string;
  value: string;
  tone: string;
};

type PaymentOverviewSectionProps = {
  progress: number;
  summaryCards: SummaryCard[];
  metricLabel?: string;
  metricValue: string;
  nextDueLine?: string;
  alertTitle: string;
  alertMessage: ReactNode;
  secondaryAlertTitle?: string;
  secondaryAlertMessage?: ReactNode;
  isOverdue: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function PaymentOverviewSection({
  progress,
  summaryCards,
  metricLabel = "Paid",
  metricValue,
  nextDueLine,
  alertTitle,
  alertMessage,
  secondaryAlertTitle,
  secondaryAlertMessage,
  isOverdue,
  eyebrow = "Payments",
  title = "Account Summary",
  description = "Open a semester or scholarship to review each payment.",
}: PaymentOverviewSectionProps) {
  const AlertIcon = isOverdue ? Siren : AlertTriangle;
  const alertVariant = isOverdue ? "destructive" : "default";

  return (
    <Card className="border-border/60 bg-card/95 shadow-sm">
      <CardContent className="space-y-4 p-4 md:p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
          </div>
          <Badge variant="secondary" className="w-fit rounded-full px-2.5 py-0.5 text-xs">
            {progress}% complete
          </Badge>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_300px]">
          <div className="space-y-4">
            <section className="rounded-xl border border-border/60 bg-muted/10 p-4">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((item) => (
                  <div key={item.label} className="rounded-lg bg-background/90 p-3">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </p>
                    <p className={`mt-1 text-lg font-semibold ${item.tone}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border/60 bg-muted/10 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Progress</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{metricLabel}: {metricValue}</span>
                  <span>{progress}% complete</span>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <Progress value={progress} className="h-2" />
                {nextDueLine ? <div className="text-xs text-muted-foreground">{nextDueLine}</div> : null}
              </div>
            </section>
          </div>

          <section className="rounded-xl border border-border/60 bg-muted/10 p-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">Alert</p>
                <p className="text-xs text-muted-foreground">Current account status</p>
              </div>

              <Alert
                variant={alertVariant}
                className={
                  isOverdue
                    ? "rounded-xl border-destructive/30 bg-destructive/5 px-3 py-3"
                    : "rounded-xl border-amber-200 bg-amber-50/70 px-3 py-3 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-100"
                }
              >
                <AlertIcon className={isOverdue ? undefined : "text-amber-600 dark:text-amber-400"} />
                <AlertTitle className="mx-0 text-sm">{alertTitle}</AlertTitle>
                <AlertDescription className={isOverdue ? "text-xs" : "text-xs text-amber-800/90 dark:text-amber-200"}>
                  {alertMessage}
                </AlertDescription>
              </Alert>

              {secondaryAlertTitle && secondaryAlertMessage ? (
                <Alert className="rounded-xl border-amber-200 bg-amber-50/70 px-3 py-3 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-100">
                  <AlertTriangle className="text-muted-foreground" />
                  <AlertTitle className="mx-0 text-sm">{secondaryAlertTitle}</AlertTitle>
                  <AlertDescription className="text-xs text-amber-800/90 dark:text-amber-200">
                    {secondaryAlertMessage}
                  </AlertDescription>
                </Alert>
              ) : null}
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
