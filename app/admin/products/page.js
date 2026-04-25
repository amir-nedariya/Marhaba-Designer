'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Image as ImageIcon, Layout, Loader2, UploadCloud, GripVertical } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export default function ProductsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/admin/products');
        const data = await res.json();
        if (res.ok) setProducts(data);
      } catch (err) {
        console.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a more complex scenario we might do individual PUTs or a bulk update.
      // But we can just create/update each product.
      // Since our API currently supports single POST/PUT, we can loop through.
      // But it's easier if we just have a "save all" bulk endpoint, or just save them one by one.
      
      // We will loop and save
      for (const p of products) {
        if (p._id) {
          await fetch('/api/admin/products', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p),
          });
        } else {
          const res = await fetch('/api/admin/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p),
          });
          const data = await res.json();
          p._id = data.product._id;
        }
      }
      toast.success('Products saved successfully!');
    } catch (err) {
      toast.error('Failed to preserve changes');
    } finally {
      setSaving(false);
    }
  };

  const addProduct = () => {
    setProducts([...products, { title: '', image: '', order: products.length }]);
  };

  const removeProduct = async (index) => {
    const p = products[index];
    if (p._id) {
      try {
        await fetch(`/api/admin/products?id=${p._id}`, { method: 'DELETE' });
      } catch(e) {
        toast.error('Failed to delete product from server');
        return;
      }
    }
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const updateProduct = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        updateProduct(index, 'image', data.url);
      }
    } catch (err) {
      toast.error('Image transmission failed');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-gold" size={32} />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-light text-white mb-2">Our <span className="text-gold font-bold">Products</span></h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">Carousel Management</p>
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

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-black text-zinc-400 uppercase tracking-[0.4em] flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
            Products Carousel
          </h2>
          <button
            onClick={addProduct}
            className="flex items-center gap-2 p-2 px-4 bg-gold/10 text-gold hover:bg-gold hover:text-black rounded-full transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
          >
            <Plus size={14} /> Add Product
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((prod, idx) => (
            <div key={idx} className="bg-zinc-900/40 border border-zinc-800/60 rounded-[2rem] p-6 group relative animate-in fade-in zoom-in-95 duration-500">
              <div
                className={`relative h-56 w-full mb-6 rounded-2xl overflow-hidden border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center
                  ${prod.image ? 'border-zinc-800' : 'border-zinc-800 hover:border-gold/40 bg-black/40'}
                `}
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-gold/40', 'bg-gold/5'); }}
                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-gold/40', 'bg-gold/5'); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-gold/40', 'bg-gold/5');
                  const file = e.dataTransfer.files[0];
                  handleFileUpload(idx, file);
                }}
              >
                {prod.image ? (
                  <>
                    <Image src={prod.image} alt="preview" fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <label className="cursor-pointer bg-white text-black p-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-110 transition-transform">
                        Replace Image
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(idx, e.target.files[0])} />
                      </label>
                    </div>
                  </>
                ) : (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <UploadCloud size={32} className="text-zinc-700 mb-3" />
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-loose">
                      Drop image here <br /> or <span className="text-gold">Browse</span>
                    </span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(idx, e.target.files[0])} />
                  </label>
                )}
              </div>

              <div className="flex gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Title | e.g. Business Cards"
                  value={prod.title}
                  onChange={(e) => updateProduct(idx, 'title', e.target.value)}
                  className="flex-1 bg-black/40 border border-zinc-800 rounded-xl p-4 text-xs text-white outline-none focus:border-gold/40 transition-all font-medium"
                />
                <button
                  onClick={() => removeProduct(idx)}
                  className="p-4 text-zinc-700 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
