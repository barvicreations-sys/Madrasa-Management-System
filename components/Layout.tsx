'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  const { dir } = useI18n();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-madrasa-bg">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 border-4 border-islamic-green border-t-islamic-gold rounded-full animate-spin" />
          <h2 className="urdu-font text-2xl font-bold text-islamic-green">جامعہ نقشبندیہ</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans" dir={dir}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-madrasa-cream/10 p-8">
           <AnimatePresence mode="wait">
             <motion.div
               key={pathname}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
             >
               {children}
             </motion.div>
           </AnimatePresence>
        </main>
      </div>
      
      <footer className="h-8 bg-slate-900 text-[10px] text-slate-400 flex items-center px-8 justify-between uppercase tracking-widest hidden md:flex shrink-0">
        <div className="flex gap-6">
          <span>Version 2.4.0 (Stable)</span>
          <span>IP: 182.164.x.x</span>
        </div>
        <div className="flex gap-6 items-center">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-500 font-bold">Cloud Backup Synchronized</span>
          <span>Powered by MadrasaCore Pro</span>
        </div>
      </footer>
    </div>
  );
}
