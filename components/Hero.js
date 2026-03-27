"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Feather, ArrowRight } from "lucide-react";

const printingItems = [
  {
    title: "All Printing Works",
    image: "/images/printing/phamplate.png"
  },
  // {
  //   title: "All Printing Works",
  //   image: "/images/printing/visiting-card.png"
  // }
  {
    title: "Visiting Cards",
    image: "/images/printing/visiting-card.png",
  },
  // {
  //   title: "Banners & Flex",
  //   image: "/images/printing/banner.jpg",
  // },
  // {
  //   title: "Pamphlets & Flyers",
  //   image: "/images/printing/phamplate.jpg",
  // },
  // {
  //   title: "Bill Books",
  //   image: "/images/printing/bill-book.jpg",
  // },
  // {
  //   title: "Stickers & Labels",
  //   image: "/images/printing/sticker.jpg",
  // },
  // {
  //   title: "Letterhead & Stationery",
  //   image: "/images/printing/letterhead.jpg",
  // },
  // {
  //   title: "Custom Envelopes",
  //   image: "/images/printing/envelope.jpg",
  // },
  // {
  //   title: "Printed Shopping Bags",
  //   image: "/images/printing/nonwoven-bag.jpg",
  // },
  // {
  //   title: "All Printing Works",
  //   image: "/images/printing/all-printing.jpg",
  // },
];

export default function Hero({
  badge = "Leading All Printing Solutions",
  description = "Transforming your ideas into luxury reality with the most professional printing equipment and creative expertise."
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % printingItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeItem = printingItems[activeIndex];

  return (
    <section className="relative min-h-[75vh] py-16 lg:py-24 overflow-hidden bg-black flex items-center justify-center px-4 sm:px-10 lg:p-24">
      {/* --- PREMIUM ATMOSPHERE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cinematic Gold Ambient Glows */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] lg:h-[800px] lg:w-[800px] rounded-full bg-gold/10 blur-[120px] lg:blur-[150px] opacity-40" />
        <div className="absolute top-1/3 right-0 translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] lg:h-[1000px] lg:w-[1000px] rounded-full bg-white/5 blur-[150px] lg:blur-[180px] opacity-20" />

        {/* Moving Light Sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-[sweep_12s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] w-full items-center gap-12 lg:gap-32 grid-cols-1 lg:grid-cols-2 lg:pr-12">
        {/* --- LEFT LUXURY CONTENT --- */}
        <div className="animate-fade-in relative z-10 w-full max-w-2xl lg:pl-12 text-center lg:text-left">

          <div className="relative z-10 flex flex-col items-center lg:items-start">
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-12 w-12 lg:h-14 lg:w-14 shrink-0 overflow-hidden">
                <Image
                  src="/images/marhaba_logo.png"
                  alt="Marhaba Logo"
                  fill
                  className="object-cover scale-110"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                  }}
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.4em] text-gold">Welcome To</span>
                <span className="text-xs lg:text-sm font-bold tracking-tight text-white uppercase">Marhaba Designer</span>
              </div>
            </div>

            <div className="flex items-start gap-0 lg:gap-8 mb-8 w-full">
              <div className="h-40 w-[1px] bg-gradient-to-b from-gold/40 via-gold/10 to-transparent shrink-0 mt-2 hidden lg:block" />

              <div className="w-full">
                <div className="mb-6 font-display font-black leading-none tracking-tighter text-white">
                  <span className="block text-5xl sm:text-7xl lg:text-8xl mb-3 sm:mb-4">No. <span className="gold-gradient-text">1</span></span>
                  <h1 className="text-[14px] sm:text-2xl lg:text-4xl opacity-95 font-bold uppercase tracking-tight whitespace-nowrap">Luxury Design</h1>
                </div>

                {/* <div className="w-16 h-1 bg-gold mb-8 rounded-full mx-auto lg:mx-0" /> */}

                <p className="mb-10 text-sm sm:text-base font-medium leading-relaxed text-white/50 max-w-sm mx-auto lg:mx-0">
                  Defining the standard of excellence in <span className="text-white/80">high-end design</span> and precision printing for elite brands worldwide.
                </p>

                <div className="flex justify-center lg:justify-start">
                  <Link href="/contact" className="group flex h-14 lg:h-16 w-full max-w-[220px] lg:max-w-[240px] items-center justify-center gap-4 rounded-xl bg-gold text-xs lg:text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-white hover:scale-[1.05] shadow-2xl shadow-gold/10">
                    Get Quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT CINEMATIC SHOWCASE --- */}
        <div className="relative flex items-center justify-center px-4 sm:px-0">
          {/* Subtle Stage Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] lg:h-[500px] lg:w-[500px] rounded-full bg-gold/5 blur-[80px] lg:blur-[100px]" />

          <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[400px] lg:max-w-[500px]">
            {/* Static Mockup Showcase */}
            <div className="relative flex h-full w-full items-center justify-center transition-all duration-1000 ease-in-out">
              <Image
                key={activeItem.image}
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- ANIMATIONS STYLE --- */}
      <style jsx>{`
        .cube-float {
          animation: floatAnimation 6s ease-in-out infinite;
        }
        .cube-float-alt {
          animation: floatAnimationAlt 8s ease-in-out infinite;
        }

        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        @keyframes floatAnimationAlt {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(30px) rotate(40deg); }
        }
      `}</style>
    </section>
  );
}