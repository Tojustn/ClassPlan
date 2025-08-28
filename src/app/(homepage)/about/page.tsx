import { Italic } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-full flex flex-col items-start mx-40">
      <h1 className="text-2xl">About ClassPlan</h1>
      <p>
        ClassPlan is an AI-powered planner built specifically for students. Our
        goal is to help you spend less time organizing and more time learning.
        <br />
        <br />
        With ClassPlan, you can manage your classes, assignments, and schedule
        in one place. Whether you're juggling multiple courses or just want a
        smarter way to stay organized, ClassPlan is designed to make student
        life easier and more productive.
      </p>
      <p className="italic">Note: This is still in MVP Stage</p>
    </div>
  );
}
