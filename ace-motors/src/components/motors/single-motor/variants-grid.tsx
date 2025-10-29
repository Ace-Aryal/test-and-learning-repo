"use client";

import { Button } from "@/components/ui/button";
import { Motor } from "@/data/motors";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function VariantsGrid({ motors }: { motors: Motor }) {
  return (
    <div className="space-y-2 p-2 sm:p-4">
      <h3 className="text-xl font-semibold font-[custom-regular] uppercase px-1 underline">
        variants
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {motors.variants.map((variant) => (
          <VariantCard key={variant.name} variant={variant} />
        ))}
      </div>
    </div>
  );
}

function VariantCard({ variant }: { variant: Motor["variants"][number] }) {
  return (
    <div className="p-4 sm:p-6 shadow rounded-2xl lg:p-10 border border-gray-200">
      <div>
        <Image
          src={variant.image}
          alt={variant.name}
          width={200}
          height={200}
          className="h-40 aspect-auto object-contain w-full  "
        />
      </div>
      <div className="mt-2">
        <h3 className="  font-semibold uppercase font-[custom-regular]">
          {variant.name}
        </h3>
      </div>
      <div className="mt-2 flex gap-2">
        <p className="font-semibold font-[custom-regular] text-base">
          Starting At
        </p>
        <p className="font-semibold font-[custom-medium] text-base text-green-500">
          {formatPrice(variant.price / 140)}
        </p>
      </div>
      <div className="mt-2 text-sm">
        <h4 className="font-semibold font-[roboto] text-base">
          Specific Features
        </h4>
        <ul className="list-disc pl-4 text-gray-700">
          {variant.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="mt-3">
        <Button size={"lg"} className="w-full cursor-pointer">
          Make Order Request
        </Button>
      </div>
    </div>
  );
}
