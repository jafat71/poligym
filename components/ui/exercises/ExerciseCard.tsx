import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { IndividualExercise, RoutinePlan } from '@/types/interfaces/entities/plan'
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons'
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { router } from 'expo-router';

interface ExerciseCardProps {
    exercise: IndividualExercise
}

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
    const { isDark } = useTheme()
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`
    const { setScreenExercise } = useNavigationFlowContext()

    return (
        <View className='flex flex-row items-center justify-start '>
            <View className='p-2 justify-center'>
                <Ionicons name="chevron-forward-outline" size={24} color={isDark ? "white" : "#1c1c1c"} />
            </View>

            <Pressable 
                onPress={() => {
                    setScreenExercise(exercise)
                    router.push("/(tabs)/(home)/exercisedetail")

                }}
                className={`my-2 ${isDark ? 'bg-darkGray-500' : 'bg-white'}
            border-2 ${isDark ? 'border-white' : 'border-darkGray-500'}
            rounded-md p-2 flex flex-col  flex-1`}>
                <View className='flex flex-row items-center justify-start gap-x-2'>
                    <Progress.Pie progress={0.0} size={18} color={isDark ? "white" : "#1c1c1c"} />
                    <Text className={`${textStyle} text-base`}>
                    {exercise.nombre}
                    </Text>
                </View>
                <Text className={`${textStyle} 
                        font-ralewayBold `}>
                    {exercise.series} Series 
                </Text>
                <View className='flex flex-row items-center justify-between w-full'>
                <Text className={`${textStyle} 
                        font-ralewayBold `}>
                    {exercise.repeticiones} Repeticiones
                </Text>
                <Text className={`${textStyle} 
                        font-ralewayBold `}>
                    Descanso: {exercise.tiempoDescanso} s 
                </Text>
                </View>

            </Pressable>
        </View>
    )

}

export default ExerciseCard
