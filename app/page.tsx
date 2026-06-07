'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { 
  Users, 
  GraduationCap, 
  Wallet, 
  CalendarCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { label: 'totalStudents', value: '1,248', change: '+12%', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'activeClasses', value: '42', change: 'Stable', trend: 'flat', icon: GraduationCap, color: 'text-islamic-green', bg: 'bg-islamic-green/10' },
  { label: 'pendingFees', value: 'Rs. 142k', change: '-4%', trend: 'down', icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'attendanceRate', value: '94%', change: '+2%', trend: 'up', icon: CalendarCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function Home() {
  const { t } = useI18n();

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t('welcomeBack')}</h2>
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase mt-1">Status Overview for June 2024</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={stat.label} 
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={28} />
                </div>
                {stat.trend !== 'flat' && (
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                  </div>
                )}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t(stat.label)}</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white rounded-[3rem] border border-slate-100 p-10 min-h-[400px] flex flex-col justify-center items-center shadow-sm">
             <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-6">
               <TrendingUp size={40} />
             </div>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Enrollment Trends Chart</p>
             <p className="text-slate-300 text-xs mt-2 italic">(Simulated Visualization Area)</p>
          </div>

          <div className="bg-islamic-green rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-islamic-green/20">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10">
              <h4 className="text-2xl font-black tracking-tight leading-tight mb-4">Jamia Naqshbandia Barvia Rizvia</h4>
              <p className="text-white/70 text-sm font-bold italic urdu-font text-lg leading-relaxed">جامعہ نقشبندیہ بارویہ رضویہ میں آپ کو خوش آمدید کہا جاتا ہے۔ ہمار مقصد بہترین اسلامی تعلیم و تربیت فراہم کرنا ہے۔</p>
            </div>

            <div className="relative z-10 pt-12">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-3">Academic Session</p>
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-black text-white">2024-25</span>
                  <span className="px-3 py-1 bg-islamic-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest mb-1 shadow-lg shadow-islamic-gold/20">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
