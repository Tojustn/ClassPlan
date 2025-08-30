"use server";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
export default async function fetchUserProfile() {
  const user_data: {
    email?: string;
    name?: string;
    creation?: string;
    earliest_time?: string;
    latest_time?: string;
    study_time_per_week?: number;
    days_of_the_week?: string[];
  } = {};
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not logged in");
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("profile_id", user.id)
      .single();

    console.log(profileData);
    if (!profileData || profileError) {
      throw new Error("Error fetching profile");
    }

    const profile = profileData;
    const { data: preferenceData, error: preferenceError } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!preferenceData || preferenceError) {
      throw new Error("Error fetching user preferences");
    }

    const preferences = preferenceData;

    user_data.email = user.email;
    user_data.name = profile?.name;
    user_data.creation = user.created_at;
    user_data.earliest_time = preferences?.earliest_time;
    user_data.latest_time = preferences?.latest_time;
    user_data.study_time_per_week = preferences?.study_time_per_week;
    user_data.days_of_the_week = preferences?.days_of_the_week;

    console.log(user_data);
    return user_data;
  } catch (error) {
    redirect(`/error${encodeURIComponent(String(error))}`);
  }
}
