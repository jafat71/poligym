
import React from 'react';
import { Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import IconButton from '../common/buttons/IconButton';

import { useTheme } from '@/context/ThemeContext';

import { HomePlanFlatlist } from '../plans/HomePlanFlatlist';
import IndividualCardSkeleton from '@/components/animatedUi/IndividualCarkSkeleton';
import { useUser } from '@/context/UserContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TrainingPlanAPI } from '@/types/interfaces/entities/plan';
import { fetchRecommendedPlans } from '@/lib/api/actions';

const HomeSubSection = () => {
    const { isDark } = useTheme()
    const { accessToken } = useUser()
    const queryClient = useQueryClient();
    const { data: recommendedPlans = [], isLoading: isLoadingRecommendedPlans } = useQuery<TrainingPlanAPI[]>({
        queryKey: ['plans', 'recommended'],
        queryFn: async () => {
            const data = await fetchRecommendedPlans(accessToken!);
            data.forEach(plan => {
                queryClient.setQueryData(['plans', plan.id], plan);
            })
            return data;
        },
    })
    if (isLoadingRecommendedPlans) return <IndividualCardSkeleton/>;

    return (
        <View className="my-2">
            <View className="px-4 flex flex-row items-center justify-between ">
                <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
                font-ralewayBold text-xl`}>
                    TE PUEDEN INTERESAR
                </Text>
                <IconButton
                    onPress={() => { }}
                    icon={<Ionicons name="add" size={24} color={isDark ? "white" : "black"} />}
                />
            </View>
            <HomePlanFlatlist
                data={recommendedPlans}
            />
        </View>
    );
}

export default HomeSubSection;
