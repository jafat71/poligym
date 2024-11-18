import React from 'react';
import { Text, View, ScrollView, Pressable, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';
import { fetchExerciseById } from '@/lib/api/actions';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import { CATEGORIES, DIFFICULTIES } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import SquarePill from '@/components/ui/common/pills/SquarePill';
import { ExerciseAPI } from '@/types/interfaces/entities/plan';
import { MuscleGroups } from '@/types/types/muscles';
import { isValidMuscleGroup } from '@/lib/utils/isMuscle';
import MaleBack from '@/components/ui/body/MaleBack';
import MaleFront from '@/components/ui/body/MaleFront';
import { getMuscleColors } from '@/lib/utils/getColoredMuscles';
import { Ionicons } from '@expo/vector-icons';

const ExerciseInfo = () => {
    const { id } = useLocalSearchParams();
    const { accessToken } = useUser();
    const { isDark } = useTheme();
        const queryClient = useQueryClient();
    const exerciseId = Number(id);

    const cachedExercise = queryClient.getQueryData<ExerciseAPI>(['exercises', exerciseId]);
    
    const { data: exercise, isLoading, isError } = useQuery<ExerciseAPI>({
        queryKey: ['exercises', id],
        queryFn: async () => {
            return await fetchExerciseById(accessToken!, id as string);;
        },
        initialData: cachedExercise,
        enabled: !!id 
    });

    if (isLoading) return <SkeletonLoadingScreen />;
    if (isError) return <Text>Error loading exercise details - {id}</Text>;

    let muscleColors = getMuscleColors(exercise?.muscleGroups || [] );

    return (
        <SafeAreaView className={`${isDark ? 'bg-darkGray-900' : 'bg-white'} flex-1 px-4`}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <Text className={`text-4xl font-ralewayBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{exercise?.name}</Text>

                <View className='flex flex-row flex-wrap my-2'>
                    <SquarePill
                        text={`${CATEGORIES.find(category => category.value === exercise?.category)?.label}`}
                        icon='apps-outline'
                    />

                    <SquarePill
                        text={`${DIFFICULTIES.find(level => level.value === exercise?.level)?.label}`}
                        icon='flame-outline'
                    />
                </View>

                <Image
                    source={{ uri: exercise?.mediaUrl }}
                    className='w-full h-64 rounded-lg my-4 bg-gray-100'
                    resizeMode='stretch'
                />

                <View>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Descripción</Text>
                    <Text className={`text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{exercise?.description}</Text>
                </View>

                
                <View className='my-2'>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Recomendación</Text>
                    <Text className={`text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{exercise?.recommendation}</Text>
                </View>


                <View className='my-2'>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Grupos musculares</Text>
                </View>
                <View className='flex flex-row flex-wrap'>
                    {
                        exercise?.muscleGroups && exercise?.muscleGroups.map((muscle) => (
                            <SquarePill
                                key={muscle}
                                text={isValidMuscleGroup(muscle) ? MuscleGroups[muscle] : muscle}
                                icon='body-outline'
                            />
                        ))
                    }
                </View>

                <View className='flex flex-row justify-center p-2'>
                    <MaleBack width={150} height={150} muscleColors={muscleColors} />
                    <MaleFront width={150} height={150} muscleColors={muscleColors} />
                </View>

                <View className='my-2'>
                    <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Equipamiento</Text>
                </View>
                <View className='flex flex-row flex-wrap mb-20'>
                    {
                        exercise?.equipment?.map((equipment) => (
                            <SquarePill
                                key={equipment.id}
                                text={equipment.name}
                                icon='barbell-outline'
                            />
                        ))
                    }
                    {
                        exercise?.equipment?.length === 0 && (
                            <SquarePill
                                text='Sin equipamiento'
                                icon='barbell-outline'
                            />
                        )
                    }
                </View>

            
            </ScrollView>

            <Pressable className='absolute bottom-0 left-0 right-0 p-4 
            rounded-t-sm
            bg-eBlue-500 flex flex-row items-center justify-center gap-x-2'>
                <Ionicons name='play' size={24} color='white' />
                <Text className='text-center text-xl font-ralewayBold text-white'>Hacer una serie :)</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default ExerciseInfo;
