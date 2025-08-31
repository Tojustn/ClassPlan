"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Loader2 } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAiLoading } from "@/components/AiLoadingContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { aiLoading, setAiLoading } = useAiLoading();

  return (
    <div
      className={`h-screen flex ${geistSans.variable} ${geistMono.variable}`}
    >
      {aiLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <SidebarTrigger />
            <div className="flex-1 overflow-y-auto">{children}</div>
          </main>
        </SidebarProvider>
      )}
    </div>
  );
}
