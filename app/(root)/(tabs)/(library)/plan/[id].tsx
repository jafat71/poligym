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
import { useFavoriteTrainingPlan } from '@/hooks/useFavoriteTrainingPlan';
import ButtonPillLightDark from '@/components/ui/common/buttons/ButtonPillLightDark';

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

    const { isFavorite, handleFavoriteTrainingPlan, handleUnfavoriteTrainingPlan } = useFavoriteTrainingPlan(plan!);
    if (isLoading) return <SkeletonLoadingScreen />;
    if (isError) return <Text>Error loading plan details - {id}</Text>;
    const hasWorkouts = plan?.workouts && plan?.workouts?.length > 0;

    return (
        <View className={`${isDark ? 'bg-darkGray-900' : 'bg-white'} flex-1 px-4`}>
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

                <ButtonPillLightDark
                    icon="heart-outline"
                    text={
                        isFavorite ? "Quitar de favorito" : "Marcar como favorito"}
                    onPress={() => {
                        if (isFavorite) {
                            handleUnfavoriteTrainingPlan()
                        } else {
                            handleFavoriteTrainingPlan()
                        }
                    }}
                    disabled={isLoading}
                />


                <View>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Descripción</Text>
                    <Text className={`text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{plan?.description}</Text>
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

        </View>
    );
};

export default PlanInfo;
