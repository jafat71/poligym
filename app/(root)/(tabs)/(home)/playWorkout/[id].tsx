import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton";
import { ExerciseAPI, ExerciseInWorkoutAPI, WorkoutAPI } from "@/types/interfaces/entities/plan";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { Alert, Animated, Pressable, Share, Text, View } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { fetchExerciseById, fetchWorkoutById } from "@/lib/api/actions";
import { useUser } from "@/context/UserContext";
import PlaySkeletonLoadingScreen from "@/components/animatedUi/PlaySkeletonLoadingScreen";
import { PlayWorkoutFlatlistHeader } from "@/components/ui/common/flatlists/PlayWorkoutFlastlistHeader";
import PlayRoutineExerciseItem from "@/components/ui/exercises/PlayRoutineExerciseItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import CreatePostModal from "@/components/ui/common/modal/CreatePostModal";
import { useNavigationFlowContext } from "@/context/NavFlowContext";

const PlayWorkout = () => {
    const { id } = useLocalSearchParams();
    const { accessToken } = useUser();
    const { setScreenPlayExercises} = useNavigationFlowContext()
    const queryClient = useQueryClient();
    const workoutId = Number(id);
    const cachedWorkout = queryClient.getQueryData<WorkoutAPI>(['workouts', workoutId]);

    const [infoSetted, setInfoSetted] = useState(false);

    const { data: workout, isLoading, isError } = useQuery<WorkoutAPI>({
        queryKey: ['workouts', id],
        queryFn: async () => fetchWorkoutById(accessToken!, id as string),
        initialData: cachedWorkout,
        enabled: !!id,
    });

    const [exercises, setExercises] = useState<ExerciseInWorkoutAPI[]>([]);
    const [completedExercises, setCompletedExercises] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (workout) {
            setExercises(workout.exercisesInWorkout);
            setTimeout(() => {
                setInfoSetted(true);
            }, 1000);
        }
    }, [workout]);

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

    const [showPostModal, setShowPostModal] = useState(false);
    const [workoutDuration, setWorkoutDuration] = useState(0);
    const startTime = useRef(Date.now());

    useEffect(() => {
        if (routineProgress === 1) {
            Alert.alert(
                "¡Felicitaciones! 🎉",
                "Has completado la rutina exitosamente. ¿Deseas compartir tu logro?",
                [
                    {
                        text: "No, gracias",
                        style: "cancel"
                    },
                    {
                        text: "¡Compartir!",
                        onPress: () => setShowPostModal(true)
                    }
                ]
            );
        }
    }, [routineProgress]);

    const getWorkoutDuration = () => {
        return Math.floor((Date.now() - startTime.current) / 1000);
    }
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minutos`;
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

    if (isLoading || !infoSetted) return <PlaySkeletonLoadingScreen />;
    if (isError) return <Text>Error al cargar detalles de la rutina - {id}</Text>;

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
            <Pressable 
            onPress={()=>{
                setScreenPlayExercises([...workout?.exercisesInWorkout ?? []])
                router.push('/(home)/playexercise')
            }}
            className="absolute bottom-0 right-0 w-24 h-24 flex flex-col
                items-center justify-center bg-darkGray-900
                rounded-full mx-2 my-2
            ">
                <Ionicons name="play" size={32} color="#77ff99" />
            </Pressable>

            <CreatePostModal
                isVisible={showPostModal}
                onClose={() => setShowPostModal(false)}
                defaultMessage={`¡He completado la rutina "${workout?.name}" en ${formatDuration(workoutDuration)}! 💪`}
                post={{
                    rutina: workout?.name ?? "",
                    dificultad: workout?.level ?? "",
                    fecha: new Date().toISOString(),
                    duracion: getWorkoutDuration().toString()
                }}
            />
        </SafeAreaView>
    );
};

export default PlayWorkout;
