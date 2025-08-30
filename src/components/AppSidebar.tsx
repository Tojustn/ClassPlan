"use client";
import { Home, Notebook, UserCog, Brain } from "lucide-react";

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

import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Study Preferences",
    url: "/dashboard/preferences",
    icon: Brain,
  },
  {
    title: "Classes",
    url: "/dashboard/classes",
    icon: Notebook,
  },

  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: UserCog,
  },
];

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
export function AppSidebar() {
  const pathname = usePathname();
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
                <SidebarMenuItem
                  key={item.title}
                  className={clsx("my-1", {
                    "text-blue-400": pathname === item.url,
                  })}
                >
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
