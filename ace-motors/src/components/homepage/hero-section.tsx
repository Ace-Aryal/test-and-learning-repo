import React from "react";
import FullscreenCarousel from "./carousel";
import { Button } from "../ui/button";
const cards = [
  {
    title: "The All-New Velocity ZR",
    description:
      "Experience unmatched performance with the Velocity ZR — engineered for thrill-seekers who crave precision, power, and control.",
    cta: (
      <>
        <Button
          variant="secondary"
          className="text-xs rounded-full w-32 cursor-pointer py-5"
        >
          Discover More
        </Button>
        <Button
          variant="outline"
          className="text-xs rounded-full w-32 cursor-pointer py-5 bg-transarent hover:bg-white/10 hover:text-white"
        >
          Book a Test Drive
        </Button>
      </>
    ),
    background: (
      <video
        src="/videos/hero1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full"
      />
    ),
  },
  {
    title: "Astra Comfort Sedan",
    description:
      "Redefining everyday luxury — the Astra Comfort offers plush interiors, quiet cabins, and cutting-edge safety in one elegant package.",
    cta: (
      <>
        <Button
          variant="secondary"
          className="text-xs rounded-full w-32 cursor-pointer py-5"
        >
          Explore Astra
        </Button>
        <Button
          variant="outline"
          className="text-xs rounded-full w-32 cursor-pointer py-5 bg-transarent hover:bg-white/10 hover:text-white"
        >
          Build & Price
        </Button>
      </>
    ),
    background: (
      <img
        src="/images/car1.avif"
        alt="Astra Comfort Sedan"
        className="object-cover w-full h-full"
      />
    ),
  },
  {
    title: "CruiserX 800",
    description:
      "Designed for freedom — the CruiserX 800 delivers effortless rides across cities and highways with its lightweight frame and torque-rich engine.",
    cta: (
      <>
        <Button
          variant="secondary"
          className="text-xs rounded-full w-32 cursor-pointer py-5"
        >
          View Specs
        </Button>
        <Button
          variant="outline"
          className="text-xs rounded-full w-32 cursor-pointer py-5 bg-transarent hover:bg-white/10 hover:text-white"
        >
          Watch Video
        </Button>
      </>
    ),
    background: (
      <video
        src="/videos/hero2.webm"
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full"
      />
    ),
  },
  {
    title: "Eclipse GT — Electric Luxury",
    description:
      "Where performance meets sustainability. The Eclipse GT brings pure electric exhilaration with zero emissions and total luxury.",
    cta: (
      <>
        <Button
          variant="secondary"
          className="text-xs rounded-full w-32 cursor-pointer py-5"
        >
          View Models
        </Button>
        <Button
          variant="outline"
          className="text-xs rounded-full w-32 cursor-pointer py-5 bg-transarent hover:bg-white/10 hover:text-white"
        >
          Reserve Now
        </Button>
      </>
    ),
    background: (
      <img
        src="/images/car1.avif"
        alt="Eclipse GT"
        className="object-cover w-full h-full"
      />
    ),
  },
  {
    title: "MotoLite 350",
    description:
      "A perfect balance of power and affordability. MotoLite 350 gives you that raw motorcycle feel without breaking the bank.",
    cta: (
      <>
        <Button
          variant="secondary"
          className="text-xs rounded-full w-32 cursor-pointer py-5"
        >
          See Details
        </Button>
        <Button
          variant="outline"
          className="text-xs rounded-full w-32 cursor-pointer py-5 bg-transarent hover:bg-white/10 hover:text-white"
        >
          Find a Dealer
        </Button>
      </>
    ),
    background: (
      <video
        src="/videos/hero1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full"
      />
    ),
  },
];

export default function HeroSection() {
  return <FullscreenCarousel cards={cards} />;
}
