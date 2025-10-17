"use client";
import { Motor } from "@/data/motors";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../templates/max-width-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function MotorsPage({ motors: allMotors }: { motors: Motor[] }) {
  const [motors, setMotors] = React.useState(allMotors);
  const [query, setQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState<
    "latest" | "priceHigh" | "priceLow"
  >("latest");
  const pathname = usePathname();
  const motor = pathname.split("/")[1];
  // Debounce search
  React.useEffect(() => {
    const handler = setTimeout(() => {
      // TODO: Implement actual search/filter logic here
      const filteredMotors = allMotors
        .filter(
          (motor) =>
            motor.name.toLowerCase().includes(query.toLowerCase()) ||
            motor.baseFeatures.make.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => {
          if (sortBy === "latest") {
            return Number(b.baseFeatures.make) - Number(a.baseFeatures.make);
          } else if (sortBy === "priceHigh") {
            return b.variants[0].price - a.variants[0].price;
          } else if (sortBy === "priceLow") {
            return a.variants[0].price - b.variants[0].price;
          }
          return 0;
        });
      setMotors(filteredMotors);
      // filter and sort will both modify `motors`
      console.log("Search triggered for:", query, "Sort by:", sortBy);
    }, 100);
    return () => clearTimeout(handler);
  }, [query, sortBy]);

  return (
    <div className="w-full space-y-6 py-12 pt-24 ">
      {/* Toolbar */}
      <div className=" z-10 bg-background/80 backdrop-blur-md  border-border ">
        <div className="max-w-5xl  sm:px-4 md:px-8 mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4">
          {/* Search box */}
          <div className="w-full sm:w-[320px]">
            <Label htmlFor="search" className="text-sm text-foreground">
              Search your ride
            </Label>
            <Input
              id="search"
              placeholder={`Search ${motor} by name or make`}
              className="mt-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Dropdown filter */}
          <div className="w-full sm:w-[200px]">
            <Label htmlFor="sort" className="text-sm text-foreground">
              Sort by
            </Label>
            <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
              <SelectTrigger id="sort" className="mt-1">
                <SelectValue placeholder="Sort options" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest Arrivals</SelectItem>
                <SelectItem value="priceHigh">Price: High → Low</SelectItem>
                <SelectItem value="priceLow">Price: Low → High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Motors grid */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <MotorsGrid motors={motors} />
      </div>
    </div>
  );
}
export function MotorsGrid({ motors }: { motors: Motor[] }) {
  const pathname = usePathname();
  const motorType = pathname.split("/")[1];

  return (
    <MaxWidthWrapper className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 max-w-6xl">
      {motors.map((motor) => (
        <div
          key={motor.slug}
          className={`    flex flex-col items-center justify-center   flex-shrink-0 bg-background`}
        >
          <Image
            src={motor.images[0]}
            alt={motor.name}
            width={500}
            height={500}
            className=" object-cover "
          />
          <div className="flex-1 flex flex-col gap-2 sm:gap-3 items-center py-2 text-center">
            <h2 className=" text-2xl tracking-tight font-semibold ">
              {motor.name}
            </h2>
            <p className="text-lg tracking-tight">
              Starting at{" "}
              <span className="font-[custom-regular] text-base">
                {motor.variants[0].price}
              </span>
            </p>
            <div className="flex justify-center gap-2">
              <Link href={`/${motorType}/${motor.slug}`}>
                <Button
                  variant="default"
                  className="text-xs rounded-full w-24 cursor-pointer py-5"
                >
                  Explore
                </Button>
              </Link>
              <Link href={`/checkout/?bike=${motor.slug}`}>
                <Button
                  variant="outline"
                  className="text-xs rounded-full w-24 cursor-pointer py-5 bg-transarent hover:bg-white/10 "
                >
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </MaxWidthWrapper>
  );
}
