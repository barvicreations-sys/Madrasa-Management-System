'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BookOpen, Plus, Users, User, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClassesPage() {
  const { t } = useI18n();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [teachers, setTeachers] = useState<any[]>([]);

  // Form State
  const [name, setName] = useState('');
  const [nameUrdu, setNameUrdu] = useState('');
  const [section, setSection] = useState('');
  const [teacherId, setTeacherId] = useState('');

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'classes'));
      setClasses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const fetchTeachers = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'teachers'));
      setTeachers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      // Default mock if none
      setTeachers([{ id: '1', name: 'Maulana Ahmad' }, { id: '2', name: 'Mufti Saeed' }]);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'classes'), {
        name, nameUrdu, section, teacherId,
        createdAt: serverTimestamp()
      });
      setShowAdd(false);
      fetchClasses();
    } catch (e) { console.error(e); }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="urdu-font text-3xl font-bold text-gray-900">{t('classes')}</h1>
            <p className="text-gray-500 text-sm mt-1">Manage madrasa classes and assign teachers</p>
          </div>
          <button 
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-islamic-green hover:bg-islamic-green-light text-white px-6 py-2.5 rounded-xl shadow-lg transition-all font-bold"
          >
            <Plus size={20} />
            <span>Add New Class</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-full text-center py-20 font-bold text-gray-400">Loading classes...</p>
          ) : classes.length === 0 ? (
            <div className="col-span-full py-20 flex flex-col items-center opacity-20">
               <BookOpen size={80} />
               <p className="text-xl font-bold mt-4">No classes defined yet</p>
            </div>
          ) : (
            classes.map((cls, i) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex items-start justify-between mb-6">
                   <div className="w-14 h-14 bg-islamic-green/10 text-islamic-green rounded-2xl flex items-center justify-center shadow-inner">
                      <BookOpen size={28} />
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="px-3 py-1 bg-islamic-gold/10 text-islamic-green font-bold text-[10px] rounded-full uppercase tracking-tighter shadow-sm border border-islamic-gold/20">Section {cls.section}</span>
                   </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{cls.name}</h3>
                <p className="urdu-font text-xl text-islamic-green mb-6">{cls.nameUrdu}</p>
                
                <div className="space-y-4 pt-4 border-t border-dashed border-gray-100">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                         <User size={16} />
                      </div>
                      <div>
                         <p className="text-[10px] uppercase font-bold text-gray-400">Class Teacher</p>
                         <p className="text-sm font-bold text-gray-700">{teachers.find(t => t.id === cls.teacherId)?.name || 'Not assigned'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                         <Users size={16} />
                      </div>
                      <div>
                         <p className="text-[10px] uppercase font-bold text-gray-400">Enrolled Students</p>
                         <p className="text-sm font-bold text-gray-700">12 Students</p>
                      </div>
                   </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                   <button className="text-sm font-bold text-islamic-green hover:underline flex items-center gap-1 group/btn">
                      View Details
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                   </button>
                   <div className="w-10 h-1 h-islamic-gold rounded-full opacity-20" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div onClick={() => setShowAdd(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
             <div className="bg-white w-full max-w-lg rounded-3xl shadow-3xl relative overflow-hidden">
                <div className="bg-islamic-green p-8 text-white">
                   <h2 className="text-2xl font-bold urdu-font">نئی کلاس (New Class)</h2>
                   <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">Setup Academics</p>
                </div>
                <form onSubmit={handleAdd} className="p-10 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Class Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-islamic-green outline-none" placeholder="Hifz-e-Quran" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-xs font-bold text-gray-500 uppercase urdu-font">نام (اردو)</label>
                         <input value={nameUrdu} onChange={(e) => setNameUrdu(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-islamic-green outline-none text-right urdu-font" dir="rtl" />
                      </div>
                   </div>
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Section</label>
                      <input value={section} onChange={(e) => setSection(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-islamic-green outline-none" placeholder="A, B, or Senior" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Class Teacher</label>
                      <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-islamic-green outline-none">
                         <option value="">- Select Teacher -</option>
                         {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                   </div>
                   <button type="submit" className="w-full bg-islamic-green text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-islamic-green-light transition-all flex items-center justify-center gap-3">
                      <CheckCircle2 size={24} />
                      Define Class
                   </button>
                </form>
             </div>
          </div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
