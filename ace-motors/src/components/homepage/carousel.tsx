"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { HeroContext } from "../providers/providers";
import { useInView } from "react-intersection-observer";

interface CarouselCardProps {
  title: string;
  description: string;
  cta: React.ReactNode;
  background: React.ReactNode;
}

interface FullscreenCarouselProps {
  cards: CarouselCardProps[];
  autoplayInterval?: number;
}

export default function FullscreenCarousel({
  cards,
  autoplayInterval = 3000,
}: FullscreenCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = React.useState(0);
  const heroContext = React.useContext(HeroContext);
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      console.log("in view: ", inView, heroContext);
      heroContext?.setIsShowingHero(inView);
    },
  });
  // Autoplay
  React.useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), autoplayInterval);
    return () => clearInterval(interval);
  }, [emblaApi, autoplayInterval]);

  // Sync current index
  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div ref={ref} className="relative w-screen h-screen overflow-hidden">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {cards.map((card, index) => (
            <div
              className="relative flex-[0_0_100%] h-full w-full flex items-center "
              key={index}
            >
              {/* Background */}
              <div className="absolute inset-0 -z-10">{card.background}</div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 -z-0" />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-md px-2 sm:px-6 sm:pl-16 2xl:pl-20 text-white"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-5xl font-bold mb-4"
                >
                  {card.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg mb-8 text-gray-200"
                >
                  {card.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex items-center gap-4"
                >
                  {card.cta}
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <Button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute top-1/2 left-4 -translate-y-1/2  rounded-full  h-8 w-8 z-20 hidden md:inline-flex"
        variant="secondary"
      >
        <ArrowLeft className=" w-4 h-4" />
      </Button>

      <Button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 rounded-full  h-8 w-8  hidden md:inline-flex"
        variant="secondary"
      >
        <ArrowRight className=" w-4 h-4" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {cards.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[0.25rem] w-6 rounded-full transition-all duration-500",
              current === i ? "bg-white w-[1.75rem]" : "bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
