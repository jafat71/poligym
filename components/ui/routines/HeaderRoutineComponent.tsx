import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { getMuscleImage } from '../body/bodyConstants';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import SmallBodyCardComponent from '../body/smallBodyCardComponent';
import { RoutinePlan, WorkoutAPI } from '@/types/interfaces/entities/plan';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, DIFFICULTIES } from '@/constants';

interface HeaderRoutineComponentProps {
    selectedWorkout: WorkoutAPI;
}

const HeaderRoutineComponent = ({ selectedWorkout }: HeaderRoutineComponentProps) => {
    const { isDark } = useTheme();
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`
    return (
        <>
            <View className='flex flex-row py-2'>
                <View className={`w-1/2 p-1`}>
                    <Text className={`${textStyle} text-center text-base font-ralewayExtraBold`}>
                        Descripción
                    </Text>
                    <Text className={`${textStyle} text-center text-base font-ralewayLight`}>  
                        {selectedWorkout?.description}
                    </Text>
                </View>
                <View className='w-1/2 p-1 flex flex-col justify-between'>
                    <View>

                        <Text className={`${textStyle} text-center text-base font-ralewayExtraBold`}>
                            Tipo
                        </Text>
                        <Text className={`${textStyle} text-center text-base font-ralewayLight`}>
                            {`${CATEGORIES.find(category => category.value === selectedWorkout.category)?.label}`}
                        </Text>

                        <Text className={`${textStyle} text-center text-base font-ralewayExtraBold`}>
                            Dificultad
                        </Text>
                        <Text className={`${textStyle} text-center text-base font-ralewayLight`}>
                            {`${DIFFICULTIES.find(difficulty => difficulty.value === selectedWorkout.level)?.label}`}
                        </Text>
                        <Text className={`${textStyle} text-center text-base font-ralewayExtraBold`}>
                            Tiempo Aprox:
                        </Text>
                        <Text className={`${textStyle} text-center text-base font-ralewayLight`}>
                            {selectedWorkout?.duration} m
                        </Text>
                        <Text className={`${textStyle} text-center text-base font-ralewayExtraBold`}>
                            Tipo de entrenamiento:
                        </Text>
                        <Text className={`${textStyle} text-center text-base font-ralewayLight`}>
                            {selectedWorkout?.trainingType}
                        </Text>
                    </View>
                    <View>
                        <Text className={`${textStyle} text-center text-base font-ralewayExtraBold`}>
                            Marcar como Favorito
                        </Text>
                        <Pressable className='items-center justify-center'>
                            <Ionicons name="heart-outline" size={24} color={isDark ? 'white' : 'darkGray-500'} />
                        </Pressable>
                    </View>
                </View>
            </View>

        </>
    );
}


export default HeaderRoutineComponent;
