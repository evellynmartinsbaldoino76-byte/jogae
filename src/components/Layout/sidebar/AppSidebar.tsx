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

    <Sidebar>


      <SidebarContent>


        <SidebarGroup>


          <SidebarGroupLabel>
            Jogaê ⚽
          </SidebarGroupLabel>




          <SidebarGroupContent>


            <SidebarMenu>



              {items.map((item) => (


                <SidebarMenuItem

                  key={item.title}

                >



                  <SidebarMenuButton>


                    <a

                      href={item.url}

                      className="flex items-center gap-2"

                    >


                      <item.icon />


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