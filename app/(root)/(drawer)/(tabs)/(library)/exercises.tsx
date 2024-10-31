import BodyCardComponent from '@/components/ui/common/body/bodyCardComponent';
import { getMuscleImage} from '@/components/ui/common/body/bodyConstants';
import { useTheme } from '@/context/ThemeContext';
import { MuscleGroups } from '@/types/types/muscles';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const Exercises = () => {
    const { isDark } = useTheme()

    const muscleGroups = Object.values(MuscleGroups);
    return (
        <ScrollView className={`flex-1 p-2 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
            <View className="flex-row flex-wrap">
                {muscleGroups.map((muscle, index) => (
                    <BodyCardComponent
                        key={index}
                        muscleName={muscle}
                        muscleImage={getMuscleImage(muscle)}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

export default Exercises;
