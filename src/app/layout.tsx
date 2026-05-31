import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { MarketingScripts } from "@/components/marketing/MarketingScripts";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Aftercare",
  description: "Some endings deserve ceremony.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`dark ${cormorant.variable} ${inter.variable}`}
    >
      <body className="overflow-x-hidden bg-app font-sans text-app antialiased">
        <ThemeProvider>
          {children}
          <MarketingScripts />
        </ThemeProvider>
      </body>
    </html>
  );
}
