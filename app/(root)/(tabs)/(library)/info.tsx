import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { useTheme } from '@/context/ThemeContext';
import { MuscleGroups } from '@/types/types/muscles';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';

export default function LibraryIndex() {
    const { isDark } = useTheme();
    const [activeTab, setActiveTab] = useState<'exercises' | 'food'>('exercises');
    const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroups[]>([]);

    const toggleMuscleFilter = (muscle: MuscleGroups) => {
        setSelectedMuscles(prev =>
            prev.includes(muscle)
                ? prev.filter(m => m !== muscle)
                : [...prev, muscle]
        );
    };
    const muscles = Object.values(MuscleGroups);
    return (
        <View className={`flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
            <View className="flex-row px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <TouchableOpacity
                    onPress={() => setActiveTab('exercises')}
                    className={`flex-1 py-2 rounded-full mr-2 
                        ${activeTab === 'exercises'
                            ? 'bg-eBlue-500'
                            : isDark ? 'bg-darkGray-400' : 'bg-gray-100'
                        }`}
                >
                    <Text className={`text-center font-ralewayBold
                        ${activeTab === 'exercises'
                            ? 'text-white'
                            : isDark ? 'text-white' : 'text-gray-600'
                        }`}
                    >
                        Ejercicios
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setActiveTab('food')}
                    className={`flex-1 py-2 rounded-full 
                        ${activeTab === 'food'
                            ? 'bg-eBlue-500'
                            : isDark ? 'bg-darkGray-400' : 'bg-gray-100'
                        }`}
                >
                    <Text className={`text-center font-ralewayBold
                        ${activeTab === 'food'
                            ? 'text-white'
                            : isDark ? 'text-white' : 'text-gray-600'
                        }`}
                    >
                        Alimentación
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content Area */}
            <ScrollView className="flex-1 px-4 py-3">
                {activeTab === 'exercises' ? (
                    <View>
                        {/* Aquí va tu lista de ejercicios */}
                        <Text className={isDark ? "text-white" : "text-black"}>
                            Lista de Ejercicios
                        </Text>
                        <View className="flex-row flex-wrap justify-start">
    {muscles.map((muscle) => (
        <TouchableOpacity
            key={muscle}
            onPress={() => toggleMuscleFilter(muscle)}
            className={`w-[30%] m-[1.5%] px-2 py-1 rounded-full border
                ${selectedMuscles.includes(muscle)
                    ? 'bg-eBlue-500 border-eBlue-500'
                    : isDark 
                        ? 'bg-darkGray-400 border-darkGray-300'
                        : 'bg-gray-100 border-gray-200'
                }`}
        >
            <Text className={`font-ralewayMedium text-xs text-center
                ${selectedMuscles.includes(muscle)
                    ? 'text-white'
                    : isDark ? 'text-white' : 'text-gray-600'
                }`}
            >
                {muscle}
            </Text>
        </TouchableOpacity>
    ))}
</View>
                    </View>
                ) : (
                    <View>
                        {/* Aquí va tu lista de recomendaciones alimenticias */}
                        <Text className={isDark ? "text-white" : "text-black"}>
                            Recomendaciones Alimenticias
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}