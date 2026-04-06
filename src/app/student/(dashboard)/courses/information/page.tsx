"use client";

import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type DocumentPage = {
  src: string;
  alt: string;
};

type InfoDocument = {
  id: string;
  title: string;
  description: string;
  pages: DocumentPage[];
};

type ImagePreviewState = {
  title: string;
  pageLabel: string;
  page: DocumentPage;
};

const generalAnnouncementLink = "https://t.me/+_1rRyHD9kA04OTFl";
const khmerFileTitle =
  "\u1794\u1791\u1794\u1789\u17D2\u1787\u17B6\u1795\u17D2\u1791\u17C3\u1780\u17D2\u1793\u17BB\u1784 2024 2025";
const replacementExamTitle =
  "\u1794\u1789\u17D2\u1789\u17B8\u179A\u17B6\u1799\u1793\u17B6\u1798\u1793\u17B7\u179F\u17D2\u179F\u17B7\u178F\u178A\u17C2\u179B\u178F\u17D2\u179A\u17BC\u179C\u1794\u17D2\u179A\u17A1\u1784\u179F\u1784 Y2S2";
const finalTermScheduleTitle = "Exam Schedule for Final Term Year 2 Semester 2";
const scheduleUpdateTitle = "Schedule Year 2 Semester 2 (Update)";

const informationDocuments: InfoDocument[] = [
  {
    id: "internal-rules",
    title: khmerFileTitle,
    description: "Internal rules document for the 2024 - 2025 academic year.",
    pages: [
      {
        src: "/information/s_sv45.jpg",
        alt: khmerFileTitle,
      },
    ],
  },
  {
    id: "blacklist",
    title: "Information for blacklist",
    description: "Blacklist announcement image shared with students.",
    pages: [
      {
        src: "/information/s_INFORMATION FOR BLACK LIST.png",
        alt: "Information for blacklist",
      },
    ],
  },
  {
    id: "final-term-schedule",
    title: finalTermScheduleTitle,
    description: "Final term exam schedule for Year 2 Semester 2.",
    pages: [
      {
        src: "/information/s_SV45-FINAL-Y2S2.jpg",
        alt: finalTermScheduleTitle,
      },
    ],
  },
  {
    id: "replacement-exam",
    title: replacementExamTitle,
    description: "Student list for replacement exam in Year 2 Semester 2.",
    pages: [
      {
        src: "/information/s_sv45-2.jpg",
        alt: "Replacement exam student list Y2S2 page 1",
      },
      {
        src: "/information/s_SV45_Y2S2_Page_1.jpg",
        alt: "Replacement exam student list Y2S2 page 2",
      },
    ],
  },
  {
    id: "schedule-update",
    title: scheduleUpdateTitle,
    description: "Updated schedule for Year 2 Semester 2.",
    pages: [
      {
        src: "/information/s_sv45.jpg",
        alt: scheduleUpdateTitle,
      },
    ],
  },
];

function TelegramIcon() {
  return <FaTelegramPlane className="h-[15px] w-[15px]" aria-hidden="true" />;
}

function fileExtension(src: string) {
  const cleanPath = src.split("?")[0] ?? src;
  const lastDot = cleanPath.lastIndexOf(".");
  return lastDot >= 0 ? cleanPath.slice(lastDot) : ".jpg";
}

function fileName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function downloadDocument(document: InfoDocument) {
  document.pages.forEach((page, index) => {
    const link = window.document.createElement("a");
    link.href = page.src;
    link.download =
      document.pages.length === 1
        ? `${fileName(document.title)}${fileExtension(page.src)}`
        : `${fileName(document.title)}-page-${index + 1}${fileExtension(page.src)}`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  });
}

export default function BachelorInformationPage() {
  const [preview, setPreview] = useState<ImagePreviewState | null>(null);

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Information
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Centralize announcements, rules, schedules, and supporting files.
          </p>
        </div>

        <Card className="overflow-hidden rounded-xl border border-border/70 bg-card py-0 shadow-none">
          <CardContent className="px-5 py-5 sm:px-6">
            <div className="flex items-start gap-4">
              <a
                href={generalAnnouncementLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2563eb]/18 text-[#2563eb] transition-colors hover:border-[#2563eb]/35 hover:bg-[#2563eb]/[0.05]"
              >
                <TelegramIcon />
              </a>
              <div className="space-y-1 pt-0.5">
                <p className="text-[15px] font-medium text-foreground">Channel Announcement</p>
                <a
                  href={generalAnnouncementLink}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-sm text-[#2563eb] hover:underline"
                >
                  {generalAnnouncementLink}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-xl border border-border/70 bg-card py-0 shadow-none">
          <CardContent className="p-0 py-0">
            <Accordion
              type="multiple"
              defaultValue={[informationDocuments[0].id]}
              className="divide-y divide-border/70"
            >
              {informationDocuments.map((document) => (
                <AccordionItem
                  key={document.id}
                  value={document.id}
                  className="border-b border-border/70 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-3 px-5 py-5 sm:px-6">
                    <AccordionTrigger className="py-0 text-[16px] font-medium text-foreground hover:no-underline data-[state=open]:bg-transparent [&>svg]:order-first [&>svg]:mr-4 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-primary [&>svg]:-rotate-90 [&[data-state=open]>svg]:rotate-0">
                      <div className="space-y-1 text-left">
                        <p>{document.title}</p>
                        <p className="text-sm font-normal text-muted-foreground">
                          {document.description}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <div className="flex shrink-0 items-center gap-2 pt-0.5">
                      <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[11px] font-medium">
                        {document.pages.length} {document.pages.length === 1 ? "page" : "pages"}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => downloadDocument(document)}>
                        <Download className="size-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <AccordionContent className="pb-0">
                    <div className="px-5 pb-6 sm:px-6">
                      <div className="space-y-3">
                        {document.pages.map((page, index) => {
                          const pageLabel = `${document.title} Page ${index + 1}`;

                          return (
                            <div
                              key={`${document.id}-page-${index + 1}`}
                              className="overflow-hidden rounded-xl border border-border/60 bg-muted/10"
                            >
                              <div className="border-b border-border/60 px-4 py-2 text-xs font-medium text-muted-foreground">
                                {pageLabel}
                              </div>
                              <button
                                type="button"
                                onClick={() => setPreview({ title: document.title, pageLabel, page })}
                                className="block w-full bg-muted/20 transition hover:bg-muted/30"
                              >
                                <Image
                                  src={page.src}
                                  alt={page.alt}
                                  width={1200}
                                  height={1700}
                                  className="mx-auto h-auto w-full max-w-[420px] bg-white object-contain"
                                />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <Dialog open={Boolean(preview)} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-auto p-4 sm:p-6">
          {preview ? (
            <div className="space-y-3">
              <div>
                <DialogTitle>{preview.title}</DialogTitle>
                <p className="text-sm text-muted-foreground">{preview.pageLabel}</p>
              </div>
              <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/10">
                <Image
                  src={preview.page.src}
                  alt={preview.page.alt}
                  width={1600}
                  height={2200}
                  className="mx-auto h-auto w-full max-w-4xl bg-white object-contain"
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
