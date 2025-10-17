import MotorsPage from "@/components/motors/motors-page";
import { bikesData } from "@/data/motors";
import React from "react";

export default function BikesPage() {
  return <MotorsPage motors={bikesData} />;
}
