'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { GraduationCap, Trophy, Search, Plus, Calendar, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExamsPage() {
  const { t } = useI18n();
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'exams'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      setExams(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
      setExams([
        { id: '1', title: 'Mid-term Hifz Examination', class: 'Hifz', date: '2024-06-15', status: 'Upcoming', students: 120 },
        { id: '2', title: 'Monthly Tajweed Test', class: 'Nazra', date: '2024-06-20', status: 'Upcoming', students: 85 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="urdu-font text-3xl font-black text-slate-800">{t('exams')}</h1>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">Academic Performance Tracking & Schedules</p>
          </div>
          <button className="flex items-center gap-3 px-8 py-3 bg-islamic-green text-white font-black rounded-2xl shadow-xl shadow-islamic-green/20 hover:bg-islamic-green-light transition-all uppercase tracking-widest text-xs">
            <Plus size={18} />
            Schedule New Exam
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Summary Cards */}
           <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Top Performers', value: '12', icon: Trophy, bg: 'bg-islamic-gold/10', text: 'text-islamic-gold' },
                { title: 'Pass Rate', value: '88%', icon: GraduationCap, bg: 'bg-emerald-50', text: 'text-islamic-green' },
              ].map((card, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-8">
                   <div className={`w-16 h-16 ${card.bg} ${card.text} rounded-2xl flex items-center justify-center shrink-0`}>
                      <card.icon size={32} />
                   </div>
                   <div>
                      <h4 className="text-3xl font-black text-slate-800 tracking-tight">{card.value}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{card.title}</p>
                   </div>
                </div>
              ))}
              
              {/* Upcoming Exam Table */}
              <div className="sm:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-6 border-b border-slate-50 bg-slate-50/20 flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 underline decoration-islamic-gold decoration-2 underline-offset-4">
                       <Calendar size={16} className="text-islamic-gold" />
                       Upcoming Schedule
                    </h3>
                    <Link href="/exams/history" className="text-[10px] font-black text-islamic-green uppercase tracking-widest hover:underline">View All History</Link>
                 </div>
                 <div className="p-0">
                    <table className="w-full text-left">
                       <tbody className="divide-y divide-slate-50">
                          {exams.map((exam) => (
                             <tr key={exam.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-6">
                                   <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex flex-col items-center justify-center italic font-black text-slate-400 group-hover:bg-islamic-green group-hover:text-white transition-all">
                                         <span className="text-[10px]">{new Date(exam.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                                         <span className="text-sm leading-none">{new Date(exam.date).getDate()}</span>
                                      </div>
                                      <div>
                                         <p className="font-black text-slate-800 tracking-tight">{exam.title}</p>
                                         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">
                                            <span className="flex items-center gap-1"><BookOpen size={10} /> {exam.class}</span>
                                            <span className="flex items-center gap-1"><Users size={10} /> {exam.students} Registered</span>
                                         </div>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-6 py-6 text-right">
                                   <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 group-hover:bg-islamic-green group-hover:text-white group-hover:border-islamic-green transition-all shadow-sm">
                                      <ArrowRight size={16} />
                                   </button>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           {/* Quick Stats/Actions */}
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-islamic-green p-8 rounded-[2.5rem] shadow-2xl shadow-islamic-green/20 text-white relative overflow-hidden group">
                 <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-700" />
                 <h3 className="text-xl font-black mb-4 tracking-tight">Generate Merit List</h3>
                 <p className="text-xs text-white/70 mb-8 leading-relaxed font-medium">Instantly compile examination results into beautifully designed merit lists for the main assembly board.</p>
                 <button className="w-full py-4 bg-islamic-gold text-white font-black rounded-2xl uppercase tracking-[0.1em] text-xs shadow-lg hover:bg-islamic-gold-light hover:-translate-y-1 transition-all">Start Processing</button>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                 <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    Quick Resource
                 </h3>
                 <div className="space-y-4">
                    {[
                      { icon: BookOpen, title: 'Exam Syllabi', desc: 'Download as PDF' },
                      { icon: Clock, title: 'Seating Plans', desc: 'Auto-balanced layout' }
                    ].map((item, idx) => (
                      <button key={idx} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                         <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:scale-110 group-hover:text-islamic-green transition-all"><item.icon size={18} /></div>
                         <div className="text-left">
                            <p className="text-xs font-black text-slate-800 uppercase">{item.title}</p>
                            <p className="text-[10px] text-slate-300 font-bold tracking-tight">{item.desc}</p>
                         </div>
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </AppLayout>
  );
}
