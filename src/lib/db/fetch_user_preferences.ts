"use server";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

export async function fetchUserPreferences() {
  const supabase = await createClient();
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not logged in");
    }

    const { data: preferences, error: prefError } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (prefError || !preferences) {
      throw new Error("Error fetching user preferences");
    }

    return {
      earliest_time: preferences.earliest_time,
      latest_time: preferences.latest_time,
      study_time_per_week: preferences.study_time_per_week,
      days_of_the_week: preferences.days_of_the_week,
    };
  } catch (error) {
    redirect(`/error?message=${encodeURIComponent(String(error))}`);
  }
}
