import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import clsx from "clsx";
import { login, signup } from "@/lib/auth/login";

type props = {
  method: string;
};
export function AuthCard({ method }: props) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        {method === "login" && <CardTitle>Login to your account</CardTitle>}
        {method === "signup" && (
          <CardTitle>Signup, make your account</CardTitle>
        )}

        {method === "login" && (
          <CardAction>
            <Button variant="link">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
          </div>
          <Button
            type="submit"
            formAction={method === "login" ? login : signup}
            className="w-full my-5"
          >
            {method === "login" && "Login"}
            {method === "signup" && "Signup"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
