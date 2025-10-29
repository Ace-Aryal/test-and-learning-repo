"use client";
import { MaxWidthWrapper } from "@/components/templates/max-width-wrapper";
import React from "react";
import { useParams } from "next/navigation";
import { bikesData } from "@/data/motors";
import { ImageAndColorsCard } from "@/components/motors/single-motor/images-and-colors-card";
import BaseFeaturesCard from "@/components/motors/single-motor/base-features-card";
import { Fuel } from "lucide-react";
import VariantsGrid from "@/components/motors/single-motor/variants-grid";

export default function SingleBikePage() {
  const { slug } = useParams();
  const bike = bikesData.find((bike) => bike.slug === slug);
  return (
    <MaxWidthWrapper className="w-full space-y-6 py-12 pt-24 md:pt-28 max-w-6xl px-1 ">
      <div className="sm:py-4 space-y-2">
        <div className="flex flex-col lg:flex-row gap-4 ">
          <div className="flex-1">
            <ImageAndColorsCard
              images={bike?.images || []}
              colors={bike?.colors || []}
            />
          </div>
          <div className="flex-1 py-2">
            <div className="mb-4 space-y-2 font-[] ">
              <h1 className="text-xl font-semibold font-[custom-medium] uppercase ">
                {bike?.name}
              </h1>
              <p className=" text-gray-600">{bike?.notes}</p>
            </div>
            <BaseFeaturesCard
              features={
                bike?.baseFeatures || {
                  fuelTankCapacity: "",
                  engine: "",
                  torque: "",
                  make: "",
                }
              }
            />
            <div className="flex gap-2 items-center font-[roboto] mt-6">
              <Fuel className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600 uppercase">Mileage:</p>
              <p className="text-gray-600 uppercase">{bike?.mileage}</p>
            </div>
          </div>
        </div>
        {bike && (
          <div className="mt-6">
            <VariantsGrid motors={bike} />
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
