// components/CalendarClient.tsx
"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState, useEffect } from "react";
import AddEventCard from "./AddEventCard";
import { get_events } from "@/lib/db/calendar/calendar_queries";
import { delete_calendar_event } from "@/lib/db/calendar/calendar_queries";

type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  description: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    eventType: string;
  };
};

type EventClickInfo = {
  event: {
    id: string;
    title: string;
    remove: () => void;
  };
};

export default function Calendar({ className }: { className?: string }) {
  const [isAddEvent, setIsAddEvent] = useState<boolean>(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

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

  const handleEventClick = (info: EventClickInfo) => {
    if (confirm(`Do you want to delete the event '${info.event.title}'?`)) {
      delete_calendar_event(info.event.id);
      info.event.remove(); // removes from UI immediately
    }
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
          eventClick={(info) => handleEventClick(info)}
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
