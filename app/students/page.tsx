'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, User, FileSpreadsheet, UserPlus, Users, X, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import StudentIDCard from '@/components/StudentIDCard';

export default function StudentsPage() {
  const { t } = useI18n();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [selectedStudentForID, setSelectedStudentForID] = useState<any>(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'students'), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
      // Fallback for demo
      setStudents([
        { id: '1', regNo: '2024001', name: 'Umar Farooq', urduName: 'عمر فاروق', classId: 'Hifz', fatherName: 'Muhammad Ali', contact: '0321-1234567', status: 'active', dob: '2010-05-15' },
        { id: '2', regNo: '2024002', name: 'Ahmed Raza', urduName: 'احمد رضا', classId: 'Dars-e-Nizami', fatherName: 'Ghulam Nabi', contact: '0300-7654321', status: 'active', dob: '2008-11-20' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filterClass]);

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.regNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="urdu-font text-3xl font-black text-slate-800">{t('students')}</h1>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">Manage and access all registered student records</p>
          </div>
          <Link href="/admission" className="flex items-center gap-3 px-6 py-3 bg-islamic-green text-white font-black rounded-2xl shadow-xl shadow-islamic-green/20 hover:bg-islamic-green-light transition-all uppercase tracking-widest text-xs">
            <UserPlus size={18} />
            {t('newStudent')}
          </Link>
        </header>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-islamic-green transition-colors" size={20} />
            <input 
              type="text"
              placeholder={t('search') + "..."}
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-islamic-green/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
               <button onClick={() => setFilterClass('all')} className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filterClass === 'all' ? 'bg-white text-islamic-green shadow-sm' : 'text-slate-400 hover:text-slate-600 uppercase'}`}>ALL</button>
               <button onClick={() => setFilterClass('hifz')} className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filterClass === 'hifz' ? 'bg-white text-islamic-green shadow-sm' : 'text-slate-400 hover:text-slate-600 uppercase'}`}>HIFZ</button>
               <button onClick={() => setFilterClass('nazra')} className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filterClass === 'nazra' ? 'bg-white text-islamic-green shadow-sm' : 'text-slate-400 hover:text-slate-600 uppercase'}`}>NAZRA</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden shadow-islamic-green/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5">Registrar / ID</th>
                  <th className="px-8 py-5">Full Name / نام</th>
                  <th className="px-8 py-5">Section / درجہ</th>
                  <th className="px-8 py-5">Emergency Contact</th>
                  <th className="px-8 py-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-mono font-black text-islamic-green bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100/50">{student.regNo}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center font-black text-slate-300 text-xs italic group-hover:border-islamic-green/30 group-hover:text-islamic-green transition-all">ST</div>
                        <div>
                          <p className="font-black text-slate-800 tracking-tight">{student.name}</p>
                          <p className="text-[10px] text-slate-400 urdu-font font-bold mt-0.5">{student.urdu || student.urduName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{student.class || student.classId}</span>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-bold">{student.contact}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setSelectedStudentForID(student)}
                          className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-islamic-gold hover:border-islamic-gold/20 hover:shadow-sm transition-all"
                          title={t('idCard')}
                        >
                          <FileSpreadsheet size={16} />
                        </button>
                        <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-islamic-green hover:border-islamic-green/20 hover:shadow-sm transition-all"><Eye size={16} /></button>
                        <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-amber-600 hover:border-amber-600/20 hover:shadow-sm transition-all"><Edit size={16} /></button>
                        <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-600 hover:border-red-600/20 hover:shadow-sm transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredStudents.length === 0 && !loading && (
            <div className="p-20 text-center bg-slate-50/20">
               <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-inner">
                  <Users size={32} />
               </div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight">No records found</h3>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Adjust your filters or start a new admission</p>
            </div>
          )}
        </div>

        {/* ID Card Modal */}
        <AnimatePresence>
          {selectedStudentForID && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedStudentForID(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white rounded-[2.5rem] shadow-2xl p-10 max-w-lg w-full flex flex-col items-center"
              >
                <button 
                  onClick={() => setSelectedStudentForID(null)}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="mb-8 text-center">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">{t('idCard')}</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Preview for {selectedStudentForID.name}</p>
                </div>

                <div className="mb-10 scale-125">
                  <StudentIDCard student={selectedStudentForID} />
                </div>

                <div className="flex w-full gap-4 pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => setSelectedStudentForID(null)}
                    className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-islamic-green text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-islamic-green/20 hover:bg-islamic-green-light transition-all"
                  >
                    <Printer size={18} />
                    {t('print')}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}

