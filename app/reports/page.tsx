'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { FileDown, Printer, Wallet, Users, TrendingUp, Calendar, Award } from 'lucide-react';

const data = [
  { month: 'Jan', collected: 4000, target: 5000 },
  { month: 'Feb', collected: 3000, target: 5000 },
  { month: 'Mar', collected: 2000, target: 5000 },
  { month: 'Apr', collected: 2780, target: 5000 },
  { month: 'May', collected: 1890, target: 5000 },
  { month: 'Jun', collected: 2390, target: 5000 },
];

export default function ReportsPage() {
  const { t } = useI18n();

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="urdu-font text-3xl font-bold text-slate-800">{t('reports')}</h1>
            <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Detailed analytics and institutional reports</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                <Printer size={16} />
                Print All
             </button>
             <button className="flex items-center gap-2 px-5 py-2.5 bg-islamic-green text-white rounded-xl font-bold text-xs shadow-lg shadow-islamic-green/20 hover:bg-islamic-green-light transition-all">
                <FileDown size={16} />
                Download PDF
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Revenue Report */}
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-lg font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-islamic-green"><Wallet size={20} /></div>
                    Fee Collection Analytics
                 </h3>
                 <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-islamic-green" /> Collected</span>
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-islamic-gold" /> Target</span>
                 </div>
              </div>
              <div className="h-72">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={8}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                       <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                       <Bar dataKey="collected" fill="#064e3b" radius={[6, 6, 0, 0]} barSize={24} />
                       <Bar dataKey="target" fill="#d97706" radius={[6, 6, 0, 0]} barSize={24} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Student Enrollment */}
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-lg font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-islamic-green"><Users size={20} /></div>
                    Enrollment Growth
                 </h3>
                 <select className="text-[10px] font-black bg-slate-50 border-none px-3 py-1.5 rounded-lg outline-none uppercase tracking-widest text-slate-500">
                    <option>Yearly</option>
                    <option>Monthly</option>
                 </select>
              </div>
              <div className="h-72">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                       <defs>
                          <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#064e3b" stopOpacity={0.15}/>
                             <stop offset="95%" stopColor="#064e3b" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                       <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                       <Area type="monotone" dataKey="collected" stroke="#064e3b" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: 'Average Attendance', value: '94%', icon: TrendingUp, bg: 'bg-emerald-50', text: 'text-emerald-600' },
             { label: 'Academic Events', value: '28', icon: Calendar, bg: 'bg-amber-50', text: 'text-islamic-gold' },
             { label: 'Top Performers', value: '12', icon: Award, bg: 'bg-indigo-50', text: 'text-indigo-600' },
           ].map((card, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center group hover:border-islamic-green transition-all">
                 <div className={`w-14 h-14 ${card.bg} ${card.text} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <card.icon size={28} />
                 </div>
                 <h4 className="text-4xl font-black text-slate-800">{card.value}</h4>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">{card.label}</p>
              </div>
           ))}
        </div>
      </div>
    </AppLayout>
  );
}
