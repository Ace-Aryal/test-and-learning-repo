"use client";
import { Motor } from "@/data/motors";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../templates/max-width-wrapper";

export default function MotorsGrid({ motors }: { motors: Motor[] }) {
  const pathname = usePathname();
  const motorType = pathname.split("/")[1];
  return (
    <MaxWidthWrapper className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pt-24">
      {motors.map((motor) => (
        <div
          key={motor.slug}
          className={`    flex flex-col items-center justify-center   flex-shrink-0 bg-background`}
        >
          <Image
            src={motor.images[0]}
            alt={motor.name}
            width={500}
            height={500}
            className=" object-cover "
          />
          <div className="flex-1 flex flex-col gap-2 sm:gap-3 items-center py-2 text-center">
            <h2 className=" text-2xl tracking-tight font-semibold ">
              {motor.name}
            </h2>
            <p className="text-lg tracking-tight">
              Estimated range {motor.mileage}
            </p>
            <div className="flex justify-center gap-2">
              <Link href={`/${motorType}s/${motor.slug}`}>
                <Button
                  variant="default"
                  className="text-xs rounded-full w-24 cursor-pointer py-5"
                >
                  Explore
                </Button>
              </Link>
              <Link href={`/checkout/${motor.slug}`}>
                <Button
                  variant="outline"
                  className="text-xs rounded-full w-24 cursor-pointer py-5 bg-transarent hover:bg-white/10 "
                >
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </MaxWidthWrapper>
  );
}
