import Calendar from "@/components/Calendar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OnboardingCard from "@/components/OnboardingCard";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const user = userData.user;
  if (!user) {
    const message = "User has to be logged in";
    redirect(`/error?message=${encodeURIComponent(message)}`);
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  const is_onboarded = profileData.is_onboarded;

  return (
    <>
      {is_onboarded ? (
        <div className="min-h-full flex flex-row mx-5">
          <Calendar className="min-w-full flex-1 "></Calendar>
        </div>
      ) : (
        <OnboardingCard />
      )}
    </>
  );
}
