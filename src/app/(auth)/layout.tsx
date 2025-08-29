import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NavigationBar } from "@/components/NavigationBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen md:overflow-hidden flex flex-col">
      <NavigationBar />
      <div className="flex-grow md:overflow-y-auto ">{children}</div>
    </div>
  );
}
