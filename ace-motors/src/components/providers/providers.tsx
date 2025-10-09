// this componenet is used to wrap the whole with needed providers
// we have created hero section provider context for navbar background , roboto and inter font provider and preloader provider here
"use client";

import React, { createContext, useEffect, useState } from "react";
import { Inter, Roboto } from "next/font/google";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

export const HeroContext = createContext<{
  isShowingHero: boolean;
  setIsShowingHero: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isShowingHero, setIsShowingHero] = useState(true);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // hero visibility (navbar background logic)
  useEffect(() => {
    setIsShowingHero(false);
  }, [pathname]);

  // preloader: wait for window.load (images/videos/fonts) then hide
  useEffect(() => {
    const handleLoad = () => setTimeout(() => setLoading(false), 1200);
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <HeroContext.Provider value={{ isShowingHero, setIsShowingHero }}>
      <AnimatePresence mode="wait">
        {/* if assests are not downloaded show the preloader */}
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 500, opacity: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Image
                src="/logo.png"
                alt="Ace Car Deals Logo"
                width={160}
                height={160}
                priority
                className="w-32 h-32 sm:w-40 sm:h-40 "
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main app (hidden until loader finishes) */}
      <div
        className={`${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-700`}
      >
        {children}
      </div>
    </HeroContext.Provider>
  );
}
