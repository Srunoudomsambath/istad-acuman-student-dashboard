import Link from "next/link";
import { Eye } from "lucide-react";

import { BachelorSectionHeader } from "@/components/student/BachelorSectionHeader";
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

export default function ScholarshipCertificatesPage() {
  return (
    <div className="space-y-6">
      <BachelorSectionHeader
        title="Scholarship Certificates"
        description="Review certificates issued for your scholarship journey in one clean table."
      />

      <Card className="overflow-hidden border-border/60 bg-card/90 p-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                <TableHead className="w-12 pl-6 font-medium text-muted-foreground">#</TableHead>
                <TableHead className="font-medium text-muted-foreground">Certificate</TableHead>
                <TableHead className="font-medium text-muted-foreground">Type</TableHead>
                <TableHead className="font-medium text-muted-foreground">Issue Date</TableHead>
                <TableHead className="font-medium text-muted-foreground">Issued By</TableHead>
                <TableHead className="pr-6 text-right font-medium text-muted-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentCertificates.map((certificate, index) => (
                <TableRow key={certificate.uuid} className="group border-border/50 transition-colors hover:bg-muted/35">
                  <TableCell className="pl-6 font-medium text-muted-foreground">{String(index + 1).padStart(2, "0")}</TableCell>
                  <TableCell className="py-3.5 pr-2 font-medium text-foreground">
                    <div className="space-y-0.5">
                      <p className="leading-5">{certificate.title}</p>
                      <p className="text-[11px] text-muted-foreground">{certificate.certificateId}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize">
                      {certificate.certificateType}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-muted-foreground">{certificate.issuedAt}</TableCell>
                  <TableCell className="py-3.5 text-sm text-muted-foreground">{certificate.createdBy}</TableCell>
                  <TableCell className="pr-6 text-right">
                    <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-border/70 px-3 text-xs font-medium shadow-none transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
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
        </CardContent>
      </Card>
    </div>
  );
}
