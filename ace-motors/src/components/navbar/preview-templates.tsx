"use clinet";

import Image from "next/image";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import {
  SectionPreviewNavigatorProps,
  VechilePreviewNavigatorProps,
} from "./data";
import { motion } from "motion/react";
export const VehiclesPreviewTemplate = ({
  vehicle,
}: {
  vehicle: VechilePreviewNavigatorProps;
}) => {
  return (
    <Link
      href={`/${vehicle.type}s/${vehicle.id}`}
      className=" h-full w-full block relative overflow-hidden"
    >
      <Image
        src={vehicle.image}
        alt={vehicle.label}
        width={500}
        height={500}
        className="object-cover w-full h-full  hover:scale-[1.02] transition-transform duration-500"
      />
      <div className="absolute inset-x-0 top-0  p-4 flex justify-between  ">
        <h2 className="text-xl font-semibold">{vehicle.label}</h2>
        <div className=" text-center">
          <p>Starting At</p>
          <p className="font-medium drop-shadow-2xl">
            {formatPrice(vehicle.startingPrice)}
          </p>
        </div>
      </div>
    </Link>
  );
};
export const GenralPreviewTemplate = ({
  section,
}: {
  section: SectionPreviewNavigatorProps;
}) => {
  return (
    <div className="flex w-full h-full">
      <motion.div className="flex-7 flex flex-col p-2 gap-2">
        <Link
          href={section.images[0].href}
          className="  rounded-lg relative h-1/2 overflow-hidden border border-gray-200"
        >
          <Image
            src={section.images[0].url}
            alt={section.images[0].title}
            width={500}
            height={500}
            className="object-cover h-full  w-full hover:scale-[1.02] transition-transform duration-500"
          />
          <h2 className="text-3xl font-semibold absolute top-1/5 text-background text-center w-full drop-shadow-lg">
            {section.images[0].title}
          </h2>
        </Link>
        <Link
          href={section.images[1].href}
          className="  rounded-lg relative h-1/2 overflow-hidden border border-gray-200"
        >
          <Image
            src={section.images[1].url}
            alt={section.images[1].title}
            width={500}
            height={500}
            className="object-cover h-full  w-full hover:scale-[1.02] transition-transform duration-500"
          />
          <h2 className="text-3xl font-semibold absolute top-1/5 text-background text-center w-full drop-shadow-2xl">
            {section.images[1].title}
          </h2>
        </Link>
      </motion.div>
      <div className="flex-3 p-2 space-y-2">
        <h2 className="font-semibold">{section.links.heading}</h2>
        <div className="flex flex-col gap-2">
          {section.links.urls.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="block text-sm rounded-lg text-left w-full cursor-pointer transition-all hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
