"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import fetchUserProfile from "@/lib/db/fetch_user_profile";
export default function ClassesPage() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    setUser(fetchUserProfile());
  }, []);

  return (
    <div className="min-h-full flex flex-col md:mx-40">
      <h1 className="text-2xl">
        <strong>User Settings</strong>
      </h1>
      <Label>Username</Label>
      <h3></h3>
    </div>
  );
}
