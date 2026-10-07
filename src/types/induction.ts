export type ModuleId = 'simbolos' | 'modelo' | 'reglamento' | 'ecosistema' | 'evaluacion' | 'certificado';

export interface ApprenticeProfile {
  name: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  regional: string;
  center: string;
  program: string;
  programLevel: 'Técnico' | 'Tecnólogo' | 'Operario' | 'Especialización Tecnológica';
  cohortNumber: string; // Ficha de caracterización
  startDate: string;
}

export interface UserProgress {
  completedModules: ModuleId[];
  quizScore: number;
  quizCompleted: boolean;
  simulationCasesSolved: string[];
  badges: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface SimulationCase {
  id: string;
  title: string;
  situation: string;
  context: string;
  question: string;
  options: {
    id: string;
    action: string;
    feedback: string;
    isCorrect: boolean;
    regulationArticle: string;
  }[];
}

export interface AnthemStanza {
  title: string;
  lyrics: string[];
  meaning: string;
}
