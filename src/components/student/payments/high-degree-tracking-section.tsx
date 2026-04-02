import { GraduationCap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { InstallmentTable } from "@/components/student/payments/installment-table";
import type {
  HighDegreeProgram,
  PaymentStatus,
} from "@/components/student/payments/types";
import {
  formatCurrency,
  getCollectionTotals,
  getStatusBadgeClass,
} from "@/components/student/payments/utils";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2 py-0.5 text-[10px] font-medium",
        getStatusBadgeClass(status)
      )}
    >
      {status}
    </span>
  );
}

export function HighDegreeTrackingSection({ program }: { program: HighDegreeProgram }) {
  return (
    <Card className="overflow-hidden border-border/60 bg-card/95 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-md border border-border/60 bg-muted/20">
            <GraduationCap className="size-3.5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-[13px] font-medium leading-none tracking-tight">
              High-degree tracking
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Academic payment plans
            </p>
          </div>
        </div>
        <span className="rounded-full border border-border/60 bg-muted/20 px-2.5 py-0.5 text-[11px] text-muted-foreground">
          {program.terms.length} terms
        </span>
      </div>

      <div className="flex items-center justify-between border-b border-border/60 bg-muted/10 px-5 py-3">
        <div>
          <p className="mb-0.5 text-[11px] text-muted-foreground">Program</p>
          <p className="text-[13px] font-medium">{program.programTitle}</p>
        </div>
        <span className="rounded border border-border/60 px-1.5 py-0.5 text-[11px] text-muted-foreground">
          {program.programType}
        </span>
      </div>

      <div className="space-y-2 p-3.5">
        <Accordion type="single" collapsible className="space-y-2">
          {program.terms.map((term) => {
            const totals = getCollectionTotals(term.installments);
            const termStatus: PaymentStatus =
              totals.remaining === 0
                ? "Paid"
                : term.installments.some((i) => i.status === "Overdue")
                  ? "Overdue"
                  : term.installments.some((i) => i.status === "Partial")
                    ? "Partial"
                    : "Pending";

            return (
              <AccordionItem
                key={term.id}
                value={term.id}
                className="overflow-hidden rounded-md border border-border/60 bg-background px-0"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex w-full items-center justify-between pr-2">
                    <div className="text-left">
                      <p className="text-[13px] font-medium leading-none">{term.label}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {term.installments.length} installments · Fee {formatCurrency(term.totalFee)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-[11px] text-muted-foreground">Remaining</p>
                        <p className="text-[13px] font-medium">
                          {formatCurrency(totals.remaining)}
                        </p>
                      </div>
                      <StatusBadge status={termStatus} />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <div className="border-t border-border/60 px-4 pt-3">
                    <InstallmentTable installments={term.installments} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 bg-muted/10 px-5 py-2.5">
        <p className="text-[11px] text-muted-foreground">Total outstanding</p>
        <p className="text-[13px] font-medium">
          {formatCurrency(
            program.terms.reduce(
              (sum, t) => sum + getCollectionTotals(t.installments).remaining,
              0
            )
          )}{" "}
          <span className="font-normal text-muted-foreground">
            of{" "}
            {formatCurrency(
              program.terms.reduce(
                (sum, t) => sum + getCollectionTotals(t.installments).total,
                0
              )
            )}
          </span>
        </p>
      </div>
    </Card>
  );
}
