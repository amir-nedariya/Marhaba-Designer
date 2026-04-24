'use client';
import { useState, useEffect, useRef } from 'react';
import Cropper from 'react-easy-crop';
import {
  Settings,
  Upload,
  X,
  Image as ImageIcon,
  Check,
  Trash2,
  RefreshCw,
  ZoomIn,
  ShieldCheck,
  Layout
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const getCroppedImg = (imageSrc, pixelCrop) => {
  const canvas = document.createElement('canvas');
  const img = new Image();
  img.src = imageSrc;
  return new Promise((resolve) => {
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
      resolve(canvas.toDataURL('image/png'));
    };
  });
};

const HeaderLogoUploader = ({ onUploadSuccess }) => {
  const [logo, setLogo] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => { fetchLogo(); }, []);

  const fetchLogo = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.header_logo) setLogo(data.header_logo);
      }
    } catch (err) { console.error(err); }
  };

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) return toast.error("Maximum allowed size is 5MB");
      const reader = new FileReader();
      reader.onload = (e) => { setImage(e.target.result); setIsCropping(true); };
      reader.readAsDataURL(file);
    }
  };

  const saveLogo = async (fileBlob) => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('file', fileBlob, 'logo.png');

      const res = await fetch('/api/settings/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setLogo(data.url);
        onUploadSuccess?.('Identity updated successfully');
      }
    } catch (err) { console.error(err); }
    finally { setSaving(false); setIsCropping(false); setImage(null); }
  };

  const finalizeCrop = async () => {
    if (image && completedCrop) {
      const croppedBase64 = await getCroppedImg(image, completedCrop);
      const response = await fetch(croppedBase64);
      const blob = await response.blob();
      await saveLogo(blob);
    }
  };

  return (
    <div className="space-y-8">
      {!isCropping && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Upload Area */}
          <div
            onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={(e) => { e.preventDefault(); processFile(e.dataTransfer.files[0]); setIsDragging(false); }}
            onClick={() => fileInputRef.current.click()}
            className={`lg:col-span-7 group cursor-pointer border border-dashed rounded-xl p-16 transition-all border-zinc-800 bg-zinc-900/20 hover:bg-zinc-800/20 hover:border-zinc-700 flex flex-col items-center justify-center gap-4 text-center ${isDragging ? 'border-gold bg-zinc-800' : ''}`}
          >
            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => processFile(e.target.files[0])} />
            <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-gold group-hover:scale-110 transition-all shadow-sm">
              {saving ? <RefreshCw className="animate-spin" size={20} /> : <Upload size={20} />}
            </div>
            <div className="space-y-1">
              <p className="text-zinc-100 font-medium text-sm">Update brand identity</p>
              <p className="text-zinc-500 text-xs">Drag and drop or click to replace header logo</p>
            </div>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-5 bg-zinc-900/40 rounded-xl border border-zinc-800 p-8 flex flex-col items-center justify-center min-h-[250px] shadow-sm">
            {logo ? (
              <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
                <div className="w-32 h-32 rounded-full border border-zinc-700 bg-zinc-950 p-2 shadow-inner group relative">
                  <img src={logo} className="w-full h-full object-cover rounded-full" alt="Current Logo" />
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Layout className="text-white" size={20} />
                  </div>
                </div>
                <button
                  onClick={() => setLogo(null)}
                  className="px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                >
                  <Trash2 size={12} /> Remove Asset
                </button>
              </div>
            ) : (
              <div className="text-center space-y-3 opacity-30">
                <ImageIcon size={48} className="mx-auto text-zinc-600" />
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">No active branding</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isCropping && (
        <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-2xl animate-in zoom-in-95 duration-300">
          <Cropper image={image} crop={crop} zoom={zoom} aspect={1} cropShape="round" onCropChange={setCrop} onCropComplete={(_, p) => setCompletedCrop(p)} onZoomChange={setZoom} />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-6 px-6 py-4 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-xl z-10 shadow-2xl">
            <div className="flex items-center gap-4 flex-1">
              <ZoomIn size={14} className="text-zinc-500" />
              <input type="range" value={zoom} min={1} max={3} step={0.1} onChange={(e) => setZoom(e.target.value)} className="flex-1 accent-white" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsCropping(false)}
                className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={finalizeCrop}
                className="bg-white text-black px-6 py-2.5 rounded-lg font-bold text-xs hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg"
              >
                <Check size={16} /> Finalize Identity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function SettingsPage() {
  const [msg, setMsg] = useState(null);

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-12 bg-[#0a0a0a] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-zinc-100 tracking-tight flex items-center gap-3">
            Settings <span className="text-zinc-500 font-normal">/ Brand Identity</span>
          </h1>
          <p className="text-zinc-500 text-sm">Configure your agency credentials and visual presence.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-medium text-emerald-500 uppercase tracking-wider">Sync Active</span>
          </div>
        </div>
      </div>

      {msg && (
        <div className="bg-zinc-900 border border-zinc-700 text-white px-6 py-4 rounded-xl text-sm font-medium shadow-2xl animate-in slide-in-from-top-4 flex items-center gap-3">
          <Check className="text-emerald-500" size={18} /> {msg}
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 gap-12">
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-medium text-zinc-100 flex items-center gap-2">
                <ImageIcon size={18} className="text-zinc-500" /> Branding Assets
              </h2>
              <p className="text-xs text-zinc-500">Manage high-resolution logos for headers and footers.</p>
            </div>
          </div>

          <div className="bg-zinc-900/40 rounded-2xl border border-zinc-800 p-8 md:p-12 shadow-sm">
            <HeaderLogoUploader onUploadSuccess={(m) => { setMsg(m); setTimeout(() => setMsg(null), 3000); }} />
          </div>
        </section>


      </div>
    </div>
  );
}
