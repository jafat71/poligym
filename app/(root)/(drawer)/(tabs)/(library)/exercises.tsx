import { BodyColors, MuscleGroups } from '@/components/ui/body/bodyConstants';
import FemaleBack from '@/components/ui/body/FemaleBack';
import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export const Exercises = () => {
    const { isDark } = useTheme()
    const { defaultColor, recentColor, oldColor, hoverColor } = BodyColors;
    const [muscleColors, setMuscleColors] = useState<MuscleGroups>({
        calves: defaultColor,
        quads: defaultColor,
        obliques: defaultColor,
        abdominals: defaultColor,
        forearms: defaultColor,
        biceps: defaultColor,
        chest: defaultColor,
        shoulders: defaultColor,
        traps: defaultColor,
        lowerback: defaultColor,
        triceps: defaultColor,
        hamstrings: defaultColor,
        glutes: defaultColor,
        lats: defaultColor,
        "traps-middle": defaultColor,
    });

    return (
        <View className={`flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"} `}>
            <Text>Exercises</Text>

            <FemaleBack width={400} height={500} muscleColors={muscleColors} />
        </View>
    );
}

export default Exercises;
