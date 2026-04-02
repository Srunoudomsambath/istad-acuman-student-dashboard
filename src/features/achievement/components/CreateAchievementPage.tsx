"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import CreateAchievementForm from "./CreateAchievementForm";

export default function CreateAchievementPage() {
  return (
    <div className="space-y-6 p-1 sm:p-2">
      <div className="space-y-3">
        <Button asChild variant="ghost" className="w-fit px-0 hover:bg-transparent">
          <Link href="/student/achievements">
            <ArrowLeft className="size-4" />
            Back to achievements
          </Link>
        </Button>

        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Request Achievement
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Fill in your project details to request a new achievement for review.
          </p>
        </div>
      </div>

      <CreateAchievementForm />
    </div>
  );
}
