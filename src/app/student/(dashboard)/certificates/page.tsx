import Link from "next/link";
import { BadgeCheck, Eye, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { studentCertificates } from "@/lib/mock/certificates";

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm">
        <CardContent className="p-6 space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">My All Certificate</span>
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full">Dashboard</Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Certificate
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Certificate
                </p>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl leading-tight">
                  Track your official certificates in one place
                </h2>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                  View your issued certificate ID, type, and issue date with a clean
                  student dashboard layout.
                </p>
              </div>

              <blockquote className="rounded-xl border bg-muted/40 px-4 py-3 text-sm leading-relaxed">
                Certificates are a record of completed learning achievements.
              </blockquote>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border bg-primary/10 text-primary shadow-sm">
                <FileText className="size-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="flex items-center gap-2">
            <BadgeCheck className="size-5 text-primary" />
            Certificate Records
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="rounded-2xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate</TableHead>
                  <TableHead>Certificate ID</TableHead>
                  <TableHead>Certificate Type</TableHead>
                  <TableHead>Certificate Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentCertificates.map((certificate, index) => (
                  <TableRow key={certificate.certificateId}>
                    <TableCell className="font-medium">{certificate.title}</TableCell>
                    <TableCell>{certificate.certificateId}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {certificate.certificateType}
                      </Badge>
                    </TableCell>
                    <TableCell>{certificate.issuedAt}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm" className="gap-2">
                        <Link href={`/student/certificates/view/${index + 1}`}>
                          <Eye className="size-4" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
