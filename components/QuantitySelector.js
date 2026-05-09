"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function QuantitySelector({ options, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!options || options.length === 0) return null;

  const selectedOption = options[selectedIdx];

  return (
    <div className="mt-0 pt-4 border-t border-white/10 w-full" ref={dropdownRef}>
      <div className="grid grid-cols-2 gap-6 items-end">
        
        {/* Left Column: Quantity */}
        <div className="relative w-full">
          <label className="block text-[11px] font-bold text-white/50 uppercase tracking-widest mb-3">Quantity</label>
          
          {/* Selected State / Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 ${
              isOpen ? "rounded-t-xl border-b-transparent" : "rounded-xl"
            }`}
          >
            <span className="font-semibold text-white/90 text-sm tracking-wide">{selectedOption.label}</span>
            <ChevronDown className="w-4 h-4 text-white/50" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#111] border border-white/10 border-t-0 rounded-b-xl overflow-hidden z-30 shadow-2xl pb-2">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedIdx(idx);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center px-5 py-4 transition-colors duration-200 hover:bg-white/5 group"
                >
                  <div className="flex-1 text-left">
                    <span className="font-medium text-white/80 group-hover:text-white text-sm transition-colors">{opt.label}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {opt.badge && (
                      <span className="px-2 py-0.5 rounded border border-gold/30 bg-gold/10 text-gold text-[10px] font-bold tracking-wider uppercase">
                        {opt.badge}
                      </span>
                    )}
                    <span className="font-semibold text-white/90 text-sm w-16 text-right">
                      {opt.price.startsWith('₹') ? opt.price : `₹${opt.price}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Total Price & Action Button */}
        <div className="flex flex-col items-end w-full">
          <div className="flex flex-col items-end mb-4">
            <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-2">Total Price</span>
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 leading-none tracking-tight">
              {selectedOption.price.startsWith('₹') ? selectedOption.price : `₹${selectedOption.price}`}
            </span>
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}
