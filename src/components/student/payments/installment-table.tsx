import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Installment } from "@/components/student/payments/types";
import { formatCurrency, formatDate } from "@/components/student/payments/utils";

export function InstallmentTable({ installments }: { installments: Installment[] }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/90">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Payment</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Receipt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installments.map((installment) => (
            <TableRow key={installment.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{installment.label}</p>
                  <p className="text-xs text-muted-foreground">{installment.status}</p>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(installment.paidAmount)}</TableCell>
              <TableCell>
                {installment.paidDate ? formatDate(installment.paidDate) : "Not paid yet"}
              </TableCell>
              <TableCell>{installment.method ?? "Pending"}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="h-8 gap-2 px-3 text-xs">
                  <Download className="size-3.5" />
                  Receipt
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
