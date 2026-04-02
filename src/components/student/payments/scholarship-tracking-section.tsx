import { School } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { InstallmentTable } from "@/components/student/payments/installment-table";
import type { ScholarshipProgram } from "@/components/student/payments/types";
import {
  formatCurrency,
  getCollectionTotals,
  getStatusBadgeClass,
} from "@/components/student/payments/utils";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: "Active" | "Completed" }) {
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

export function ScholarshipTrackingSection({ programs }: { programs: ScholarshipProgram[] }) {
  return (
    <Card className="overflow-hidden border-border/60 bg-card/95 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-md border border-border/60 bg-muted/20">
            <School className="size-3.5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-[13px] font-medium leading-none tracking-tight">
              Scholarship tracking
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Flexible scholarship payment plans
            </p>
          </div>
        </div>
        <span className="rounded-full border border-border/60 bg-muted/20 px-2.5 py-0.5 text-[11px] text-muted-foreground">
          {programs.length} programs
        </span>
      </div>

      <div className="space-y-2 p-3.5">
        <Accordion type="single" collapsible className="space-y-2">
          {programs.map((program) => {
            const totals = getCollectionTotals(program.installments);

            return (
              <AccordionItem
                key={program.programTitle}
                value={program.programTitle}
                className="overflow-hidden rounded-md border border-border/60 bg-background px-0"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex w-full items-center justify-between pr-2">
                    <div className="text-left">
                      <p className="text-[13px] font-medium leading-none">
                        {program.programTitle}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {program.installments.length} payments · Fee {formatCurrency(program.totalFee)} · {program.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-[11px] text-muted-foreground">Remaining</p>
                        <p className="text-[13px] font-medium">
                          {formatCurrency(totals.remaining)}
                        </p>
                      </div>
                      <StatusBadge status={program.status} />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <div className="border-t border-border/60 px-4 pt-3">
                    <InstallmentTable installments={program.installments} />
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
            programs.reduce(
              (sum, program) => sum + getCollectionTotals(program.installments).remaining,
              0
            )
          )}{" "}
          <span className="font-normal text-muted-foreground">
            of{" "}
            {formatCurrency(
              programs.reduce(
                (sum, program) => sum + getCollectionTotals(program.installments).total,
                0
              )
            )}
          </span>
        </p>
      </div>
    </Card>
  );
}

