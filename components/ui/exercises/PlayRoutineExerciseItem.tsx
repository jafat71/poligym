import { Image, Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseInWorkoutAPI } from '@/types/interfaces/entities/plan';
import { useQueryClient } from '@tanstack/react-query';
import CustomSnackbar from '../common/snackbar/CustomSnackbar';
import { LinearGradient } from 'expo-linear-gradient';

interface ExerciseCardProps {
    exercise: ExerciseInWorkoutAPI;
    onDrag: () => void;
    isActive: boolean;
    handleEditExercise: () => void;
    blocked: boolean;
}

const PlayRoutineExerciseItem = ({
    exercise,
    onDrag,
    isActive,
    handleEditExercise,
    blocked,
}: ExerciseCardProps) => {
    const { isDark } = useTheme();
    const [pressing, setPressing] = useState(false);
    useQueryClient().setQueryData(['exercises', exercise.exercise?.id], exercise.exercise);
    const [notification, setNotification] = useState(false);
    const [workoutInProgressNotification, setWorkoutInProgressNotification] = useState(false);
    
    return (
        <>
            <View 
            className={`
                flex flex-row items-center justify-start
                transition-all duration-300 px-2 h-24
                bg-eBlue-500/70 rounded-lg
                ${isActive ? '-translate-x-2' : ''}
                ${pressing ? 'bg-eBlue-700 ' : ''}
            `}>
                <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />
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

                <View 
                className={`
                    flex-1 rounded-sm overflow-hidden
                `}>
                    <Pressable
                        onPress={()=>{
                            if(blocked){
                                setWorkoutInProgressNotification(true);
                            }else{
                                setPressing(true);
                                setNotification(true);
                                setTimeout(() => {
                                setPressing(false);
                                    setNotification(false);
                                }, 1000);
                            }
                        }}
                        onLongPress={() => {
                            if (blocked){
                                setWorkoutInProgressNotification(true);
                            }else{
                                handleEditExercise()
                            }
                            setPressing(false);
                        }}
                        className={`px-4 py-0 flex-row items-center justify-between`}
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

            <CustomSnackbar
                visible={notification}
                setVisible={setNotification}
                message='Manten presionado para editar'
                color='#121212'
            />

        <CustomSnackbar
                visible={workoutInProgressNotification}
                setVisible={setWorkoutInProgressNotification}
                message='Rutina en progreso'
            />
        </>
    );
};

export default PlayRoutineExerciseItem;