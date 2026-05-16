import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Trustway Logistics — Stellar-Powered Global Freight",
    template: "%s | Trustway Logistics",
  },
  description:
    "Enterprise logistics platform with Stellar blockchain payments. Ship globally, pay instantly in seconds for near-zero fees — no bank required.",
  keywords: [
    "logistics",
    "freight",
    "Stellar",
    "blockchain payments",
    "international shipping",
    "USDC",
    "cross-border",
    "shipment tracking",
  ],
  openGraph: {
    title: "Trustway Logistics — Stellar-Powered Global Freight",
    description:
      "Ship globally and pay instantly via the Stellar network. 5-second settlement, near-zero fees, 180+ countries.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} font-sans min-h-screen antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
