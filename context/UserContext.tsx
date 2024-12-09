import { getUserInfo, verifyToken } from '@/lib/api/auth';
import { getToken } from '@/lib/token/store';
import { TrainingPlan } from '@/types/interfaces/entities/plan';
import { User } from '@/types/interfaces/entities/user';
import { mapUserFromApiToUser } from '@/types/mappers';
import { usePathname } from 'expo-router';
import { router } from 'expo-router';
import React, { createContext, useContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigationFlowContext } from './NavFlowContext';
import { useQuery } from '@tanstack/react-query';

interface UserContextType {
    userLogged: boolean;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
    loggedUserInfo: User | null;
    accessToken: string | null;
    userSelectedPlan: TrainingPlan | null;
    setUserSelectedPlan: Dispatch<SetStateAction<TrainingPlan | null>>;
    updateUserInfo: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
    userLogged: false,
    setAccessToken: () => { },
    loggedUserInfo: null,
    accessToken: null,
    userSelectedPlan: null,
    setUserSelectedPlan: () => { },
    updateUserInfo: async () => { }
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

    const { updateInitUserShell } = useNavigationFlowContext()
    useEffect(() => {
        if (userLogged) {
            //CREACION DE CUENTA
            if (pathname !== '/form00') {
                if (pathname !== '/home') {
                    router.replace('/(root)/(tabs)/home')
                }
            }else{
                console.log(loggedUserInfo?.name)
                //Rescata el nombre para el formulario inciial tras el signup
                updateInitUserShell({
                    name: loggedUserInfo?.name || "",
                })
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
        console.log("accessToken", accessToken)
    }, [accessToken])

    const updateUserInfo = async () => {
        const response = await getUserInfo(loggedUserInfo?.id!, accessToken!)
        const userMapped = mapUserFromApiToUser(response)
        setLoggedUserInfo(userMapped)
    }

    return (
        <UserContext.Provider value={{
            userLogged,
            setAccessToken,
            loggedUserInfo: loggedUserInfo ?? null,
            accessToken,
            userSelectedPlan,
            setUserSelectedPlan,
            updateUserInfo
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => useContext(UserContext);
