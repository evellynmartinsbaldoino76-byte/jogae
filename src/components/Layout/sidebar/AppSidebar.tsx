"use client";

import {
  CalendarDays,
  Home,
  Users,
  Clock3,
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
    url: "/agenda",
    icon: Clock3,
  },

];





export function AppSidebar() {


  return (

    <Sidebar

      className="
      border-r
      border-white/10
      bg-gradient-to-b
      from-[#061a16]
      via-[#071525]
      to-[#05070d]
      "

    >



      <SidebarContent

        className="
        bg-transparent
        "

      >



        <SidebarGroup>




          <SidebarGroupLabel

            className="
            px-5
            py-6
            text-xl
            font-bold
            text-white
            "

          >


            <span className="text-emerald-400">

              ⚽

            </span>


            <span className="ml-2">

              Jogaê

            </span>


          </SidebarGroupLabel>







          <SidebarGroupContent>


            <SidebarMenu>



              {items.map((item) => (


                <SidebarMenuItem

                  key={item.title}

                >




                  <SidebarMenuButton

                    className="
                    mx-3
                    rounded-xl
                    text-slate-300
                    transition-all
                    hover:bg-emerald-400/10
                    hover:text-emerald-400
                    "

                  >



                    <a

                      href={item.url}

                      className="
                      flex
                      w-full
                      items-center
                      gap-3
                      "

                    >



                      <item.icon

                        size={20}

                      />



                      <span>

                        {item.title}

                      </span>



                    </a>




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