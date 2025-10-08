import HeroVideoComponent from "@/components/home/video";
import React from "react";

export default function Home() {
  return (
    <div className="flex-1">
      <div className="h-screen w-screen  object-cover flex items-center justify-center fixed inset-0 -z-10">
        <HeroVideoComponent />
      </div>
      <div className="relative h-screen w-full ">Hello</div>
    </div>
  );
}
