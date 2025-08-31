"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchUserProfile from "@/lib/db/fetch_user_profile";
import GoogleCalendarIntegrationButton from "@/components/GoogleCalendarIntegrateButton";
import { signOut } from "@/lib/db/user_logout";

type UserData = {
  email?: string;
  name?: string;
  creation?: string;
  earliest_time?: string;
  latest_time?: string;
  study_time_per_week?: number;
  days_of_the_week?: string[];
};

export default function SettingsPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserProfile();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-full flex flex-col md:mx-40 p-6">
        <div className="flex flex-row items-center justify-between mb-6">
          <h1 className="text-2xl">
            <strong>User Settings</strong>
          </h1>
          <GoogleCalendarIntegrationButton />
        </div>
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col md:mx-40 p-6 overflow-y-auto">
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-2xl">
          <strong>User Settings</strong>
        </h1>
        <GoogleCalendarIntegrationButton />
      </div>

      <div className="space-y-6 flex-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={userData?.name || "Not set"}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={userData?.email || "Not set"}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="creation">Account Created</Label>
              <Input
                id="creation"
                value={
                  userData?.creation
                    ? new Date(userData.creation).toLocaleDateString()
                    : "Not available"
                }
                readOnly
                className="bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Study Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="earliest_time">Earliest Study Time</Label>
                <Input
                  id="earliest_time"
                  value={userData?.earliest_time || "Not set"}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="latest_time">Latest Study Time</Label>
                <Input
                  id="latest_time"
                  value={userData?.latest_time || "Not set"}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="study_time_per_week">
                Study Time Per Week (hours)
              </Label>
              <Input
                id="study_time_per_week"
                value={userData?.study_time_per_week || "Not set"}
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="days_of_week">Study Days</Label>
              <Input
                id="days_of_week"
                value={
                  userData?.days_of_the_week
                    ? userData.days_of_the_week.join(", ")
                    : "Not set"
                }
                readOnly
                className="bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/preferences")}
          >
            Edit Preferences
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/classes")}
          >
            View Classes
          </Button>
          <Button variant="destructive" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
