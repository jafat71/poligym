import { FlatList, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useUser } from '@/context/UserContext'
import { TrainingPlanAPI, WorkoutAPI } from '@/types/interfaces/entities/plan'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchTrainingPlanById, fetchWorkoutById } from '@/lib/api/actions'
import { WorkoutsInPlanFlatList } from '@/components/ui/routines/WorkoutsInPlanFlastListComponent'
import { PlayPlanFlatlistHeader } from '@/components/ui/common/flatlists/PlayPlanFlastlistHeader'
import HorizontalFlatlistSkeleton from '@/components/animatedUi/HorizontalFlatlistSkeleton'
import { useLocalSearchParams } from 'expo-router'
import WorkoutSkeleton from '@/components/animatedUi/WorkoutSkeleton'

interface PlanForUser {
    plan: TrainingPlanAPI;
    workouts: WorkoutAPI[];
    startDate: Date;
    endDate: Date;
    weeks: number[];
}

const PlayPlan = () => {
    const { isDark } = useTheme()
    const { id } = useLocalSearchParams();
    const { accessToken, loggedUserInfo } = useUser();
    const queryClient = useQueryClient();
    const planId = Number(id);
    const cachedPlan = queryClient.getQueryData<TrainingPlanAPI>(['plans', planId]);
    const [infoSetted, setInfoSetted] = useState(false);

    const { data: plan, isLoading, isError } = useQuery<TrainingPlanAPI>({
        queryKey: ['plans', id],
        queryFn: async () => {
            const data = await fetchTrainingPlanById(accessToken!, id as string)
            data.workouts?.forEach(workout => {
                queryClient.prefetchQuery({
                    queryKey: ['workouts', workout.id],
                    queryFn: async () => {
                        const individualWorkout = await fetchWorkoutById(accessToken!, workout.id.toString());
                        queryClient.setQueryData(['workouts', workout.id], individualWorkout);
                        return individualWorkout;
                    }
                });
            })
            return data;
        },
        initialData: cachedPlan,
        enabled: !!id,
    });

    const [workouts, setWorkouts] = useState<WorkoutAPI[]>([]);
    const [planForUser, setPlanForUser] = useState<PlanForUser>({
        plan: plan!,
        workouts: [],
        startDate: new Date(),
        endDate: new Date(),
        weeks: [],
    });

    useEffect(() => {
        if (plan) {
            setWorkouts(plan.workouts.map(workout => ({ ...workout })));
            const planForUser = buildPlanWorkouts();
            setPlanForUser(planForUser);
            setTimeout(() => {
                setInfoSetted(true);
            }, 1000);
        }
    }, [plan]);

    const isUserFavorite = loggedUserInfo?.trainingPlanIds.includes(plan?.id!)

    const handleSelectPlan = () => {
    }

    const buildPlanWorkouts = () : PlanForUser => {
        let initDate = new Date();
        let endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);//for each week, add 1 to weeks array
        let weeks = [];
        for (let i = 0; i < 4; i++) {
            weeks.push(i);
        }
        let planForUser: PlanForUser = {
            plan: plan!,
            workouts: workouts.map(workout => ({ ...workout })),
            startDate: initDate,
            endDate: endDate,
            weeks: weeks,
        }
        return planForUser;
    }

    if (isError) return <Text>Error al cargar detalles de la rutina - {id}</Text>;
    return (
        <View className={`flex-1 
            ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}>
                <FlatList
                    ListHeaderComponent={<PlayPlanFlatlistHeader
                        plan={plan!}
                        isLoading={isLoading}
                        initDate={planForUser.startDate}
                        endDate={planForUser.endDate}
                        />}
                    data={planForUser.weeks}
                    renderItem={({ item }) =>
                        <>
                            <Text className={`text-xl
                                font-ralewaySemiBold px-4
                                ${isDark ? "text-white" : "text-black"}`}>Semana {item+1}</Text>
                            <WorkoutsInPlanFlatList
                                data={planForUser.workouts}
                                infoSetted={infoSetted}
                            />
                        </>
                    }
                />
            {
                (isLoading || !infoSetted) && (
                    <>
                        <WorkoutSkeleton/>
                        <HorizontalFlatlistSkeleton/>
                        <HorizontalFlatlistSkeleton/>
                        <HorizontalFlatlistSkeleton/>
                        <HorizontalFlatlistSkeleton/>
                    </>
                )
            }
        </View>
    )
}

export default PlayPlan