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

const links = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Login",
    href: "/login",
  },
];
export function NavigationBar() {
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
                variant="link"
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
