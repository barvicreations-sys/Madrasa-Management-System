import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { dir } = useI18n();

  return (
    <div className="flex min-h-screen bg-slate-50" dir={dir}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
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
    </div>
  );
}
