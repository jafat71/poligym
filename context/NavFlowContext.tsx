import { emptyUser } from '@/constants';
import { ExerciseInWorkoutAPI } from '@/types/interfaces/entities/plan';
import { SocialPost } from '@/types/interfaces/entities/post';
import { User } from '@/types/interfaces/entities/user';
import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';

interface NavigationFlowContextType {
    screenPlayExercises: ExerciseInWorkoutAPI[] | null;
    setScreenPlayExercises: Dispatch<SetStateAction<ExerciseInWorkoutAPI[] | null>>;
    tmpUser: Partial<User> | null;
    updateInitUserShell: (updatedFields: Partial<User>) => void;
    userPosts: SocialPost[];    
    setUserPosts: Dispatch<SetStateAction<SocialPost[]>>;
}

const NavigationFlowContext = createContext<NavigationFlowContextType>({
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
    const [tmpUser, setTmpUSer] = useState<Partial<User> | null>(emptyUser);
    const [screenPlayExercises, setScreenPlayExercises] = useState<ExerciseInWorkoutAPI[] | null>(null);
    const [userPosts, setUserPosts] = useState<SocialPost[]>([]);
    
    const updateInitUserShell = (updatedFields: Partial<User> | null) => {
        if (!updatedFields) {
            setTmpUSer(null);
            return;
        }
        setTmpUSer((prevUser) => prevUser ? { ...prevUser, ...updatedFields } : null);
    };
    
    return (
        <NavigationFlowContext.Provider value={{
            tmpUser,
            updateInitUserShell,
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
