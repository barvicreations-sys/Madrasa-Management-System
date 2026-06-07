'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { collection, query, getDocs, where, limit, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CalendarCheck, Search, Filter, CheckCircle2, XCircle, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function AttendancePage() {
  const { t } = useI18n();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('Dars-e-Nizami');

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'students'), where('classId', '==', selectedClass));
        const snapshot = await getDocs(q);
        setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), attendance: 'present' })));
      } catch (error) {
        setStudents([
          { id: '1', name: 'Zubair Ahmed', regNo: '2024101', attendance: 'present' },
          { id: '2', name: 'Mustafa Raza', regNo: '2024102', attendance: 'absent' },
          { id: '3', name: 'Hassan Ali', regNo: '2024103', attendance: 'leave' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [selectedClass]);

  const toggleAttendance = (id: string, status: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, attendance: status } : s));
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t('attendance')}</h2>
            <p className="text-slate-400 text-sm font-bold tracking-widest uppercase mt-1">Daily attendance recording and management</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 flex items-center gap-4">
                <Clock size={16} className="text-slate-400" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-600">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-6 justify-between items-center">
             <div className="flex items-center gap-4">
                {['Dars-e-Nizami', 'Hifz', 'Nazra'].map((cls) => (
                  <button 
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedClass === cls 
                      ? 'bg-islamic-green text-white shadow-lg shadow-islamic-green/20' 
                      : 'bg-white text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
             </div>
             
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-6 px-6 py-3 bg-white border border-slate-200 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Present: {students.filter(s => s.attendance === 'present').length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Absent: {students.filter(s => s.attendance === 'absent').length}</span>
                  </div>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-islamic-green text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-islamic-green/20 hover:bg-islamic-green-light transition-all">
                  Submit All
                </button>
             </div>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-slate-100">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Info</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Mark Attendance</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {students.map((student) => (
                   <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 tracking-tight">{student.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{student.regNo}</p>
                          </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-1 px-1 bg-slate-100/50 rounded-2xl w-fit mx-auto p-1 border border-slate-100 shadow-inner">
                           <button 
                             onClick={() => toggleAttendance(student.id, 'present')}
                             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                               student.attendance === 'present' ? 'bg-white text-emerald-600 shadow-md translate-y-[-1px]' : 'text-slate-400 hover:text-slate-600'
                             }`}
                           >
                             Present
                           </button>
                           <button 
                             onClick={() => toggleAttendance(student.id, 'absent')}
                             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                               student.attendance === 'absent' ? 'bg-white text-rose-600 shadow-md translate-y-[-1px]' : 'text-slate-400 hover:text-slate-600'
                             }`}
                           >
                             Absent
                           </button>
                           <button 
                             onClick={() => toggleAttendance(student.id, 'leave')}
                             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                               student.attendance === 'leave' ? 'bg-white text-amber-600 shadow-md translate-y-[-1px]' : 'text-slate-400 hover:text-slate-600'
                             }`}
                           >
                             Leave
                           </button>
                        </div>
                     </td>
                     <td className="px-8 py-6 text-right">
                        {student.attendance === 'present' && <CheckCircle2 className="inline text-emerald-500" size={24} />}
                        {student.attendance === 'absent' && <XCircle className="inline text-rose-500" size={24} />}
                        {student.attendance === 'leave' && <CalendarCheck className="inline text-amber-500" size={24} />}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </AppLayout>
  );
}
