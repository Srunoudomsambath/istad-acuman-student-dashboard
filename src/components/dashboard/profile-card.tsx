"use client";

import { useState } from "react";
import {
  CalendarClock,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  Quote,
  GraduationCap, // ✅ added
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Scholar } from "@/lib/types/student";
import Image from "next/image";

type ProfileCardProps = {
  student: Scholar;
};

export function ProfileCard({ student }: ProfileCardProps) {
  const [isPublic, setIsPublic] = useState(student.isPublic);
  const [editing, setEditing] = useState(false);

  return (
    <Card
      className={cn(
        "overflow-hidden border-border/60 bg-card/80 shadow-sm",
        editing && "ring-1 ring-primary/30"
      )}
    >
      <CardHeader className="space-y-4 border-b bg-muted/20">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-4">
          <Avatar className="w-24 h-24 border"> {/* increase Avatar size */}
  {student.avatar ? (
    <Image
      src={student.avatar}
      alt={student.englishName}
      width={100}         // match Avatar wrapper
      height={100}        // match Avatar wrapper
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
              <CardTitle className="text-2xl leading-tight">
                {student.englishName} - {student.khmerName}
              </CardTitle>

             

              <p className="text-sm text-muted-foreground">
                {student.email}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <Badge>{student.gender}</Badge>
                <Badge variant="secondary">{student.status}</Badge>
                <Badge variant="outline">{student.accountName}</Badge>
              </div>
               {/* ✅ UNIVERSITY ADDED HERE */}
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="size-4" />
                Institute of Science and Technology Advanced Development 
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => setEditing((current) => !current)}
          >
            <PencilLine className="size-4 " />
            {editing ? "Disable Edit" : "Enable Edit"}
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-background/70 px-4 py-3">
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

      <CardContent className="space-y-5 p-5">
        {/* VISIBILITY */}
        <div className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4">
          <div>
            <p className="text-sm font-medium">Visibility</p>
            <p className="text-xs text-muted-foreground">
              Profile is currently{" "}
              <span className="font-semibold">
                {student.isPublic ? "Public" : "Private"}
              </span>
            </p>
          </div>
        </div>

        {/* BIO */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Quote className="size-4 text-primary" />
            Bio and quote
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            {student.bio}
          </p>

          <p className="text-sm italic text-foreground">
            &quot;{student.quote}&quot;
          </p>
        </div>

        {/* META */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border bg-muted/20 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Created
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <CalendarClock className="size-4 text-muted-foreground" />
              <span>
                {student.createdAt} by <strong>{student.createdBy}</strong>
              </span>
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/20 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Updated
            </p>
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