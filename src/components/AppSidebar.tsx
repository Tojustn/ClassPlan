"use client";
import { Home, Notebook, UserCog, Brain, Bot } from "lucide-react";

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
import { ShineBorder } from "./magicui/shine-border";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { RainbowButton } from "./magicui/rainbow-button";
import { generate_study_plan } from "@/lib/ai/generate_study_plan";
import { useAiLoading } from "@/components/AiLoadingContext";

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
  const { setAiLoading } = useAiLoading();

  const handleGenerateStudyPlan = async () => {
    try {
      setAiLoading(true);
      await generate_study_plan();
      // Refresh the page to show new events
      window.location.reload();
    } catch (error) {
      console.error("Failed to generate study plan:", error);
    } finally {
      setAiLoading(false);
    }
  };

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
            <SidebarMenu className="flex flex-col gap-2 min-h-full">
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
              <div className="mt-6">
                <RainbowButton
                  variant="outline"
                  className="flex items-center gap-2 w-full"
                  onClick={handleGenerateStudyPlan}
                >
                  <Bot />
                  Generate Study Blocks
                </RainbowButton>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
