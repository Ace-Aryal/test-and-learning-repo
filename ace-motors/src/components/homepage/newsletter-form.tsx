import React from "react";
import { MaxWidthWrapper } from "../templates/max-width-wrapper";
import { Button } from "@/components/ui/button"; // adjust path if needed

export default function NewsletterForm() {
  return (
    <section className="bg-gradient-to-b from-zinc-500 to-zinc-800 py-16 text-background px-1">
      <MaxWidthWrapper>
        <div className="rounded-2xl bg-foreground p-4 sm:p-8 md:p-12 flex flex-col items-center sm:items-start sm:flex-row gap-6">
          {/* Text Section */}
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight sm:w-1/2 text-center sm:text-left">
            Get updates on new vehicles, promotions and more.
          </h2>

          {/* Form Section */}
          <form className="sm:w-1/2 space-y-6 w-full">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-zinc-800/90 text-background placeholder:text-zinc-300 outline-none focus:ring-2 ring-zinc-900 text-sm block w-full p-[1rem] rounded"
            />
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              placeholder="Enter your zip code"
              className="bg-zinc-800/90 text-background placeholder:text-zinc-300 outline-none focus:ring-2 ring-zinc-900 text-sm block w-full p-[1rem] rounded"
            />

            {/* Subscribe Button */}
            <Button className="rounded-full bg-yellow-600 hover:bg-yellow-500/90 cursor-pointer h-12 w-full sm:w-auto px-8">
              Subscribe
            </Button>

            {/* Disclaimer */}
            <p className="text-xs text-zinc-300/80 mt-2">
              By subscribing, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-2 hover:text-yellow-400"
              >
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-2 hover:text-yellow-400"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
