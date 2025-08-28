import { AuthCard } from "@/components/AuthCard";
export default function LoginPage() {
  return (
    <div className="min-h-full justify-center items-center w-full flex flex-col 0">
      <h1 className="text-2xl py-5 mb-3">
        <strong>Welcome Back!</strong>
      </h1>
      <AuthCard method="login"></AuthCard>
    </div>
  );
}
