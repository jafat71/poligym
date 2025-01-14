import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'

import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { WorkoutAPI } from '@/types/interfaces/entities/plan'
import IconButton from '../common/buttons/IconButton'
import { Ionicons } from '@expo/vector-icons'
import { useUser } from '@/context/UserContext'
import { getUserPlanProgressById } from '@/database/sqlite'

interface Props {
    routine: WorkoutAPI
    weekIndex: number
    planProgressId: number
}   

const RoutinePlanSmallCard = ({ routine, weekIndex, planProgressId}: Props) => {
    const router = useRouter()
    const {userSelectedPlan} = useUser()
    const routineFirstWord = routine.name.split(' ')[0]
    const routineRest = routine.name.split(' ').slice(1).join(' ')

    const [isCompleted, setIsCompleted] = useState(false);
    if(!routine) return null
    const getCurrentWorkoutInPlanProgress = async () => {
        try {
            const workoutState = await getUserPlanProgressById(planProgressId, weekIndex, routine.id.toString())
            console.log(workoutState)
            setIsCompleted(workoutState?.completed!)
        } catch (error) {
            console.error("Error al obtener el progreso del plan:", error);
        }
    }

    useEffect(() => {
        getCurrentWorkoutInPlanProgress()
    }, [])


    return (
        <Pressable
            key={routine.id}
            onPress={() => {
                if (isCompleted) return
                router.push({
                    pathname: `/(home)/playWorkout/${routine.id}` as never,
                    params: {
                        planId: userSelectedPlan?.id ?? null,
                        planName: userSelectedPlan?.name ?? null,
                        weekIndex: weekIndex,
                        planProgressId: planProgressId,
                    },
                });            }}
            className={`w-72 h-60 mr-2 mb-1 
            overflow-hidden rounded-lg `}>
            <LinearGradient
                colors={[
                    //0, 122, 255, 1
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />
            <View className='absolute right-0 top-10 z-1 translate-x-14 '>
                {isCompleted ? (
                    <Ionicons name="checkmark-circle-outline" size={194} color="#0085F9" />  
                ) : (
                    <Ionicons name="barbell-outline" size={194} color="#0085F9" />  
                )}
            </View>
            <View className='z-30 flex-1'>
                <View className='p-4 flex flex-row justify-between'>
                    <View className='flex flex-col w-4/5'>
                        <Text className='text-white font-ralewayBold text-sm'>{routineFirstWord}</Text>
                        <Text className='text-white font-ralewayBold text-4xl '>{routineRest}</Text>
                    </View>
                    <View>
                        <IconButton
                            icon={<Ionicons name="information" size={24} color="white" />}
                            onPress={() => {
                                router.push(`/(library)/routine/${routine.id}`)
                            }}
                        />
                    </View>
                </View>
                <View className='flex-1 items-start justify-end p-4'>
                    <View className="flex-row items-start justify-between px-2 gap-x-2">
                        <Text className='text-white font-raleway text-sm'>
                            {routine.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default RoutinePlanSmallCard