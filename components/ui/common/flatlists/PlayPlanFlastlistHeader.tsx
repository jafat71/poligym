import { Easing, Pressable, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { DIFFICULTY, TrainingPlanAPI, WorkoutAPI } from "@/types/interfaces/entities/plan";
import ButtonPill from "../buttons/ButtonPill";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import HomePill from "../pills/HomePill";
import { useMemo, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useFavoriteTrainingPlan } from "@/hooks/useFavoriteTrainingPlan";

interface PlayPlanFlatlistHeaderProps {
    plan: TrainingPlanAPI;
}

export const PlayPlanFlatlistHeader = ({
    plan,
}: PlayPlanFlatlistHeaderProps) => {

    const workoutsCompleted = 0
    const progressOver100 = useMemo(
        () => workoutsCompleted / plan.workouts.length,
        [workoutsCompleted, plan.workouts.length]
    );
    const [isFollowing, setIsFollowing] = useState(false);
    const { isFavorite, handleFavoriteTrainingPlan, handleUnfavoriteTrainingPlan } = useFavoriteTrainingPlan(plan);

    const { isDark } = useTheme();
    console.log(plan.name)
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
                <Text className={`text-white text-4xl font-ralewayBold mb-4`}>
                    {plan.name}
                </Text>
                <View className="flex-row items-center mb-2">
                    <HomePill
                        icon="flame-outline"
                        text={`${plan.level}`}
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
                                    handleUnfavoriteTrainingPlan()
                                } else {
                                    handleFavoriteTrainingPlan()
                                }
                            }}
                        />
                        <ButtonPill
                            icon="play-outline"
                            text={
                                isFollowing ? "Abandonar" : "Seguir"
                            }
                            onPress={() => {
                                setIsFollowing(!isFollowing)
                            }}
                        />
                    </View>

                    <Pressable
                        onPress={() => { }}
                        className={`absolute bottom-0 right-0 w-20 h-20 flex flex-col
                    items-center justify-center bg-eBlue-800
                    rounded-full border-2 border-lightGreen
                `}
                    >
                        <Ionicons name="play" size={24} color={"#fff"} />
                    </Pressable>
                </View>

                <View className="mt-4">
                    <Text className={`text-sm font-ralewayBold text-white`}>
                        Descripción
                    </Text>
                    <Text className={`text-xl font-ralewayLight text-white mb-4`}>
                        {plan.description}
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
                                <Text className={`font-ralewayBold text-start text-white`}>Rutinas</Text>
                                <Text className={`text-4xl text-start text-white`}>
                                    {workoutsCompleted}/{plan.workouts.length}
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
