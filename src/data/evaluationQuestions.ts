import { QuizQuestion } from '../types/induction';

/**
 * Banco completo de 20 preguntas (5 por cada módulo/sección fundamental):
 * 1. Módulo Símbolos e Historia SENA (Preguntas 1 a 5)
 * 2. Módulo Modelo Pedagógico FPI (Preguntas 6 a 10)
 * 3. Módulo Reglamento del Aprendiz - Acuerdo 0009 de 2024 (Preguntas 11 a 15)
 * 4. Módulo Ecosistema y Bienestar al Aprendiz (Preguntas 16 a 20)
 */

export interface QuestionWithFeedback extends QuizQuestion {
  sectionId: 'simbolos' | 'modelo' | 'reglamento' | 'ecosistema';
  sectionTitle: string;
  positiveFeedback: string;
  errorFeedback: string;
  referenceRule?: string;
}

export const EVALUATION_QUESTIONS: QuestionWithFeedback[] = [
  // ==========================================
  // SECCIÓN 1: SÍMBOLOS E HISTORIA SENA (5 PREGUNTAS)
  // ==========================================
  {
    id: 1,
    sectionId: 'simbolos',
    sectionTitle: 'Sección 1: Símbolos e Historia Institucional',
    category: 'Historia y Fundación',
    question: '¿En qué año fue fundado el Servicio Nacional de Aprendizaje (SENA) y quién fue su fundador y gestor visionario?',
    options: [
      { id: 'a', text: 'En 1957 por Rodolfo Martínez Tono mediante el Decreto Ley 118.', isCorrect: true },
      { id: 'b', text: 'En 1991 por la Asamblea Nacional Constituyente.', isCorrect: false },
      { id: 'c', text: 'En 1970 por el Ministerio de Hacienda y Crédito Público.', isCorrect: false },
      { id: 'd', text: 'En 1948 por Jorge Eliécer Gaitán en Bogotá.', isCorrect: false },
    ],
    explanation: 'El SENA nació el 21 de junio de 1957 mediante el Decreto Ley 118 de la Junta Militar de Gobierno, concebido e impulsado por el jurista y economista Rodolfo Martínez Tono.',
    positiveFeedback: '¡Excelente memoria histórica! Rodolfo Martínez Tono fundó el SENA en 1957 como motor de formación para los trabajadores del país.',
    errorFeedback: '¡Ojo con la fecha y el fundador! Recuerda que el SENA fue creado en 1957 bajo la visión de Rodolfo Martínez Tono, no en 1991 ni en 1970.',
    referenceRule: 'Historia SENA - Decreto Ley 118 de 1957',
  },
  {
    id: 2,
    sectionId: 'simbolos',
    sectionTitle: 'Sección 1: Símbolos e Historia Institucional',
    category: 'Escudo Institucional',
    question: '¿Qué sectores de la economía nacional representan respectivamente el Piñón Dentado, el Caduceo con alas y la Rama de café en el escudo oficial del SENA?',
    options: [
      { id: 'a', text: 'Industria/Construcción, Comercio/Servicios, y Sector Agropecuario/Rural.', isCorrect: true },
      { id: 'b', text: 'Minería energética, Banca internacional y Turismo marítimo.', isCorrect: false },
      { id: 'c', text: 'Fuerza Pública, Administración de Justicia e Instituciones Eclesiásticas.', isCorrect: false },
      { id: 'd', text: 'Salud hospitalaria, Tránsito vehicular y Telecomunicaciones satelitales.', isCorrect: false },
    ],
    explanation: 'El escudo del SENA congrega los 3 motores de la producción en Colombia: el piñón dentado (industria), el caduceo con alas (comercio y servicios) y la rama con grano de café (campo y agro).',
    positiveFeedback: '¡Brillante! Identificas a la perfección cómo el escudo del SENA honra las tres grandes fuerzas productivas de Colombia.',
    errorFeedback: 'Ten en cuenta la heráldica: El Piñón es Industria, el Caduceo es Comercio y Servicios, y la Rama de Café representa el Sector Agropecuario.',
    referenceRule: 'Identidad y Símbolos Institucionales SENA',
  },
  {
    id: 3,
    sectionId: 'simbolos',
    sectionTitle: 'Sección 1: Símbolos e Historia Institucional',
    category: 'Logotipo y Caminante',
    question: '¿Qué significado encierra la figura humana estilizada que camina con paso firme en el logotipo/isotipo del SENA?',
    options: [
      { id: 'a', text: 'Al aprendiz como centro del proceso, superando obstáculos y marchando hacia el futuro y la transformación del país.', isCorrect: true },
      { id: 'b', text: 'A un atleta de alto rendimiento compitiendo en una maratón.', isCorrect: false },
      { id: 'c', text: 'A un compás arquitectónico utilizado para el trazado de planos.', isCorrect: false },
      { id: 'd', text: 'A un árbol que proporciona sombra a las instalaciones educativas.', isCorrect: false },
    ],
    explanation: 'El logotipo del caminante ubica al aprendiz en el centro de la formación, proyectándose como un líder que avanza con optimismo hacia la excelencia personal y técnica.',
    positiveFeedback: '¡Muy bien interpretado! Tú, como aprendiz, eres ese caminante que avanza con paso firme hacia el desarrollo y la innovación.',
    errorFeedback: 'Recuerda el mensaje institucional: el isotipo representa al Aprendiz protagonista avanzando por un sendero de superación y progreso social.',
    referenceRule: 'Manual de Imagen e Identidad SENA',
  },
  {
    id: 4,
    sectionId: 'simbolos',
    sectionTitle: 'Sección 1: Símbolos e Historia Institucional',
    category: 'Bandera y Colores',
    question: '¿Cuáles son los colores oficiales de la bandera del SENA y qué representa el fondo blanco en el estandarte institucional?',
    options: [
      { id: 'a', text: 'Fondo blanco que simboliza la paz, la tranquilidad y la transparencia, acompañado del escudo verde en el centro.', isCorrect: true },
      { id: 'b', text: 'Fondo amarillo, azul y rojo con franjas diagonales en homenaje a la bandera patria.', isCorrect: false },
      { id: 'c', text: 'Fondo verde olivo con franjas plateadas en honor a los bosques andinos.', isCorrect: false },
      { id: 'd', text: 'Fondo azul cielo con letras doradas representativas del mar territorial.', isCorrect: false },
    ],
    explanation: 'La bandera del SENA es de fondo blanco impecable, simbolizando la convivencia pacífica, la pulcritud y la transparencia, portando en su centro el emblema oficial verde.',
    positiveFeedback: '¡Correcto! El blanco de la bandera del SENA proclama la paz, la integridad y el trabajo ético de toda la comunidad formativa.',
    errorFeedback: 'Revisa los colores: la bandera del SENA tiene fondo blanco (paz y transparencia institucional) con el escudo verde institucional en su centro.',
    referenceRule: 'Estatuto de Identidad Visual del SENA',
  },
  {
    id: 5,
    sectionId: 'simbolos',
    sectionTitle: 'Sección 1: Símbolos e Historia Institucional',
    category: 'Himno del SENA',
    question: '¿Cuál es el mensaje central de la estrofa I del Himno del SENA: "Hoy la patria nos grita sentida: ¡Estudiantes del SENA triunfad!..."?',
    options: [
      { id: 'a', text: 'Que la formación profesional integral es el camino para alcanzar mayor justicia social y libertad para el pueblo colombiano.', isCorrect: true },
      { id: 'b', text: 'Que únicamente se debe estudiar para obtener títulos extranjeros.', isCorrect: false },
      { id: 'c', text: 'Que el descanso vacacional es la meta principal de todo ciudadano.', isCorrect: false },
      { id: 'd', text: 'Que el trabajo solo debe realizarse de manera individual y sin colaboración.', isCorrect: false },
    ],
    explanation: 'La estrofa I del himno señala: "Solo así lograréis en la vida, más justicia, mayor libertad", exaltando el papel transformador de la formación técnica y humana.',
    positiveFeedback: '¡Exacto! El himno nos recuerda que el esfuerzo y el estudio de los aprendices traen consigo justicia, equidad y libertad económica.',
    errorFeedback: 'Ten presente la letra del himno: el triunfo de los estudiantes del SENA se traduce en mayor justicia social y libertad para la patria.',
    referenceRule: 'Himno Institucional SENA - Letra de Luis Alfredo Sánchez',
  },

  // ==========================================
  // SECCIÓN 2: MODELO PEDAGÓGICO FPI (5 PREGUNTAS)
  // ==========================================
  {
    id: 6,
    sectionId: 'modelo',
    sectionTitle: 'Sección 2: Modelo Pedagógico de Formación Profesional Integral (FPI)',
    category: 'Fuentes del Conocimiento',
    question: '¿Cuáles son las cuatro fuentes del conocimiento articuladas en la Formación Profesional Integral del SENA?',
    options: [
      { id: 'a', text: 'El Instructor, El Entorno, Las Tecnologías de la Información (TIC) y El Trabajo Colaborativo.', isCorrect: true },
      { id: 'b', text: 'Los exámenes de memoria, las notas numéricas, los castigos y el aislamiento en clase.', isCorrect: false },
      { id: 'c', text: 'Las redes sociales de entretenimiento, los folletos publicitarios y los periódicos locales.', isCorrect: false },
      { id: 'd', text: 'Las bibliotecas municipales y las oficinas gubernamentales únicamente.', isCorrect: false },
    ],
    explanation: 'En el SENA el aprendizaje es activo y dinámico, nutriéndose de 4 fuentes: el Instructor mediador, el Entorno real/simulado, las TIC aplicadas y el Trabajo colaborativo entre pares.',
    positiveFeedback: '¡Excelente! En el SENA el conocimiento fluye entre el instructor facilitador, el entorno real, las herramientas TIC y el trabajo en equipo.',
    errorFeedback: '¡Atención al modelo pedagógico! Las 4 fuentes son: 1) El Instructor, 2) El Entorno, 3) Las TIC y 4) El Trabajo Colaborativo.',
    referenceRule: 'Modelo Pedagógico de la Formación Profesional Integral SENA',
  },
  {
    id: 7,
    sectionId: 'modelo',
    sectionTitle: 'Sección 2: Modelo Pedagógico de Formación Profesional Integral (FPI)',
    category: 'Etapas de Formación',
    question: '¿Cuáles son las dos grandes etapas que integran los programas de formación titulada en el SENA?',
    options: [
      { id: 'a', text: 'Etapa Lectiva (apropiación teórico-práctica) y Etapa Productiva (aplicación en el contexto real laboral).', isCorrect: true },
      { id: 'b', text: 'Etapa de Matrícula previa y Etapa de Descanso posterior.', isCorrect: false },
      { id: 'c', text: 'Etapa Teórica exclusivamente y Etapa de Exámenes finales.', isCorrect: false },
      { id: 'd', text: 'Etapa Universitaria y Etapa Escolar básica.', isCorrect: false },
    ],
    explanation: 'La etapa lectiva se realiza en ambientes de aprendizaje físicos o virtuales; la etapa productiva consolida y transfiere dichas competencias en el contexto empresarial o productivo real.',
    positiveFeedback: '¡Muy bien! Primero desarrollas las competencias en Etapa Lectiva y luego las validas en el mundo laboral en Etapa Productiva.',
    errorFeedback: 'Recuerda la ruta: la formación del SENA se compone de Etapa Lectiva (ambientes formativos) y Etapa Productiva (desempeño laboral/empresarial).',
    referenceRule: 'Estatuto de la Formación Profesional Integral',
  },
  {
    id: 8,
    sectionId: 'modelo',
    sectionTitle: 'Sección 2: Modelo Pedagógico de Formación Profesional Integral (FPI)',
    category: 'Modalidades de Etapa Productiva',
    question: '¿Cuál de las siguientes es una modalidad válida y reconocida para el desarrollo de la Etapa Productiva en el SENA?',
    options: [
      { id: 'a', text: 'Contrato de aprendizaje, vínculo laboral afín, proyecto productivo (I+D+i / SENNOVA), pasantía o monitoría.', isCorrect: true },
      { id: 'b', text: 'Trabajar en cualquier labor informal sin relación alguna con el programa formativo.', isCorrect: false },
      { id: 'c', text: 'Permanecer inactivo en casa a la espera del diploma de grado.', isCorrect: false },
      { id: 'd', text: 'Pagar una tarifa monetaria para homologar la experiencia sin realizar ninguna actividad.', isCorrect: false },
    ],
    explanation: 'El SENA ofrece diversas alternativas reguladas: Contrato de Aprendizaje, Vínculo Laboral afín, Proyectos Productivos (SENNOVA/Fondo Emprender), Pasantías institucionales y Monitorías.',
    positiveFeedback: '¡Perfecto! Tienes opciones variadas y oficiales como contrato de aprendizaje, proyectos I+D+i, monitorías y pasantías.',
    errorFeedback: 'Ojo con las modalidades: la etapa productiva siempre debe estar vinculada a las competencias de tu programa formativo mediante figuras oficiales como contrato, vínculo o proyecto productivo.',
    referenceRule: 'Acuerdo 0009 de 2024 - Alternativas de Etapa Productiva',
  },
  {
    id: 9,
    sectionId: 'modelo',
    sectionTitle: 'Sección 2: Modelo Pedagógico de Formación Profesional Integral (FPI)',
    category: 'Juicio Evaluativo',
    question: '¿Cómo se expresa formalmente la evaluación del aprendizaje en el modelo por competencias del SENA?',
    options: [
      { id: 'a', text: 'Mediante juicio cualitativo: "Aprobado" (A) o "No Aprobado" (D), sustentado en el logro de resultados de aprendizaje.', isCorrect: true },
      { id: 'b', text: 'Mediante una escala numérica de 1 a 10 con decimales.', isCorrect: false },
      { id: 'c', text: 'Con letras de la A a la F según el orden de llegada a las clases.', isCorrect: false },
      { id: 'd', text: 'Con estrellas doradas y sellos de aprobación semanal.', isCorrect: false },
    ],
    explanation: 'En el SENA la evaluación no es cuantitativa tradicional; es criterial y formativa. El aprendiz logra la competencia cuando demuestra con evidencias que su resultado es Aprobado (A).',
    positiveFeedback: '¡Exacto! En el SENA no hay notas de 1 a 5; se evalúa por competencias emitiendo juicios de "Aprobado" o "No Aprobado".',
    errorFeedback: 'Ten presente que en el SENA el juicio evaluativo es cualitativo por evidencias: "Aprobado" (A) o "No Aprobado / Por Mejorar" (D).',
    referenceRule: 'Guía de Evaluación del Aprendizaje SENA',
  },
  {
    id: 10,
    sectionId: 'modelo',
    sectionTitle: 'Sección 2: Modelo Pedagógico de Formación Profesional Integral (FPI)',
    category: 'Rol del Aprendiz',
    question: 'En el modelo pedagógico del SENA, ¿cuál es el rol principal que asume el aprendiz durante su formación?',
    options: [
      { id: 'a', text: 'Sujeto activo, autónomo y corresponsable de su propio aprendizaje mediante la investigación y el trabajo por proyectos.', isCorrect: true },
      { id: 'b', text: 'Un receptor pasivo que solo escucha al instructor sin opinar ni investigar.', isCorrect: false },
      { id: 'c', text: 'Un espectador que no necesita entregar evidencias ni trabajar en equipo.', isCorrect: false },
      { id: 'd', text: 'Un empleado dependiente de órdenes mecánicas y repetitivas.', isCorrect: false },
    ],
    explanation: 'El aprendiz SENA es el protagonista principal de su proceso formativo: investiga, crea, propone soluciones reales e interactúa activamente con su entorno y sus pares.',
    positiveFeedback: '¡Fantástico! Eres el líder de tu proceso de aprendizaje, con autonomía para investigar y transformar tu comunidad.',
    errorFeedback: 'Recuerda el principio de autonomía: el aprendiz SENA es activo, investigativo y corresponsable de su formación, nunca pasivo.',
    referenceRule: 'Modelo Pedagógico Institucional - Enfoque por Competencias',
  },

  // ==========================================
  // SECCIÓN 3: REGLAMENTO DEL APRENDIZ - ACUERDO 0009 DE 2024 (5 PREGUNTAS)
  // ==========================================
  {
    id: 11,
    sectionId: 'reglamento',
    sectionTitle: 'Sección 3: Reglamento del Aprendiz - Acuerdo 0009 de 2024',
    category: 'Marco Normativo Vigente',
    question: '¿Cuál es el marco normativo actual que rige los deberes, derechos y convivencia de los aprendices en el SENA?',
    options: [
      { id: 'a', text: 'El Acuerdo 0009 de 2024 del Consejo Directivo Nacional, que actualizó y unificó el Reglamento del Aprendiz.', isCorrect: true },
      { id: 'b', text: 'El Acuerdo 07 de 2012 sin ninguna reforma ni actualización posterior.', isCorrect: false },
      { id: 'c', text: 'El Código Nacional de Policía y Convivencia Ciudadana de manera exclusiva.', isCorrect: false },
      { id: 'd', text: 'La Ley 100 de Seguridad Social en Salud.', isCorrect: false },
    ],
    explanation: 'El Consejo Directivo Nacional promulgó el Acuerdo 0009 de 2024 para adoptar el nuevo reglamento del aprendiz, modernizando las garantías de debido proceso y las novedades académicas.',
    positiveFeedback: '¡Correcto y actualizado! El Acuerdo 0009 de 2024 es la norma vigente que guía nuestra convivencia y derechos institucionales.',
    errorFeedback: '¡Cuidado con las normas anteriores! El reglamento vigente es el Acuerdo 0009 de 2024, el cual derogó normas anteriores como el Acuerdo 07 de 2012.',
    referenceRule: 'Acuerdo 0009 de 2024 del Consejo Directivo Nacional del SENA',
  },
  {
    id: 12,
    sectionId: 'reglamento',
    sectionTitle: 'Sección 3: Reglamento del Aprendiz - Acuerdo 0009 de 2024',
    category: 'Novedades Académicas - Aplazamiento',
    question: 'Bajo el Acuerdo 0009 de 2024, ¿cuándo procede la solicitud formal de la novedad académica de "Aplazamiento"?',
    options: [
      { id: 'a', text: 'Cuando el aprendiz requiere suspender temporalmente su formación por 20 o más días continuos por causas justificadas (médicas, maternidad, etc.).', isCorrect: true },
      { id: 'b', text: 'Únicamente para faltar medio día cuando se tiene un compromiso personal.', isCorrect: false },
      { id: 'c', text: 'Cuando el aprendiz decide retirarse de manera definitiva e irrevocable del SENA.', isCorrect: false },
      { id: 'd', text: 'Solo aplica si el centro de formación cierra durante más de dos años.', isCorrect: false },
    ],
    explanation: 'El Acuerdo 0009 de 2024 define el aplazamiento como la suspensión temporal de la formación por 20 o más días continuos por fuerza mayor justificada, reservando el cupo para posterior reintegro.',
    positiveFeedback: '¡Excelente conocimiento normativo! El aplazamiento protege tu cupo para suspensiones de 20 o más días por causas justificadas.',
    errorFeedback: 'Recuerda el requisito del Acuerdo 0009/2024: el Aplazamiento procede para suspensiones temporales de 20 o más días continuos debidamente justificadas.',
    referenceRule: 'Acuerdo 0009 de 2024 - Novedades Académicas (Art. Aplazamiento y Reintegro)',
  },
  {
    id: 13,
    sectionId: 'reglamento',
    sectionTitle: 'Sección 3: Reglamento del Aprendiz - Acuerdo 0009 de 2024',
    category: 'Debido Proceso y Medidas Formativas',
    question: '¿Qué garantía fundamental ampara a todo aprendiz ante un eventual reporte por falta académica o disciplinaria?',
    options: [
      { id: 'a', text: 'El derecho al debido proceso, la presunción de inocencia, a ser escuchado en descargos y a presentar pruebas de contradicción.', isCorrect: true },
      { id: 'b', text: 'La sanción automática e inmediata sin notificación previa ni derecho a defensa.', isCorrect: false },
      { id: 'c', text: 'La pérdida irreversible de la matrícula sin intervención del Comité de Evaluación.', isCorrect: false },
      { id: 'd', text: 'La imposición de multas económicas obligatorias pagaderas al centro.', isCorrect: false },
    ],
    explanation: 'El debido proceso es inviolable en el SENA. Todo aprendiz tiene derecho a ser notificado, escuchado, presentar pruebas, contar con presunción de inocencia y apelar decisiones ante la Subdirección.',
    positiveFeedback: '¡Perfecto! El debido proceso y la presunción de inocencia son principios inquebrantables que protegen tu dignidad en el SENA.',
    errorFeedback: 'No lo olvides: en el SENA nadie puede ser sancionado de plano; el debido proceso exige notificación formal, descargos y valoración probatoria.',
    referenceRule: 'Acuerdo 0009 de 2024 - Principios del Procedimiento Disciplinario',
  },
  {
    id: 14,
    sectionId: 'reglamento',
    sectionTitle: 'Sección 3: Reglamento del Aprendiz - Acuerdo 0009 de 2024',
    category: 'Causal de Deserción',
    question: '¿Cuándo se configura una causal de "Deserción" en el proceso formativo según el Reglamento del Aprendiz?',
    options: [
      { id: 'a', text: 'Cuando el aprendiz acumula 3 días consecutivos de inasistencia no justificada a las actividades de formación.', isCorrect: true },
      { id: 'b', text: 'Cuando el aprendiz llega 5 minutos tarde a una sesión virtual con previa justificación.', isCorrect: false },
      { id: 'c', text: 'Cuando el aprendiz solicita permiso formal con anterioridad por cita médica.', isCorrect: false },
      { id: 'd', text: 'Cuando el aprendiz cambia de número telefónico o residencia avisando oportunamente.', isCorrect: false },
    ],
    explanation: 'El reglamento estipula que la inasistencia injustificada durante 3 días hábiles continuos inicia el trámite formal de deserción si el aprendiz no aporta los soportes legales requeridos.',
    positiveFeedback: '¡Muy bien advertido! 3 días continuos de ausencia injustificada configuran deserción; siempre debes justificar a tiempo.',
    errorFeedback: 'Cuidado con las inasistencias: no asistir durante 3 días consecutivos sin justificación legal inicia el proceso de reporte por deserción.',
    referenceRule: 'Acuerdo 0009 de 2024 - Trámite de Deserción Institucional',
  },
  {
    id: 15,
    sectionId: 'reglamento',
    sectionTitle: 'Sección 3: Reglamento del Aprendiz - Acuerdo 0009 de 2024',
    category: 'Deberes y Portes Institucionales',
    question: '¿Cuál de las siguientes acciones constituye un deber explícito y obligatorio de todo aprendiz SENA?',
    options: [
      { id: 'a', text: 'Portar siempre visible el carné institucional dentro de las instalaciones y cuidar la infraestructura y bienes públicos del centro.', isCorrect: true },
      { id: 'b', text: 'Prestar el carné institucional a terceros para que ingresen al centro formativo.', isCorrect: false },
      { id: 'c', text: 'Ingresar a los talleres técnicos sin los elementos de protección personal (EPP).', isCorrect: false },
      { id: 'd', text: 'Descargar e instalar software no autorizado en los equipos de los laboratorios.', isCorrect: false },
    ],
    explanation: 'El carné institucional es personal e intransferible. Portarlo en un lugar visible es un deber primordial por seguridad, identidad y acceso a los beneficios institucionales.',
    positiveFeedback: '¡Exacto! El carné institucional visible y el uso de los EPP garantizan la seguridad y el sentido de pertenencia en la entidad.',
    errorFeedback: 'Recuerda los deberes básicos: portar el carné visible y cuidar los ambientes y herramientas institucionales son obligaciones de todo aprendiz.',
    referenceRule: 'Acuerdo 0009 de 2024 - Deberes del Aprendiz SENA',
  },

  // ==========================================
  // SECCIÓN 4: ECOSISTEMA Y BIENESTAR AL APRENDIZ (5 PREGUNTAS)
  // ==========================================
  {
    id: 16,
    sectionId: 'ecosistema',
    sectionTitle: 'Sección 4: Ecosistema Institucional y Bienestar al Aprendiz',
    category: 'Emprendimiento y Capital Semilla',
    question: '¿Qué fondo adscrito al SENA financia con capital semilla no reembolsable ideas de negocio creadas por aprendices y egresados?',
    options: [
      { id: 'a', text: 'El Fondo Emprender del SENA.', isCorrect: true },
      { id: 'b', text: 'El Fondo de Ahorro y Vivienda Nacional.', isCorrect: false },
      { id: 'c', text: 'El Fondo Monetario Internacional (FMI).', isCorrect: false },
      { id: 'd', text: 'La Caja de Compensación Regional.', isCorrect: false },
    ],
    explanation: 'El Fondo Emprender es el fondo de capital semilla más grande de Colombia, creado por ley y administrado por el SENA para financiar y acompañar emprendimientos sostenibles.',
    positiveFeedback: '¡Fantástico! El Fondo Emprender es la plataforma líder para convertir proyectos de aprendices en empresas reales.',
    errorFeedback: 'Ten en cuenta la herramienta: el Fondo Emprender del SENA es quien otorga capital semilla condonable para emprendedores graduados y aprendices.',
    referenceRule: 'Ecosistema de Emprendimiento e Innovación SENA',
  },
  {
    id: 17,
    sectionId: 'ecosistema',
    sectionTitle: 'Sección 4: Ecosistema Institucional y Bienestar al Aprendiz',
    category: 'Investigación e Innovación (SENNOVA)',
    question: '¿Qué es SENNOVA y cuál es su misión dentro de los centros de formación del país?',
    options: [
      { id: 'a', text: 'El Sistema de Investigación, Innovación y Desarrollo Tecnológico del SENA, que articula semilleros de investigación, TecnoParques y TecnoAcademias.', isCorrect: true },
      { id: 'b', text: 'El software de nómina y facturación de proveedores del SENA.', isCorrect: false },
      { id: 'c', text: 'El programa de alimentación escolar de primaria.', isCorrect: false },
      { id: 'd', text: 'El servicio de correspondencia física de la Dirección General.', isCorrect: false },
    ],
    explanation: 'SENNOVA promueve la cultura científica y tecnológica a través de semilleros de investigación aplicada, redes de innovación, laboratorios y centros de desarrollo tecnológico.',
    positiveFeedback: '¡Excelente! SENNOVA te permite vincularte a semilleros científicos y crear soluciones tecnológicas de vanguardia.',
    errorFeedback: 'Recuerda la sigla: SENNOVA es el Sistema de Investigación, Desarrollo Tecnológico e Innovación del SENA (Semilleros, TecnoParques y TecnoAcademias).',
    referenceRule: 'Estrategia SENNOVA - Dirección del Sistema Nacional de Formación',
  },
  {
    id: 18,
    sectionId: 'ecosistema',
    sectionTitle: 'Sección 4: Ecosistema Institucional y Bienestar al Aprendiz',
    category: 'Plan de Bienestar al Aprendiz',
    question: '¿Cuáles son algunas de las dimensiones y apoyos que brinda el Plan Nacional Integral de Bienestar al Aprendiz?',
    options: [
      { id: 'a', text: 'Salud, deporte, cultura, liderazgo, orientación psicosocial y apoyos socioeconómicos de sostenimiento.', isCorrect: true },
      { id: 'b', text: 'Únicamente el cobro de mensualidades y venta de seguros privados.', isCorrect: false },
      { id: 'c', text: 'Sanciones disciplinarias y cobros por uso de laboratorios.', isCorrect: false },
      { id: 'd', text: 'Venta obligatoria de libros impresos en la biblioteca.', isCorrect: false },
    ],
    explanation: 'El Bienestar al Aprendiz promueve la permanencia y el desarrollo integral a través de actividades deportivas, artísticas, acompañamiento psicológico y apoyos de sostenimiento (regular y FIC).',
    positiveFeedback: '¡Muy bien! Bienestar al Aprendiz acompaña tu salud mental, tus talentos artísticos, deportivos y tu permanencia educativa.',
    errorFeedback: 'Bienestar al Aprendiz abarca la salud, la cultura, el deporte, el liderazgo y apoyos de sostenimiento para garantizar tu éxito formativo.',
    referenceRule: 'Resolución de Bienestar al Aprendiz SENA',
  },
  {
    id: 19,
    sectionId: 'ecosistema',
    sectionTitle: 'Sección 4: Ecosistema Institucional y Bienestar al Aprendiz',
    category: 'Agencia Pública de Empleo (APE)',
    question: '¿Qué servicio público y gratuito ofrece la Agencia Pública de Empleo (APE) del SENA a los aprendices y colombianos?',
    options: [
      { id: 'a', text: 'Intermediación laboral gratuita y transparente que conecta perfiles calificados con ofertas de empleo nacionales e internacionales.', isCorrect: true },
      { id: 'b', text: 'Cobro de comisiones porcentuales sobre el salario del trabajador contratado.', isCorrect: false },
      { id: 'c', text: 'Trámite exclusivo de visas de turismo para el extranjero.', isCorrect: false },
      { id: 'd', text: 'Venta de pólizas de seguros de desempleo a personas naturales.', isCorrect: false },
    ],
    explanation: 'La APE es el primer operador público de intermediación laboral en Colombia; es 100% gratuita y no requiere intermediarios para vincular a los buscadores de empleo.',
    positiveFeedback: '¡Exacto! La APE es un servicio público gratuito para conectarte directamente con ofertas de empleo formal en todo el país y el exterior.',
    errorFeedback: 'Ten presente que la Agencia Pública de Empleo (APE) es un servicio 100% gratuito que conecta vacantes laborales formales sin intermediarios.',
    referenceRule: 'Agencia Pública de Empleo SENA (Decreto 2521)',
  },
  {
    id: 20,
    sectionId: 'ecosistema',
    sectionTitle: 'Sección 4: Ecosistema Institucional y Bienestar al Aprendiz',
    category: 'Plataformas Virtuales de Aprendizaje',
    question: '¿Cuál es el entorno virtual oficial de aprendizaje (LMS) donde los aprendices gestionan sus cursos, evidencias y calificaciones en el SENA?',
    options: [
      { id: 'a', text: 'La plataforma Zajuna LMS (integrada con SofiaPlus).', isCorrect: true },
      { id: 'b', text: 'Una cuenta de correo electrónico comercial gratuita no institucional.', isCorrect: false },
      { id: 'c', text: 'Grupos no oficiales en aplicaciones de chat sin trazabilidad.', isCorrect: false },
      { id: 'd', text: 'Un blog de notas personal sin acceso institucional.', isCorrect: false },
    ],
    explanation: 'Zajuna es el ambiente virtual de aprendizaje del SENA, donde se disponen los foros, guías de aprendizaje, evaluaciones y seguimiento de evidencias con trazabilidad académica.',
    positiveFeedback: '¡Perfecto! Zajuna LMS es la plataforma oficial donde consultas tus guías, interactúas en foros y subes tus evidencias de aprendizaje.',
    errorFeedback: 'Recuerda que la plataforma virtual institucional del SENA es Zajuna LMS, sincronizada con SofiaPlus para tu seguimiento académico.',
    referenceRule: 'Ecosistema Digital SENA - LMS Institucional Zajuna',
  },
];
