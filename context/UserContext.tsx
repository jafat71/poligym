import { emptyUser } from '@/constants';
import { getUserInfo, refreshAccessToken, verifyToken } from '@/lib/api/auth';
import { getToken, saveToken } from '@/lib/token/store';
import { User } from '@/types/interfaces/entities/user';
import { mapUserFromApiToUser } from '@/types/mappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { createContext, useContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react';

interface UserContextType {
    userLogged: boolean;
    tmpUser: User | null;
    updateInitUserShell: (updatedFields: Partial<User>) => void;
    setEmptyUser: () => void;
    setAccessToken: (newToken: string|null) => Promise<void>;
    loggedUserInfo: User | null;
    accessToken: string | null;
}

const UserContext = createContext<UserContextType>({
    userLogged: false,
    tmpUser: emptyUser,
    updateInitUserShell: () => { },
    setEmptyUser: () => { },
    setAccessToken: async () => { },
    loggedUserInfo: null,
    accessToken: null
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userLogged, setUserLogged] = useState(false);
    const [tmpUser, setTmpUSer] = useState<User | null>(emptyUser);
    const [loggedUserInfo, setLoggedUserInfo] = useState<User | null>();
    const queryClient = useQueryClient();

    const {
        data: accessToken,
        refetch: refetchAccessToken,
        isLoading: isTokenLoading,
    } = useQuery({
        queryKey: ['accessToken'],
        queryFn: async () => {
            const token = await getToken('accessToken');
            if (!token) return null;

            try {
                await verifyToken(token);
                return token;
            } catch (error) {
                console.log("ACCESS TOKEN EXPIRED/UNAUTHORIZED");
                return null;
            }
        },
        staleTime: 15 * 60 * 1000, // 14 minutes
        refetchInterval: 15 * 60 * 1000, // 14 minutes
    });

    const refreshTokenMutation = useMutation({
        mutationFn: async () => {
            const refreshToken = await getToken('refreshToken');
            if (!refreshToken) throw new Error('No refresh token available');

            try {
                console.log("REFRESHING ACCESS TOKEN");
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    await saveToken('accessToken', newAccessToken);
                    return newAccessToken;
                } else {
                    throw new Error('Failed to refresh access token');
                }
            } catch (refreshError) {
                console.log("REFRESH ERROR", refreshError);
                throw refreshError;
            }
        },
        onSuccess: (newAccessToken) => {
            queryClient.setQueryData(['accessToken'], newAccessToken);
        },
        onError: () => {
            setUserLogged(false);
            setLoggedUserInfo(null);
        },
    });

    useEffect(() => {
        if (!isTokenLoading) {
            if (accessToken) {
                fetchUser(accessToken);
            } else {
                refreshTokenMutation.mutate();
            }
        }
    }, [accessToken, isTokenLoading]);

    const fetchUser = async (token: string) => {
        try {
            const response = await verifyToken(token);
            const userResponse = await getUserInfo(response.user.id, token);
            const userMapped = mapUserFromApiToUser(userResponse);
            setLoggedUserInfo(userMapped);
            setUserLogged(true);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            setLoggedUserInfo(null);
            setUserLogged(false);
            refreshTokenMutation.mutate();
        }
    };

    useEffect(() => {
        const fetchRefreshToken = async () => {
            console.log("ACCESS TOKEN", accessToken)
            console.log("REFRESF TOKEN", await getToken('refreshToken'))
        }
        fetchRefreshToken()
    }, [accessToken])

    useEffect(() => {
        (userLogged) 
        ? router.replace('/(root)/(drawer)/(tabs)/home')
        : router.replace('/welcome')
    }, [userLogged])

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

    const setAccessToken = async (newToken: string|null) => {
        await saveToken('accessToken', newToken ?? '');
        queryClient.invalidateQueries({ queryKey: ['accessToken'] });

    };

    return (
        <UserContext.Provider value={{
            userLogged,
            tmpUser,
            updateInitUserShell,
            setEmptyUser,
            setAccessToken,
            loggedUserInfo: loggedUserInfo ?? null,
            accessToken: accessToken ?? null
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => useContext(UserContext);
