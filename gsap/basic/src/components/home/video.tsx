"use client";
import React from "react";

export default function HeroVideoComponent() {
  return (
    <video
      src="/hero1.mp4"
      autoPlay
      loop
      muted
      className="w-full h-full  object-cover "
    />
  );
}
