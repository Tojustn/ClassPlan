"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error: signUpError } = await supabase.auth.signUp(data);
  if (signUpError) {
    redirect("/error");
  }

  const { data: user } = await supabase.auth.getUser();

  const { error: profileError } = await supabase.from("profiles").insert({
    profile_id: user.id,
    is_onboarding: false,
  });

  if (profileError) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
