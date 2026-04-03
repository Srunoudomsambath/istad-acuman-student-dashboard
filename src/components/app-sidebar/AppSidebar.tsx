"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  CreditCard,
  FileBadge2,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings2,
  User2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  useGetCurrentStudentProfileQuery,
  useGetStudentEnrollmentsQuery,
} from "@/features/student-portal/studentPortalApi";
import { getCourseBySlug } from "@/lib/mock/courses";
import { getExstadLearningDetailBySlug } from "@/lib/mock/exstad-courses";
import { studentProfile } from "@/lib/mock/student";
import type { StudentEnrollment } from "@/lib/types/student";

type NavChild = {
  title: string;
  url: string;
};

type NavItem = {
  title: string;
  url?: string;
  icon: LucideIcon;
  items?: NavChild[];
};

type NavGroup = {
  label?: string;
  items: NavItem[];
};

type ProgramSidebarItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const STUDENT_COURSES_BASE = "/student/courses";
const STUDENT_SCHOLARSHIP_BASE = "/student/scholarships";
const PROGRAM_SECTIONS = new Set([
  "certificates",
  "achievements",
  "participants",
  "payments",
]);

const bachelorSidebarItems: ProgramSidebarItem[] = [
  {
    title: "Overview",
    url: "/student/courses",
    icon: BookOpen,
  },
  {
    title: "Information",
    url: "/student/courses/information",
    icon: FolderOpen,
  },
  {
    title: "Certificates",
    url: "/student/courses/certificates",
    icon: BadgeCheck,
  },
  {
    title: "Achievements",
    url: "/student/courses/achievements",
    icon: Award,
  },
  {
    title: "Participants",
    url: "/student/courses/participants",
    icon: Users,
  },
  {
    title: "Payments",
    url: "/student/courses/payments",
    icon: CreditCard,
  },
];

const scholarshipSidebarItems = (slug: string): ProgramSidebarItem[] => [
  {
    title: "Overview",
    url: `/student/scholarships/${slug}`,
    icon: BookOpen,
  },
  {
    title: "Certificates",
    url: `/student/scholarships/${slug}/certificates`,
    icon: BadgeCheck,
  },
  {
    title: "Achievements",
    url: `/student/scholarships/${slug}/achievements`,
    icon: Award,
  },
  {
    title: "Participants",
    url: `/student/scholarships/${slug}/participants`,
    icon: Users,
  },
  {
    title: "Payments",
    url: `/student/scholarships/${slug}/payments`,
    icon: CreditCard,
  },
];

const data = {
  user: {
    name: "Tong Bora",
    email: "tongbora.official@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/test",
      icon: LayoutDashboard,
    },
    {
      title: "Program",
      url: "/test",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Our Program",
          url: "/test",
        },
        {
          title: "Opening Program",
          url: "/test",
        },
      ],
    },
    {
      title: "Scholar",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "Statistics",
          url: "/test",
        },
        {
          title: "Achievement",
          url: "/test",
        },
        {
          title: "Verification",
          url: "/test",
        },
      ],
    },
    {
      title: "Transcript",
      url: "/test",
      icon: FileBadge2,
    },
    {
      title: "Enrollment",
      url: "/test",
      icon: User2,
    },
    {
      title: "Certificate",
      url: "/test",
      icon: BadgeCheck,
    },
    {
      title: "User",
      url: "/test",
      icon: User2,
    },
    {
      title: "Settings",
      url: "/test",
      icon: Settings2,
    },
  ],
};

function createStudentNavGroups(enrollments: StudentEnrollment[]): NavGroup[] {
  return [
    {
      label: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/student",
          icon: LayoutDashboard,
        },
        {
          title: "Calendar",
          url: "/student/schedule",
          icon: Calendar,
        },
      ],
    },
    {
      label: "Study",
      items: [
        {
          title: "Courses",
          icon: BookOpen,
          items: enrollments.map((enrollment) => ({
            title: enrollment.title,
            url: enrollment.url,
          })),
        },
        {
          title: "Records",
          icon: GraduationCap,
          items: [
            {
              title: "Achievements",
              url: "/student/achievements",
            },
            {
              title: "Certificates",
              url: "/student/certificates",
            },
          ],
        },
      ],
    },
    {
      label: "Finance",
      items: [
        {
          title: "Payments",
          url: "/student/payments",
          icon: CreditCard,
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          title: "Profile",
          url: "/student/profile",
          icon: User2,
        },
        {
          title: "Settings",
          url: "/student/settings",
          icon: Settings2,
        },
      ],
    },
  ];
}

function findActiveRoute(pathname: string, navGroups: NavGroup[]) {
  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.items?.some((subItem) => subItem.url === pathname)) {
        return item.title;
      }
    }
  }

  return null;
}

function getBachelorRouteContext(pathname: string) {
  if (!pathname.startsWith(STUDENT_COURSES_BASE)) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const section = segments[2];

  if (!section) {
    return {
      activeCourse: null,
      isOverview: true,
    };
  }

  if (PROGRAM_SECTIONS.has(section)) {
    return {
      activeCourse: null,
      isOverview: false,
    };
  }

  return {
    activeCourse: getCourseBySlug(section) ?? null,
    isOverview: true,
  };
}

function getScholarshipRouteContext(pathname: string) {
  if (!pathname.startsWith(STUDENT_SCHOLARSHIP_BASE)) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[2];
  const section = segments[3];

  if (!slug) {
    return null;
  }

  return {
    activeScholarship: getExstadLearningDetailBySlug(slug),
    slug,
    isOverview: !section,
  };
}

function isProgramItemActive(pathname: string, url: string) {
  if (pathname.startsWith(STUDENT_COURSES_BASE) && url === STUDENT_COURSES_BASE) {
    const context = getBachelorRouteContext(pathname);
    return Boolean(context?.isOverview);
  }

  if (pathname.startsWith(STUDENT_SCHOLARSHIP_BASE)) {
    const context = getScholarshipRouteContext(pathname);
    if (context && url === `/student/scholarships/${context.slug}`) {
      return context.isOverview;
    }
  }

  return pathname === url;
}

function StudentSidebarHeader() {
  return (
    <SidebarHeader className="px-4 pt-6">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="ISTAD Student" className="gap-3">
            <Link href="/student">
              <Image
                src="/logo/exSTAD.png"
                alt="ISTAD"
                width={24}
                height={24}
                className="size-6"
              />
              <span className="font-semibold">ISTAD Student</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

function StudentSidebarFooter() {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { data: profile = studentProfile } = useGetCurrentStudentProfileQuery();

  return (
    <SidebarFooter className="px-4 pb-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="rounded-2xl transition-colors duration-300 ease-out data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={profile.avatar} alt={profile.englishName} />
                  <AvatarFallback className="rounded-lg">
                    {profile.englishName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{profile.accountName}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {profile.email}
                  </span>
                </div>
                <Badge variant="secondary" className="ml-1 rounded-full">
                  {profile.status}
                </Badge>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="px-1 py-1.5">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={profile.avatar} alt={profile.englishName} />
                      <AvatarFallback className="rounded-lg">
                        {profile.englishName
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{profile.englishName}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {profile.email}
                      </span>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/student/profile")}>
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/student/payments")}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/student")}>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

function StudentSidebar() {
  const pathname = usePathname();
  const { data: enrollments = studentProfile.enrollments } =
    useGetStudentEnrollmentsQuery();
  const studentNavGroups = React.useMemo(
    () => createStudentNavGroups(enrollments),
    [enrollments]
  );
  const activeRoute = findActiveRoute(pathname, studentNavGroups);

  return (
    <Sidebar collapsible="icon" className="z-50">
      <StudentSidebarHeader />

      <SidebarContent className="mt-4 overflow-x-hidden">
        {studentNavGroups.map((group) => (
          <SidebarGroup key={group.label || "ungrouped"} className="py-0">
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarMenu>
              {group.items.map((item) => {
                const hasSubmenu = !!item.items?.length;
                const Icon = item.icon;
                const defaultOpen =
                  item.title === "Courses" ||
                  item.title === "Records" ||
                  activeRoute === item.title;

                if (hasSubmenu) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={defaultOpen}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className="rounded-2xl transition-colors duration-300 ease-out data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                          >
                            <Icon className="mr-2" />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto size-4 transition-transform duration-500 ease-out group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-[accordion-up_400ms_cubic-bezier(0.16,1,0.3,1)] data-[state=open]:animate-[accordion-down_400ms_cubic-bezier(0.16,1,0.3,1)]">
                          <SidebarMenuSub className="mt-1">
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                      className="rounded-2xl transition-colors duration-300 ease-out"
                    >
                      <Link href={item.url || "/student"}>
                        <Icon className="mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <StudentSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}

function BachelorProgramSidebar() {
  const pathname = usePathname();
  const context = getBachelorRouteContext(pathname);

  return (
    <Sidebar collapsible="icon" className="z-50">
      <StudentSidebarHeader />

      <SidebarContent className="mt-4 overflow-x-hidden px-2">
        <SidebarGroup className="pt-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="rounded-2xl bg-sidebar-accent/60 px-3 py-3 text-base font-medium"
              >
                <Link href="/student">
                  <ArrowLeft className="size-4" />
                  <span>Bachelor</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="pt-1">
          <SidebarGroupLabel className="px-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/80">
            {context?.activeCourse ? context.activeCourse.title : "Program Menu"}
          </SidebarGroupLabel>
          <SidebarMenu>
            {bachelorSidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isProgramItemActive(pathname, item.url)}
                    tooltip={item.title}
                    className="rounded-2xl px-3 py-3 text-[15px] transition-colors duration-300 ease-out"
                  >
                    <Link href={item.url}>
                      <Icon className="mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <StudentSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}

function ScholarshipProgramSidebar() {
  const pathname = usePathname();
  const context = getScholarshipRouteContext(pathname);

  if (!context) {
    return <StudentSidebar />;
  }

  const items = scholarshipSidebarItems(context.slug);

  return (
    <Sidebar collapsible="icon" className="z-50">
      <StudentSidebarHeader />

      <SidebarContent className="mt-4 overflow-x-hidden px-2">
        <SidebarGroup className="pt-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="rounded-2xl bg-sidebar-accent/60 px-3 py-3 text-base font-medium"
              >
                <Link href="/student">
                  <ArrowLeft className="size-4" />
                  <span>{context.activeScholarship?.title ?? "Scholarship"}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="pt-1">
          <SidebarGroupLabel className="px-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/80">
            {context.activeScholarship?.track ?? "Scholarship Menu"}
          </SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isProgramItemActive(pathname, item.url)}
                    tooltip={item.title}
                    className="rounded-2xl px-3 py-3 text-[15px] transition-colors duration-300 ease-out"
                  >
                    <Link href={item.url}>
                      <Icon className="mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <StudentSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isStudentRoute = pathname?.startsWith("/student");
  const isBachelorProgramRoute = pathname?.startsWith(STUDENT_COURSES_BASE);
  const isScholarshipProgramRoute = pathname?.startsWith(STUDENT_SCHOLARSHIP_BASE);

  if (isBachelorProgramRoute) {
    return <BachelorProgramSidebar />;
  }

  if (isScholarshipProgramRoute) {
    return <ScholarshipProgramSidebar />;
  }

  if (isStudentRoute) {
    return <StudentSidebar />;
  }

  return (
    <Sidebar className="z-50" collapsible="icon" {...props}>
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-2 ">
        <Link href="/">
          <Image
            src="/logo/exstad.png"
            alt="Logo"
            width={50}
            height={50}
            className="ml-4"
          />
        </Link>
      </div>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}











