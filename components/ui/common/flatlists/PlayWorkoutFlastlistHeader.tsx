import { Easing, Pressable, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { WorkoutAPI } from "@/types/interfaces/entities/plan";
import { DIFFICULTIES } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import ButtonPill from "../buttons/ButtonPill";
import { Ionicons } from "@expo/vector-icons";
import { usePlayWorkoutContext } from "@/context/PlayWorkoutContext";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import HomePill from "../pills/HomePill";

interface PlayWorkoutFlatlistHeaderProps {
    workout: WorkoutAPI;
    totalExercises: number;
    handlePlayWorkout: () => void;
}

export const PlayWorkoutFlatlistHeader = ({
    workout,
    totalExercises,
    handlePlayWorkout
}: PlayWorkoutFlatlistHeaderProps) => {

    const { completedPlayExercises, lastWorkoutPlayed } = usePlayWorkoutContext()

    const { isDark } = useTheme();

    const [exercisesCompleted, setExercisesCompleted] = useState(0);
    const [progressOver100, setProgressOver100] = useState(0);
    const [isExecuting, setIsExecuting] = useState(false);

    useEffect(() => {
        const isLastWorkoutPlayed = lastWorkoutPlayed === workout.id;
        if (isLastWorkoutPlayed) {
            const completedExercisesCount = Object.values(completedPlayExercises).filter(Boolean).length;
            setExercisesCompleted(completedExercisesCount);
            
            const calculatedProgress = completedExercisesCount / totalExercises;
            setProgressOver100(calculatedProgress);
            
            setIsExecuting(calculatedProgress > 0);
        }
    }, [lastWorkoutPlayed, completedPlayExercises, totalExercises])

    return (
        <View className="rounded-lg overflow-hidden mb-2">
            <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />
            <View className="p-4 pb-3 ">
                <Text className={`text-white text-4xl font-ralewayBold mb-4 flex-1`}>
                    {workout.name}
                </Text>
                <View className="flex-row items-center mb-2">
                    <HomePill
                        icon="time-outline"
                        text={`${workout.duration} min.`}
                    />
                    <HomePill
                        icon="flame-outline"
                        text={`${DIFFICULTIES.find(diff => diff.value === workout.level)?.label || ''}`}
                    />
                </View>

                <View className="flex-row items-center justify-between">
                    <View className="w-3/4">
                        <ButtonPill
                            icon="save-outline"
                            text="Guardar"
                            onPress={() => { }}
                        />
                        {
                            isExecuting && (
                                <ButtonPill
                                    icon="play-outline"
                                    text="Reanudar"
                                    onPress={() => {
                                        router.navigate(`/(animated)/playexercise`)
                                    }}
                                />
                            )
                        }
                    </View>

                    <Pressable
                        onPress={handlePlayWorkout}
                        className={`absolute bottom-0 right-0 w-20 h-20 flex flex-col
                    items-center justify-center bg-eBlue-800
                    rounded-full 
                `}
                    >
                        {
                            isExecuting ? (
                                <Ionicons name="refresh-outline" size={24} color={"#fff"} />
                            ) : (
                                <Ionicons name="play" size={24} color={"#fff"} />
                            )
                        }
                    </Pressable>
                </View>

                <View className="my-4">
                    <Text className={`text-sm font-ralewayBold text-white`}>
                        Descripción
                    </Text>
                    <Text className={`text-xl font-ralewayLight text-white mb-4`}>
                        {workout.description}
                    </Text>
                </View>

                <View className={``}>

                    <Progress.Bar
                        progress={progressOver100}
                        width={null}
                        height={8}
                        color={"#77ffaa"}
                        unfilledColor={"#1c1c1c"}
                        borderWidth={0}
                        borderRadius={4}
                        style={{
                            borderRadius: 4,
                        }}
                        animated={true}
                        animationType="timing"
                        animationConfig={{ duration: 1000, easing: Easing.linear }}
                    />

                    <View className="flex-row justify-between mt-2">
                        <View>
                            <Text className={`font-ralewayBold text-start text-white`}>Ejercicios</Text>
                            <Text className={`text-4xl text-start text-white`}>
                                {exercisesCompleted}/{totalExercises}
                            </Text>
                        </View>
                        <View className="flex flex-col items-end justify-end">
                            <Text className={`font-ralewayBold text-start text-white`}>Progreso</Text>
                            <Text className={`text-4xl text-start text-white`}>
                                {Math.round(progressOver100 * 100)}/100%
                            </Text>
                        </View>
                    </View>
                </View>
  
            </View>

        </View>
    )
}
