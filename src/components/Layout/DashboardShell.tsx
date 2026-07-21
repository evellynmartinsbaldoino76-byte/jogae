import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./sidebar/AppSidebar";
import { Header } from "./header/Header";


export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>

      <AppSidebar />

      <main className="flex-1">

        <Header />

        <div className="p-6">
          {children}
        </div>

      </main>

    </SidebarProvider>
  );
}