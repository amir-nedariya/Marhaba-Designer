import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Star, Package, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import QuantitySelector from '@/components/QuantitySelector';
import OrderModalButton from '@/components/OrderModalButton';
import ProductImageGallery from '@/components/ProductImageGallery';

export const dynamic = 'force-dynamic';

async function getProduct(id) {
  try {
    await dbConnect();
    const product = await Product.findById(id).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    return null;
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 selection:bg-gold/30 selection:text-gold">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link href="/" className="group inline-flex items-center text-white/60 hover:text-gold transition-colors duration-300 mb-12 text-sm font-medium tracking-wide uppercase">
          <ChevronLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Image Section */}
          <div className="lg:col-span-6">
            <ProductImageGallery mainImage={product.image} images={product.images} />
          </div>

          {/* Details Section */}
          <div className="lg:col-span-6 flex flex-col pt-0 lg:sticky lg:top-32">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-white/50">{product.rating} ({product.reviewsCount} reviews)</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60 tracking-tight mb-4">
                {product.title}
              </h1>
              <p className="text-lg text-white/60 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            <div className="space-y-6 mb-2">
              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-[13px] font-bold text-white/90 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-gold" />
                    Available Dimensions
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size, idx) => (
                      <span key={idx} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 hover:border-gold/50 transition-colors">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Finishes */}
              {product.finishes && product.finishes.length > 0 && (
                <div>
                  <h3 className="text-[13px] font-bold text-white/90 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold" />
                    Premium Finishes
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.finishes.map((finish, idx) => (
                      <span key={idx} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 hover:border-gold/50 transition-colors">
                        {finish}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Options Dropdown and Action Buttons */}
            <QuantitySelector options={product.quantityOptions?.length > 0 ? product.quantityOptions : [
              { label: "100 Cards", price: "299" },
              { label: "250 Cards", price: "599" },
              { label: "500 Cards", price: "999", badge: "Popular" },
              { label: "1000 Cards", price: "1899", badge: "Best Value" }
            ]}>
              <OrderModalButton product={product} />
            </QuantitySelector>
          </div>
        </div>
      </div>
    </div>
  );
}
