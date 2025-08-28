import { AuthCard } from "@/components/AuthCard";
export default function LoginPage() {
  return (
    <div className="min-h-full justify-center items-center w-full flex flex-col 0">
      <h1 className="text-2xl py-5 mb-3">
        <strong>Hello! Signup!</strong>
      </h1>
      <AuthCard method="signup"></AuthCard>
    </div>
  );
}
