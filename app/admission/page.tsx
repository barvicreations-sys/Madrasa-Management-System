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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    urduName: '',
    fatherName: '',
    dob: '',
    contact: '',
    classId: '',
    address: '',
    previousSchool: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'students'), {
        ...formData,
        regNo: `REG-${Date.now().toString().slice(-6)}`,
        status: 'active',
        createdAt: serverTimestamp()
      });
      alert('Student Admitted Successfully!');
      setFormData({
        name: '', urduName: '', fatherName: '', dob: '', contact: '', classId: '', address: '', previousSchool: ''
      });
    } catch (error) {
      console.error(error);
      alert('Error during admission. Please check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/students">
               <button className="w-14 h-14 bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-slate-400 hover:text-islamic-green hover:shadow-xl transition-all">
                 <ArrowLeft size={24} />
               </button>
            </Link>
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t('admission')}</h2>
              <p className="text-slate-400 text-sm font-bold tracking-widest uppercase mt-1">Register a new student to the Jamia</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-islamic-green/5 rounded-2xl border border-islamic-green/10">
            <ShieldCheck className="text-islamic-green" size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest text-islamic-green">Academic Year 2024-25</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm space-y-8">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
                <UserRound className="text-islamic-green" size={20} />
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1">Full Name (English)</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter full name" 
                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-islamic-green/20 focus:bg-white transition-all outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1 urdu-font text-sm leading-none">نام (اردو)</label>
                  <input 
                    type="text" 
                    value={formData.urduName}
                    onChange={(e) => setFormData({...formData, urduName: e.target.value})}
                    placeholder="مکمل نام درج کریں" 
                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-lg font-bold text-slate-700 focus:ring-2 focus:ring-islamic-green/20 focus:bg-white transition-all outline-none urdu-font text-end" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1">Father's Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.fatherName}
                    onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                    placeholder="Guardian name" 
                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-islamic-green/20 focus:bg-white transition-all outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1">Date of Birth</label>
                  <input 
                    required 
                    type="date" 
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-islamic-green/20 focus:bg-white transition-all outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm space-y-8">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
                <GraduationCap className="text-islamic-green" size={20} />
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Academic Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1">Apply for Class</label>
                  <select 
                    required 
                    value={formData.classId}
                    onChange={(e) => setFormData({...formData, classId: e.target.value})}
                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-sm font-black uppercase tracking-widest text-slate-600 focus:ring-2 focus:ring-islamic-green/20 focus:bg-white transition-all outline-none appearance-none"
                  >
                    <option value="">Select a class</option>
                    <option value="Hifz">Hifz-ul-Quran</option>
                    <option value="Nazra">Nazra-ul-Quran</option>
                    <option value="Dars-e-Nizami">Dars-e-Nizami</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1">Previous Institution</label>
                  <input 
                    type="text" 
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({...formData, previousSchool: e.target.value})}
                    placeholder="If any" 
                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-islamic-green/20 focus:bg-white transition-all outline-none" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-sm text-center">
              <div className="w-40 h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl mx-auto flex flex-col items-center justify-center text-slate-300 group cursor-pointer hover:border-islamic-green/30 hover:bg-islamic-green/5 transition-all">
                <Camera size={40} className="group-hover:scale-110 transition-transform mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Upload Photo</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Max Size: 2MB (JPG, PNG)</p>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                <Phone className="text-islamic-green" size={20} />
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Contact</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1">Emergency Contact</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    placeholder="03xx-xxxxxxx" 
                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-islamic-green/20 focus:bg-white transition-all outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1">Resident Address</label>
                  <textarea 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Full address" 
                    rows={3}
                    className="w-full bg-slate-50 border-none rounded-2xl p-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-islamic-green/20 focus:bg-white transition-all outline-none resize-none" 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-6 bg-islamic-green text-white rounded-[2rem] flex items-center justify-center gap-4 shadow-2xl shadow-islamic-green/20 hover:bg-islamic-green-light hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0"
            >
              <Save size={24} />
              <span className="text-sm font-black uppercase tracking-widest">Confirm Admission</span>
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
