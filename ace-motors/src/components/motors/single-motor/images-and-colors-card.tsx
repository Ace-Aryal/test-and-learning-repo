"use client";

import ImageSlider from "@/components/ui/image-slider";
import { cn } from "@/lib/utils";
import React from "react";

export const ImageAndColorsCard = ({
  images,
  colors,
}: {
  images: string[];
  colors: {
    name: string;
    code: string;
  }[];
}) => {
  return (
    <div className="space-y-2 p-2 sm:p-3 shadow rounded-2xl">
      <ImageSlider images={images} />
      <ColorsCard colors={colors} />
    </div>
  );
};
// colors are hex colors
function ColorsCard({
  colors,
}: {
  colors: {
    name: string;
    code: string;
  }[];
}) {
  return (
    <div className="w-full  space-y-3   ">
      <h3 className=" font-semibold  uppercase px-1">Colors</h3>
      <div className="flex items-center gap-3 ">
        {colors.map((color, index) => (
          <div key={index} className="flex gap-1.5 justify-center items-center">
            <div
              title={color.name}
              className={cn("w-7 h-7 rounded-full border border-gray-200")}
              style={{
                backgroundColor: color.code,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
