"use client";
import { useSearchParams } from "next/navigation";
export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div className="flex flex-col items-start justify-center md:mx-50  md:my-50">
      <h1 className="text-2xl">Error</h1>
      {message ? <p>{message}</p> : <p>Sorry, something went wrong</p>}
    </div>
  );
}
