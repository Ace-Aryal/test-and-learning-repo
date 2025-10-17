import MotorsGrid from "@/components/motors/motors-grid";
import { bikesData } from "@/data/motors";
import React from "react";

export default function BikesPage() {
  return <MotorsGrid motors={bikesData} />;
}
