import { emptyUser } from '@/constants';
import { getUserInfo, verifyToken } from '@/lib/api/api';
import { getToken } from '@/lib/token/store';
import { User } from '@/types/interfaces/entities/user';
import { mapUserFromApiToUser } from '@/types/mappers';
import { router } from 'expo-router';
import React, { createContext, useContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react';

interface UserContextType {
    userLogged: boolean;
    tmpUser: User | null;
    updateInitUserShell: (updatedFields: Partial<User>) => void;
    setEmptyUser: () => void;
    setToken: Dispatch<SetStateAction<string | null>>;
    loggedUserInfo: User | null;
}

const UserContext = createContext<UserContextType>({
    userLogged: false,
    tmpUser: emptyUser,
    updateInitUserShell: () => { },
    setEmptyUser: () => { },
    setToken: () => { },
    loggedUserInfo: null
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userLogged, setUserLogged] = useState(false);
    const [tmpUser, setTmpUSer] = useState<User | null>(emptyUser);
    const [loggedUserInfo, setLoggedUserInfo] = useState<User | null>();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        getToken('accessToken')
        .then((token) => {
            if (token) {
                setToken(token)
            }else{
                setToken(null)
            }
        }).catch((error) => {
            console.error('Error al obtener el token:', error);
        })
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await verifyToken(token)
                    const userResponse = await getUserInfo(response.user.id, token)
                    console.log("RESPONSE USER")
                    console.log(userResponse)
                    const userMapped = mapUserFromApiToUser(userResponse)
                    console.log(userMapped)
                    setLoggedUserInfo(userMapped)
                    setUserLogged(true)
                } catch (error) {
                    setLoggedUserInfo(null)
                    setUserLogged(false);
                }
            } else {
                setLoggedUserInfo(null)
                setUserLogged(false);
            }
        };

        fetchUser();
    }, [token]);

    useEffect(() => {
        console.log("USER LOGGED", userLogged)
        if (userLogged) {
            console.log("USER LOGGED")
            router.replace('/(root)/(drawer)/(tabs)/home')
        }else{ 
            console.log("USER NOT LOGGED")
            router.replace('/welcome')
        }
    }, [userLogged])


    useEffect(() => {
        // console.log(tmpUser)
    }, [tmpUser])

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

    const setEmptyUser = () => setLoggedUserInfo(null);

    return (
        <UserContext.Provider value={{ 
            userLogged, 
            tmpUser, 
            updateInitUserShell, 
            setEmptyUser, 
            setToken,
            loggedUserInfo: loggedUserInfo ?? null 
            }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => useContext(UserContext);
