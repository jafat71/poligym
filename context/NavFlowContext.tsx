import { emptyUser } from '@/constants';
import { ExerciseInWorkoutAPI, IndividualExercise, TrainingPlan } from '@/types/interfaces/entities/plan';
import { SocialPost } from '@/types/interfaces/entities/post';
import { User } from '@/types/interfaces/entities/user';
import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';

interface NavigationFlowContextType {
    screenPlan: TrainingPlan | null;
    setScreenPlan: Dispatch<SetStateAction<TrainingPlan | null>>;
    screenExercise: IndividualExercise | null;
    setScreenExercise: Dispatch<SetStateAction<IndividualExercise | null>>;
    screenPlayExercises: ExerciseInWorkoutAPI[] | null;
    setScreenPlayExercises: Dispatch<SetStateAction<ExerciseInWorkoutAPI[] | null>>;
    tmpUser: Partial<User> | null;
    updateInitUserShell: (updatedFields: Partial<User>) => void;
    userPosts: SocialPost[];
    setUserPosts: Dispatch<SetStateAction<SocialPost[]>>;
}

const NavigationFlowContext = createContext<NavigationFlowContextType>({
    screenPlan: null,
    setScreenPlan: () => { },
    screenExercise: null,
    setScreenExercise: () => { },
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
    const [screenPlan, setScreenPlan] = useState<TrainingPlan | null>(null)
    const [screenExercise, setScreenExercise] = useState<IndividualExercise | null>(null);
    const [tmpUser, setTmpUSer] = useState<Partial<User> | null>(emptyUser);
    const [screenPlayExercises, setScreenPlayExercises] = useState<ExerciseInWorkoutAPI[] | null>(null);

    const [userPosts, setUserPosts] = useState<SocialPost[]>([]);
    
    useEffect(() => {
        console.log("tmpUser", tmpUser)
    }, [tmpUser])

    const updateInitUserShell = (updatedFields: Partial<User> | null) => {
        if (!updatedFields) {
            setTmpUSer(null);
            return;
        }
        console.log("updatedFields", updatedFields)
        setTmpUSer((prevUser) => prevUser ? { ...prevUser, ...updatedFields } : null);
    };
    

    return (
        <NavigationFlowContext.Provider value={{
            tmpUser,
            updateInitUserShell,
            screenPlan,
            setScreenPlan,
            screenExercise,
            setScreenExercise,
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
