import React from 'react';
import { Volume2, VolumeX, UserCheck, Award, Moon, Sun, ShieldCheck } from 'lucide-react';
import { ModuleId, ApprenticeProfile } from '../types/induction';

interface NavbarProps {
  activeModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenProfile: () => void;
  onOpenAdminPanel?: () => void;
  isAdmin?: boolean;
  profile: ApprenticeProfile;
  quizScore: number;
  quizCompleted: boolean;
}

const SENA_LOGOSIMBOLO_SVG =
  "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e";

export const Navbar: React.FC<NavbarProps> = ({
  activeModule,
  onSelectModule,
  isMuted,
  onToggleMute,
  isDarkMode,
  onToggleDarkMode,
  onOpenProfile,
  onOpenAdminPanel,
  isAdmin = false,
  profile,
  quizCompleted,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B131B]/95 backdrop-blur-sm transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark with Official SENA Logosímbolo SVG */}
        <button
          onClick={() => onSelectModule('simbolos')}
          className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-all hover:bg-slate-100/80 dark:hover:bg-slate-800/60 shrink-0 text-left"
          title="Ir al inicio - Módulo Símbolos SENA"
          aria-label="Ir al inicio de la Inducción SENA"
        >
          <img
            src={SENA_LOGOSIMBOLO_SVG}
            alt="Logosímbolo Oficial SENA"
            className="h-10 w-auto max-w-[42px] object-contain shrink-0 transition-transform group-hover:scale-105 drop-shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight leading-none text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>SENA</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#39A900]/10 text-[#39A900] dark:bg-[#39A900]/20 dark:text-[#44C600] tracking-wide uppercase">
                Inducción
              </span>
            </span>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight mt-0.5 hidden xs:inline">
              Reglamento Acuerdo 0009/2024
            </span>
          </div>
        </button>

        {/* Zone 2: Clean Module Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => onSelectModule('simbolos')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeModule === 'simbolos'
                ? 'bg-white dark:bg-[#152332] text-[#39A900] dark:text-[#44C600] shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            1. Símbolos
          </button>
          <button
            onClick={() => onSelectModule('modelo')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeModule === 'modelo'
                ? 'bg-white dark:bg-[#152332] text-[#39A900] dark:text-[#44C600] shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            2. Modelo FPI
          </button>
          <button
            onClick={() => onSelectModule('reglamento')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeModule === 'reglamento'
                ? 'bg-white dark:bg-[#152332] text-[#39A900] dark:text-[#44C600] shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            3. Reglamento
          </button>
          <button
            onClick={() => onSelectModule('ecosistema')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeModule === 'ecosistema'
                ? 'bg-white dark:bg-[#152332] text-[#39A900] dark:text-[#44C600] shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            4. Ecosistema
          </button>
          <button
            onClick={() => onSelectModule('evaluacion')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeModule === 'evaluacion'
                ? 'bg-white dark:bg-[#152332] text-[#39A900] dark:text-[#44C600] shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            5. Evaluación
          </button>
          {quizCompleted && (
            <button
              onClick={() => onSelectModule('certificado')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeModule === 'certificado'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certificado</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Clean Actions with visual spacing, no overlap, clear hierarchy */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Module Navigation selector on mobile/tablet */}
          <div className="flex lg:hidden items-center">
            <select
              aria-label="Seleccionar Módulo"
              value={activeModule}
              onChange={(e) => onSelectModule(e.target.value as ModuleId)}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 px-2 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            >
              <option value="simbolos">1. Símbolos</option>
              <option value="modelo">2. Modelo FPI</option>
              <option value="reglamento">3. Reglamento</option>
              <option value="ecosistema">4. Ecosistema</option>
              <option value="evaluacion">5. Evaluación</option>
              {quizCompleted && <option value="certificado">Certificado</option>}
            </select>
          </div>

          {/* Admin / Instructor Protected Portal Access */}
          {onOpenAdminPanel && (
            <button
              onClick={onOpenAdminPanel}
              title={isAdmin ? 'Panel de Coordinación (Administrador Activo)' : 'Acceso Restringido para Instructores y Administración'}
              aria-label="Panel de Coordinación e Instructores"
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all shadow-xs shrink-0 ${
                isAdmin
                  ? 'border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <ShieldCheck className={`h-4 w-4 shrink-0 ${isAdmin ? 'text-[#39A900] dark:text-[#44C600]' : 'text-slate-500 dark:text-slate-400'}`} />
              <span className="hidden sm:inline whitespace-nowrap">
                {isAdmin ? 'Admin' : 'Instructor'}
              </span>
              {isAdmin && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] shrink-0 animate-pulse" />
              )}
            </button>
          )}

          {/* Theme & Audio Controls Group */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 p-0.5">
            {/* Dark Mode Switch Button */}
            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="flex h-7.5 w-7.5 items-center justify-center rounded-lg text-slate-700 dark:text-amber-400 hover:bg-white dark:hover:bg-slate-700 transition-colors shrink-0"
            >
              {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleMute}
              title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
              className="flex h-7.5 w-7.5 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors shrink-0"
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Apprentice Profile CTA Button */}
          <button
            onClick={onOpenProfile}
            title="Datos y Ficha del Aprendiz"
            aria-label="Datos y Ficha del Aprendiz"
            className="flex items-center gap-1.5 rounded-xl bg-[#00324D] dark:bg-emerald-600 hover:bg-[#002235] dark:hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white transition-all shadow-xs shrink-0"
          >
            <UserCheck className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden md:inline max-w-[120px] truncate">{profile.name || 'Mi Ficha'}</span>
            <span className="md:hidden">Ficha</span>
          </button>
        </div>
      </div>
    </header>
  );
};

