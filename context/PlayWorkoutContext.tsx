import { ExerciseInWorkoutAPI } from "@/types/interfaces/entities/plan";
import { router, usePathname, useRouter } from "expo-router";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface WorkoutPlayContextType {
    // Exercise list state
    playExercises: ExerciseInWorkoutAPI[];
    setPlayExercises: (playExercises: ExerciseInWorkoutAPI[]) => void;
    completedPlayExercises: { [key: string]: boolean };
    setCompletedPlayExercises: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    
    currentExerciseIndex: number;
    currentSet: number;
    timeLeft: number;
    isPlaying: boolean;
    isResting: boolean;
    
    startWorkout: () => void;
    togglePlay: () => void;
    handleNextExercise: () => void;

    workoutStartTime: number;
    getWorkoutDuration: () => number;
    isCompleted: boolean;
    setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
    REST_TIME: number;
    EXERCISE_TIME: number;
}

const WorkoutPlayContext = createContext<WorkoutPlayContextType | undefined>({
    playExercises: [],
    setPlayExercises: () => { },
    completedPlayExercises: {},
    setCompletedPlayExercises: () => { },

    currentExerciseIndex: 0,
    currentSet: 1,
    timeLeft: 15,
    isPlaying: false,
    isResting: false,

    startWorkout: () => { },
    togglePlay: () => { },
    handleNextExercise: () => { },

    workoutStartTime: 0,
    getWorkoutDuration: () => 0,
    isCompleted: false,
    setIsCompleted: () => { },
    REST_TIME: 0,
    EXERCISE_TIME: 0,
}); 

interface WorkoutPlayProviderProps {    
    children: ReactNode;
}

export const WorkoutPlayProvider = ({ children }: WorkoutPlayProviderProps) => {
    const [playExercises, setPlayExercises] = useState<ExerciseInWorkoutAPI[]>([]);
    const [completedPlayExercises, setCompletedPlayExercises] = useState<{ [key: string]: boolean }>({});

    console.log(completedPlayExercises)
    useEffect(() => {
        console.log("PLAY EXERCISES",playExercises)
    }, [playExercises]);

    useEffect(() => {
        console.log("COMPLETED EXERCISES",completedPlayExercises)
    }, [completedPlayExercises])

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isResting, setIsResting] = useState(false);
    const [workoutStartTime, setWorkoutStartTime] = useState(0);

    const [isCompleted, setIsCompleted] = useState(false);

    const [REST_TIME, setREST_TIME] = useState(30);
    const [EXERCISE_TIME, setEXERCISE_TIME] = useState(45);

    const [progress, setProgress] = useState(0);

    const currentPath = usePathname();
    const exercisePath = "/playexercise";

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0 && currentPath === exercisePath) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        if (currentPath !== exercisePath) {
            setIsPlaying(false);
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, currentPath]);

    useEffect(() => {
        if (timeLeft === 0) {
            const currentExercise = playExercises[currentExerciseIndex];
            if (isResting) {
                setIsResting(false);
                setTimeLeft(EXERCISE_TIME);
            } else if (currentSet < currentExercise.sets) {
                setCurrentSet(prev => prev + 1);
                setIsResting(true);
                setTimeLeft(currentExercise.restTime);
                setREST_TIME(currentExercise.restTime);
            } else {
                handleNextExercise();
            }
        }
    }, [timeLeft]);

    const handleNextExercise = () => {
        if (currentExerciseIndex < playExercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
            setCurrentSet(1);
            setIsResting(false);
            setTimeLeft(EXERCISE_TIME);
            setCompletedPlayExercises(prev => ({
                ...prev,
                [playExercises[currentExerciseIndex].id]: true
            }));
        } else {
            //COMPLETE LAST EXERCISE, RESET ALL AND NAVIGATE BACK
            setIsResting(false);
            setCompletedPlayExercises(prev => ({
                ...prev,
                [playExercises[currentExerciseIndex].id]: true
            }));
            setIsPlaying(false);
            setIsCompleted(true);
            setTimeout(() => {
                router.back();
            }, 2000);
        }
    };

    const startWorkout = () => {
        setCurrentExerciseIndex(0);
        setProgress(0);
        setCurrentSet(1);
        setTimeLeft(EXERCISE_TIME);
        setIsPlaying(true);
        setIsResting(false);
        setWorkoutStartTime(Date.now());
        setCompletedPlayExercises({});
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    const getWorkoutDuration = () => {
        return Math.floor((Date.now() - workoutStartTime) / 1000);
    };

    return (
        <WorkoutPlayContext.Provider value={{
            playExercises,
            setPlayExercises,
            completedPlayExercises,
            setCompletedPlayExercises,
            currentExerciseIndex,
            currentSet,
            timeLeft,
            isPlaying,
            isResting,
            startWorkout,
            togglePlay,
            handleNextExercise,
            workoutStartTime,
            getWorkoutDuration,
            isCompleted,
            setIsCompleted,
            REST_TIME,
            EXERCISE_TIME,
}}>
            {children}
        </WorkoutPlayContext.Provider>
    );
};

export const usePlayWorkoutContext = (): WorkoutPlayContextType => {
    const context = useContext(WorkoutPlayContext);
    if (context === undefined) {
        throw new Error('usePlayWorkoutContext must be used within a WorkoutPlayProvider');
    }
    return context;
};
    