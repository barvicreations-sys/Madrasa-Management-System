'use client';

import { useI18n } from '@/lib/i18n';
import { User, ShieldCheck } from 'lucide-react';

interface StudentIDCardProps {
  student: {
    name: string;
    urduName?: string;
    regNo: string;
    classId: string;
    fatherName: string;
    dob?: string;
    photoUrl?: string;
  };
}

export default function StudentIDCard({ student }: StudentIDCardProps) {
  const { t } = useI18n();

  return (
    <div className="id-card-container">
      <div className="id-card w-[3.375in] h-[2.125in] bg-white border border-slate-200 shadow-lg rounded-xl overflow-hidden flex flex-col relative printable-card">
        {/* Top Header Grid/Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Header Section */}
        <div className="bg-islamic-green text-white p-2 flex items-center justify-between border-b-2 border-islamic-gold">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <ShieldCheck size={18} className="text-islamic-gold" />
            </div>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-tight leading-tight">Jamia Naqshbandia</h2>
              <p className="urdu-font text-[9px] leading-tight opacity-90">جامعہ نقشبندیہ بارویہ رضویہ</p>
            </div>
          </div>
          <div className="text-right">
             <span className="text-[7px] font-black uppercase tracking-widest opacity-70">Student ID Card</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-3 flex gap-4">
          {/* Photo Side */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-20 h-24 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center relative shadow-inner">
              {student.photoUrl ? (
                <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
              ) : (
                <User size={40} className="text-slate-200" />
              )}
              {/* Overlay ID Badge */}
              <div className="absolute bottom-0 inset-x-0 bg-islamic-green/90 text-white text-[6px] font-black py-0.5 text-center uppercase tracking-tighter">
                Session 2024-25
              </div>
            </div>
            <div className="w-full text-center">
               <p className="text-[7px] font-black text-islamic-green bg-emerald-50 border border-emerald-100 rounded px-1 py-0.5 uppercase tracking-widest">
                 {student.regNo}
               </p>
            </div>
          </div>

          {/* Details Side */}
          <div className="flex-1 space-y-1.5">
            <div className="space-y-0.5">
              <h3 className="text-xs font-black text-slate-800 leading-none">{student.name}</h3>
              <p className="urdu-font text-sm text-islamic-green leading-none py-1 border-b border-dashed border-slate-100">{student.urduName}</p>
            </div>

            <div className="grid grid-cols-1 gap-1">
              <div className="flex justify-between items-end border-b border-slate-50 pb-0.5">
                <span className="text-[6px] font-bold text-slate-400 uppercase tracking-tighter">Father Name:</span>
                <span className="text-[8px] font-black text-slate-700 tracking-tight">{student.fatherName}</span>
              </div>
              <div className="flex justify-between items-end border-b border-slate-50 pb-0.5">
                <span className="text-[6px] font-bold text-slate-400 uppercase tracking-tighter text-right">درجہ:</span>
                <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">{student.classId}</span>
              </div>
              <div className="flex justify-between items-end border-b border-slate-50 pb-0.5">
                <span className="text-[6px] font-bold text-slate-400 uppercase tracking-tighter">DOB:</span>
                <span className="text-[8px] font-black text-slate-700 tracking-tight">{student.dob || '--/--/----'}</span>
              </div>
            </div>

            {/* Signature Area */}
            <div className="pt-2 flex justify-end">
              <div className="text-right">
                <div className="w-16 border-b border-slate-400 mb-0.5"></div>
                <p className="text-[5px] font-black text-slate-400 uppercase tracking-widest">Principal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="h-1 bg-islamic-gold"></div>
        <div className="bg-slate-50 p-1 px-3 flex justify-between items-center">
           <span className="text-[5px] font-bold text-slate-400">Jamia Naqshbandia - Education with Ethics</span>
           <span className="text-[5px] font-bold text-slate-400 italic">Valid until: June 2025</span>
        </div>
      </div>

      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-card, .printable-card * {
            visibility: visible;
          }
          .printable-card {
            position: absolute;
            left: 0;
            top: 0;
            margin: 0;
            padding: 0;
            border: none;
            box-shadow: none;
          }
          @page {
            size: 3.375in 2.125in;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
