"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-between px-8 h-full">
      <div className="flex flex-col justify-center space-y-6  w-1/2 px-10">
        <p className="text-xl text-gray-700">
          AI Planner <strong>specifically</strong> for students
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Less Planning, More Doing
        </h1>
        <Button className="px-6 py-3 w-fit">
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 px-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-xl opacity-50 scale-110 group-hover:opacity-75 transition-opacity duration-500"></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/ClassPlanLogoSlim.png"
              width={300}
              height={300}
              alt="ClassPlan Logo"
              className="object-contain"
            />
            <h2 className="text-3xl font-bold text-gray-900">ClassPlan</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
