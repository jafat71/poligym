import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';
import CustomListEmptyComponent from '@/components/ui/common/flatlists/CustomListEmptyComponent';
import FilterPill from '@/components/ui/common/pills/FilterPill';
import SquarePill from '@/components/ui/common/pills/SquarePill';
import DayMealFoodPlanCard from '@/components/ui/foodplan/DayMealFoodPlanCard';
import { DAYS_OF_WEEK_VALUES, FOOD_PLAN_CATEGORIES } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { fetchFoodPlanById } from '@/lib/api/actions';
import { DayOfWeek, NutritionPlan } from '@/types/interfaces/entities/foodplan';
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

    if (isLoading) return <SkeletonLoadingScreen />;
    if (isError) return <Text>Error loading food plan details - {id}</Text>;
    const [selectedDay, setSelectedDay] = useState<string>(DAYS_OF_WEEK_VALUES[
        plan?.weeklyMeals[0].dayOfWeek ?? DayOfWeek.MONDAY
    ]);
    return (
        <SafeAreaView className={`${isDark ? 'bg-darkGray-900' : 'bg-white'} flex-1 px-4`}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <Text className={`text-4xl font-ralewayBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{plan?.name}</Text>

                <View className='flex flex-row flex-wrap my-2'>

                    <SquarePill
                        text={`${FOOD_PLAN_CATEGORIES.find(category => category.value === plan?.category.toString())?.label}`}
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
                        plan?.weeklyMeals.map((meal) => (
                            <FilterPill 
                                value={DAYS_OF_WEEK_VALUES[meal.dayOfWeek]}
                                label={DAYS_OF_WEEK_VALUES[meal.dayOfWeek].slice(0, 3)}
                                selected={selectedDay}
                                setSelected={setSelectedDay}
                                isSearching={false}
                                key={meal.dayOfWeek}
                            />
                        ))
                    }
                </View>

                <View className='my-2'>
                    <DayMealFoodPlanCard selectedDay={plan?.weeklyMeals.find((day) => DAYS_OF_WEEK_VALUES[day.dayOfWeek] === selectedDay)!} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Id;
