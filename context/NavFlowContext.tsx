import { emptyUser } from '@/constants';
import { IndividualExercise, RoutinePlan, TrainingPlan } from '@/types/interfaces/entities/plan';
import { User } from '@/types/interfaces/entities/user';
import { MuscleGroups } from '@/types/types/muscles';
import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';

interface NavigationFlowContextType {
    screenPlan: TrainingPlan | null;
    setScreenPlan: Dispatch<SetStateAction<TrainingPlan | null>>;
    screenRoutine: RoutinePlan | null;
    setScreenRoutine: Dispatch<SetStateAction<RoutinePlan | null>>;
    screenExercise: IndividualExercise | null;
    setScreenExercise: Dispatch<SetStateAction<IndividualExercise | null>>;
    screenPlayExercises: IndividualExercise[] | null;
    setScreenPlayExercises: Dispatch<SetStateAction<IndividualExercise[] | null>>;
    tmpUser: User | null;
    updateInitUserShell: (updatedFields: Partial<User>) => void;
}

const NavigationFlowContext = createContext<NavigationFlowContextType>({
    screenPlan: null,
    setScreenPlan: () => { },
    screenRoutine: null,
    setScreenRoutine: () => { },
    screenExercise: null,
    setScreenExercise: () => { },
    screenPlayExercises: null,
    setScreenPlayExercises: () => { },
    tmpUser: emptyUser,
    updateInitUserShell: () => { },
});

interface NavigationFlowProviderProps {
    children: ReactNode;
}

export const NavigationFlowProvider: React.FC<NavigationFlowProviderProps> = ({ children }) => {
    const [screenPlan, setScreenPlan] = useState<TrainingPlan | null>(null)
    const [screenRoutine, setScreenRoutine] = useState<RoutinePlan | null>(null);
    const [screenExercise, setScreenExercise] = useState<IndividualExercise | null>(null);
    const [tmpUser, setTmpUSer] = useState<User | null>(emptyUser);
    const [screenPlayExercises, setScreenPlayExercises] = useState<IndividualExercise[] | null>(null);
    
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
            screenRoutine,
            setScreenRoutine,
            screenExercise,
            setScreenExercise,
            screenPlayExercises,
            setScreenPlayExercises,
        }}>
            {children}
        </NavigationFlowContext.Provider>
    );
};

export const useNavigationFlowContext = (): NavigationFlowContextType => useContext(NavigationFlowContext);
