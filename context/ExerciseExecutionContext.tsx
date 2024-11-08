
import { IndividualExercise, RoutinePlanUser, TrainingPlan } from '@/types/interfaces/entities/plan';
import React, { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch } from 'react';

interface ExerciseExecutionContextType {
    nextRoutine: RoutinePlanUser | null;
    nextExercise: IndividualExercise | null;
    setNextRoutine: Dispatch<SetStateAction<RoutinePlanUser | null>>;   
    setNextExercise: Dispatch<SetStateAction<IndividualExercise | null>>;
}

const ExerciseExecutionContext = createContext<ExerciseExecutionContextType>({
    nextRoutine: null,
    nextExercise: null,
    setNextRoutine: () => {},
    setNextExercise: () => {}

});

interface ExerciseExecutionProviderProps {
    children: ReactNode;
}

export const ExerciseExecutionProvider: React.FC<ExerciseExecutionProviderProps> = ({ children }) => {

    const [nextRoutine, setNextRoutine] = useState<RoutinePlanUser | null>(null);
    const [nextExercise, setNextExercise] = useState<IndividualExercise | null>(null);

    return (
        <ExerciseExecutionContext.Provider value={{
            nextRoutine,
            nextExercise,
            setNextRoutine,
            setNextExercise
        }}>
            {children}
        </ExerciseExecutionContext.Provider>
    );
};

export const useExerciseExecution = (): ExerciseExecutionContextType => useContext(ExerciseExecutionContext);
