import MotorsPage from "@/components/motors/motors-page";
import { carsData } from "@/data/motors";
import React from "react";

export default function CarsPage() {
  return <MotorsPage motors={carsData} />;
}
