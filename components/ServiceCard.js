import * as Icons from "lucide-react";

const ServiceCard = ({ title, icon, description }) => {
  const IconComponent = Icons[icon] || Icons.HelpCircle;

  return (
    <div className="group relative p-10 rounded-[40px] bg-white/5 border border-white/10 hover:border-gold/40 hover:bg-white/10 transition-all duration-700 shadow-2xl overflow-hidden text-center flex flex-col items-center">
      <div className="absolute -right-4 -top-4 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/15 transition-all duration-700" />
      <div className="relative z-10 space-y-8 flex flex-col items-center">
        <div className="w-20 h-20 rounded-3xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-gold transition-all duration-500 shadow-inner group-hover:text-black">
          <IconComponent className="w-10 h-10 text-gold group-hover:text-black transition-colors" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white group-hover:text-gold transition-colors mb-4">{title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>
          <div className="w-10 h-1 bg-white/10 rounded-full mx-auto group-hover:w-20 group-hover:bg-gold transition-all duration-500" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
