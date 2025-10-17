import MotorsGrid from "@/components/motors/motors-grid";
import { carsData } from "@/data/motors";
import React from "react";

export default function CarsPage() {
  return <MotorsGrid motors={carsData} />;
}
