import SearchBar from '@/components/ui/common/searchbar/SearchBar';
import { LibAlimentacion, LibExercises } from '@/constants';
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { useTheme } from '@/context/ThemeContext';
import { LibraryExercise } from '@/types/interfaces/entities/plan';
import { MuscleGroups } from '@/types/types/muscles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Pressable, Image } from 'react-native';

export default function LibraryIndex() {
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
            <View className="flex-row px-4 py-3 ">
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

            <ScrollView className="flex-1 px-4 py-3">
                {activeTab === 'exercises' ? (
                    <View>
                        <SearchBar
                            placeholder='Buscar en Biblioteca Poligym'
                            onSearch={() => { }}
                            onClear={() => { }}
                            value=''
                            onChangeText={() => { }}
                            isVisible={true}
                        />
                        <View className="flex-row flex-wrap justify-start my-2">
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

                            <View className="mt-4 w-full">
                                {LibExercises
                                    .filter(exercise =>
                                        selectedMuscles.length === 0 ||
                                        exercise.musculos.some(m => selectedMuscles.includes(m))
                                    )
                                    .map((exercise) => (
                                        <Pressable
                                            onPress={() => {
                                                setScreenLibExercise(exercise as LibraryExercise);
                                                router.push('/(root)/(library)/exerciseInfo');
                                            }}
                                            key={exercise.id}
                                            className={`w-full p-4 mb-3 rounded-lg ${isDark ? "bg-darkGray-600" : "bg-gray-100"
                                                }`}
                                        >
                                            <Text
                                                className={`font-ralewayBold text-lg mb-1 ${isDark ? "text-white" : "text-black"
                                                    }`}
                                            >
                                                {exercise.nombre}
                                            </Text>
                                            <Text
                                                className={`font-ralewayMedium ${isDark ? "text-gray-300" : "text-gray-600"
                                                    }`}
                                            >
                                                {exercise.musculos.join(", ")}
                                            </Text>
                                        </Pressable>
                                    ))
                                }
                            </View>
                          
                        </View>
    
      
                    </View>
                ) : (
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
                                    router.push('/(root)/(library)/alimentationInfo');
                                }}
                                className={`p-4 mb-3 rounded-lg ${
                                    isDark ? "bg-darkGray-400" : "bg-gray-100"
                                }`}
                            >
                                <Image source={{ uri: alimento.imagenPlanAlimentacion }} className="w-full h-24 rounded-lg mb-2" />
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text 
                                        className={`font-ralewayBold text-lg ${
                                            isDark ? "text-white" : "text-black"
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
                                    className={`font-ralewayMedium mb-2 ${
                                        isDark ? "text-gray-300" : "text-gray-600"
                                    }`}
                                >
                                    {alimento.descripcion}
                                </Text>
                                
                              
                            </Pressable>
                        ))}
                    </View>
                )}
         
            </ScrollView>
            <Pressable
                            onPress={() => {
                                //TODO: GO TO THE TOP
                            }}
                            className="absolute bottom-0 right-0 w-1/4 p-4">
                            <View className="flex flex-row items-center justify-center rounded-2xl bg-eBlue-500 p-2">
                                <Ionicons name="arrow-up" size={34} color={"#fff"} />
                            </View>
                        </Pressable>
        </View>
    );
}