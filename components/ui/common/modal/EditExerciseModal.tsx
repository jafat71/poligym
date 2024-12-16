import React, { useEffect, useState } from 'react'

import { View, Text, ScrollView, Image } from 'react-native'
import Modal from 'react-native-modal';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';

import { getMuscleColors } from '@/lib/utils/getColoredMuscles';
import { isValidMuscleGroup } from '@/lib/utils/isMuscle';

import { ExerciseInWorkoutAPI } from '@/types/interfaces/entities/plan';

import SquarePill from '../pills/SquarePill';
import IconButton from '../buttons/IconButton';
import MaleBack from '../../body/MaleBack';
import MaleFront from '../../body/MaleFront';
import { MuscleGroups } from '@/types/types/muscles';
import { SubAddNumericComponent } from '../form/SubAddNumericComponent';
import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';

interface EditExerciseModalProps {
    visible: boolean;
    onClose: () => void;
    exercise: ExerciseInWorkoutAPI | null;
    updateExercise: (exercise: ExerciseInWorkoutAPI) => void;
}

const EditExerciseModal = ({ visible, onClose, exercise, updateExercise }: EditExerciseModalProps) => {
    const { isDark } = useTheme();

    let muscleColors = getMuscleColors(exercise?.exercise.muscleGroups || []);
    const [exerciseState, setExerciseState] = useState(exercise);
    useEffect(() => {
        setExerciseState(exercise);
    }, [exercise]);

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            className="mt-20"
            style={{ margin: 0 }}
            propagateSwipe
            animationOutTiming={1000}
            animationOut={'slideOutDown'}
            animationIn={'slideInUp'}
            backdropOpacity={0.25} // Aumentar opacidad del fondo
            useNativeDriver={true}
            useNativeDriverForBackdrop
            backdropTransitionOutTiming={0}
            hideModalContentWhileAnimating
        >
            {
                exercise ? (
                    <View className={`flex-1 bg-${isDark ? 'darkGray-900' : 'white'} mt-20 rounded-t-3xl p-4`}>
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className={`text-3xl font-ralewayBold ${isDark ? 'text-white' : 'text-black'}`}>
                                {exercise?.exercise.name}
                            </Text>
                            <IconButton
                                icon={<Ionicons name="close" size={24} color="#999" />}
                                onPress={onClose}
                            />
                        </View>

                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={false}
                        >

                            <View className="w-full ">
                                <View className={`flex flex-col items-start justify-between`}>

                                    <SubAddNumericComponent
                                        number={exerciseState?.sets || 0}
                                        title='Series'
                                        subFunction={() => {
                                            updateExercise({
                                                ...exercise,
                                                sets: exercise?.sets - 1
                                            })
                                        }}
                                        addFunction={() => {
                                            updateExercise({
                                                ...exercise,
                                                sets: exercise?.sets + 1
                                            })
                                        }}
                                        icon='repeat-sharp'
                                    />

                                    <SubAddNumericComponent
                                        number={exerciseState?.reps || 0}
                                        title='Repeticiones'
                                        subFunction={() => {
                                            updateExercise({
                                                ...exercise,
                                                reps: exercise?.reps - 1
                                            })
                                        }}
                                        addFunction={() => {
                                            updateExercise({
                                                ...exercise,
                                                reps: exercise?.reps + 1
                                            })
                                        }}
                                        icon='repeat-sharp'
                                    />

                                    <SubAddNumericComponent
                                        number={exerciseState?.restTime || 0}
                                        title='Descanso (seg)'
                                        subFunction={() => {
                                            updateExercise({
                                                ...exercise,
                                                restTime: exercise?.restTime - 1
                                            })
                                        }}
                                        addFunction={() => {
                                            updateExercise({
                                                ...exercise,
                                                restTime: exercise?.restTime + 1
                                            })
                                        }}
                                        icon='timer-outline'
                                    />

                                    <SubAddNumericComponent
                                        number={exerciseState?.weight || 0}
                                        title='Peso (kg)'
                                        subFunction={() => {
                                            updateExercise({
                                                ...exercise,
                                                weight: exercise?.weight ? exercise?.weight - 1 : 0
                                            })
                                        }}
                                        addFunction={() => {
                                            updateExercise({
                                                ...exercise,
                                                weight: exercise?.weight ? exercise?.weight + 1 : 0
                                            })
                                        }}
                                        icon='barbell-outline'
                                    />

                                </View>
                            </View>

                            <Image
                                source={{ uri: exercise?.exercise.mediaUrl }}
                                className='w-full h-64 rounded-lg my-4 bg-gray-100'
                                resizeMode='stretch'
                            />

                            <View>
                                <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Descripción</Text>
                                <Text className={`text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{exercise?.exercise.description}</Text>
                            </View>

                            <View className='my-2'>
                                <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Recomendación</Text>
                                <Text className={`text-xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{exercise?.exercise.recommendation}</Text>
                            </View>

                            <View className='my-2'>
                                <Text className={`text-sm font-ralewayExtraBold ${isDark ? 'text-white' : 'text-darkGray-900'}`}>Grupos musculares</Text>
                            </View>
                            <View className='flex flex-row flex-wrap'>
                                {
                                    exercise?.exercise.muscleGroups && exercise?.exercise.muscleGroups.map((muscle) => (
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
                            <View className='flex flex-row flex-wrap mb-2'>
                                {
                                    exercise?.exercise.equipment?.map((equipment) => (
                                        <SquarePill
                                            key={equipment.id}
                                            text={equipment.name}
                                            icon='barbell-outline'
                                        />
                                    ))
                                }
                                {
                                    exercise?.exercise.equipment?.length === 0 && (
                                        <SquarePill
                                            text='Sin equipamiento'
                                            icon='barbell-outline'
                                        />
                                    )
                                }
                            </View>

                        </ScrollView>
                        
                    </View>
                ) : (
                    <SkeletonLoadingScreen />   
                )
            }
        </Modal>
    )
}

export default EditExerciseModal