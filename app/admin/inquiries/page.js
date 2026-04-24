'use client';
import { useState, useEffect } from 'react';
import {
  MessageSquare,
  User,
  Phone,
  Mail,
  Package,
  Clock,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Loader2,
  MoreVertical,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setInquiries(inquiries.map(inq => inq._id === id ? { ...inq, status } : inq));
        showToast('Status updated');
      }
    } catch (err) { console.error(err); }
  };

  const deleteInquiry = async (id) => {
    if (!confirm('Are you sure? This action is permanent.')) return;
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setInquiries(inquiries.filter(inq => inq._id !== id));
        showToast('Inquiry removed');
      }
    } catch (err) { console.error(err); }
  };

  const showToast = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(null), 3000);
  };

  const filteredInquiries = inquiries.filter(inq => {
    if (filter === 'all') return true;
    return inq.status === filter;
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
            Inquiries <span className="text-zinc-500 font-normal">/ Overview</span>
          </h1>
          <p className="text-zinc-500 text-sm">Monitor and process incoming design requests from your website.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchInquiries}
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
          title="Total Leads"
          value={inquiries.length}
          icon={<MessageSquare className="text-blue-500" />}
          isActive={filter === 'all'}
          onClick={() => setFilter('all')}
          valueColor="text-blue-500"
        />
        <StatBox
          title="Unprocessed"
          value={inquiries.filter(i => i.status === 'new').length}
          icon={<AlertCircle className="text-red-500" />}
          isActive={filter === 'new'}
          onClick={() => setFilter('new')}
          valueColor="text-red-500"
        />
        <StatBox
          title="Resolved"
          value={inquiries.filter(i => i.status === 'completed').length}
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
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Customer Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Service Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Project Message</th>
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
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-50">
                      <Search size={40} className="text-zinc-600" />
                      <p className="text-zinc-500 font-medium">No records found matching current criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-zinc-800/20 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700">
                          <User size={18} />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[15px] font-medium text-zinc-100">{inq.name}</p>
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="hover:text-zinc-300 transition-colors cursor-pointer">{inq.email}</span>
                            <span className="text-zinc-700">•</span>
                            <span className="text-zinc-400 font-medium">{inq.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1.5">
                        <span className="inline-flex max-w-fit px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 text-[11px] font-bold border border-zinc-700">
                          {inq.product}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-medium">
                          <Calendar size={12} /> {new Date(inq.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 max-w-[320px]">
                      <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed group-hover:text-zinc-300 transition-colors">
                        {inq.message}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                        ${inq.status === 'new' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                          inq.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                            'bg-blue-500/10 text-blue-500 border border-blue-500/20'}
                      `}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => updateStatus(inq._id, 'completed')}
                          title="Resolve"
                          disabled={inq.status === 'completed'}
                          className="p-2 rounded-md bg-zinc-800/50 text-zinc-400 border border-zinc-700 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/30 transition-all disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteInquiry(inq._id)}
                          title="Delete"
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
            <p className="text-xs text-zinc-500">Showing {filteredInquiries.length} records</p>
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
