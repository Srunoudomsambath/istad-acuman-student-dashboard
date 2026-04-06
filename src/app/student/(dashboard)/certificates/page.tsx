import Link from "next/link";
import { Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  const totalCertificates = studentCertificates.length;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 text-[11px] font-semibold"
          >
            My Certificates
          </Badge>
          <span>View your issued certificates in one place.</span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Certificates
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            A clean, compact list of your official certificates with the essential details.
          </p>
        </div>
      </div>

      <Card className="overflow-hidden border-border/60 bg-card/90 p-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                <TableHead className="pl-6 font-medium text-muted-foreground">
                  Certificate
                </TableHead>
                <TableHead className="font-medium text-muted-foreground">
                  Type
                </TableHead>
                <TableHead className="font-medium text-muted-foreground">
                  Issue Date
                </TableHead>
                <TableHead className="font-medium text-muted-foreground">
                  Issued By
                </TableHead>
                <TableHead className="pr-6 text-right font-medium text-muted-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {studentCertificates.map((certificate, index) => (
                <TableRow
                  key={certificate.uuid}
                  className="group border-border/50 transition-colors hover:bg-muted/35"
                >
                  <TableCell className="py-3.5 pl-6 pr-2 font-medium text-foreground">
                    <div className="space-y-0.5">
                      <p className="leading-5">{certificate.title}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {certificate.certificateId}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="py-3.5">
                    <Badge
                      variant="secondary"
                      className="rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize"
                    >
                      {certificate.certificateType}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-3.5 text-sm text-muted-foreground">
                    {certificate.issuedAt}
                  </TableCell>

                  <TableCell className="py-3.5 text-sm text-muted-foreground">
                    {certificate.createdBy ?? certificate.platformName}
                  </TableCell>

                  <TableCell className="pr-6 text-right">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1.5 rounded-lg border-border/70 px-3 text-xs font-medium shadow-none transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    >
                      <Link href={`/student/certificates/view/${index + 1}`}>
                        <Eye className="size-3.5" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-col gap-1 border-t border-border/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {totalCertificates}
              </span>{" "}
              record{totalCertificates !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-muted-foreground">
              All certificates are official and ready to view
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
