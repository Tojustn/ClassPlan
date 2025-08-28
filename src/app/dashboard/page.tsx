import Calendar from "@/components/Calendar";
import { createClient } from "@/lib/supabase/server";

export default function DashboardPage() {
  return (
    <div className="min-h-full flex flex-row mx-5">
      <Calendar className="min-w-full flex-1 "></Calendar>
    </div>
  );
}
