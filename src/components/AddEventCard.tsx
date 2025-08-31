"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { add_event } from "@/lib/db/calendar/calendar_queries";
import { useState, useEffect } from "react";
import { SelectDateCalendar } from "./SelectDateComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "./ui/textarea";
import EventTypeDropdown from "./EventTypeDropdown";

const AddEventCard = ({
  addEventClicked,
}: {
  addEventClicked?: () => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [eventType, setEventType] = useState<string>("");

  const handleDateSelect = (value: string) => {
    setSelectedDate(value);
  };

  const handleDropdownChange = (value: string) => {
    setEventType(value);
  };

  return (
    <form action={add_event} className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Add Calendar Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-10">
          <div className="flex flex-col gap-3">
            <Label>Title of Event</Label>
            <Input name="title" placeholder={"title"}></Input>
          </div>
          <input
            type="hidden"
            name="selectedDate"
            value={selectedDate}
            required
          />
          <SelectDateCalendar onChange={handleDateSelect} />

          {!isAllDay ? (
            <>
              <div className="flex flex-col gap-3 mt-4">
                <Label htmlFor="startTime" className="px-1">
                  Start Time
                </Label>
                <Input id="startTime" name="startTime" type="time" required />
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <Label htmlFor="endTime" className="px-1">
                  End Time
                </Label>
                <Input id="endTime" name="endTime" type="time" required />
              </div>
            </>
          ) : null}
          <div className="flex flex-col gap-3 mt-4">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Type your description here"
            />
          </div>
          <div className="flex flex-row gap-10 justify-evenly">
            <div className="flex flex-col gap-3 mt-4">
              <Label>All Day?</Label>
              <Checkbox
                name="allDay"
                checked={isAllDay}
                onCheckedChange={() => setIsAllDay((prev) => !prev)}
              />
            </div>
            <input
              type="hidden"
              value={eventType}
              name="event_type_name"
              required
            />
            <EventTypeDropdown onChange={handleDropdownChange} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-row justify-between">
          <Button type="submit" variant="secondary">
            Add Event
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={() => addEventClicked?.()}
          >
            Exit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AddEventCard;
