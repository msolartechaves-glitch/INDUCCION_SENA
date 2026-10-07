/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ModuleHero } from './components/ModuleHero';
import { ModuleSymbols } from './components/modules/ModuleSymbols';
import { ModulePedagogicalModel } from './components/modules/ModulePedagogicalModel';
import { ModuleRegulations } from './components/modules/ModuleRegulations';
import { ModuleEcosystem } from './components/modules/ModuleEcosystem';
import { ModuleAssessment } from './components/modules/ModuleAssessment';
import { CertificateView } from './components/CertificateView';
import { ApprenticeProfileModal } from './components/ApprenticeProfileModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { adminService } from './services/adminService';
import { ModuleId, ApprenticeProfile, UserProgress } from './types/induction';
import { sound } from './utils/audio';

const DEFAULT_PROFILE: ApprenticeProfile = {
  name: 'Valentina Gómez Restrepo',
  documentType: 'CC',
  documentNumber: '1020304050',
  regional: 'Regional Antioquia',
  center: 'Centro de Formación en Diseño, Confección y Moda',
  program: 'ADSO - Análisis y Desarrollo de Software',
  programLevel: 'Tecnólogo',
  cohortNumber: '2894102',
  startDate: new Date().toISOString().split('T')[0],
};

const DEFAULT_PROGRESS: UserProgress = {
  completedModules: [],
  quizScore: 0,
  quizCompleted: false,
  simulationCasesSolved: [],
  badges: [],
};

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('simbolos');
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => adminService.isAdminAuthenticated());
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sena_theme_mode') === 'dark';
    } catch {
      return false;
    }
  });
  const [isBlurTransitioning, setIsBlurTransitioning] = useState<boolean>(false);

  // Sync dark class on document element
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('sena_theme_mode', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('sena_theme_mode', 'light');
      }
    } catch {
      // storage unavailable
    }
  }, [isDarkMode]);

  // Load persisted state or fallback
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem('sena_induction_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('sena_induction_progress');
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_induction_profile', JSON.stringify(profile));
    } catch {
      // storage unavailable
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_induction_progress', JSON.stringify(progress));
    } catch {
      // storage unavailable
    }
  }, [progress]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleToggleDarkMode = () => {
    setIsBlurTransitioning(true);
    sound.playTone(isDarkMode ? 587.33 : 440.0, 0.12, 'triangle', 0.1);

    // Swap theme halfway through the blur transition
    setTimeout(() => {
      setIsDarkMode((prev) => !prev);
    }, 160);

    // Finish blur transition
    setTimeout(() => {
      setIsBlurTransitioning(false);
    }, 460);
  };

  const handleModuleCompleted = (moduleId: ModuleId) => {
    if (!progress.completedModules.includes(moduleId)) {
      setProgress((prev) => ({
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
      }));
    }
  };

  const handleSolveCase = (caseId: string) => {
    if (!progress.simulationCasesSolved.includes(caseId)) {
      setProgress((prev) => ({
        ...prev,
        simulationCasesSolved: [...prev.simulationCasesSolved, caseId],
      }));
    }
  };

  const handlePassExam = (score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScore: score,
      quizCompleted: true,
      completedModules: Array.from(new Set([...prev.completedModules, 'evaluacion'])),
    }));

    // Secure Anti-Duplicate Registration (Phase 2):
    // Records the apprentice in the institutional database, updating if document already exists
    const verificationCode = `SENA-IND-${new Date().getFullYear()}-${Math.abs(
      (profile.documentNumber || '12345').split('').reduce((acc, char) => acc * 31 + char.charCodeAt(0), 7)
    )
      .toString(16)
      .toUpperCase()
      .slice(0, 8)}`;

    adminService.recordApprenticeInduction(profile, score, verificationCode);
  };

  const handleNextModuleFrom = (current: ModuleId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (current === 'simbolos') setActiveModule('modelo');
    else if (current === 'modelo') setActiveModule('reglamento');
    else if (current === 'reglamento') setActiveModule('ecosistema');
    else if (current === 'ecosistema') setActiveModule('evaluacion');
    else if (current === 'evaluacion') setActiveModule('certificado');
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 dark:bg-[#0B131B] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 ${
        isBlurTransitioning ? 'theme-transition-blur' : 'theme-transition-normal'
      }`}
    >
      {/* Full-screen transient Blur Flash Overlay during Theme Shift */}
      {isBlurTransitioning && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-md bg-white/10 dark:bg-black/20 transition-all duration-300 animate-pulse"
        />
      )}

      {/* Strict 3-zone contract Navigation */}
      <Navbar
        activeModule={activeModule}
        onSelectModule={(mod) => {
          setActiveModule(mod);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenAdminPanel={() => setAdminModalOpen(true)}
        isAdmin={isAdmin}
        profile={profile}
        quizScore={progress.quizScore}
        quizCompleted={progress.quizCompleted}
      />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {activeModule !== 'certificado' && (
          <ModuleHero
            profile={profile}
            activeModule={activeModule}
            onSelectModule={(mod) => {
              setActiveModule(mod);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            progress={progress}
            onOpenProfile={() => setProfileModalOpen(true)}
          />
        )}

        {/* Content by active module */}
        {activeModule === 'simbolos' && (
          <ModuleSymbols
            onComplete={() => handleModuleCompleted('simbolos')}
            isCompleted={progress.completedModules.includes('simbolos')}
            onNextModule={() => handleNextModuleFrom('simbolos')}
          />
        )}

        {activeModule === 'modelo' && (
          <ModulePedagogicalModel
            onComplete={() => handleModuleCompleted('modelo')}
            isCompleted={progress.completedModules.includes('modelo')}
            onNextModule={() => handleNextModuleFrom('modelo')}
          />
        )}

        {activeModule === 'reglamento' && (
          <ModuleRegulations
            onComplete={() => handleModuleCompleted('reglamento')}
            isCompleted={progress.completedModules.includes('reglamento')}
            onNextModule={() => handleNextModuleFrom('reglamento')}
            solvedCases={progress.simulationCasesSolved}
            onSolveCase={handleSolveCase}
          />
        )}

        {activeModule === 'ecosistema' && (
          <ModuleEcosystem
            onComplete={() => handleModuleCompleted('ecosistema')}
            isCompleted={progress.completedModules.includes('ecosistema')}
            onNextModule={() => handleNextModuleFrom('ecosistema')}
          />
        )}

        {activeModule === 'evaluacion' && (
          <ModuleAssessment
            onPassExam={handlePassExam}
            onGoToCertificate={() => {
              setActiveModule('certificado');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            currentScore={progress.quizScore}
            isPassed={progress.quizCompleted}
            profile={profile}
            onUpdateProfile={(updated) => setProfile(updated)}
          />
        )}

        {activeModule === 'certificado' && (
          <CertificateView
            profile={profile}
            score={progress.quizScore || 100}
            onEditProfile={() => setProfileModalOpen(true)}
            onBackToModules={() => setActiveModule('simbolos')}
            onOpenAdminPanel={() => setAdminModalOpen(true)}
            isAdmin={isAdmin}
          />
        )}
      </main>

      {/* Profile Editing Modal */}
      <ApprenticeProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profile={profile}
        onSave={(updated) => setProfile(updated)}
      />

      {/* Protected SENA Administrator & Coordination Dashboard (Private Google Drive Access & Anti-duplicate Engine) */}
      <AdminPanelModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        isAdmin={isAdmin}
        onAdminAuthChange={(auth) => setIsAdmin(auth)}
      />

      {/* Quiet Institutional Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1721] py-8 text-xs text-slate-500 dark:text-slate-400 print:hidden transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">Servicio Nacional de Aprendizaje — SENA</span>
            <span aria-hidden="true">·</span>
            <span>República de Colombia</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-slate-400">
            <span>Portal Zajuna LMS</span>
            <span aria-hidden="true">·</span>
            <span>SofiaPlus</span>
            <span aria-hidden="true">·</span>
            <span>Agencia Pública de Empleo</span>
            <span aria-hidden="true">·</span>
            <span>Fondo Emprender</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Inducción Integral</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setAdminModalOpen(true)}
              className="text-slate-400 hover:text-[#39A900] dark:hover:text-[#44C600] font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              {isAdmin ? 'Panel Admin (Activo)' : 'Acceso Instructor'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
