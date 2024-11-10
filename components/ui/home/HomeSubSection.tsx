
import React from 'react';
import { Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import IconButton from '../common/buttons/IconButton';

import { useTheme } from '@/context/ThemeContext';

import { TrainingPlans } from '@/constants';
import { HomePlanFlatlist } from '../plans/HomePlanFlatlist';

const HomeSubSection = () => {
    const { isDark } = useTheme()

    const suggestedPlans = TrainingPlans.slice(0, 3)

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
                data={suggestedPlans}
            />
        </View>
    );
}

export default HomeSubSection;
