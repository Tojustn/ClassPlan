import "../globals.css";
import { NavigationBar } from "@/components/NavigationBar";

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
