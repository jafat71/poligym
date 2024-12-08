import React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchExerciseById, fetchWorkoutById } from '@/lib/api/actions';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import { CATEGORY, DIFFICULTY, ExerciseAPI, WorkoutAPI } from '@/types/interfaces/entities/plan';

import SquarePill from '@/components/ui/common/pills/SquarePill';
import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';
import RoutineExerciseItem from '@/components/ui/routines/RoutineExerciseItem';
import { IndividualExercise } from '../../../../../types/interfaces/entities/plan';

const WorkoutInfo = () => {
    const { id } = useLocalSearchParams();
    const { accessToken } = useUser();
    const { isDark } = useTheme();
    const queryClient = useQueryClient();
    const workoutId = Number(id);
    // Obtener datos en caché
    const cachedWorkout = queryClient.getQueryData<WorkoutAPI>(['workouts', workoutId]);

    const { data: workout, isLoading, isError } = useQuery<WorkoutAPI>({
        queryKey: ['workouts', id],
        queryFn: async () => {
            const data = await fetchWorkoutById(accessToken!, id as string);
            data.exercisesInWorkout.forEach(exercise => {
                queryClient.prefetchQuery({
                    queryKey: ['exercises', exercise.exercise.id],
                    queryFn: async () => {
                        const IndividualExercise = await fetchExerciseById(accessToken!, exercise.exercise.id.toString());
                        queryClient.setQueryData(['exercises', exercise.exercise.id], IndividualExercise);
                        return IndividualExercise;
                    }
                });
            });
            return data;
        },
        initialData: cachedWorkout,
        enabled: !!id,
    });

    if (isLoading) return <SkeletonLoadingScreen />;
    if (isError) return <Text>Error al cargar detalles de la rutina - {id}</Text>;

    const hasExercises = workout?.exercisesInWorkout && workout?.exercisesInWorkout?.length > 0;
    return (
        <SafeAreaView className={`${isDark ? 'bg-darkGray-900' : 'bg-white'} flex-1 px-4`}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <Text className={`text-4xl font-ralewayBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{workout?.name}</Text>

                {/* Información general */}
                <View className='flex flex-row flex-wrap my-2'>
                    <SquarePill text={workout?.category!} icon='apps-outline' />
                    <SquarePill text={workout?.level!} icon='flame-outline' />
                    <SquarePill text={`${workout?.duration} minutos`} icon='timer-outline' />
                    <SquarePill text={workout?.trainingType || 'Sin tipo'} icon='fitness-outline' />
                </View>

                {/* Descripción */}
                <View>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Descripción</Text>
                    <Text className={`text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{workout?.description}</Text>
                </View>

                {/* Ejercicios */}
                <View className='mt-2'>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Ejercicios</Text>
                    <View className='mt-2'>
                    {hasExercises ? (
                                workout?.exercisesInWorkout.map(exercise => (
                                    <RoutineExerciseItem
                                        key={exercise.id}
                                        exercise={exercise}
                                    />
                                ))
                        ) : (
                            <Text className={`text-start text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>
                                Esta rutina no tiene ejercicios actualmente
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Botón de acción */}
            <Pressable
                onPress={() => {
                    router.push(`/playWorkout/${workoutId}`);
                }}
                className='absolute bottom-0 left-0 right-0 p-4 rounded-t-sm bg-eBlue-500 flex flex-row items-center justify-center gap-x-2'>
                <Ionicons name='play' size={24} color='white' />
                <Text className='text-center text-xl font-ralewayBold text-white'>Ejecutar rutina</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default WorkoutInfo;
