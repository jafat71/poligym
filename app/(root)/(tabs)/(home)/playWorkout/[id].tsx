import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton";
import ExerciseCard from "@/components/ui/exercises/PlayRoutineExerciseItem";
import { useTheme } from "@/context/ThemeContext";
import { ExerciseAPI, ExerciseInWorkoutAPI, WorkoutAPI } from "@/types/interfaces/entities/plan";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useMemo } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { fetchExerciseById, fetchWorkoutById } from "@/lib/api/actions";
import { useUser } from "@/context/UserContext";
import PlaySkeletonLoadingScreen from "@/components/animatedUi/PlaySkeletonLoadingScreen";
import { PlayWorkoutFlatlistHeader } from "@/components/ui/common/flatlists/PlayWorkoutFlastlistHeader";
import PlayRoutineExerciseItem from "@/components/ui/exercises/PlayRoutineExerciseItem";
import CTAButtonPrimary from "@/components/ui/common/buttons/CtaButtonPrimary";
import Ionicons from "@expo/vector-icons/Ionicons";

const PlayWorkout = () => {
    const { id } = useLocalSearchParams();
    const { accessToken } = useUser();

    const queryClient = useQueryClient();
    const workoutId = Number(id);
    const cachedWorkout = queryClient.getQueryData<WorkoutAPI>(['workouts', workoutId]);

    const { data: workout, isLoading, isError } = useQuery<WorkoutAPI>({
        queryKey: ['workouts', id],
        queryFn: async () => fetchWorkoutById(accessToken!, id as string),
        initialData: cachedWorkout,
        enabled: !!id,
    });

    const { data: queryExercises = [], isLoading: isLoadingExercises, isError: isErrorExercises } = useQuery<ExerciseAPI[]>({
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
        initialData: workout?.exercisesInWorkout.map(ex => queryClient.getQueryData<ExerciseAPI>(['exercises', ex.exerciseId])).filter(Boolean) as ExerciseAPI[],
    });

    const [exercises, setExercises] = useState<ExerciseInWorkoutAPI[]>([]);
    const [completedExercises, setCompletedExercises] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (workout) {
            setExercises(workout.exercisesInWorkout);
        }
    }, [workout]);

    console.log(exercises);
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

    const renderItem = ({ item, drag, isActive }: RenderItemParams<ExerciseInWorkoutAPI>) => (
        <PlayRoutineExerciseItem
            exercise={item}
            onDrag={drag}
            isActive={isActive}
            isCompleted={completedExercises[item.id]}
            onComplete={(completed) => handleExerciseComplete(item.id.toString(), completed)}
        />
    );

    if (isLoading) return <PlaySkeletonLoadingScreen />;
    if (isError) return <Text>Error al cargar detalles de la rutina - {id}</Text>;
    if (isErrorExercises) return <Text>Error al cargar los ejercicios de la rutina - {id}</Text>;

    return (
        <SafeAreaView className={`flex-1 bg-eBlue-500`}>
            <GoBackUpButton />
            <DraggableFlatList
                ListHeaderComponent={<PlayWorkoutFlatlistHeader
                    workout={workout!}
                    progress={routineProgress}
                    completedExercises={Object.values(completedExercises).filter(Boolean).length}
                    totalExercises={exercises.length}
                />}
                ListFooterComponent={<View className="h-24 bg-eBlue-500" />}
                data={exercises}
                ItemSeparatorComponent={() => <View className="h-2 bg-eBlue-500" />}
                onDragEnd={({ data }) => setExercises([...data])}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                scrollEnabled={true}
                containerStyle={{ flexGrow: 1 }}
            />
            <Pressable className="absolute bottom-0 right-0 w-24 h-24 flex flex-col
                items-center justify-center bg-lightGreen
                rounded-full mx-2 my-2
            ">
                <Ionicons name="play" size={32} color="#0055f9" />
            </Pressable>
        </SafeAreaView>
    );
};

export default PlayWorkout;
