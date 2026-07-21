import {
  CalendarDays,
  LayoutDashboard,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";


const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Jogos",
    url: "/jogos",
    icon: CalendarDays,
  },
  {
    title: "Times",
    url: "/times",
    icon: Users,
  },
  {
    title: "Quadras",
    url: "/quadras",
    icon: MapPin,
  },
  {
    title: "Resultados",
    url: "/resultados",
    icon: Trophy,
  },
];


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupLabel>
            Jogaê
          </SidebarGroupLabel>


          <SidebarGroupContent>

            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton>
                    <item.icon />

                    <span>
                      {item.title}
                    </span>

                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}