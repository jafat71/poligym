import { User } from "../interfaces/entities/user"

export const mapUserFromApiToUser = (user: any) : User => {
    
    
    let newUser : User = {
        userNew: user.userNew,
        userId: user.userId,
        userName: user.userName,
        userEmail: user.userEmail,
        userRole: user.userRole,
        userAge: user.userAge,
        userGenre: user.userGenre,
        userNumberActivityDays: user.userNumberActivityDays,
        userWeight: user.userWeight,
        userHeight: user.userHeight,
        userObjetive: user.userObjetive,
        userPhisicStatus: user.userPhisicStatus,
        userNumberComents: user.userNumberComents,
        userNotificationsEnabled: user.userNotificationsEnabled,
        userHasMedicalProblems: user.userHasMedicalProblems,
        userMedicalProblemDetail: user.userMedicalProblemDetail,
        userPreferedSchedule: user.userPreferedSchedule,
        userProfileImgUrl: user.userProfileImgUrl,
        userTrainingDays: user.userTrainingDays,
    }
    return newUser
}