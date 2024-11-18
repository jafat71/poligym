import { getUserInfo, verifyToken } from '@/lib/api/auth';
import { getToken } from '@/lib/token/store';
import { TrainingPlan } from '@/types/interfaces/entities/plan';
import { User } from '@/types/interfaces/entities/user';
import { mapUserFromApiToUser } from '@/types/mappers';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'expo-router';
import { router } from 'expo-router';
import React, { createContext, useContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react';

interface UserContextType {
    userLogged: boolean;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
    loggedUserInfo: User | null;
    accessToken: string | null;
    userSelectedPlan: TrainingPlan | null;
    setUserSelectedPlan: Dispatch<SetStateAction<TrainingPlan | null>>;
}

const UserContext = createContext<UserContextType>({
    userLogged: false,
    setAccessToken: () => { },
    loggedUserInfo: null,
    accessToken: null,
    userSelectedPlan: null,
    setUserSelectedPlan: () => { }
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userLogged, setUserLogged] = useState(false);
    const [loggedUserInfo, setLoggedUserInfo] = useState<User | null>();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const pathname = usePathname()
    const [userSelectedPlan, setUserSelectedPlan] = useState<TrainingPlan | null>(null)
    const queryClient = useQueryClient();
   
    useEffect(() => {
        getToken('accessToken')
            .then((token) => {
                if (token) {
                    setAccessToken(token)
                } else {
                    setAccessToken(null)
                }
            }).catch((error) => {
                console.error('Error al obtener el token:', error);
            })
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            console.log("Fetching user")
            try {
                console.log("Verifying token")
                const response = await verifyToken(accessToken!)
                console.log("Getting user info")
                const userResponse = await getUserInfo(response.user.id, accessToken!)
                const userMapped = mapUserFromApiToUser(userResponse)
                setLoggedUserInfo(userMapped)
                setUserLogged(true)
            } catch (error) {
                setLoggedUserInfo(null)
                setUserLogged(false);
            }
        };

        accessToken ? fetchUser() : setUserLogged(false)
    }, [accessToken]);

    useEffect(() => {
        if (userLogged) {
            if (pathname !== '/form01') {
                if(pathname !== '/home'){
                    router.replace('/(root)/(tabs)/home')
                }
            } 
        } else {
            router.replace('/welcome')
        }
    }, [userLogged])

    useEffect(() => {
        const getRefreshToken = async () => {
            const refreshToken = await getToken('refreshToken')
            console.log("refreshToken", refreshToken)
        }
        console.log("accessToken", accessToken)
        getRefreshToken()
    }, [accessToken])

    useEffect(() => {
        console.log("Cache completo:", queryClient.getQueryCache().getAll());
    }, [queryClient]);

    return (
        <UserContext.Provider value={{
            userLogged,
            setAccessToken,
            loggedUserInfo: loggedUserInfo ?? null,
            accessToken,
            userSelectedPlan,
            setUserSelectedPlan
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => useContext(UserContext);
