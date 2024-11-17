import React, { useCallback, useEffect } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchExerciseById, fetchWorkoutById } from '@/lib/api/actions';

import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';

import { CATEGORIES, DIFFICULTIES } from '@/constants';

import { ExerciseAPI, WorkoutAPI } from '@/types/interfaces/entities/plan';

import SquarePill from '@/components/ui/common/pills/SquarePill';
import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';
import RoutineExerciseItem from '@/components/ui/routines/RoutineExerciseItem';

const WorkoutInfo = () => {
    const { id } = useLocalSearchParams();
    const { accessToken } = useUser();
    const { isDark } = useTheme();
    const queryClient = useQueryClient();
    const cachedWorkout = queryClient.getQueryData<WorkoutAPI>(['workouts', id as string]);

    const { data: workout, isLoading, isError } = useQuery<WorkoutAPI>({
        queryKey: ['workouts', id],
        queryFn: async () => {
            return await fetchWorkoutById(accessToken!, id as string);;
        },
        initialData: cachedWorkout,
        enabled: !!id
    });

    //get Exercise Info from Workout
    const {
        data: exercises = [],
        isLoading: isLoadingExercises, isError: isErrorExercises } = useQuery<ExerciseAPI[]>({
            queryKey: ['exercises', id],
            queryFn: async () => {
                if (!workout) return [];
                const arrayExercises = workout?.exercisesInWorkout.map(exercise => exercise.exerciseId);
                const data = await Promise.all(arrayExercises.map(async (exerciseId) => {
                    const exercise = await fetchExerciseById(accessToken!, exerciseId.toString());
                    queryClient.setQueryData(['exercises', exerciseId], exercise);
                    return exercise;
                }))
                return data;
            },
            enabled: !!id && !!workout
        })

    if (isLoading || isLoadingExercises) return <SkeletonLoadingScreen />;
    if (isError) return <Text>Error loading workout details - {id}</Text>;
    if (isErrorExercises) return <Text>Error loading exercises from workout - {id}</Text>;
    const hasExercises = workout?.exercisesInWorkout && workout?.exercisesInWorkout?.length > 0;

    return (
        <SafeAreaView className={`${isDark ? 'bg-darkGray-900' : 'bg-white'} flex-1 px-4`}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <Text className={`text-4xl font-ralewayBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{workout?.name}</Text>

                <View className='flex flex-row flex-wrap my-2'>
                    <SquarePill
                        text={`${CATEGORIES.find(category => category.value === workout?.category)?.label}`}
                        icon='apps-outline'
                    />

                    <SquarePill
                        text={`${DIFFICULTIES.find(level => level.value === workout?.level)?.label}`}
                        icon='flame-outline'
                    />

                    <SquarePill
                        text={`${workout?.duration} minutos`}
                        icon='timer-outline'
                    />

                    <SquarePill
                        text={`${workout?.trainingType}`}
                        icon='fitness-outline'
                    />

                </View>

                <View>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Descripción</Text>
                    <Text className={`text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{workout?.description}</Text>
                </View>

                <View className='mt-2'>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Ejercicios</Text>
                </View>

                <View className='mt-2'>
                    {
                        hasExercises ? (
                            workout?.exercisesInWorkout?.map((exercise) => (
                                <RoutineExerciseItem
                                    exercise={exercise}
                                    exercises={exercises}
                                    key={exercise.id}
                                />
                            ))
                        ) : (
                            <Text className={`text-start text-xl font-raleway 
                                ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Esta rutina no tiene ejercicios actualmente</Text>
                        )
                    }
                </View>

            </ScrollView>

            <Pressable className='absolute bottom-0 left-0 right-0 p-4 
            rounded-t-sm
            bg-eBlue-500 flex flex-row items-center justify-center gap-x-2'>
                <Ionicons name='play' size={24} color='white' />
                <Text className='text-center text-xl font-ralewayBold text-white'>Ejecutar rutina</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default WorkoutInfo;
