import Image from "next/image";

const ProductCard = ({ title, image, category, description }) => {
  return (
    <div className="glass-card !p-0 overflow-hidden flex flex-col h-full group hover:border-gold/40 transition-all duration-500">
      <div className="aspect-[4/3] relative overflow-hidden bg-white/5">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

        {category && (
          <span className="absolute top-4 left-4 rounded-full border border-gold/30 bg-black/60 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-gold backdrop-blur-md">
            {category}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>
        {description && (
          <p className="text-xs font-medium text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
            {description}
          </p>
        )}

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
          <span className="text-gold/60 group-hover:text-gold transition-colors">Premium Quality</span>
          <div className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
