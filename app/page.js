"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MoveRight, Star, Truck, ShieldCheck, Printer, ChevronLeft, ChevronRight, Feather, MessageCircle } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import ProductCard from "@/components/ProductCard";
import InquiryForm from "@/components/InquiryForm";
import { products, services } from "@/data/products";

export default function Home() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left"
        ? scrollLeft - clientWidth / 1.5
        : scrollLeft + clientWidth / 1.5;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex flex-col bg-black text-white">
      {/* 🚀 Elite Dark Luxury Hero Section (Madhuram Style) */}
      <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden px-4">
        {/* Immersive Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 -right-20 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[180px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left Content: High-Impact Typography (Responsive) */}
            <div className="lg:col-span-7 space-y-12 animate-fade-in-up text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-gold text-xs sm:text-sm font-black uppercase tracking-[0.4em] shadow-2xl mx-auto lg:mx-0">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
                </span>
                World-Class Printing Artistry
              </div>
              
              <div className="space-y-6">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-black leading-[0.85] tracking-tighter">
                  Marhaba <br />
                  <span className="gold-gradient-text tracking-[-0.05em] filter drop-shadow-[0_15px_45px_rgba(212,175,55,0.25)]">Designer</span>
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl font-display text-white/80 max-w-2xl mx-auto lg:mx-0 font-light">
                  Precision in Every Pixel <span className="text-gold mx-2 opacity-30">|</span> Premium Custom Branding
                </p>
              </div>

              <p className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Discover the pinnacle of commercial identity. From bespoke visiting cards to industrial-scale flex banners, we define the future of premium printing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-10 justify-center lg:justify-start">
                <Link href="#inquiry" className="px-12 py-6 rounded-[2rem] bg-gold text-black font-black text-xl hover:bg-gold-light hover:scale-105 active:scale-95 transition-all shadow-[0_25px_60px_-10px_rgba(212,175,55,0.45)] flex items-center justify-center group whitespace-nowrap uppercase tracking-widest">
                  Get Started
                  <MoveRight className="ml-3 w-7 h-7 group-hover:translate-x-3 transition-transform" />
                </Link>
                <Link href="/products" className="px-12 py-6 rounded-[2rem] border-2 border-white/10 text-white font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-3xl uppercase tracking-widest">
                   Catalog
                </Link>
              </div>
            </div>

            {/* Right Content: 3D Visualization (Stacked for Mobile) */}
            <div className="lg:col-span-5 relative animate-fade-in group w-full max-w-[500px] lg:max-w-full mx-auto order-1 lg:order-2 perspective-3000">
               <div className="relative w-full aspect-square transition-transform duration-[3s] group-hover:rotate-y-12">
                 <div className="absolute inset-0 bg-gold/15 rounded-full blur-[120px] scale-90 animate-pulse mix-blend-screen" />
                 <Image
                    src="/marhaba_hero_mockup.png"
                    alt="Marhaba Designer Luxury Mockups"
                    fill
                    className="object-contain drop-shadow-[0_60px_60px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-1000"
                    priority
                 />
               </div>
               {/* High-Fidelity Floating Badge */}
               <div className="absolute -bottom-10 lg:-bottom-14 -left-10 lg:-left-14 bg-white/5 backdrop-blur-3xl border border-white/15 p-8 lg:p-10 rounded-[50px] shadow-3xl animate-float z-20">
                 <div className="flex items-center gap-6">
                    <div className="p-5 rounded-3xl bg-gold/20 border border-gold/40 shadow-inner">
                      <Star className="w-10 h-10 text-gold fill-gold" />
                    </div>
                    <div className="text-left">
                      <div className="text-3xl lg:text-4xl font-black text-white leading-none mb-2 tracking-tighter">2000+</div>
                      <div className="text-[10px] lg:text-xs text-gold font-bold uppercase tracking-[0.3em] whitespace-nowrap">Projects Delivered</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Animated Scroll Prompt */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
           <span className="text-[10px] uppercase font-black tracking-[0.5em] text-gray-500">Scroll</span>
           <div className="w-px h-16 bg-gradient-to-b from-gold via-gold/50 to-transparent" />
        </div>
      </section>

      {/* 🛠️ Services Section (Deep Professional Grid) */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 border-y border-white/5 bg-black relative">
        <div className="text-center mb-28 space-y-8 animate-fade-in">
          <div className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gold text-[10px] font-black uppercase tracking-[0.4em]">Professional Expertise</div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">Artisanal <br /><span className="gold-gradient-text italic tracking-widest">Precision</span></h2>
          <p className="text-gray-400 text-xl font-light max-w-3xl mx-auto leading-relaxed italic">"From bespoke concepts to high-definition reality, we empower your brand with premium printing craftsmanship."</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { title: "Business Identity", icon: Star, desc: "Luxury visiting cards and bespoke corporate corporate stationary sets." },
            { title: "Grand Displays", icon: Printer, desc: "High-definition Flex banners, signage, and trade show displays." },
            { title: "Industrial Ledger", icon: Truck, desc: "Custom Bill Books, Receipt vouchers, and custom invoice systems." },
            { title: "Branding Kits", icon: Feather, desc: "Elite brochures, premium marketing pamphlets, and stickers." }
          ].map((service, index) => (
             <ServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              description={service.desc}
            />
          ))}
        </div>
      </section>

      {/* 📦 High-Definition Product Showcase (Horizontal Carousel) */}
      <section className="bg-black py-40 overflow-hidden relative">
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-8 max-w-2xl">
               <div className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gold text-[10px] font-black uppercase tracking-[0.4em]">Signature Collection</div>
               <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">Premium <br /><span className="gold-gradient-text uppercase italic tracking-widest">Gallery</span></h2>
               <p className="text-gray-400 text-xl font-light max-w-lg">A curated showcase of our most sophisticated printing endeavors delivered to elite brands.</p>
            </div>
            <div className="flex gap-6 mx-auto md:mx-0">
               <button onClick={() => scroll("left")} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-gold hover:bg-gold hover:text-black transition-all shadow-3xl hover:-translate-y-2"><ChevronLeft className="w-8 h-8" /></button>
               <button onClick={() => scroll("right")} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-gold hover:bg-gold hover:text-black transition-all shadow-3xl hover:-translate-y-2"><ChevronRight className="w-8 h-8" /></button>
            </div>
          </div>
        </div>
        
        <div className="relative max-w-full lg:max-w-[1500px] ml-auto overflow-visible select-none px-4 md:px-0">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-10 pb-20 snap-x no-scrollbar scroll-smooth p-6"
          >
            {products.map((product) => (
              <div key={product.id} className="min-w-full md:min-w-[550px] snap-center transform hover:scale-[1.03] transition-all duration-700">
                <ProductCard 
                  title={product.title}
                  image={product.image}
                  isDark={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✨ Trusted Industry Standards & Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 bg-black border-t border-white/5 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-20">
            <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter max-w-md uppercase">Setting <br />Industry <br /><span className="gold-gradient-text uppercase text-[0.8em] block tracking-widest italic">Standards</span></h2>
              <div className="w-32 h-2 bg-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
            </div>
            
            <div className="space-y-12">
              {[
                { icon: ShieldCheck, title: "Precision HD Printing", desc: "We utilize 2400 DPI ultra-high-definition machinery for the world's finest results." },
                { icon: Truck, title: "On-Time Fulfillment", desc: "Industrial-grade logistics ensuring your project arrives across regions globally." },
                { icon: Star, title: "Bespoke Finishing", desc: "From foil stamping to metallic embossing, we provide the elite finishing touch." }
              ].map((item, i) => (
                <div key={i} className="flex gap-10 items-start group">
                  <div className="bg-gold/10 p-6 rounded-[2rem] border border-gold/25 shrink-0 group-hover:bg-gold transition-all duration-700 group-hover:-translate-y-2 shadow-2xl">
                    <item.icon className="w-9 h-9 text-gold group-hover:text-black transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-white group-hover:text-gold transition-colors tracking-tight uppercase">{item.title}</h3>
                    <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group perspective-3000">
            <div className="absolute inset-0 bg-gold/10 rounded-full blur-[140px] mix-blend-screen animate-pulse pointer-events-none" />
            <div className="rounded-[5rem] overflow-hidden border border-white/10 relative z-10 shadow-3xl grayscale hover:grayscale-0 transition-all duration-[2s] scale-95 group-hover:scale-100 rotate-2 group-hover:rotate-0">
               <Image 
                src="/luxury_printing_press_3d_1774520694633.png" 
                alt="Elite Printing Infrastructure" 
                layout="responsive"
                width={800}
                height={1000}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-[3s]" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 📨 WhatsApp Consultation Area (Premium) */}
      <section id="inquiry" className="py-40 relative bg-black overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-[45%] space-y-16 text-center lg:text-left">
              <div className="space-y-10">
                 <div className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gold text-[10px] font-black uppercase tracking-[0.4em]">Expert Consultation</div>
                 <h2 className="text-6xl md:text-[100px] font-black leading-[0.85] text-white tracking-tighter uppercase mb-6">Start Your <br /><span className="gold-gradient-text uppercase italic tracking-[0.1em]">Inquiry</span></h2>
                 <p className="text-gray-300 text-xl font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                    Your vision is unique. Partner with our elite design specialists to create your hallmark commercial identity.
                 </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                   { icon: ShieldCheck, title: "ISO Standards", sub: "Global Quality" },
                   { icon: MessageCircle, title: "24/7 Service", sub: "WhatsApp Support" }
                 ].map((box, i) => (
                   <div key={i} className="flex flex-col items-center lg:items-start gap-5 p-10 rounded-[40px] bg-white/5 border border-white/10 hover:border-gold/40 transition-all shadow-3xl group shadow-inner">
                    <div className="w-16 h-16 rounded-3xl bg-gold/20 flex items-center justify-center border border-gold/30 group-hover:bg-gold transition-all duration-700 shadow-inner">
                       <box.icon className="w-9 h-9 text-gold group-hover:text-black transition-colors" />
                    </div>
                    <div>
                       <h4 className="text-white font-black text-2xl tracking-tight uppercase mb-1">{box.title}</h4>
                       <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em]">{box.sub}</p>
                    </div>
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="lg:w-[55%] w-full relative">
              <div className="absolute -inset-10 bg-gold/5 rounded-[80px] blur-3xl opacity-10 pointer-events-none" />
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* 🏆 Final Grand Elevation (Madhuram Style) */}
      <section className="mb-40 px-4 relative z-10">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-gold via-gold-dark to-gold rounded-[5rem] lg:rounded-[120px] p-16 sm:p-28 md:p-36 text-center relative overflow-hidden shadow-[0_60px_120px_-30px_rgba(212,175,55,0.5)] group uppercase">
          <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:scale-150 transition-transform duration-[5s]" />
          
          <div className="relative z-10 max-w-5xl mx-auto space-y-16">
            <h2 className="text-5xl sm:text-7xl md:text-9xl lg:text-[140px] font-black text-black leading-[0.75] tracking-tighter">
              BEYOND <br /> ORDINARY <br /> PRINTING
            </h2>
            <Link href="#inquiry" className="inline-flex bg-black text-white px-12 sm:px-20 py-6 sm:py-8 rounded-full font-black text-2xl sm:text-3xl uppercase tracking-[0.4em] hover:scale-110 active:scale-95 transition-all shadow-4xl hover:shadow-gold hover:text-gold">
              BUILD NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-12 right-12 z-[100] group animate-fade-in">
         <a 
           href="https://wa.me/919876543210" 
           target="_blank" 
           className="relative flex items-center justify-center w-20 h-20 bg-[#25D366] rounded-full shadow-4xl hover:scale-110 active:scale-90 transition-all duration-500 overflow-hidden"
         >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <MessageCircle className="w-10 h-10 text-white fill-white shadow-inner" />
         </a>
         <div className="absolute right-24 top-1/2 -translate-y-1/2 px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block pointer-events-none shadow-3xl scale-90 group-hover:scale-100">
            WHATSAPP CONSULTATION
         </div>
      </div>
    </div>
  );
}
