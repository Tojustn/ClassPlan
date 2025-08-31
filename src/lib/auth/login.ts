import "server-only";

("use server");

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: userData, error } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    redirect("/error");
  }
  const user = userData.user;

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
    data
  );
  if (signUpError) {
    console.log(signUpError);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
