import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NEXORA®",
    default: "NEXORA® — Independent Digital Studio",
  },
  description:
    "Independent digital studio creating websites, immersive 3D environments and visual experiences for modern businesses.",
  metadataBase: new URL("https://nexora.studio"),
  openGraph: {
    type: "website",
    locale: "en",
    siteName: "NEXORA®",
    title: "NEXORA® — Independent Digital Studio",
    description:
      "Independent digital studio creating websites, immersive 3D environments and visual experiences for modern businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXORA® — Independent Digital Studio",
    description:
      "Independent digital studio creating websites, immersive 3D environments and visual experiences for modern businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased selection:bg-accent selection:text-[#090A0A]`}>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-[#090A0A]">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
