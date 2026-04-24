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
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-20">
          
          {/* Section 1: Logo & Tagline */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-14 h-14 overflow-hidden rounded-full border border-gold/30 p-0.5">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image src={logo} alt="Marhaba" fill className="object-cover" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Marhaba <span className="text-gold">Designer</span>
              </span>
            </Link>
            <p className="text-[#a3a3a3] text-[15px] leading-relaxed max-w-sm">
              {footerData.tagline}
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: footerData.socials.facebook },
                { icon: Instagram, href: footerData.socials.instagram },
                { icon: Twitter, href: footerData.socials.twitter }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center bg-[#111] border border-zinc-900 rounded-xl hover:border-gold/50 hover:text-gold transition-all duration-300"
                >
                  <social.icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="space-y-10">
            <h3 className="text-lg font-bold text-white tracking-wide">Quick Links</h3>
            <ul className="space-y-6">
              {footerData.quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-[#a3a3a3] hover:text-gold text-[15px] font-medium transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Our Services */}
          <div className="space-y-10">
            <h3 className="text-lg font-bold text-white tracking-wide">Our Services</h3>
            <ul className="space-y-6">
              {footerData.services.map((service, i) => (
                <li key={i} className="text-[#a3a3a3] hover:text-gold text-[15px] font-medium transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Contact Us */}
          <div className="space-y-10">
            <h3 className="text-lg font-bold text-white tracking-wide">Contact Us</h3>
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-gold/10 p-1.5 rounded-lg border border-gold/20">
                  <MapPin className="text-gold" size={18} />
                </div>
                <span className="text-[#a3a3a3] text-[15px] leading-relaxed">
                  {footerData.contact.address}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-gold/10 p-1.5 rounded-lg border border-gold/20">
                  <Phone className="text-gold" size={18} />
                </div>
                <span className="text-[#a3a3a3] text-[15px] font-medium">
                  {footerData.contact.phone}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-gold/10 p-1.5 rounded-lg border border-gold/20">
                  <Mail className="text-gold" size={18} />
                </div>
                <span className="text-[#a3a3a3] text-[15px] font-medium hover:text-gold transition-colors cursor-pointer">
                  {footerData.contact.email}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#555] text-sm">
            © {new Date().getFullYear()} Marhaba Designer. All rights reserved.
          </p>
          <div className="flex gap-10">
            <Link href="/privacy" className="text-[#555] hover:text-gold text-sm transition-colors font-medium">Privacy Policy</Link>
            <Link href="/terms" className="text-[#555] hover:text-gold text-sm transition-colors font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
