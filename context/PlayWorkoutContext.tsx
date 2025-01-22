import { getFormattedTime } from "@/lib/utils/getFormattedTime";
import { ExerciseInWorkoutAPI } from "@/types/interfaces/entities/plan";
import { router, usePathname } from "expo-router";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Vibration } from "react-native"

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
    workoutTotalDuration: string;
    currentExerciseDuration: string;
    isCompleted: boolean;
    setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
    REST_TIME: number;
    EXERCISE_TIME: number;
    lastWorkoutPlayed: number;
    goBackPreviousExercise: () => void;
    resetWorkout: () => void;
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
    workoutTotalDuration: "00:00",
    currentExerciseDuration: "00:00",
    isCompleted: false,
    setIsCompleted: () => { },
    REST_TIME: 0,
    EXERCISE_TIME: 0,
    lastWorkoutPlayed: 0,
    goBackPreviousExercise: () => { },
    resetWorkout: () => { }
}); 

interface WorkoutPlayProviderProps {    
    children: ReactNode;
}

export const WorkoutPlayProvider = ({ children }: WorkoutPlayProviderProps) => {
    const [playExercises, setPlayExercises] = useState<ExerciseInWorkoutAPI[]>([]);
    const [completedPlayExercises, setCompletedPlayExercises] = useState<{ [key: string]: boolean }>({});

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

    const [lastWorkoutPlayed, setlastWorkoutPlayed] = useState(0);

    const [workoutTotalDuration, setWorkoutTotalDuration] = useState("00:00");
    const [currentExerciseDuration, setCurrentExerciseDuration] = useState("00:00");

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
            Vibration.vibrate(500);
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
        setCurrentExerciseDuration(getFormattedTime(EXERCISE_TIME));
        if (currentExerciseIndex < playExercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
            setCurrentSet(1);
            setIsResting(false);
            setTimeLeft(EXERCISE_TIME);
            setCompletedPlayExercises(prev => ({
                ...prev,
                [playExercises[currentExerciseIndex].id]: true
            }));
            setlastWorkoutPlayed(playExercises[currentExerciseIndex].workoutId);
        } else {
            //COMPLETE LAST EXERCISE, RESET ALL AND NAVIGATE BACK
            setIsResting(false);
            setCompletedPlayExercises(prev => ({
                ...prev,
                [playExercises[currentExerciseIndex].id]: true
            }));
            setIsPlaying(false);
            setIsCompleted(true);
            let totalWorkoutDuration = getWorkoutDuration();
            setWorkoutTotalDuration(totalWorkoutDuration);
            setTimeout(() => {
                router.back();
                resetWorkout();
            }, 1000);
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
        setWorkoutTotalDuration("00:00");
        setCurrentExerciseDuration("00:00");
    };

    const resetWorkout = () => {
        setlastWorkoutPlayed(0); //resetea el ultimo workout para habilitar drag and drop + edit individual de cada ejercicio
        setIsCompleted(false);
        setCompletedPlayExercises({});
        setCurrentExerciseIndex(0);
        setCurrentSet(1);
        setTimeLeft(EXERCISE_TIME);
        setIsPlaying(false);
        setIsResting(false);
    }

    const goBackPreviousExercise = () => {
        if (currentExerciseIndex > 0) { 
            setCurrentExerciseIndex(prev => prev - 1);
            setCurrentSet(1);
            setIsResting(false);
            setTimeLeft(EXERCISE_TIME);
        }
    }

    const togglePlay = () => setIsPlaying(!isPlaying);

    const getWorkoutDuration = () => {
        const totalSeconds = Math.floor((Date.now() - workoutStartTime) / 1000);
        return getFormattedTime(totalSeconds);
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
            workoutTotalDuration,
            currentExerciseDuration,
            isCompleted,
            setIsCompleted,
            REST_TIME,
            EXERCISE_TIME,
            lastWorkoutPlayed,
            goBackPreviousExercise,
            resetWorkout
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