import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchExerciseById, fetchWorkoutById } from '@/lib/api/actions';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import {  WorkoutAPI } from '@/types/interfaces/entities/plan';

import SquarePill from '@/components/ui/common/pills/SquarePill';
import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';
import RoutineExerciseItem from '@/components/ui/routines/RoutineExerciseItem';
import ButtonPillLightDark from '@/components/ui/common/buttons/ButtonPillLightDark';
import { updateUser } from '@/lib/api/userActions';
import { useFavoriteWorkout } from '@/hooks/useFavoriteWorkout';

const WorkoutInfo = () => {
    const { id } = useLocalSearchParams();
    const { accessToken, loggedUserInfo, setLoggedUserInfo } = useUser();
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
    const { isFavorite, handleFavoriteWorkout, handleUnfavoriteWorkout } = useFavoriteWorkout(workoutId);

    if (isLoading) return <SkeletonLoadingScreen />;
    if (isError) return <Text>Error al cargar detalles de la rutina - {id}</Text>;
    
    const handlePlayWorkout = () => {
        router.push(`/playWorkout/${workoutId}`);
    }
    

    const hasExercises = workout?.exercisesInWorkout && workout?.exercisesInWorkout?.length > 0;
    return (
        <View className={`${isDark ? 'bg-darkGray-900' : 'bg-white'} flex-1 px-4`}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <Text className={`text-4xl font-ralewayBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{workout?.name}</Text>

                {/* Información general */}
                <View className='flex flex-row flex-wrap my-2'>
                    <SquarePill text={workout?.category!} icon='apps-outline' />
                    <SquarePill text={workout?.level!} icon='flame-outline' />
                    <SquarePill text={`${workout?.duration} minutos`} icon='timer-outline' />
                    <SquarePill text={workout?.trainingType || 'Sin tipo'} icon='fitness-outline' />
                </View>

                <ButtonPillLightDark
                    icon="heart-outline"
                    text={
                        isFavorite ? "Quitar de favorito" : "Marcar como favorito"}
                    onPress={() => {
                        if (isFavorite) {
                            handleUnfavoriteWorkout()
                        } else {
                            handleFavoriteWorkout()
                        }
                    }}
                    disabled={isLoading}
                />

                <ButtonPillLightDark
                    icon="play-outline"
                    text={"Ejecutar rutina"}
                    onPress={handlePlayWorkout}
                    disabled={isLoading}
                />

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
        </View>
    );
};

export default WorkoutInfo;
