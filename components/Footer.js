"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const [data, setData] = useState(null);
  const [logo, setLogo] = useState("/logo.jpg");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/footer');
        if (res.ok) setData(await res.json());
      } catch (err) { console.error('Footer fetch error:', err); }
    };

    const fetchLogo = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const s = await res.json();
          if (s.header_logo) setLogo(s.header_logo);
        }
      } catch (err) { console.error(err); }
    };

    fetchData();
    fetchLogo();
  }, []);

  const footerData = data || {
    tagline: "Your one-stop solution for all professional printing and design needs. Excellence in every detail.",
    socials: { facebook: "#", instagram: "#", twitter: "#" },
    contact: { 
      address: "Near Makki Masjid, Behind Ami Restaurent, Chhapi Highway, Ta.Vadgam, Dist. Banaskantha, Gujarat - 385210",
      phone: "+91 70162 27040",
      email: "marhabadesigner786@gmail.com"
    },
    services: ["Visiting Cards", "Flex Banners", "Custom Stickers", "Bill Books", "Office Supplies"],
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "Our Products", href: "/products" },
      { label: "Get a Quote", href: "/contact" }
    ]
  };

  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-24 pb-10 relative overflow-hidden font-sans">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Section 1: Logo & Tagline (Takes 4 cols) */}
          <div className="lg:col-span-4 space-y-8 lg:pr-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-white/20 group-hover:border-gold/50 transition-colors">
                <Image src={logo} alt="Marhaba Designer" fill className="object-cover" />
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tighter text-white">
                Marhaba <span className="text-gold">Designer</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              {footerData.tagline}
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: Facebook, href: footerData.socials.facebook },
                { icon: Instagram, href: footerData.socials.instagram },
                { icon: Twitter, href: footerData.socials.twitter }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-gold hover:border-gold hover:text-black text-zinc-400 transition-all duration-300 shadow-sm hover:scale-110"
                >
                  <social.icon size={18} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Quick Links (Takes 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {footerData.quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-zinc-400 hover:text-gold text-sm font-medium transition-all hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Our Services (Takes 3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              Our Services
            </h3>
            <ul className="space-y-4">
              {footerData.services.map((service, i) => (
                <li key={i}>
                  <span className="text-zinc-400 hover:text-gold text-sm font-medium transition-all hover:translate-x-1 cursor-pointer inline-block">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Contact Us (Takes 3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              Contact Us
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="mt-1 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors shrink-0">
                  <MapPin size={14} strokeWidth={2.5} />
                </div>
                <span className="text-zinc-400 group-hover:text-white text-sm leading-relaxed transition-colors">
                  {footerData.contact.address}
                </span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors shrink-0">
                  <Phone size={14} strokeWidth={2.5} />
                </div>
                <span className="text-zinc-400 group-hover:text-white text-sm font-medium transition-colors">
                  {footerData.contact.phone}
                </span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors shrink-0">
                  <Mail size={14} strokeWidth={2.5} />
                </div>
                <span className="text-zinc-400 group-hover:text-gold text-sm font-medium transition-colors">
                  {footerData.contact.email}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[11px] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Marhaba Designer. <span className="text-zinc-500 font-medium normal-case tracking-normal">All rights reserved.</span>
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-zinc-500 hover:text-gold text-xs font-semibold uppercase tracking-wider transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-zinc-500 hover:text-gold text-xs font-semibold uppercase tracking-wider transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
