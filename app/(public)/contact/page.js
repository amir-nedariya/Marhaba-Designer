"use client";

import { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  Instagram,
  Facebook,
  MessageCircle
} from "lucide-react";
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/admin/services');
        if (res.ok) {
          const data = await res.json();
          setAvailableProducts(data);
        }
      } catch (err) {
        console.error('Failed to fetch services for dropdown');
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', product: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white pt-32 pb-32 overflow-hidden selection:bg-gold selection:text-black font-sans">
      {/* Background Ambient Lights */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">
            Get in <span className="gold-gradient-text">Touch</span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-base font-medium max-w-xl mx-auto">
            Ready to elevate your brand? Reach out to us for premium printing and luxury design solutions tailored just for you.
          </p>
        </div>

        {/* Main Split Container */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left Side: Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-10 backdrop-blur-xl shadow-2xl hover:border-gold/20 transition-all duration-500">
              <h3 className="text-xl font-bold mb-8 text-white">Contact Information</h3>
              <div className="space-y-8">
                <ContactInfoItem
                  icon={<Phone size={20} />}
                  label="CALL / WHATSAPP"
                  value="+91 70162 27040"
                  subValue="95862 64232"
                />
                <ContactInfoItem
                  icon={<Mail size={20} />}
                  label="EMAIL US"
                  value="marhabadesigner786@gmail.com"
                />
                <ContactInfoItem
                  icon={<MapPin size={20} />}
                  label="STUDIO LOCATION"
                  value="Near Makki Masjid, Behind Ami Restaurent, Chhapi Highway"
                  subValue="Ta.Vadgam, Dist. Banaskantha, Gujarat - 385210"
                />
              </div>

              <div className="pt-10 mt-10 border-t border-white/10">
                <p className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-6">Connect With Us</p>
                <div className="flex items-center gap-4">
                  <SocialBtn icon={<Facebook size={18} />} href="#" />
                  <SocialBtn icon={<Instagram size={18} />} href="#" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              {success ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-4 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 size={48} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Message Sent</h2>
                    <p className="text-zinc-400 mt-3 text-sm max-w-xs mx-auto">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all border border-white/10 hover:border-gold/30"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <h3 className="text-2xl font-bold mb-8 text-white hidden md:block">Send a Message</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput
                      label="Your Name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <FormInput
                      label="Phone Number"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <FormSelect
                      label="Product"
                      value={formData.product}
                      options={availableProducts}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    />
                  </div>

                  <fieldset className="w-full border border-white/10 rounded-2xl px-4 transition-all hover:border-white/20 focus-within:border-gold/50 focus-within:bg-black/60 bg-black/40 group">
                    <legend className="text-[10px] font-black text-gold uppercase tracking-[0.2em] px-2 ml-2 transition-colors group-focus-within:text-gold">
                      Your Message
                    </legend>
                    <textarea
                      required
                      placeholder="Tell us about your project requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full bg-transparent border-none text-white outline-none px-2 pb-4 pt-1 placeholder:text-white/50 resize-none focus:ring-0"
                    />
                  </fieldset>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 h-16 bg-gold text-black rounded-2xl font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : (
                      <>Send Inquiry <Send size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function ContactInfoItem({ icon, label, value, subValue }) {
  return (
    <div className="flex items-start gap-5 group">
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold shadow-lg flex-shrink-0 group-hover:scale-110 group-hover:bg-gold group-hover:text-black transition-all duration-300">
        {icon}
      </div>
      <div className="space-y-1.5 pt-1">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</p>
        <p className="text-base font-semibold leading-snug text-white group-hover:text-gold transition-colors">{value}</p>
        {subValue && <p className="text-sm font-medium text-zinc-400">{subValue}</p>}
      </div>
    </div>
  );
}

function SocialBtn({ icon, href }) {
  return (
    <a href={href} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-gold hover:border-gold hover:scale-110 transition-all duration-300 shadow-lg">
      {icon}
    </a>
  );
}

function FormInput({ label, placeholder, type = "text", value, onChange }) {
  return (
    <fieldset className="w-full border border-white/10 rounded-2xl px-4 transition-all hover:border-white/20 focus-within:border-gold/50 focus-within:bg-black/60 bg-black/40 group">
      <legend className="text-[10px] font-black text-gold uppercase tracking-[0.2em] px-2 ml-2 transition-colors group-focus-within:text-gold">
        {label}
      </legend>
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-none text-white outline-none px-2 pb-4 pt-1 placeholder:text-white/50 focus:ring-0"
      />
    </fieldset>
  );
}

function FormSelect({ label, value, options, onChange }) {
  return (
    <fieldset className="w-full border border-white/10 rounded-2xl px-4 transition-all hover:border-white/20 focus-within:border-gold/50 focus-within:bg-black/60 bg-black/40 group relative">
      <legend className="text-[10px] font-black text-gold uppercase tracking-[0.2em] px-2 ml-2 transition-colors group-focus-within:text-gold">
        {label}
      </legend>
      <select
        required
        value={value}
        onChange={onChange}
        className={`w-full bg-transparent border-none outline-none px-2 pb-4 pt-1 appearance-none focus:ring-0 ${value ? 'text-white' : 'text-white/50'}`}
      >
        <option value="" disabled>Select a product...</option>
        {options.map((opt) => (
          <option key={opt._id} value={opt.name} className="bg-black text-white">
            {opt.name}
          </option>
        ))}
        <option value="Other" className="bg-black text-white">Other (Please specify in message)</option>
      </select>
      {/* Custom Dropdown Arrow */}
      <div className="absolute right-6 top-1/2 -translate-y-[20%] pointer-events-none">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </fieldset>
  );
}