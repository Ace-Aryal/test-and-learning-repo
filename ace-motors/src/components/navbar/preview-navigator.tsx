"use client";

import { useState } from "react";
import {
  GenralPreviewTemplate,
  VehiclesPreviewTemplate,
} from "./preview-templates";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  SectionPreviewNavigatorProps,
  navbarSections as sections,
  VechilePreviewNavigatorProps,
  navbarVehicles as vehicles,
} from "./data";

export default function PreviewNavigator() {
  const [tab, setTab] = useState(`/${vehicles[0].type}s/${vehicles[0].id}`);
  const [isVehicleTab, setIsVehicleTab] = useState(true);
  const activeObject = isVehicleTab
    ? vehicles.find((vehicle) => `/${vehicle.type}s/${vehicle.id}` === tab) ||
      vehicles[0]
    : sections.find((section) => section.label === tab) || sections[0];
  return (
    <div className="sm:h-full">
      <div className="lg:flex  hidden h-full  ">
        <div className="w-48 xl:w-60 space-y-2 border-r px-2 py-2 h-full">
          {vehicles.map((vehicle) => (
            <Button
              variant="ghost"
              onClick={() => {
                setTab(`/${vehicle.type}s/${vehicle.id}`);
                setIsVehicleTab(true);
              }}
              key={vehicle.id}
              className={`block px-4 py-2 rounded-lg text-left w-full cursor-pointer transition-all ${
                tab === `/${vehicle.type}s/${vehicle.id}`
                  ? "bg-gray-200/60 font-semibold"
                  : ""
              }`}
            >
              {vehicle.label}
            </Button>
          ))}
          {sections.map((section) => (
            <Button
              variant="ghost"
              onClick={() => {
                setTab(section.label);
                setIsVehicleTab(false);
              }}
              key={section.label}
              className={`block px-4 py-2 rounded-lg text-left w-full cursor-pointer transition-all ${
                tab === section.label ? "bg-gray-200/60 font-semibold" : ""
              }`}
            >
              {section.label}
            </Button>
          ))}
        </div>
        <div className="flex-1 h-full overflow-y-auto ">
          {isVehicleTab ? (
            <VehiclesPreviewTemplate
              vehicle={activeObject as VechilePreviewNavigatorProps}
            />
          ) : (
            <GenralPreviewTemplate
              section={activeObject as SectionPreviewNavigatorProps}
            />
          )}
        </div>
      </div>
      <div className=" lg:hidden">
        {vehicles.map((vehicle) => (
          <Link
            href={`/${vehicle.type}s/${vehicle.id}`}
            key={vehicle.id}
            className="text-xl sm:text-2xl md:text-3xl font-medium hover:underline block  lg:hidden py-2 text-center"
          >
            {vehicle.label}
          </Link>
        ))}
        {sections.map((section) => (
          <Link
            href={section.href}
            key={section.label}
            className="text-xl sm:text-2xl md:text-3xl font-medium hover:underline block  lg:hidden py-2 text-center"
          >
            {section.label}
          </Link>
        ))}
        <Link
          href="/contact?type=test-drive"
          className=" lg:hidden flex-1 justify-center flex items-center mt-4 mb-2"
        >
          <Button className=" text-lg sm:text-xl md:text-3xl sm:x-8 sm:py-6  rounded-full bg-yellow-500 hover:bg-yellow-500/90 cursor-pointer">
            Book Test Drive
          </Button>
        </Link>
      </div>
    </div>
  );
}
