import { User } from "../interfaces/entities/user"

export const mapUserFromApiToUser = (user: any) : User => {
    
    let userLogged : User = {
        userId: user.id || "",
        userName: user.name || "",
        userEmail: user.email || "",
        userRole: user.roles[0] || "",
        userAge: user.userAge || 0,
        userGenre: user.userGenre || null,
        userNumberActivityDays: user.userNumberActivityDays || 0,
        userWeight: user.userWeight || 0,
        userHeight: user.userHeight || 0,
        userObjetive: user.userObjetive || null,
        userPhisicStatus: user.userPhisicStatus || null,
        userNumberComents: user.userNumberComents || 0,
        userNotificationsEnabled: user.userNotificationsEnabled || false,
        userHasMedicalProblems: user.userHasMedicalProblems || false,
        userMedicalProblemDetail: user.userMedicalProblemDetail || null,
        userPreferedSchedule: user.userPreferedSchedule || null,
        userProfileImgUrl: user.userProfileImgUrl || "",
        userTrainingDays: user.userTrainingDays || [],
    }
    return userLogged
}