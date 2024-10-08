import { emptyUser } from '@/constants';
import { User } from '@/types/interfaces/entities/user';
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface UserContextType {
    userLogged: boolean;
    user: User | null;
    setUser: (updatedFields: Partial<User>) => void; 
}

const UserContext = createContext<UserContextType>({
    userLogged: false,
    user: emptyUser,
    setUser: function (updatedFields: Partial<User>): void {
        throw new Error('Function not implemented.');
    }
});

interface UserProviderProps  {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps > = ({ children }) => {
    const [userLogged, setUserLogged] = useState(false);
    const [user, setUserState] = useState<User | null>(emptyUser);

    useEffect(() => {
      console.log(user)
    }, [user])
    
    const setUser = (updatedFields: Partial<User>|null) => {
        if(updatedFields===null) {
            setUserState(null)
            return
        }
        setUserState((prevUser) => {
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

    const setActualUser = (user: User) => {
        setUserState(user);
        setUserLogged(true);
    };

    const unsetActualUser = () => {
        setUserState(null);
        setUserLogged(false);
    };
    return (
        <UserContext.Provider value={{ userLogged, user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => useContext(UserContext);
