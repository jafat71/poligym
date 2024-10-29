import { Plan } from '@/components/ui/plans/PlanConstants';
import { emptyUser } from '@/constants';
import { User } from '@/types/interfaces/entities/user';
import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';

interface NavigationFlowContextType {
    screenPlan: Plan | null;
    setScreenPlan: Dispatch<SetStateAction<Plan | null>>;
    tmpUser: User | null;
    updateInitUserShell: (updatedFields: Partial<User>) => void;
}

const NavigationFlowContext = createContext<NavigationFlowContextType>({
    screenPlan: null,
    setScreenPlan: () => { },
    tmpUser: emptyUser,
    updateInitUserShell: () => { },
});

interface NavigationFlowProviderProps {
    children: ReactNode;
}

export const NavigationFlowProvider: React.FC<NavigationFlowProviderProps> = ({ children }) => {
    const [screenPlan, setScreenPlan] = useState<Plan | null>(null)
    const [tmpUser, setTmpUSer] = useState<User | null>(emptyUser);

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

    useEffect(() => {
        console.log(screenPlan)
    }, [screenPlan])

    return (
        <NavigationFlowContext.Provider value={{
            tmpUser,
            updateInitUserShell,
            screenPlan,
            setScreenPlan,
        }}>
            {children}
        </NavigationFlowContext.Provider>
    );
};

export const useNavigationFlowContext = (): NavigationFlowContextType => useContext(NavigationFlowContext);
