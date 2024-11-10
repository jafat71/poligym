import React from 'react';
import { View, Text } from 'react-native';

import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';

import IconButton from '../common/buttons/IconButton';
import { HomeRoutineFlatlist } from '../routines/HomeRoutineFlatList';
import { TrainingPlans } from '@/constants';

import { RoutinePlan } from '@/types/interfaces/entities/plan';

const HomeSmallSection = () => {
    const { isDark } = useTheme()

    const suggestedRoutines: RoutinePlan[] = [
        TrainingPlans[0].detalleDias.lunes as RoutinePlan,
        TrainingPlans[0].detalleDias.miércoles as RoutinePlan,
        TrainingPlans[0].detalleDias.viernes as RoutinePlan
    ]

    return (
        <View className="mb-4">
            <View className="px-4 flex flex-row items-center justify-between ">
                <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
                font-ralewayBold text-xl`}>
                    RUTINAS RECOMENDADAS
                </Text>
                <IconButton
                    onPress={() => { router.push('/(root)/(library)/info') }}
                    icon={<Ionicons name="add" size={24} color={isDark ? "white" : "black"} />}
                />
            </View>
            <HomeRoutineFlatlist
                data={suggestedRoutines}
            />
        </View>
    );
}

export default HomeSmallSection;
