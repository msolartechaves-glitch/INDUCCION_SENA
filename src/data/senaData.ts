import { AnthemStanza, QuizQuestion, SimulationCase } from '../types/induction';

export const SENA_REGIONALES = [
  'Regional Antioquia',
  'Regional Atlántico',
  'Regional Bogotá D.C.',
  'Regional Cundinamarca',
  'Regional Santander',
  'Regional Valle del Cauca',
  'Regional Bolívar',
  'Regional Boyacá',
  'Regional Caldas',
  'Regional Risaralda',
  'Regional Quindío',
  'Regional Tolima',
  'Regional Huila',
  'Regional Nariño',
  'Regional Cauca',
  'Regional Norte de Santander',
  'Regional Córdoba',
  'Regional Cesar',
  'Regional Magdalena',
  'Regional Meta',
  'Regional Casanare',
  'Regional Sucre',
  'Regional La Guajira',
  'Regional Chocó',
  'Regional San Andrés y Providencia',
  'Regional Caquetá',
  'Regional Putumayo',
  'Regional Amazonas',
  'Regional Arauca',
  'Regional Guaviare',
  'Regional Vichada',
  'Regional Guainía',
  'Regional Vaupés',
];

export const POPULAR_PROGRAMS = [
  'ADSO - Análisis y Desarrollo de Software',
  'Gestión Empresarial y Administrativa',
  'Diseño e Integración Multimedia',
  'Contabilidad y Finanzas',
  'Mantenimiento Mecatrónico Industrial',
  'Gestión de Redes de Datos',
  'Biotecnología Aplicada',
  'Producción Agropecuaria Ecológica',
  'Animación Digital y 3D',
  'Logística y Operaciones de Comercio Exterior',
  'Control de Calidad en Alimentos',
  'Salud Ocupacional y Seguridad en el Trabajo',
];

export const INSTITUTIONAL_VALUES = [
  {
    title: 'Transparencia',
    description: 'Actuación clara, ética e íntegra en la custodia de los recursos y la confianza del país.',
    color: 'emerald',
  },
  {
    title: 'Respeto',
    description: 'Reconocimiento del valor intrínseco, la diversidad, dignidad e inclusión de cada miembro de la comunidad.',
    color: 'blue',
  },
  {
    title: 'Compromiso',
    description: 'Dedicación apasionada al aprendizaje continuo y a la transformación productiva y social de Colombia.',
    color: 'amber',
  },
  {
    title: 'Diligencia',
    description: 'Cumplimiento oportuno, riguroso y con altos estándares de calidad en cada resultado de aprendizaje.',
    color: 'teal',
  },
  {
    title: 'Solidaridad',
    description: 'Sentido colectivo, fraternidad y apoyo mutuo entre aprendices, instructores y familias.',
    color: 'indigo',
  },
  {
    title: 'Sentido de Pertenencia',
    description: 'Orgullo por portar los colores del SENA, cuidando sus centros de formación e infraestructura.',
    color: 'lime',
  },
];

export const ANTHEM_STANZAS: AnthemStanza[] = [
  {
    title: 'Coro',
    lyrics: [
      'Estudiantes del SENA, ¡adelante!',
      'Por Colombia luchad con amor,',
      'Con el ánimo noble y constante,',
      'Al trabajo ponedle ardor.',
    ],
    meaning: 'Invocación al espíritu de superación, entrega cívica y pasión productiva de los aprendices hacia el desarrollo de Colombia.',
  },
  {
    title: 'Estrofa I',
    lyrics: [
      'Hoy la patria nos grita sentida,',
      '¡Estudiantes del SENA, triunfad!',
      'Solo así lograréis en la vida,',
      'Más justicia, mayor libertad.',
    ],
    meaning: 'Enfatiza que la formación técnica y tecnológica es el vehículo fundamental para la equidad social, la justicia y la libertad económica.',
  },
  {
    title: 'Estrofa II',
    lyrics: [
      'Avancemos con fuerza señera,',
      '¡Inundemos de luz la nación!',
      'Conquistemos la cumbre cimera,',
      'Con trabajo, paciencia y unión.',
    ],
    meaning: 'Exalta el trabajo colaborativo, la constancia y la excelencia académica para llevar desarrollo a cada rincón del territorio nacional.',
  },
];

export const SHIELD_ELEMENTS = [
  {
    id: 'pinon',
    name: 'El Piñón Dentado',
    sector: 'Sector Industria y Construcción',
    description: 'Representa el sector secundario de la economía: las fábricas, la metalmecánica, la transformación industrial, la construcción, la infraestructura y el avance tecnológico de la maquinaria y software nacional.',
    iconType: 'gear',
  },
  {
    id: 'caduceo',
    name: 'El Caduceo y Alas',
    sector: 'Sector Comercio y Servicios',
    description: 'Símbolo del sector terciario: comercio, administración, finanzas, salud, telecomunicaciones, turismo y logística. Representa la agilidad, la comunicación y el dinamismo de los servicios en Colombia.',
    iconType: 'caduceus',
  },
  {
    id: 'cafe',
    name: 'La Rama de Café y Espiga',
    sector: 'Sector Agropecuario y Rural',
    description: 'Representa el sector primario de la economía nacional: el campo colombiano, la producción agropecuaria, la soberanía alimentaria, el café insignia y el trabajo digno de las comunidades rurales campesinas.',
    iconType: 'plant',
  },
];

export const KNOWLEDGE_SOURCES = [
  {
    id: 'instructor',
    name: 'El Instructor SENA',
    role: 'Facilitador y Mediador',
    description: 'Orienta, dinamiza, evalúa formativamente y estimula el pensamiento crítico y la autonomía del aprendiz. No es solo un transmisor, es un mentor formativo.',
  },
  {
    id: 'entorno',
    name: 'El Entorno Real y Simulado',
    role: 'Contexto Productivo y Social',
    description: 'Los ambientes de aprendizaje reales (talleres, laboratorios, empresas colaboradoras, ecosistemas rurales) donde se aplican directamente las habilidades.',
  },
  {
    id: 'tic',
    name: 'Las Tecnologías de la Información (TIC)',
    role: 'Herramientas y Acceso al Conocimiento',
    description: 'Plataformas digitales como Zajuna LMS, bases de datos bibliográficas especializadas, software de simulación e investigación aplicada.',
  },
  {
    id: 'colaborativo',
    name: 'El Trabajo Colaborativo',
    role: 'Construcción Colectiva',
    description: 'Equipos interdisciplinarios, resolución conjunta de problemas, proyectos formativos y retroalimentación entre pares de aprendices.',
  },
];

export const PRODUCTIVE_STAGES = [
  {
    id: 'contrato',
    name: 'Contrato de Aprendizaje',
    tag: 'Modalidad Empresarial',
    description: 'Vinculación formativa en una empresa legalmente constituida. La empresa brinda afiliación a EPS y ARL, más un apoyo de sostenimiento mensual fijado por ley.',
    requirements: ['Cumplir etapa lectiva con juicio evaluativo aprobado', 'Registro en la plataforma SGVA'],
  },
  {
    id: 'vinculo',
    name: 'Vínculo Laboral o Contractual',
    tag: 'Trabajador Activo',
    description: 'Aplica cuando el aprendiz ya labora en una empresa y sus funciones desempeñadas son directamente afines a las competencias de su programa formativo.',
    requirements: ['Constancia laboral con funciones detalladas', 'Aval del coordinador académico'],
  },
  {
    id: 'proyecto',
    name: 'Proyecto Productivo (I+D+i / Emprendimiento)',
    tag: 'Innovación & SENNOVA',
    description: 'Desarrollo de una solución tecnológica, prototipo de investigación aplicada o plan de negocio en el marco de Semilleros SENNOVA o Fondo Emprender.',
    requirements: ['Formulación metodológica avalada por el Centro', 'Asesoría de instructor técnico'],
  },
  {
    id: 'monitoria',
    name: 'Monitoría Institucional',
    tag: 'Apoyo Académico / Tecnológico',
    description: 'Apoyo a actividades académicas, técnicas o en ambientes de formación especializados dentro del mismo centro de formación SENA.',
    requirements: ['Excelente rendimiento académico', 'Convocatoria vigente en el centro'],
  },
  {
    id: 'pasantia',
    name: 'Pasantía / Apoyo Comunitario o a ONG',
    tag: 'Impacto Social',
    description: 'Práctica concertada con instituciones públicas, organizaciones comunitarias, resguardos o fundaciones para apoyar procesos técnicos territoriales.',
    requirements: ['Convenio interinstitucional', 'Plan de trabajo concertado'],
  },
];

export const ACUERDO_0009_2024 = {
  documento: {
    entidad: 'Servicio Nacional de Aprendizaje (SENA)',
    tipo_norma: 'Acuerdo',
    numero: '0009 de 2024',
    titulo: 'Reglamento del Aprendiz SENA',
    objeto:
      'Adoptar el Reglamento del Aprendiz SENA y derogar los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024',
    organo_emisor: 'Consejo Directivo Nacional',
  },
  capitulo_I_definiciones: {
    formacion_profesional_integral:
      'Proceso educativo teórico-práctico de carácter integral, orientado al desarrollo de conocimientos técnicos, tecnológicos, humanistas y habilidades socioemocionales.',
    comunidad_educativa:
      'Integrada por aprendices, instructores, personal administrativo, directivos, familia, egresados, empresarios y diversos sectores sociales.',
    aspirante: 'Persona en proceso de ingreso para matricularse.',
    aprendiz:
      'Persona matriculada en los programas de formación profesional del SENA en sus diferentes modalidades.',
  },
  principios_orientadores: [
    {
      nombre: 'Autonomía',
      descripcion:
        'Capacidad de autogestión, pensamiento crítico y toma de decisiones éticas y responsables.',
      icono: 'compass',
    },
    {
      nombre: 'Dignidad',
      descripcion:
        'Respeto irrestricto hacia la persona humana, sus derechos inalienables y su integridad moral y física.',
      icono: 'shield',
    },
    {
      nombre: 'Inclusión',
      descripcion:
        'Garantía de acceso equitativo y sin barreras a la formación para toda la población colombiana.',
      icono: 'users',
    },
    {
      nombre: 'Enfoque diferencial',
      descripcion:
        'Reconocimiento y atención de particularidades etarias, de género, etnia, discapacidad y víctimas del conflicto.',
      icono: 'sparkles',
    },
    {
      nombre: 'Enfoque territorial',
      descripcion:
        'Pertinencia y arraigo formativo según las vocaciones productivas y realidades de cada región del país.',
      icono: 'map',
    },
    {
      nombre: 'Participación',
      descripcion:
        'Voz activa en la vida comunitaria, vocería de ficha, representación estudiantil y comités formativos.',
      icono: 'message-circle',
    },
    {
      nombre: 'Desarrollo sostenible',
      descripcion:
        'Compromiso activo con la sostenibilidad ambiental, economía circular y cuidado de los recursos naturales.',
      icono: 'leaf',
    },
    {
      nombre: 'Solidaridad',
      descripcion:
        'Empatía, cooperación mutua, trabajo colaborativo y corresponsabilidad con la comunidad.',
      icono: 'heart',
    },
  ],
  derechos_y_deberes: {
    derechos_principales: [
      {
        titulo: 'Inducción Integral de Calidad',
        detalle:
          'Recibir inducción completa sobre el reglamento, la institucionalidad, bienestar al aprendiz y su ruta formativa.',
      },
      {
        titulo: 'Formación Profesional Integral',
        detalle:
          'Recibir formación teórico-práctica de calidad y excelencia en ambientes tecnológicos y humanos adecuados.',
      },
      {
        titulo: 'Acreditación Oficial como Aprendiz',
        detalle:
          'Ser acreditado formalmente como aprendiz del SENA, portar el carné institucional y acceder a servicios y convenios.',
      },
      {
        titulo: 'Garantía del Debido Proceso',
        detalle:
          'Ser escuchado en descargos, notificado formalmente y tener presunción de inocencia ante cualquier procedimiento.',
      },
      {
        titulo: 'Planes de Mejoramiento Pedagógicos',
        detalle:
          'Oportunidad formativa concertada con el instructor para superar dificultades y alcanzar los resultados de aprendizaje.',
      },
    ],
    deberes_principales: [
      {
        titulo: 'Suscripción del Acta de Compromiso',
        detalle:
          'Suscribir y honrar el acta de compromiso institucional al momento de efectuar la matrícula en el programa.',
      },
      {
        titulo: 'Cumplimiento del Reglamento',
        detalle:
          'Conocer y cumplir a cabalidad el Reglamento del Aprendiz (Acuerdo 0009 de 2024) y las normas de convivencia del centro.',
      },
      {
        titulo: 'Actualización Permanente de Datos',
        detalle:
          'Mantener actualizados los datos personales, de contacto y residencia en los sistemas institucionales (SofiaPlus / Zajuna).',
      },
      {
        titulo: 'Asistencia y Puntualidad',
        detalle:
          'Asistir puntualmente a los ambientes de aprendizaje y cumplir rigurosamente con las evidencias y actividades asignadas.',
      },
      {
        titulo: 'Uso Adecuado de Ambientes y Recursos',
        detalle:
          'Hacer uso responsable de herramientas, maquinaria, plataformas y bienes públicos dispuestos para la formación.',
      },
    ],
  },
  novedades_academicas: [
    {
      id: 'traslado',
      nombre: 'Traslado',
      definicion: 'Cambio de grupo, jornada o centro de formación.',
      requisito:
        'Solicitud motivada del aprendiz sujeta a disponibilidad de cupo y pertinencia académica en el centro receptor.',
      tipo: 'Movilidad',
    },
    {
      id: 'aplazamiento',
      nombre: 'Aplazamiento',
      definicion:
        'Suspensión temporal de la formación por 20 o más días continuos por causas justificadas.',
      requisito:
        'Aplica por causas médicas demostradas, maternidad o paternidad, calamidad doméstica justificada, servicio militar u otras causas de fuerza mayor.',
      tipo: 'Suspensión Temporal (≥ 20 días)',
    },
    {
      id: 'reintegro',
      nombre: 'Reintegro',
      definicion: 'Solicitud formal de retorno a la formación tras un aplazamiento autorizado.',
      requisito:
        'Radicar solicitud formal con antelación a la fecha de vencimiento del período de aplazamiento otorgado.',
      tipo: 'Reactivación',
    },
    {
      id: 'retiro_voluntario',
      nombre: 'Retiro Voluntario',
      definicion: 'Solicitud formal de retiro definitivo del programa de formación.',
      requisito:
        'Manifestación escrita y formal del aprendiz informando su desvinculación voluntaria.',
      tipo: 'Desvinculación Definitiva',
    },
  ],
  proceso_de_formacion: {
    etapa_lectiva:
      'Desarrollo teórico-práctico de conocimientos, habilidades y actitudes en ambientes de formación.',
    etapa_productiva:
      'Aplicación y consolidación de competencias en contextos reales (contrato de aprendizaje, vínculo laboral, proyecto productivo, monitoría, etc.).',
  },
  regimen_disciplinario_y_sanciones: {
    medidas_formativas: [
      {
        nombre: 'Llamado de atención disciplinario',
        detalle:
          'Hasta dos (2) llamados de atención disciplinarios por escrito antes de apertura de comités sancionatorios, buscando la reflexión y corrección oportuna.',
      },
      {
        nombre: 'Plan de mejoramiento disciplinario o académico',
        detalle:
          'Acción formativa concertada con compromisos específicos, metas claras, tutoría de acompañamiento y plazo definido para superar la situación.',
      },
    ],
    principios_del_procedimiento: [
      {
        nombre: 'Debido proceso',
        descripcion:
          'Garantía plena de ser escuchado, notificado, presentar pruebas y ejercer el derecho irrestricto a la contradicción.',
      },
      {
        nombre: 'Presunción de inocencia',
        descripcion:
          'Todo aprendiz se presume inocente mientras no se demuestre lo contrario en decisión motivada y ejecutoriada.',
      },
      {
        nombre: 'Inexistencia de doble sanción (Non bis in idem)',
        descripcion:
          'Nadie puede ser investigado ni sancionado dos veces por la misma falta o los mismos hechos.',
      },
      {
        nombre: 'Confidencialidad',
        descripcion:
          'Tratamiento reservado, ético y respetuoso de la información, expedientes y testimonios durante el trámite.',
      },
      {
        nombre: 'Culpabilidad',
        descripcion:
          'Solo se sancionan conductas ejecutadas con dolo (intencionales) o culpa comprobada dentro de las diligencias.',
      },
      {
        nombre: 'Proporcionalidad',
        descripcion:
          'La medida formativa o correctiva impuesta debe guardar estricta correspondencia con la gravedad de la falta.',
      },
    ],
  },
};

export const SIMULATION_CASES: SimulationCase[] = [
  {
    id: 'caso-inasistencia',
    title: 'Caso 1: Inasistencia por Fuerza Mayor y Procedimiento de Evidencias',
    context: 'Carlos es aprendiz de Desarrollo de Software. Tuvo una emergencia de salud que le impidió asistir a clase durante 3 días seguidos donde se evaluaba un resultado de aprendizaje clave.',
    situation: 'Carlos no avisó en el momento y cuando regresa al centro, el instructor le indica que tiene reporte por falta de asistencia no justificada y no ha subido su evidencia.',
    question: 'De acuerdo con el Reglamento del Aprendiz SENA, ¿cuál es el procedimiento formal y ético que debe seguir Carlos?',
    options: [
      {
        id: 'opt1',
        action: 'Ignorar el reporte y pedirle a un compañero que suba el código por él sin avisar al instructor.',
        feedback: 'Incorrecto. Esto puede constituir suplantación o falta disciplinaria grave, además de violar el debido proceso.',
        isCorrect: false,
        regulationArticle: 'Art. 22 - Deberes del Aprendiz (integridad académica)',
      },
      {
        id: 'opt2',
        action: 'Presentar dentro de los 3 días hábiles siguientes la incapacidad médica formal ante la Coordinación Académica y solicitar formalmente un plan de mejoramiento para la entrega extemporánea.',
        feedback: '¡Excelente! El Reglamento estipula que las inasistencias por fuerza mayor deben justificarse documentalmente dentro de los plazos establecidos para habilitar el debido proceso y reprogramar evidencias formativas.',
        isCorrect: true,
        regulationArticle: 'Art. 22 y 23 - Justificación de inasistencias y derecho a la debida orientación formativa',
      },
      {
        id: 'opt3',
        action: 'Esperar a que termine el trimestre para hablar con el Subdirector de Centro.',
        feedback: 'Incorrecto. Superado el tiempo de ausencia sin justificación (más de 3 días consecutivos), se configura causal de deserción de acuerdo con el Reglamento.',
        isCorrect: false,
        regulationArticle: 'Art. 22 - Trámite de Deserción por inasistencia no justificada',
      },
    ],
  },
  {
    id: 'caso-plagio',
    title: 'Caso 2: Originalidad en Proyectos y Derechos de Autor',
    context: 'Una terna de aprendices debe entregar la arquitectura de base de datos de su proyecto integrador de fin de fase de análisis.',
    situation: 'Uno de los integrantes descargó el repositorio completo de un proyecto de una universidad extranjera y lo presentó como elaboración propia de su equipo, sin citar ninguna fuente ni licenciarlo.',
    question: '¿Cómo califica el Reglamento del Aprendiz esta acción y cuál es la medida formativa o disciplinaria aplicable?',
    options: [
      {
        id: 'opt1',
        action: 'Es una falta gravísima de carácter disciplinario y académico por violación de derechos de autor y fraude; amerita remisión a Comité de Evaluación y Seguimiento.',
        feedback: '¡Correcto! El plagio o apropiación indebida de obras o códigos ajenos atenta gravemente contra la ética institucional, pudiendo conllevar a condicionamiento o cancelación de matrícula.',
        isCorrect: true,
        regulationArticle: 'Art. 10 y 27 - Prohibiciones y Faltas Gravísimas contra la fe pública y propiedad intelectual',
      },
      {
        id: 'opt2',
        action: 'No pasa nada porque el código en internet es público y todo se puede copiar libremente sin citar.',
        feedback: 'Incorrecto. Todo contenido intelectual tiene derechos de autor. En el SENA se fomenta el uso ético del software y la debida citación y atribución.',
        isCorrect: false,
        regulationArticle: 'Art. 10 - Prohibiciones en el proceso formativo',
      },
      {
        id: 'opt3',
        action: 'Solo se le descuenta un punto en la nota final y continúan sin novedades.',
        feedback: 'Incorrecto. En el SENA no existen calificaciones cuantitativas numéricas de 1 a 5 (se evalúa "Aprobado" o "No Aprobado"), y el fraude requiere debido proceso ante el Comité.',
        isCorrect: false,
        regulationArticle: 'Art. 28 - Procedimiento sancionatorio y comité de convivencia',
      },
    ],
  },
  {
    id: 'caso-seguridad',
    title: 'Caso 3: Uso de Elementos de Protección Personal (EPP) y Carné',
    context: 'En los talleres de Mecatrónica y Laboratorios de Biotecnología existen normas rigurosas de bioseguridad industrial.',
    situation: 'Un aprendiz olvida sus gafas de protección y su carné institucional, e intenta ingresar al área operativa con sandalias abiertas argumentando que solo va a mirar por 10 minutos.',
    question: '¿Qué principio institucional prima y cómo debe proceder el personal y el aprendiz?',
    options: [
      {
        id: 'opt1',
        action: 'El aprendiz debe abstenerse de ingresar al taller sin los EPP requeridos y portar siempre visible el carné institucional por su propia seguridad y la de sus compañeros.',
        feedback: '¡Correcto! La preservación de la vida, la integridad física y el respeto a los protocolos de seguridad industrial son deberes inquebrantables de todo aprendiz SENA.',
        isCorrect: true,
        regulationArticle: 'Art. 9 - Deberes de seguridad ocupacional y porte obligatorio del carné institucional',
      },
      {
        id: 'opt2',
        action: 'Dejarlo entrar si promete no tocar ninguna máquina ni acercarse a los reactivos.',
        feedback: 'Incorrecto. Ninguna persona puede ingresar a ambientes con riesgo operativo sin la dotación completa de EPP, pues expone su vida e infringe las normas del centro.',
        isCorrect: false,
        regulationArticle: 'Manual de Seguridad y Salud en el Trabajo SENA',
      },
      {
        id: 'opt3',
        action: 'Prestarle un carné falso de otro compañero para que el guardia no lo detecte.',
        feedback: 'Incorrecto. La suplantación de identidad mediante carné institucional es una falta disciplinaria sancionable.',
        isCorrect: false,
        regulationArticle: 'Acuerdo 0009 de 2024 - Deberes y Prohibiciones expresas',
      },
    ],
  },
  {
    id: 'caso-novedad-aplazamiento',
    title: 'Caso 4: Novedades Académicas y Aplazamiento por Fuerza Mayor',
    context: 'Luisa es aprendiz tecnóloga y debe someterse a un procedimiento quirúrgico con incapacidad médica de 35 días continuos.',
    situation: 'Luisa está preocupada por perder su cupo formativo o ser reportada por deserción debido al prolongado tiempo de recuperación.',
    question: 'Bajo el Acuerdo 0009 de 2024, ¿qué novedad académica debe gestionar y cuál es la regla aplicable?',
    options: [
      {
        id: 'opt1',
        action: 'Radicar formalmente la novedad de Aplazamiento con los soportes médicos, la cual aplica para suspensiones temporales de 20 o más días continuos por causa justificada, reservando su derecho a solicitar Reintegro.',
        feedback: '¡Correcto! El Acuerdo 0009 de 2024 estipula que el Aplazamiento procede por 20 o más días continuos por causas justificadas (médicas, maternidad/paternidad, servicio militar, etc.), permitiendo posterior Reintegro formal.',
        isCorrect: true,
        regulationArticle: 'Acuerdo 0009 de 2024 - Novedades Académicas (Aplazamiento y Reintegro)',
      },
      {
        id: 'opt2',
        action: 'Dejar de asistir sin avisar y esperar que el sistema la retire automáticamente.',
        feedback: 'Incorrecto. La inasistencia injustificada configura causal de deserción con posibles inhabilidades.',
        isCorrect: false,
        regulationArticle: 'Acuerdo 0009 de 2024 - Deserción y consecuencias',
      },
      {
        id: 'opt3',
        action: 'Solicitar un Retiro Voluntario definitivo y perder todo su avance formativo.',
        feedback: 'Incorrecto. El Retiro Voluntario es definitivo, mientras que el Aplazamiento protege el cupo formativo para retornar mediante Reintegro.',
        isCorrect: false,
        regulationArticle: 'Acuerdo 0009 de 2024 - Novedades Académicas',
      },
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Historia y Misión',
    question: '¿En qué año fue fundado el Servicio Nacional de Aprendizaje SENA y quién fue su fundador principal?',
    options: [
      { id: 'a', text: 'En 1957 por Rodolfo Martínez Tono.', isCorrect: true },
      { id: 'b', text: 'En 1991 por la Asamblea Nacional Constituyente.', isCorrect: false },
      { id: 'c', text: 'En 1970 por el Ministerio de Hacienda.', isCorrect: false },
      { id: 'd', text: 'En 1948 por Jorge Eliécer Gaitán.', isCorrect: false },
    ],
    explanation: 'El SENA nació en 1957 mediante el Decreto Ley 118 de la Junta Militar, como una iniciativa visionaria del abogado y economista cartagenero Rodolfo Martínez Tono.',
  },
  {
    id: 2,
    category: 'Símbolos SENA',
    question: '¿Qué sectores económicos representan respectivamente el Piñón, el Caduceo y la Rama de café en el escudo del SENA?',
    options: [
      { id: 'a', text: 'Industria/Construcción, Comercio/Servicios, y Sector Agropecuario/Primario.', isCorrect: true },
      { id: 'b', text: 'Minería, Banca y Turismo.', isCorrect: false },
      { id: 'c', text: 'Gobierno, Iglesia y Fuerza Pública.', isCorrect: false },
      { id: 'd', text: 'Salud, Transporte y Telecomunicaciones exclusivamente.', isCorrect: false },
    ],
    explanation: 'Los tres elementos condensan los 3 motores productivos de Colombia: el piñón (industria), el caduceo con alas (comercio y servicios) y la rama con fruto de café (campo y agro).',
  },
  {
    id: 3,
    category: 'Símbolos SENA',
    question: '¿Qué representa la figura humana estilizada que avanza en el logotipo/isotipo del SENA?',
    options: [
      { id: 'a', text: 'Al aprendiz como centro del proceso formativo, caminando con optimismo por el sendero hacia el futuro y el progreso del país.', isCorrect: true },
      { id: 'b', text: 'A un deportista corriendo una maratón.', isCorrect: false },
      { id: 'c', text: 'Un árbol que da sombra a las empresas.', isCorrect: false },
      { id: 'd', text: 'Un compás de dibujo arquitectónico.', isCorrect: false },
    ],
    explanation: 'El logo del caminante simboliza al aprendiz integral, superando obstáculos y marchando hacia la autorrealización personal y laboral.',
  },
  {
    id: 4,
    category: 'Modelo Pedagógico FPI',
    question: '¿Cuáles son las cuatro fuentes del conocimiento en la Formación Profesional Integral del SENA?',
    options: [
      { id: 'a', text: 'El Instructor, El Entorno, Las TIC y El Trabajo Colaborativo.', isCorrect: true },
      { id: 'b', text: 'Los exámenes escritos, las notas, las fotocopias y el tablero.', isCorrect: false },
      { id: 'c', text: 'Internet, YouTube, Wikipedia y las redes sociales.', isCorrect: false },
      { id: 'd', text: 'La biblioteca municipal, la secretaría de educación, la alcaldía y la empresa.', isCorrect: false },
    ],
    explanation: 'En el enfoque FPI, el aprendizaje no depende solo del instructor, sino de la interacción activa con el entorno real, las herramientas TIC y el trabajo en equipo.',
  },
  {
    id: 5,
    category: 'Etapas de Formación',
    question: '¿Cuáles son las dos grandes etapas que componen los programas de formación titulada en el SENA?',
    options: [
      { id: 'a', text: 'Etapa Lectiva y Etapa Productiva.', isCorrect: true },
      { id: 'b', text: 'Etapa Teórica y Etapa de Vacaciones.', isCorrect: false },
      { id: 'c', text: 'Etapa Básica y Etapa Universitaria.', isCorrect: false },
      { id: 'd', text: 'Etapa de Matrícula y Etapa de Graduación.', isCorrect: false },
    ],
    explanation: 'La etapa lectiva desarrolla las competencias en ambientes formativos; la etapa productiva permite aplicar y perfeccionar los resultados en el contexto laboral real.',
  },
  {
    id: 6,
    category: 'Reglamento del Aprendiz',
    question: '¿Cuál es el actual Reglamento del Aprendiz vigente en el SENA y cuál es su objeto normativo?',
    options: [
      { id: 'a', text: 'El Acuerdo 0009 de 2024 del Consejo Directivo Nacional, que adopta el nuevo reglamento y deroga los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.', isCorrect: true },
      { id: 'b', text: 'El Código de Policía y Convivencia Nacional.', isCorrect: false },
      { id: 'c', text: 'La Ley 100 de Seguridad Social.', isCorrect: false },
      { id: 'd', text: 'El Acuerdo 07 de 2012 sin ninguna modificación.', isCorrect: false },
    ],
    explanation: 'El Consejo Directivo Nacional adoptó el Acuerdo 0009 de 2024 como el marco normativo actual que unifica y actualiza los derechos, deberes y debido proceso de los aprendices SENA.',
  },
  {
    id: 7,
    category: 'Novedades Académicas',
    question: 'Bajo el Acuerdo 0009 de 2024, ¿cuál es el requisito temporal para solicitar formalmente un Aplazamiento?',
    options: [
      { id: 'a', text: 'Suspensión temporal por 20 o más días continuos debidamente soportada en causas justificadas (médicas, maternidad/paternidad, servicio militar, etc.).', isCorrect: true },
      { id: 'b', text: 'Solo se puede solicitar para ausencias de medio día.', isCorrect: false },
      { id: 'c', text: 'No existe el aplazamiento bajo ninguna circunstancia.', isCorrect: false },
      { id: 'd', text: 'Debe ser superior a 2 años obligatoriamente.', isCorrect: false },
    ],
    explanation: 'El Acuerdo 0009 de 2024 define el Aplazamiento como la suspensión temporal de la formación por 20 o más días continuos por causas justificadas, habilitando el posterior Reintegro.',
  },
  {
    id: 8,
    category: 'Bienestar al Aprendiz',
    question: '¿Qué componente del SENA ofrece apoyo y capital semilla condonable para emprendedores?',
    options: [
      { id: 'a', text: 'El Fondo Emprender.', isCorrect: true },
      { id: 'b', text: 'El Banco de la República.', isCorrect: false },
      { id: 'c', text: 'La Caja de Compensación Familiar.', isCorrect: false },
      { id: 'd', text: 'El Fondo de Cesantías.', isCorrect: false },
    ],
    explanation: 'Fondo Emprender es el fondo de capital semilla más grande del país, creado para financiar iniciativas empresariales de aprendices y egresados SENA.',
  },
  {
    id: 9,
    category: 'Ecosistema SENA',
    question: '¿Qué es SENNOVA dentro del ecosistema institucional del SENA?',
    options: [
      { id: 'a', text: 'El Sistema de Investigación, Desarrollo Tecnológico e Innovación del SENA (Semilleros, TecnoParques y TecnoAcademias).', isCorrect: true },
      { id: 'b', text: 'La cafetería de los centros de formación.', isCorrect: false },
      { id: 'c', text: 'El servicio de transporte de instructores.', isCorrect: false },
      { id: 'd', text: 'Un torneo de fútbol inter-centros.', isCorrect: false },
    ],
    explanation: 'SENNOVA conecta la formación técnica con la vanguardia científica y la transferencia tecnológica hacia los sectores productivos de Colombia.',
  },
  {
    id: 10,
    category: 'Convivencia y Valores',
    question: '¿Cuál de los siguientes es un deber fundamental de todo aprendiz según el Reglamento?',
    options: [
      { id: 'a', text: 'Portar el carné institucional en lugar visible, cuidar la infraestructura y convivir bajo principios de respeto y no discriminación.', isCorrect: true },
      { id: 'b', text: 'Asistir únicamente cuando no llueva.', isCorrect: false },
      { id: 'c', text: 'Compartir contraseñas de las plataformas con personas externas.', isCorrect: false },
      { id: 'd', text: 'Utilizar los equipos de cómputo para juegos en horas de clase.', isCorrect: false },
    ],
    explanation: 'El cuidado del patrimonio público, el porte del carné y la convivencia pacífica fundamentan la cultura institucional de los aprendices SENA.',
  },
];
