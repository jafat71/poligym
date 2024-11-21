import { DayOfWeek, MealType } from "@/types/interfaces/entities/foodplan";
import { EquipmentApi, MuscleGroup } from "@/types/interfaces/entities/plan";
import { SocialPost } from "@/types/interfaces/entities/post";
import { Experience, Genre, MedicalProblem, Objetive, Schedule, User } from "@/types/interfaces/entities/user";

export const termsContent = [
  {
    title: "1. Aceptación de los términos",
    description: "Al acceder y utilizar la aplicación, aceptas quedar vinculado por estos términos y condiciones. La universidad se reserva el derecho de modificar estos términos en cualquier momento sin previo aviso. Las actualizaciones serán publicadas en la aplicación y se considerarán efectivas desde su fecha de publicación. Es tu responsabilidad revisar periódicamente los términos para estar al tanto de cualquier cambio."
  },
  {
    title: "2. Registro y cuenta de usuario",
    description: "Para utilizar ciertos servicios de la aplicación, debes crear una cuenta proporcionando información precisa y actualizada. Esta información será utilizada exclusivamente para gestionar tu acceso y los servicios del gimnasio. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, así como de cualquier actividad que ocurra bajo tu cuenta."
  },
  {
    title: "3. Uso adecuado de los servicios",
    description: "Los usuarios deben utilizar la aplicación únicamente para los fines previstos: gestión de citas, reservas de clases, control de asistencia y acceso a la información del gimnasio. Cualquier uso indebido de la aplicación, como la alteración del sistema, la obtención de acceso no autorizado o el uso de datos de otros usuarios, resultará en la suspensión o cancelación de tu cuenta, además de las acciones legales que correspondan."
  },
  {
    title: "4. Propiedad intelectual",
    description: "Todo el contenido de la aplicación, incluyendo pero no limitado a textos, gráficos, logotipos, iconos, imágenes y software, es propiedad de POLIGYM o de sus licenciantes y está protegido por las leyes de propiedad intelectual. No se permite la reproducción, distribución o modificación del contenido sin el consentimiento expreso por escrito de POLIGYM."
  },
  {
    title: "5. Limitación de responsabilidad",
    description: "POLIGYM no será responsable de ningún daño directo, indirecto, incidental o consecuente que surja del uso o la incapacidad de uso de la aplicación. Esto incluye, pero no se limita a, la pérdida de datos, interrupción del servicio o cualquier otro tipo de pérdida."
  },
  {
    title: "6. Enlaces a terceros",
    description: "La aplicación puede contener enlaces a sitios web de terceros. POLIGYM no tiene control sobre el contenido, políticas de privacidad o prácticas de estos sitios y no asume ninguna responsabilidad por ellos. Te recomendamos que revises las políticas de privacidad de cualquier sitio web de terceros que visites."
  },
  {
    title: "7. Modificaciones de los servicios",
    description: "POLIGYM se reserva el derecho de modificar, suspender o descontinuar la aplicación o cualquier parte de ella en cualquier momento sin previo aviso. No seremos responsables ante ti ni ante terceros por cualquier modificación, suspensión o descontinuación de la aplicación."
  },
  {
    title: "8. Política de privacidad",
    description: "La privacidad de tus datos es importante para nosotros. Consulta nuestra Política de Privacidad para obtener información sobre cómo recopilamos, utilizamos y protegemos tus datos personales."
  },
  {
    title: "9. Cancelación y suspensión",
    description: "POLIGYM se reserva el derecho de cancelar o suspender tu cuenta en cualquier momento y por cualquier motivo, incluyendo, entre otros, violaciones a estos términos y condiciones o cualquier actividad que se considere perjudicial para otros usuarios o para la aplicación."
  },
  {
    title: "10. Indemnización",
    description: "Aceptas indemnizar y mantener indemne a POLIGYM, sus directores, empleados y agentes, de cualquier reclamación, pérdida, daño o gasto, incluyendo honorarios razonables de abogados, que surjan del uso que hagas de la aplicación o de tu violación de estos términos."
  },
  {
    title: "11. Legislación aplicable",
    description: "Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país en el que se encuentre POLIGYM, sin tener en cuenta sus disposiciones sobre conflictos de leyes."
  },
  {
    title: "12. Aceptación final",
    description: "Al utilizar la aplicación POLIGYM, confirmas que has leído, entendido y aceptado estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguno de los términos, no utilices la aplicación."
  }
];

export const FAQs = [
  {
    title: "¿Puedo encontrar ejercicios específicos en la app?",
    description: "Sí, en la sección 'Ejercicios' puedes buscar ejercicios por categoría (cardio, fuerza, estiramientos, etc.) o por grupo muscular. Cada ejercicio incluye una descripción y video tutorial."
  },
  {
    title: "¿Puedo seguir el progreso de mis entrenamientos?",
    description: "Sí, la app registra tu actividad cada vez que completas una rutina o ejercicio. En la sección 'Mi progreso' puedes ver estadísticas de tus entrenamientos, incluyendo tiempo invertido, ejercicios completados y calorías estimadas."
  },
  {
    title: "¿Cómo puedo conectarme con otros estudiantes en la app?",
    description: "Puedes conectarte con otros estudiantes a través de la sección 'Comunidad'. Puedes seguir a otros usuarios, compartir tus rutinas o consejos, y participar en discusiones sobre temas relacionados con el entrenamiento."
  },
  {
    title: "¿La app ofrece recomendaciones de ejercicios?",
    description: "Sí, la app te puede recomendar ejercicios basados en tus objetivos de fitness. Solo tienes que ingresar tus preferencias en el apartado 'Mis objetivos', y recibirás sugerencias personalizadas."
  },
  {
    title: "¿Cómo puedo eliminar mi cuenta?",
    description: "Si deseas eliminar o desactivar tu cuenta, por favor ponte en contacto con un administrador."
  }
];

export let emptyUser: User = {
  userId: '',
  userName: '',
  userEmail: '',
  userRole: 'USER',
  userAge: 0,
  userGenre: 'MASCULINO',
  userNumberActivityDays: 0,
  userWeight: 0,
  userHeight: 0,
  userObjetive: 'BAJAR_DE_PESO',
  userPhisicStatus: 'PRINCIPIANTE',
  userNumberComents: 0,
  userNotificationsEnabled: false,
  userHasMedicalProblems: 'NINGUNA',
  userMedicalProblemDetail: '',
  userPreferedSchedule: 'AM',
  userTrainingDays: {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  },
  userProfileImgUrl: '',
}

export const genreMapper: Record<Genre, number> = {
  'MASCULINO': 0,
  'FEMENINO': 1,
  'OTRO': 2
}
export const genresOptions = ['Másculino', 'Femenino', 'No Binario']

export const objetiveMapper: Record<Objetive, number> = {
  'BAJAR_DE_PESO': 0,
  'GANAR_MUSCULO': 1,
  'MANTENERSE_EN_FORMA': 2
}
export const objetiveOptions = ['Bajar de Peso', 'Ganar Músculo', 'Mantenerse en forma']

export const experienceMapper: Record<Experience, number> = {
  'PRINCIPIANTE': 0,
  'INTERMEDIO': 1,
  'AVANZADO': 2
}
export const experienceOptions = ['Principiante', 'Intermedio', 'Avanzado']

export const medicProblemMapper: Record<MedicalProblem, number> = {
  'NINGUNA': 0,
  'LESION': 1,
  'ALERGIA': 2
}
export const medicalProblemsOptions = ['Ninguno', 'Lesión', 'Alergía']

export const scheduleMapper: Record<Schedule, number> = {
  'AM': 0,
  'PM': 1,
}
export const scheduleOptions = ['AM', 'PM']

export const TrainingPlans = [
  {
    id: 1,
    nombre: "Plan Inicial",
    imagenPlanEntrenamiento: 'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descripcion: "Un plan básico para principiantes que introduce los conceptos fundamentales del entrenamiento.",
    duracion: 4,  // semanas
    dificultad: "Baja",
    oculto: false,
    detalleDias: {
      lunes: {
        id: 1,
        nombre: 'Rutina de Fuerza',
        dificultad: 'Alta',
        oculto: false,
        musculos: ['chest', 'lowerBack', 'quads'],
        ejercicios: [
          {
            id: 6,
            nombre: 'Press de Banca',
            series: 4,
            repeticiones: 8,
            tiempoDescanso: 90
          },
          {
            id: 7,
            nombre: 'Peso Muerto',
            series: 4,
            repeticiones: 6,
            tiempoDescanso: 120
          },
          {
            id: 8,
            nombre: 'Sentadillas',
            series: 4,
            repeticiones: 10,
            tiempoDescanso: 90
          }
        ]
      },
      martes: "Descanso",
      miércoles: {
        id: 2,
        nombre: 'Rutina de Hipertrofia',
        dificultad: 'Media',
        oculto: true,
        musculos: ['biceps', 'chest', 'shoulders'],
        ejercicios: [
          {
            id: 9,
            nombre: 'Curl de Bíceps',
            series: 4,
            repeticiones: 12,
            tiempoDescanso: 60
          },
          {
            id: 10,
            nombre: 'Press Militar',
            series: 4,
            repeticiones: 10,
            tiempoDescanso: 90
          },
          {
            id: 11,
            nombre: 'Fondos en Paralelas',
            series: 3,
            repeticiones: 15,
            tiempoDescanso: 60
          }
        ]
      },
      jueves: "Descanso",
      viernes: {
        id: 4,
        nombre: 'Rutina de Potencia',
        dificultad: 'Alta',
        oculto: true,
        musculos: ['traps', 'shoulders', 'quads'],
        ejercicios: [
          {
            id: 14,
            nombre: 'Arranque con Barra',
            series: 5,
            repeticiones: 5,
            tiempoDescanso: 120
          },
          {
            id: 15,
            nombre: 'Press de Hombro con Mancuernas',
            series: 4,
            repeticiones: 8,
            tiempoDescanso: 90
          },
          {
            id: 16,
            nombre: 'Dominadas',
            series: 4,
            repeticiones: 8,
            tiempoDescanso: 90
          }
        ]
      }
    }
  },
  {
    id: 2,
    nombre: "Plan de Resistencia",
    imagenPlanEntrenamiento: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descripcion: "Diseñado para mejorar la resistencia cardiovascular y muscular.",
    duracion: 6,
    dificultad: "Media",
    oculto: false,
    detalleDias: {
      lunes: {
        id: 5,
        nombre: 'Cardio Interválico',
        dificultad: 'Media',
        oculto: false,
        musculos: ['legs', 'core'],
        ejercicios: [
          { id: 17, nombre: 'Sprints en cinta', series: 5, repeticiones: 1, tiempoDescanso: 60 },
          { id: 18, nombre: 'Burpees', series: 4, repeticiones: 15, tiempoDescanso: 45 },
          { id: 19, nombre: 'Saltos de caja', series: 4, repeticiones: 10, tiempoDescanso: 60 }
        ]
      },
      martes: "Descanso",
      miércoles: {
        id: 6,
        nombre: 'Resistencia de Tren Superior',
        dificultad: 'Media',
        oculto: false,
        musculos: ['shoulders', 'back', 'arms'],
        ejercicios: [
          { id: 20, nombre: 'Remo con mancuernas', series: 4, repeticiones: 12, tiempoDescanso: 90 },
          { id: 21, nombre: 'Flexiones', series: 4, repeticiones: 15, tiempoDescanso: 60 },
          { id: 22, nombre: 'Dominadas asistidas', series: 3, repeticiones: 10, tiempoDescanso: 90 }
        ]
      },
      jueves: "Descanso",
      viernes: {
        id: 7,
        nombre: 'Entrenamiento de Circuito',
        dificultad: 'Alta',
        oculto: false,
        musculos: ['fullBody'],
        ejercicios: [
          { id: 23, nombre: 'Salto de cuerda', series: 5, repeticiones: 60, tiempoDescanso: 30 },
          { id: 24, nombre: 'Mountain Climbers', series: 5, repeticiones: 30, tiempoDescanso: 45 },
          { id: 25, nombre: 'Flexiones de diamante', series: 3, repeticiones: 15, tiempoDescanso: 60 }
        ]
      }
    }
  },
  {
    id: 3,
    nombre: "Plan de Ganancia Muscular",
    imagenPlanEntrenamiento: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descripcion: "Enfocado en la hipertrofia y desarrollo muscular para ganar masa.",
    duracion: 8,
    dificultad: "Alta",
    oculto: false,
    detalleDias: {
      lunes: {
        id: 8,
        nombre: 'Entrenamiento de Piernas',
        dificultad: 'Alta',
        oculto: false,
        musculos: ['quads', 'hamstrings', 'glutes'],
        ejercicios: [
          { id: 26, nombre: 'Sentadilla profunda', series: 4, repeticiones: 8, tiempoDescanso: 120 },
          { id: 27, nombre: 'Peso muerto rumano', series: 4, repeticiones: 8, tiempoDescanso: 120 },
          { id: 28, nombre: 'Prensa de pierna', series: 3, repeticiones: 12, tiempoDescanso: 90 }
        ]
      },
      martes: "Descanso",
      miércoles: {
        id: 9,
        nombre: 'Tren Superior y Pecho',
        dificultad: 'Alta',
        oculto: false,
        musculos: ['chest', 'triceps', 'shoulders'],
        ejercicios: [
          { id: 29, nombre: 'Press inclinado con barra', series: 4, repeticiones: 8, tiempoDescanso: 90 },
          { id: 30, nombre: 'Aperturas con mancuernas', series: 4, repeticiones: 12, tiempoDescanso: 60 },
          { id: 31, nombre: 'Fondos en paralelas', series: 4, repeticiones: 10, tiempoDescanso: 90 }
        ]
      },
      jueves: "Descanso",
      viernes: {
        id: 10,
        nombre: 'Espalda y Bíceps',
        dificultad: 'Alta',
        oculto: false,
        musculos: ['back', 'biceps'],
        ejercicios: [
          { id: 32, nombre: 'Dominadas con lastre', series: 4, repeticiones: 6, tiempoDescanso: 120 },
          { id: 33, nombre: 'Curl de bíceps con barra', series: 4, repeticiones: 10, tiempoDescanso: 60 },
          { id: 34, nombre: 'Remo en barra T', series: 4, repeticiones: 8, tiempoDescanso: 90 }
        ]
      }
    }
  }
];


export const OnboardingItems = [
  {
    title: "Entrenamiento ajustado a tus objetivos",
    image: 'https://img.freepik.com/free-photo/kettlebell-fitness-still-life_23-2151739205.jpg?t=st=1728466010~exp=1728469610~hmac=85441626c8ab165db4563db4380656b72316ddf129d048b5963ece3680e56b91&w=740',
  },
  {
    title: "Monitorea tu progreso",
    image: 'https://img.freepik.com/free-photo/serious-sportswoman-dark-studio-holding-weight_23-2147752861.jpg?t=st=1728467277~exp=1728470877~hmac=a2892e5a7f587f7fb1c81bdfa612ba039443c3fffcd25efc7538d139d06533a3&w=826',
  },
  {
    title: "Lleva tu entrenamiento a otro nivel",
    image: 'https://img.freepik.com/premium-photo/closeup-gym-dumbbells-floor-bokeh-red-blue-fitness-gymnasium-background-wallpaper-copy_1162810-11138.jpg?w=740',
  },
];

const defaultProfilePic = 'https://api.dicebear.com/9.x/initials/svg?seed=User';
const defaultCommentPic = 'https://images.pexels.com/photos/1092878/pexels-photo-1092878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

export const socialPosts  = [
  {
      id: 1,
      imagenPerfil: defaultProfilePic,
      imagenComentario: defaultCommentPic,
      nombre: 'Carlos',
      fecha: '2024-10-15',
      publico: true,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 70 kg',
      likes: 12,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Baja',
      duracion: '40m 33s'
  },
  {
      id: 2,
      imagenPerfil: defaultProfilePic,
      nombre: 'Ana',
      fecha: '2024-10-16',
      publico: false,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 100 kg',
      likes: 5,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Media',
      duracion: '40m 33s'

  },
  {
      id: 3,
      imagenPerfil: defaultProfilePic,
      nombre: 'Pedro',
      fecha: '2024-10-17',
      publico: true,
      oculto: true,
      mensaje: 'ha completado exitosamente la rutina de Peso Muerto con Barra con un peso de 120 kg',
      likes: 3,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Alta',
      duracion: '40m 33s'

  },
  {
      id: 4,
      imagenPerfil: defaultProfilePic,
      nombre: 'Sofía',
      fecha: '2024-10-18',
      publico: false,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 80 kg',
      likes: 8,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Baja',
      duracion: '40m 33s'

  },
  {
      id: 5,
      imagenPerfil: defaultProfilePic,
      nombre: 'Javier',
      fecha: '2024-10-19',
      publico: true,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 110 kg',
      likes: 2,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Baja',
      duracion: '40m 33s'

  },
  {
      id: 6,
      imagenPerfil: defaultProfilePic,
      nombre: 'María',
      fecha: '2024-10-20',
      publico: true,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Peso Muerto con Barra con un peso de 130 kg',
      likes: 10,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Baja',
      duracion: '40m 33s'

  },
  {
      id: 7,
      imagenPerfil: defaultProfilePic,
      nombre: 'Luis',
      fecha: '2024-10-21',
      publico: false,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 90 kg',
      likes: 6,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Baja',
      duracion: '40m 33s'

  },
  {
      id: 8,
      imagenPerfil: defaultProfilePic,
      nombre: 'Elena',
      fecha: '2024-10-22',
      publico: true,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 120 kg',
      likes: 4,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Baja',
      duracion: '40m 33s'

  },
  {
      id: 9,
      imagenPerfil: defaultProfilePic,
      nombre: 'Miguel',
      fecha: '2024-10-23',
      publico: true,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Peso Muerto con Barra con un peso de 140 kg',
      likes: 7,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Baja',
      duracion: '40m 33s'

  },
  {
      id: 10,
      imagenPerfil: defaultProfilePic,
      nombre: 'Laura',
      fecha: '2024-10-24',
      publico: false,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 100 kg',
      likes: 9,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Baja',
      duracion: '40m 33s'

  },
  {
      id: 11,
      imagenPerfil: defaultProfilePic,
      nombre: 'Raul',
      fecha: '2024-10-25',
      publico: true,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 130 kg',
      likes: 11,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Baja',
      duracion: '40m 33s'

  },
  {
      id: 12,
      imagenPerfil: defaultProfilePic,
      nombre: 'Carmen',
      fecha: '2024-10-26',
      publico: true,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Peso Muerto con Barras con un peso de 150 kg',
      likes: 1,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Baja',
      duracion: '40m 33s'

  },
  {
      id: 13,
      imagenPerfil: defaultProfilePic,
      nombre: 'Jorge',
      fecha: '2024-10-27',
      publico: false,
      oculto: false,
      mensaje: 'ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 110 kg',
      likes: 13,
      rutina: 'Rutina de Tren superior',
      dificultad: 'Baja',
      duracion: '40m 33s'

  }
];

export const UserPosts = []


export const exampleUser = {
  id: 1,
  nombre: 'Carlos',
  correo: 'carlos@example.com',
  rol: 'Usuario',
  edad: 25,
  oculto: false,
  genero: 'Masculino',
  diasActividad: 5,
  peso: 55,
  altura: 163,
  objetivo: 'Ganar Músculo',
  estadoFisico: 'Principiante',
  comentarios: 10,
  notificaciones: true,
  problemasMedicos: 'Ninguno',
  detalleProblemasMedicos: '',
  horario: 'AM',
  diasSeleccionados: ['Lunes', 'Martes', 'Viernes'],
  imagenPerfil: defaultProfilePic,
}

export const LibExercises = [
  {
    "id": 1,
    "url": "https://example.com/exercise1",
    "nombre": "Press de banca",
    "dificultad": "Media",
    "categoria": "Fuerza",
    "implemento": "Máquina de press de banca",
    "musculos": ["chest", "triceps", "shoulders"],
  },
  {
    "id": 2,
    "url": "https://example.com/exercise2",
    "nombre": "Sentadilla",
    "dificultad": "Alta",
    "categoria": "Fuerza",
    "implemento": "Máquina de prensa de piernas",
    "musculos": ["quads", "hamstrings", "glutes"],
  },
  {
    "id": 3,
    "url": "https://example.com/exercise3",
    "nombre": "Deadlift",
    "dificultad": "Alta",
    "categoria": "Fuerza",
    "implemento": "Barra de pesas",
    "musculos": ["lowerback", "hamstrings", "glutes"],
  },
  {
    "id": 4,
    "url": "https://example.com/exercise4",
    "nombre": "Jumping Jacks",
    "dificultad": "Baja",
    "categoria": "Cardio",
    "implemento": "Ninguno",
    "musculos": ["calves", "shoulders"],
  },
  {
    "id": 5,
    "url": "https://example.com/exercise5",
    "nombre": "Yoga",
    "dificultad": "Baja",
    "categoria": "Estiramiento",
    "implemento": "Pelota de yoga",
    "musculos": ["hamstrings", "lowerback"],
  },
  {
    "id": 6,
    "url": "https://example.com/exercise6",
    "nombre": "Dominadas",
    "dificultad": "Alta",
    "categoria": "Fuerza",
    "implemento": "Barra de dominadas",
    "musculos": ["lats", "biceps", "shoulders"],
  },
  {
    "id": 7,
    "url": "https://example.com/exercise7",
    "nombre": "Estocadas",
    "dificultad": "Media",
    "categoria": "Fuerza",
    "implemento": "Ninguno",
    "musculos": ["quads", "glutes"],
  }
];

export const LibAlimentacion = [
  {
    id: 1,
    nombre: "Plan Básico de Pérdida de Peso",
    imagenPlanAlimentacion: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descripcion: "Un plan de alimentación diseñado para reducir la ingesta calórica y favorecer la pérdida de peso.",
    usos: 32,
    duracion: 4,  // semanas
    categoria: "Pérdida de Peso",
    oculto: false,
    detalleDias: {
        lunes: {
            desayuno: "Avena con frutas y miel",
            almuerzo: "Ensalada de pollo con aguacate",
            cena: "Pescado a la plancha con verduras al vapor"
        },
        martes: {
            desayuno: "Tostadas integrales con aguacate y huevo",
            almuerzo: "Sopa de verduras y pechuga de pollo",
            cena: "Ensalada de atún con espinacas"
        },
        miércoles: {
            desayuno: "Smoothie verde con espinacas, manzana y avena",
            almuerzo: "Quinoa con vegetales y pollo",
            cena: "Salmón con brócoli al vapor"
        },
        jueves: {
            desayuno: "Tostadas integrales con crema de almendras y plátano",
            almuerzo: "Pechuga de pavo con ensalada mixta",
            cena: "Pechuga de pollo a la parrilla con calabacines"
        },
        viernes: {
            desayuno: "Yogur natural con frutas y nueces",
            almuerzo: "Arroz integral con vegetales y tofu",
            cena: "Tortilla de espinacas con champiñones"
        },
        sábado: {
            desayuno: "Batido de proteínas con leche de almendras y avena",
            almuerzo: "Ensalada César con pechuga de pollo",
            cena: "Filete de ternera con ensalada verde"
        },
        domingo: {
            desayuno: "Pan integral con queso cottage y fresas",
            almuerzo: "Pollo asado con papas y brócoli",
            cena: "Sopa de lentejas y verduras"
        }
    }
},
{
    id: 2,
    nombre: "Plan de Ganancia Muscular",
    imagenPlanAlimentacion: 'https://images.pexels.com/photos/3872365/pexels-photo-3872365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descripcion: "Un plan alto en proteínas y calorías para promover el desarrollo muscular.",
    usos: 22,
    duracion: 6,  // semanas
    categoria: "Volumen",
    oculto: true,
    detalleDias: {
        lunes: {
            desayuno: "Huevos revueltos con jamón y espinacas",
            almuerzo: "Pollo a la parrilla con arroz integral y brócoli",
            cena: "Salmón al horno con quinoa y espárragos"
        },
        martes: {
            desayuno: "Panqueques de avena con frutas y miel",
            almuerzo: "Carne de res con batatas y espinacas",
            cena: "Ensalada de atún con aguacate y pan integral"
        },
        miércoles: {
            desayuno: "Batido de proteínas con plátano y avena",
            almuerzo: "Pechuga de pollo con arroz integral y verduras",
            cena: "Filete de ternera con ensalada de garbanzos"
        },
        jueves: {
            desayuno: "Tostadas de pan integral con mantequilla de maní y plátano",
            almuerzo: "Ensalada de quinoa con pollo y espárragos",
            cena: "Pescado a la plancha con papas asadas"
        },
        viernes: {
            desayuno: "Avena con nueces, pasas y proteína en polvo",
            almuerzo: "Pechuga de pavo con arroz y espinacas",
            cena: "Salmón a la parrilla con batatas"
        },
        sábado: {
            desayuno: "Tortilla de huevo con jamón y queso",
            almuerzo: "Lomo de cerdo con puré de papas y brócoli",
            cena: "Pollo al horno con ensalada mixta"
        },
        domingo: {
            desayuno: "Smoothie de proteína con frutos rojos",
            almuerzo: "Pollo a la parrilla con arroz y ensalada",
            cena: "Lasaña de carne con espinacas"
        }
    }
},
{
    id: 3,
    nombre: "Plan de Mantenimiento",
    imagenPlanAlimentacion: 'https://images.pexels.com/photos/3872373/pexels-photo-3872373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descripcion: "Un plan balanceado para mantener el peso y llevar una alimentación saludable.",
    usos: 14,
    duracion: 8,  // semanas
    categoria: 'Definición',
    oculto: false,
    detalleDias: {
        lunes: {
            desayuno: "Batido de frutas con yogur y avena",
            almuerzo: "Sándwich de pollo con aguacate y ensalada",
            cena: "Pescado al horno con verduras"
        },
        martes: {
            desayuno: "Tostadas de aguacate con huevo",
            almuerzo: "Ensalada de atún con vegetales",
            cena: "Pollo asado con papas al horno"
        },
        miércoles: {
            desayuno: "Avena con frutas y nueces",
            almuerzo: "Wrap de pavo con vegetales",
            cena: "Salmón a la parrilla con espinacas"
        },
        jueves: {
            desayuno: "Tortilla de espinacas y champiñones",
            almuerzo: "Quinoa con pollo y ensalada",
            cena: "Pechuga de pavo con brócoli al vapor"
        },
        viernes: {
            desayuno: "Yogur natural con frutas y granola",
            almuerzo: "Pasta integral con salsa de tomate y pavo",
            cena: "Ensalada de pollo con aguacate"
        },
        sábado: {
            desayuno: "Tostadas integrales con mantequilla de maní",
            almuerzo: "Arroz con pollo y vegetales",
            cena: "Tacos de pescado con ensalada"
        },
        domingo: {
            desayuno: "Batido de frutas con avena",
            almuerzo: "Salmón a la plancha con quinoa",
            cena: "Pollo a la parrilla con ensalada verde"
        }
    }
}
];

export const LastRoutines = [
  {
    "rutina": "Full Body",
    "duracion": "45 min",
    "fecha": "2024-10-13",
    "musculos": ['biceps', 'chest', 'quads']
},
{
    "rutina": "Piernas y Glúteos",
    "duracion": "50 min",
    "fecha": "2024-10-10",
    "musculos": ['glutes', 'quads', 'calves']
},
{
    "rutina": "Pecho y Tríceps",
    "duracion": "40 min",
    "fecha": "2024-10-09",
    "musculos": ['chest', 'triceps', 'shoulders']
},
{
    "rutina": "Cardio Intensivo",
    "duracion": "30 min",
    "fecha": "2024-10-05",
    "musculos": ['calves', 'quads']
},
{
    "rutina": "Espalda y Bíceps",
    "duracion": "55 min",
    "fecha": "2024-10-03",
    "musculos": ['biceps', 'lats', 'traps']
}
]

export const LastAlimentationPlans = [
  {
      "plan": "Plan Básico de Pérdida de Peso",
      "fecha": "2024-10-01",
      "estado": "Activo"
  },
  {
      "plan": "Plan de Ganancia Muscular",
      "fecha": "2024-09-15",
      "estado": "Finalizado"
  },
  {
      "plan": "Plan de Mantenimiento",
      "fecha": "2024-08-25",
      "estado": "Activo"
  }
]

export const LastExercisePlans = [
  {
      "plan": "Entrenamiento de fuerza",
      "dificultad": "Alta",
      "fecha": "2024-10-01",
      "estado": "Activo"
  },
  {
      "plan": "Entrenamiento HIIT",
      "dificultad": "Media",
      "fecha": "2024-09-20",
      "estado": "Finalizado"
  },
  {
      "plan": "Entrenamiento de cuerpo completo",
      "dificultad": "Baja",
      "fecha": "2024-09-05",
      "estado": "Finalizado"
  },
  {
      "plan": "Plan Inicial",
      "dificultad": "Baja",
      "fecha": "2024-09-25",
      "estado": "Finalizado"
  },
  {
      "plan": "Plan Intermedio",
      "dificultad": "Media",
      "fecha": "2024-09-05",
      "estado": "Activo"
  },
  {
      "plan": "Plan Avanzado",
      "dificultad": "Alta",
      "fecha": "2024-09-15",
      "estado": "Finalizado"
  },
]


export type DifficultySearch = 'ALL' | 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
export type CategorySearch = 'ALL' | 'CARDIO' | 'STRENGTH' | 'FLEXIBILITY';

export const DIFFICULTIES: Array<{ value: DifficultySearch; label: string }> = [
    { value: 'ALL', label: 'Todos' },
    { value: 'BASIC', label: 'Principiante' },
    { value: 'INTERMEDIATE', label: 'Intermedio' },
    { value: 'ADVANCED', label: 'Avanzado' }
];

export const CATEGORIES: Array<{ value: CategorySearch; label: string }> = [
    { value: 'ALL', label: 'Todos' },
    { value: 'CARDIO', label: 'Cardio' },
    { value: 'STRENGTH', label: 'Fuerza' },
    { value: 'FLEXIBILITY', label: 'Flexibilidad' }
];

export type FoodCategorySearch = 'ALL' | 'WEIGHT_LOSS' | 'MUSCLE_GAIN' | 'DEFINITION';
export const FOOD_PLAN_CATEGORIES: Array<{ value: FoodCategorySearch; label: string }> = [
    { value: 'ALL', label: 'Todos' },
    { value: 'WEIGHT_LOSS', label: 'Pérdida de peso' },
    { value: 'MUSCLE_GAIN', label: 'Volumen' },
    { value: 'DEFINITION', label: 'Definición' },
];


export const DAYS_OF_WEEK_VALUES: Record<DayOfWeek, string> = {
  MONDAY: 'Lunes',
  TUESDAY: 'Martes',
  WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves',
  FRIDAY: 'Viernes',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo'
}

export const MEAL_TYPES: Record<MealType, string> = {
    BREAKFAST: 'Desayuno',
    LUNCH: 'Almuerzo',
    DINNER: 'Cena',
}
