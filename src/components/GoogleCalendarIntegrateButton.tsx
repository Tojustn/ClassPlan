"use client";
import { Button } from "./ui/button";
import { IntegrateGoogleCalendar } from "@/lib/googleCalendar";

export default function GoogleCalendarIntegrationButton() {
  return (
    <Button
      variant={"outline"}
      className="p-5"
      onClick={IntegrateGoogleCalendar}
    >
      <img
        src="/Google_Calendar_icon.svg"
        alt="Google Calendar Icon"
        width={30}
      ></img>
      Integrate with Google Calendars (in progress)
    </Button>
  );
}
