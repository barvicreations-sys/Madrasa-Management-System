'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ur';

interface I18nContextType {
  t: (key: string) => string;
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    students: 'Students',
    admission: 'Admission',
    attendance: 'Attendance',
    fees: 'Fees & Finance',
    exams: 'Examinations',
    reports: 'Reports',
    settings: 'Settings',
    logout: 'Logout',
    welcomeBack: 'Welcome Back',
    totalStudents: 'Total Students',
    activeClasses: 'Active Classes',
    pendingFees: 'Pending Fees',
    recentAdmissions: 'Recent Admissions',
    newStudent: 'New Student',
    export: 'Export',
    idCard: 'ID Card',
    print: 'Print',
    fatherName: "Father's Name",
    regNo: 'Reg. No',
    studentClass: 'Class',
    dob: 'Date of Birth',
    search: 'Search',
    filter: 'Filter',
    allClasses: 'All Classes',
    photo: 'Photo',
    name: 'Name',
    status: 'Status',
    actions: 'Actions',
    active: 'Active',
    inactive: 'Inactive'
  },
  ur: {
    dashboard: 'ڈیش بورڈ',
    students: 'طلباء',
    admission: 'داخلہ',
    attendance: 'حاضری',
    fees: 'فیس اور مالیات',
    exams: 'امتحانات',
    reports: 'رپورٹس',
    settings: 'ترتیبات',
    logout: 'لاگ آؤٹ',
    welcomeBack: 'خوش آمدید',
    totalStudents: 'کل طلباء',
    activeClasses: 'فعال کلاسز',
    pendingFees: 'بقایاجات',
    recentAdmissions: 'تازہ ترین داخلے',
    newStudent: 'نیا طالب علم',
    export: 'ایکسپورٹ',
    idCard: 'شناختی کارڈ',
    print: 'پرنٹ',
    fatherName: 'والد کا نام',
    regNo: 'رجسٹریشن نمبر',
    studentClass: 'درجہ',
    dob: 'تاریخ پیدائش',
    search: 'تلاش کریں',
    filter: 'فلٹر',
    allClasses: 'تمام کلاسز',
    photo: 'تصویر',
    name: 'نام',
    status: 'حالت',
    actions: 'اقدامات',
    active: 'فعال',
    inactive: 'غیر فعال'
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations['en']] || key;
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
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
