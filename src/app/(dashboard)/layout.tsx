import { DashboardShell } from "@/components/layout/DashboardShell";

import { GamesProvider } from "@/context/GamesContext";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <GamesProvider>

      <DashboardShell>

        {children}

      </DashboardShell>

    </GamesProvider>

  );
}