"use client";

import { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { FaFilePdf, FaTelegramPlane } from "react-icons/fa";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { getExstadLearningDetailBySlug } from "@/lib/mock/exstad-courses";

type InfoGroup = {
  id: string;
  title: string;
};

type ImagePreview = {
  src: string;
  alt: string;
};

const generalAnnouncementLink = "https://t.me/+_1rRyHD9kA04OTFl";
const scholarshipInfoImage = "/information/s_INFORMATION FOR BLACK LIST.png";
const scholarshipFileTitle =
  "ITP - Spring Microservices Curriculum - V1.pdf";
const scholarshipGalleryTitle = "Scholarship Learning Highlights";

const scholarshipImages: ImagePreview[] = [
  {
    src: "/information/s_sv45-2.jpg",
    alt: "Scholarship learning highlight 1",
  },
  {
    src: "/information/s_SV45_Y2S2_Page_1.jpg",
    alt: "Scholarship learning highlight 2",
  },
];

function TelegramIcon() {
  return <FaTelegramPlane className="h-[15px] w-[15px]" aria-hidden="true" />;
}

function ImageGrid({ images }: { images: ImagePreview[] }) {
  return (
    <div className="grid gap-4">
      {images.map((image) => (
        <a
          key={image.src}
          href={image.src}
          target="_blank"
          rel="noreferrer"
          className="overflow-hidden rounded-xl border border-border/70 bg-card transition hover:opacity-95"
        >
          <img src={image.src} alt={image.alt} className="h-auto w-full object-contain" />
        </a>
      ))}
    </div>
  );
}

export default function ScholarshipInformationPage({ params }: { params: { slug: string } }) {
  const detail = getExstadLearningDetailBySlug(params.slug);

  if (!detail) {
    notFound();
  }

  const infoGroups = useMemo<InfoGroup[]>(
    () => [
      { id: "general", title: "General" },
      { id: "highlights", title: scholarshipGalleryTitle },
      { id: "files", title: "Files" },
    ],
    []
  );

  const defaultOpen = ["general"];
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);
  const allTopicIds = infoGroups.map((group) => group.id);
  const areAllTopicsOpen = allTopicIds.every((id) => openItems.includes(id));
  const fileItems = detail.curriculum.filter((item) => item.type === "File");

  function handleToggleAll(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setOpenItems(areAllTopicsOpen ? [] : allTopicIds);
  }

  return (
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
        <CardContent className="p-0 py-0">
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="divide-y divide-border/70"
          >
            {infoGroups.map((group, index) => (
              <AccordionItem
                key={group.id}
                value={group.id}
                className="border-b border-border/70 last:border-b-0"
              >
                <AccordionTrigger className="px-5 py-5 text-[16px] font-medium text-foreground hover:no-underline data-[state=open]:bg-muted/20 [&>svg]:order-first [&>svg]:mr-4 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-[#2563eb] [&>svg]:-rotate-90 [&[data-state=open]>svg]:rotate-0 sm:px-6">
                  <div className="flex w-full items-center justify-between gap-4 text-left">
                    <p>{group.title}</p>
                    {index === 0 ? (
                      <button
                        type="button"
                        onClick={handleToggleAll}
                        className="pr-2 text-[14px] font-medium text-[#2563eb]"
                      >
                        {areAllTopicsOpen ? "Collapse all" : "Expand all"}
                      </button>
                    ) : null}
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-0">
                  {group.id === "general" ? (
                    <div className="space-y-0 px-5 pb-6 sm:px-6">
                      <div className="border-t border-border/70 py-6">
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
                          <p className="pt-1 text-[15px] leading-7 text-foreground">
                            <span>Channel Announcement: </span>
                            <a
                              href={generalAnnouncementLink}
                              target="_blank"
                              rel="noreferrer"
                              className="break-all text-[#2563eb] hover:underline"
                            >
                              {generalAnnouncementLink}
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-border/70 py-6">
                        <div className="mb-5 flex items-center gap-4">
                          <div className="h-7 w-1 bg-muted-foreground/50" />
                          <h3 className="text-[15px] font-semibold text-foreground sm:text-[16px]">
                            {detail.title}
                          </h3>
                        </div>

                        <div className="mx-auto max-w-[520px] overflow-hidden rounded-sm bg-card">
                          <img
                            src={scholarshipInfoImage}
                            alt={detail.title}
                            className="h-auto w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  ) : group.id === "highlights" ? (
                    <div className="px-5 pb-6 sm:px-6">
                      <div className="border-t border-border/70 py-6">
                        <div className="mx-auto max-w-[760px]">
                          <ImageGrid images={scholarshipImages} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-0 px-5 pb-6 sm:px-6">
                      <div className="border-t border-border/70 pt-6 space-y-3">
                        {fileItems.length > 0 ? (
                          fileItems.map((item) => (
                            <a
                              key={item.uuid}
                              href={item.href}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-4 text-[#2563eb]"
                            >
                              <FaFilePdf className="h-8 w-8 shrink-0 text-[#2563eb]" aria-hidden="true" />
                              <p className="text-[15px] font-medium text-foreground">{item.title}</p>
                            </a>
                          ))
                        ) : (
                          <div className="flex items-center gap-4 text-[#2563eb]">
                            <FaFilePdf className="h-8 w-8 shrink-0 text-[#2563eb]" aria-hidden="true" />
                            <p className="text-[15px] font-medium text-foreground">{scholarshipFileTitle}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}




