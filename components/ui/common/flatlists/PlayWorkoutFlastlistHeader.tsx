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
import { useFavoriteWorkout } from "@/hooks/useFavoriteWorkout";

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
    const { isFavorite, handleFavoriteWorkout, handleUnfavoriteWorkout } = useFavoriteWorkout(workout.id);
    const { isDark } = useTheme(); 
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
                        text={`${workout.level}`}
                    />
                </View>

                <View className="flex-row items-center justify-between">
                    <View className="w-3/4 flex-row">
                        <ButtonPill
                            icon="heart-outline"
                            text={
                                isFavorite ? "Quitar" : "Añadir"}
                            onPress={() => {
                                if (isFavorite) {
                                    handleUnfavoriteWorkout()
                                } else {
                                    handleFavoriteWorkout()
                                }
                            }}
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
                    items-center justify-center bg-eBlue-800
                    rounded-full border-2 border-lightGreen
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
                                color={"#77ffaa"}
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
