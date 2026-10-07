import React, { useState } from 'react';
import { HeartHandshake, Rocket, Briefcase, Globe, Library, Award, Check, ArrowRight, Laptop, Lightbulb, ChevronRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ModuleEcosystemProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleEcosystem: React.FC<ModuleEcosystemProps> = ({
  onComplete,
  isCompleted,
  onNextModule,
}) => {
  const [selectedDimension, setSelectedDimension] = useState<string>('salud');

  const BIENESTAR_DIMENSIONS = [
    {
      id: 'salud',
      title: 'Salud y Promoción de Estilos de Vida',
      description: 'Campañas preventivas, primeros auxilios, salud visual, jornadas de vacunación y hábitos nutricionales saludables en cada centro de formación.',
    },
    {
      id: 'socioemocional',
      title: 'Acompañamiento Psicosocial',
      description: 'Psicólogos y trabajadores sociales para apoyar tu adaptación, resiliencia emocional, prevención de deserción y manejo del estrés formativo.',
    },
    {
      id: 'deporte',
      title: 'Actividad Física y Recreación',
      description: 'Torneos inter-fichas e inter-centros de fútbol, voleibol, baloncesto, atletismo, acondicionamiento físico y recreación lúdica.',
    },
    {
      id: 'cultura',
      title: 'Arte y Cultura Colombiana',
      description: 'Grupos de danzas folclóricas, ensambles musicales, teatro, literatura, cuentería y festivales artísticos nacionales de aprendices.',
    },
    {
      id: 'apoyos',
      title: 'Apoyos de Sostenimiento (FIC / Regular)',
      description: 'Subsidios económicos mensuales para aprendices en condiciones socioeconómicas vulnerables o del sector de la construcción (Fondo FIC).',
    },
    {
      id: 'liderazgo',
      title: 'Liderazgo y Habilidades Blandas',
      description: 'Formación en comunicación asertiva, vocería de ficha, representación de aprendices y comités de convivencia territorial.',
    },
  ];

  const activeDim = BIENESTAR_DIMENSIONS.find((d) => d.id === selectedDimension) || BIENESTAR_DIMENSIONS[0];

  const handleFinish = () => {
    sound.playSuccess();
    onComplete();
  };

  return (
    <div className="space-y-12">
      {/* Intro Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00324D] via-[#02283e] to-[#031622] p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <span>Módulo 4</span>
            <span aria-hidden="true">·</span>
            <span>Oportunidades & Servicios</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ecosistema de Bienestar y Oportunidades SENA
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            El SENA es mucho más que un aula técnica: es un ecosistema nacional integral con bienestar estudiantil,
            investigación en <strong className="text-white">SENNOVA</strong>, capital semilla en el <strong className="text-white">Fondo Emprender</strong> y la mayor intermediación laboral del país a través de la <strong className="text-white">Agencia Pública de Empleo (APE)</strong>.
          </p>
        </div>
      </section>

      {/* Bienestar al Aprendiz */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors duration-200">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#44C600] mb-1">
            <span>Desarrollo Humano</span>
            <span aria-hidden="true">·</span>
            <span>Acompañamiento Integral</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Ruta de Bienestar al Aprendiz
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Tu permanencia y felicidad formativa son prioridad institucional. Conoce los frentes de atención a tu disposición.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Dimension Selector Buttons */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {BIENESTAR_DIMENSIONS.map((dim) => {
              const isSelected = selectedDimension === dim.id;
              return (
                <button
                  key={dim.id}
                  onClick={() => {
                    setSelectedDimension(dim.id);
                    sound.playTone(490, 0.08);
                  }}
                  className={`p-3.5 rounded-xl text-left border transition-all text-xs font-semibold ${
                    isSelected
                      ? 'border-[#39A900] dark:border-[#44C600] bg-emerald-50/70 dark:bg-emerald-950/60 text-slate-900 dark:text-white shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#152332] text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="line-clamp-1">{dim.title}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#39A900] dark:bg-[#44C600]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep inspection preview */}
          <div className="lg:col-span-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721]">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#44C600] flex items-center justify-center font-bold mb-4">
              <HeartHandshake className="w-5 h-5 text-[#39A900] dark:text-[#44C600]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{activeDim.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {activeDim.description}
            </p>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 text-xs text-slate-500 dark:text-slate-400">
              ¿Cómo acceder? Acércate a la oficina de <strong className="text-slate-800 dark:text-slate-200">Bienestar al Aprendiz</strong> de tu Centro de Formación o consulta las convocatorias periódicas con tu vocero de ficha.
            </div>
          </div>
        </div>
      </section>

      {/* Plataformas Digitales Institucionales */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ecosistema Digital y Tecnológico</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Herramientas oficiales que utilizarás a lo largo de tu trayectoria como aprendiz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 shadow-xs transition-colors duration-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#44C600] flex items-center justify-center mb-4">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Zajuna LMS</h3>
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded inline-block mb-3">
              Campus Virtual de Aprendizaje
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Es el entorno virtual de aprendizaje del SENA (reemplaza plataformas anteriores). En él encuentras tus guías de aprendizaje, foros temáticos, material pedagógico y buzones para entregar evidencias.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 shadow-xs transition-colors duration-200">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">SofiaPlus</h3>
            <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded inline-block mb-3">
              Sistema de Gestión Académica
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              El portal institucional para consulta de juicios evaluativos (notas), estado de matrícula, solicitud de certificados oficiales de estudio y actualización de datos personales.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 shadow-xs transition-colors duration-200">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <Library className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Biblioteca Digital SENA</h3>
            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded inline-block mb-3">
              Recursos de Investigación
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Acceso 100% gratuito a más de 30 bases de datos científicas internacionales indexadas (IEEE, ScienceDirect, Scopus, libros electrónicos y normas técnicas ICONTEC).
            </p>
          </div>
        </div>
      </section>

      {/* SENNOVA, Fondo Emprender y Agencia Pública de Empleo */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors duration-200">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Innovación, Emprendimiento y Empleabilidad
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
          Tres grandes brazos estratégicos que proyectan tu talento técnico hacia la industria mundial.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721]">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-[#39A900] dark:text-[#44C600]" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">SENNOVA</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Sistema de Investigación, Desarrollo Tecnológico e Innovación. Permite a los aprendices vincularse a Semilleros de Investigación aplicada, laboratorios TecnoParques y TecnoAcademias para crear patentes y software.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721]">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Fondo Emprender</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Fondo de capital semilla creado por el Gobierno Nacional y operado por el SENA que otorga recursos económicos condonables a aprendices y egresados para financiar sus ideas empresariales innovadoras.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721]">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Agencia Pública de Empleo</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              El primer servicio público de intermediación laboral en Colombia. Conecta directamente a los aprendices y egresados con ofertas de trabajo formales de miles de empresas nacionales e internacionales.
            </p>
          </div>
        </div>
      </section>

      {/* Module Completion Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/30 p-6 transition-colors duration-200">
        <div>
          <h4 className="font-bold text-emerald-950 dark:text-emerald-200 text-base">
            {isCompleted ? '¡Módulo 4 Completado!' : 'Has explorado el Ecosistema y Bienestar SENA'}
          </h4>
          <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5">
            Estás listo para demostrar tus conocimientos en la Evaluación Final de Inducción.
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
              className="group overflow-hidden rounded-full border border-teal-500 bg-white dark:bg-[#121E2B] p-1.5 pr-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block leading-tight">
                  Siguiente Paso
                </span>
                <span className="text-xs font-black uppercase text-slate-900 dark:text-white">
                  Presentar Evaluación Final
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 ml-1">
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
