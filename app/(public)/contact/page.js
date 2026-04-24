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
    <section className="min-h-screen bg-[#020202] text-white pt-32 pb-20 selection:bg-gold selection:text-black font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Split Container */}
        <div className="grid lg:grid-cols-2 gap-0 bg-[#0a0a0a] border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl">
          
          {/* Left Side: Info */}
          <div className="p-10 md:p-16 space-y-12 border-b lg:border-b-0 lg:border-r border-zinc-800">
            <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
            
            <div className="space-y-10">
               <ContactInfoItem 
                 icon={<Phone size={20} />}
                 label="CALL / WHATSAPP"
                 value="+91 70162 27040 | 95862 64232"
               />
               <ContactInfoItem 
                 icon={<Mail size={20} />}
                 label="EMAIL US"
                 value="marhabadesigner786@gmail.com"
               />
               <ContactInfoItem 
                 icon={<MapPin size={20} />}
                 label="STUDIO LOCATION"
                 value="Near Makki Masjid, Behind Ami Restaurent, Chhapi Highway, Ta.Vadgam, Dist. Banaskantha, Gujarat - 385210"
               />
            </div>

            <div className="pt-10 border-t border-zinc-800/50">
               <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6">SOCIALS</p>
               <div className="flex items-center gap-4">
                  <SocialBtn icon={<Facebook size={18} />} />
                  <SocialBtn icon={<Instagram size={18} />} />
               </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-10 md:p-16 bg-black/20">
            {success ? (
               <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                     <CheckCircle2 size={40} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Message Sent!</h2>
                    <p className="text-zinc-500 mt-2 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="text-gold text-xs font-bold uppercase tracking-widest hover:underline"
                  >
                    Send another message
                  </button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormInput 
                    label="NAME" 
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <FormInput 
                    label="PHONE" 
                    placeholder="Your number" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <FormInput 
                    label="EMAIL" 
                    type="email"
                    placeholder="Your email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <FormInput 
                    label="PRODUCT NAME" 
                    placeholder="e.g. Banner, Card" 
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">MESSAGE</label>
                  <textarea
                    required
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 text-white focus:border-gold/50 outline-none transition-all placeholder:text-zinc-700 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-16 bg-gold text-black rounded-2xl font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-gold-light transition-all shadow-xl disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : (
                    <>SEND MESSAGE <Send size={16} /></>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

function ContactInfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-5">
      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold shadow-sm flex-shrink-0">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{label}</p>
        <p className="text-lg font-semibold leading-snug">{value}</p>
      </div>
    </div>
  );
}

function SocialBtn({ icon }) {
  return (
    <button className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
      {icon}
    </button>
  );
}

function FormInput({ label, placeholder, type = "text", value, onChange }) {
  return (
    <div className="space-y-3">
       <label className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">{label}</label>
       <div className="relative">
          <input 
            type={type}
            required
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:border-gold/50 outline-none transition-all placeholder:text-zinc-700"
          />
       </div>
    </div>
  );
}