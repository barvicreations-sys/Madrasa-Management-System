'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CalendarCheck, Users, Search, Save, CheckCircle2, XCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AttendancePage() {
  const { t } = useI18n();
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({});
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'students'), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(data);
      // Initialize attendance
      const initial: Record<string, 'present' | 'absent' | 'late'> = {};
      data.forEach(s => initial[s.id] = 'present');
      setAttendance(initial);
    } catch (error) {
      console.error(error);
      setStudents([
        { id: '1', name: 'Umar Farooq', urdu: 'عمر فاروق', class: 'Hifz' },
        { id: '2', name: 'Ahmed Raza', urdu: 'احمد رضا', class: 'Nazra' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleStatusChange = (id: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const currentPresentCount = Object.values(attendance).filter(v => v === 'present').length;

  return (
    <AppLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="urdu-font text-3xl font-black text-slate-800">{t('attendance')}</h1>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1 italic tracking-widest">Daily Roll Call & Student Presence Registry</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
             <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"><ChevronLeft size={20} /></button>
             <div className="flex items-center gap-3 px-4 py-1 border-x border-slate-100">
                <CalendarCheck size={18} className="text-islamic-green" />
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="font-black text-xs uppercase tracking-widest outline-none bg-transparent text-slate-700" 
                />
             </div>
             <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"><ChevronRight size={20} /></button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
              <h4 className="text-3xl font-black text-slate-800 tracking-tighter">{students.length}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Roll</p>
           </div>
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
              <h4 className="text-3xl font-black text-emerald-600 tracking-tighter">{currentPresentCount}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Present</p>
           </div>
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
              <h4 className="text-3xl font-black text-red-600 tracking-tighter">{students.length - currentPresentCount}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Absent/Late</p>
           </div>
           <div className="bg-islamic-green p-4 rounded-[2.5rem] flex items-center justify-center">
              <button className="w-full h-full flex items-center justify-center gap-3 text-white font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform">
                 <Save size={20} />
                 Save Registry
              </button>
           </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden shadow-islamic-green/5">
           <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-100">
                 <tr>
                    <th className="px-8 py-5">Roll No</th>
                    <th className="px-8 py-5">Student / نام</th>
                    <th className="px-8 py-5">Class / درجہ</th>
                    <th className="px-8 py-5 text-center">Presence Status</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {students.map((student, idx) => (
                    <tr key={student.id} className="hover:bg-slate-50/30 transition-all group">
                       <td className="px-8 py-6 font-mono font-black text-slate-300 group-hover:text-islamic-green transition-colors">#{100 + idx}</td>
                       <td className="px-8 py-6">
                          <div>
                             <p className="font-black text-slate-800 tracking-tight">{student.name}</p>
                             <p className="text-[10px] text-slate-400 urdu-font font-bold">{student.urdu}</p>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest">{student.class}</span>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center justify-center gap-4">
                             <button 
                                onClick={() => handleStatusChange(student.id, 'present')}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${attendance[student.id] === 'present' ? 'bg-emerald-100 text-emerald-600 shadow-inner scale-110' : 'bg-slate-50 text-slate-300 hover:bg-emerald-50 hover:text-emerald-300'}`}
                             >
                                <CheckCircle2 size={20} />
                             </button>
                             <button 
                                onClick={() => handleStatusChange(student.id, 'absent')}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${attendance[student.id] === 'absent' ? 'bg-red-100 text-red-600 shadow-inner scale-110' : 'bg-slate-50 text-slate-300 hover:bg-red-50 hover:text-red-300'}`}
                             >
                                <XCircle size={20} />
                             </button>
                             <button 
                                onClick={() => handleStatusChange(student.id, 'late')}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${attendance[student.id] === 'late' ? 'bg-amber-100 text-amber-600 shadow-inner scale-110' : 'bg-slate-50 text-slate-300 hover:bg-amber-50 hover:text-amber-300'}`}
                             >
                                <Clock size={20} />
                             </button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </AppLayout>
  );
}
