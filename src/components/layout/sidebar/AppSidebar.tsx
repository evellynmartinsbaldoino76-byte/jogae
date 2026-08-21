"use client";

import {
  CalendarDays,
  Home,
  Users,
  Clock3,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

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
    icon: Home,
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
    title: "Agenda",
    url: "/agenda-v2",
    icon: Clock3,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar
      className="
        border-r
        border-white/10
        bg-[#050b12]/80
        backdrop-blur-xl
      "
    >
      <SidebarContent className="bg-transparent">
        <SidebarGroup>

          {/* LOGO */}

          <SidebarGroupLabel
            className="
              flex
              h-auto
              flex-col
              items-start
              px-6
              py-6
            "
          >
            <div className="flex items-center">
              <span
                className="
                  text-2xl
                  font-black
                  tracking-tight
                  text-white
                "
              >
                Joga
              </span>

              <span
                className="
                  text-2xl
                  font-black
                  tracking-tight
                  text-emerald-400
                "
              >
                ê
              </span>
            </div>

            <div
              className="
                mt-2
                h-1
                w-8
                rounded-full
                bg-emerald-400
              "
            />

            <span
              className="
                mt-3
                text-xs
                font-medium
                text-slate-400
              "
            >
              Organize seus jogos
            </span>
          </SidebarGroupLabel>

          {/* MENU */}

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  pathname === item.url;

                return (
                  <SidebarMenuItem
                    key={item.title}
                  >
                    <SidebarMenuButton
                      type="button"
                      onClick={() =>
                        router.push(item.url)
                      }
                      className={`
                        group
                        relative
                        mx-3
                        mb-2
                        h-11
                        w-[calc(100%-1.5rem)]
                        rounded-xl
                        transition-all
                        ${
                          active
                            ? `
                              bg-emerald-400/15
                              text-emerald-300
                              shadow-lg
                              shadow-emerald-500/10
                            `
                            : `
                              text-slate-300
                              hover:bg-white/5
                              hover:text-white
                            `
                        }
                      `}
                    >
                      {/* INDICADOR ATIVO */}

                      {active && (
                        <span
                          className="
                            absolute
                            left-0
                            h-8
                            w-1
                            rounded-full
                            bg-emerald-400
                          "
                        />
                      )}

                      {/* ÍCONE */}

                      <item.icon
                        size={20}
                        className={
                          active
                            ? "text-emerald-400"
                            : "text-slate-400 group-hover:text-emerald-300"
                        }
                      />

                      {/* TEXTO */}

                      <span className="font-medium">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}