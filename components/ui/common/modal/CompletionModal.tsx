import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { EquipmentApi, ExerciseInWorkoutAPI } from '@/types/interfaces/entities/plan';
import { rateTarget } from '@/lib/api/userActions';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import { TargetType } from '@/constants';

interface CompletionModalProps {
    visible: boolean;
    onClose: () => void;
    onShare: () => void;
    onRate: (rating: number) => void;
    routineExercises: ExerciseInWorkoutAPI[];
    workoutId: number;
}

const StarElement = ({ star, isSelected, onPress, size = 22 }: any) => {
    const handlePress = () => {
        onPress(star);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Ionicons
                name={isSelected ? 'star' : 'star-outline'}
                size={size}
                color="#77ffaa"
            />
        </TouchableOpacity>
    );
};

const ExerciseRateItem = ({ exercise, onRate }: { exercise: ExerciseInWorkoutAPI, onRate: (exerciseId: number, rate: number) => void }) => {
    const [rating, setRating] = useState(0);

    const handleRate = (rate: number) => {
        setRating(rate);
        onRate(exercise.id, rate);
    };

    return (
        <View key={exercise.id} className="flex-row items-center justify-between">
            <Text className="text-sm text-white font-ralewayLight">
                {exercise.exercise.name}
            </Text>
            <View className="flex-row items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarElement
                        key={star}
                        star={star}
                        isSelected={star <= rating}
                        onPress={handleRate}
                    />
                ))}
            </View>
        </View>
    );
};

const EquipmentRateItem = ({ equipment, onRate }: { equipment: EquipmentApi, onRate: (equipmentId: number, rate: number) => void }) => {
    const [rating, setRating] = useState(0);

    const handleRate = (rate: number) => {
        setRating(rate);
        onRate(equipment.id, rate);
    };

    return (
        <View key={equipment.id} className="flex flex-row items-center justify-between w-full">
            <Text className="text-sm text-white font-ralewayLight overflow-x-clip">
                {equipment.name}
            </Text>
            <View className="flex-row items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarElement
                        key={star}
                        star={star}
                        isSelected={star <= rating}
                        onPress={handleRate}
                    />
                ))}
            </View>
        </View>
    );
};

const CompletionModal = ({ visible, onClose, onShare, onRate, routineExercises, workoutId }: CompletionModalProps) => {
    if (!visible) return null;

    const [workoutRating, setWorkoutRating] = useState(0);
    const [showRateExercises, setShowRateExercises] = useState(false);

    const fadeAnimation = useSharedValue(1);

    const fadeStyle = useAnimatedStyle(() => ({
        opacity: withTiming(fadeAnimation.value, { duration: 300 }),
    }));

    const { accessToken } = useUser();

    const [ratingExercisesObject, setRatingExercisesObject] = useState<{ exerciseId: number, rate: number }[]>([]);
    const [ratingEquipmentObject, setRatingEquipmentObject] = useState<{ equipmentId: number, rate: number }[]>([]);

    const [rateCompleted, setRateCompleted] = useState(false);
    const [thanks, setThanks] = useState(false);

    const handleExerciseRate = (exerciseId: number, rate: number) => {
        onRate(rate);
        //Verificar si el ejercicio ya existe en el array
        const existingExercise = ratingExercisesObject.find(exercise => exercise.exerciseId === exerciseId);
        if (existingExercise) {
            existingExercise.rate = rate;
        } else {
            setRatingExercisesObject([...ratingExercisesObject, { exerciseId, rate }]);
        }
    };

    const handleEquipmentRate = (equipmentId: number, rate: number) => {
        onRate(rate);
        const existingEquipment = ratingEquipmentObject.find(equipment => equipment.equipmentId === equipmentId);
        if (existingEquipment) {
            existingEquipment.rate = rate;
        } else {
            setRatingEquipmentObject([...ratingEquipmentObject, { equipmentId, rate }]);
        }
    };

    const rateMutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await rateTarget(data.type, data.id.toString(), data.rating, accessToken!);
            return response;
        },
        onSuccess: () => {
            console.log("Rate success");
        },
        onError: (error) => {
            console.log("Rate error");
            console.log(error);
        }
    });

    const handleCompleteRate = async () => {
        toggleRateExercises();
        handleFinishRate();

        try {
            console.log("workoutRating");
            console.log(workoutRating);
    
            const workoutPromise = rateMutation.mutateAsync({
                type: TargetType.WORKOUT,
                id: workoutId,
                rating: workoutRating,
                token: accessToken!
            });
    
            console.log("ratingExercisesObject");
            console.log(ratingExercisesObject);
    
            const exercisesPromises = ratingExercisesObject.map((exercise) =>
                rateMutation.mutateAsync({
                    type: TargetType.EXERCISE,
                    id: exercise.exerciseId,
                    rating: exercise.rate,
                    token: accessToken!
                })
            );
    
            console.log("ratingEquipmentObject");
            console.log(ratingEquipmentObject);
    
            const equipmentPromises = ratingEquipmentObject.map((equipment) =>
                rateMutation.mutateAsync({
                    type: TargetType.EQUIPMENT,
                    id: equipment.equipmentId,
                    rating: equipment.rate,
                    token: accessToken!
                })
            );
    
            await Promise.all([workoutPromise, ...exercisesPromises, ...equipmentPromises]);
    
        } catch (error) {
            console.error("Error al completar la valoración:", error);
        }

    };

    const handleFinishRate = () => {
        setRateCompleted(true);
        setThanks(true);
        setTimeout(() => {
            setThanks(false);
        }, 3000);
    };

    const toggleRateExercises = () => {
        fadeAnimation.value = 0;
        setTimeout(() => {
            setShowRateExercises(!showRateExercises);
            fadeAnimation.value = 1;
        }, 300);
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-eBlue-500 rounded-lg p-4 w-11/12">
                    <Text className="text-2xl font-ralewayBold text-center text-white my-2">
                        ¡Rutina Completada!
                    </Text>
                    <Animated.View style={fadeStyle}>

                        {
                            !rateCompleted && (
                                <View className="flex flex-col justify-center items-center">
                            {!showRateExercises ? (
                                <>
                                    <Text className="text-sm text-center font-ralewayLight text-white my-1">
                                        Tu experiencia es importante para nosotros.
                                    </Text>
                                    <Text className="text-sm text-center font-ralewayLight text-white my-1">
                                        ¿Te gustaría calificar los ejercicios y los implementos de la rutina?
                                    </Text>
                                    <View className="flex-row items-center justify-between w-full my-2">
                                        <TouchableOpacity
                                            className="px-3 py-2 bg-eBlue-800 rounded-full flex flex-row items-center"
                                            onPress={toggleRateExercises}
                                        >
                                            <Ionicons name="star-outline" size={24} color="#fff" />
                                            <Text className="text-sm text-white">Calificar</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            className="px-3 py-2 bg-eBlue-800 rounded-full flex flex-row items-center"
                                            onPress={handleFinishRate}
                                        >
                                            <Ionicons name="close-circle-outline" size={24} color="#fff" />
                                            <Text className="text-sm text-white">No, gracias</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            ) : (
                                <ScrollView className="flex-col my-2">
                                    <View className="w-full flex-row items-center justify-between">
                                        <TouchableOpacity
                                            className="px-3 py-2 bg-eBlue-800 rounded-full flex flex-row items-center"
                                            onPress={handleCompleteRate}
                                        >
                                            <Ionicons name="checkbox-outline" size={24} color="#fff" />
                                            <Text className="text-sm text-white">Completar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className="px-3 py-2 bg-eBlue-800 rounded-full flex flex-row items-center"
                                            onPress={toggleRateExercises}
                                        >
                                            <Ionicons name="close-circle" size={24} color="#fff" />
                                            <Text className="text-sm text-white">Cerrar</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text className="text-sm text-center font-ralewayLight text-white">
                                        Califica la rutina:
                                    </Text>
                                    <View className="flex-row items-center justify-center gap-2 my-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarElement
                                                key={star}
                                                star={star}
                                                isSelected={star <= workoutRating}
                                                onPress={() => setWorkoutRating(star)}
                                                size={32}
                                            />
                                        ))}
                                    </View>
                                    <View className="flex-col justify-center w-full">
                                        {routineExercises.map((exercise) => (
                                            <>
                                                <ExerciseRateItem
                                                    key={exercise.id}
                                                    exercise={exercise}
                                                    onRate={handleExerciseRate}
                                                />
                                                <View className="pl-4 flex-col items-center justify-around">
                                                    {exercise.exercise.equipment.map((equipment) => (
                                                        <EquipmentRateItem
                                                            key={equipment.id}
                                                            equipment={equipment}
                                                            onRate={handleEquipmentRate}
                                                        />
                                                    ))}
                                                </View>
                                            </>
                                        ))}
                                    </View>
                                </ScrollView>
                            )}
                        </View>
                            )
                        }

                        {
                            thanks && (
                                <View className="flex flex-col justify-center items-center">
                                    <Text className="text-2xl font-ralewayBold text-center text-white my-2">
                                        ¡Gracias por tu calificación!
                                    </Text>
                                </View>
                            )
                        }

                        <View className='flex flex-col'>

                            <Text className='text-sm text-center font-ralewayLight text-white my-1'>
                                ¿Te gustaría compartir tu logro?
                            </Text>

                            <View className='flex-row items-center justify-around my-2'>
                                <TouchableOpacity className='px-3 py-2 
        bg-eBlue-800 rounded-full
        flex flex-row items-center' onPress={onShare}>
                                    <Ionicons name="share-social-outline" size={24} color="#fff" />
                                    <Text className='text-sm text-white'>Compartir</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='px-3 py-2 
        bg-eBlue-800 rounded-full
        flex flex-row items-center'  onPress={onClose}>
                                    <Ionicons name="close-outline" size={24} color="#fff" />
                                    <Text className='text-sm text-white'>Cerrar</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Animated.View>
                </View>
            </View>
        </Modal>
    );
};

export default CompletionModal;
