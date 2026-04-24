'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '../../components/AdminSidebar';

export default function AdminClientLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    setMounted(true);
    const auth = localStorage.getItem('admin_auth');
    if (!auth && !isLoginPage) {
      router.push('/admin/login');
    } else if (auth) {
      setIsAuth(true);
    }
  }, [pathname, isLoginPage, router]);

  if (!mounted) return null;

  // Don't show layout on login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Prevent flash of content before auth is verified
  if (!isAuth && !isLoginPage) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="flex bg-[#0a0a0a] min-h-screen text-foreground selection:bg-gold selection:text-black antialiased">
      <AdminSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out
          ${isCollapsed ? 'ml-20' : 'ml-64'}
        `}
      >
        <div className="p-8 md:p-12 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
