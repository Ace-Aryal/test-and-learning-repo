import HeroBottom from "@/components/home/hero-bottom";
import HeroTop from "@/components/home/hero-top";
import HeroVideoComponent from "@/components/home/video";
import React from "react";

export default function Home() {
  return (
    <div className="flex-1">
      <div className="h-screen w-screen  object-cover flex items-center justify-center fixed inset-0 -z-10">
        <HeroVideoComponent />
      </div>
      <div className="relative h-screen w-full ">
        <div className="flex flex-col justify-between h-full">
          <HeroTop />
          <HeroBottom />
        </div>
      </div>
    </div>
  );
}
