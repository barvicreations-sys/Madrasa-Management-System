'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { GraduationCap, Trophy, Search, Plus, Calendar, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

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
        { id: '1', title: 'Mid-Term Examination', class: 'Dars-e-Nizami', date: '2024-06-15', status: 'upcoming', totalStudents: 120 },
        { id: '2', title: 'Monthly Hifz Assessment', class: 'Hifz', date: '2024-06-10', status: 'completed', totalStudents: 45 },
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t('exams')}</h2>
            <p className="text-slate-400 text-sm font-bold tracking-widest uppercase mt-1">Schedule and monitor academic performance</p>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-islamic-green text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-islamic-green/20 hover:bg-islamic-green-light transition-all group">
            <Plus size={18} />
            Schedule New Exam
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden p-10">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Upcoming Schedule</h3>
                  <Link href="/exams/history" className="text-[10px] font-black text-islamic-green uppercase tracking-widest hover:underline">View All History</Link>
               </div>
               
               <div className="space-y-4">
                 {exams.map((exam) => (
                   <div key={exam.id} className="group p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-islamic-green/20 hover:shadow-xl hover:shadow-islamic-green/5 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-islamic-green shadow-sm group-hover:scale-110 transition-transform">
                          <BookOpen size={28} />
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-slate-800 tracking-tight">{exam.title}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                              <Calendar size={12} /> {exam.date}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-islamic-green bg-islamic-green/5 px-2 py-0.5 rounded-lg">
                              {exam.class}
                            </span>
                          </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Students</p>
                          <p className="text-sm font-black text-slate-800">{exam.totalStudents}</p>
                        </div>
                        <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-300 group-hover:text-islamic-green group-hover:bg-islamic-green/5 transition-all">
                          <ArrowRight size={20} />
                        </button>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
               <div className="w-16 h-16 bg-islamic-gold/10 text-islamic-gold rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-islamic-gold/10">
                 <Trophy size={32} />
               </div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight mb-4">Academic Excellence Report</h3>
               <p className="text-slate-400 text-sm font-bold leading-relaxed mb-6">Review performance statistics and award certificates for the previous session.</p>
               <button className="w-full py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all">Generate Report</button>
            </div>

            <div className="bg-islamic-green rounded-[3rem] p-10 text-white shadow-2xl shadow-islamic-green/20">
               <div className="flex items-center gap-3 mb-6">
                 <Clock size={20} className="text-white/60" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/60">System Status</span>
               </div>
               <p className="text-2xl font-black tracking-tight leading-tight">Exams Mode Active</p>
               <p className="mt-4 text-sm font-bold text-white/70 italic urdu-font text-lg">تمام درجہ جات کے امتحانی فارمز جمع کرنے کی آخری تاریخ 15 جون ہے۔</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
