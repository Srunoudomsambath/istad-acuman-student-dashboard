import {
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { studentProfile } from "@/lib/mock/student";

type CoursePayment = {
  title: string;
  semester: string;
  paid: number;
  remaining: number;
  status: "Paid" | "Partial";
};

type PaymentHistoryItem = {
  date: string;
  description: string;
  amount: number;
  method: string;
  status: "Paid" | "Partial" | "Pending";
};

const coursePayments: CoursePayment[] = [
  {
    title: "Full Stack Development",
    semester: "Semester 1 - 2024",
    paid: 1200,
    remaining: 0,
    status: "Paid",
  },
  {
    title: "Full Stack Development",
    semester: "Semester 2 - 2024",
    paid: 600,
    remaining: 600,
    status: "Partial",
  },
];

const paymentHistory: PaymentHistoryItem[] = [
  {
    date: "Jan 15, 2024",
    description: "Full Stack Development - Semester 1",
    amount: 1200,
    method: "Bank",
    status: "Paid",
  },
  {
    date: "Jul 08, 2024",
    description: "Full Stack Development - Semester 2",
    amount: 600,
    method: "Cash",
    status: "Partial",
  },
  {
    date: "Sep 10, 2024",
    description: "Lab fee",
    amount: 150,
    method: "Bank",
    status: "Paid",
  },
];

export default function PaymentsPage() {
  const totalFee = 2400;
  const totalPaid = coursePayments.reduce((sum, item) => sum + item.paid, 0);
  const remaining = totalFee - totalPaid;
  const progress = Math.round((totalPaid / totalFee) * 100);

  return (
    <div className="space-y-6">
      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border">
                <AvatarFallback className="bg-primary/10 text-2xl font-semibold text-primary">
                  {studentProfile.englishName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    {studentProfile.englishName}
                  </h2>
                  <Badge className="rounded-full bg-emerald-500 text-white hover:bg-emerald-500">
                    active
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {studentProfile.accountName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {studentProfile.major ?? "Full Stack Development"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-muted/20 p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-medium">Payment Progress</p>
              <p className="text-sm text-muted-foreground">{progress}%</p>
            </div>
            <Progress value={progress} className="h-4" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-background/70 p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Fee</p>
                <p className="mt-1 text-2xl font-semibold">
                  ${totalFee.toLocaleString()}.00
                </p>
              </div>
              <div className="rounded-2xl bg-background/70 p-4 text-center">
                <p className="text-sm text-muted-foreground">Amount Paid</p>
                <p className="mt-1 text-2xl font-semibold text-emerald-600">
                  ${totalPaid.toLocaleString()}.00
                </p>
              </div>
              <div className="rounded-2xl bg-background/70 p-4 text-center">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="mt-1 text-2xl font-semibold text-rose-500">
                  ${remaining.toLocaleString()}.00
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="flex items-center gap-2">
            <BookOpenText className="size-5 text-primary" />
            My Courses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-5">
          {coursePayments.map((item) => (
            <div
              key={`${item.title}-${item.semester}`}
              className="flex flex-col gap-4 rounded-2xl border bg-background/70 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-2">
                <div>
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.semester}</p>
                </div>
                <p className="text-sm">
                  Paid: {" "}
                  <span className="font-medium text-emerald-600">
                    ${item.paid.toLocaleString()}.00
                  </span>{" "}
                  Remaining: {" "}
                  <span className="font-medium text-rose-500">
                    ${item.remaining.toLocaleString()}.00
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                {item.status === "Paid" ? (
                  <CheckCircle2 className="size-5 text-emerald-500" />
                ) : (
                  <Clock3 className="size-5 text-amber-500" />
                )}
                <Badge
                  className={
                    item.status === "Paid"
                      ? "rounded-full bg-emerald-500 text-white hover:bg-emerald-500"
                      : "rounded-full bg-amber-500 text-white hover:bg-amber-500"
                  }
                >
                  {item.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="size-5 text-primary" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-5">
          {paymentHistory.map((item) => (
            <div
              key={`${item.date}-${item.description}`}
              className="flex flex-col gap-4 rounded-2xl border bg-background/70 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="size-6" />
                </div>
                <div>
                  <p className="font-semibold">{item.description}</p>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="size-4" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 md:text-right">
                <div>
                  <p className="text-lg font-semibold">
                    ${item.amount.toLocaleString()}.00
                  </p>
                  <Badge variant="secondary" className="rounded-full">
                    {item.method.toLowerCase()}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="size-4" />
                  Receipt
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

