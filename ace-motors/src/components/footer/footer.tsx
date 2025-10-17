import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { MaxWidthWrapper } from "../templates/max-width-wrapper";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-border py-12">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <h2 className="text-2xl font-semibold text-background tracking-tight">
              Zenith Motors
            </h2>
            <p className="text-sm text-muted text-opacity-90 max-w-xs">
              Driving innovation and excellence — redefining the future of
              mobility.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
            <h3 className="text-sm font-semibold text-background uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/bikes" className="hover:text-muted transition">
                  Bikes
                </a>
              </li>
              <li>
                <a href="/cars" className="hover:text-muted transition">
                  Cars
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-muted transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-muted transition">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-muted transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-3">
            <h3 className="text-sm font-semibold text-background uppercase tracking-wide">
              Connect with us
            </h3>
            <p className="text-sm text-muted text-opacity-90">
              Kathmandu, Nepal
              <br />
              support@zenithmotors.com
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-muted transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-muted transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-muted transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-muted transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} Zenith Motors. All rights reserved.
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
