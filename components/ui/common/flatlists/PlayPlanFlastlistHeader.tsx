import { Alert, Easing, Pressable, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { DIFFICULTY, TrainingPlanAPI, WorkoutAPI } from "@/types/interfaces/entities/plan";
import ButtonPill from "../buttons/ButtonPill";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import HomePill from "../pills/HomePill";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useFavoriteTrainingPlan } from "@/hooks/useFavoriteTrainingPlan";
import WorkoutSkeleton from "@/components/animatedUi/WorkoutSkeleton";
import { useUser } from "@/context/UserContext";
import { enrollUserOnPlan, getUserPlanProgress } from "@/database/sqlite";
import { PlanProgress } from "@/types/interfaces/entities/progress";
import { router } from "expo-router";

interface PlayPlanFlatlistHeaderProps {
    plan: TrainingPlanAPI;
    isLoading: boolean;
    initDate: Date;
    endDate: Date;
    userPlanProgress: any;
}

export const PlayPlanFlatlistHeader = ({
    plan,
    isLoading,
    userPlanProgress
}: PlayPlanFlatlistHeaderProps) => {
    if(!plan) return null

    const { userSelectedPlan, setUserSelectedPlan, loggedUserInfo } = useUser();
    const [workoutsCompleted, setWorkoutsCompleted] = useState(0)
    const [totalWorkouts, setTotalWorkouts] = useState(0);
    const [nextWorkout, setNextWorkout] = useState<{workout: WorkoutAPI, week: number} | null>(null);

    const { isFavorite, handleFavoriteTrainingPlan, handleUnfavoriteTrainingPlan } = useFavoriteTrainingPlan(plan);

    const [isUserCurrentPlan, setIsUserCurrentPlan] = useState(plan.id === userSelectedPlan?.id)
    
    const userHasSelectedAPlan = userSelectedPlan !== null && userSelectedPlan !== undefined
    const userHasOtherPlan = userSelectedPlan?.id !== plan.id && userHasSelectedAPlan
    const { isDark } = useTheme();

    useEffect(() => {
        if (isUserCurrentPlan) {
            getUserProgressInCurrentPlan();
        }
    }, [isUserCurrentPlan]);

    const getUserProgressInCurrentPlan = async () => {
        try {
            const userPlanInfoProgress = await getUserPlanProgress(loggedUserInfo?.id!, plan.id.toString());
            console.log("USER PLAN PROGRESS", userPlanInfoProgress);

            if (userPlanInfoProgress) {
                const totalWorkouts = userPlanInfoProgress.planWeeks * plan.workouts.length;
                setTotalWorkouts(totalWorkouts);
                setWorkoutsCompleted(userPlanInfoProgress.completedRoutines || 0);
                
                const nextWorkout = plan.workouts.find(workout => workout.id === Number(userPlanInfoProgress.nextRoutine));
                setNextWorkout({workout: nextWorkout, week: userPlanInfoProgress.nextRoutineWeek});
            } else {
                console.warn("Datos incompletos para calcular los entrenamientos.");
                setTotalWorkouts(0);
                setWorkoutsCompleted(0);
                setNextWorkout(null);
            }
        } catch (error) {
            console.error("Error al obtener el progreso del usuario en el plan:", error);
            setTotalWorkouts(0);
            setWorkoutsCompleted(0);
            setNextWorkout(null);
        }
    };
    
    useEffect(() => {
        console.log("NEXT WORKOUT", nextWorkout)
    }, [workoutsCompleted])

    console.log("NEXT WORKOUT", nextWorkout)
    const handleRollUserOnPlan = async () => {
        setUserSelectedPlan(plan)
        const planProgressObjsect = {
            id: "",
            userId: loggedUserInfo?.id!,
            planId: userPlanProgress.planId.toString(),
            planName: userPlanProgress.planName,
            planStartDate: userPlanProgress.planStartDate,
            planEndDate: userPlanProgress.planEndDate,
            planStatus: userPlanProgress.planStatus,
            planWeeks: userPlanProgress.planWeeks
        }
        try {
            const result = await enrollUserOnPlan(planProgressObjsect, plan.workouts)
            console.log("result", result)
            // getUserProgressInCurrentPlan()
            setIsUserCurrentPlan(true)
        } catch (error) {
            console.error("Error al enrollar el usuario en el plan:", error);
        }
    }

    
    if (!plan || isLoading) return <WorkoutSkeleton />
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
                    {plan?.name}
                </Text>
                <View className="flex-row items-center mb-2">
                    <HomePill
                        icon="flame-outline"
                        text={`${plan?.level}`}
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
                        
                    </View>

                        <Pressable
                            onPress={() => { 
                                router.push({
                                    pathname: `/(home)/playWorkout/${nextWorkout?.workout.id}` as never,
                                    params: {
                                        planId: userSelectedPlan?.id ?? null,
                                        planName: userSelectedPlan?.name ?? null,
                                        weekIndex: nextWorkout?.week ? nextWorkout.week : 0,
                                        planProgressId: userPlanProgress.id,
                                    },
                                });      
                            }}
                            className={`absolute bottom-0 right-0 w-20 h-20 flex flex-col
                        items-center justify-center bg-eBlue-800
                        rounded-full border-2 border-lightGreen
                    `}
                        >
                            <Ionicons name="play" size={24} color={"#fff"} />
                        </Pressable>

                </View>


                {
                    isUserCurrentPlan && (
                        <View className="flex-col w-full items-end">
                            <Text className={`text-white text-sm font-ralewayBold my-1`}>   
                        Siguiente Rutina
                    </Text>
                    <Text 
                    numberOfLines={1} 
                    className={`text-white text-xl font-ralewayLight`}>
                                Semana {nextWorkout?.week} - {nextWorkout?.workout.name}
                            </Text>
                        </View>
                    )
                }

                <View className="">
                    <Text className={`text-sm font-ralewayBold text-white`}>
                        Descripción
                    </Text>
                    <Text className={`text-xl font-ralewayLight text-white mb-4`}>
                        {plan?.description}
                    </Text>
                </View>

                {
                    isUserCurrentPlan
                        ? (
                            <>
                                <View className="flex-row justify-end">
                                    <ButtonPill
                                        icon="close-outline"
                                        text={
                                            "Abandonar"
                                        }
                                        onPress={() => {
                                            Alert.alert("Abandonar plan", "¿Estás seguro de que quieres abandonar este plan?", [
                                                {
                                                    text: "Cancelar",
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "Abandonar",
                                                    onPress: () => {
                                                        setUserSelectedPlan(null)
                                                    }
                                                }
                                            ])
                                        }}
                                    />
                                </View>
                                <View>
                                    <Text className={`text-sm font-ralewayBold text-white`}>
                                        Fecha
                                    </Text>
                                    <View className="flex-row justify-between">
                                        <View className="flex-col items-start">
                                            <Text className={`text-lg text-white font-ralewaySemiBold`}>Inicio</Text>
                                            <Text className={`text-lg text-white`}>{userPlanProgress?.planStartDate}</Text>
                                        </View>

                                        <View className="flex-col items-start">
                                            <Text className={`text-lg text-white font-ralewaySemiBold`}>Fin</Text>
                                            <Text className={`text-lg text-white`}>{userPlanProgress?.planEndDate}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View className={``}>

                                    <View className="flex-row justify-between mt-2">
                                        <View className="flex-row items-center gap-2">
                                            <Progress.Circle
                                                progress={ (workoutsCompleted && totalWorkouts) ? (workoutsCompleted / totalWorkouts) : 0}
                                                size={50}
                                                color={"#77ffaa"}
                                                unfilledColor={isDark ? "#1c1c1c" : "#fff"}
                                                borderWidth={0}
                                            />
                                            <View>
                                                <Text className={`font-ralewayBold text-start text-white`}>Rutinas ({plan?.workouts.length}XSEM)</Text>
                                                <Text className={`text-4xl text-start text-white`}>
                                                    {workoutsCompleted}/{totalWorkouts}
                                                </Text>
                                            </View>
                                        </View>
                                        <View className="flex flex-col items-end justify-end">
                                            <Text className={`font-ralewayBold text-start text-white`}>Progreso</Text>
                                            <Text className={`text-4xl text-start text-white`}>
                                                {
                                                    isNaN(workoutsCompleted / totalWorkouts * 100) ? 0 : workoutsCompleted / totalWorkouts * 100    
                                                }/100%
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                        ) :
                        (
                            <>
                            <ButtonPill
                            icon="play-outline"
                            text={
                                "Seguir"
                            }
                            onPress={() => {
                                if (userHasOtherPlan) {
                                    Alert.alert("Actualmente, tienes un plan activo", 
                                        "Si sigues este plan, abandonarás tu plan actual. No te preocupes, puedes volver a él en cualquier momento.",
                                        [
                                            {
                                                text: "Cancelar",
                                                style: "cancel"
                                            },
                                            {
                                                text: "Seguir",
                                                onPress: () => {
                                                    handleRollUserOnPlan()
                                                }
                                            }
                                        ]
                                    )
                                } else {
                                    handleRollUserOnPlan()
                                }
                            }}
                        />
                            </>
                        )
                }


            </View>

        </View>
    )
}
