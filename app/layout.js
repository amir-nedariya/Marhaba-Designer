import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Marhaba Designer | All Printing Solutions",
  description: "Professional design and printing services for visiting cards, banners, pamphlets, and more in premium quality.",
  keywords: "Marhaba Designer, printing, design, banners, visiting cards, business cards, Bill Book, PVC cards, Pamphlets, Letterhead, Envelope, Stickers",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} flex flex-col min-h-screen bg-black text-white antialiased overflow-x-hidden w-full`}>
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
