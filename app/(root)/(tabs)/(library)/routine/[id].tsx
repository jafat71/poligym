import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import SkeletonSmallItemsLoading from '@/components/animatedUi/SkeletonSmallItemsLaoding';

const WorkoutInfo = () => {
    const { id } = useLocalSearchParams();
    const { accessToken } = useUser();
    const { isDark } = useTheme();
    const queryClient = useQueryClient();
    const workoutId = Number(id);
    const [infoFullSetted, setInfoFullSetted] = useState(false);

    // Obtener datos en caché
    const cachedWorkout = queryClient.getQueryData<WorkoutAPI>(['workouts', workoutId]);

    const { data: workout, isLoading, isError } = useQuery<WorkoutAPI>({
        queryKey: ['workouts', id],
        queryFn: async () => fetchWorkoutById(accessToken!, id as string),
        initialData: cachedWorkout,
        enabled: !!id,
    });

    const cachedExercises = useMemo(() => {
        const exerciseIds = workout?.exercisesInWorkout.map(ex => ex.exerciseId) || [];
        return exerciseIds.map(id => queryClient.getQueryData<ExerciseAPI>(['exercises', id]));
    }, [workout, queryClient]);

    const { data: exercises = [], isLoading: isLoadingExercises, isError: isErrorExercises } = useQuery<ExerciseAPI[]>({
        queryKey: ['exercises', id],
        queryFn: async () => {
            if (!workout) return [];
            const exerciseIds = workout.exercisesInWorkout.map(ex => ex.exerciseId);
            const fetchedExercises = await Promise.all(
                exerciseIds.map(async exerciseId => {
                    const exercise = await fetchExerciseById(accessToken!, exerciseId.toString());
                    queryClient.setQueryData(['exercises', exerciseId], exercise);
                    return exercise;
                })
            );
            return fetchedExercises;
        },
        enabled: !!id && !!workout,
        initialData: cachedExercises.filter(Boolean) as ExerciseAPI[],
    });

    useEffect(() => {
        if (workout && exercises.length > 0) {
            workout.exercisesInWorkout.forEach(exercise => {
                exercise.name = exercises.find(ex => ex.id === exercise.exerciseId)?.name;
            })
            setInfoFullSetted(true);
        }
    }, [exercises, workout]);

    // Validación inicial
    if (isLoading || isLoadingExercises) return <SkeletonLoadingScreen />;
    if (isError) return <Text>Error al cargar detalles de la rutina - {id}</Text>;
    if (isErrorExercises) return <Text>Error al cargar los ejercicios de la rutina - {id}</Text>;

    const hasExercises = workout?.exercisesInWorkout && workout?.exercisesInWorkout?.length > 0;
    return (
        <SafeAreaView className={`${isDark ? 'bg-darkGray-900' : 'bg-white'} flex-1 px-4`}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <Text className={`text-4xl font-ralewayBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{workout?.name}</Text>

                {/* Información general */}
                <View className='flex flex-row flex-wrap my-2'>
                    <SquarePill text={CATEGORIES.find(cat => cat.value === workout?.category)?.label || ''} icon='apps-outline' />
                    <SquarePill text={DIFFICULTIES.find(diff => diff.value === workout?.level)?.label || ''} icon='flame-outline' />
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
                              !infoFullSetted ? (
                                <SkeletonSmallItemsLoading />
                            ) : (
                                workout?.exercisesInWorkout.map(exercise => (
                                    <RoutineExerciseItem
                                        key={exercise.id}
                                        exercise={exercise}
                                        exerciseName={exercise.name!}
                                    />
                                ))
                            )
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
                className='absolute bottom-0 left-0 right-0 p-4 rounded-t-sm bg-eBlue-500 flex flex-row items-center justify-center gap-x-2'>
                <Ionicons name='play' size={24} color='white' />
                <Text className='text-center text-xl font-ralewayBold text-white'>Ejecutar rutina</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default WorkoutInfo;
