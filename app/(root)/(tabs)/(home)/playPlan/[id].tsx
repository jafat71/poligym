import { FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { TrainingPlanAPI, WorkoutAPI } from '@/types/interfaces/entities/plan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTrainingPlanById, fetchWorkoutById } from '@/lib/api/actions';
import { WorkoutsInPlanFlatList } from '@/components/ui/routines/WorkoutsInPlanFlastListComponent';
import { PlayPlanFlatlistHeader } from '@/components/ui/common/flatlists/PlayPlanFlastlistHeader';
import HorizontalFlatlistSkeleton from '@/components/animatedUi/HorizontalFlatlistSkeleton';
import { useLocalSearchParams } from 'expo-router';
import WorkoutSkeleton from '@/components/animatedUi/WorkoutSkeleton';
import { getLocaleDateTime } from '@/lib/utils/getLocaleTime';

interface PlanForUser {
    plan: TrainingPlanAPI;
    workouts: WorkoutAPI[];
    startDate: Date;
    endDate: Date;
    weeks: number[];
}

const PlayPlan = () => {
    const { isDark } = useTheme();
    const { id } = useLocalSearchParams();
    const { accessToken, loggedUserInfo, userSelectedPlan } = useUser();
    const queryClient = useQueryClient();
    const planId = Number(id);

    const [infoSetted, setInfoSetted] = useState(false);
    const [planForUser, setPlanForUser] = useState<PlanForUser | null>(null);

    const [userPlanProgress, setUserPlanProgress] = useState<any>({
        userId: loggedUserInfo?.id,
        planId: 0,
        planName: '',
        planStartDate: new Date(),
        planEndDate: new Date(),
        planWeeks: [],
        planWorkouts: {},
    }
    ); //fetch from sqllite

    let planObject: any;
    const isUserCurrentPlan = userSelectedPlan?.id === planId
    const { data: plan, isLoading, isError } = useQuery<TrainingPlanAPI>({
        queryKey: ['plans', id],
        queryFn: async () => {
            const planData = await fetchTrainingPlanById(accessToken!, id as string);
            planData.workouts?.forEach((workout) => {
                queryClient.prefetchQuery({
                    queryKey: ['workouts', workout.id],
                    queryFn: () => fetchWorkoutById(accessToken!, workout.id.toString()),
                });
            });
            return planData;
        },
        initialData: queryClient.getQueryData<TrainingPlanAPI>(['plans', planId]),
        enabled: !!id,
    });

    useEffect(() => {
        if (plan) {
            const processedPlan = buildPlanWorkouts(plan);
            setPlanForUser(processedPlan);
            setTimeout(() => setInfoSetted(true), 500); // Simula un pequeño retraso para la UX.
        }
    }, [plan]);

    const buildPlanWorkouts = (fetchedPlan: TrainingPlanAPI): PlanForUser => {
        const initDate = new Date();
        const endDate = new Date();
        endDate.setDate(initDate.getDate() + 30);

        const weeksBetween = Math.ceil((endDate.getTime() - initDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
        const weeks = Array.from({ length: weeksBetween }, (_, i) => i);
        // endDate.setDate(initDate.getDate() + (weeksBetween * 7));
        const [planStartDate, _] = getLocaleDateTime(new Date(initDate))
        const [planEndDate, __] = getLocaleDateTime(new Date(endDate))

        const weekPlanUserObject: any = {}
        weeks.forEach((week) => {
            weekPlanUserObject[week + 1] = {
                week: week + 1,
                workouts: [],
            }
            fetchedPlan.workouts.forEach((workout) => {
                weekPlanUserObject[week + 1].workouts.push({
                    workout: workout.id,
                    completed: false,
                });
            });

        });
        planObject = {
            userId: loggedUserInfo?.id,
            planId: fetchedPlan.id,
            planName: fetchedPlan.name,
            planStartDate: planStartDate,
            planEndDate: planEndDate,
            planWeeks: weeksBetween,
            planWorkouts: weekPlanUserObject,
        }

        setUserPlanProgress(planObject)

        return {
            plan: fetchedPlan,
            workouts: fetchedPlan.workouts.map((workout) => ({ ...workout })),
            startDate: initDate,
            endDate: endDate,
            weeks: weeks,
        };
    };

    if (isError) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-red-500 text-lg font-bold">
                    Error al cargar el plan de entrenamiento.
                </Text>
            </View>
        );
    }

    if (isLoading || !infoSetted || !planForUser) {
        return (
            <View className={`flex-1 ${isDark ? 'bg-darkGray-900' : 'bg-darkGray-100'}`}>
                <WorkoutSkeleton />
                <HorizontalFlatlistSkeleton />
                <HorizontalFlatlistSkeleton />
                <HorizontalFlatlistSkeleton />
            </View>
        );
    }

    return (
        <View className={`flex-1 ${isDark ? 'bg-darkGray-900' : 'bg-darkGray-100'}`}>
            <FlatList
                ListHeaderComponent={
                    <PlayPlanFlatlistHeader
                        plan={planForUser.plan}
                        isLoading={isLoading}
                        initDate={planForUser.startDate}
                        endDate={planForUser.endDate}
                        userPlanProgress={userPlanProgress}
                    />
                }
                data={
                    isUserCurrentPlan ? planForUser.weeks : planForUser.weeks.slice(0, 1)
                }
                keyExtractor={(item) => `week-${item}`}
                renderItem={({ item, index }) => (
                    <>
                        <Text
                            className={`text-xl font-ralewaySemiBold px-4 ${isDark ? 'text-white' : 'text-black'
                                }`}
                        >
                            {isUserCurrentPlan ? `Semana ${item + 1}` : `Rutinas del plan`}
                        </Text>
                        <WorkoutsInPlanFlatList
                            data={planForUser.workouts}
                            infoSetted={infoSetted}
                            isUserCurrentPlan={isUserCurrentPlan}
                            weekIndex={index+1}
                            planId={planForUser.plan.id}
                            />
                    </>
                )}
            />
        </View>
    );
};

export default PlayPlan;
