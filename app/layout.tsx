// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://purvanchal-1.vercel.app"),
  title: {
    default: "Purvanchal | B2B Product Catalog",
    template: "%s | Purvanchal",
  },
  description: "Browse products from local sellers in one B2B catalog.",
  openGraph: {
    title: "Purvanchal",
    description: "B2B product catalog for the local market.",
    url: "/",
    siteName: "Purvanchal",
    type: "website",
  },
};
// import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


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