'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Wallet, Plus, Search, Filter, Calendar, CreditCard, Receipt, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FeesPage() {
  const { t } = useI18n();
  const [fees, setFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFee, setNewFee] = useState({
    studentName: '',
    regNo: '',
    amount: '',
    month: new Date().toLocaleString('default', { month: 'long' }),
    type: 'monthly'
  });

  const fetchFees = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'fees'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setFees(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
      setFees([
        { id: '1', studentName: 'Zaid bin Sabit', regNo: '2024005', amount: '2500', month: 'June', status: 'paid', date: '2024-06-05' },
        { id: '2', studentName: 'Hafiz Bilal', regNo: '2024012', amount: '3000', month: 'June', status: 'pending', date: '---' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleAddFee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'fees'), {
        ...newFee,
        status: 'paid',
        createdAt: serverTimestamp()
      });
      setShowAddModal(false);
      fetchFees();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t('fees')}</h2>
            <p className="text-slate-400 text-sm font-bold tracking-widest uppercase mt-1">Track payments and manage school accounts</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-3 px-8 py-4 bg-islamic-green text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-islamic-green/20 hover:bg-islamic-green-light transition-all group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            Collect Fee
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Collected', value: 'Rs. 482,000', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Pending Fees', value: 'Rs. 94,500', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Monthly Target', value: 'Rs. 600,000', icon: Receipt, color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
              <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-lg shadow-current/10`}>
                <stat.icon size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Recent Transactions</h3>
            <div className="flex gap-3">
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600">
                 <Calendar size={14} /> June 2024
               </button>
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600">
                 <Filter size={14} /> All Types
               </button>
            </div>
          </div>

          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Student / Reg No</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Month</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Amount</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {fees.map((fee) => (
                    <tr key={fee.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 tracking-tight">{fee.studentName}</p>
                            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{fee.regNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-slate-600">{fee.month}</td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-sm font-black text-slate-800">Rs. {fee.amount}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          fee.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {fee.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-3 text-slate-400 hover:text-islamic-green transition-colors">
                          <Receipt size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Add Fee Modal */}
        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white rounded-[3rem] shadow-2xl p-12 max-w-xl w-full"
              >
                <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Record New Payment</h3>
                
                <form onSubmit={handleAddFee} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1">Reg Number</label>
                       <input 
                         required
                         type="text" 
                         value={newFee.regNo}
                         onChange={(e) => setNewFee({...newFee, regNo: e.target.value})}
                         className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1">Amount</label>
                       <input 
                         required
                         type="number" 
                         value={newFee.amount}
                         onChange={(e) => setNewFee({...newFee, amount: e.target.value})}
                         className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold" 
                       />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1">Student Name</label>
                     <input 
                       required
                       type="text" 
                       value={newFee.studentName}
                       onChange={(e) => setNewFee({...newFee, studentName: e.target.value})}
                       className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold" 
                     />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 bg-islamic-green text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-islamic-green/20"
                    >
                      Receive Payment
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
