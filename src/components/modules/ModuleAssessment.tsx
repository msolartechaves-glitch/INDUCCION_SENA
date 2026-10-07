import React, { useState, useEffect, useRef } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Timer,
  Trophy,
  Flame,
  Zap,
  User,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  AlertCircle,
  Clock,
  Compass,
  Check,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { EVALUATION_QUESTIONS, QuestionWithFeedback } from '../../data/evaluationQuestions';
import { ApprenticeProfile } from '../../types/induction';
import { sound } from '../../utils/audio';
import { adminService, StoredApprenticeRecord } from '../../services/adminService';
import { SENA_REGIONALES, POPULAR_PROGRAMS } from '../../data/senaData';

interface ModuleAssessmentProps {
  onPassExam: (score: number) => void;
  onGoToCertificate: () => void;
  currentScore: number;
  isPassed: boolean;
  profile: ApprenticeProfile;
  onUpdateProfile: (profile: ApprenticeProfile) => void;
}

export const ModuleAssessment: React.FC<ModuleAssessmentProps> = ({
  onPassExam,
  onGoToCertificate,
  currentScore,
  isPassed,
  profile,
  onUpdateProfile,
}) => {
  // Assessment flow stages: 'identification' -> 'active_exam' -> 'results'
  const [stage, setStage] = useState<'identification' | 'active_exam' | 'results'>(
    isPassed ? 'results' : 'identification'
  );

  // Apprentice identification form state inside the evaluation module
  const [formData, setFormData] = useState<ApprenticeProfile>(profile);
  const [formErrors, setFormErrors] = useState<{ name?: string; documentNumber?: string }>({});

  // Question & Answers State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [calculatedScore, setCalculatedScore] = useState<number>(currentScore);

  // Gamification & Timer State
  // Timer counts up the total seconds elapsed
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Consecutive streak of correct answers
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [totalGamifiedPoints, setTotalGamifiedPoints] = useState<number>(0);

  // Top ranking view modal or toggle
  const [showRankingModal, setShowRankingModal] = useState<boolean>(false);
  const [recentRecords, setRecentRecords] = useState<StoredApprenticeRecord[]>([]);

  // Feedback animation state for current answer
  const [feedbackAnimation, setFeedbackAnimation] = useState<'correct' | 'incorrect' | null>(null);

  // Sync profile when parent profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  // Load records for ranking
  useEffect(() => {
    setRecentRecords(adminService.getAllRecords());
  }, [stage, showRankingModal]);

  // Timer runner
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeSpentSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Helper formatting for timer mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = EVALUATION_QUESTIONS[currentQuestionIndex];
  const selectedOptionId = selectedAnswers[currentQuestion.id];
  const isAnswered = selectedOptionId !== undefined;
  const answeredCount = Object.keys(selectedAnswers).length;

  // Handle Form Validation and Start Exam
  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; documentNumber?: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      errors.name = 'Por favor ingresa tu nombre completo.';
    }
    if (!formData.documentNumber.trim() || formData.documentNumber.trim().length < 5) {
      errors.documentNumber = 'Por favor ingresa un número de identificación válido.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      sound.playWarning();
      return;
    }

    // Save profile updates to parent
    onUpdateProfile(formData);

    // Reset test state for a fresh run
    setSelectedAnswers({});
    setShowExplanation(false);
    setCurrentQuestionIndex(0);
    setTimeSpentSeconds(0);
    setStreak(0);
    setMaxStreak(0);
    setTotalGamifiedPoints(0);
    setFeedbackAnimation(null);

    // Start timer & active exam
    setIsTimerRunning(true);
    setStage('active_exam');
    sound.playSuccess();
  };

  // Handle answer selection
  const handleSelectOption = (optionId: string) => {
    if (showExplanation && stage === 'results') return;
    if (selectedAnswers[currentQuestion.id] !== undefined) return; // Prevent changing answer once locked to preserve time & gamification

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
    setShowExplanation(true);

    const chosenOption = currentQuestion.options.find((o) => o.id === optionId);
    const isCorrect = !!chosenOption?.isCorrect;

    if (isCorrect) {
      sound.playSuccess();
      setFeedbackAnimation('correct');
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) {
        setMaxStreak(nextStreak);
      }
      // Gamified scoring:
      // Base points: 100
      // Streak multiplier: 15 pts extra per streak level
      // Speed bonus: up to 50 pts if responded under 15 seconds per question
      const streakBonus = nextStreak * 15;
      const pointsAdded = 100 + streakBonus;
      setTotalGamifiedPoints((prev) => prev + pointsAdded);
    } else {
      sound.playWarning();
      setFeedbackAnimation('incorrect');
      setStreak(0); // Reset streak on error
    }
  };

  // Next / Prev Navigation
  const handleNext = () => {
    setFeedbackAnimation(null);
    if (currentQuestionIndex < EVALUATION_QUESTIONS.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setShowExplanation(selectedAnswers[EVALUATION_QUESTIONS[nextIdx].id] !== undefined);
    }
  };

  const handlePrev = () => {
    setFeedbackAnimation(null);
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      setShowExplanation(selectedAnswers[EVALUATION_QUESTIONS[prevIdx].id] !== undefined);
    }
  };

  // Finish exam and calculate score
  const handleFinishExam = () => {
    setIsTimerRunning(false);

    let correctCount = 0;
    EVALUATION_QUESTIONS.forEach((q) => {
      const ansId = selectedAnswers[q.id];
      const opt = q.options.find((o) => o.id === ansId);
      if (opt?.isCorrect) correctCount++;
    });

    const scorePercentage = Math.round((correctCount / EVALUATION_QUESTIONS.length) * 100);
    setCalculatedScore(scorePercentage);
    setStage('results');

    // Final Gamified Score calculation:
    // Base percentage points (up to 1000)
    // + Gamified accumulated points
    // + Time speed bonus (Faster completion gets up to 300 extra points if under 5 minutes)
    const timeBonus = Math.max(0, 300 - Math.floor(timeSpentSeconds / 2));
    const finalGamifiedScore = totalGamifiedPoints + (scorePercentage * 10) + timeBonus;
    setTotalGamifiedPoints(finalGamifiedScore);

    // Verification code
    const verificationCode = `SENA-IND-${new Date().getFullYear()}-${Math.abs(
      (formData.documentNumber || '12345').split('').reduce((acc, char) => acc * 31 + char.charCodeAt(0), 7)
    )
      .toString(16)
      .toUpperCase()
      .slice(0, 8)}`;

    // Record into administration and anti-duplicate Google Sheet logic
    adminService.recordApprenticeInduction(
      formData,
      scorePercentage,
      verificationCode,
      false,
      timeSpentSeconds,
      finalGamifiedScore
    );

    // Refresh ranking records
    setRecentRecords(adminService.getAllRecords());

    if (scorePercentage >= 80) {
      sound.playFanfare();
      onPassExam(scorePercentage);
    } else {
      sound.playWarning();
    }
  };

  // Reset exam to re-take
  const handleRetakeExam = () => {
    setSelectedAnswers({});
    setShowExplanation(false);
    setCurrentQuestionIndex(0);
    setCalculatedScore(0);
    setTimeSpentSeconds(0);
    setStreak(0);
    setMaxStreak(0);
    setTotalGamifiedPoints(0);
    setFeedbackAnimation(null);
    setIsTimerRunning(true);
    setStage('active_exam');
  };

  // Sort ranking records by gamifiedScore and score percentage
  const sortedRanking = [...recentRecords].sort((a, b) => {
    const scoreA = parseInt(a.score.replace(/\D/g, '') || '0', 10);
    const scoreB = parseInt(b.score.replace(/\D/g, '') || '0', 10);
    const ptsA = a.gamifiedScore || scoreA * 10;
    const ptsB = b.gamifiedScore || scoreB * 10;
    if (ptsB !== ptsA) return ptsB - ptsA;
    return (a.timeSpentSeconds || 9999) - (b.timeSpentSeconds || 9999);
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Institutional Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00324D] via-[#01263d] to-[#041a29] p-7 sm:p-9 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-[#39A900]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-400 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#39A900]/20 text-emerald-300 border border-[#39A900]/30">
                Módulo 5 Unificado
              </span>
              <span>•</span>
              <span>20 Preguntas (5 por sección)</span>
              <span>•</span>
              <span>Ranking Gamificado &amp; Cronómetro</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Evaluación Institucional y Gamificación SENA
            </h1>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
              Ingresa tus datos de aprendiz, responde las 5 preguntas de cada sección normativa y acumula puntos por responder con precisión y velocidad.
              Aprobación con el <strong className="text-white">80% o más (16/20 aciertos)</strong>.
            </p>
          </div>

          {/* Quick Ranking Button */}
          <button
            onClick={() => setShowRankingModal(true)}
            className="self-start md:self-auto shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xs text-xs font-bold text-white transition-all shadow-md group"
          >
            <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] text-emerald-300 uppercase leading-none">Tabla de Honor</span>
              <span className="text-xs">Ver Ranking Gamificado</span>
            </div>
          </button>
        </div>
      </section>

      {/* ==============================================================
          STAGE 1: APPRENTICE IDENTIFICATION FORM
          ============================================================== */}
      {stage === 'identification' && (
        <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-10 shadow-lg">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-[#39A900] dark:text-[#44C600] mb-1">
                <User className="w-7 h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Ingreso de Datos del Aprendiz
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Por seguridad y validez académica, tus respuestas y tiempos quedarán vinculados de forma única a tu número de identificación en la base institucional.
              </p>
            </div>

            <form onSubmit={handleStartExam} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nombre Completo del Aprendiz <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                  }}
                  placeholder="Ej. Valentina Gómez Restrepo"
                  className={`w-full rounded-xl border bg-slate-50/60 dark:bg-[#152332] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-all ${
                    formErrors.name
                      ? 'border-rose-500 ring-1 ring-rose-500'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Tipo de Doc.
                  </label>
                  <select
                    value={formData.documentType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        documentType: e.target.value as ApprenticeProfile['documentType'],
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-[#152332] px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="CC">Cédula (C.C.)</option>
                    <option value="TI">Tarjeta (T.I.)</option>
                    <option value="CE">Cédula Ext. (C.E.)</option>
                    <option value="PEP">Permiso (P.E.P.)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Número de Documento <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.documentNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, documentNumber: e.target.value });
                      if (formErrors.documentNumber)
                        setFormErrors({ ...formErrors, documentNumber: undefined });
                    }}
                    placeholder="Ej. 1020304050"
                    className={`w-full rounded-xl border bg-slate-50/60 dark:bg-[#152332] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-all ${
                      formErrors.documentNumber
                        ? 'border-rose-500 ring-1 ring-rose-500'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {formErrors.documentNumber && (
                    <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.documentNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Regional SENA
                  </label>
                  <select
                    value={formData.regional}
                    onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-[#152332] px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    {SENA_REGIONALES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Ficha de Caracterización
                  </label>
                  <input
                    type="text"
                    value={formData.cohortNumber}
                    onChange={(e) => setFormData({ ...formData, cohortNumber: e.target.value })}
                    placeholder="Ej. 2894102"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-[#152332] px-3 py-2.5 text-xs sm:text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Programa de Formación
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-[#152332] px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  {POPULAR_PROGRAMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rules & gamification notice */}
              <div className="rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 p-4 text-xs space-y-1.5 text-emerald-950 dark:text-emerald-200">
                <div className="font-extrabold flex items-center gap-1.5 text-[#39A900] dark:text-[#44C600]">
                  <Sparkles className="w-4 h-4" />
                  <span>Dinámica de Evaluación y Ranking Gamificado:</span>
                </div>
                <p className="leading-relaxed">
                  • <strong>20 Preguntas en Total:</strong> 5 de Símbolos, 5 de Modelo FPI, 5 de Reglamento (Acuerdo 0009/2024) y 5 de Ecosistema.
                </p>
                <p className="leading-relaxed">
                  • <strong>Retroalimentación Inmediata:</strong> Al responder recibirás refuerzo positivo o retroalimentación formativa con animación explicativa.
                </p>
                <p className="leading-relaxed">
                  • <strong>Reloj Cronómetro y Rachas:</strong> Acumularás bonificación por responder rápido y mantener rachas continuas sin fallar.
                </p>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-[#39A900] hover:bg-[#329400] text-white font-black text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Iniciar Evaluación y Activar Cronómetro</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ==============================================================
          STAGE 2: ACTIVE EXAM WITH GAMIFICATION, TIMER & FEEDBACK
          ============================================================== */}
      {stage === 'active_exam' && (
        <section className="space-y-6">
          {/* Top Live Status Bar: Learner Name, Timer, Streak, Points */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Learner Info */}
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Aprendiz</span>
                <span className="text-xs font-black text-slate-900 dark:text-white truncate block">
                  {formData.name.split(' ')[0]} {formData.name.split(' ')[1] || ''}
                </span>
              </div>
            </div>

            {/* Timer Counter */}
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 animate-pulse">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tiempo Transcurrido</span>
                <span className="text-sm font-black font-mono text-amber-600 dark:text-amber-400">
                  {formatTime(timeSpentSeconds)}
                </span>
              </div>
            </div>

            {/* Consecutive Streak */}
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] shadow-xs flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                  streak > 0
                    ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-500 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Flame className={`w-4 h-4 ${streak > 0 ? 'fill-rose-500' : ''}`} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Racha Actual</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {streak} <span className="text-[10px] font-normal text-slate-400">seguidas</span>
                </span>
              </div>
            </div>

            {/* Gamified Points */}
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-[#39A900] dark:text-[#44C600] flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 fill-[#39A900] dark:fill-[#44C600]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Puntos Ranking</span>
                <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {totalGamifiedPoints} pts
                </span>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-8 shadow-sm">
            {/* Header: Section badge & Question index */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#44C600] border border-emerald-200/50 dark:border-emerald-900/50">
                  {currentQuestion.sectionTitle}
                </span>
                <span className="text-xs text-slate-400 font-semibold">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {currentQuestion.category}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Pregunta <strong className="text-slate-900 dark:text-white font-bold">{currentQuestionIndex + 1}</strong> de {EVALUATION_QUESTIONS.length}
                <span className="ml-2 text-slate-400">({answeredCount} resueltas)</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
              <div
                className="bg-[#39A900] h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / EVALUATION_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>

            {/* Question title */}
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-relaxed mb-6">
              {currentQuestion.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const showResult = showExplanation;
                let optionStyle =
                  'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#152332] text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700';

                if (showResult && isSelected) {
                  optionStyle = opt.isCorrect
                    ? 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 font-semibold ring-2 ring-emerald-500/30'
                    : 'border-rose-400 bg-rose-50/90 dark:bg-rose-950/80 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/30';
                } else if (showResult && opt.isCorrect) {
                  optionStyle =
                    'border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl text-left border transition-all text-xs sm:text-sm cursor-pointer disabled:cursor-default ${optionStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 transition-colors ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-[#39A900] text-white shadow-xs'
                              : 'bg-rose-500 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {opt.id.toUpperCase()}
                      </span>
                      <span className="leading-relaxed flex-1">{opt.text}</span>
                      {showResult && isSelected && (
                        <span className="shrink-0 mt-0.5">
                          {opt.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                          )}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ==============================================================
                DYNAMIC FEEDBACK WITH ANIMATION (Positive vs Error reinforcement)
                ============================================================== */}
            {showExplanation && (
              <div
                className={`rounded-2xl p-5 mb-6 border transition-all duration-300 transform ${
                  feedbackAnimation === 'correct'
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/70 dark:to-teal-950/50 border-emerald-400 animate-in fade-in zoom-in-95'
                    : 'bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/70 dark:to-amber-950/50 border-rose-400 animate-in fade-in zoom-in-95'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white ${
                      currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect
                        ? 'bg-[#39A900] shadow-md shadow-emerald-500/20'
                        : 'bg-rose-500 shadow-md shadow-rose-500/20'
                    }`}
                  >
                    {currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
                      <Sparkles className="w-5 h-5" />
                    ) : (
                      <Lightbulb className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-black uppercase tracking-wider ${
                          currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-rose-700 dark:text-rose-400'
                        }`}
                      >
                        {currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect
                          ? '¡Refuerzo Positivo! Respuesta Correcta'
                          : 'Retroalimentación de Refuerzo: ¡Identifica en qué fallaste!'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                      {currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect
                        ? currentQuestion.positiveFeedback
                        : currentQuestion.errorFeedback}
                    </p>

                    <div className="pt-2 text-[11px] text-slate-600 dark:text-slate-300 border-t border-slate-200/60 dark:border-slate-800/80 mt-2">
                      <strong className="text-slate-900 dark:text-white mr-1">Fundamento Formativo:</strong>
                      {currentQuestion.explanation}
                      {currentQuestion.referenceRule && (
                        <span className="block mt-1 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                          Norma: {currentQuestion.referenceRule}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-5">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                ← Anterior
              </button>

              <div className="flex items-center gap-2">
                {currentQuestionIndex < EVALUATION_QUESTIONS.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-slate-800 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Siguiente Pregunta</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishExam}
                    disabled={answeredCount < EVALUATION_QUESTIONS.length}
                    className="flex items-center gap-2 rounded-xl bg-[#39A900] px-6 py-2.5 text-xs font-black text-white hover:bg-[#329400] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Finalizar y Publicar en Ranking</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==============================================================
          STAGE 3: FINAL RESULTS, GAMIFICATION RANKING & ACTIONS
          ============================================================== */}
      {stage === 'results' && (
        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 sm:p-10 shadow-lg text-center">
            <div className="max-w-xl mx-auto space-y-5">
              <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center font-bold shadow-lg">
                {calculatedScore >= 80 ? (
                  <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#44C600] flex items-center justify-center">
                    <Award className="w-12 h-12" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-3xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <RotateCcw className="w-10 h-10" />
                  </div>
                )}
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Resultado Oficial de Inducción
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {calculatedScore >= 80
                    ? '¡Felicitaciones! Has Aprobado la Inducción SENA'
                    : 'Resultado: Por Mejorar (D)'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Aprendiz: <strong className="text-slate-800 dark:text-slate-200">{formData.name}</strong> • Doc: {formData.documentNumber}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1721] border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Calificación</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {calculatedScore}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {Math.round((calculatedScore / 100) * EVALUATION_QUESTIONS.length)} / {EVALUATION_QUESTIONS.length} aciertos
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Tiempo Total</span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                    {formatTime(timeSpentSeconds)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Cronómetro oficial</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Puntos Gamificados</span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-500 font-mono">
                    {totalGamifiedPoints}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Puntaje Honor</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {calculatedScore >= 80
                  ? 'Tus resultados han sido registrados de forma segura y consolidados para el reporte en Google Sheets del Administrador. ¡Ya puedes consultar tu Certificado Institucional!'
                  : 'Para obtener tu certificación debes alcanzar como mínimo el 80% (16 de 20 aciertos). Puedes repasar los módulos y volver a presentar la evaluación.'}
              </p>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                {calculatedScore >= 80 ? (
                  <>
                    <button
                      onClick={onGoToCertificate}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#39A900] hover:bg-[#329400] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                    >
                      <Award className="w-4 h-4" />
                      <span>Ver Mi Certificado SENA</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                    <button
                      onClick={() => setShowRankingModal(true)}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121E2B] text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span>Ver Mi Posición en el Ranking</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleRetakeExam}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reintentar Evaluación</span>
                    </button>
                    <button
                      onClick={() => setShowRankingModal(true)}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121E2B] text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span>Ver Tabla de Clasificación</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==============================================================
          MODAL: GAMIFIED RANKING TABLE OF HONOR
          ============================================================== */}
      {showRankingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#121E2B] shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/70 text-amber-500 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Ranking Gamificado de Inducción
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Clasificación de aprendices basada en precisión, menor tiempo y respuestas sin errores.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowRankingModal(false)}
                className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto my-4 border border-slate-100 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-[#0E1721] border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400">
                    <th className="py-3 px-3 text-center">Puesto</th>
                    <th className="py-3 px-3">Aprendiz</th>
                    <th className="py-3 px-3">Programa / Ficha</th>
                    <th className="py-3 px-3 text-center">Calificación</th>
                    <th className="py-3 px-3 text-center">Tiempo</th>
                    <th className="py-3 px-3 text-right">Puntos Honor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {sortedRanking.map((rec, index) => {
                    const isCurrentLearner =
                      rec.documentNumber.trim() === formData.documentNumber.trim();
                    return (
                      <tr
                        key={rec.id}
                        className={`transition-colors ${
                          isCurrentLearner
                            ? 'bg-emerald-50/80 dark:bg-emerald-950/50 font-bold'
                            : 'hover:bg-slate-50/60 dark:hover:bg-[#152332]'
                        }`}
                      >
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          {index === 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-black text-xs shadow-xs">
                              🥇
                            </span>
                          ) : index === 1 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-900 font-black text-xs shadow-xs">
                              🥈
                            </span>
                          ) : index === 2 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700/60 text-white font-black text-xs shadow-xs">
                              🥉
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono font-bold">#{index + 1}</span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{rec.name}</span>
                            {isCurrentLearner && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#39A900] text-white uppercase font-black">
                                Tú
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Doc: {rec.documentType} {rec.documentNumber}
                          </span>
                        </td>
                        <td className="py-3 px-3 max-w-[200px]">
                          <span className="block truncate text-slate-700 dark:text-slate-300">
                            {rec.program}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Ficha: {rec.cohortNumber}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-black text-emerald-600 dark:text-emerald-400">
                          {rec.score}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-slate-600 dark:text-slate-300">
                          {rec.timeSpentSeconds ? formatTime(rec.timeSpentSeconds) : '02:15'}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-black text-amber-500">
                          {rec.gamifiedScore || parseInt(rec.score.replace(/\D/g, '') || '0', 10) * 12} pts
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>El ranking se actualiza en tiempo real con cada inducción culminada.</span>
              <button
                onClick={() => setShowRankingModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs"
              >
                Cerrar Ranking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
