"use server";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

export async function changeUserPreferences(formData: FormData) {
  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const supabase = await createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Needs to be signed in ");
    }

    const earliest_time = formData.get("earliestTime");
    const latest_time = formData.get("latestTime");
    const hours_per_week = formData.get("hoursPerWeek");
    const days_of_the_week: string[] = [];

    daysOfTheWeek.forEach((day) => {
      if (formData.get(day)) {
        days_of_the_week.push(day);
      }
    });

    if (
      hours_per_week &&
      (isNaN(Number(hours_per_week)) ||
        Number(hours_per_week) < 0 ||
        !Number.isInteger(Number(hours_per_week)))
    ) {
      throw new Error("hours_per_week must be a valid positive integer");
    }

    if (!earliest_time) {
      throw new Error("Must fill out earliest time");
    }
    if (!latest_time) {
      throw new Error("Must fill out latest time");
    }
    if (!hours_per_week) {
      throw new Error("Must fill out hours per week");
    }
    if (!days_of_the_week || days_of_the_week.length === 0) {
      throw new Error("Must select at least one day of the week");
    }

    const { error: TimeError } = await supabase
      .from("user_preferences")
      .update({
        earliest_time: earliest_time,
        latest_time: latest_time,
        study_time_per_week: hours_per_week,
        days_of_the_week: days_of_the_week,
      })
      .eq("user_id", user.id);

    if (TimeError) {
      throw new Error(TimeError.message);
    }
  } catch (error) {
    redirect(
      `/dashboard/preferences?error=${encodeURIComponent(String(error))}`
    );
  }

  redirect("/dashboard");
}
