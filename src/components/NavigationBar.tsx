"use client";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
});
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ButtonVariant =
  | "link"
  | "secondary"
  | "default"
  | "destructive"
  | "outline"
  | "ghost";
// Guarenteed that ButtonType is one of these

interface NavLink {
  name: string;
  href: string;
  buttonType: ButtonVariant;
}

export function NavigationBar() {
  const [isUser, setIsUser] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setIsUser(true);
      }
    };
    getUser();
  }, [supabase]);

  const links: NavLink[] = [
    { name: "About", href: "/about", buttonType: "link" },
    {
      name: isUser ? "Dashboard" : "Login",
      href: isUser ? "/dashboard" : "/login",
      buttonType: isUser ? "secondary" : "link",
    },
  ];

  const pathname = usePathname();
  return (
    <div className={`${montserrat.className} min-h-16 border-b`}>
      <div className="flex flex-row w-full justify-between items-center h-full px-4">
        <Link href="/" className="flex flex-row items-center">
          <Image
            src="/ClassPlanLogo.png"
            width={40}
            height={40}
            alt="ClassPlan Logo"
          />
          <h1 className="text-xl ml-2">
            <strong>Class</strong>Plan
          </h1>
        </Link>
        <div>
          {links.map((link) => {
            return (
              <Button
                key={link.name}
                variant={link.buttonType}
                className={clsx("mx-10", {
                  "text-blue-400": pathname === link.href,
                })}
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
