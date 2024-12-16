import { ScrollView, Text } from 'react-native'
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

    useEffect(() => {
        if (plan) {
            setWorkouts(plan.workouts.map(workout => ({ ...workout })));
            setTimeout(() => {
                setInfoSetted(true);
            },1000);
        }
    }, [plan]);

    const isUserFavorite = loggedUserInfo?.trainingPlanIds.includes(plan?.id!)

    const handleSelectPlan = () => {
    }

    if (isError) return <Text>Error al cargar detalles de la rutina - {id}</Text>;
    return (
        <ScrollView className={`flex-1 
            ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}>
            <WorkoutsInPlanFlatList
                ListHeaderComponent={(
                    <PlayPlanFlatlistHeader
                        plan={plan!}
                        isLoading={isLoading}
                    />
                )}
                data={workouts}
            />
            {
                (isLoading || !infoSetted) && (
                    <>
                        <HorizontalFlatlistSkeleton/>
                    </>
                )
            }
        </ScrollView>
    )
}

export default PlayPlan