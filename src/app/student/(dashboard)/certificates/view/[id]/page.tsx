import Image from "next/image";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CertificateActions } from "@/components/dashboard/certificate-actions";
import { studentCertificates } from "@/lib/mock/certificates";

type CertificateViewPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return studentCertificates.map((certificate, index) => ({
    id: String(index + 1),
  }));
}

export default function CertificateViewPage({ params }: CertificateViewPageProps) {
  const numericIndex = Number(params.id);
  const certificate =
    Number.isInteger(numericIndex) && numericIndex > 0
      ? studentCertificates[numericIndex - 1]
      : studentCertificates.find((item) => item.certificateId === params.id);

  if (!certificate) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1 print:hidden">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full">Dashboard</Badge>
            <Badge variant="secondary" className="rounded-full">
              Certificate
            </Badge>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Certificate View
          </h1>
          <p className="text-sm text-muted-foreground">
            {certificate.title} - {certificate.certificateId}
          </p>
        </div>

        <CertificateActions
          downloadUrl={certificate.backgroundImage}
          downloadName={`${certificate.certificateId}.jpg`}
        />
      </div>

      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3 rounded-2xl border bg-muted/20 px-4 py-3 text-sm text-muted-foreground print:hidden">
            <p>
              Full certificate preview for <span className="font-medium text-foreground">{certificate.studentName}</span>
            </p>
            <p className="hidden sm:block">{certificate.issuedAt}</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border bg-white p-3 shadow-inner sm:p-4 print:overflow-visible print:border-0 print:bg-transparent print:p-0 print:shadow-none">
            <div className="flex min-w-[980px] justify-center print:min-w-0">
              <div className="relative overflow-hidden rounded-[1.5rem] border bg-white shadow-[0_25px_70px_rgba(15,23,42,0.18)] print:border-0 print:shadow-none">
                <Image
                  src={certificate.backgroundImage}
                  alt={`${certificate.title} certificate`}
                  width={1100}
                  height={770}
                  priority
                  sizes="(max-width: 1280px) 100vw, 1100px"
                  className="h-auto w-[1100px] max-w-none select-none object-contain print:w-full"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 print:hidden">
            <div className="rounded-2xl border bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Program
              </p>
              <p className="mt-2 font-semibold">{certificate.courseCode}</p>
            </div>
            <div className="rounded-2xl border bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Student
              </p>
              <p className="mt-2 font-semibold">{certificate.studentName}</p>
            </div>
            <div className="rounded-2xl border bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                ID
              </p>
              <p className="mt-2 font-semibold">{certificate.certificateId}</p>
            </div>
            <div className="rounded-2xl border bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Type
              </p>
              <p className="mt-2 font-semibold capitalize">
                {certificate.certificateType}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
