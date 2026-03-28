"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Award,
  Bot,
  BookOpen,
  CalendarRange,
  CreditCard,
  GraduationCap,
  Settings,
  User2,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { NavMain } from "@/components/app-sidebar/NavMain";
import { NavUser } from "@/components/app-sidebar/NavUser";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { studentProfile } from "@/lib/mock/student";

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: Bot,
      isActive: true,
    },
    {
      title: "Enrollment",
      url: "/enrollment",
      icon: UserCheck,
      isActive: true,
    },
    {
      title: "Program",
      url: "",
      icon: BookOpen,
      items: [
        {
          title: "Master Program",
          url: "/master-program",
        },
        {
          title: "Opening Program",
          url: "/opening-program",
        },
      ],
    },
    {
      title: "Scholar",
      url: "",
      icon: GraduationCap,
      items: [
        {
          title: "Statistic",
          url: "/statistic",
        },
        {
          title: "Achievements",
          url: "/achievement",
        },
        {
          title: "Verification",
          url: "/verification",
        },
      ],
    },
    {
      title: "Certificate",
      url: "/certificate",
      icon: Award,
    },
    {
      title: "User",
      url: "/user",
      icon: User2,
    },
    {
      title: "Settings",
      url: "/setting",
      icon: Settings,
    },
  ],
};

const studentData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/student",
      icon: Bot,
    },
    {
      title: "Courses",
      url: "/student/courses",
      icon: BookOpen,
    },
    {
      title: "Schedule",
      url: "/student/schedule",
      icon: CalendarRange,
    },
    {
      title: "Achievements",
      url: "/student/achievements",
      icon: Award,
    },
    {
      title: "Certificates",
      url: "/student/certificates",
      icon: Award,
    },
    {
      title: "Payments",
      url: "/student/payments",
      icon: CreditCard,
    },
    {
      title: "Profile",
      url: "/student/profile",
      icon: User2,
    },
    {
      title: "Settings",
      url: "/student/settings",
      icon: Settings,
    },
  ],
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isStudentRoute = pathname?.startsWith("/student");
  const menuData = isStudentRoute ? studentData : data;

  return (
    <Sidebar className="z-50" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={isStudentRoute ? "/student" : "/"}>
                <span>
                  <Image
                    width={20}
                    height={20}
                    src="/favicon.ico"
                    alt="logo"
                    className="h-8 w-8"
                  />
                </span>
                <span className="text-base font-semibold">
                  {isStudentRoute ? "ISTAD Student" : "Experimental STAD"}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {isStudentRoute ? (
          <div className="mx-2 rounded-2xl border border-sidebar-border/60 bg-background/50 p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 rounded-lg">
                <AvatarFallback className="rounded-lg">CC</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {studentProfile.accountName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {studentProfile.email}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Badge variant="secondary" className="rounded-full">
                {studentProfile.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Public {studentProfile.isPublic ? "on" : "off"}
              </span>
            </div>
          </div>
        ) : (
          <NavUser />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}