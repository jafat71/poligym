import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton";
import ExerciseCard from "@/components/ui/exercises/RoutineExerciseCard";
import HeaderRoutineComponent from "@/components/ui/routines/HeaderRoutineComponent";
import { useNavigationFlowContext } from "@/context/NavFlowContext";
import { useTheme } from "@/context/ThemeContext";
import { IndividualExercise } from "@/types/interfaces/entities/plan";
import { router } from "expo-router";
import { useState, useEffect, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';

const RoutineDetail = () => {
    const { screenRoutine, setScreenPlayExercises } = useNavigationFlowContext();
    const [exercises, setExercises] = useState<IndividualExercise[]>([]);
    const [completedExercises, setCompletedExercises] = useState<{ [key: string]: boolean }>({});
    const { isDark } = useTheme();
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`;

    // Calcular el progreso de la rutina
    const routineProgress = useMemo(() => {
        if (!exercises.length) return 0;
        const completed = Object.values(completedExercises).filter(Boolean).length;
        return completed / exercises.length;
    }, [exercises, completedExercises]);

    const handleExerciseComplete = (exerciseId: string, completed: boolean) => {
        setCompletedExercises(prev => ({
            ...prev,
            [exerciseId]: completed
        }));
    };

    const renderItem = ({ item, drag, isActive }: RenderItemParams<IndividualExercise>) => (
        <ExerciseCard 
            exercise={item} 
            onDrag={drag} 
            isActive={isActive}
            isCompleted={completedExercises[item.id]}
            onComplete={(completed) => handleExerciseComplete(item.id.toString(), completed)}
        />
    );

    useEffect(() => {
        setExercises(screenRoutine?.ejercicios || []);
    }, [screenRoutine]);

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkGray-500' : 'bg-white'}`}>
            <GoBackUpButton />
            
            {/* Header con Título y Progreso */}
            <View className="px-4 mb-4">
                <Text className={`${textStyle} text-center text-xl font-ralewayExtraBold mb-4`}>
                    {screenRoutine?.nombre}
                </Text>

                {/* Barra de Progreso */}
                <View className={`rounded-xl p-4 shadow-md ${isDark ? 'bg-darkGray-600' : 'bg-gray-100'}`}>
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className={`${textStyle} text-sm font-ralewayBold`}>
                            Progreso de la Rutina
                        </Text>
                        <Text className={`${textStyle} text-sm`}>
                            {Math.round(routineProgress * 100)}%
                        </Text>
                    </View>
                    
                    <Progress.Bar
                        progress={routineProgress}
                        width={null}
                        height={8}
                        color={isDark ? '#fff' : '#1c1c1c'}
                        unfilledColor={isDark ? '#374151' : '#E5E7EB'}
                        borderWidth={0}
                        borderRadius={4}
                        animated={true}
                    />

                    {/* Contador de Ejercicios */}
                    <View className="flex-row items-center justify-center mt-2">
                        <Ionicons 
                            name="fitness-outline" 
                            size={16} 
                            color={isDark ? '#fff' : '#374151'} 
                        />
                        <Text className={`${textStyle} ml-2`}>
                            {Object.values(completedExercises).filter(Boolean).length} de {exercises.length} ejercicios completados
                        </Text>
                    </View>
                </View>
            </View>
            
            <View className="flex-1">
                <DraggableFlatList
                    ListHeaderComponent={<HeaderRoutineComponent screenRoutine={screenRoutine!} />}
                    data={exercises}
                    onDragEnd={({ data }) => setExercises([...data])}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    scrollEnabled={true}
                    containerStyle={{ flexGrow: 1 }}
                />
            </View>

            {/* Botón de Empezar */}
            <Pressable 
                onPress={() => {
                    setScreenPlayExercises(exercises)
                    router.push("/(tabs)/(home)/playexercise")
                }}
                className={`
                    mx-4 mb-4 p-4 rounded-xl
                    ${routineProgress === 1 ? 'bg-green-500' : 'bg-eBlue-500'}
                    flex-row items-center justify-center
                `}
            >
                <Ionicons 
                    name={routineProgress === 1 ? "checkmark-circle-outline" : "play"} 
                    size={24} 
                    color="white" 
                />
                <Text className="text-white text-center font-ralewayBold text-lg ml-2">
                    {routineProgress === 1 ? 'Rutina Completada' : 'Empezar'}
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default RoutineDetail;