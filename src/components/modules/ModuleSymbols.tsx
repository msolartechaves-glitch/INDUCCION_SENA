import React, { useState } from 'react';
import { Play, Volume2, Shield, Compass, BookOpen, Check, Award, ArrowRight, ChevronRight } from 'lucide-react';
import { SHIELD_ELEMENTS, ANTHEM_STANZAS, INSTITUTIONAL_VALUES } from '../../data/senaData';
import { sound } from '../../utils/audio';

const SENA_ESCUDO_URL = 'https://www.sena.edu.co/assets/escudo-CKAC4aSg.png';

interface ModuleSymbolsProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleSymbols: React.FC<ModuleSymbolsProps> = ({
  onComplete,
  isCompleted,
  onNextModule,
}) => {
  const [selectedShieldElement, setSelectedShieldElement] = useState<string>('pinon');
  const [activeStanzaIndex, setActiveStanzaIndex] = useState<number>(0);
  const [isPlayingAnthem, setIsPlayingAnthem] = useState<boolean>(false);

  const activeElement = SHIELD_ELEMENTS.find((e) => e.id === selectedShieldElement) || SHIELD_ELEMENTS[0];

  const handlePlayAnthem = () => {
    setIsPlayingAnthem(true);
    sound.playAnthemMotif();
    setTimeout(() => {
      setIsPlayingAnthem(false);
    }, 5500);
  };

  const handleFinishModule = () => {
    sound.playSuccess();
    onComplete();
  };

  return (
    <div className="space-y-12">
      {/* Editorial Intro Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00324D] via-[#012235] to-[#0a1824] p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <span>Módulo 1</span>
            <span aria-hidden="true">·</span>
            <span>Identidad & Mística Institucional</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            El Orgullo de Ser Aprendiz SENA
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            El Servicio Nacional de Aprendizaje fue fundado en <strong className="text-white">1957</strong> por iniciativa de 
            <strong className="text-white"> Rodolfo Martínez Tono</strong>, fruto de un pacto histórico tripartito entre el Estado, 
            los empresarios y los trabajadores para formar integralmente a la juventud trabajadora colombiana de manera 100% gratuita.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Shield className="w-4 h-4 text-[#39A900]" />
              <span>33 Regionales en Colombia</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Compass className="w-4 h-4 text-[#39A900]" />
              <span>118 Centros de Formación</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <BookOpen className="w-4 h-4 text-[#39A900]" />
              <span>Formación Gratuita de Clase Mundial</span>
            </div>
          </div>
        </div>

        {/* Ambient watermark pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-80 h-80 fill-white">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
            <path d="M50 15 L50 85 M15 50 L85 50" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* Símbolos: Escudo Interactivo */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors duration-200">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#44C600] mb-1">
            <span>Simbología Heráldica</span>
            <span aria-hidden="true">·</span>
            <span>Explorador Táctil</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            El Escudo del SENA y los Tres Sectores Económicos
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            El escudo sintetiza los pilares del desarrollo de la nación. Selecciona cada componente para explorar su significado productivo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Interactive Shield Stage */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#0E1721] rounded-2xl border border-slate-200 dark:border-slate-800">
            {/* Official SENA Escudo Image Showcase */}
            <div className="relative w-full max-w-[280px] aspect-[4/5] flex items-center justify-center p-3 group">
              <img
                src={SENA_ESCUDO_URL}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/src/assets/images/escudo-sena.png';
                }}
                alt="Escudo Oficial del SENA"
                className="w-full h-full object-contain filter drop-shadow-md transition-all duration-300 group-hover:scale-105"
              />

              {/* Quick Interactive Sector Badges on top of Escudo */}
              <div className="absolute top-2 left-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedShieldElement('pinon');
                    sound.playTone(440, 0.1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all shadow-xs flex items-center gap-1 backdrop-blur-xs ${
                    selectedShieldElement === 'pinon'
                      ? 'bg-[#39A900] text-white ring-2 ring-[#39A900]/40 scale-105 shadow-md'
                      : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:bg-[#39A900] hover:text-white border border-slate-200 dark:border-slate-700'
                  }`}
                  title="Sector Industria (Piñón)"
                >
                  <span>⚙</span>
                  <span>Industria</span>
                </button>
              </div>

              <div className="absolute top-2 right-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedShieldElement('caduceo');
                    sound.playTone(523, 0.1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all shadow-xs flex items-center gap-1 backdrop-blur-xs ${
                    selectedShieldElement === 'caduceo'
                      ? 'bg-blue-600 text-white ring-2 ring-blue-500/40 scale-105 shadow-md'
                      : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white border border-slate-200 dark:border-slate-700'
                  }`}
                  title="Sector Comercio y Servicios (Caduceo)"
                >
                  <span>⚚</span>
                  <span>Comercio</span>
                </button>
              </div>

              <div className="absolute bottom-2 inset-x-0 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedShieldElement('cafe');
                    sound.playTone(659, 0.1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all shadow-xs flex items-center gap-1 backdrop-blur-xs ${
                    selectedShieldElement === 'cafe'
                      ? 'bg-amber-600 text-white ring-2 ring-amber-500/40 scale-105 shadow-md'
                      : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:bg-amber-600 hover:text-white border border-slate-200 dark:border-slate-700'
                  }`}
                  title="Sector Agropecuario (Café)"
                >
                  <span>☕</span>
                  <span>Agropecuario</span>
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 font-medium text-center">
              Escudo Oficial del SENA: Haz clic en las etiquetas o botones para inspeccionar cada uno de sus tres sectores.
            </p>
          </div>

          {/* Interactive Inspection Deck */}
          <div className="lg:col-span-7 space-y-4">
            {/* 3 Sector Capsule Buttons (Inspired by image.png) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SHIELD_ELEMENTS.map((elem) => {
                const isSelected = selectedShieldElement === elem.id;
                const color =
                  elem.id === 'pinon'
                    ? 'bg-[#39A900]'
                    : elem.id === 'caduceo'
                    ? 'bg-blue-600'
                    : 'bg-amber-600';
                return (
                  <button
                    key={elem.id}
                    onClick={() => {
                      setSelectedShieldElement(elem.id);
                      sound.playTone(500, 0.08);
                    }}
                    className={`group relative overflow-hidden rounded-2xl border transition-all text-left flex items-center justify-between p-1.5 pr-3 shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
                      isSelected
                        ? 'border-2 border-[#39A900] dark:border-[#44C600] bg-white dark:bg-[#152332] ring-2 ring-[#39A900]/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white ${color} shadow-xs transition-transform group-hover:scale-105`}
                      >
                        <div className="w-6 h-6 rounded-full border border-white/35 flex items-center justify-center bg-white/10 text-xs font-bold">
                          {elem.id === 'pinon' ? '⚙' : elem.id === 'caduceo' ? '⚚' : '☕'}
                        </div>
                      </div>
                      <div className="min-w-0 pr-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block leading-tight">
                          Sector
                        </span>
                        <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white truncate">
                          {elem.name}
                        </h4>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isSelected
                          ? color + ' text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:translate-x-0.5'
                      }`}
                    >
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#152332]">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                <span>{activeElement.sector}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{activeElement.name}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
                {activeElement.description}
              </p>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-2">
                  Ejemplos de Formación en este Sector:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {activeElement.id === 'pinon' && (
                    <>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Mecatrónica Industrial</span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Construcción & Obras Civiles</span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Desarrollo de Software & TIC</span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Energías Renovables</span>
                    </>
                  )}
                  {activeElement.id === 'caduceo' && (
                    <>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Gestión Empresarial</span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Enfermería & Salud</span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Comercio Exterior y Aduanas</span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Hotelería, Turismo y Gastronomía</span>
                    </>
                  )}
                  {activeElement.id === 'cafe' && (
                    <>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Producción Agropecuaria</span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Gestión Ambiental y Bosques</span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Acuicultura y Piscicultura</span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">Caficultura de Alta Calidad</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bandera y El Logotipo del Caminante */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 shadow-xs transition-colors duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-8 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center shadow-xs">
              <div className="w-4 h-4 rounded-full bg-[#39A900] flex items-center justify-center text-[8px] text-white font-bold">
                S
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">La Bandera del SENA</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Blanco de paz y transparencia</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            De fondo blanco inmaculado que simboliza la paz, la transparencia, la tranquilidad y la armonía que debe reinar en todos los centros de formación y en la convivencia de la comunidad educativa, llevando el escudo en su centro.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 shadow-xs transition-colors duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#44C600] flex items-center justify-center font-bold">
              {/* Walking icon */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#39A900] dark:stroke-[#44C600] fill-none" strokeWidth="2">
                <circle cx="12" cy="5" r="2.5" />
                <path d="M10 22 L11.5 15 L14 17 L16 22" />
                <path d="M8 13 L12 11 L15 14" />
                <path d="M4 22 L20 22" strokeDasharray="3 3" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">El Isotipo del Caminante</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">El aprendiz en marcha hacia el porvenir</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Muestra a un ser humano estilizado que avanza con paso firme sobre un camino ascendente. Representa la libertad, el pensamiento crítico, la responsabilidad y la proyección hacia adelante del aprendiz en su proyecto de vida.
          </p>
        </div>
      </section>

      {/* Himno del SENA: Reproductor Interactivo y Lector de Estrofas */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-xs transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#44C600] mb-1">
              <span>Mística Cívica</span>
              <span aria-hidden="true">·</span>
              <span>Letra: Luis Alfredo Sánchez / Música: Daniel Marlez</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">El Himno Institucional del SENA</h2>
          </div>

          <button
            onClick={handlePlayAnthem}
            disabled={isPlayingAnthem}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition-all shadow-xs ${
              isPlayingAnthem
                ? 'bg-amber-600 animate-pulse'
                : 'bg-[#39A900] dark:bg-emerald-600 hover:bg-[#329400] dark:hover:bg-emerald-500'
            }`}
          >
            {isPlayingAnthem ? (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Interpretando Melodía...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Escuchar Motivo del Himno</span>
              </>
            )}
          </button>
        </div>

        {/* Stanzas Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex flex-col gap-2">
            {ANTHEM_STANZAS.map((stanza, idx) => (
              <button
                key={stanza.title}
                onClick={() => {
                  setActiveStanzaIndex(idx);
                  sound.playTone(400 + idx * 80, 0.08);
                }}
                className={`p-4 rounded-xl text-left border transition-all ${
                  activeStanzaIndex === idx
                    ? 'border-[#39A900] dark:border-[#44C600] bg-emerald-50/50 dark:bg-emerald-950/40 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{stanza.title}</span>
                  {activeStanzaIndex === idx && (
                    <span className="text-[10px] font-bold text-[#39A900] dark:text-[#44C600] bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
                      Leyendo
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 italic">
                  "{stanza.lyrics[0]}"
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-50 dark:bg-[#0E1721] border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              {ANTHEM_STANZAS[activeStanzaIndex].title}
            </h4>
            <div className="space-y-2 mb-6">
              {ANTHEM_STANZAS[activeStanzaIndex].lyrics.map((line, i) => (
                <p
                  key={i}
                  className="text-base font-semibold text-slate-800 dark:text-slate-100 tracking-wide font-serif italic"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 block mb-1">
                Interpretación y Sentido Formativo:
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ANTHEM_STANZAS[activeStanzaIndex].meaning}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Institucionales */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Valores Institucionales</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Principios irrenunciables que guían las actitudes, deberes y el comportamiento de toda la comunidad SENA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INSTITUTIONAL_VALUES.map((val) => (
            <div
              key={val.title}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-5 shadow-xs transition-all hover:shadow-md"
            >
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#39A900] dark:bg-[#44C600]" />
                {val.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Module Completion Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/30 p-6 transition-colors">
        <div>
          <h4 className="font-bold text-emerald-950 dark:text-emerald-200 text-base">
            {isCompleted ? '¡Módulo 1 Completado!' : 'Has explorado los Símbolos e Historia'}
          </h4>
          <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5">
            Ahora conoces los pilares heráldicos, el himno y la misión fundacional del SENA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isCompleted ? (
            <button
              onClick={handleFinishModule}
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
              className="group overflow-hidden rounded-full border border-blue-600 bg-white dark:bg-[#121E2B] p-1.5 pr-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-[#00324D] dark:bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block leading-tight">
                  Siguiente Paso
                </span>
                <span className="text-xs font-black uppercase text-slate-900 dark:text-white">
                  Continuar a Modelo FPI
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#00324D] dark:bg-blue-600 text-white flex items-center justify-center shrink-0 ml-1">
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
