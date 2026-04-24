'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Facebook, Instagram, Twitter, MapPin, Phone, Mail, Link as LinkIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function FooterAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [footer, setFooter] = useState({
    tagline: '',
    socials: { facebook: '', instagram: '', twitter: '' },
    contact: { address: '', phone: '', email: '' },
    services: [],
    quickLinks: []
  });

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      const res = await fetch('/api/admin/footer');
      const data = await res.json();
      if (res.ok) setFooter(data);
    } catch (err) {
      toast.error('Failed to load footer configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(footer),
      });
      if (res.ok) toast.success('Footer updated successfully');
    } catch (err) {
      toast.error('Failed to update footer');
    } finally {
      setSaving(false);
    }
  };

  const addItem = (field, defaultValue) => {
    setFooter({ ...footer, [field]: [...footer[field], defaultValue] });
  };

  const removeItem = (field, index) => {
    const list = [...footer[field]];
    list.splice(index, 1);
    setFooter({ ...footer, [field]: list });
  };

  const updateListItem = (field, index, value) => {
    const list = [...footer[field]];
    list[index] = value;
    setFooter({ ...footer, [field]: list });
  };

  const updateNestedListItem = (field, index, subfield, value) => {
    const list = [...footer[field]];
    list[index] = { ...list[index], [subfield]: value };
    setFooter({ ...footer, [field]: list });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-gold" size={32} />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-light text-white mb-2">Footer <span className="text-gold font-bold">Section</span></h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Footer Content Management</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-3 bg-gold hover:bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all duration-500 shadow-2xl shadow-gold/10 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-10">
          {/* Brand Tagline */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-[2.5rem] p-10 backdrop-blur-xl">
            <h2 className="text-sm font-black text-zinc-400 uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-gold rounded-full" />
              Brand Tagline
            </h2>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gold uppercase tracking-widest ml-1">Footer Tagline</label>
              <textarea
                value={footer.tagline}
                onChange={(e) => setFooter({ ...footer, tagline: e.target.value })}
                className="w-full bg-black/60 border border-zinc-800 rounded-2xl p-5 text-sm text-white/60 focus:border-gold/40 outline-none transition-all min-h-[120px] resize-none leading-relaxed"
                placeholder="Enter brand tagline..."
              />
            </div>
          </div>

          {/* Social Presence */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-[2.5rem] p-10 backdrop-blur-xl">
            <h2 className="text-sm font-black text-zinc-400 uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-gold rounded-full" />
              Social Presence
            </h2>
            <div className="space-y-6">
              {[
                { label: 'Facebook', icon: Facebook, field: 'facebook' },
                { label: 'Instagram', icon: Instagram, field: 'instagram' },
                { label: 'X (Twitter)', icon: Twitter, field: 'twitter' }
              ].map((item) => (
                <div key={item.field} className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{item.label}</label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-gold transition-colors">
                      <item.icon size={18} />
                    </div>
                    <input
                      type="text"
                      value={footer.socials[item.field]}
                      onChange={(e) => setFooter({
                        ...footer,
                        socials: { ...footer.socials, [item.field]: e.target.value }
                      })}
                      className="w-full bg-black/60 border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:border-gold/40 outline-none transition-all"
                      placeholder="https://facebook.com/your-brand"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-[2.5rem] p-10 backdrop-blur-xl">
            <h2 className="text-sm font-black text-zinc-400 uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-gold rounded-full" />
              Contact Information
            </h2>
            <div className="space-y-6">
              {[
                { label: 'Address', icon: MapPin, field: 'address' },
                { label: 'Phone Number', icon: Phone, field: 'phone' },
                { label: 'Email Address', icon: Mail, field: 'email' }
              ].map((item) => (
                <div key={item.field} className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{item.label}</label>
                  <div className="relative group">
                    <div className="absolute left-5 top-5 text-zinc-600 group-focus-within:text-gold transition-colors">
                      <item.icon size={18} />
                    </div>
                    {item.field === 'address' ? (
                      <textarea
                        value={footer.contact[item.field]}
                        onChange={(e) => setFooter({
                          ...footer,
                          contact: { ...footer.contact, [item.field]: e.target.value }
                        })}
                        className="w-full bg-black/60 border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:border-gold/40 outline-none transition-all min-h-[100px] resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={footer.contact[item.field]}
                        onChange={(e) => setFooter({
                          ...footer,
                          contact: { ...footer.contact, [item.field]: e.target.value }
                        })}
                        className="w-full bg-black/60 border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:border-gold/40 outline-none transition-all"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {/* Services */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-[2.5rem] p-10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-sm font-black text-zinc-400 uppercase tracking-[0.4em] flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                Services
              </h2>
              <button
                onClick={() => addItem('services', '')}
                className="p-2 bg-gold/10 text-gold hover:bg-gold hover:text-black rounded-full transition-all"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {footer.services.map((service, idx) => (
                <div key={idx} className="flex gap-3 group">
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => updateListItem('services', idx, e.target.value)}
                    className="flex-1 bg-black/40 border border-zinc-800 rounded-xl p-4 text-xs text-white outline-none focus:border-gold/40 transition-all font-medium"
                    placeholder="e.g. Visiting Cards"
                  />
                  <button
                    onClick={() => removeItem('services', idx)}
                    className="p-4 text-zinc-700 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-[2.5rem] p-10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-sm font-black text-zinc-400 uppercase tracking-[0.4em] flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                Navigation Links
              </h2>
              <button
                onClick={() => addItem('quickLinks', { label: '', href: '' })}
                className="p-2 bg-gold/10 text-gold hover:bg-gold hover:text-black rounded-full transition-all"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {footer.quickLinks.map((link, idx) => (
                <div key={idx} className="p-5 bg-black/40 border border-zinc-800 rounded-2xl space-y-4 relative group">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Link Name</label>
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => updateNestedListItem('quickLinks', idx, 'label', e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-xs text-white outline-none focus:border-gold/30"
                        placeholder="Home"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">URL / Link</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                          <LinkIcon size={12} />
                        </div>
                        <input
                          type="text"
                          value={link.href}
                          onChange={(e) => updateNestedListItem('quickLinks', idx, 'href', e.target.value)}
                          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-3 text-xs text-white outline-none focus:border-gold/30"
                          placeholder="/"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem('quickLinks', idx)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
