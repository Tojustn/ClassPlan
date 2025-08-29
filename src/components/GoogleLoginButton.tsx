"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

declare global {
  interface Window {
    handleGoogleAuth?: (response: any) => Promise<void>;
  }
}

export function GoogleAuthButton() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    window.handleGoogleAuth = async function (response: any) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
      });

      if (error || !data.user) {
        router.push("/error");
        return;
      }

      router.push("/dashboard");
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.handleGoogleAuth;
    };
  }, []);

  return (
    <div>
      <div
        id="g_id_onload"
        data-client_id="649750447302-4r245ofiq42apk0qhp71kodl7kss1p8b.apps.googleusercontent.com"
        data-context="signup"
        data-ux_mode="popup"
        data-callback="handleGoogleAuth"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="icon"
        data-shape="circle"
        data-theme="filled_blue"
        data-text="signin_with"
        data-size="large"
      ></div>
    </div>
  );
}
