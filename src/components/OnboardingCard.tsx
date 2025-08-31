import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const onboardInput = [{ title: "What is your username?", name: "username" }];

async function submitForm(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const username = formData.get("username");
  console.log(username);

  if (!user) {
    const message = "User not found";
    redirect(`/error?message=${encodeURIComponent(message)}`);
  }

  try {
    const { error } = await supabase
      .from("profiles")
      .update({ name: username, is_onboarded: true })
      .eq("profile_id", user.id);

    if (error) {
      throw new Error("Error Updating Profile");
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    redirect(`/error?message=${encodeURIComponent(message)}`);
  }

  redirect("/dashboard");
}

export default async function OnboardingCard() {
  return (
    <form action={submitForm}>
      <Card className="mx-40 my-40">
        <CardHeader>
          <CardTitle>Finish Setting Up</CardTitle>
        </CardHeader>
        <CardContent>
          {onboardInput.map((input) => (
            <Input
              key={input.title}
              name={input.name}
              type="text"
              placeholder={input.title}
            />
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit">
            Submit <SendHorizontal />
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
