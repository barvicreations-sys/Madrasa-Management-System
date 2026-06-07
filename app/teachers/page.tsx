'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserRound, Mail, Phone, BookOpen, MoreVertical, Plus, Search, Filter } from 'lucide-react';

export default function TeachersPage() {
  const { t } = useI18n();
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'teachers'));
      setTeachers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
      setTeachers([
        { id: '1', name: 'Mufti Muhammad Ali', urdu: 'مفتی محمد علی', role: 'Head Teacher', department: 'Hifz', contact: '0321-1111111' },
        { id: '2', name: 'Qari Ahmed Raza', urdu: 'قاری احمد رضا', role: 'Tajweed Specialist', department: 'Nazra', contact: '0300-2222222' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="urdu-font text-3xl font-black text-slate-800">اساتذہ (Teachers)</h1>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">Staff directory and academic departments</p>
          </div>
          <button className="flex items-center gap-3 px-8 py-3 bg-islamic-green text-white font-black rounded-2xl shadow-xl shadow-islamic-green/20 hover:bg-islamic-green-light transition-all uppercase tracking-widest text-xs">
            <Plus size={18} />
            Hire New Teacher
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="w-16 h-16 bg-white border-2 border-slate-100 rounded-2xl shadow-sm flex items-center justify-center font-black text-slate-300 italic group-hover:border-islamic-green group-hover:text-islamic-green transition-all">TCH</div>
                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><MoreVertical size={20} /></button>
              </div>

              <div className="mt-6 relative z-10">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">{teacher.name}</h3>
                <p className="urdu-font text-sm font-bold text-slate-400 mt-0.5">{teacher.urdu}</p>
              </div>

              <div className="mt-8 space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center"><BookOpen size={14} /></div>
                   <p className="text-xs font-black text-slate-600 uppercase tracking-widest">{teacher.department}</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center"><Phone size={14} /></div>
                   <p className="text-xs font-bold text-slate-500">{teacher.contact}</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between relative z-10">
                <span className="px-3 py-1 bg-emerald-100 text-islamic-green rounded-lg text-[10px] font-black uppercase tracking-widest">{teacher.role}</span>
                <button className="text-[10px] font-black text-slate-400 hover:text-islamic-green uppercase tracking-widest transition-colors flex items-center gap-1 group/btn">
                  View Profile <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function ChevronRight({ className, size }: { className?: string, size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
