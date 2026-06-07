'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { Bell, Search, Globe, User } from 'lucide-react';

export default function Header() {
  const { t, lang, setLang } = useI18n();

  return (
    <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute inset-y-0 start-4 my-auto text-slate-400 group-focus-within:text-islamic-green transition-colors" size={18} />
          <input 
            type="text" 
            placeholder={t('search')} 
            className="w-full h-12 bg-slate-50 border-none rounded-2xl ps-12 pe-4 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-islamic-green/20 focus:bg-white transition-all placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ms-8">
        <button 
          onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-islamic-green/5 rounded-xl transition-colors group"
        >
          <Globe size={18} className="text-slate-400 group-hover:text-islamic-green" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            {lang === 'en' ? 'English' : 'اردو'}
          </span>
        </button>

        <button className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-xl text-slate-400 hover:text-islamic-green hover:bg-islamic-green/5 transition-all relative">
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-islamic-gold rounded-full border-2 border-white"></span>
        </button>

        <div className="w-px h-8 bg-slate-200 mx-2"></div>

        <button className="flex items-center gap-4 group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-800 leading-none">Admin User</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Super Admin</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-islamic-green/10 flex items-center justify-center text-islamic-green group-hover:bg-islamic-green group-hover:text-white transition-all shadow-lg shadow-islamic-green/5">
            <User size={24} />
          </div>
        </button>
      </div>
    </header>
  );
}
