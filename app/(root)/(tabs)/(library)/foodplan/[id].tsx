import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';
import FilterPill from '@/components/ui/common/pills/FilterPill';
import SquarePill from '@/components/ui/common/pills/SquarePill';
import DayMealFoodPlanCard from '@/components/ui/foodplan/DayMealFoodPlanCard';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { fetchFoodPlanById } from '@/lib/api/actions';
import { DAY_OF_WEEK, FOODPLAN_CATEGORY, NutritionPlan } from '@/types/interfaces/entities/foodplan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text } from 'react-native';
import { View } from 'react-native';

const Id = () => {
    const { id } = useLocalSearchParams();
    const { accessToken } = useUser();
    const { isDark } = useTheme();
    const queryClient = useQueryClient()
    const planId = Number(id)
    const cachedPlan = queryClient.getQueryData<NutritionPlan>(['foodplans', planId])
    
    const { data: plan, isLoading, isError } = useQuery<NutritionPlan>({
        queryKey: ['foodplans', id],
        queryFn: async () => {
            const data = await fetchFoodPlanById(accessToken!, id as string);
            return data;
        },
        initialData: cachedPlan,
        enabled: !!id
    });
    const [selectedDay, setSelectedDay] = useState<DAY_OF_WEEK>(
        DAY_OF_WEEK[plan?.weeklyMeals[0].dayOfWeek as unknown as keyof typeof DAY_OF_WEEK] ?? DAY_OF_WEEK.MONDAY
    );

    if (isLoading) return <SkeletonLoadingScreen />;
    if (isError) return <Text>Error loading food plan details - {id}</Text>;

    console.log(selectedDay)
    return (
        <SafeAreaView className={`${isDark ? 'bg-blueEPN-900' : 'bg-blueEPN-500'} flex-1 px-4`}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <Text className={`text-4xl font-ralewayBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{plan?.name}</Text>

                <View className='flex flex-row flex-wrap my-2'>

                    <SquarePill
                        text={`${FOODPLAN_CATEGORY[plan?.category as unknown as keyof typeof FOODPLAN_CATEGORY]}`}
                        icon='flame-outline'
                    />

                    <SquarePill
                        text={`${plan?.duration} Semanas`}
                        icon='time-outline'
                    />

                </View>

                <Image
                    source={{ uri: plan?.imageURL }}
                    className='w-full h-64 rounded-lg my-2'
                />

                <View className='my-2'>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Descripción</Text>
                    <Text className={`text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{plan?.description}</Text>
                </View>

                <View className='my-2'>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Detalle del plan</Text>
                </View>
        
                <View className='flex flex-row flex-wrap'>
                    {
                        plan?.weeklyMeals?.map((meal) => (
                            <FilterPill 
                                value={DAY_OF_WEEK[meal.dayOfWeek as unknown as keyof typeof DAY_OF_WEEK]}
                                label={DAY_OF_WEEK[meal.dayOfWeek as unknown as keyof typeof DAY_OF_WEEK].slice(0, 3)}
                                selected={selectedDay}
                                setSelected={setSelectedDay as any}
                                isSearching={false}
                                key={meal.dayOfWeek}
                            />
                        ))
                    }
                </View>

                <View className='my-2'>
                    <DayMealFoodPlanCard 
                        selectedDay={plan?.weeklyMeals.find(
                            (day) => DAY_OF_WEEK[day.dayOfWeek as unknown as keyof typeof DAY_OF_WEEK] === selectedDay
                        )!} 
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Id;
