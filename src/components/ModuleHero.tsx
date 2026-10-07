import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronRight,
  User,
  Shield,
  Compass,
  Scale,
  Sparkles,
  Phone,
  Headphones,
  Briefcase,
  HeartHandshake,
  X,
  ExternalLink,
} from 'lucide-react';
import { ModuleId, ApprenticeProfile, UserProgress } from '../types/induction';

interface ModuleHeroProps {
  profile: ApprenticeProfile;
  activeModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  progress: UserProgress;
  onOpenProfile: () => void;
}

interface StepMeta {
  id: ModuleId;
  stepNum: number;
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
  colorBg: string;
  colorBorder: string;
  colorLightBg: string;
  colorText: string;
}

export const ModuleHero: React.FC<ModuleHeroProps> = ({
  profile,
  activeModule,
  onSelectModule,
  progress,
  onOpenProfile,
}) => {
  const [supportModalOpen, setSupportModalOpen] = useState<boolean>(false);
  const [selectedSupportChannel, setSelectedSupportChannel] = useState<{
    title: string;
    description: string;
    phone?: string;
    link?: string;
    badge: string;
    colorBg: string;
  } | null>(null);

  const steps: StepMeta[] = [
    {
      id: 'simbolos',
      stepNum: 1,
      title: 'SÍMBOLOS SENA',
      subtitle: 'Escudo, himno y valores',
      Icon: Shield,
      colorBg: 'bg-blue-600',
      colorBorder: 'border-blue-500',
      colorLightBg: 'bg-blue-50 dark:bg-blue-950/40',
      colorText: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'modelo',
      stepNum: 2,
      title: 'MODELO FPI',
      subtitle: '4 fuentes y competencias',
      Icon: Compass,
      colorBg: 'bg-[#39A900]',
      colorBorder: 'border-[#39A900]',
      colorLightBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      colorText: 'text-[#39A900] dark:text-[#44C600]',
    },
    {
      id: 'reglamento',
      stepNum: 3,
      title: 'REGLAMENTO',
      subtitle: 'Acuerdo 0009 de 2024',
      Icon: Scale,
      colorBg: 'bg-amber-500',
      colorBorder: 'border-amber-500',
      colorLightBg: 'bg-amber-50 dark:bg-amber-950/40',
      colorText: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 'ecosistema',
      stepNum: 4,
      title: 'ECOSISTEMA',
      subtitle: 'Bienestar y SENNOVA',
      Icon: Sparkles,
      colorBg: 'bg-purple-600',
      colorBorder: 'border-purple-500',
      colorLightBg: 'bg-purple-50 dark:bg-purple-950/40',
      colorText: 'text-purple-600 dark:text-purple-400',
    },
    {
      id: 'evaluacion',
      stepNum: 5,
      title: 'EVALUACIÓN',
      subtitle: 'Prueba y certificado',
      Icon: Award,
      colorBg: 'bg-teal-600',
      colorBorder: 'border-teal-500',
      colorLightBg: 'bg-teal-50 dark:bg-teal-950/40',
      colorText: 'text-teal-600 dark:text-teal-400',
    },
  ];

  const supportChannels = [
    {
      title: 'LÍNEA NACIONAL GRATUITA',
      subtitle: '01 8000 910270 · Atención aprendices',
      description: 'Canal telefónico gratuito disponible para aprendices en todo el territorio colombiano.',
      phone: '01 8000 910270',
      badge: 'Llamada Gratuita',
      Icon: Phone,
      colorBg: 'bg-blue-600',
      colorBorder: 'hover:border-blue-500',
      circleBg: 'bg-blue-600',
      ringColor: 'ring-blue-400/30',
    },
    {
      title: 'MESA DE AYUDA VIRTUAL',
      subtitle: 'Soporte Zajuna LMS y SofiaPlus',
      description: 'Asistencia técnica institucional para problemas de acceso, contraseñas y entrega de evidencias en plataformas.',
      link: 'https://zajuna.sena.edu.co',
      badge: 'LMS Zajuna',
      Icon: Headphones,
      colorBg: 'bg-[#39A900]',
      colorBorder: 'hover:border-[#39A900]',
      circleBg: 'bg-[#39A900]',
      ringColor: 'ring-emerald-400/30',
    },
    {
      title: 'AGENCIA DE EMPLEO (APE)',
      subtitle: 'Intermediación laboral y contratos',
      description: 'Postulación a vacantes de contrato de aprendizaje, prácticas productivas y ofertas laborales del SENA.',
      link: 'https://ape.sena.edu.co',
      badge: 'Prácticas & Empleo',
      Icon: Briefcase,
      colorBg: 'bg-amber-500',
      colorBorder: 'hover:border-amber-500',
      circleBg: 'bg-amber-500',
      ringColor: 'ring-amber-400/30',
    },
    {
      title: 'BIENESTAR AL APRENDIZ',
      subtitle: 'Acompañamiento en tu centro',
      description: 'Salud, apoyos económicos de sostenimiento, orientación psicosocial y convocatorias culturales en tu regional.',
      badge: 'Orientación Integral',
      Icon: HeartHandshake,
      colorBg: 'bg-purple-600',
      colorBorder: 'hover:border-purple-500',
      circleBg: 'bg-purple-600',
      ringColor: 'ring-purple-400/30',
    },
  ];

  const completedCount = progress.completedModules.length + (progress.quizCompleted ? 1 : 0);
  const totalSteps = steps.length;
  const progressPercentage = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className="space-y-8">
      {/* Top Banner with Campus Photography */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121E2B] shadow-sm transition-colors duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                <span>Plataforma Oficial de Inducción</span>
                <span aria-hidden="true">·</span>
                <span>{profile.regional}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                ¡Bienvenido(a), <span className="text-[#39A900] dark:text-[#44C600]">{profile.name || 'Aprendiz'}</span>!
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Inicias tu camino en la entidad más querida por los colombianos. Descubre el valor de tu formación profesional, conoce tus derechos y prepárate para transformar el sector productivo con excelencia e innovación.
              </p>

              {/* Apprentice Quick Metadata */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{profile.program}</span>
                <span aria-hidden="true">·</span>
                <span>Ficha {profile.cohortNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.programLevel}</span>
              </div>
            </div>

            {/* Progress summary & actions */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-4 mb-1.5 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Progreso en la Ruta de Inducción</span>
                  <span className="font-bold text-[#39A900] dark:text-[#44C600] font-mono">{progressPercentage}%</span>
                </div>
                <div className="w-56 sm:w-64 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#39A900] dark:bg-[#44C600] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <button
                onClick={onOpenProfile}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] dark:hover:text-emerald-300 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Actualizar Datos de Ficha</span>
              </button>
            </div>
          </div>

          {/* Right Image Banner */}
          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full bg-slate-100 dark:bg-slate-900">
            <img
              src="/src/assets/images/hero_sena_campus_1791319495339.jpg"
              alt="Campus de Formación SENA Colombia"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white dark:lg:from-[#121E2B] lg:via-transparent lg:to-transparent" />

            <div className="absolute bottom-3 right-3 left-3 lg:left-auto lg:right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-3 rounded-xl border border-white/40 dark:border-slate-700 shadow-xs max-w-xs text-[11px] text-slate-700 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Mística SENA</span>
              "Formación profesional integral, gratuita y con pertinencia territorial para todo el país."
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Step Navigation Bar - Tactile Capsule Buttons (Inspired by image.png) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#39A900] animate-ping" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Ruta de Aprendizaje Institucional
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {completedCount} de {totalSteps} módulos listos
          </span>
        </div>

        <nav
          aria-label="Ruta de Módulos"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5"
        >
          {steps.map((st) => {
            const isActive = activeModule === st.id;
            const isDone =
              st.id === 'evaluacion'
                ? progress.quizCompleted
                : progress.completedModules.includes(st.id);

            return (
              <button
                key={st.id}
                onClick={() => onSelectModule(st.id)}
                className={`group relative overflow-hidden rounded-2xl border transition-all text-left flex items-center justify-between p-2 pr-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                  isActive
                    ? `border-2 ${st.colorBorder} bg-white dark:bg-[#152332] ring-4 ring-slate-100 dark:ring-slate-800`
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Left Section: Colored Badge with circular icon (directly following image.png) */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs text-white ${st.colorBg} transition-transform group-hover:scale-105`}
                  >
                    <div className="w-8 h-8 rounded-full border border-white/35 flex items-center justify-center bg-white/10 backdrop-blur-xs">
                      <st.Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Center Content: Bold Uppercase Title + Subtitle */}
                  <div className="min-w-0 pr-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block leading-tight">
                      Paso {st.stepNum}
                    </span>
                    <h4 className="text-xs font-black uppercase tracking-tight text-slate-900 dark:text-white truncate">
                      {st.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
                      {st.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Section: Circular Action Badge / Chevron (inspired by image.png) */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : isActive
                      ? `${st.colorBg} text-white shadow-xs`
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-700 dark:group-hover:text-white'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Canales de Contacto al Aprendiz - 4 Capsule CTA Cards matching image.png */}
      <section className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0E1721] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#39A900] dark:text-[#44C600] block">
              Soporte y Orientación Institucional
            </span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Canales Directos de Atención al Aprendiz
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Líneas oficiales y mesas de ayuda a tu servicio
          </p>
        </div>

        {/* 4 Thematic Pill Capsules from image.png: Blue, Green, Orange, Purple */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {supportChannels.map((channel, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedSupportChannel(channel);
                setSupportModalOpen(true);
              }}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-2 pr-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${channel.colorBorder} transition-all text-left flex items-center justify-between`}
            >
              {/* Left Pill Badge */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white ${channel.colorBg} shadow-xs transition-transform group-hover:scale-105`}
                >
                  <div className="w-8 h-8 rounded-full border border-white/35 flex items-center justify-center bg-white/10 backdrop-blur-xs">
                    <channel.Icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Center Title and Microcopy */}
                <div className="min-w-0 pr-1">
                  <h4 className="text-xs font-black uppercase tracking-tight text-slate-900 dark:text-white truncate">
                    {channel.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
                    {channel.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Circular Button with Chevron */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white ${channel.circleBg} shadow-xs group-hover:scale-110 transition-transform`}
              >
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal for Support Channel Details */}
      {supportModalOpen && selectedSupportChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 shadow-2xl transition-colors">
            <button
              onClick={() => setSupportModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${selectedSupportChannel.colorBg} shadow-xs`}
              >
                <div className="w-8 h-8 rounded-full border border-white/35 flex items-center justify-center bg-white/10">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {selectedSupportChannel.badge}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {selectedSupportChannel.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              {selectedSupportChannel.description}
            </p>

            {selectedSupportChannel.phone && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1721] border border-slate-200 dark:border-slate-800 mb-5">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Número de Contacto Oficial:
                </span>
                <a
                  href={`tel:${selectedSupportChannel.phone.replace(/\s+/g, '')}`}
                  className="text-base font-bold text-slate-900 dark:text-white hover:text-[#39A900] dark:hover:text-[#44C600] flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#39A900]" />
                  <span>{selectedSupportChannel.phone}</span>
                </a>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                  Horario: Lunes a Viernes 7:00 a.m. a 7:00 p.m. · Sábados 8:00 a.m. a 1:00 p.m.
                </span>
              </div>
            )}

            {selectedSupportChannel.link && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1721] border border-slate-200 dark:border-slate-800 mb-5">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Enlace Oficial del Portal:
                </span>
                <a
                  href={selectedSupportChannel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#39A900] dark:text-[#44C600] hover:underline flex items-center gap-1.5 break-all"
                >
                  <span>{selectedSupportChannel.link}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            )}

            <button
              onClick={() => setSupportModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-xs font-bold text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
