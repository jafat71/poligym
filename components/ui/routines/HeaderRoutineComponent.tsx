import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { getMuscleImage } from '../common/body/bodyConstants';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import SmallBodyCardComponent from '../common/body/smallBodyCardComponent';
import { RoutinePlan } from '@/types/interfaces/entities/plan';
import { Ionicons } from '@expo/vector-icons';

interface HeaderRoutineComponentProps {
    screenRoutine: RoutinePlan;
}

const HeaderRoutineComponent = ({ screenRoutine }: HeaderRoutineComponentProps) => {
    const { isDark } = useTheme();
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`
    return (
        <>
            <View className='flex flex-row py-2'>
                <View className={`w-1/2 p-1`}>
                    {
                        screenRoutine?.musculos.map((muscle, index) => (
                            <SmallBodyCardComponent key={index} muscleImage={getMuscleImage(muscle, 200, 100)} />
                        ))
                    }
                </View>
                <View className='w-1/2 p-1 flex flex-col justify-between'>
                    <View>

                        <Text className={`${textStyle} text-center text-base font-ralewayExtraBold`}>
                            Enfoque
                        </Text>
                        {
                            screenRoutine?.musculos.map((muscle, index) => (
                                <Text key={index} className={`${textStyle} text-center text-base font-ralewayLight`}> {muscle}</Text>
                            ))
                        }
                        <Text className={`${textStyle} text-center text-base font-ralewayExtraBold`}>
                            Dificultad
                        </Text>
                        <Text className={`${textStyle} text-center text-base font-ralewayLight`}>
                            {screenRoutine?.dificultad}
                        </Text>
                        <Text className={`${textStyle} text-center text-base font-ralewayExtraBold`}>
                            Tiempo Aprox:
                        </Text>
                        <Text className={`${textStyle} text-center text-base font-ralewayLight`}>
                            30 m
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
