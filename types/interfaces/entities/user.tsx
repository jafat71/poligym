
type Role = "USER" | "ADMIN"
type Genre = "MASCULINO" | "FEMENINO" | "OTRO"
type Objetive = "BAJAR_DE_PESO" | "GANAR_MUSCULO" | "MANTENERSE_EN_FORMA"
type Experience = "PRINCIPIANTE" | "INTERMEDIO" | "AVANZADO"
type Schedule = "AM" | "PM"
type MedicalProblem = "NINGUNA" | "LESION" | "ALERGIA"

export interface DaysWeek {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
}

export interface User {
    userId: string,
    userName: string,
    userEmail: string,
    userRole: Role,
    userAge: number,
    userGenre: Genre,
    userNumberActivityDays: number,
    userWeight: number,
    userHeight: number,
    userObjetive: Objetive,
    userPhisicStatus: Experience,
    userNumberComents: number,
    userNotificationsEnabled: boolean,
    userHasMedicalProblems: MedicalProblem,
    userMedicalProblemDetail: string,
    userPreferedSchedule: Schedule,
    userTrainingDays: DaysWeek,
    userProfileImgUrl: string,
}
