import "./globals.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
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
      <body className={`${inter.variable} ${poppins.variable} flex flex-col min-h-screen bg-black text-white antialiased overflow-x-hidden w-full`}>
        {children}
      </body>
    </html>
  );
}
