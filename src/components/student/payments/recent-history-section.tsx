import { CalendarDays, Download, ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PaymentHistoryItem } from "@/components/student/payments/types";
import { formatCurrency } from "@/components/student/payments/utils";

export function RecentHistorySection({ items }: { items: PaymentHistoryItem[] }) {
  return (
    <Card className="border-border/60 bg-card/95 shadow-sm">
      <CardHeader className="border-b bg-muted/10 px-4 py-2.5">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <ReceiptText className="size-4 text-primary" />
          Recent History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="rounded-lg border border-border/60 bg-background/90">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={`${item.date}-${item.description}`}>
                  <TableCell className="font-medium">{item.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      {item.date}
                    </div>
                  </TableCell>
                  <TableCell>{item.studyType}</TableCell>
                  <TableCell>{item.method}</TableCell>
                  <TableCell>{formatCurrency(item.amount)}</TableCell>
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
      </CardContent>
    </Card>
  );
}
