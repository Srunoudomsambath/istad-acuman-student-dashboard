"use client";

import Link from "next/link";
import { Download, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

type CertificateActionsProps = {
  downloadUrl: string;
  downloadName: string;
};

export function CertificateActions({
  downloadUrl,
  downloadName,
}: CertificateActionsProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = downloadName;
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="flex items-center gap-2 print:hidden">
      <Button variant="outline" asChild>
        <Link href="/student/certificates" className="gap-2">
          Back
        </Link>
      </Button>
      <Button variant="outline" className="gap-2" onClick={handlePrint}>
        <Printer className="size-4" />
        Print
      </Button>
      <Button className="gap-2" onClick={handleDownload}>
        <Download className="size-4" />
        Download
      </Button>
    </div>
  );
}
