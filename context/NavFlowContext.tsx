import { emptyUser } from '@/constants';
import { ExerciseAPI, ExerciseInWorkoutAPI, IndividualExercise, PlanAlimentacion, RoutinePlan, TrainingPlan, WorkoutAPI } from '@/types/interfaces/entities/plan';
import { SocialPost } from '@/types/interfaces/entities/post';
import { User } from '@/types/interfaces/entities/user';
import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';

interface NavigationFlowContextType {
    screenPlan: TrainingPlan | null;
    setScreenPlan: Dispatch<SetStateAction<TrainingPlan | null>>;
    screenExercise: IndividualExercise | null;
    setScreenExercise: Dispatch<SetStateAction<IndividualExercise | null>>;
    screenPlayExercises: ExerciseInWorkoutAPI[] | null;
    setScreenPlayExercises: Dispatch<SetStateAction<ExerciseInWorkoutAPI[] | null>>;
    tmpUser: User | null;
    updateInitUserShell: (updatedFields: Partial<User>) => void;
    userPosts: SocialPost[];
    setUserPosts: Dispatch<SetStateAction<SocialPost[]>>;
}

const NavigationFlowContext = createContext<NavigationFlowContextType>({
    screenPlan: null,
    setScreenPlan: () => { },
    screenExercise: null,
    setScreenExercise: () => { },
    screenPlayExercises: null,
    setScreenPlayExercises: () => { },
    tmpUser: emptyUser,
    updateInitUserShell: () => { },
    userPosts: [],
    setUserPosts: () => { },
});

interface NavigationFlowProviderProps {
    children: ReactNode;
}

export const NavigationFlowProvider: React.FC<NavigationFlowProviderProps> = ({ children }) => {
    const [screenPlan, setScreenPlan] = useState<TrainingPlan | null>(null)
    const [screenExercise, setScreenExercise] = useState<IndividualExercise | null>(null);
    const [tmpUser, setTmpUSer] = useState<User | null>(emptyUser);
    const [screenPlayExercises, setScreenPlayExercises] = useState<ExerciseInWorkoutAPI[] | null>(null);

    const [userPosts, setUserPosts] = useState<SocialPost[]>([]);
    
    // useEffect(() => {
    //     console.log("tmpUser", tmpUser)
    // }, [tmpUser])


    const updateInitUserShell = (updatedFields: Partial<User> | null) => {
        if (updatedFields === null) {
            setTmpUSer(null)
            return
        }
        setTmpUSer((prevUser) => {
            if (!prevUser) return null;

            return {
                ...prevUser,
                userId: updatedFields.userId ?? prevUser.userId,
                userName: updatedFields.userName ?? prevUser.userName,
                userEmail: updatedFields.userEmail ?? prevUser.userEmail,
                userRole: updatedFields.userRole ?? prevUser.userRole,
                userAge: updatedFields.userAge ?? prevUser.userAge,
                userGenre: updatedFields.userGenre ?? prevUser.userGenre,
                userNumberActivityDays: updatedFields.userNumberActivityDays ?? prevUser.userNumberActivityDays,
                userWeight: updatedFields.userWeight ?? prevUser.userWeight,
                userHeight: updatedFields.userHeight ?? prevUser.userHeight,
                userObjetive: updatedFields.userObjetive ?? prevUser.userObjetive,
                userPhisicStatus: updatedFields.userPhisicStatus ?? prevUser.userPhisicStatus,
                userNumberComents: updatedFields.userNumberComents ?? prevUser.userNumberComents,
                userNotificationsEnabled: updatedFields.userNotificationsEnabled ?? prevUser.userNotificationsEnabled,
                userHasMedicalProblems: updatedFields.userHasMedicalProblems ?? prevUser.userHasMedicalProblems,
                userMedicalProblemDetail: updatedFields.userMedicalProblemDetail ?? prevUser.userMedicalProblemDetail,
                userPreferedSchedule: updatedFields.userPreferedSchedule ?? prevUser.userPreferedSchedule,
                userTrainingDays: updatedFields.userTrainingDays ?? prevUser.userTrainingDays,
                userProfileImgUrl: updatedFields.userProfileImgUrl ?? prevUser.userProfileImgUrl,
            };
        });
    };

    return (
        <NavigationFlowContext.Provider value={{
            tmpUser,
            updateInitUserShell,
            screenPlan,
            setScreenPlan,
            screenExercise,
            setScreenExercise,
            screenPlayExercises,
            setScreenPlayExercises,
            userPosts,
            setUserPosts,
        }}>
            {children}
        </NavigationFlowContext.Provider>
    );
};

export const useNavigationFlowContext = (): NavigationFlowContextType => useContext(NavigationFlowContext);
