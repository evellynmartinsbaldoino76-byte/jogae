import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "./sidebar/AppSidebar";


export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>

      <AppSidebar />

      <main className="flex-1">

        <div className="flex items-center h-14 border-b px-4">
          <SidebarTrigger />
        </div>

        <div className="p-6">
          {children}
        </div>

      </main>

    </SidebarProvider>
  );
}