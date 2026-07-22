"use client";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "./sidebar/AppSidebar";

export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>

      <div
        className="
          flex
          min-h-screen
          w-full
          bg-gradient-to-br
          from-[#061a16]
          via-[#071525]
          to-[#05070d]
        "
      >

        <AppSidebar />

        <main className="flex-1">

          <header
            className="
              flex
              h-16
              items-center
              border-b
              border-white/10
              px-4
            "
          >
            <SidebarTrigger />
          </header>

          <div className="p-6">
            {children}
          </div>

        </main>

      </div>

    </SidebarProvider>
  );
}