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

import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} flex flex-col min-h-screen bg-black text-white antialiased overflow-x-hidden w-full`}>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0a0a0a',
              color: '#fff',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              fontSize: '13px',
              fontWeight: '600',
              padding: '12px 24px',
              borderRadius: '12px',
              fontFamily: 'var(--font-poppins)',
              letterSpacing: '0.025em',
            },
            success: {
              iconTheme: {
                primary: '#d4af37',
                secondary: '#000',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
