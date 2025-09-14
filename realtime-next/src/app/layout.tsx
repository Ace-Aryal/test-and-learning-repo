import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/providers/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ace Chats",
  description:
    "acechats - A realtime chat application for mobile and web. Created by Dipesh Aryal as a side project to learn reid and realtime chat systems. This app is not intended for commercial use. This app is also developed for mobile devices using same backend.",
  authors: [
    {
      name: "Dipesh Aryal",
      url: "https://aryaldipesh.com.np",
    },
    {
      name: "Ace Aryal",
      url: "https://github.com/ace-aryal",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Providers>
          <Toaster position="top-center" richColors />
          <main className="min-h-screen flex flex-col max-w-screen w-full">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
