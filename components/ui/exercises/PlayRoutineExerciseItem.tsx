import { Image, Pressable, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseInWorkoutAPI } from '@/types/interfaces/entities/plan';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import CustomSnackbar from '../common/snackbar/CustomSnackbar';

interface ExerciseCardProps {
    exercise: ExerciseInWorkoutAPI;
    onDrag: () => void;
    isActive: boolean;
    handleEditExercise: () => void;
    blocked: boolean;
    setWorkoutInProgressNotification: (value: boolean) => void;
}

const PlayRoutineExerciseItem = ({
    exercise,
    onDrag,
    isActive,
    handleEditExercise,
    blocked,
    setWorkoutInProgressNotification,
}: ExerciseCardProps) => {
    const { isDark } = useTheme();
    const [isPressing, setIsPressing] = useState(false);
    useQueryClient().setQueryData(['exercises', exercise.exercise?.id], exercise.exercise);

    return (
        <>
            <View className={`
                flex flex-row items-center justify-start
                transition-all duration-300 px-2 h-24
                bg-eBlue-500 rounded-lg
                ${isActive ? '-translate-x-2' : ''}
            `}>
                <Pressable
                    disabled={blocked}
                    onLongPress={onDrag}
                    className={`p-2 justify-center 
                        ${blocked ? 'opacity-50' : ''}
                        ${isDark ? 'bg-white' : 'bg-darkGray-800'} h-full`}
                >
                    <Ionicons
                        name="menu-outline"
                        size={24}
                        color={isDark ? 'black' : 'white'}
                    />
                </Pressable>

                <View className={`
                    flex-1 rounded-sm overflow-hidden
                `}>
                    <Pressable
                        onLongPress={() => {
                            setIsPressing(true)
                            console.log("edit exercise tapped in item long press")
                            if (blocked){
                                setWorkoutInProgressNotification(true);
                            }else{
                                handleEditExercise()
                            }
                            setTimeout(() => {
                                setIsPressing(false)
                            }, 1000)
                        }}
                        className={`
                            px-4 py-0 flex-row items-center justify-between 
                            ${isPressing ? 'bg-eBlue-700' : ''}
                        `}
                    >

                        <View className="flex-1">
                            <Text
                                numberOfLines={1}
                                className={`
                                text-white 
                                text-xl font-ralewayBold mb-1
                            `}>
                                {exercise.exercise?.name ?? "Ejercicio"}
                            </Text>

                            <View className="flex-col">
                                <View className="flex-row items-center">
                                    <Ionicons
                                        name="repeat-outline"
                                        size={18}
                                        color={"#fff"}
                                    />
                                    <Text className={`text-white text-xs  ml-1`}>
                                        {exercise.sets} X {exercise.reps}
                                    </Text>
                                    <Text className={`text-white text-xs  font-ralewaySemiBold ml-1`}>
                                        Reps
                                    </Text>
                                </View>

                                <View className="flex-row items-center">
                                    <Ionicons
                                        name="time-outline"
                                        size={18}
                                        color={"#fff"}
                                    />
                                    <Text className={`text-white text-xs  ml-1
                                    `}>
                                        {exercise.restTime}
                                    </Text>
                                    <Text className={`text-white text-xs font-ralewaySemiBold ml-1`}>
                                        s descanso - series
                                    </Text>
                                </View>

                                <View className="flex-row items-center">
                                    <Ionicons
                                        name="barbell-outline"
                                        size={18}
                                        color={"#fff"}
                                    />
                                    <Text className={`text-white text-xs font-ralewaySemiBold ml-1
                                    `}> 
                                        {
                                            exercise.weight ? `${exercise.weight}kg` : 'Sin peso'
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <Image
                            source={{
                                uri: "https://media1.tenor.com/m/c1Q1VD-Aq18AAAAC/muppetwiki-muppet-wiki.gif"
                            }}
                            className="w-24 h-24 rounded-full"
                            resizeMode="contain"
                        />
                    </Pressable>
                </View>

            </View>
            
        
        </>
    );
};

export default PlayRoutineExerciseItem;