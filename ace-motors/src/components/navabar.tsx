"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use, useContext, useEffect, useState } from "react";
import { HeroContext } from "./providers/providers";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react"; // simple icons
import { motion } from "motion/react";
import { Logo } from "./ui/logo";
export default function Navbar() {
  const heroContext = useContext(HeroContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);
  const navItems = [
    { name: "Models", href: "/models" },
    { name: "Services", href: "/#services" },
    { name: "Book An Appointment", href: "/#appointment" },
  ];

  return (
    // backgrond color for the navbar is conditonal if is it if it is in the hero section or not using context
    <header
      onMouseOver={() => setIsHoveringHeader(true)}
      onMouseLeave={() => setIsHoveringHeader(false)}
      className={cn(
        "fixed top-0 sm:top-4 z-50  items-center inset-x-0 sm:inset-x-6 h-20 sm:h-24 sm:rounded-xl shadow-lg  sm:border sm:border-gray-200 hover:bg-background group hover:text-foreground  transition-all md:overflow-hidden bg-background text-foreground",
        {
          "bg-transparent text-background  sm:border-transparent shadow-none":
            heroContext && heroContext.isShowingHero,
          "bg-background text-foreground": isOpen,
        }
      )}
    >
      <div className="flex items-center flex-1  md:justify-start justify-between gap-x-8 px-4 max-w-6xl mx-auto h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo
            color={
              isHoveringHeader || !heroContext || !heroContext.isShowingHero
                ? "black"
                : "white"
            }
            className="group:hover:text-foreground"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  className="drop-shadow-lg text-lg  rounded-xl px-3 py-2 transition-colors font-medium"
                  href={item.href}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: "tween", duration: 0.2 }}
          className="md:hidden bg-foreground text-white  px-6 py-4 space-y-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium hover:underline"
            >
              {item.name}
            </Link>
          ))}
        </motion.nav>
      )}
    </header>
  );
}
