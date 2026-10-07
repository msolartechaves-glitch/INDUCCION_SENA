import React, { useState } from 'react';
import {
  Scale,
  Check,
  ShieldAlert,
  FileText,
  CheckCircle2,
  XCircle,
  ArrowRight,
  BookOpen,
  AlertTriangle,
  ChevronRight,
  Users,
  Compass,
  Sparkles,
  MapPin,
  MessageCircle,
  Leaf,
  Heart,
  Calendar,
  Clock,
  RotateCcw,
  ShieldCheck,
  FileCheck2,
  Info,
} from 'lucide-react';
import { ACUERDO_0009_2024, SIMULATION_CASES } from '../../data/senaData';
import { sound } from '../../utils/audio';

interface ModuleRegulationsProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
  solvedCases: string[];
  onSolveCase: (caseId: string) => void;
}

export const ModuleRegulations: React.FC<ModuleRegulationsProps> = ({
  onComplete,
  isCompleted,
  onNextModule,
  solvedCases,
  onSolveCase,
}) => {
  const [selectedPrincipleIndex, setSelectedPrincipleIndex] = useState<number>(0);
  const [selectedNoveltyId, setSelectedNoveltyId] = useState<string>('aplazamiento');
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [revealedResult, setRevealedResult] = useState<boolean>(false);

  const activeCase = SIMULATION_CASES[selectedCaseIndex] || SIMULATION_CASES[0];
  const selectedOption = activeCase.options.find((o) => o.id === selectedOptionId);
  const activeNovelty =
    ACUERDO_0009_2024.novedades_academicas.find((n) => n.id === selectedNoveltyId) ||
    ACUERDO_0009_2024.novedades_academicas[0];
  const activePrinciple =
    ACUERDO_0009_2024.principios_orientadores[selectedPrincipleIndex] ||
    ACUERDO_0009_2024.principios_orientadores[0];

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    setRevealedResult(true);
    const chosen = activeCase.options.find((o) => o.id === optId);
    if (chosen?.isCorrect) {
      sound.playSuccess();
      onSolveCase(activeCase.id);
    } else {
      sound.playWarning();
    }
  };

  const handleNextCase = () => {
    if (selectedCaseIndex < SIMULATION_CASES.length - 1) {
      setSelectedCaseIndex(selectedCaseIndex + 1);
      setSelectedOptionId(null);
      setRevealedResult(false);
    }
  };

  const handlePrevCase = () => {
    if (selectedCaseIndex > 0) {
      setSelectedCaseIndex(selectedCaseIndex - 1);
      setSelectedOptionId(null);
      setRevealedResult(false);
    }
  };

  const handleFinish = () => {
    sound.playSuccess();
    onComplete();
  };

  const getPrincipleIcon = (name: string) => {
    switch (name) {
      case 'Autonomía':
        return Compass;
      case 'Dignidad':
        return ShieldCheck;
      case 'Inclusión':
        return Users;
      case 'Enfoque diferencial':
        return Sparkles;
      case 'Enfoque territorial':
        return MapPin;
      case 'Participación':
        return MessageCircle;
      case 'Desarrollo sostenible':
        return Leaf;
      case 'Solidaridad':
        return Heart;
      default:
        return Scale;
    }
  };

  return (
    <div className="space-y-12">
      {/* Intro Header - Official Agreement Notice */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00324D] via-[#02283e] to-[#041a29] p-8 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-bold text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Normativa Vigente Oficial</span>
            <span aria-hidden="true">·</span>
            <span>{ACUERDO_0009_2024.documento.organo_emisor}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Reglamento del Aprendiz SENA
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-sm text-emerald-300 font-semibold">
            <span className="bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
              {ACUERDO_0009_2024.documento.tipo_norma} {ACUERDO_0009_2024.documento.numero}
            </span>
            <span className="text-slate-300">
              Emitido por el {ACUERDO_0009_2024.documento.organo_emisor}
            </span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-300 max-w-2xl">
            {ACUERDO_0009_2024.documento.objeto}. Esta norma unifica las disposiciones sobre
            derechos, deberes, novedades académicas, debido proceso y convivencia formativa para
            todos los aprendices en Colombia.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-300">
            <span className="bg-red-950/60 border border-red-500/40 text-red-200 px-2.5 py-1 rounded-md">
              ✕ Deroga Acuerdo 07 de 2012
            </span>
            <span className="bg-red-950/60 border border-red-500/40 text-red-200 px-2.5 py-1 rounded-md">
              ✕ Deroga Acuerdo 02 de 2014
            </span>
            <span className="bg-red-950/60 border border-red-500/40 text-red-200 px-2.5 py-1 rounded-md">
              ✕ Deroga Acuerdos 06 de 2023 y 02 de 2024
            </span>
          </div>
        </div>
      </section>

      {/* Capítulo I: Definiciones Fundamentales */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#44C600] mb-1">
            <span>Capítulo I</span>
            <span aria-hidden="true">·</span>
            <span>Marco Conceptual</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Definiciones Fundamentales del Proceso Formativo
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Conceptos base establecidos por el Consejo Directivo Nacional para comprender el rol
            institucional de cada actor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                Formación Profesional Integral
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ACUERDO_0009_2024.capitulo_I_definiciones.formacion_profesional_integral}
              </p>
            </div>
            <span className="mt-3 text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
              Teórico-Práctico
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#44C600] flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                Comunidad Educativa
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ACUERDO_0009_2024.capitulo_I_definiciones.comunidad_educativa}
              </p>
            </div>
            <span className="mt-3 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              Red Tripartita
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                Aspirante
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ACUERDO_0009_2024.capitulo_I_definiciones.aspirante}
              </p>
            </div>
            <span className="mt-3 text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              Fase Previa
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                Aprendiz SENA
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ACUERDO_0009_2024.capitulo_I_definiciones.aprendiz}
              </p>
            </div>
            <span className="mt-3 text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider block">
              Sujeto de Derechos
            </span>
          </div>
        </div>
      </section>

      {/* Los 8 Principios Orientadores del Acuerdo 0009 de 2024 */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#44C600] mb-1">
            <span>Principios Rectores</span>
            <span aria-hidden="true">·</span>
            <span>Ética Institucional</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Los 8 Principios Orientadores del Aprendiz
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Valores axiológicos que guían todas las decisiones formativas, disciplinarias y de
            convivencia en el SENA.
          </p>
        </div>

        {/* Interactive Principle Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {ACUERDO_0009_2024.principios_orientadores.map((principle, idx) => {
            const isSelected = selectedPrincipleIndex === idx;
            const Icon = getPrincipleIcon(principle.nombre);
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedPrincipleIndex(idx);
                  sound.playTone(460 + idx * 30, 0.08);
                }}
                className={`group p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'border-[#39A900] dark:border-[#44C600] bg-emerald-50/70 dark:bg-emerald-950/60 shadow-xs ring-2 ring-[#39A900]/25'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isSelected
                      ? 'bg-[#39A900] text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {principle.nombre}
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                    Principio {idx + 1}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Principle Deep View */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#39A900] dark:text-[#44C600]">
              Principio #{selectedPrincipleIndex + 1} del Acuerdo 0009 de 2024
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {activePrinciple.nombre}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {activePrinciple.descripcion}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#39A900]/15 dark:bg-[#39A900]/30 text-[#39A900] dark:text-[#44C600] flex items-center justify-center shrink-0">
            {React.createElement(getPrincipleIcon(activePrinciple.nombre), {
              className: 'w-6 h-6',
            })}
          </div>
        </div>
      </section>

      {/* Derechos y Deberes Principales */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex items-center gap-2.5 mb-5 text-emerald-700 dark:text-emerald-400">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#39A900] dark:text-[#44C600]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Acuerdo 0009 de 2024
              </span>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">
                Derechos Principales del Aprendiz
              </h3>
            </div>
          </div>
          <div className="space-y-3">
            {ACUERDO_0009_2024.derechos_y_deberes.derechos_principales.map((derecho, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0E1721] text-xs"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-[#39A900] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white">{derecho.titulo}</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  {derecho.detalle}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex items-center gap-2.5 mb-5 text-blue-600 dark:text-blue-400">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Acuerdo 0009 de 2024
              </span>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">
                Deberes Principales del Aprendiz
              </h3>
            </div>
          </div>
          <div className="space-y-3">
            {ACUERDO_0009_2024.derechos_y_deberes.deberes_principales.map((deber, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0E1721] text-xs"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white">{deber.titulo}</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  {deber.detalle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Novedades Académicas del Acuerdo 0009 de 2024 */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#44C600] mb-1">
            <span>Trámites de Formación</span>
            <span aria-hidden="true">·</span>
            <span>Gestión Académica</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Novedades Académicas Oficiales
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Mecanismos formales regulados para gestionar situaciones imprevistas, cambios de sede o
            suspensiones justificadas sin perder tu calidad de aprendiz.
          </p>
        </div>

        {/* 4 Thematic Pill Capsules from inspiration image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {ACUERDO_0009_2024.novedades_academicas.map((nov) => {
            const isSelected = selectedNoveltyId === nov.id;
            const colorClass =
              nov.id === 'traslado'
                ? 'bg-blue-600'
                : nov.id === 'aplazamiento'
                ? 'bg-amber-500'
                : nov.id === 'reintegro'
                ? 'bg-[#39A900]'
                : 'bg-purple-600';

            return (
              <button
                key={nov.id}
                onClick={() => {
                  setSelectedNoveltyId(nov.id);
                  sound.playTone(520, 0.08);
                }}
                className={`group relative overflow-hidden rounded-2xl border transition-all text-left flex items-center justify-between p-2 pr-3.5 shadow-sm hover:shadow-md ${
                  isSelected
                    ? 'border-2 border-[#39A900] dark:border-[#44C600] bg-white dark:bg-[#152332] ring-2 ring-[#39A900]/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white ${colorClass} shadow-xs transition-transform group-hover:scale-105`}
                  >
                    <div className="w-8 h-8 rounded-full border border-white/35 flex items-center justify-center bg-white/10 text-xs font-bold">
                      {nov.id === 'traslado' ? (
                        <MapPin className="w-4 h-4" />
                      ) : nov.id === 'aplazamiento' ? (
                        <Calendar className="w-4 h-4" />
                      ) : nov.id === 'reintegro' ? (
                        <RotateCcw className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 pr-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block leading-tight">
                      {nov.tipo}
                    </span>
                    <h4 className="text-xs font-black uppercase tracking-tight text-slate-900 dark:text-white truncate">
                      {nov.nombre}
                    </h4>
                  </div>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    isSelected
                      ? colorClass + ' text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-white group-hover:' +
                        colorClass
                  }`}
                >
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Novelty Details Deck */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2.5 py-0.5 rounded">
              {activeNovelty.tipo}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Acuerdo 0009 de 2024
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            {activeNovelty.nombre}
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeNovelty.definicion}
          </p>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
            <strong className="text-slate-900 dark:text-white block mb-1">
              Requisitos y Causales Formales:
            </strong>
            <p className="text-slate-600 dark:text-slate-400">{activeNovelty.requisito}</p>
          </div>
        </div>
      </section>

      {/* Proceso de Formación: Etapas Lectiva y Productiva */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#44C600] mb-1">
            <span>Ruta del Aprendiz</span>
            <span aria-hidden="true">·</span>
            <span>Estructura Curricular</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Proceso de Formación (Acuerdo 0009 de 2024)
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Dos fases complementarias e indisolubles donde la teoría pedagógica se fusiona con la práctica real en el mundo productivo y social.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-[#0c1825] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Fase 1 · Ambientes SENA</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                Etapa Lectiva
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {ACUERDO_0009_2024.proceso_de_formacion.etapa_lectiva}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-200 dark:border-blue-900/40 text-[11px] font-semibold text-blue-700 dark:text-blue-400">
              Desarrollo de competencias técnicas, humanas y digitales
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-[#0c1f18] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fase 2 · Contexto Productivo Real</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                Etapa Productiva
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {ACUERDO_0009_2024.proceso_de_formacion.etapa_productiva}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200 dark:border-emerald-900/40 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              Contrato de aprendizaje, vínculo laboral, proyecto productivo o monitoría
            </div>
          </div>
        </div>
      </section>

      {/* Régimen Disciplinario y Procedimiento Sancionatorio */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#44C600] mb-1">
            <span>Justicia Formativa</span>
            <span aria-hidden="true">·</span>
            <span>Régimen Disciplinario</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Medidas Formativas y Principios del Procedimiento
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            El Acuerdo 0009 de 2024 prioriza la pedagogía restaurativa y el debido proceso antes que
            cualquier medida sancionatoria.
          </p>
        </div>

        {/* Medidas Formativas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {ACUERDO_0009_2024.regimen_disciplinario_y_sanciones.medidas_formativas.map((med, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-[#39A900] text-white flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">{med.nombre}</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {med.detalle}
              </p>
            </div>
          ))}
        </div>

        {/* 6 Principios del Procedimiento */}
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
            Principios del Debido Proceso Disciplinario (Acuerdo 0009 de 2024)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ACUERDO_0009_2024.regimen_disciplinario_y_sanciones.principios_del_procedimiento.map(
              (princ, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#152332]"
                >
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                    ✓ {princ.nombre}
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {princ.descripcion}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Simulador Interactivo de Casos del Comité */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#44C600] mb-1">
              <span>Simulador de Casos Reales</span>
              <span aria-hidden="true">·</span>
              <span>Acuerdo 0009 de 2024</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Simulador del Comité de Evaluación y Seguimiento
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>
              Caso {selectedCaseIndex + 1} de {SIMULATION_CASES.length}
            </span>
            <span aria-hidden="true">·</span>
            <span>{solvedCases.includes(activeCase.id) ? '✓ Resuelto' : 'Pendiente'}</span>
          </div>
        </div>

        {/* Case Container */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721] p-6 sm:p-7">
          <div className="mb-4">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2.5 py-0.5 rounded">
              {activeCase.title}
            </span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="bg-white dark:bg-[#152332] p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-white block mb-1">
                Contexto del aprendiz:
              </strong>
              {activeCase.context}
            </div>

            <div className="bg-white dark:bg-[#152332] p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-white block mb-1">
                Situación acontecida:
              </strong>
              {activeCase.situation}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              {activeCase.question}
            </h4>
          </div>

          {/* Options List Styled as Tactile Capsule Buttons */}
          <div className="space-y-2.5 mb-6">
            {activeCase.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl text-left border transition-all text-xs sm:text-sm leading-relaxed ${
                    isSelected
                      ? opt.isCorrect
                        ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-medium'
                        : 'border-red-400 bg-red-50 dark:bg-red-950/60 text-red-950 dark:text-red-100'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#152332] hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-[#39A900] text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {opt.id === 'opt1' ? 'A' : opt.id === 'opt2' ? 'B' : 'C'}
                    </span>
                    <span className="flex-1">{opt.action}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback section when revealed */}
          {revealedResult && selectedOption && (
            <div
              className={`p-5 rounded-2xl border mb-6 ${
                selectedOption.isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-200'
                  : 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900/60 text-red-950 dark:text-red-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                {selectedOption.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#39A900]" />
                    <span>Respuesta Correcta según el Acuerdo 0009 de 2024</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span>Conducta Inadecuada / No Conforme a la Norma</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mb-2">{selectedOption.feedback}</p>
              <span className="text-[11px] font-semibold opacity-85 block">
                Fundamento normativo: {selectedOption.regulationArticle}
              </span>
            </div>
          )}

          {/* Case Navigation Buttons */}
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
            <button
              onClick={handlePrevCase}
              disabled={selectedCaseIndex === 0}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-40 disabled:cursor-not-allowed hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              ← Caso Anterior
            </button>

            <button
              onClick={handleNextCase}
              disabled={selectedCaseIndex === SIMULATION_CASES.length - 1}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-40 disabled:cursor-not-allowed hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Siguiente Caso →
            </button>
          </div>
        </div>
      </section>

      {/* Module Completion Footer Styled as Tactile Capsule Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 shadow-sm transition-colors">
        <div>
          <span className="text-[11px] font-bold text-[#39A900] dark:text-[#44C600] uppercase tracking-wider block">
            Acuerdo 0009 de 2024 Aprobado
          </span>
          <h4 className="font-black text-slate-900 dark:text-white text-base">
            {isCompleted
              ? '¡Módulo 3 Completado!'
              : 'Has explorado el Nuevo Reglamento del Aprendiz'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            Conoces tus derechos, deberes, novedades académicas (traslado y aplazamiento) y el
            debido proceso institucional.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isCompleted ? (
            <button
              onClick={handleFinish}
              className="group overflow-hidden rounded-full border border-emerald-500 bg-white dark:bg-[#121E2B] p-1.5 pr-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-[#39A900] flex items-center justify-center text-white shrink-0 shadow-xs">
                <Check className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block leading-tight">
                  Aprobar Módulo
                </span>
                <span className="text-xs font-black uppercase text-slate-900 dark:text-white">
                  Marcar como Completado
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0 ml-1">
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ) : (
            <button
              onClick={onNextModule}
              className="group overflow-hidden rounded-full border border-purple-500 bg-white dark:bg-[#121E2B] p-1.5 pr-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block leading-tight">
                  Siguiente Paso
                </span>
                <span className="text-xs font-black uppercase text-slate-900 dark:text-white">
                  Continuar a Ecosistema & Bienestar
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 ml-1">
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
