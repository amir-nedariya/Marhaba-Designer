'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Loader2, List } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ServicesAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch('/api/admin/services');
        const data = await res.json();
        if (res.ok) setOptions(data);
      } catch (err) {
        console.error('Failed to load options');
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const opt of options) {
        if (opt._id) {
          await fetch('/api/admin/services', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(opt),
          });
        } else {
          const res = await fetch('/api/admin/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(opt),
          });
          const data = await res.json();
          opt._id = data.option._id;
        }
      }
      toast.success('Services saved successfully!');
    } catch (err) {
      toast.error('Failed to preserve changes');
    } finally {
      setSaving(false);
    }
  };

  const addOption = () => {
    setOptions([...options, { name: '', order: options.length }]);
  };

  const removeOption = async (index) => {
    const opt = options[index];
    if (opt._id) {
      try {
        await fetch(`/api/admin/services?id=${opt._id}`, { method: 'DELETE' });
      } catch(e) {
        toast.error('Failed to delete option from server');
        return;
      }
    }
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index].name = value;
    setOptions(newOptions);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-gold" size={32} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-light text-white mb-2">Inquiry <span className="text-gold font-bold">Services</span></h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">Dropdown Menu Options</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-3 bg-gold hover:bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all duration-500 shadow-2xl shadow-gold/10 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          save all
        </button>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-[2.5rem] p-10 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-sm font-black text-zinc-400 uppercase tracking-[0.4em] flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
            Contact Form Options
          </h2>
          <button
            onClick={addOption}
            className="flex items-center gap-2 p-2 px-4 bg-gold/10 text-gold hover:bg-gold hover:text-black rounded-full transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
          >
            <Plus size={14} /> Add Option
          </button>
        </div>

        <div className="space-y-4">
          {options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-black/40 border border-zinc-800 rounded-2xl p-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-zinc-600 pl-2">
                <List size={20} />
              </div>
              <input
                type="text"
                placeholder="e.g. Business Cards"
                value={opt.name}
                onChange={(e) => updateOption(idx, e.target.value)}
                className="flex-1 bg-transparent border-none text-sm text-white outline-none focus:ring-0 transition-all font-medium"
              />
              <button
                onClick={() => removeOption(idx)}
                className="p-3 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {options.length === 0 && (
            <div className="text-center py-10 text-zinc-600 text-sm">
              No options added yet. Click "Add Option" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
