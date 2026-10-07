import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { ApprenticeProfile } from '../types/induction';

export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach((scope) => provider.addScope(scope));

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export interface SpreadsheetInfo {
  spreadsheetId: string;
  name: string;
  webViewLink: string;
  sheetName: string;
}

export interface ApprenticeInductionRecord {
  timestamp: string;
  documentNumber: string;
  documentType: string;
  name: string;
  regional: string;
  center: string;
  program: string;
  programLevel: string;
  cohortNumber: string;
  status: string;
  score: string;
  verificationCode: string;
}

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: unknown) {
    console.error('Error durante el inicio de sesión con Google:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

const SHEET_TITLE = 'Registro de Aprendices - Inducción SENA';
const TAB_NAME = 'Aprendices Inducción';

export const findOrCreateSpreadsheet = async (token: string): Promise<SpreadsheetInfo> => {
  // 1. Check if spreadsheet exists in Drive
  const query = encodeURIComponent(`name='${SHEET_TITLE}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`);
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (searchRes.ok) {
    const searchData = await searchRes.json();
    if (searchData.files && searchData.files.length > 0) {
      const existing = searchData.files[0];
      return {
        spreadsheetId: existing.id,
        name: existing.name,
        webViewLink: existing.webViewLink || `https://docs.google.com/spreadsheets/d/${existing.id}/edit`,
        sheetName: TAB_NAME,
      };
    }
  }

  // 2. Create new spreadsheet with styled headers
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: SHEET_TITLE,
      },
      sheets: [
        {
          properties: {
            title: TAB_NAME,
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Marca Temporal' } },
                    { userEnteredValue: { stringValue: 'Documento' } },
                    { userEnteredValue: { stringValue: 'Tipo Doc' } },
                    { userEnteredValue: { stringValue: 'Nombre Completo' } },
                    { userEnteredValue: { stringValue: 'Regional' } },
                    { userEnteredValue: { stringValue: 'Centro de Formación' } },
                    { userEnteredValue: { stringValue: 'Programa de Formación' } },
                    { userEnteredValue: { stringValue: 'Nivel' } },
                    { userEnteredValue: { stringValue: 'Ficha' } },
                    { userEnteredValue: { stringValue: 'Estado Inducción' } },
                    { userEnteredValue: { stringValue: 'Puntaje (%)' } },
                    { userEnteredValue: { stringValue: 'Código de Certificado' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => ({}));
    throw new Error(errData?.error?.message || 'Error al crear la hoja de cálculo en Google Drive');
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;

  // Retrieve webViewLink
  let webViewLink = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  const fileRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${spreadsheetId}?fields=id,name,webViewLink`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (fileRes.ok) {
    const fileData = await fileRes.json();
    if (fileData.webViewLink) webViewLink = fileData.webViewLink;
  }

  return {
    spreadsheetId,
    name: SHEET_TITLE,
    webViewLink,
    sheetName: TAB_NAME,
  };
};

export const appendApprenticeRecord = async (
  token: string,
  profile: ApprenticeProfile,
  score: number,
  verificationCode: string
): Promise<{ spreadsheet: SpreadsheetInfo; record: ApprenticeInductionRecord }> => {
  const spreadsheet = await findOrCreateSpreadsheet(token);

  const timestamp = new Date().toLocaleString('es-CO', {
    dateStyle: 'short',
    timeStyle: 'medium',
  });

  const record: ApprenticeInductionRecord = {
    timestamp,
    documentNumber: profile.documentNumber || 'Sin número',
    documentType: profile.documentType || 'CC',
    name: profile.name || 'Aprendiz',
    regional: profile.regional || 'N/A',
    center: profile.center || 'N/A',
    program: profile.program || 'N/A',
    programLevel: profile.programLevel || 'Tecnólogo',
    cohortNumber: profile.cohortNumber || 'N/A',
    status: 'APROBADO',
    score: `${score}%`,
    verificationCode,
  };

  const rowValues = [
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
  ];

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
        values: [rowValues],
      }),
    }
  );

  if (!appendRes.ok) {
    const errData = await appendRes.json().catch(() => ({}));
    throw new Error(errData?.error?.message || 'Error al guardar el registro en Google Sheets');
  }

  return { spreadsheet, record };
};

export const fetchApprenticeRecords = async (
  token: string,
  spreadsheetId: string,
  sheetName: string = TAB_NAME
): Promise<ApprenticeInductionRecord[]> => {
  const range = encodeURIComponent(`'${sheetName}'!A2:L1000`);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  const rows: string[][] = data.values || [];

  return rows.map((row) => ({
    timestamp: row[0] || '',
    documentNumber: row[1] || '',
    documentType: row[2] || '',
    name: row[3] || '',
    regional: row[4] || '',
    center: row[5] || '',
    program: row[6] || '',
    programLevel: row[7] || '',
    cohortNumber: row[8] || '',
    status: row[9] || '',
    score: row[10] || '',
    verificationCode: row[11] || '',
  }));
};
