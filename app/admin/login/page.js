'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logo, setLogo] = useState("/logo.jpg");
  const router = useRouter();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.header_logo) setLogo(data.header_logo);
        }
      } catch (err) {
        console.error('Failed to fetch login logo:', err);
      }
    };
    fetchLogo();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim()
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('admin_auth', 'true');
        router.push('/admin');
      } else {
        setError(data.error || 'Identity verification failed.');
      }
    } catch (err) {
      setError('Connection failed. Database unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">

      {/* Curved Branded Background (Top) */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-[#0a0a0a] z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/grid.png')] bg-repeat" />
        <div className="absolute bottom-[-1px] left-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full h-auto fill-zinc-50">
            <path d="M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,149.3C1120,149,1280,203,1360,229.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Grid Pattern Background (Bottom) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="w-full max-w-[1100px] relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

        {/* Left: Branding & Mascot */}
        <div className="hidden lg:flex lg:col-span-6 flex-col items-center justify-center text-center space-y-12">
          <div className="space-y-4">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <Image src={logo} alt="Logo" fill className="object-contain" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-widest leading-none">MARHABA <br /><span className="text-gold">DESIGNER</span></h2>
            <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase">Welcome back, Admin</p>
          </div>

          <div className="relative w-80 h-80 animate-bounce-slow">
            <Image
              src="/public/"
              alt="Designer Mascot"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Login Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[450px] bg-white border border-zinc-200 rounded-[2.5rem] p-10 md:p-14 shadow-[0_20px_80px_rgba(0,0,0,0.08)] relative overflow-hidden">
            {/* Form Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="mb-10 text-center">
              <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Admin Login</h1>
              <p className="text-zinc-400 text-sm mt-1">Authorized access to management dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border border-red-100">
                  <AlertCircle size={18} />
                  <p className="text-xs font-bold uppercase tracking-wider">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Admin Email</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-gold transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@marhaba.com"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-6 text-zinc-900 text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all placeholder:text-zinc-300 font-medium"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Access Password</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-gold transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-14 text-zinc-900 text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all placeholder:text-zinc-300 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-zinc-900 hover:bg-black text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>Access Dashboard  <ArrowRight size={18} /></>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-zinc-400 text-[9px] font-bold uppercase tracking-[0.2em]">
              Secure • Marhaba Designer
            </p>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
