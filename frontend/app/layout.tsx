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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  title: {
    default: "StellarFreight — Stellar-Powered Global Freight",
    template: "%s | StellarFreight",
  },
  description:
    "StellarFreight is building a modern logistics platform with streamlined digital payments and transparent shipment tracking.",
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
    title: "StellarFreight — Stellar-Powered Global Freight",
    description:
      "Modern freight operations with transparent payment and tracking workflows.",
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



