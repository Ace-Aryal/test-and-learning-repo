import HeroSection from "@/components/homepage/hero-section";
import HorizontalScroll from "@/components/homepage/highlights";
import LocationsMarquee from "@/components/homepage/locations-marquee";
import NewsletterForm from "@/components/homepage/newsletter-form";
import ScrollVideo from "@/components/homepage/video-sroll-trigger";
import React from "react";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <HorizontalScroll />
      <LocationsMarquee />
      <NewsletterForm />
      <ScrollVideo />
    </div>
  );
}
