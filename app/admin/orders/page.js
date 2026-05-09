'use client';
import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Search,
  Loader2,
  Calendar,
  AlertCircle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import Image from 'next/image';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
        showToast('Order status updated');
      }
    } catch (err) { console.error(err); }
  };

  const deleteOrder = async (id) => {
    if (!confirm('Are you sure? This action is permanent.')) return;
    try {
      const res = await fetch(`/api/admin/orders?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setOrders(orders.filter(o => o._id !== id));
        showToast('Order removed');
      }
    } catch (err) { console.error(err); }
  };

  const showToast = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(null), 3000);
  };

  const filteredOrders = orders.filter(o => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8 bg-[#0a0a0a] min-h-screen font-sans">
      {/* Toast Notification */}
      {msg && (
        <div className="fixed bottom-8 right-8 z-[100] bg-zinc-900 border border-zinc-700 text-white px-6 py-3 rounded-xl text-sm font-medium shadow-2xl animate-in slide-in-from-bottom-5">
          {msg}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-zinc-100 tracking-tight flex items-center gap-3">
            Orders <span className="text-zinc-500 font-normal">/ Overview</span>
          </h1>
          <p className="text-zinc-500 text-sm">Monitor and process customer orders placed directly from the website.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all text-sm font-medium"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh Data
          </button>
          <div className="h-4 w-[1px] bg-zinc-800 mx-2" />
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-medium text-emerald-500 uppercase tracking-wider">Live</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox
          title="Total Orders"
          value={orders.length}
          icon={<ShoppingCart className="text-gold" />}
          isActive={filter === 'all'}
          onClick={() => setFilter('all')}
          valueColor="text-gold"
        />
        <StatBox
          title="New Orders"
          value={orders.filter(o => o.status === 'new').length}
          icon={<AlertCircle className="text-amber-500" />}
          isActive={filter === 'new'}
          onClick={() => setFilter('new')}
          valueColor="text-amber-500"
        />
        <StatBox
          title="Completed"
          value={orders.filter(o => o.status === 'completed').length}
          icon={<CheckCircle2 className="text-emerald-500" />}
          isActive={filter === 'completed'}
          onClick={() => setFilter('completed')}
          valueColor="text-emerald-500"
        />
      </div>

      {/* Main Table Interface */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/80 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Customer Info</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Address & Notes</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="text-zinc-500 animate-spin" size={32} />
                      <p className="text-zinc-500 text-sm">Retrieving database records...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-50">
                      <Search size={40} className="text-zinc-600" />
                      <p className="text-zinc-500 font-medium">No orders found matching criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-zinc-800/20 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-gold border border-zinc-700">
                          <User size={18} />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[15px] font-medium text-zinc-100">{order.fullName}</p>
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="hover:text-zinc-300 transition-colors cursor-pointer">{order.email}</span>
                            <span className="text-zinc-700">•</span>
                            <span className="text-zinc-400 font-medium">{order.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {order.productImage ? (
                          <div className="relative w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden">
                            <Image 
                              src={order.productImage} 
                              alt={order.productTitle} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center flex-shrink-0 text-zinc-500">
                            <ImageIcon size={20} />
                          </div>
                        )}
                        <div className="flex flex-col gap-1.5">
                          <span className="inline-flex max-w-fit px-2.5 py-1 rounded bg-zinc-800 text-gold text-[11px] font-bold border border-gold/20">
                            {order.productTitle}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-medium mt-1">
                            <Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 max-w-[320px]">
                      <div className="space-y-2">
                        <div className="flex gap-2 items-start text-sm text-zinc-400">
                          <MapPin size={14} className="mt-0.5 shrink-0 text-zinc-500" />
                          <span className="line-clamp-2">{order.address}</span>
                        </div>
                        {order.notes && (
                          <div className="flex gap-2 items-start text-sm text-zinc-400">
                            <FileText size={14} className="mt-0.5 shrink-0 text-zinc-500" />
                            <span className="line-clamp-2 text-zinc-500 italic">"{order.notes}"</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                        ${order.status === 'new' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                          order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                            'bg-blue-500/10 text-blue-500 border border-blue-500/20'}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => updateStatus(order._id, 'completed')}
                          title="Mark Completed"
                          disabled={order.status === 'completed'}
                          className="p-2 rounded-md bg-zinc-800/50 text-zinc-400 border border-zinc-700 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/30 transition-all disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          title="Delete Order"
                          className="p-2 rounded-md bg-zinc-800/50 text-zinc-400 border border-zinc-700 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        {!loading && (
          <div className="px-6 py-4 bg-zinc-900/50 border-t border-zinc-800 flex items-center justify-between">
            <p className="text-xs text-zinc-500">Showing {filteredOrders.length} records</p>
            <p className="text-xs text-zinc-600">Database Engine: MongoDB Atlas</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ title, value, icon, isActive, onClick, valueColor = "text-zinc-100" }) {
  return (
    <button
      onClick={onClick}
      className={`p-6 bg-zinc-900/40 border rounded-2xl text-left transition-all group cursor-pointer
        ${isActive
          ? 'border-zinc-500 bg-zinc-800/20 shadow-md ring-1 ring-zinc-500/20'
          : 'border-zinc-800 hover:bg-zinc-800/20 hover:border-zinc-700 shadow-sm'}
    `}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {isActive && <div className="h-1.5 w-1.5 rounded-full bg-zinc-100" />}
      </div>
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
        {isActive && <span className="text-[10px] font-bold text-zinc-500">SELECTED</span>}
      </div>
    </button>
  );
}
