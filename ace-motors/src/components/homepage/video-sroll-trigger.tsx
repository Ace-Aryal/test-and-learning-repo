"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaxWidthWrapper } from "../templates/max-width-wrapper";
import { Button } from "../ui/button";
import { Pause, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoReversible() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const handleLoaded = () => {
      const duration = video.duration;

      // Animate video progress based on scroll position
      gsap.to(video, {
        currentTime: duration,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom center",
          scrub: true, // allows smooth forward & reverse playback
          onUpdate: (self) => {
            // This callback runs continuously as you scroll
            // You can log progress if you want
            // console.log(self.progress.toFixed(2));
          },
        },
      });
    };

    if (video.readyState >= 1) {
      // Already loaded
      handleLoaded();
    } else {
      video.addEventListener("loadedmetadata", handleLoaded);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-gradient-to-b from-zinc-800  to-gray-50 py-12 px-1"
      ref={containerRef}
    >
      <MaxWidthWrapper className="flex w-full flex-col items-center">
        <video
          ref={videoRef}
          src="/videos/car-3d.mp4"
          className="rounded-xl h-screen object-cover sm:h-auto "
          muted
          preload="auto"
        />
        <div className="py-16">
          <a href="https://youtube.com">
            <Button className="mx-auto  h-12 cursor-pointer  rounded-full w-52 items-center ">
              <Play fill="white" className="" />
              Watch more videos
            </Button>
          </a>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
