'use client';

import AppLayout from '@/components/Layout';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth-context';
import { 
  User, 
  Shield, 
  Globe, 
  Database,
  ChevronRight,
  LogOut,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const { t, lang, setLang } = useI18n();
  const { user, role, logout } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="urdu-font text-3xl font-black text-slate-800">{t('settings')}</h1>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">Manage your administrative account and institutional preferences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           {/* Profile Card */}
           <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center lg:col-span-1 flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 bg-emerald-50 rounded-full border-8 border-white shadow-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                   {user?.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                   ) : (
                      <User size={56} className="text-islamic-green opacity-40" />
                   )}
                </div>
                <div className="absolute bottom-1 right-1 w-8 h-8 bg-islamic-gold text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg cursor-pointer">
                   <div className="w-4 h-4 bg-white/20 rounded-full" />
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{user?.displayName || 'Administrator'}</h3>
                <div className="inline-block mt-3 px-4 py-1.5 bg-emerald-100 text-islamic-green text-[10px] font-black uppercase tracking-widest rounded-full">
                  {t(role as any || 'admin')}
                </div>
              </div>

              <div className="w-full mt-10 pt-10 border-t border-slate-100 space-y-6">
                 <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Email Address</p>
                    <p className="text-sm font-bold text-slate-700">{user?.email || 'admin@jamia.edu'}</p>
                 </div>
                 
                 <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-red-50 text-red-600 font-black rounded-2xl hover:bg-red-100 transition-all text-xs uppercase tracking-widest shadow-sm"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
           </div>

           {/* Settings Options */}
           <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transform transition-all">
                 <div className="p-8 border-b border-slate-50 bg-slate-50/30">
                    <h3 className="font-black text-slate-800 flex items-center gap-3 uppercase tracking-wider text-sm">
                       <Globe size={20} className="text-islamic-green" />
                       Localization & Regional
                    </h3>
                 </div>
                 <div className="p-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                       <div>
                          <p className="font-bold text-slate-800">Preferred Interface Language</p>
                          <p className="text-xs text-slate-400 font-medium">Choose between English and Urdu (Nastaliq)</p>
                       </div>
                       <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                          <button onClick={() => setLang('ur')} className={`px-6 py-2 rounded-lg text-xs font-black transition-all urdu-font ${lang === 'ur' ? 'bg-white text-islamic-green shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>اردو</button>
                          <button onClick={() => setLang('en')} className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${lang === 'en' ? 'bg-white text-islamic-green shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>ENGLISH</button>
                       </div>
                    </div>
                 </div>
              </section>

              <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-50 bg-slate-50/30">
                    <h3 className="font-black text-slate-800 flex items-center gap-3 uppercase tracking-wider text-sm">
                       <Shield size={20} className="text-islamic-green" />
                       Security & Roles
                    </h3>
                 </div>
                 <div className="p-8 space-y-4">
                    {[
                      { icon: Shield, title: 'Access Control', desc: 'Manage modular permissions for teachers and staff', color: 'text-indigo-600' },
                      { icon: Database, title: 'Data Management', desc: 'Secure encryption and disaster recovery options', color: 'text-amber-600' }
                    ].map((item, idx) => (
                      <button key={idx} className="w-full flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-emerald-50/50 hover:border-islamic-green/30 transition-all group">
                         <div className="flex items-center gap-5">
                            <div className={`p-3 bg-white rounded-xl ${item.color} shadow-sm group-hover:scale-110 transition-transform`}><item.icon size={20} /></div>
                            <div className="text-left">
                               <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{item.title}</p>
                               <p className="text-[10px] text-slate-400 font-bold tracking-tight">{item.desc}</p>
                            </div>
                         </div>
                         <ChevronRight size={18} className="text-slate-300 group-hover:text-islamic-green" />
                      </button>
                    ))}
                 </div>
              </section>

              <div className="flex justify-end gap-6 items-center">
                 <AnimatePresence>
                   {isSaved && (
                     <motion.p 
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0 }}
                       className="text-emerald-600 font-black text-xs flex items-center gap-2 uppercase tracking-widest"
                     >
                       <CheckCircle2 size={16} />
                       Changes Saved Successfully
                     </motion.p>
                   )}
                 </AnimatePresence>
                 <button 
                  onClick={handleSave}
                  className="px-10 py-4 bg-islamic-green text-white font-black rounded-2xl shadow-2xl shadow-islamic-green/30 hover:bg-islamic-green-light transition-all flex items-center gap-3 text-sm uppercase tracking-[0.1em]"
                 >
                    <Save size={20} />
                    Save All Preferences
                 </button>
              </div>
           </div>
        </div>
      </div>
    </AppLayout>
  );
}
