'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth-context';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  BookOpen, 
  CalendarCheck, 
  Wallet, 
  GraduationCap, 
  FileText, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'dashboard', urduLabel: 'ڈیش بورڈ', href: '/', roles: ['admin', 'teacher', 'accountant'] },
  { icon: UserSquare2, label: 'admission', urduLabel: 'داخلہ', href: '/admission', roles: ['admin'] },
  { icon: Users, label: 'students', urduLabel: 'طلباء', href: '/students', roles: ['admin', 'teacher', 'accountant'] },
  { icon: Wallet, label: 'fees', urduLabel: 'فیس', href: '/fees', roles: ['admin', 'accountant'] },
  { icon: CalendarCheck, label: 'attendance', urduLabel: 'حاضری', href: '/attendance', roles: ['admin', 'teacher'] },
  { icon: GraduationCap, label: 'exams', urduLabel: 'امتحانات', href: '/exams', roles: ['admin', 'teacher'] },
  { icon: BookOpen, label: 'teachers', urduLabel: 'اساتذہ', href: '/teachers', roles: ['admin'] },
  { icon: FileText, label: 'reports', urduLabel: 'رپورٹس', href: '/reports', roles: ['admin', 'accountant'] },
  { icon: Settings, label: 'settings', urduLabel: 'ترتیبات', href: '/settings', roles: ['admin'] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { t, dir } = useI18n();
  const { role, logout } = useAuth();

  const filteredItems = menuItems.filter(item => role && item.roles.includes(role));

  return (
    <nav className="w-72 bg-islamic-green-dark text-emerald-50 p-6 border-r border-islamic-gold/30 flex flex-col h-screen sticky top-0 hidden md:flex shadow-2xl">
      <div className="flex-1 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`p-4 rounded-xl transition-all flex items-center justify-between group overflow-hidden relative ${
                isActive 
                ? 'bg-islamic-gold text-white shadow-lg' 
                : 'hover:bg-white/10 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={isActive ? 'text-white' : 'text-islamic-gold group-hover:scale-110 transition-transform'} />
                <span className="text-sm font-bold tracking-wide">{t(item.label)}</span>
              </div>
              <span className={`urdu-font text-[10px] font-bold ${isActive ? 'text-white' : 'text-islamic-gold/70'}`}>
                {item.urduLabel}
              </span>
              {isActive && (
                <div className={`absolute ${dir === 'rtl' ? '-left-1' : '-right-1'} top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-full`} />
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="p-4 bg-emerald-900/40 rounded-2xl border border-white/5 mb-4">
          <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]"></div>
            <span className="text-[10px] font-medium tracking-tight">Database Connected</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full p-4 rounded-xl text-emerald-100 hover:bg-red-500/10 hover:text-red-300 transition-all font-bold text-sm"
        >
          <LogOut size={18} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </nav>
  );
}
