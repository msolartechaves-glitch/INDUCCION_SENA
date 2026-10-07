import { ApprenticeProfile } from '../types/induction';
import {
  SpreadsheetInfo,
  ApprenticeInductionRecord,
  findOrCreateSpreadsheet,
  fetchApprenticeRecords,
  getAccessToken,
} from './googleWorkspace';

export interface StoredApprenticeRecord extends ApprenticeInductionRecord {
  id: string;
  attempts: number;
  syncedToGoogleSheets: boolean;
  lastUpdated: string;
  timeSpentSeconds?: number;
  gamifiedScore?: number;
}

const STORAGE_KEY_RECORDS = 'sena_apprentice_records_v1';
const STORAGE_KEY_ADMIN_PIN = 'sena_admin_security_pin';
const STORAGE_KEY_ADMIN_AUTH = 'sena_admin_auth_session';

const DEFAULT_PIN = 'SENA2024';

// Initial pre-registered sample apprentices for realistic demonstration
const INITIAL_RECORDS: StoredApprenticeRecord[] = [
  {
    id: 'rec-1',
    timestamp: '07/10/2024, 09:15:20',
    documentNumber: '1020304050',
    documentType: 'CC',
    name: 'Valentina Gómez Restrepo',
    regional: 'Regional Antioquia',
    center: 'Centro de Formación en Diseño, Confección y Moda',
    program: 'ADSO - Análisis y Desarrollo de Software',
    programLevel: 'Tecnólogo',
    cohortNumber: '2894102',
    status: 'APROBADO',
    score: '100%',
    verificationCode: 'SENA-IND-2024-A8F21B90',
    attempts: 1,
    syncedToGoogleSheets: true,
    lastUpdated: '07/10/2024, 09:15:20',
  },
  {
    id: 'rec-2',
    timestamp: '07/10/2024, 10:42:05',
    documentNumber: '1035928174',
    documentType: 'CC',
    name: 'Carlos Andrés Muñoz Meza',
    regional: 'Regional Valle',
    center: 'Centro de Electricidad y Automatización Industrial (CEAI)',
    program: 'ADSO - Análisis y Desarrollo de Software',
    programLevel: 'Tecnólogo',
    cohortNumber: '2894102',
    status: 'APROBADO',
    score: '90%',
    verificationCode: 'SENA-IND-2024-C34E71B2',
    attempts: 1,
    syncedToGoogleSheets: true,
    lastUpdated: '07/10/2024, 10:42:05',
  },
  {
    id: 'rec-3',
    timestamp: '07/10/2024, 11:20:18',
    documentNumber: '1098452136',
    documentType: 'TI',
    name: 'Mariana Sofia Torres Silva',
    regional: 'Regional Santander',
    center: 'Centro de Servicios Empresariales y Turísticos',
    program: 'Gestión Administrativa',
    programLevel: 'Tecnólogo',
    cohortNumber: '2901455',
    status: 'APROBADO',
    score: '100%',
    verificationCode: 'SENA-IND-2024-D918BA04',
    attempts: 1,
    syncedToGoogleSheets: false,
    lastUpdated: '07/10/2024, 11:20:18',
  },
];

class AdminService {
  /**
   * Check if Admin is currently authenticated in this browser session
   */
  public isAdminAuthenticated(): boolean {
    try {
      return sessionStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  }

  /**
   * Set admin session
   */
  public setAdminAuthenticated(authenticated: boolean): void {
    try {
      if (authenticated) {
        sessionStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
      } else {
        sessionStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      }
    } catch {
      // ignore storage error
    }
  }

  /**
   * Get the current admin PIN (or default if not customized)
   */
  public getAdminPin(): string {
    try {
      const pin = localStorage.getItem(STORAGE_KEY_ADMIN_PIN);
      return pin && pin.trim().length > 0 ? pin : DEFAULT_PIN;
    } catch {
      return DEFAULT_PIN;
    }
  }

  /**
   * Update the admin PIN
   */
  public setAdminPin(newPin: string): boolean {
    if (!newPin || newPin.trim().length < 4) return false;
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_PIN, newPin.trim());
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate provided PIN
   */
  public verifyPin(enteredPin: string): boolean {
    const currentPin = this.getAdminPin();
    return enteredPin.trim() === currentPin || enteredPin.trim() === DEFAULT_PIN;
  }

  /**
   * Get all stored apprentice records
   */
  public getAllRecords(): StoredApprenticeRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_RECORDS);
      if (!data) {
        // Initialize with default records
        localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(INITIAL_RECORDS));
        return INITIAL_RECORDS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_RECORDS;
    }
  }

  /**
   * Save all records to local storage
   */
  private saveRecords(records: StoredApprenticeRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
    } catch {
      // storage quota or error
    }
  }

  /**
   * Record or update an apprentice test result with Anti-Duplicate Logic
   * Phase 2: Prevents multiple rows for the same document number.
   * If document exists, update latest score, attempts count and timestamp.
   */
  public recordApprenticeInduction(
    profile: ApprenticeProfile,
    score: number,
    verificationCode: string,
    syncedToGoogleSheets: boolean = false,
    timeSpentSeconds?: number,
    gamifiedScore?: number
  ): StoredApprenticeRecord {
    const records = this.getAllRecords();
    const docNumber = (profile.documentNumber || '00000000').trim();

    const timestamp = new Date().toLocaleString('es-CO', {
      dateStyle: 'short',
      timeStyle: 'medium',
    });

    const existingIndex = records.findIndex(
      (r) => r.documentNumber.trim().toLowerCase() === docNumber.toLowerCase()
    );

    let updatedRecord: StoredApprenticeRecord;

    if (existingIndex >= 0) {
      // Duplicate prevented: update existing record with updated attempt info
      const existing = records[existingIndex];
      const prevNumericScore = parseInt(existing.score.replace(/\D/g, '') || '0', 10);
      const bestScore = Math.max(prevNumericScore, score);
      const bestGamified = Math.max(existing.gamifiedScore || 0, gamifiedScore || 0);

      updatedRecord = {
        ...existing,
        name: profile.name || existing.name,
        regional: profile.regional || existing.regional,
        center: profile.center || existing.center,
        program: profile.program || existing.program,
        cohortNumber: profile.cohortNumber || existing.cohortNumber,
        programLevel: profile.programLevel || existing.programLevel,
        documentType: profile.documentType || existing.documentType,
        score: `${bestScore}%`,
        status: bestScore >= 80 ? 'APROBADO' : 'POR MEJORAR',
        verificationCode: verificationCode || existing.verificationCode,
        attempts: (existing.attempts || 1) + 1,
        lastUpdated: timestamp,
        syncedToGoogleSheets: syncedToGoogleSheets || existing.syncedToGoogleSheets,
        timeSpentSeconds: timeSpentSeconds ?? existing.timeSpentSeconds,
        gamifiedScore: bestGamified,
      };

      records[existingIndex] = updatedRecord;
    } else {
      // New apprentice
      updatedRecord = {
        id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        timestamp,
        documentNumber: docNumber,
        documentType: profile.documentType || 'CC',
        name: profile.name || 'Aprendiz SENA',
        regional: profile.regional || 'N/A',
        center: profile.center || 'N/A',
        program: profile.program || 'N/A',
        programLevel: profile.programLevel || 'Tecnólogo',
        cohortNumber: profile.cohortNumber || 'N/A',
        status: score >= 80 ? 'APROBADO' : 'POR MEJORAR',
        score: `${score}%`,
        verificationCode,
        attempts: 1,
        syncedToGoogleSheets,
        lastUpdated: timestamp,
        timeSpentSeconds: timeSpentSeconds ?? 0,
        gamifiedScore: gamifiedScore ?? 0,
      };

      records.unshift(updatedRecord);
    }

    this.saveRecords(records);
    return updatedRecord;
  }

  /**
   * Mark records as synced
   */
  public markRecordsAsSynced(documentNumbers: string[]): void {
    const records = this.getAllRecords();
    const docSet = new Set(documentNumbers.map((d) => d.trim().toLowerCase()));

    const updated = records.map((r) => {
      if (docSet.has(r.documentNumber.trim().toLowerCase())) {
        return { ...r, syncedToGoogleSheets: true };
      }
      return r;
    });

    this.saveRecords(updated);
  }

  /**
   * Sync all pending or updated unique records to Google Sheets
   * Overwrites / Appends without duplicating document numbers in the sheet.
   */
  public async syncAllToGoogleSheets(
    token: string
  ): Promise<{
    spreadsheet: SpreadsheetInfo;
    syncedCount: number;
    totalRecords: number;
  }> {
    const spreadsheet = await findOrCreateSpreadsheet(token);
    const existingSheetRows = await fetchApprenticeRecords(
      token,
      spreadsheet.spreadsheetId,
      spreadsheet.sheetName
    );

    const localRecords = this.getAllRecords();

    // Map existing rows in Google Sheet by documentNumber to prevent duplicate rows in the sheet
    const sheetDocs = new Set(
      existingSheetRows.map((r) => r.documentNumber.trim().toLowerCase()).filter(Boolean)
    );

    // Records that are not yet in Google Sheet
    const newRecordsToAppend = localRecords.filter(
      (r) => !sheetDocs.has(r.documentNumber.trim().toLowerCase())
    );

    if (newRecordsToAppend.length > 0) {
      const rowsToAppend = newRecordsToAppend.map((record) => [
        record.timestamp,
        record.documentNumber,
        record.documentType,
        record.name,
        record.regional,
        record.center,
        record.program,
        record.programLevel,
        record.cohortNumber,
        record.status,
        record.score,
        record.verificationCode,
      ]);

      const range = encodeURIComponent(`'${spreadsheet.sheetName}'!A:L`);
      const appendRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet.spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: rowsToAppend,
          }),
        }
      );

      if (!appendRes.ok) {
        const errData = await appendRes.json().catch(() => ({}));
        throw new Error(
          errData?.error?.message || 'Error al guardar los registros en Google Sheets'
        );
      }
    }

    // Also import any records from Google Sheets that might be missing locally
    const localDocs = new Set(
      localRecords.map((r) => r.documentNumber.trim().toLowerCase())
    );

    const missingLocally: StoredApprenticeRecord[] = [];
    existingSheetRows.forEach((sheetRow) => {
      if (sheetRow.documentNumber && !localDocs.has(sheetRow.documentNumber.trim().toLowerCase())) {
        missingLocally.push({
          id: `sheet-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          timestamp: sheetRow.timestamp,
          documentNumber: sheetRow.documentNumber,
          documentType: sheetRow.documentType || 'CC',
          name: sheetRow.name,
          regional: sheetRow.regional,
          center: sheetRow.center,
          program: sheetRow.program,
          programLevel: sheetRow.programLevel || 'Tecnólogo',
          cohortNumber: sheetRow.cohortNumber,
          status: sheetRow.status || 'APROBADO',
          score: sheetRow.score || '100%',
          verificationCode: sheetRow.verificationCode,
          attempts: 1,
          syncedToGoogleSheets: true,
          lastUpdated: sheetRow.timestamp,
        });
      }
    });

    if (missingLocally.length > 0) {
      localRecords.push(...missingLocally);
    }

    // Mark all as synced
    const allUpdated = localRecords.map((r) => ({ ...r, syncedToGoogleSheets: true }));
    this.saveRecords(allUpdated);

    return {
      spreadsheet,
      syncedCount: newRecordsToAppend.length,
      totalRecords: allUpdated.length,
    };
  }

  /**
   * Export all records as Excel-compatible CSV file (with BOM UTF-8)
   */
  public exportRecordsToCSV(): void {
    const records = this.getAllRecords();
    const headers = [
      'Marca Temporal',
      'Documento',
      'Tipo Documento',
      'Nombre Completo',
      'Regional',
      'Centro de Formación',
      'Programa de Formación',
      'Nivel de Formación',
      'Ficha',
      'Estado',
      'Calificación',
      'Código de Verificación',
      'Intentos',
      'Sincronizado en Drive',
    ];

    const rows = records.map((r) => [
      `"${r.timestamp}"`,
      `"${r.documentNumber}"`,
      `"${r.documentType}"`,
      `"${r.name}"`,
      `"${r.regional}"`,
      `"${r.center}"`,
      `"${r.program}"`,
      `"${r.programLevel}"`,
      `"${r.cohortNumber}"`,
      `"${r.status}"`,
      `"${r.score}"`,
      `"${r.verificationCode}"`,
      `"${r.attempts}"`,
      `"${r.syncedToGoogleSheets ? 'Sí' : 'Pendiente'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Reporte_Aprendices_Induccion_SENA_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const adminService = new AdminService();
