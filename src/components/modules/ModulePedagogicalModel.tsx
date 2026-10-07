import React, { useState } from 'react';
import { Users, Monitor, Compass, Sparkles, Check, ArrowRight, Briefcase, FileCheck, Layers, ChevronRight } from 'lucide-react';
import { KNOWLEDGE_SOURCES, PRODUCTIVE_STAGES } from '../../data/senaData';
import { sound } from '../../utils/audio';

interface ModulePedagogicalModelProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModulePedagogicalModel: React.FC<ModulePedagogicalModelProps> = ({
  onComplete,
  isCompleted,
  onNextModule,
}) => {
  const [selectedSource, setSelectedSource] = useState<string>('instructor');
  const [selectedStageTab, setSelectedStageTab] = useState<string>('contrato');

  const activeSource = KNOWLEDGE_SOURCES.find((k) => k.id === selectedSource) || KNOWLEDGE_SOURCES[0];
  const activeProductiveStage = PRODUCTIVE_STAGES.find((s) => s.id === selectedStageTab) || PRODUCTIVE_STAGES[0];

  const handleFinish = () => {
    sound.playSuccess();
    onComplete();
  };

  return (
    <div className="space-y-12">
      {/* Intro Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00324D] via-[#02283e] to-[#051a28] p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <span>Módulo 2</span>
            <span aria-hidden="true">·</span>
            <span>Enfoque Metodológico</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Formación Profesional Integral (FPI)
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            El modelo pedagógico del SENA no se basa en la memorización pasiva, sino en el desarrollo de
            <strong className="text-white"> competencias laborales integrales</strong>: la articulación armónica del
            <em className="text-emerald-300 not-italic font-semibold"> Saber</em> (conocimiento técnico),
            <em className="text-emerald-300 not-italic font-semibold"> Saber Hacer</em> (práctica e innovación) y el
            <em className="text-emerald-300 not-italic font-semibold"> Saber Ser y Convivir</em> (valores ciudadanos, ética y trabajo en equipo).
          </p>
        </div>
      </section>

      {/* Las 4 Fuentes del Conocimiento */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors duration-200">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#44C600] mb-1">
            <span>Ecosistema de Aprendizaje</span>
            <span aria-hidden="true">·</span>
            <span>Matriz Dinámica</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Las Cuatro Fuentes del Conocimiento en el SENA
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            En el SENA el instructor no es la única fuente de saber. El aprendizaje se nutre de cuatro vértices esenciales que interactúan de manera constante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Quadrant diagram */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3.5 p-4 bg-slate-50 dark:bg-[#0E1721] rounded-2xl border border-slate-200 dark:border-slate-800">
            {KNOWLEDGE_SOURCES.map((source) => {
              const isSelected = selectedSource === source.id;
              return (
                <button
                  key={source.id}
                  onClick={() => {
                    setSelectedSource(source.id);
                    sound.playTone(480, 0.08);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all relative ${
                    isSelected
                      ? 'border-[#39A900] dark:border-[#44C600] bg-white dark:bg-[#182737] shadow-md ring-2 ring-[#39A900]/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#44C600]' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {source.id === 'instructor' && <Users className="w-4 h-4" />}
                      {source.id === 'entorno' && <Compass className="w-4 h-4" />}
                      {source.id === 'tic' && <Monitor className="w-4 h-4" />}
                      {source.id === 'colaborativo' && <Sparkles className="w-4 h-4" />}
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#39A900] dark:bg-[#44C600]" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{source.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{source.role}</p>
                </button>
              );
            })}
          </div>

          {/* Deep inspection card */}
          <div className="lg:col-span-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#152332] shadow-xs">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide block mb-1">
              {activeSource.role}
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{activeSource.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {activeSource.description}
            </p>

            <div className="rounded-xl bg-slate-50 dark:bg-[#0E1721] p-4 border border-slate-200 dark:border-slate-800">
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#39A900] dark:text-[#44C600]" />
                ¿Cómo lo vives tú como aprendiz?
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                {activeSource.id === 'instructor' &&
                  'Pregunta, reflexiona y aprovecha a tu instructor para resolver dudas técnicas de fondo y recibir planes de mejora constructivos.'}
                {activeSource.id === 'entorno' &&
                  'Interactúa con las máquinas, simuladores y problemáticas reales del sector productivo para afianzar tus destrezas.'}
                {activeSource.id === 'tic' &&
                  'Ingresa a la plataforma digital Zajuna LMS, consulta bases de datos bibliográficas internacionales y haz uso de software profesional.'}
                {activeSource.id === 'colaborativo' &&
                  'Aprende de las experiencias de tus compañeros de ficha, comparte tu código o diseño y resuelve proyectos en equipo.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Las Dos Etapas de la Formación: Lectiva y Productiva */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-7 shadow-xs transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">1. Etapa Lectiva</h3>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-md">
              Aulas & Talleres
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Es el periodo donde desarrollas el núcleo técnico y teórico-práctico de las competencias mediante proyectos formativos reales en los ambientes y laboratorios del centro de formación o en modalidad virtual.
          </p>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#39A900] dark:text-[#44C600]" />
              <span>Desarrollo de Resultados de Aprendizaje (RAP).</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#39A900] dark:text-[#44C600]" />
              <span>Evaluación formativa continua de evidencias.</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#39A900] dark:text-[#44C600]" />
              <span>Calificación por juicios: Aprobado (A) o No Aprobado (D).</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-7 shadow-xs transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">2. Etapa Productiva</h3>
            </div>
            <span className="text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 px-2.5 py-1 rounded-md">
              Entorno Real de Trabajo
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Periodo obligatorio de 6 meses (para técnicos y tecnólogos) donde aplicas las competencias adquiridas en el sector laboral real, afianzando tu idoneidad profesional y madurez ocupacional.
          </p>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Seguimiento con bitácoras periódicas y visitas de instructor.</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Diversas alternativas de cumplimiento legal.</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Requisito indispensable para la certificación oficial.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Explorador de Modalidades de Etapa Productiva */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors duration-200">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#44C600] mb-1">
            <span>Alternativas Legales</span>
            <span aria-hidden="true">·</span>
            <span>Planeación de tu Futuro</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Modalidades para Desarrollar tu Etapa Productiva
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Explora las diferentes vías reconocidas por el SENA para culminar con éxito tu proceso formativo.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
          {PRODUCTIVE_STAGES.map((stage) => (
            <button
              key={stage.id}
              onClick={() => {
                setSelectedStageTab(stage.id);
                sound.playTone(520, 0.06);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedStageTab === stage.id
                  ? 'bg-[#00324D] dark:bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {stage.name}
            </button>
          ))}
        </div>

        {/* Selected Stage Detail */}
        <div className="rounded-xl bg-slate-50 dark:bg-[#0E1721] p-6 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/70 px-2.5 py-0.5 rounded">
              {activeProductiveStage.tag}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Requisito Obligatorio</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{activeProductiveStage.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            {activeProductiveStage.description}
          </p>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#39A900] dark:text-[#44C600]" />
              Condiciones y Requisitos de Gestión:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
              {activeProductiveStage.requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-2 bg-white dark:bg-[#152332] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <Check className="w-3.5 h-3.5 text-[#39A900] dark:text-[#44C600] shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sistema de Juicios de Evaluación: Aprobado vs Por Mejorar */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors duration-200">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          ¿Cómo se Evalúa en el SENA? El Juicio Evaluativo
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
          A diferencia de la educación tradicional con escalas numéricas de 1 a 5, el SENA evalúa si el aprendiz es competente en la vida real a través de juicios cualitativos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/30">
            <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-lg mb-1">
              <span className="w-7 h-7 rounded-full bg-[#39A900] dark:bg-[#44C600] text-white flex items-center justify-center text-sm font-extrabold">
                A
              </span>
              <span>Aprobado</span>
            </div>
            <p className="text-xs text-emerald-800 dark:text-emerald-400 leading-relaxed">
              El aprendiz demostró con evidencias idóneas (de conocimiento, desempeño y producto) el alcance total del Resultado de Aprendizaje propuesto.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/30">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 text-lg mb-1">
              <span className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-extrabold">
                D
              </span>
              <span>No Aprobado (Deficiente / Por Mejorar)</span>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
              El aprendiz aún no cumple con los criterios de calidad o no presentó la evidencia. Se activa de inmediato un <strong>Plan de Mejoramiento</strong> pedagógico concertado.
            </p>
          </div>
        </div>
      </section>

      {/* Module Completion Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/30 p-6 transition-colors duration-200">
        <div>
          <h4 className="font-bold text-emerald-950 dark:text-emerald-200 text-base">
            {isCompleted ? '¡Módulo 2 Completado!' : 'Has revisado el Modelo FPI y la Etapa Productiva'}
          </h4>
          <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5">
            Comprendes las fuentes de conocimiento, las dos etapas y el sistema de evaluación por competencias.
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
              className="group overflow-hidden rounded-full border border-amber-500 bg-white dark:bg-[#121E2B] p-1.5 pr-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block leading-tight">
                  Siguiente Paso
                </span>
                <span className="text-xs font-black uppercase text-slate-900 dark:text-white">
                  Continuar a Reglamento del Aprendiz
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 ml-1">
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
