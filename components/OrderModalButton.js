"use client";

import { useState } from "react";
import { ShoppingCart, Upload, X, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function OrderModalButton({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    notes: ""
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Note: If you implement actual file upload later, you would upload `file` first and get a `designUrl` back.
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productTitle: product.title,
          productId: product._id,
          productImage: product.image
        })
      });
      if (res.ok) {
        toast.success("Order placed successfully! We will contact you soon.");
        setIsOpen(false);
        setFormData({ fullName: "", phone: "", email: "", address: "", notes: "" });
        setFile(null);
      } else {
        toast.error("Failed to place order.");
      }
    } catch (err) {
      toast.error("An error occurred.");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-4 px-8 rounded-xl border border-gold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        Order Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-1">Place Your Order</h2>
              <p className="text-white/50 text-sm mb-8">Fill the details below to place your order for {product.title}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input 
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Phone Number <span className="text-gold">*</span>
                    </label>
                    <input 
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Email Address <span className="text-gold">*</span>
                  </label>
                  <input 
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Delivery Address <span className="text-gold">*</span>
                  </label>
                  <input 
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Upload Your Design <span className="text-white/40">(Optional)</span>
                  </label>
                  <div className="w-full border border-dashed border-white/20 rounded-lg p-8 flex flex-col items-center justify-center bg-[#1a1a1a] hover:bg-[#222] transition-colors cursor-pointer group">
                    <input 
                      type="file" 
                      className="hidden" 
                      id="file-upload"
                      onChange={(e) => setFile(e.target.files[0])}
                      accept=".png,.jpg,.jpeg,.pdf"
                    />
                    <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-full h-full">
                      <Upload className="w-6 h-6 text-white/50 group-hover:text-gold mb-3 transition-colors" />
                      <p className="text-sm text-white/90 font-medium mb-1">
                        <span className="text-white">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-white/40">
                        {file ? file.name : "PNG, JPG, PDF (Max 10MB)"}
                      </p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Additional Notes <span className="text-white/40">(Optional)</span>
                  </label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions?"
                    rows="3"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                >
                  Place Order <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
