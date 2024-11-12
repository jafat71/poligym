import SearchBar from '@/components/ui/common/searchbar/FloatingSearchBar';
import { LibAlimentacion, LibExercises } from '@/constants';
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { useTheme } from '@/context/ThemeContext';
import { LibraryExercise } from '@/types/interfaces/entities/plan';
import { MuscleGroups } from '@/types/types/muscles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Pressable, Image } from 'react-native';

export default function FoodPanIndex() {
    const { isDark } = useTheme();
    const [activeTab, setActiveTab] = useState<'exercises' | 'food'>('exercises');
    const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroups[]>([]);
    const { setScreenLibAlimentacion, setScreenLibExercise } = useNavigationFlowContext();
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
            <ScrollView className="flex-1 px-4 py-3">
                <View>
                    {/* Aquí va tu lista de recomendaciones alimenticias */}
                    <Text className={isDark ? "text-white" : "text-black"}>
                        Recomendaciones Alimenticias
                    </Text>

                    {LibAlimentacion.map((alimento) => (
                        <Pressable
                            key={alimento.id}
                            onPress={() => {
                                setScreenLibAlimentacion(alimento);
                            }}
                            className={`p-4 mb-3 rounded-lg ${isDark ? "bg-darkGray-400" : "bg-gray-100"
                                }`}
                        >
                            <Image source={{ uri: alimento.imagenPlanAlimentacion }} className="w-full h-24 rounded-lg mb-2" />
                            <View className="flex-row justify-between items-center mb-2">
                                <Text
                                    className={`font-ralewayBold text-lg ${isDark ? "text-white" : "text-black"
                                        }`}
                                >
                                    {alimento.nombre}
                                </Text>
                                <View className="bg-eBlue-500 px-3 py-1 rounded-full">
                                    <Text className="text-white text-xs font-ralewayMedium">
                                        {alimento.categoria}
                                    </Text>
                                </View>
                            </View>

                            <Text
                                className={`font-ralewayMedium mb-2 ${isDark ? "text-gray-300" : "text-gray-600"
                                    }`}
                            >
                                {alimento.descripcion}
                            </Text>


                        </Pressable>
                    ))}
                </View>
            </ScrollView>
            <Pressable
                onPress={() => {
                    router.navigate('/(root)/(tabs)/(library)/body')
                }}
                className="absolute bottom-0 right-0 w-1/4 p-4">
                <View className="flex flex-row items-center justify-center rounded-2xl bg-eBlue-500 p-2">
                    <Ionicons name="body-outline" size={34} color={"#fff"} />
                </View>
            </Pressable>
        </View>
    );
}