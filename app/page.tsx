'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth-context';
import { 
  Users, 
  Wallet, 
  GraduationCap, 
  TrendingUp, 
  Calendar,
  FileSpreadsheet,
  UserPlus
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { t } = useI18n();
  const { role } = useAuth();

  const stats = [
    { label: t('totalStudents'), value: '425', icon: Users, color: 'border-islamic-green', badge: 'Active', badgeColor: 'bg-emerald-100 text-emerald-700' },
    { label: 'Teachers', value: '18', icon: UserPlus, color: 'border-islamic-gold', badge: 'Staff', badgeColor: 'bg-amber-100 text-amber-700' },
    { label: t('todayFee'), value: 'PKR 15,2k', icon: Wallet, color: 'border-islamic-green', badge: '+12%', badgeColor: 'bg-emerald-100 text-emerald-700' },
    { label: t('pendingFees'), value: '64', icon: GraduationCap, color: 'border-red-600', badge: 'Dues', badgeColor: 'bg-red-100 text-red-700' },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <header>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500 text-sm font-medium">Welcome back to the Jamia administrative system.</p>
        </header>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className={`bg-white p-6 border-l-4 ${stat.color} shadow-sm rounded-r-2xl hover:shadow-md transition-shadow cursor-default`}>
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <stat.icon size={20} className="text-slate-300" />
              </div>
              <div className="flex justify-between items-end mt-2">
                <h2 className="text-4xl font-black text-slate-800">{stat.value}</h2>
                <span className={`text-[10px] font-bold py-1 px-2 ${stat.badgeColor} rounded-lg`}>{stat.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Admissions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <span className="text-lg">Recent Admissions</span>
              <span className="text-slate-400 font-normal urdu-font">| تازہ ترین داخلے</span>
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Excel Export</button>
              <Link href="/admission" className="px-4 py-2 text-xs font-bold text-white bg-islamic-green rounded-xl hover:bg-islamic-green-light shadow-lg shadow-islamic-green/20 transition-all">+ New Student</Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-100 italic">
                <tr>
                  <th className="px-8 py-4">ID</th>
                  <th className="px-8 py-4">Student Name / نام</th>
                  <th className="px-8 py-4">Class / درجہ</th>
                  <th className="px-8 py-4">Guardian Contact</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600 divide-y divide-slate-50">
                {[
                  { id: '#1092', name: 'Umar Farooq', urdu: 'عمر فاروق', class: 'Hifz-ul-Quran', contact: '0321-4567890', date: '12 May 2024', status: 'Verified', statusColor: 'bg-emerald-100 text-emerald-700' },
                  { id: '#1093', name: 'Ahmed Raza', urdu: 'احمد رضا', class: 'Dars-e-Nizami', contact: '0300-1234567', date: '14 May 2024', status: 'Pending', statusColor: 'bg-amber-100 text-amber-700' },
                  { id: '#1094', name: 'Bilal Hassan', urdu: 'بلال حسن', class: 'Nazra-ul-Quran', contact: '0345-9876543', date: '15 May 2024', status: 'Verified', statusColor: 'bg-emerald-100 text-emerald-700' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-5 font-mono font-bold text-islamic-green">{row.id}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-[10px] group-hover:bg-islamic-green group-hover:text-white transition-colors uppercase italic">IMG</div>
                        <div>
                          <p className="font-bold text-slate-800">{row.name}</p>
                          <p className="text-[10px] text-slate-400 urdu-font">{row.urdu}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-medium">{row.class}</td>
                    <td className="px-8 py-5 text-slate-500">{row.contact}</td>
                    <td className="px-8 py-5 text-slate-400 font-medium">{row.date}</td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-3 py-1 ${row.statusColor} rounded-full text-[10px] font-bold shadow-sm`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 flex items-center justify-between text-xs font-bold text-slate-400 border-t border-slate-100 bg-slate-50/20 uppercase tracking-widest italic">
            <p>Showing 3 of 425 students</p>
            <div className="flex gap-6">
              <button className="hover:text-islamic-green transition-colors">Previous</button>
              <button className="hover:text-islamic-green transition-colors">Next</button>
            </div>
          </div>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-islamic-green p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-8 text-white shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
            <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shrink-0 transform -rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-5xl">📝</span>
            </div>
            <div className="flex-1 text-center sm:text-left z-10">
              <h4 className="text-xl font-bold mb-1">Generate Certificate</h4>
              <p className="text-xs text-white/70 mb-5 leading-relaxed font-medium">Create printable PDF Sanads and result cards with custom digital signatures.</p>
              <button className="px-6 py-2 bg-islamic-gold text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-islamic-gold-light transition-all shadow-lg">Open Generator</button>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-8 border-2 border-islamic-green/10 group hover:border-islamic-green/30 transition-all shadow-sm">
            <div className="w-24 h-24 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 shrink-0 transform rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-5xl group-hover:scale-110 transition-transform">💰</span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-xl font-bold text-islamic-green mb-1">Daily Collection</h4>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed font-medium">Overview of cash receipts and online deposits for the current active session.</p>
              <button className="px-6 py-2 border-2 border-islamic-green text-islamic-green text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-islamic-green hover:text-white transition-all">Print Report</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
