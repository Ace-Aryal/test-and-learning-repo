import React from "react";
import HeroVideoComponent from "./video";

export default function HeroTop() {
  return (
    <div className=" text-white font-[font2]  flex flex-col items-center  h-full  px-4 md:px-20 lg:px-40 2xl:px-60 py-10 pt-20 sm:pt-12">
      <div className="text-center uppercase text-[12vw] sm:text-[9vw] leading-[10vw] sm:leading-[9vw]  drop-shadow-2xl">
        The motors
      </div>
      <div className="text-center flex  items-center justify-center uppercase text-[12vw] sm:text-[9vw]  leading-[10vw] sm:leading-[9vw] drop-shadow-2xl">
        <div>that's</div>
        <div className="h-[8vw] rounded-full   overflow-hidden mx-2">
          <HeroVideoComponent />
        </div>
        <div></div>
        built
      </div>
      <div className="text-center uppercase text-[12vw] sm:text-[9vw] leading-[10vw] sm:leading-[9vw] drop-shadow-2xl">
        For You
      </div>
    </div>
  );
}
