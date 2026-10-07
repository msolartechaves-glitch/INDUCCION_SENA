import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  FileSpreadsheet,
  ExternalLink,
  Download,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  Users,
  LogOut,
  Sliders,
  Check,
  Eye,
  EyeOff,
  UserCheck,
  Layers,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  adminService,
  StoredApprenticeRecord,
} from '../services/adminService';
import {
  googleSignIn,
  logoutGoogle,
  findOrCreateSpreadsheet,
  SpreadsheetInfo,
  initAuth,
} from '../services/googleWorkspace';
import { sound } from '../utils/audio';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onAdminAuthChange: (auth: boolean) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onAdminAuthChange,
}) => {
  // Authentication states
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [showPin, setShowPin] = useState<boolean>(false);

  // Change PIN modal state
  const [isChangingPin, setIsChangingPin] = useState<boolean>(false);
  const [newPin, setNewPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [changePinError, setChangePinError] = useState<string | null>(null);
  const [changePinSuccess, setChangePinSuccess] = useState<boolean>(false);

  // Google Workspace state
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState<boolean>(false);
  const [spreadsheet, setSpreadsheet] = useState<SpreadsheetInfo | null>(null);

  // Records and operations state
  const [records, setRecords] = useState<StoredApprenticeRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'APROBADO' | 'PENDING_SYNC'>('ALL');
  const [isSyncingSheets, setIsSyncingSheets] = useState<boolean>(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Load records and authenticate listener
  useEffect(() => {
    if (isOpen) {
      setRecords(adminService.getAllRecords());
    }
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
        // Find existing spreadsheet info quietly
        findOrCreateSpreadsheet(token)
          .then((s) => setSpreadsheet(s))
          .catch(() => {});
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  // Handle PIN Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);

    if (adminService.verifyPin(pinInput)) {
      adminService.setAdminAuthenticated(true);
      onAdminAuthChange(true);
      setPinInput('');
      sound.playSuccess();
    } else {
      setPinError('El PIN ingresado es incorrecto. Intente con el PIN predeterminado: SENA2024');
      sound.playWarning();
    }
  };

  // Handle Admin Logout
  const handleAdminLogout = () => {
    adminService.setAdminAuthenticated(false);
    onAdminAuthChange(false);
    sound.playTone(320, 0.1);
  };

  // Google Login for Admin
  const handleGoogleSignIn = async () => {
    setIsLoggingInGoogle(true);
    setSyncStatusMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
        const sheet = await findOrCreateSpreadsheet(res.accessToken);
        setSpreadsheet(sheet);
        sound.playSuccess();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al conectar con Google';
      setSyncStatusMsg({ text: msg, type: 'error' });
      sound.playWarning();
    } finally {
      setIsLoggingInGoogle(false);
    }
  };

  // Google Logout
  const handleGoogleLogout = async () => {
    try {
      await logoutGoogle();
      setGoogleUser(null);
      setGoogleToken(null);
      setSpreadsheet(null);
    } catch {
      // ignore
    }
  };

  // Synchronize all records to Google Sheets
  const handleSyncToSheets = async () => {
    if (!googleToken) {
      setSyncStatusMsg({
        text: 'Debes conectar tu cuenta de Google del administrador para sincronizar con Drive.',
        type: 'error',
      });
      return;
    }

    setIsSyncingSheets(true);
    setSyncStatusMsg(null);

    try {
      const result = await adminService.syncAllToGoogleSheets(googleToken);
      setSpreadsheet(result.spreadsheet);
      setRecords(adminService.getAllRecords());
      setSyncStatusMsg({
        text: `¡Sincronización completada! ${result.syncedCount} registro(s) actualizados en Google Sheets sin duplicados.`,
        type: 'success',
      });
      sound.playSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al sincronizar con Google Sheets';
      setSyncStatusMsg({ text: msg, type: 'error' });
      sound.playWarning();
    } finally {
      setIsSyncingSheets(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    adminService.exportRecordsToCSV();
    sound.playTone(550, 0.1);
  };

  // Save new PIN
  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePinError(null);

    if (newPin.length < 4) {
      setChangePinError('El PIN debe tener al menos 4 caracteres.');
      return;
    }
    if (newPin !== confirmPin) {
      setChangePinError('Los PINs ingresados no coinciden.');
      return;
    }

    if (adminService.setAdminPin(newPin)) {
      setChangePinSuccess(true);
      sound.playSuccess();
      setTimeout(() => {
        setIsChangingPin(false);
        setChangePinSuccess(false);
        setNewPin('');
        setConfirmPin('');
      }, 1500);
    } else {
      setChangePinError('No se pudo guardar el nuevo PIN.');
    }
  };

  // Filtered records
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.documentNumber.includes(searchTerm) ||
      r.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cohortNumber.includes(searchTerm) ||
      r.regional.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus === 'APROBADO') return r.status === 'APROBADO';
    if (filterStatus === 'PENDING_SYNC') return !r.syncedToGoogleSheets;
    return true;
  });

  // Calculate KPIs
  const totalRecords = records.length;
  const approvedRecords = records.filter((r) => r.status === 'APROBADO').length;
  const pendingSyncCount = records.filter((r) => !r.syncedToGoogleSheets).length;
  const averageScore =
    totalRecords > 0
      ? Math.round(
          records.reduce((acc, r) => acc + parseInt(r.score.replace(/\D/g, '') || '0', 10), 0) /
            totalRecords
        )
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/65 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50/90 dark:bg-[#0E1721]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00324D] text-[#39A900] dark:text-[#44C600] flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#00324D] dark:text-emerald-400">
                  SENA · Coordinación e Instrucción
                </span>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                    <Unlock className="w-2.5 h-2.5" /> Administrador Activo
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Panel de Control Administrativo
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={handleAdminLogout}
                title="Cerrar sesión de administrador"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/40 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {!isAdmin ? (
            /* ========================================================= */
            /* GATEKEEPER / AUTHENTICATION VIEW                          */
            /* ========================================================= */
            <div className="max-w-md mx-auto py-6 space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 dark:bg-emerald-950/70 text-[#00324D] dark:text-[#44C600] flex items-center justify-center shadow-md">
                <Lock className="w-8 h-8 text-[#39A900] dark:text-[#44C600]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Acceso Restringido para Instructores
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Por seguridad de la información y privacidad de los aprendices, la base de datos de respuestas y el enlace a la hoja de cálculo de Google Drive son confidenciales. Ingrese su PIN de administración para acceder.
                </p>
              </div>

              {/* PIN Form */}
              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider block">
                    PIN de Seguridad del Administrador
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPin ? 'text' : 'password'}
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setPinError(null);
                      }}
                      placeholder="Ingrese PIN..."
                      autoFocus
                      className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] text-slate-900 dark:text-white text-sm font-mono tracking-widest placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {pinError && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{pinError}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#39A900] hover:bg-[#329400] text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  Verificar y Abrir Panel
                </button>
              </form>

              {/* Security Hint */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1721] text-xs text-slate-600 dark:text-slate-400 space-y-1 text-left">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#39A900]" />
                  <span>Protección institucional activa:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  PIN predeterminado para el prototipo: <code className="font-mono font-bold bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-emerald-700 dark:text-emerald-400">SENA2024</code>. Podrá cambiarlo en cualquier momento dentro de este panel.
                </p>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* AUTHENTICATED ADMINISTRATOR DASHBOARD                     */
            /* ========================================================= */
            <div className="space-y-6">
              {/* Google Drive Secure Admin Callout (THE PROTECTED DRIVE ACCESS) */}
              <div className="rounded-2xl border-2 border-[#39A900]/40 dark:border-[#39A900]/60 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#152332] border border-emerald-300 dark:border-emerald-700 text-[#39A900] dark:text-[#44C600] flex items-center justify-center shadow-xs shrink-0">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#39A900] dark:text-[#44C600]">
                          Acceso Seguro a Google Drive · Privado del Administrador
                        </span>
                        <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded font-mono">
                          No visible para aprendices
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        Hoja de Cálculo: «Registro de Aprendices - Inducción SENA»
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {googleUser ? (
                          <>Conectado con cuenta Google: <strong className="text-slate-800 dark:text-slate-100">{googleUser.email}</strong></>
                        ) : (
                          'Conecta tu cuenta de Google del administrador para sincronizar en la nube.'
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Private Admin Actions */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {googleUser && spreadsheet?.webViewLink && (
                      <a
                        href={spreadsheet.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Abrir Hoja en Drive</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {!googleUser ? (
                      <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoggingInGoogle}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1a2838] hover:bg-slate-50 dark:hover:bg-[#22354a] text-slate-800 dark:text-slate-100 text-xs font-bold shadow-xs transition-all disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>{isLoggingInGoogle ? 'Conectando...' : 'Conectar Google Drive'}</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleSyncToSheets}
                          disabled={isSyncingSheets}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#329400] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSheets ? 'animate-spin' : ''}`} />
                          <span>{isSyncingSheets ? 'Sincronizando...' : 'Sincronizar con Drive'}</span>
                        </button>

                        <button
                          onClick={handleGoogleLogout}
                          title="Desconectar cuenta Google"
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    <button
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] hover:bg-slate-50 dark:hover:bg-[#1a2838] text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-[#39A900]" />
                      <span>Exportar CSV / Excel</span>
                    </button>
                  </div>
                </div>

                {/* Status Message */}
                {syncStatusMsg && (
                  <div
                    className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                      syncStatusMsg.type === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                        : 'bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                    }`}
                  >
                    {syncStatusMsg.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#39A900]" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{syncStatusMsg.text}</span>
                  </div>
                )}
              </div>

              {/* KPI Metrics Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0E1721]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Total Aprendices</span>
                    <Users className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                    {totalRecords}
                  </div>
                  <span className="text-[10px] text-slate-500">Únicos por documento</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0E1721]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Aprobados</span>
                    <UserCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {approvedRecords}
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {totalRecords > 0 ? Math.round((approvedRecords / totalRecords) * 100) : 0}% tasa de aprobación
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0E1721]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Promedio General</span>
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="mt-2 text-2xl font-black text-blue-600 dark:text-blue-400">
                    {averageScore}%
                  </div>
                  <span className="text-[10px] text-slate-500">Calificación media</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0E1721]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Pendientes Drive</span>
                    <Layers className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400">
                    {pendingSyncCount}
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {pendingSyncCount === 0 ? 'Todo al día con Google' : 'Listos para sincronizar'}
                  </span>
                </div>
              </div>

              {/* Data Table with Anti-Duplicate indicator & Filters */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>Registro de Respuestas</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                        Antiduplicados Activo
                      </span>
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status filter */}
                    <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-[#0E1721] text-[11px] font-semibold">
                      <button
                        onClick={() => setFilterStatus('ALL')}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          filterStatus === 'ALL'
                            ? 'bg-white dark:bg-[#152332] text-slate-900 dark:text-white shadow-xs font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        Todos ({records.length})
                      </button>
                      <button
                        onClick={() => setFilterStatus('APROBADO')}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          filterStatus === 'APROBADO'
                            ? 'bg-white dark:bg-[#152332] text-emerald-700 dark:text-emerald-400 shadow-xs font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        Aprobados ({approvedRecords})
                      </button>
                      <button
                        onClick={() => setFilterStatus('PENDING_SYNC')}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          filterStatus === 'PENDING_SYNC'
                            ? 'bg-white dark:bg-[#152332] text-amber-700 dark:text-amber-400 shadow-xs font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        Pendientes ({pendingSyncCount})
                      </button>
                    </div>

                    {/* Search box */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar documento, nombre o ficha..."
                        className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#152332] text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#39A900] w-56 sm:w-64"
                      />
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1721]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-[#121E2B] text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">Fecha y Hora</th>
                        <th className="py-2.5 px-3">Aprendiz</th>
                        <th className="py-2.5 px-3">Documento</th>
                        <th className="py-2.5 px-3">Ficha / Programa</th>
                        <th className="py-2.5 px-3">Regional</th>
                        <th className="py-2.5 px-3">Puntaje</th>
                        <th className="py-2.5 px-3">Tiempo / Gamificación</th>
                        <th className="py-2.5 px-3">Código Certificado</th>
                        <th className="py-2.5 px-3">Google Drive</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-xs text-slate-400">
                            No se encontraron aprendices con ese criterio de búsqueda.
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((rec) => (
                          <tr
                            key={rec.id}
                            className="hover:bg-slate-50/70 dark:hover:bg-[#152332] transition-colors"
                          >
                            <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 whitespace-nowrap text-[11px]">
                              {rec.timestamp}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <div className="font-bold text-slate-900 dark:text-white">{rec.name}</div>
                              {rec.attempts > 1 && (
                                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                                  {rec.attempts} intentos consolidados
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-mono text-[11px] whitespace-nowrap">
                              <span className="font-bold text-slate-400 text-[10px] mr-1">{rec.documentType}</span>
                              {rec.documentNumber}
                            </td>
                            <td className="py-2.5 px-3 max-w-[220px]">
                              <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                                {rec.program}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">Ficha #{rec.cohortNumber}</span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 whitespace-nowrap text-[11px]">
                              {rec.regional}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 font-mono font-extrabold text-emerald-700 dark:text-emerald-400">
                                {rec.score}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px]">
                              <div className="text-slate-800 dark:text-slate-200 flex items-center gap-1">
                                <span className="text-amber-500 font-bold">{rec.gamifiedScore || 1000} pts</span>
                              </div>
                              <span className="text-[10px] text-slate-400">
                                {rec.timeSpentSeconds
                                  ? `${Math.floor(rec.timeSpentSeconds / 60)
                                      .toString()
                                      .padStart(2, '0')}:${(rec.timeSpentSeconds % 60)
                                      .toString()
                                      .padStart(2, '0')}`
                                  : '02:15'}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                              {rec.verificationCode}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              {rec.syncedToGoogleSheets ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                                  <Check className="w-3 h-3" /> Sincronizado
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                                  Pendiente Drive
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Administrative Settings Footer Strip */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#39A900]" />
                  <span>Seguridad SENA: La hoja en Drive permanece 100% privada e inaccesible para los aprendices.</span>
                </div>

                <button
                  onClick={() => setIsChangingPin(true)}
                  className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#39A900] dark:hover:text-[#44C600] font-semibold underline underline-offset-4"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Cambiar PIN de Acceso de Administrador</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-3.5 bg-slate-50/80 dark:bg-[#0E1721] flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Servicio Nacional de Aprendizaje — SENA · Fase 1 y 2 de Seguridad
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
          >
            Cerrar Panel
          </button>
        </div>
      </div>

      {/* Change PIN Sub-Modal */}
      {isChangingPin && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121E2B] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[#39A900] flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Cambiar PIN de Administrador
                </h3>
              </div>
              <button
                onClick={() => setIsChangingPin(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewPin} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nuevo PIN (mínimo 4 caracteres)
                </label>
                <input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Ej. SENA9876"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Confirmar Nuevo PIN
                </label>
                <input
                  type="password"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="Repita el nuevo PIN"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>

              {changePinError && (
                <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs">
                  {changePinError}
                </div>
              )}

              {changePinSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#39A900]" /> PIN actualizado con éxito.
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsChangingPin(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#39A900] hover:bg-[#329400] text-white text-xs font-bold shadow-xs"
                >
                  Guardar PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
