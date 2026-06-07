'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const translations = {
  en: {
    dashboard: 'Dashboard',
    admission: 'Admission',
    students: 'Students',
    classes: 'Classes',
    attendance: 'Attendance',
    fees: 'Fees',
    exams: 'Exams',
    reports: 'Reports',
    settings: 'Settings',
    logout: 'Logout',
    institutionName: 'Jamia Naqshbandia Baravia Razvia',
    admin: 'Admin Panel',
    teacher: 'Teacher',
    accountant: 'Accountant',
    search: 'Search',
    totalStudents: 'Total Students',
    active: 'Active',
    staff: 'Staff',
    todayFee: 'Today\'s Fee',
    pendingFees: 'Pending Fees',
    recentAdmissions: 'Recent Admissions',
    newStudent: 'New Student',
    export: 'Export'
  },
  ur: {
    dashboard: 'ڈیش بورڈ',
    admission: 'داخلہ',
    students: 'طلباء',
    classes: 'درجہ جات',
    attendance: 'حاضری',
    fees: 'فیس',
    exams: 'امتحانات',
    reports: 'رپورٹس',
    settings: 'ترتیبات',
    logout: 'لاگ آؤٹ',
    institutionName: 'جامعہ نقشبندیہ بارویہ رضویہ',
    admin: 'ایڈمن پینل',
    teacher: 'استاد',
    accountant: 'اکاؤنٹنٹ',
    search: 'تلاش',
    totalStudents: 'کل طلباء',
    active: 'فعال',
    staff: 'عملہ',
    todayFee: 'آج کی فیس',
    pendingFees: 'بقایاجات',
    recentAdmissions: 'تازہ ترین داخلے',
    newStudent: 'نیا طالب علم',
    export: 'ایکسپورٹ'
  }
};

type Language = 'en' | 'ur';

interface I18nContextType {
  t: (key: string) => string;
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('lang') as Language;
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('lang', lang);
      document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang, isMounted]);

  const t = (key: string) => {
    return (translations[lang] as any)[key] || key;
  };

  const dir = lang === 'ur' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ t, lang, setLang, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
