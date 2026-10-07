import React, { useState } from 'react';
import { X, CheckCircle, GraduationCap } from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';
import { SENA_REGIONALES, POPULAR_PROGRAMS } from '../data/senaData';

interface ApprenticeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  onSave: (profile: ApprenticeProfile) => void;
}

export const ApprenticeProfileModal: React.FC<ApprenticeProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#121E2B] p-6 shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#44C600] flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5 text-[#39A900] dark:text-[#44C600]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ficha del Aprendiz SENA</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Datos institucionales para personalizar tu inducción y tu certificado oficial.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Nombre Completo del Aprendiz *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej. Valentina Gómez Restrepo"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:border-[#39A900] dark:focus:border-[#44C600] focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tipo Doc.</label>
              <select
                value={formData.documentType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    documentType: e.target.value as ApprenticeProfile['documentType'],
                  })
                }
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:border-[#39A900] focus:outline-none"
              >
                <option value="CC">Cédula (C.C.)</option>
                <option value="TI">Tarjeta (T.I.)</option>
                <option value="CE">Cédula Ext. (C.E.)</option>
                <option value="PEP">Permiso (P.E.P.)</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Número de Identificación *
              </label>
              <input
                type="text"
                required
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                placeholder="Ej. 1020304050"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:border-[#39A900] focus:outline-none focus:ring-1 focus:ring-[#39A900]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Regional SENA</label>
              <select
                value={formData.regional}
                onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:border-[#39A900] focus:outline-none"
              >
                {SENA_REGIONALES.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Número de Ficha de Caracterización
              </label>
              <input
                type="text"
                required
                value={formData.cohortNumber}
                onChange={(e) => setFormData({ ...formData, cohortNumber: e.target.value })}
                placeholder="Ej. 2894102"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:border-[#39A900] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nivel</label>
              <select
                value={formData.programLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    programLevel: e.target.value as ApprenticeProfile['programLevel'],
                  })
                }
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:border-[#39A900] focus:outline-none"
              >
                <option value="Tecnólogo">Tecnólogo</option>
                <option value="Técnico">Técnico</option>
                <option value="Operario">Operario</option>
                <option value="Especialización Tecnológica">Especialización Tecnológica</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Centro de Formación
              </label>
              <input
                type="text"
                value={formData.center}
                onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                placeholder="Ej. Centro de Servicios y Gestión"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:border-[#39A900] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Programa de Formación
            </label>
            <input
              type="text"
              list="popular-programs"
              value={formData.program}
              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              placeholder="Escribe o selecciona tu programa"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#152332] px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:border-[#39A900] focus:outline-none"
            />
            <datalist id="popular-programs">
              {POPULAR_PROGRAMS.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-[#39A900] dark:bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-[#329400] dark:hover:bg-emerald-500 transition-colors shadow-xs"
            >
              <CheckCircle className="w-4 h-4" />
              Guardar y Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
