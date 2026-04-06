import type { ReactNode } from "react";
import {
  CalendarClock,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGithub, FaTelegramPlane } from "react-icons/fa";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Scholar } from "@/lib/types/student";

type ProfileCardProps = {
  student: Scholar;
};

const normalizeLink = (value?: string) => {
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
};

export function ProfileCard({ student }: ProfileCardProps) {
  const socialLinks = [
    student.telegram
      ? {
          label: "Telegram",
          value: student.telegram,
          href: student.telegram.startsWith("@")
            ? `https://t.me/${student.telegram.slice(1)}`
            : normalizeLink(student.telegram),
          icon: <FaTelegramPlane className="size-4 text-sky-500" />,
        }
      : null,
    student.facebook
      ? {
          label: "Facebook",
          value: student.facebook,
          href: normalizeLink(student.facebook),
          icon: <FaFacebook className="size-4 text-blue-600" />,
        }
      : null,
    student.github
      ? {
          label: "GitHub",
          value: student.github,
          href: normalizeLink(student.github),
          icon: <FaGithub className="size-4 text-foreground" />,
        }
      : null,
    student.website
      ? {
          label: "Website",
          value: student.website,
          href: normalizeLink(student.website),
          icon: <Globe2 className="size-4 text-emerald-600" />,
        }
      : null,
  ].filter(Boolean) as Array<{
    label: string;
    value: string;
    href: string;
    icon: ReactNode;
  }>;

  return (
    <Card
      className={cn(
        "flex h-[calc(100vh-7rem)] max-h-[860px] min-h-0 flex-col overflow-hidden border-border/60 bg-card/80 shadow-sm"
      )}
    >
      <CardHeader className="shrink-0 space-y-3 border-b bg-muted/20 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border">
              {student.avatar ? (
                <Image
                  src={student.avatar}
                  alt={student.englishName}
                  width={88}
                  height={88}
                  className="rounded-full object-cover"
                />
              ) : (
                <AvatarFallback className="bg-primary/10 text-2xl font-semibold text-primary">
                  {student.englishName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="space-y-1">
              <CardTitle className="text-xl leading-tight">
                {student.englishName} - {student.khmerName}
              </CardTitle>

              <p className="text-sm text-muted-foreground">{student.email}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                <Badge>{student.gender}</Badge>
                <Badge variant="outline">{student.nickname || student.accountName}</Badge>
              </div>

              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="size-4" />
                Institute of Science and Technology Advanced Development
              </p>
            </div>
          </div>

          <Button asChild type="button" variant="outline" className="gap-2">
            <Link href="/student/settings">
              <PencilLine className="size-4" />
              Edit in settings
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-background/70 px-4 py-2.5">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="size-4 text-muted-foreground" />
            <span>{student.email}</span>
          </div>

          <Separator orientation="vertical" className="h-4" />

          <div className="flex items-center gap-2 text-sm">
            <Phone className="size-4 text-muted-foreground" />
            <span>{student.phone}</span>
          </div>

          <Separator orientation="vertical" className="h-4" />

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="size-4 text-muted-foreground" />
            <span>{student.currentAddress}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pr-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Quote className="size-4 text-primary" />
            Bio and quote
          </div>

          <p className="text-sm leading-6 text-muted-foreground">{student.bio}</p>

          <p className="text-sm italic text-foreground">&quot;{student.quote}&quot;</p>
        </div>

        <Separator className="bg-border/60" />

        {socialLinks.length > 0 ? (
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">Social</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border bg-muted/20 px-3 py-2 text-xs transition hover:bg-muted/30"
                >
                  <div className="flex items-center gap-1.5 text-foreground">
                    {item.icon}
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                  <p className="mt-1 break-all text-[11px] text-muted-foreground">{item.value}</p>
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <Separator className="bg-border/60" />

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl border bg-muted/20 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Created</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <CalendarClock className="size-4 text-muted-foreground" />
              <span>
                {student.createdAt} by <strong>{student.createdBy}</strong>
              </span>
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/20 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Updated</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <CalendarClock className="size-4 text-muted-foreground" />
              <span>
                {student.updatedAt} by <strong>{student.updatedBy}</strong>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


