'use client';
import { useState, useEffect } from 'react';
import { UserPlus, Trash2, Mail, Shield, Loader2, AlertCircle } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // New user form state
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: 'admin'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        setUsers([data, ...users]);
        setNewUser({ email: '', password: '', role: 'admin' });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setUsers(users.filter(u => u._id !== id));
      } else {
        const data = await res.json();
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-light tracking-tight text-white mb-2">
            User <span className="font-bold text-gold">Management</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase">
            Control administrative access and roles
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 animate-in fade-in duration-300">
          <AlertCircle className="text-red-500 shrink-0" size={20} />
          <p className="text-red-500 text-sm font-medium">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto text-red-500/60 hover:text-red-500 text-xs font-bold uppercase tracking-widest">
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Add User Form */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm sticky top-8">
            <div className="p-6 border-b border-zinc-800 bg-zinc-900/80">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <UserPlus size={18} className="text-gold" />
                Register New User
              </h2>
            </div>
            
            <form onSubmit={handleAddUser} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="admin@marhaba.com"
                    className="w-full bg-black/40 border border-zinc-800/50 rounded-xl py-3.5 pl-12 pr-4 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-gold/30 focus:border-gold/30 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Initial Password</label>
                <input
                  type="password"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-zinc-800/50 rounded-xl py-3.5 px-4 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-gold/30 focus:border-gold/30 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Assignment Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full bg-black/40 border border-zinc-800/50 rounded-xl py-3.5 px-4 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all appearance-none cursor-pointer"
                >
                  <option value="admin" className="bg-[#0a0a0a]">Administrator</option>
                  <option value="super_admin" className="bg-[#0a0a0a]">Super Admin</option>
                  <option value="editor" className="bg-[#0a0a0a]">Editor</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-zinc-100 hover:bg-white text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-black/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? <Loader2 className="animate-spin" size={16} /> : 'Create User Account'}
              </button>
            </form>
          </div>
        </div>

        {/* Users Table */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/80 border-b border-zinc-800">
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">User Details</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Registered</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="animate-spin text-gold" size={24} />
                          <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Synchronizing Vault...</span>
                        </div>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <AlertCircle className="text-zinc-700" size={32} />
                          <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">No administrative users found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="group hover:bg-zinc-900/50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 font-bold text-sm">
                              {user.email[0].toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border
                            ${user.role === 'super_admin' 
                              ? 'bg-gold/10 text-gold border-gold/20' 
                              : user.role === 'admin'
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                : 'bg-zinc-800 text-zinc-400 border-zinc-700'}
                          `}>
                            {user.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-xs text-zinc-500 font-medium whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
