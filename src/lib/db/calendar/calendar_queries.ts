"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function add_event(formData: FormData) {
  const supabase = await createClient();
  console.log("FormData entries:");
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be signed in to add events");
    }

    // Get form data with correct field names
    const title = formData.get("title")?.toString().trim();
    const selectedDate = formData.get("selectedDate")?.toString(); // Fixed name
    const startTime = formData.get("startTime")?.toString(); // Fixed name
    const endTime = formData.get("endTime")?.toString(); // Fixed name
    const event_type_name = formData.get("event_type_name")?.toString();
    const allDay = formData.get("allDay") === "on";
    const description = formData.get("description")?.toString();

    // Validation
    if (!title) {
      throw new Error("Missing event title");
    }
    if (!event_type_name) {
      throw new Error("Missing event type");
    }
    if (!selectedDate) {
      // Fixed logic
      throw new Error("Missing date");
    }

    let startStr: string;
    let endStr: string;

    if (allDay) {
      const eventDate = new Date(selectedDate);
      startStr = eventDate.toISOString().split("T")[0];
      endStr = startStr;
    } else {
      // For timed events, combine date and time
      if (!startTime || !endTime) {
        throw new Error(
          "Start time and end time required for non-all-day events"
        );
      }

      const eventDate = new Date(selectedDate);
      const dateStr = eventDate.toISOString().split("T")[0];

      startStr = `${dateStr}T${startTime}:00`;
      endStr = `${dateStr}T${endTime}:00`;
    }

    console.log("Inserting event:", {
      user_id: user.id,
      title,
      start: startStr, // FullCalendar expects 'start'
      end: endStr, // FullCalendar expects 'end'
      event_type_name,
      allDay,
      description,
    });

    const { error } = await supabase.from("calendar_events").insert({
      user_id: user.id,
      title,
      startStr: startStr,
      endStr: endStr,
      event_type_name,
      allDay,
      description,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    redirect(`/error?message=${encodeURIComponent(String(error))}`);
  }

  redirect("/dashboard?success=Event added successfully");
}

export async function get_events() {
  const supabase = await createClient();
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not found");
    }

    const { data: eventData, error: eventError } = await supabase
      .from("calendar_events")
      .select(
        "id, startStr, endStr, allDay, description, title, event_type_name"
      )
      .eq("user_id", user.id);

    if (eventError) {
      console.error("Event error:", eventError);
      throw new Error(eventError.message);
    }

    const { data: eventTypeData, error: eventTypeError } = await supabase
      .from("event_type")
      .select("name, color");

    if (eventTypeError) {
      console.error("Event type error:", eventTypeError);
      throw new Error(eventTypeError.message);
    }

    if (!eventData || !eventTypeData) {
      return [];
    }

    const transformedEvents = eventData.map((event) => {
      const event_type = event.event_type_name;
      const eventType = eventTypeData.find((et) => et.name === event_type);

      return {
        id: event.id,
        title: event.title,
        start: new Date(event.startStr),
        end: new Date(event.endStr),
        allDay: event.allDay,
        description: event_type + ":   " + event.description,
        backgroundColor: eventType?.color || "#3788d8",
        borderColor: eventType?.color || "#3788d8",
        textColor: "#ffffff",

        extendedProps: {
          eventType: event_type,
        },
      };
    });

    return transformedEvents;
  } catch (error) {
    console.error("Get events error:", error);
    redirect(`/error?message=${encodeURIComponent(String(error))}`);
  }
}

export const fetchCurrentAndFutureEvents = async () => {
  const supabase = await createClient();
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not found");
    }

    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from("calendar_events")
      .select("title, startStr, endStr, allDay")
      .eq("user_id", user.id)
      .gte("startStr::date", today);

    if (error) {
      throw new Error(`Failed to fetch calendar events: ${error.message}`);
    }

    return data;
  } catch (error) {
    redirect(`/error?message=${encodeURIComponent(String(error))}`);
  }
};
