'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  CalendarCheck, 
  Wallet, 
  GraduationCap, 
  BarChart3, 
  Settings,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';

const menuItems = [
  { icon: LayoutDashboard, label: 'dashboard', href: '/', urdu: 'ڈیش بورڈ' },
  { icon: Users, label: 'students', href: '/students', urdu: 'طلباء' },
  { icon: UserPlus, label: 'admission', href: '/admission', urdu: 'داخلہ' },
  { icon: CalendarCheck, label: 'attendance', href: '/attendance', urdu: 'حاضری' },
  { icon: Wallet, label: 'fees', href: '/fees', urdu: 'فیس' },
  { icon: GraduationCap, label: 'exams', href: '/exams', urdu: 'امتحانات' },
  { icon: BarChart3, label: 'reports', href: '/reports', urdu: 'رپورٹس' },
  { icon: Settings, label: 'settings', href: '/settings', urdu: 'ترتیبات' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { t, lang } = useI18n();

  return (
    <aside className="w-72 bg-white border-e border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-islamic-green rounded-2xl flex items-center justify-center shadow-lg shadow-islamic-green/20">
            <ShieldCheck className="text-white" size={28} />
          </div>
          <div>
            <h1 className="font-black text-slate-800 leading-tight tracking-tight uppercase text-xs">Jamia Naqshbandia</h1>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={clsx(
                "group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative",
                isActive ? "bg-islamic-green shadow-xl shadow-islamic-green/10" : "hover:bg-slate-50"
              )}>
                <item.icon className={clsx(
                  "shrink-0 transition-colors",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-islamic-green"
                )} size={22} />
                <div className="flex-1">
                  <p className={clsx(
                    "text-xs font-black uppercase tracking-widest leading-none",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                  )}>{t(item.label)}</p>
                  {lang === 'ur' && (
                    <p className={clsx(
                      "urdu-font text-sm mt-1 leading-none",
                      isActive ? "text-white/80" : "text-slate-300 group-hover:text-islamic-green/60"
                    )}>{item.urdu}</p>
                  )}
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute inset-y-0 -start-4 w-1.5 bg-islamic-gold rounded-e-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group">
          <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
}
