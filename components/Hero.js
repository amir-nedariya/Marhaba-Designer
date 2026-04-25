"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [logo, setLogo] = useState("/logo.jpg");
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Hero Dynamic Data
    const fetchHeroData = async () => {
      try {
        const res = await fetch('/api/admin/hero');
        if (res.ok) {
          const data = await res.json();
          setHeroData(data);
        }
      } catch (err) {
        console.error('Failed to fetch hero content:', err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch Content Logo
    const fetchLogo = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.header_logo) setLogo(data.header_logo);
        }
      } catch (err) {
        console.error('Failed to fetch hero logo:', err);
      }
    };

    fetchHeroData();
    fetchLogo();
  }, []);

  // Timer for Image Slider
  useEffect(() => {
    if (!heroData?.images?.length) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroData.images.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [heroData]);

  if (loading) return (
    <section className="min-h-[70vh] bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-gold" size={32} />
    </section>
  );

  // Fallback if no images found
  const activeItem = heroData?.images?.[activeIndex] || { imageUrl: '', title: '' };

  return (
    <section className="relative min-h-[70vh] pt-4 pb-16 lg:pt-8 lg:pb-24 overflow-hidden bg-black flex items-center justify-center px-4 sm:px-10 lg:p-24">
      {/* --- PREMIUM ATMOSPHERE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] lg:h-[800px] lg:w-[800px] rounded-full bg-gold/10 blur-[120px] lg:blur-[150px] opacity-40" />
        <div className="absolute top-1/3 right-0 translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] lg:h-[1000px] lg:w-[1000px] rounded-full bg-white/5 blur-[150px] lg:blur-[180px] opacity-20" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1600px] w-full items-center gap-12 lg:gap-32 grid-cols-1 lg:grid-cols-2 lg:px-12">
        {/* --- LEFT CONTENT --- */}
        <div className="animate-in fade-in slide-in-from-left-8 duration-1000 relative z-10 w-full max-w-2xl lg:pl-12 text-center lg:text-left">
          <div className="relative z-10 flex flex-col items-center lg:items-start">
            <div className="flex items-start gap-0 lg:gap-8 mb-8 w-full">
              <div className="h-40 w-[1px] bg-gradient-to-b from-gold/40 via-gold/10 to-transparent shrink-0 mt-2 hidden lg:block" />

              <div className="w-full">
                <div className="mb-6 font-display font-black leading-none tracking-tighter text-white">
                  <span className="block text-5xl sm:text-7xl lg:text-8xl mb-3 sm:mb-4">
                    {heroData?.headingPrefix} <span className="gold-gradient-text">{heroData?.headingMain}</span>
                  </span>
                  <h1 className="text-[14px] sm:text-2xl lg:text-4xl opacity-95 font-bold uppercase tracking-tight whitespace-nowrap">
                    {heroData?.subHeading}
                  </h1>
                </div>

                <p className="mb-10 text-sm sm:text-base font-medium leading-relaxed text-white/50 max-w-sm mx-auto lg:mx-0">
                  {heroData?.description}
                </p>

                <div className="flex justify-center lg:justify-start">
                  <Link href="/contact" className="group flex h-14 lg:h-16 w-full max-w-[220px] lg:max-w-[240px] items-center justify-center gap-4 rounded-xl bg-gold text-xs lg:text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-white hover:scale-[1.05] shadow-2xl shadow-gold/10">
                    {heroData?.ctaText || 'Get Quote'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SLIDER --- */}
        <div className="relative flex items-center justify-center px-4 sm:px-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] lg:h-[500px] lg:w-[500px] rounded-full bg-gold/5 blur-[80px] lg:blur-[100px]" />

          <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[400px] lg:max-w-[500px]">
            <div className="relative flex h-full w-full items-center justify-center transition-all duration-1000 ease-in-out">
              {activeItem.imageUrl && (
                <Image
                  key={activeItem.imageUrl}
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  fill
                  className="object-contain animate-in fade-in zoom-in-95 duration-1000"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>



      {/* --- BOTTOM SHAPE DIVIDER --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[80px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
}