import { Easing, Pressable, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { DIFFICULTY, WorkoutAPI } from "@/types/interfaces/entities/plan";
import ButtonPill from "../buttons/ButtonPill";
import { Ionicons } from "@expo/vector-icons";
import { usePlayWorkoutContext } from "@/context/PlayWorkoutContext";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import HomePill from "../pills/HomePill";
import { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

interface PlayWorkoutFlatlistHeaderProps {
    workout: WorkoutAPI;
    totalExercises: number;
    handlePlayWorkout: () => void;
    hasbeenModified: boolean;
    restoreWorkout: () => void;
}

export const PlayWorkoutFlatlistHeader = ({
    workout,
    totalExercises,
    handlePlayWorkout,
    hasbeenModified,
    restoreWorkout
}: PlayWorkoutFlatlistHeaderProps) => {

    const { completedPlayExercises, lastWorkoutPlayed } = usePlayWorkoutContext()
    const isLastWorkoutPlayed = lastWorkoutPlayed === workout.id;

    const exercisesCompleted = (isLastWorkoutPlayed ? Object.values(completedPlayExercises).filter(Boolean).length : 0);
    const progressOver100 = useMemo(
        () => isLastWorkoutPlayed ? Object.values(completedPlayExercises).filter(Boolean).length / totalExercises : 0,
        [completedPlayExercises, totalExercises, isLastWorkoutPlayed]
    );

    const isExecuting = (isLastWorkoutPlayed ? Object.values(completedPlayExercises).filter(Boolean).length > 0 : false);
    const { isDark } = useTheme();
    return (
        <View className="rounded-b-lg overflow-hidden mb-2">
            <LinearGradient
                colors={[
                    'rgba(15,23,42,1)',
                    'rgba(15,23,42,1)',
                    'rgba(15,23,42,0.95)'
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
                        text={`${workout.level}`}
                    />
                </View>

                <View className="flex-row items-center justify-between">
                    <View className="w-3/4 flex-row">
                        <ButtonPill
                            icon="heart-outline"
                            text="Añadir"
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
                        {
                            hasbeenModified && !(isExecuting) && (
                                <ButtonPill
                                    icon="refresh-outline"
                                    text="Reestablecer"
                                    onPress={restoreWorkout}
                                />
                            )
                        }
                    </View>

                    <Pressable
                        onPress={handlePlayWorkout}
                        className={`absolute bottom-0 right-0 w-20 h-20 flex flex-col
                    items-center justify-center bg-eOrange-500/20
                    rounded-full border-2 border-eOrange-500
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

                <View className="mt-4">
                    <Text className={`text-sm font-ralewayBold text-white`}>
                        Descripción
                    </Text>
                    <Text className={`text-xl font-ralewayLight text-white mb-4`}>
                        {workout.description}
                    </Text>
                </View>

                <View className={``}>

                    <View className="flex-row justify-between mt-2">
                        <View className="flex-row items-center gap-2">
                            <Progress.Circle
                                progress={progressOver100}
                                size={50}
                                color={"#ff5722"}
                                unfilledColor={isDark ? "#1c1c1c" : "#fff"}
                                borderWidth={0}
                            />
                            <View>
                                <Text className={`font-ralewayBold text-start text-white`}>Ejercicios</Text>
                                <Text className={`text-4xl text-start text-white`}>
                                    {exercisesCompleted}/{totalExercises}
                                </Text>
                            </View>
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
