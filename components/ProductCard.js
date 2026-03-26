import Image from "next/image";

const ProductCard = ({ title, image }) => {
  return (
    <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 p-5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer h-full flex flex-col">
      <div className="aspect-[4/3] relative overflow-hidden rounded-2xl mb-8 bg-gray-50 border border-gray-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="text-center mt-auto pb-2">
        <h3 className="text-[#2563EB] font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300 group-hover:text-blue-700">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;
