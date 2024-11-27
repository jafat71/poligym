import { Pressable, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { WorkoutAPI } from "@/types/interfaces/entities/plan";
import { DIFFICULTIES } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import SquarePill from "../pills/SquarePill";
import ButtonPill from "../buttons/ButtonPill";
import { Ionicons } from "@expo/vector-icons";
import { usePlayWorkoutContext } from "@/context/PlayWorkoutContext";
import { useEffect, useMemo, useState } from "react";
import { router } from "expo-router";

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

    const {completedPlayExercises} = usePlayWorkoutContext()

    const { isDark } = useTheme();

    const exercisesCompleted = Object.values(completedPlayExercises).filter(Boolean).length
    const progressOver100 = exercisesCompleted / totalExercises

    const [isExecuting, setIsExecuting] = useState(progressOver100 > 0);

    return (
        <View className="px-4 pb-3">
            <View className="flex-row items-center mb-4 ">
                <View className="w-3 left-0 h-full bg-eBlue-500 mr-2" />
                <View>
                    <Text className={`text-${isDark ? "white" : "darkGray-900"} text-4xl font-ralewayBold mb-4 flex-1`}>
                        {workout.name}
                    </Text>
                    <View className="flex-row items-center">
                        <SquarePill
                            icon="time-outline"
                            text={`${workout.duration} min.`}
                        />
                        <SquarePill
                            icon="flame-outline"
                            text={`${DIFFICULTIES.find(diff => diff.value === workout.level)?.label || ''}`}
                        />
                    </View>
                </View>
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
                    className={`absolute bottom-0 right-0 w-16 h-16 flex flex-col
                items-center justify-center ${isDark ? "bg-darkGray-100" : "bg-darkGray-900"}
                rounded-full mx-2 my-2
            `}
                >
                    {
                        isExecuting ? (
                            <Ionicons name="refresh-outline" size={24} color={isDark ? "#1c1c1c" : "#fff"} />
                        ) : (
                            <Ionicons name="play" size={24} color={isDark ? "#1c1c1c" : "#fff"} />
                        )
                    }
                </Pressable>
            </View>

            <Text className={`text-sm font-ralewayBold ${isDark ? "text-white" : "text-darkGray-900"} mb-4`}>
                {workout.description}
            </Text>

            <View className={``}>

                <Progress.Bar
                    progress={progressOver100}
                    width={null}
                    height={8}
                    color={"#0055f9"}
                    unfilledColor={isDark ? "#1c1c1c" : "#1c1c1c"}
                    borderWidth={0}
                    borderRadius={4}
                />

                <View className="flex-row justify-between mt-2">
                    <Text className={`${isDark ? "text-white" : "text-darkGray-900"} font-raleway text-xl`}>
                        {exercisesCompleted}/{totalExercises}
                    </Text>
                    <Text className={`${isDark ? "text-white" : "text-darkGray-900"} font-raleway text-xl`}>
                        {Math.round(progressOver100 * 100)}/100%
                    </Text>
                </View>
            </View>
            <View>
                <Text className={`${isDark ? "text-white" : "text-darkGray-900"} text-2xl font-ralewayBold`}>Ejercicios</Text>
            </View>

        </View>
    )
}
