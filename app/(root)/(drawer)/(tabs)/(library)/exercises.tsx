import { BodyColors, MuscleGroups } from '@/components/ui/common/body/bodyConstants';
import FemaleBack from '@/components/ui/common/body/FemaleBack';
import FemaleFront from '@/components/ui/common/body/FemaleFront';
import MaleBack from '@/components/ui/common/body/MaleBack';
import MaleFront from '@/components/ui/common/body/MaleFront';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { View } from 'react-native';

export const Exercises = () => {
    const { isDark } = useTheme()
    const { defaultColor, selectedColor} = BodyColors;
    
    let backExercises : MuscleGroups = {
        abdominals: defaultColor,
        calves: defaultColor,
        quads: defaultColor,
        obliques: defaultColor,
        forearms: defaultColor,
        biceps: defaultColor,
        chest: defaultColor,
        shoulders: defaultColor,
        traps: defaultColor,
        lowerback: selectedColor,
        triceps: defaultColor,
        hamstrings: defaultColor,
        glutes: defaultColor,
        lats: defaultColor,
        trapsmiddle: defaultColor
    }

    return (
        <View className={`flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"} `}>

            <View className='flex flex-row items-center justify-center'>
                <FemaleBack width={150} height={250} muscleColors={backExercises} />
                <FemaleFront width={150} height={250} muscleColors={backExercises} />
            </View>

            
            <View className='flex flex-row items-center justify-center '>
                <MaleBack width={150} height={250} muscleColors={backExercises} />
                <MaleFront width={150} height={250} muscleColors={backExercises} />
            </View>
        </View>
    );
}

export default Exercises;
