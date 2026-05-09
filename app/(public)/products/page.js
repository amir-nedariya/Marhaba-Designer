import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 selection:bg-gold/30 selection:text-gold">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Collection</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60 tracking-tight">
            Our Products
          </h1>
          <p className="max-w-xl text-white/50 text-lg font-light leading-relaxed">
            Discover our premium range of crafted solutions designed for the highest standard of excellence.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-white/50">
            No products available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link 
                href={`/products/${product._id}`} 
                key={product._id}
                className="group cursor-pointer bg-white/5 rounded-2xl border border-white/10 hover:border-gold/30 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)]"
              >
                <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-white/5 to-white/0 p-8 flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-6 transform transition-transform duration-700 group-hover:scale-110 drop-shadow-xl"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white/90 group-hover:text-gold transition-colors tracking-wide mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-white/40 line-clamp-2 font-light flex-grow mb-6">
                    {product.description}
                  </p>
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gold/60 group-hover:text-gold mt-auto transition-colors">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
