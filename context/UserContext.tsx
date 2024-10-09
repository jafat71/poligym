import { emptyUser } from '@/constants';
import { User } from '@/types/interfaces/entities/user';
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface UserContextType {
    userLogged: boolean;
    tmpUser: User | null;
    set1InitUser: (updatedFields: Partial<User>) => void;
    setEmptyUser: () => void
}

const UserContext = createContext<UserContextType>({
    userLogged: false,
    tmpUser: emptyUser,
    set1InitUser: function (updatedFields: Partial<User>): void {
        throw new Error('Function not implemented.');
    },
    setEmptyUser: function (): void {
        throw new Error('Function not implemented.');
    }
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userLogged, setUserLogged] = useState(false);
    const [tmpUser, setTmpUSer] = useState<User | null>(emptyUser);

    useEffect(() => {
        console.log(tmpUser)
    }, [tmpUser])

    const setUser = (updatedFields: Partial<User> | null) => {
        //TODO; Setear User directamente desde DB a estado de la
    };

    const set1InitUser = (updatedFields: Partial<User> | null) => {
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

    const setEmptyUser = () => set1InitUser(emptyUser);


    return (
        <UserContext.Provider value={{ userLogged, tmpUser, set1InitUser, setEmptyUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => useContext(UserContext);
