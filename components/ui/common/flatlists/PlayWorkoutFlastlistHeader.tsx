import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import * as Progress from 'react-native-progress';
import { WorkoutAPI } from "@/types/interfaces/entities/plan";
import HomePill from "../pills/HomePill";
import { DIFFICULTIES } from "@/constants";

interface PlayWorkoutFlatlistHeaderProps {
    workout: WorkoutAPI;
    progress: number;
    completedExercises: number;
    totalExercises: number;
}

export const PlayWorkoutFlatlistHeader = ({
    workout,
    progress,
    completedExercises,
    totalExercises
}: PlayWorkoutFlatlistHeaderProps) => {

    const filterAnimation = useSharedValue(0);

    useEffect(() => {
        filterAnimation.value = withSpring(1, {
            damping: 15,
            stiffness: 100,
        })
    }, [])

    const filterStyle = useAnimatedStyle(() => {
        return {
            maxHeight: interpolate(
                filterAnimation.value,
                [0, 1],
                [0, 1000], // Ajusta este valor según tus necesidades
            ),
            opacity: filterAnimation.value,
            transform: [{
                translateY: interpolate(
                    filterAnimation.value,
                    [0, 1],
                    [-20, 0],
                ),
            }],
        };
    });

    const isCompleted = completedExercises === totalExercises;

    return (
        <View className="px-4 pt-16 pb-3">
            <Animated.View style={filterStyle} >
                <View className="flex-row items-center mb-4 ">
                    <View className="w-3 left-0 h-full bg-ePurple-500 mr-2" />
                    <Text className={`text-white text-4xl font-ralewayBold mb-4 flex-1`}>
                        {workout.name}
                    </Text>
                </View>
                <View className="flex-row items-start px-2 gap-x-2">

                    <HomePill
                        icon="time-outline"
                        text={`${workout.duration} min.`}
                    />
                    <HomePill
                        icon="flame-outline"
                        text={`${DIFFICULTIES.find(diff => diff.value === workout.level)?.label || ''}`}
                    />
                </View>
                <Text className={`text-sm font-ralewayBold text-white mb-4`}>
                    {workout.description}
                </Text>

                <View className={`rounded-sm p-4  `}>
                    <View className="flex-row justify-end items-end mb-2">
                        <Text className={`text-white font-raleway text-3xl`}>
                            {Math.round(progress * 100)}/100%
                        </Text>
                    </View>

                    <Progress.Bar
                        progress={progress}
                        width={null}
                        height={8}
                        color={`${isCompleted ? '#77ffaa' : '#fff'}`}
                        unfilledColor={'#1c1c1c'}
                        borderWidth={0}
                        borderRadius={4}
                        animated={true}
                    />

                    <View className="flex-row justify-end items-end mt-2">
                        <Text className={`text-white font-raleway text-3xl`}>
                            {(completedExercises)}/{totalExercises}
                        </Text>
                    </View>
                </View>
            <View>
                <Text className="text-white text-2xl font-ralewayBold">Ejercicios</Text>
            </View>

            </Animated.View>
        </View>
    )
}
