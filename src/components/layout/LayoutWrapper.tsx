"use client";
import AppSidebar from "@/components/app-sidebar/AppSidebar";
import { SiteHeader } from "@/components/app-sidebar/SiteHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";
import React from "react";
import { Toaster } from "sonner";
import { ScrollArea } from "../ui/scroll-area";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const noLayout = ["/unauthorized", "/login"];
  const pathname = usePathname();
  const preference = useAppSelector((state) => state.preference);
  const isStudentRoute = pathname?.startsWith("/student");
  const isStudentProfileRoute = pathname === "/student/profile";

  return (
    <>
      {noLayout.includes(pathname) ? (
        children
      ) : (
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <main className="h-screen w-full overflow-hidden">
            <SiteHeader />
            {isStudentProfileRoute ? (
              <div className="h-[calc(100vh-4rem)] overflow-hidden">
                <div className="h-full p-6 overflow-hidden">{children}</div>
              </div>
            ) : (
              <ScrollArea className="h-content">
                <div className={isStudentRoute ? "h-full p-6" : "h-full"}>
                  {children}
                </div>
              </ScrollArea>
            )}
            <Toaster
              duration={preference.toast?.duration}
              expand={preference.toast?.expand}
              closeButton={preference.toast?.closeButton}
              richColors={preference.toast?.richColor}
              position={preference.toast?.position ?? "top-right"}
            />
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
