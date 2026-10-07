import React from 'react';
import { Printer, Edit3, CheckCircle, ShieldCheck, Download, Award, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';

interface CertificateViewProps {
  profile: ApprenticeProfile;
  score: number;
  onEditProfile: () => void;
  onBackToModules: () => void;
  onOpenAdminPanel?: () => void;
  isAdmin?: boolean;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  score,
  onEditProfile,
  onBackToModules,
  onOpenAdminPanel,
  isAdmin = false,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const verificationCode = `SENA-IND-${new Date().getFullYear()}-${Math.abs(
    (profile.documentNumber || '12345').split('').reduce((acc, char) => acc * 31 + char.charCodeAt(0), 7)
  )
    .toString(16)
    .toUpperCase()
    .slice(0, 8)}`;

  const issueDate = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-8">
      {/* Top action bar (hidden during print) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-4 shadow-xs print:hidden transition-colors duration-200">
        <button
          onClick={onBackToModules}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Inducción</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onEditProfile}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar Datos de la Ficha</span>
          </button>

          {isAdmin && onOpenAdminPanel && (
            <button
              onClick={onOpenAdminPanel}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700/80 bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-[#39A900] dark:text-[#44C600]" />
              <span>Ver en Panel Administrador</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg bg-[#39A900] dark:bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-[#329400] dark:hover:bg-emerald-500 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar como PDF</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Canvas */}
      <div
        id="induction-certificate"
        className="mx-auto max-w-4xl rounded-2xl border-8 border-double border-[#00324D] dark:border-emerald-600/80 bg-white dark:bg-[#121E2B] p-10 sm:p-14 shadow-xl text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-200"
      >
        {/* Heraldic Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <svg viewBox="0 0 240 280" className="w-[500px] h-[500px] fill-[#00324D] dark:fill-white">
            <path d="M120 10 C180 10 220 25 220 50 C220 160 170 230 120 270 C70 230 20 160 20 50 C20 25 60 10 120 10 Z" />
          </svg>
        </div>

        {/* Certificate Header */}
        <div className="flex flex-col items-center text-center pb-8 border-b-2 border-[#39A900]/40 dark:border-[#44C600]/40">
          <div className="w-16 h-16 mb-3 flex items-center justify-center">
            {/* SENA Logo Monogram */}
            <svg viewBox="0 0 100 100" className="w-14 h-14">
              <circle cx="50" cy="50" r="46" fill="#00324D" />
              <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="bold" fontFamily="sans-serif">
                SENA
              </text>
            </svg>
          </div>

          <span className="text-xs font-extrabold uppercase tracking-widest text-[#00324D] dark:text-emerald-400">
            República de Colombia · Ministerio del Trabajo
          </span>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900 dark:text-white mt-0.5">
            Servicio Nacional de Aprendizaje — SENA
          </h1>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
            Dirección de Formación Profesional Integral
          </span>
        </div>

        {/* Certificate Body */}
        <div className="py-10 text-center space-y-6">
          <div className="inline-block border-b-2 border-slate-900 dark:border-white pb-1">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
              Constancia de Aprobación Institucional
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            El Subdirector y el Comité de Formación Profesional del Centro certifican que:
          </p>

          <div className="py-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#00324D] dark:text-emerald-300 tracking-wide font-serif">
              {profile.name || 'APRENDIZ EN FORMACIÓN'}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
              Identificado(a) con {profile.documentType} No.{' '}
              <span className="font-bold text-slate-900 dark:text-white">{profile.documentNumber || '0000000000'}</span>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Ha participado y aprobado satisfactoriamente el proceso formal de{' '}
            <strong className="text-slate-900 dark:text-white">INDUCCIÓN INSTITUCIONAL SENA</strong>, habiendo demostrado apropiación plena de los
            símbolos patrios e institucionales, la misión y valores fundacionales, el modelo pedagógico de Formación Profesional
            Integral (FPI), el Reglamento del Aprendiz (Acuerdo 0009 de 2024) y las oportunidades del Ecosistema de Bienestar.
          </p>

          {/* Program & Cohort Details Box */}
          <div className="mx-auto max-w-xl rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#152332] p-4 text-left grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Programa de Formación:</span>
              <strong className="text-slate-800 dark:text-slate-100 line-clamp-1">{profile.program}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Nivel / Ficha:</span>
              <strong className="text-slate-800 dark:text-slate-100">{profile.programLevel} · Ficha #{profile.cohortNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Centro de Formación:</span>
              <strong className="text-slate-800 dark:text-slate-100 line-clamp-1">{profile.center}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Regional:</span>
              <strong className="text-slate-800 dark:text-slate-100">{profile.regional}</strong>
            </div>
          </div>

          {/* Grade / Evaluation Statement */}
          <div className="inline-flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-5 py-2.5 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-[#39A900] dark:text-[#44C600]" />
            <div className="text-left">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                Juicio Evaluativo: APROBADO (A)
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-300">
                Puntaje Obtenido: <strong className="font-mono">{score}%</strong> · 100% Requisitos Cumplidos
              </span>
            </div>
          </div>
        </div>

        {/* Certificate Signatures and Security Footer */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-6 items-end text-center">
          <div>
            <div className="h-12 border-b border-slate-400 dark:border-slate-600 flex items-end justify-center pb-1">
              <span className="text-[11px] font-serif italic text-slate-500 dark:text-slate-400">Firma Digital Registrada</span>
            </div>
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-1">Subdirector(a) de Centro</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">SENA — {profile.regional}</p>
          </div>

          {/* Security Stamp Center */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#39A900] dark:border-[#44C600] flex flex-col items-center justify-center p-1 text-[8px] font-bold uppercase text-[#39A900] dark:text-[#44C600]">
              <span>SENA</span>
              <span>OFICIAL</span>
              <span>VALIDADO</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1.5">{verificationCode}</span>
          </div>

          <div>
            <div className="h-12 border-b border-slate-400 dark:border-slate-600 flex items-end justify-center pb-1">
              <span className="text-[11px] font-serif italic text-slate-500 dark:text-slate-400">Firma Coordinación Académica</span>
            </div>
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-1">Coordinador(a) Misional</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Formación Profesional Integral</p>
          </div>
        </div>

        {/* Metadata Footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400">
          <span>Fecha de Expedición: {issueDate}</span>
          <span>Documento expedido a través de la Plataforma de Inducción Digital SENA</span>
          <span>Código Verificable: {verificationCode}</span>
        </div>
      </div>

      {/* Official Induction Registry Confirmation Banner (Print Hidden) */}
      <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/70 dark:bg-[#0c1f18] p-6 shadow-sm print:hidden flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-emerald-950 text-[#39A900] dark:text-[#44C600] flex items-center justify-center shadow-xs shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#39A900] dark:text-[#44C600]">
                Registro Formativo Oficial
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Validado
              </span>
            </div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Inducción Consolidada en el Sistema SENA
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Tu constancia con código <strong className="font-mono">{verificationCode}</strong> ha sido registrada formalmente para la Ficha #{profile.cohortNumber}. Tu instructor cuenta con acceso a tu reporte académico.
            </p>
          </div>
        </div>

        {isAdmin && onOpenAdminPanel && (
          <button
            onClick={onOpenAdminPanel}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00324D] dark:bg-emerald-700 hover:bg-[#002235] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all shrink-0 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#39A900]" />
            <span>Abrir Panel de Control</span>
          </button>
        )}
      </div>
    </div>
  );
};
