"use client";

import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumbs } from "../breadcrumbs";
import { ModeToggle } from "../layout/theme-toggle/ThemeToggle";
import { ThemeSelector } from "../theme-selector";
import { studentProfile } from "@/lib/mock/student";

export function SiteHeader() {
  const pathname = usePathname();
  const isStudentRoute = pathname?.startsWith("/student");

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-13">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {isStudentRoute ? (
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="h-9 w-9 border">
              <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                {studentProfile.englishName
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Student dashboard
              </p>
              <p className="truncate text-sm font-medium">
                {studentProfile.accountName}
              </p>
            </div>
          </div>
        ) : (
          <Breadcrumbs />
        )}
      </div>
      <div className="flex items-center gap-2 px-4">
        <ModeToggle />
        <ThemeSelector />
      </div>
    </header>
  );
}
