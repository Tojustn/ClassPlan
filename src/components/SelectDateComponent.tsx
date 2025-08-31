"use client";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function SelectDateCalendar({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  // Call onChange when component mounts with initial date
  React.useEffect(() => {
    if (date && isValidDate(date)) {
      onChange(date.toISOString());
    }
  }, [date, onChange]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate && isValidDate(newDate)) {
      setDate(newDate);
      setValue(formatDate(newDate));
      setMonth(newDate);
      // Call onChange with ISO string format
      onChange(newDate.toISOString());
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Event Date
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const inputDate = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(inputDate)) {
              setDate(inputDate);
              setMonth(inputDate);
              // Call onChange with consistent format
              onChange(inputDate.toISOString());
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate) => {
                handleDateChange(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
