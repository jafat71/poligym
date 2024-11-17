import React from 'react';
import { View, Text } from 'react-native';

import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';

import IconButton from '../common/buttons/IconButton';
import { HomeRoutineFlatlist } from '../routines/HomeRoutineFlatList';
import { TrainingPlans } from '@/constants';

import { RoutinePlan, WorkoutAPI } from '@/types/interfaces/entities/plan';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import { fetchRecommendedWorkouts } from '@/lib/api/actions';
import IndividualCardSkeleton from '@/components/animatedUi/IndividualCarkSkeleton';

const HomeSmallSection = () => {
    const { isDark } = useTheme()
    const { accessToken } = useUser()
    const { data: recommendedWorkouts = [], isLoading: isLoadingRecommendedWorkouts } = useQuery<WorkoutAPI[]>({
        queryKey: ['recommendedWorkouts'],
        queryFn: async () => {
            const data = await fetchRecommendedWorkouts(accessToken!);
            return data;
        },
    })
    if (isLoadingRecommendedWorkouts) return <IndividualCardSkeleton/>;
    return (
        <View className="mb-4">
            <View className="px-4 flex flex-row items-center justify-between ">
                <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
                font-ralewayBold text-xl`}>
                    RUTINAS RECOMENDADAS
                </Text>
                <IconButton
                    onPress={() => { router.push('/(library)/routine') }}
                    icon={<Ionicons name="add" size={24} color={isDark ? "white" : "black"} />}
                />
            </View>
            <HomeRoutineFlatlist
                data={recommendedWorkouts}
            />
        </View>
    );
}

export default HomeSmallSection;
