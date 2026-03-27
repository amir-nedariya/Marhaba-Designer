"use client";

import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Send,
  MessageCircle,
  Sparkles,
  Facebook,
  Instagram,
} from "lucide-react";

import Hero from "@/components/Hero";

export default function Contact() {
  return (
    <section className="relative min-h-screen bg-black transition-all selection:bg-gold selection:text-black">
      {/* <Hero 
        minimal 
        title="CONTACT" 
        subtitle="US"
        description="Have a project in mind? Let's make it reality."
      /> */}

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">

        {/* Integrated Card */}
        <div className="glass-card !p-0 overflow-hidden border border-white/10 shadow-2xl">
          <div className="grid lg:grid-cols-5">

            {/* Left: Info (2/5) */}
            <div className="lg:col-span-2 bg-white/[0.02] p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
              <h2 className="text-xl font-bold text-white mb-10 tracking-tight">Get in Touch</h2>

              <div className="space-y-8">
                <ContactPill
                  icon={<Phone className="h-5 w-5" />}
                  label="Call / WhatsApp"
                  value="+91 70162 27040 | 95862 64232"
                  href="https://wa.me/917016227040"
                />
                <ContactPill
                  icon={<Mail className="h-5 w-5" />}
                  label="Email Us"
                  value="marhabadesigner786@gmail.com"
                  href="mailto:marhabadesigner786@gmail.com"
                />
                <ContactPill
                  icon={<MapPin className="h-5 w-5" />}
                  label="Studio Location"
                  value="Near Makki Masjid, Behind Ami Restaurent, Chhapi Highway, Ta.Vadgam, Dist. Banaskantha, Gujarat - 385210"
                />
              </div>

              <div className="mt-16 pt-8 border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-6">Socials</p>
                <div className="flex gap-4">
                  <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
                  <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
                </div>
              </div>
            </div>

            {/* Right: Form (3/5) */}
            <div className="lg:col-span-3 p-8 sm:p-12">
              <form className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <InputField label="Name" placeholder="Your name" icon={<MessageCircle className="h-4 w-4" />} />
                  <InputField label="Phone" placeholder="Your number" type="tel" icon={<Phone className="h-4 w-4" />} />
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <InputField label="Email" placeholder="Your email" type="email" icon={<Mail className="h-4 w-4" />} />
                  <InputField label="Product Name" placeholder="e.g. Banner, Card" icon={<Sparkles className="h-4 w-4" />} />
                </div>

                <div className="group/field">
                  <label className="mb-3 block text-[10px] font-black uppercase tracking-widest text-gold/60 transition-colors group-focus-within/field:text-gold">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/10 focus:border-gold/30 focus:bg-white/[0.04]"
                  />
                </div>

                <button type="submit" className="btn-primary w-full h-14 !rounded-xl text-sm uppercase tracking-widest">
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
} function ContactPill({ icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-5 group/pill p-2 rounded-2xl transition-all hover:bg-white/[0.03]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-gold/60 shadow-inner group-hover/pill:text-gold group-hover/pill:border-gold/30 group-hover/pill:bg-gold/5 transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1 leading-none">{label}</p>
        <p className="text-sm font-bold text-white group-hover/pill:text-gold transition-colors duration-300">{value}</p>
      </div>
    </div>
  );

  return href ? <a href={href} className="block">{content}</a> : content;
}

function InputField({ label, placeholder, icon, type = "text" }) {
  return (
    <div className="relative group/field w-full">
      <label className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[3px] text-gold/60 transition-all duration-300 group-focus-within/field:text-gold group-focus-within/field:translate-x-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gold/40 transition-all duration-300 group-focus-within/field:text-gold group-focus-within/field:scale-110 group-hover/field:text-gold/60">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="h-14 w-full rounded-2xl border-2 border-white/5 bg-white/[0.02] pl-14 pr-5 text-sm text-white outline-none transition-all duration-400 placeholder:text-white/10 focus:border-gold/40 focus:bg-white/[0.05] focus:shadow-[0_0_40px_rgba(212,175,55,0.08)] font-medium"
        />
      </div>
    </div>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      title={label}
      className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition-all hover:-translate-y-2 hover:border-gold/40 hover:bg-gold/5 hover:text-gold shadow-lg"
    >
      {icon}
    </a>
  );
}