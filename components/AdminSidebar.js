'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User as UserIcon,
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronRight,
  Monitor,
  PenTool,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import Image from 'next/image';

export default function AdminSidebar({ isCollapsed, onToggle }) {
  const pathname = usePathname();
  const [logo, setLogo] = useState("/logo.jpg");
  const [contentOpen, setContentOpen] = useState(true); // Default open

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.header_logo) setLogo(data.header_logo);
        }
      } catch (err) {
        console.error('Sidebar logo fetch error:', err);
      }
    };
    fetchLogo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    window.location.href = '/admin/login';
  };

  const isActive = (href) => pathname === href;

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-[#0a0a0a] border-r border-zinc-900 transition-all duration-500 z-50 flex flex-col
        ${isCollapsed ? 'w-24' : 'w-72'}
      `}
    >
      {/* Brand Header */}
      <div className="p-6 flex items-center justify-between border-b border-zinc-900">
        {!isCollapsed && (
          <div className="flex items-center gap-3 animate-in fade-in duration-700">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gold/30">
              <Image src={logo} alt="Logo" width={32} height={32} className="object-cover" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-white italic">
              Marhaba <span className="text-gold not-italic">Admin</span>
            </span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 text-zinc-500 hover:text-gold hover:bg-gold/5 rounded-xl transition-all ml-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 custom-scrollbar">
        <div className="space-y-2">

          {/* Main Quick Links */}
          <SidebarLink
            href="/admin"
            icon={LayoutDashboard}
            label="Dashboard"
            active={isActive('/admin')}
            isCollapsed={isCollapsed}
          />

          <SidebarLink
            href="/admin/users"
            icon={UserIcon}
            label="Admin Users"
            active={isActive('/admin/users')}
            isCollapsed={isCollapsed}
          />

          {/* DROPDOWN: WEBSITE CONTENT */}
          <div className="pt-4">
            {!isCollapsed && (
              <button
                onClick={() => setContentOpen(!contentOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-zinc-600 hover:text-zinc-300 transition-colors uppercase text-[10px] font-black tracking-[0.2em]"
              >
                Website Content
                {contentOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
            )}

            {(contentOpen || isCollapsed) && (
              <div className={`space-y-1 ${!isCollapsed ? 'mt-2 border-l border-zinc-900 ml-4 pl-2' : ''}`}>
                <SidebarLink
                  href="/admin/hero"
                  icon={Monitor}
                  label="Hero Content"
                  active={isActive('/admin/hero')}
                  isCollapsed={isCollapsed}
                  isSubItem={!isCollapsed}
                />
                <SidebarLink
                  href="/admin/footer"
                  icon={PenTool}
                  label="Footer Section"
                  active={isActive('/admin/footer')}
                  isCollapsed={isCollapsed}
                  isSubItem={!isCollapsed}
                />
              </div>
            )}
          </div>

          <SidebarLink
            href="/admin/inquiries"
            icon={MessageSquare}
            label="Client Inquiries"
            active={isActive('/admin/inquiries')}
            isCollapsed={isCollapsed}
          />

          <SidebarLink
            href="/admin/settings"
            icon={Settings}
            label="General Settings"
            active={isActive('/admin/settings')}
            isCollapsed={isCollapsed}
          />
        </div>
      </nav>

      {/* Logout Footer */}
      <div className="p-6 border-t border-zinc-900">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 text-zinc-500 hover:text-red-500 transition-all group
            ${isCollapsed ? 'justify-center w-full' : ''}
          `}
        >
          <LogOut size={18} className="group-hover:scale-110 transition-transform" />
          {!isCollapsed && <span className="text-xs font-bold uppercase tracking-widest">Exit System</span>}
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ href, icon: Icon, label, active, isCollapsed, isSubItem }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 py-3.5 px-4 rounded-xl transition-all group relative
        ${active
          ? 'bg-gold/10 text-gold shadow-xl shadow-gold/5'
          : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
        }
        ${isCollapsed ? 'justify-center px-0' : ''}
        ${isSubItem ? 'py-2.5' : ''}
      `}
    >
      <Icon size={isSubItem ? 16 : 18} className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform shrink-0`} />
      {!isCollapsed && (
        <span className={`${isSubItem ? 'text-[11px]' : 'text-xs'} font-bold uppercase tracking-widest truncate`}>
          {label}
        </span>
      )}

      {active && !isCollapsed && (
        <div className="absolute right-4 w-1.5 h-1.5 bg-gold rounded-full shadow-gold shadow-lg" />
      )}

      {isCollapsed && active && (
        <div className="absolute left-0 w-1 h-8 bg-gold rounded-r-full" />
      )}
    </Link>
  );
}
