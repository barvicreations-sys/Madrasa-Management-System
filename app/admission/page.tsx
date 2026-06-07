'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserPlus, Save, ArrowLeft, Camera, ShieldCheck, GraduationCap, Phone, UserRound } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function AdmissionPage() {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    urduName: '',
    fatherName: '',
    dob: '',
    classId: 'hifz',
    contact: '',
    address: '',
    emergencyContact: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'students'), {
        ...formData,
        status: 'active',
        createdAt: serverTimestamp(),
        regNo: `JN-${Date.now().toString().slice(-4)}`
      });
      alert('Admission successful!');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/students" className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-islamic-green hover:border-islamic-green/30 transition-all shadow-sm">
               <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="urdu-font text-3xl font-black text-slate-800">{t('admission')}</h1>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">Student Enrollment Form • Session 2024-25</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3 px-5 py-2.5 bg-emerald-50 text-islamic-green rounded-2xl border border-emerald-100">
             <ShieldCheck size={18} />
             <span className="text-[10px] font-black uppercase tracking-widest">Secure Entry</span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-islamic-green/5 overflow-hidden">
             {/* Form Section: Personal Info */}
             <div className="p-10 border-b border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 bg-islamic-gold/10 text-islamic-gold rounded-xl flex items-center justify-center"><UserRound size={20} /></div>
                   <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Personal Identification</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Name (English)</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-islamic-green/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2 text-right">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1 urdu-font">طالب علم کا نام (اردو)</label>
                      <input 
                        dir="rtl"
                        type="text" 
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-islamic-green/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700 urdu-font text-xl" 
                        value={formData.urduName}
                        onChange={(e) => setFormData({...formData, urduName: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Father's Name / Guardian</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-islamic-green/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700" 
                        value={formData.fatherName}
                        onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date of Birth</label>
                      <input 
                        required
                        type="date" 
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-islamic-green/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700" 
                        value={formData.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                      />
                   </div>
                </div>
             </div>

             {/* Form Section: Academic */}
             <div className="p-10 border-b border-slate-100 bg-slate-50/20">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 bg-emerald-100 text-islamic-green rounded-xl flex items-center justify-center"><GraduationCap size={20} /></div>
                   <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Academic Placement</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Selected Class / Department</label>
                      <select 
                        className="w-full px-6 py-4 bg-white border-2 border-slate-100 focus:border-islamic-green/20 rounded-2xl outline-none transition-all font-bold text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_1.5rem_center] bg-no-repeat"
                        value={formData.classId}
                        onChange={(e) => setFormData({...formData, classId: e.target.value})}
                      >
                         <option value="hifz">Hifz-ul-Quran (حفظ القرآن)</option>
                         <option value="nazra">Nazra (ناظرہ)</option>
                         <option value="dars">Dars-e-Nizami (درس نظامی)</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                      <div className="relative group">
                         <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-islamic-green transition-colors" size={18} />
                         <input 
                           required
                           type="tel" 
                           placeholder="03xx-xxxxxxx"
                           className="w-full pl-12 pr-6 py-4 bg-white border-2 border-slate-100 focus:border-islamic-green/20 rounded-2xl outline-none transition-all font-bold text-slate-700" 
                           value={formData.contact}
                           onChange={(e) => setFormData({...formData, contact: e.target.value})}
                         />
                      </div>
                   </div>
                </div>
             </div>

             {/* Footer Actions */}
             <div className="p-10 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <div className="w-2 h-2 rounded-full bg-islamic-gold animate-pulse" />
                   Reviewing all details before submission
                </div>
                <button 
                  disabled={isSubmitting}
                  className="flex items-center gap-3 px-10 py-5 bg-islamic-green text-white font-black rounded-3xl shadow-2xl shadow-islamic-green/30 hover:bg-islamic-green-light transition-all uppercase tracking-widest text-xs disabled:opacity-50"
                >
                   {isSubmitting ? (
                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                   ) : (
                     <Save size={18} />
                   )}
                   Confirm Admission
                </button>
             </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
