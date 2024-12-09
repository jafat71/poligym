import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchTrainingPlanById, fetchWorkoutById } from '@/lib/api/actions';

import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';

import { TrainingPlanAPI, WorkoutAPI } from '@/types/interfaces/entities/plan';

import SquarePill from '@/components/ui/common/pills/SquarePill';
import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';
import PlanWorkoutItem from '@/components/ui/plans/PlanWorkoutItem';

const PlanInfo = () => {
    const { id } = useLocalSearchParams();
    const { accessToken } = useUser();
    const { isDark } = useTheme();
    const queryClient = useQueryClient()
    const planId = Number(id)
    const cachedPlan = queryClient.getQueryData<TrainingPlanAPI>(['trainingPlans', planId])
    const { data: plan, isLoading, isError } = useQuery<TrainingPlanAPI>({
        queryKey: ['trainingPlans', id],
        queryFn: async () => {
            const data = await fetchTrainingPlanById(accessToken!, id as string);
            return data;
        },
        initialData: cachedPlan,
        enabled: !!id
    });

    if (isLoading) return <SkeletonLoadingScreen />;
    if (isError) return <Text>Error loading plan details - {id}</Text>;
    const hasWorkouts = plan?.workouts && plan?.workouts?.length > 0;

    return (
        <SafeAreaView className={`${isDark ? 'bg-blueEPN-900' : 'bg-blueEPN-500'} flex-1 px-4`}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <Text className={`text-4xl font-ralewayBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{plan?.name}</Text>

                <View className='flex flex-row flex-wrap my-2'>

                    <SquarePill
                        text={`${plan?.level}`}
                        icon='flame-outline'
                    />

                </View>

                <View>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Descripción</Text>
                    <Text className={`text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{plan?.description}</Text>
                </View>

                <View>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Fecha de inicio</Text>
                    <Text className={`text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{plan?.startDate.toLocaleDateString()}</Text>
                </View>

                <View>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Fecha de finalización</Text>
                    <Text className={`text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{plan?.endDate?.toLocaleDateString()}</Text>
                </View>

                <View className='mt-2'>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Rutinas</Text>
                </View>

                <View className='mt-2 mb-20'>
                    {
                        hasWorkouts ? (
                            plan?.workouts?.map((workout) => (
                                <PlanWorkoutItem
                                    workout={workout}
                                    key={workout.id}
                                />
                            ))
                        ) : (
                            <Text className={`text-start text-xl font-raleway 
                                ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Este plan no tiene rutinas actualmente</Text>
                        )
                    }
                </View>

            </ScrollView>

            <Pressable className='absolute bottom-0 left-0 right-0 p-4 
            rounded-t-sm
            bg-eBlue-500 flex flex-row items-center justify-center gap-x-2'>
                <Text className='text-center text-xl font-ralewayBold text-white'>Seleccionar plan</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default PlanInfo;
