'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Wallet, Plus, Search, Filter, Calendar, CreditCard, Receipt, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeesPage() {
  const { t } = useI18n();
  const [fees, setFees] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchFees = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'fees'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      setFees(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
      setFees([
        { id: '1', studentName: 'Umar Farooq', amount: 2500, type: 'Monthly', date: new Date().toISOString(), status: 'Paid' },
        { id: '2', studentName: 'Ahmed Raza', amount: 1500, type: 'Admission', date: new Date().toISOString(), status: 'Paid' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'students'));
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="urdu-font text-3xl font-black text-slate-800">{t('fees')}</h1>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">Institutional Financial records and fee collection</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 px-8 py-3 bg-islamic-green text-white font-black rounded-2xl shadow-xl shadow-islamic-green/20 hover:bg-islamic-green-light transition-all uppercase tracking-widest text-xs"
          >
            <Plus size={18} />
            Record New Transaction
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-emerald-50 text-islamic-green rounded-2xl flex items-center justify-center shrink-0"><Receipt size={28} /></div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Collection</p>
                 <h2 className="text-2xl font-black text-slate-800">PKR 124,500</h2>
              </div>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-amber-50 text-islamic-gold rounded-2xl flex items-center justify-center shrink-0"><Clock size={28} /></div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Amount</p>
                 <h2 className="text-2xl font-black text-slate-800">PKR 32,800</h2>
              </div>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0"><CreditCard size={28} /></div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Payments</p>
                 <h2 className="text-2xl font-black text-slate-800">42%</h2>
              </div>
           </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden shadow-islamic-green/5">
          <div className="p-8 border-b border-slate-100 bg-slate-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
             <div className="flex items-center gap-3">
                <Search className="text-slate-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="bg-transparent outline-none font-bold text-sm text-slate-700 w-full"
                />
             </div>
             <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"><Filter size={14} /> Filter</button>
                <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"><Calendar size={14} /> Date Range</button>
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-100 italic">
                <tr>
                  <th className="px-8 py-5">Reciept No</th>
                  <th className="px-8 py-5">Student / نام</th>
                  <th className="px-8 py-5">Category</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {fees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6 font-mono font-black text-slate-400">#RF-{fee.id.substring(0, 5).toUpperCase()}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <div className="w-9 h-9 bg-emerald-50 text-islamic-green rounded-xl flex items-center justify-center font-black text-xs">ST</div>
                         <p className="font-black text-slate-800 tracking-tight">{fee.studentName}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-[0.1em]">{fee.type}</span>
                    </td>
                    <td className="px-8 py-6">
                       <p className="font-black text-slate-800">PKR {fee.amount?.toLocaleString()}</p>
                       <p className="text-[10px] text-slate-400 font-bold tracking-tight italic">{new Date(fee.date).toLocaleDateString()}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black shadow-sm uppercase tracking-widest">{fee.status}</span>
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
