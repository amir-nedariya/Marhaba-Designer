"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";



export default function LightProductCarousel() {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/admin/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-16 bg-white w-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title Section */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center gap-3 relative">
            <div className="relative flex items-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 font-sans tracking-tight">
                Our <span className="text-gold">Products</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative flex items-center group/carousel">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 md:-left-12 z-10 p-2.5 rounded-full border border-gold text-gold bg-white hover:bg-gold/5 transition-colors shadow-sm focus:outline-none"
            aria-label="Previous products"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full py-6 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, idx) => (
              <div
                key={product._id || idx}
                className="flex-none w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.05)] overflow-hidden h-full flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300">
                  <div className="relative aspect-[4/3] w-full bg-[#f8f9fa] p-8 flex items-center justify-center">
                    <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain filter drop-shadow-xl"
                      />
                    </div>
                  </div>
                  <div className="p-6 text-center bg-white flex-grow flex items-center justify-center">
                    <h3 className="text-gold font-bold text-[17px] tracking-wide">{product.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 md:-right-12 z-10 p-2.5 rounded-full border border-gold text-gold bg-white hover:bg-gold/5 transition-colors shadow-sm focus:outline-none"
            aria-label="Next products"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
