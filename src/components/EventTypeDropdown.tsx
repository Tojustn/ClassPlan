"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import fetch_event_types from "@/lib/db/fetch_event_types";

type EventType = {
  name: string;
  color: string;
};

export default function EventTypeDropdown({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [eventType, setEventType] = useState("");
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);

  useEffect(() => {
    const loadEventTypes = async () => {
      const types = await fetch_event_types();
      setEventTypes(types);
    };
    loadEventTypes();
  }, []);

  const handleValueChange = (value: string) => {
    setEventType(value);
    onChange(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {eventType ? eventType : "Choose Event Type"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Event Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={eventType}
          onValueChange={handleValueChange}
        >
          {eventTypes.map((type: EventType) => {
            return (
              <DropdownMenuRadioItem
                key={type.name}
                value={type.name}
                style={{ backgroundColor: type.color }}
                className="my-1"
              >
                <strong>{type.name}</strong>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
