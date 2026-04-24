import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CreditCard,
  Layers,
  Printer,
  Zap,
  ShieldCheck,
  Users
} from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <main className="relative z-10">
        <Hero />

        {/* --- SERVICES GRID --- */}
        {/* <section id="services" className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="mb-20 space-y-4 text-center">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Our Expertise</h2>
            <h3 className="section-title text-white">Full Spectrum Printing</h3>
            <p className="mx-auto max-w-xl text-white/40 font-medium font-sans">Precision, Quality, and Luxury in every detail.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceCard 
              icon={<CreditCard />} 
              title="Visiting Cards" 
              desc="Premium PVC, Matte, and Textured finishes for a lasting first impression."
            />
            <ServiceCard 
              icon={<Layers />} 
              title="Banners & Flex" 
              desc="High-resolution large scale printing for billboards, events, and promotions."
            />
            <ServiceCard 
              icon={<Printer />} 
              title="Pamphlets & Flyers" 
              desc="High-volume marketing materials with vibrant colors and sharp details."
            />
            <ServiceCard 
              icon={<Sparkles />} 
              title="Product Printing" 
              desc="Specialized solutions for stickers, labels, and creative decal solutions."
            />
          </div>
        </section> */}

        {/* --- PRODUCTS SECTION --- */}
        {/* <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="mb-20 flex flex-col sm:flex-row items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Gallery</h2>
              <h3 className="section-title text-white !mb-0 text-left">Featured Collections</h3>
            </div>
            <Link href="/contact" className="text-gold font-bold text-xs uppercase tracking-[0.3em] hover:opacity-70 transition-opacity">
              View All Works +
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                image={product.image}
                category={product.category}
                description={product.description}
              />
            ))}
          </div>
        </section> */}


        {/* --- FINAL CTA --- */}
        {/* <section className="mx-auto max-w-5xl px-4 py-32 text-center items-center flex flex-col">
          <div className="glass-card !border-gold/20 !p-12 sm:!p-20 relative overflow-hidden w-full group">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-gold/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <h2 className="section-title text-white mb-8">Ready to start your next <br /> <span className="gold-gradient-text">masterpiece?</span></h2>
            <Link href="/contact" className="btn-primary mx-auto w-full max-w-[300px] h-16 !rounded-xl uppercase tracking-widest text-sm relative z-10">
              Launch Inquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section> */}

      </main>
    </div>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="glass-card group hover:border-gold/40 transition-all duration-500">
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/5 text-gold border border-gold/10 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-gold/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-gold transition-colors">{title}</h3>
      <p className="text-sm font-medium leading-relaxed text-white/40 group-hover:text-white/60 transition-colors">
        {desc}
      </p>
    </div>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex gap-6 group">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/5 text-gold border border-gold/10 group-hover:bg-gold group-hover:text-black transition-all duration-300">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-2 leading-none group-hover:text-gold transition-colors">{title}</h4>
        <p className="text-sm font-medium leading-relaxed text-white/40">{desc}</p>
      </div>
    </div>
  );
}
