"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function ProductImageGallery({ mainImage, images }) {
  // Combine main image with additional images, ensuring mainImage is first and no exact duplicates
  const allImages = images && images.length > 0 
    ? [mainImage, ...images.filter(img => img !== mainImage)] 
    : [mainImage];
  
  const [selectedImg, setSelectedImg] = useState(allImages[0]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/5 flex items-center justify-center group shadow-2xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 z-0"></div>
        <Image
          src={selectedImg}
          alt="Product Image"
          fill
          className="object-contain p-8 lg:p-16 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl z-10"
          priority
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none z-20" />
      </div>

      {/* Thumbnails (Only show if more than 1 image) */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.slice(0, 5).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImg(img)}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedImg === img 
                  ? 'border-gold opacity-100 bg-[#1a1a1a]' 
                  : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/20 bg-[#0d0d0d]'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
