import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';

interface ScorePillProps {
    score: number;
    totalRatings: number;
}

const ScorePill = ({ score, totalRatings }: ScorePillProps) => {

    const { isDark } = useTheme();
    const [rating, setRating] = useState(score);

    useEffect(() => {
        setRating(score);
    }, [score]);

    return (
        <View className="flex-row items-center justify-between bg-primary-500 rounded-full px-2 py-1">

            <View className='flex-row items-center justify-center '>
                <Ionicons name="person" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
                <Text className={`${isDark ? "text-white" : "text-black"} text-sm font-bold`}>
                    {totalRatings}
                </Text>
                <Text className={`${isDark ? "text-white" : "text-black"} text-sm font-ralewayLight`}>
                    {
                        totalRatings !== 1 ? " Opiniones" : " Opinión"
                    }
                </Text>
            </View>

            <View className='flex-row items-center justify-center gap-2'>
                <Ionicons name="star-half-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
                <Text className={`${isDark ? "text-white" : "text-black"} text-sm font-bold`}> {score || 0} </Text>
                {[1, 2, 3, 4, 5].map((star) => (
                    <View key={star} >
                        <Ionicons
                            name={star <= rating ? "star" : "star-outline"}
                            size={24}
                            color={isDark ? "#fff" : "#1c1c1c"}
                        />
                    </View>
                ))}
            </View>


        </View>
    );

}

export default ScorePill;
