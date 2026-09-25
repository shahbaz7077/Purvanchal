// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Purvanchal Engineering",
  description: "Precision engineered industrial components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // scroll-smooth enables smooth scroll on anchor links
    <html lang="en" className="scroll-smooth">
      <body className="w-full overflow-x-hidden bg-white text-blue-950">
        {children}
      </body>
    </html>
  );
}