import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface Props {
    text: string
    pressable?: JSX.Element
}

export const SimpleInfoComponent = ({ text, pressable }: Props) => {
    const { isDark } = useTheme()
    const [visible, setVisible] = useState(true);
    if (!visible) return null;
    return (
        <View className={`
                flex flex-col items-center ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}
                rounded-sm  mt-2 p-4 
            `} >
                <View className='flex flex-row items-start justify-start'>
                    <View className='w-1/8'>
                        <Ionicons name="information-circle-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
                    </View>
                    <Text className={`
                        w-3/4 
                        text-sm ml-2 font-ralewaySemiBold text-start  ${isDark ? "text-white" : "text-darkGray-500"} `}>
                        {text}
                    </Text>
                    <Pressable className='w-1/8 ' onPress={() => setVisible(false)}> 
                        <Ionicons name="close-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
                    </Pressable>
                </View>
            {pressable}
        </View>

    );
}

export default SimpleInfoComponent;
