import Link from "next/link";
import React from "react";

export default function HeroBottom() {
  return (
    <div className="flex flex-col font-[font2] text-white md:flex-row gap-4  items-center justify-center py-[2vh]">
      <Link
        href={"/cars"}
        className=" hover:border-yellow-400 hover:text-yellow-400 transition-colors text-[8vw] md:text-[6.5vw] md:leading-[6vw] xl:leading-[6.5vw] border-3 border-white rounded-full px-8 md:pt-2 xl:pt-3   uppercase "
      >
        Cars
      </Link>
      <Link
        href={"/bikes"}
        className="text-[8vw] hover:border-yellow-400 hover:text-yellow-400 transition-colors md:text-[6.5vw] md:leading-[6vw] xl:leading-[6.5vw] border-3 border-white rounded-full px-8  md:pt-2 xl:pt-3 uppercase"
      >
        Bikes
      </Link>
    </div>
  );
}
