"use client";
import React from "react";

export default function BaseFeaturesCard({
  features,
}: {
  features: {
    fuelTankCapacity: string;
    engine: string;
    torque: string;
    make: string;
  };
}) {
  return (
    <div className="space-y-2 ">
      <h3 className="font-semibold font-[custom-regular] uppercase ">
        Base Features
      </h3>
      <div className="flex flex-col gap-2">
        {Object.keys(features).map((key, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-sm flex-1 font-roboto capitalize font-[] text-gray-500">
              {key === "fuelTankCapacity" ? "Fuel Tank Capacity" : key}
            </span>
            <span className="text-sm flex-1 font-roboto">
              {features[key as keyof typeof features]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
