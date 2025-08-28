import { Home, Notebook, UserCog } from "lucide-react";

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

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Classes",
    url: "#",
    icon: Notebook,
  },

  {
    title: "Settings",
    url: "#",
    icon: UserCog,
  },
];

import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link
              href="/"
              className="flex flex-row justify-center items-center text-xl "
            >
              <Image
                src="/ClassPlanLogoSlim.png"
                alt="ClassPlan Logo"
                width={32}
                height={32}
              ></Image>
              <strong>Class</strong>Plan
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="my-5">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="my-1">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
