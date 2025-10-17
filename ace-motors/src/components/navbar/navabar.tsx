"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import { HeroContext } from "../providers/providers";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react"; // simple icons
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "../ui/logo";
import { TbMenu } from "react-icons/tb";
import { Button } from "../ui/button";
import PreviewNavigator from "./preview-navigator";
export default function Navbar() {
  const heroContext = useContext(HeroContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
      } else {
        // Show navbar when scrolling up
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nonPreviewLinks = [
    { name: "Bikes", href: "/bikes" },
    { name: "Cars", href: "/cars" },
  ];
  useEffect(() => {
    console.log(isHoveringHeader, !heroContext, !heroContext?.isShowingHero);
  }, [heroContext, isOpen, isHoveringHeader]);
  return (
    // backgrond color for the navbar is conditonal if is it if it is in the hero section or not using context
    <header
      onMouseOver={() => setIsHoveringHeader(true)}
      onMouseLeave={() => setIsHoveringHeader(false)}
      className={cn(
        "fixed top-0   lg:top-4 z-50 max-w-7xl mx-auto font-[custom-regular] items-center inset-x-0 lg:inset-x-6 h-20  lg:rounded-xl shadow-lg   lg:border lg:border-gray-200 hover:bg-background group hover:text-foreground  transition-all  bg-background text-foreground",
        {
          "bg-transparent text-background  lg:border-transparent shadow-none":
            heroContext && heroContext.isShowingHero,
          "bg-background text-foreground lg:rounded-b-none": isOpen,
          hidden: !visible,
        }
      )}
    >
      <div className="flex items-center flex-1  lg:justify-between gap-x-8 px-4 max-w-6xl mx-auto h-full">
        <div className="flex items-center lg:gap-4 lg:flex-1">
          <Button
            variant={"ghost"}
            className=" p-2 rounded-full "
            onClick={() => {
              if (isOpen) {
                setIsHoveringHeader(false);
              }
              setIsOpen((prev) => !prev);
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <TbMenu size={24} />}
          </Button>
          {/* Logo */}
          <nav className="hidden lg:flex">
            <ul className="flex space-x-2">
              {nonPreviewLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    className="drop-shadow-lg   rounded-xl px-3 py-2 transition-colors font-medium"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Link href="/" className="flex items-center justify-center  flex-1">
          <Logo
            className="text-2xl"
            color={
              isOpen ||
              isHoveringHeader ||
              !heroContext ||
              !heroContext.isShowingHero
                ? "black"
                : "white"
            }
          />
        </Link>
        <Link
          href="/contact?type=test-drive"
          className="hidden lg:inline-flex flex-1 justify-end"
        >
          <Button className="  rounded-full bg-yellow-500 hover:bg-yellow-500/90 cursor-pointer">
            Test Drive
          </Button>
        </Link>

        {/* Mobile Hamburger */}
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "tween", duration: 0.2 }}
            className=" bg-background text-foreground max-w-7xl mx-auto  py-4     px-6  h-[calc(100vh-5rem)]  lg:h-[calc(100vh-8rem)]  lg:max-h-[40rem]  border sm:rounded-b-xl shadow-lg overflow-y-auto"
          >
            {nonPreviewLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className=" text-xl sm:text-2xl md:text-3xl font-medium hover:underline block py-2  lg:hidden text-center"
              >
                {item.name}
              </Link>
            ))}
            <PreviewNavigator />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
