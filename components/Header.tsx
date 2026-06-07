'use client';

import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth-context';
import { User, LogOut, Bell, Search, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const { user, role, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-20 bg-islamic-green border-b-4 border-islamic-gold flex items-center justify-between px-8 text-white sticky top-0 z-30 shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-islamic-gold shadow-sm">
          <span className="text-islamic-green font-bold text-2xl urdu-font">ن</span>
        </div>
        <div className="leading-tight hidden sm:block">
          <h1 className="urdu-font text-xl font-bold tracking-wide">{t('institutionName')}</h1>
          <p className="text-[10px] font-medium opacity-80 uppercase tracking-widest">Jamia Naqshbandia Baravia Razvia • Faisalabad</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <div className="flex bg-black/20 rounded-lg p-1">
          <button 
            onClick={() => setLang('en')}
            className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${lang === 'en' ? 'bg-white text-islamic-green' : 'opacity-60 text-white'}`}
          >
            ENGLISH
          </button>
          <button 
            onClick={() => setLang('ur')}
            className={`px-3 py-1 text-[10px] font-bold rounded transition-all urdu-font ${lang === 'ur' ? 'bg-white text-islamic-green font-bold' : 'opacity-60 text-white'}`}
          >
            اردو
          </button>
        </div>

        <div className="h-8 w-px bg-white/20 hidden md:block"></div>

        <div className="flex items-center gap-3 text-right">
          <div className="hidden lg:block leading-tight">
            <p className="text-sm font-bold">{t('admin')}</p>
            <p className="text-[10px] opacity-70">Logged in as {user?.displayName || 'Admin'}</p>
          </div>
          <div 
            className="w-10 h-10 rounded-full bg-islamic-green-light border-2 border-white/30 flex items-center justify-center font-bold cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setShowProfile(!showProfile)}
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="w-full h-full rounded-full" />
            ) : (
              user?.displayName?.substring(0, 2).toUpperCase() || 'AD'
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
