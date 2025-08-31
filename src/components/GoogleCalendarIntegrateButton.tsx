"use client";
import { Button } from "./ui/button";
import { IntegrateGoogleCalendar } from "@/lib/googleCalendar";
import Image from "next/image";

export default function GoogleCalendarIntegrationButton() {
  return (
    <Button
      variant={"outline"}
      className="p-5"
      onClick={IntegrateGoogleCalendar}
    >
      <Image
        src="/Google_Calendar_icon.svg"
        alt="Google Calendar Icon"
        width={30}
        height={30}
      />
      Integrate with Google Calendars (in progress)
    </Button>
  );
}
