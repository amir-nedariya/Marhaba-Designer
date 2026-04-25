import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center relative bg-[#020202] pt-20 overflow-hidden font-sans">
        {/* Ambient Luxury Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Corner Crop Marks (Printing aesthetic) */}
        <div className="absolute top-32 left-10 w-8 h-8 border-t-2 border-l-2 border-white/10 pointer-events-none hidden md:block" />
        <div className="absolute top-32 right-10 w-8 h-8 border-t-2 border-r-2 border-white/10 pointer-events-none hidden md:block" />
        <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-white/10 pointer-events-none hidden md:block" />
        <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-white/10 pointer-events-none hidden md:block" />

        <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Main 404 Visual */}
          <div className="relative mb-8">
            <h1 className="text-[120px] sm:text-[180px] md:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-900 leading-none select-none tracking-tighter">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold font-black text-[10px] sm:text-xs md:text-sm whitespace-nowrap bg-[#020202]/90 px-8 py-3 rounded-full border border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] uppercase tracking-[0.4em] backdrop-blur-xl">
              Design Not Found
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-light text-white mb-6 tracking-wide">
            This page is <span className="font-bold text-gold">Out of Print</span>
          </h2>
          
          <p className="text-zinc-400 text-sm md:text-[15px] max-w-md mx-auto mb-12 leading-relaxed">
            The page you're looking for seems to have been erased from our canvas. It might have been moved or no longer exists.
          </p>
          
          <Link 
            href="/" 
            className="group flex items-center justify-center gap-4 px-10 py-5 bg-white/[0.02] border border-white/10 hover:border-gold hover:bg-gold text-zinc-300 hover:text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 backdrop-blur-md shadow-2xl"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-x-1 transition-transform duration-500">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Return to Homepage
          </Link>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
