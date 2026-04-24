'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User as UserIcon
} from 'lucide-react';

const SidebarItem = ({ item, isCollapsed }) => {
  const pathname = usePathname();
  const Icon = item.icon;
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group relative
        ${isActive
          ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
          : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100'}
        ${isCollapsed ? 'justify-center' : 'gap-3'}
      `}
    >
      <div className={`transition-colors flex-shrink-0 ${isActive ? 'text-gold' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
        <Icon size={18} />
      </div>

      {!isCollapsed && (
        <span className="font-medium text-sm tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-1 duration-200">
          {item.label}
        </span>
      )}

      {isCollapsed && (
        <div className="absolute left-[calc(100%+12px)] px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-100 text-[10px] font-bold rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl z-50 whitespace-nowrap pointer-events-none tracking-widest uppercase">
          {item.label}
        </div>
      )}
    </Link>
  );
};

export default function AdminSidebar({ isCollapsed, onToggle }) {
  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { label: 'Users', icon: UserIcon, href: '/admin/users' },
    { label: 'Inquiries', icon: MessageSquare, href: '/admin/inquiries' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  const [logo, setLogo] = useState("/logo.jpg");

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.header_logo) setLogo(data.header_logo);
        }
      } catch (err) {
        console.error('Failed to fetch sidebar logo:', err);
      }
    };
    fetchLogo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    window.location.href = '/admin/login';
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#0a0a0a] border-r border-zinc-900 flex flex-col z-50 transition-all duration-300 ease-in-out font-sans
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Toggle Action */}
      <button 
        onClick={onToggle}
        className="absolute -right-4 top-24 w-8 h-8 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-full flex items-center justify-center shadow-2xl hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all z-[100] group/toggle"
      >
        <div className="transition-transform duration-300 group-hover/toggle:scale-110">
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </div>
      </button>

      {/* Corporate Branding */}
      <div className={`py-10 transition-all duration-300 ${isCollapsed ? 'px-4' : 'px-8'}`}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 shadow-sm">
            <Image src={logo} alt="M" fill className="object-cover" />
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in slide-in-from-left-2 duration-300 flex flex-col leading-none">
              <span className="text-sm font-bold text-zinc-100 tracking-tight">Marhaba Designer</span>
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Management Console</span>
            </div>
          )}
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
        {menuItems.map((item, index) => (
          <SidebarItem key={index} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* User Session Info */}
      <div className="p-4 border-t border-zinc-900 bg-black/20 overflow-x-hidden">
        <div className={`flex items-center gap-3 transition-all duration-300 overflow-x-hidden
          ${isCollapsed ? 'justify-center' : 'p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50'}
        `}>
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 shadow-sm">
            <UserIcon size={16} />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 animate-in fade-in slide-in-from-left-2 duration-300">
              <p className="text-[11px] font-bold text-zinc-200 truncate leading-none">Amir Nedariya</p>
              <button 
                onClick={handleLogout}
                className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest hover:text-red-500 transition-colors mt-1 flex items-center gap-1"
              >
                Sign Out <LogOut size={8} />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
