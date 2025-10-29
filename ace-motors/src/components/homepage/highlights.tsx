"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { highlights } from "./data";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const TailwindHorizontalScroll = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Define the panels to easily map over them

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;

    // Get the total width of the content wrapper
    // This is crucial for calculating the scroll distance
    const wrapperWidth = wrapper!.scrollWidth;

    // Calculate the distance to scroll horizontally:
    // (Total content width) - (One Viewport width)
    const scrollDistance = wrapperWidth - window.innerWidth + 768;

    // --- GSAP Animation Setup ---

    // Create a GSAP timeline
    const tl = gsap.timeline({
      // Configuration for the ScrollTrigger
      scrollTrigger: {
        trigger: container, // The element that controls the ScrollTrigger
        pin: true, // Pin the container while scrolling
        scrub: 1, // Smoothly link the animation to the scroll position
        start: "top top", // Start when the top of the trigger hits the top of the viewport
        // Set the end to create enough vertical scroll space for the animation
        end: `+=${scrollDistance}`,
        // markers: true, // Uncomment for debugging
      },
    });

    // Add the horizontal movement to the timeline
    tl.to(wrapper, {
      x: -scrollDistance, // Move the wrapper to the left by the calculated distance
      ease: "none", // Linear movement linked to the scrub
    });

    // --- Cleanup Function ---
    return () => {
      // Kill the ScrollTrigger instance when the component unmounts
      tl.scrollTrigger!.kill();
    };
  }, []);

  return (
    <div
      className="h-screen overflow-x-hidden hide-scrollbar"
      ref={containerRef}
    >
      {/* The content wrapper must be wider than the viewport (w-max) and use flexbox 
        with no wrapping (flex-nowrap) to force horizontal overflow.
      */}
      <div className="flex flex-nowrap w-max min-h-full gap-8" ref={wrapperRef}>
        {highlights.map((motor) => (
          <div
            key={motor.id}
            className={`w-screen h-screen pt-20  flex flex-col items-center justify-center   flex-shrink-0 bg-background`}
          >
            <Image
              src={motor.image}
              alt={motor.label}
              width={500}
              height={500}
              className="md:w-7/10 md:h-7/10 object-cover "
            />
            <div className="flex-1 flex flex-col gap-2 sm:gap-3 items-center py-2 text-center">
              <h2 className=" text-2xl tracking-tight font-semibold ">
                {motor.description}
              </h2>
              <p className="text-lg tracking-tight">
                Estimated range {motor.mileage}
              </p>
              <div className="flex justify-center gap-2">
                <Link href={`/${motor.type}s/${motor.id}`}>
                  <Button
                    variant="default"
                    className="text-xs rounded-full w-32 cursor-pointer py-5"
                  >
                    Explore
                  </Button>
                </Link>
                <Link href={`/checkout/${motor.id}`}>
                  <Button
                    variant="outline"
                    className="text-xs rounded-full w-32 cursor-pointer py-5 bg-transarent hover:bg-white/10 "
                  >
                    Buy Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content that appears AFTER the horizontal scroll is finished */}
    </div>
  );
};

export default TailwindHorizontalScroll;
