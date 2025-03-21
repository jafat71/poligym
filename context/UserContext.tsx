import { getUserInfo, verifyToken } from '@/lib/api/auth';
import { getToken } from '@/lib/token/store';
import { WorkoutAPI, TrainingPlanAPI } from '@/types/interfaces/entities/plan';
import { User } from '@/types/interfaces/entities/user';
import { mapUserFromApiToUser } from '@/types/mappers';
import { usePathname } from 'expo-router';
import { router } from 'expo-router';
import React, { createContext, useContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigationFlowContext } from './NavFlowContext';
import { NutritionPlan } from '@/types/interfaces/entities/foodplan';
import { getActivePlan, getUserHistoryWorkoutProgress } from '@/database/sqlite';
import { fetchTrainingPlanById } from '@/lib/api/actions';

interface UserContextType {
    userLogged: boolean;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
    loggedUserInfo: User | null;
    accessToken: string | null;
    userSelectedPlan: TrainingPlanAPI | null;
    setUserSelectedPlan: Dispatch<SetStateAction<TrainingPlanAPI | null>>;
    updateUserInfo: () => Promise<void>;
    setLoggedUserInfo: Dispatch<SetStateAction<User | null | undefined>>;
    userFavWorkouts: WorkoutAPI[];
    userFavFoodPlans: NutritionPlan[];
    userFavTrainingPlans: TrainingPlanAPI[];
    setUserFavWorkouts: Dispatch<SetStateAction<WorkoutAPI[]>>;
    setUserFavFoodPlans: Dispatch<SetStateAction<NutritionPlan[]>>;
    setUserFavTrainingPlans: Dispatch<SetStateAction<TrainingPlanAPI[]>>;
}

const UserContext = createContext<UserContextType>({
    userLogged: false,
    setAccessToken: () => { },
    loggedUserInfo: null,
    accessToken: null,
    userSelectedPlan: null,
    setUserSelectedPlan: () => { },
    updateUserInfo: async () => { },
    setLoggedUserInfo: () => { },
    userFavWorkouts: [],
    userFavFoodPlans: [],
    userFavTrainingPlans: [],
    setUserFavWorkouts: () => { },
    setUserFavFoodPlans: () => { },
    setUserFavTrainingPlans: () => { }
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userLogged, setUserLogged] = useState(false);
    const [loggedUserInfo, setLoggedUserInfo] = useState<User | null>();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const pathname = usePathname()
    const [userSelectedPlan, setUserSelectedPlan] = useState<TrainingPlanAPI | null>(null)

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
            try {
                const response = await verifyToken(accessToken!)
                const userResponse = await getUserInfo(response.user.id, accessToken!)
                const userMapped = mapUserFromApiToUser(userResponse)
                const userPlanProgress = await getActivePlan(userMapped.id)
                if(userPlanProgress){
                    const userCurrentPLan = await fetchTrainingPlanById(accessToken!, userPlanProgress.planId)
                    setUserSelectedPlan(userCurrentPLan)
                }
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
        console.log("pathname", pathname)
    }, [pathname])

    const { updateInitUserShell } = useNavigationFlowContext()
    useEffect(() => {
        if (userLogged) {
            //CREACION DE CUENTA
            if (pathname !== '/form00') {
                if (pathname !== '/home') {
                    router.replace('/(root)/(tabs)/home')
                }
            }else{
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

    const updateUserInfo = async () => {
        const response = await getUserInfo(loggedUserInfo?.id!, accessToken!)
        const userMapped = mapUserFromApiToUser(response)
        setLoggedUserInfo(userMapped)
    }

    const [userFavWorkouts, setUserFavWorkouts] = useState<WorkoutAPI[]>([]);
    const [userFavFoodPlans, setUserFavFoodPlans] = useState<NutritionPlan[]>([]);
    const [userFavTrainingPlans, setUserFavTrainingPlans] = useState<TrainingPlanAPI[]>([]);

    return (
        <UserContext.Provider value={{
            userLogged,
            setAccessToken,
            loggedUserInfo: loggedUserInfo ?? null,
            accessToken,
            userSelectedPlan,
            setUserSelectedPlan,
            updateUserInfo,
            setLoggedUserInfo,
            userFavWorkouts,
            userFavFoodPlans,
            userFavTrainingPlans,
            setUserFavWorkouts,
            setUserFavFoodPlans,
            setUserFavTrainingPlans
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => useContext(UserContext);
