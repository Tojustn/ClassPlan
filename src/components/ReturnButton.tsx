"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function ReturnButton() {
  const router = useRouter();

  return (
    <Button variant="destructive" onClick={() => router.push("/dashboard")}>
      Cancel
    </Button>
  );
}
