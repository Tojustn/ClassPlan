"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ReturnButton from "@/components/ReturnButton";
import { changeUserPreferences } from "@/lib/db/update_user_preferences";
import AlertComponent from "@/components/AlertComponent";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PreferencesContent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="flex flex-col justify-center items-center min-w-full">
      <h1 className="text-2xl mb-8">
        <strong>Adjust User Preferences</strong>
      </h1>
      <form
        className="items-center md:mx-40 h-full w-full max-w-md"
        action={changeUserPreferences}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="earliestTime">Earliest Study Time</Label>
            <Input
              id="earliestTime"
              type="time"
              name="earliestTime"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="latestTime">Latest Study Time</Label>
            <Input
              id="latestTime"
              type="time"
              name="latestTime"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
            <Input
              id="hoursPerWeek"
              type="number"
              min="1"
              max="168"
              className="w-full"
              name="hoursPerWeek"
              placeholder="Enter hours per week"
            />

            <div>
              <Label htmlFor="Days of the Week">Days to Study</Label>
              <div className="space-y-4">
                {daysOfTheWeek.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox name={day} id={day.toLowerCase()} />
                    <Label htmlFor={day.toLowerCase()}>{day}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {errorMessage ? (
            <AlertComponent title="Preferences Error" message={errorMessage} />
          ) : (
            <></>
          )}
          <div className="flex flex-row gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Save
            </Button>
            <ReturnButton></ReturnButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function PreferencesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreferencesContent />
    </Suspense>
  );
}
