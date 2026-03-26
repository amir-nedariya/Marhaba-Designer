"use client";
import { useState } from "react";
import { Send, Smartphone, User, MessageSquare } from "lucide-react";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, message } = formData;
    
    // Format the WhatsApp message
    const waText = `*New Inquiry for Marhaba Designer*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Message:* ${message}`;
    const encodedText = encodeURIComponent(waText);
    
    // Business phone number
    const businessPhone = "919876543210";
    const waUrl = `https://wa.me/${businessPhone}?text=${encodedText}`;
    
    window.open(waUrl, "_blank");
  };

  return (
    <div className="relative p-10 md:p-16 rounded-[50px] bg-white/5 border border-white/10 backdrop-blur-3xl overflow-hidden group">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 blur-[100px] rounded-full -z-10" />
      
      <div className="space-y-4 mb-10">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Quick <br /><span className="gold-gradient-text uppercase">Inquiry</span></h2>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Direct Consultation Available 24/7</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Your Identity</label>
          <div className="relative group/input">
            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-gold transition-colors" />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-black/40 border border-white/10 rounded-[20px] py-5 pl-14 pr-6 text-white focus:outline-none focus:border-gold/50 transition-all font-light placeholder:text-gray-600 focus:ring-1 focus:ring-gold/20"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">WhatsApp Channel</label>
          <div className="relative group/input">
            <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-gold transition-colors" />
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 00000 00000"
              className="w-full bg-black/40 border border-white/10 rounded-[20px] py-5 pl-14 pr-6 text-white focus:outline-none focus:border-gold/50 transition-all font-light placeholder:text-gray-600 focus:ring-1 focus:ring-gold/20"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Project Blueprint</label>
          <div className="relative group/input">
            <MessageSquare className="absolute left-6 top-6 w-5 h-5 text-gray-400 group-focus-within/input:text-gold transition-colors" />
            <textarea
              name="message"
              required
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your vision and requirements..."
              className="w-full bg-black/40 border border-white/10 rounded-[25px] py-6 pl-14 pr-6 text-white focus:outline-none focus:border-gold/50 transition-all font-light placeholder:text-gray-600 resize-none focus:ring-1 focus:ring-gold/20"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gold text-black py-6 rounded-[20px] font-black text-xl uppercase tracking-[0.3em] hover:bg-gold-light hover:scale-[1.03] active:scale-98 transition-all shadow-4xl flex items-center justify-center gap-4"
        >
          Send Proposal
          <Send className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}
