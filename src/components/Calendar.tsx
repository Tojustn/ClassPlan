// components/CalendarClient.tsx
"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState, useEffect } from "react";
import AddEventCard from "./AddEventCard";
import { get_events } from "@/lib/db/calendar/calendar_queries";

export default function Calendar({ className }: { className?: string }) {
  const [isAddEvent, setIsAddEvent] = useState<boolean>(false);
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    setIsAddEvent(false);
  }, []);

  useEffect(() => {
    const handleSetEvents = async () => {
      const fetchedEvents = await get_events();
      if (fetchedEvents) setEvents(fetchedEvents);
    };

    handleSetEvents();
  }, []);

  const addEventClicked = () => {
    setIsAddEvent((prev) => !prev);
  };

  return (
    <div className={className}>
      {isAddEvent ? (
        <AddEventCard addEventClicked={addEventClicked}></AddEventCard>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridWeek"
          headerToolbar={{
            start: "prev,next today addEvent",
            center: "title",
            end: "dayGridWeek",
          }}
          displayEventTime={true}
          displayEventEnd={true}
          events={events}
          customButtons={{
            addEvent: {
              text: "Add Event",
              click: addEventClicked,
            },
          }}
        />
      )}
    </div>
  );
}
