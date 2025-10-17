import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import { MaxWidthWrapper } from "../templates/max-width-wrapper";
import Link from "next/link";

export default function LocationsMarquee() {
  const locations = [
    { src: "/images/ktm.jpg", alt: "Kathmandu", href: "/" },
    { src: "/images/mumbai.jpg", alt: "Mumbai", href: "/" },
    { src: "/images/new-york.jpg", alt: "New York", href: "/" },
    { src: "/images/london.jpg", alt: "London", href: "/" },
    { src: "/images/tokyo.jpg", alt: "Tokyo", href: "/" },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-zinc-500 py-12 sm:py-16">
      <MaxWidthWrapper className="max-w-6xl text-center">
        {/* Heading */}
        <h2 className="text-3xl font-[custom-regular] uppercase tracking-tight sm:text-4xl font-semibold mb-8 text-zinc-800 dark:text-zinc-100">
          Our Locations
        </h2>

        {/* Marquee */}
        <Marquee
          gradient={true}
          gradientWidth={100}
          speed={40}
          pauseOnHover={true}
          className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          {locations.map((loc, i) => (
            <div
              key={i}
              className="mx-10 flex items-center justify-center  transition-transform duration-300 "
            >
              <Link
                href={loc.href}
                className="rounded-xl bg-white  shadow-md ring-1 ring-zinc-200/50 dark:ring-zinc-700/50 relative"
              >
                <Image
                  src={loc.src}
                  alt={loc.alt}
                  width={192}
                  height={192}
                  className="object-cover w-52 h-32 rounded-lg"
                />
                <div className="text-lg font-semibold font-[custom-regular] absolute bottom-2 uppercase w-full text-white text-center left-1/2 -translate-x-1/2">
                  {loc.alt}
                </div>
              </Link>
            </div>
          ))}
        </Marquee>
      </MaxWidthWrapper>
    </section>
  );
}
