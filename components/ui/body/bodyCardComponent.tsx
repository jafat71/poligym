import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';

interface BodyCardComponentProps {
    muscleName: string;
    muscleImage: React.ReactNode;
}

const BodyCardComponent = ({muscleName, muscleImage}: BodyCardComponentProps) => {
    const { isDark } = useTheme()

    return (
        <View className="w-1/2 p-2 border-[2px] border-eBlue-500 rounded-lg flex-col items-center">
            {muscleImage}
            <Text className={`text-base capitalize font-bold ${isDark ? "text-white" : "text-black"}`}>{muscleName}</Text>
        </View>
    );
}


export default BodyCardComponent;
