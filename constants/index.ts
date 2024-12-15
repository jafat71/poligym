import { FITNESS_LEVEL, GENDER, GOAL, ROLE, User, USER_TYPE } from "@/types/interfaces/entities/user";

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

export let emptyUser: Partial<User> = {
  name: '',
  age: 0,
  gender: GENDER.MALE,
  weight: 0,
  height: 0,
  goal: GOAL.LOSE_WEIGHT,
  fitnessLevel: FITNESS_LEVEL.BEGINNER,
  injury: '',
  avatarUrl: '',
  userType: USER_TYPE.STUDENT,
}

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

