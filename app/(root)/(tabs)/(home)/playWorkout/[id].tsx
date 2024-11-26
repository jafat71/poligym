import { ExerciseInWorkoutAPI, WorkoutAPI } from "@/types/interfaces/entities/plan";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { Alert, Text, View } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { fetchWorkoutById } from "@/lib/api/actions";
import { useUser } from "@/context/UserContext";
import { PlayWorkoutFlatlistHeader } from "@/components/ui/common/flatlists/PlayWorkoutFlastlistHeader";
import PlayRoutineExerciseItem from "@/components/ui/exercises/PlayRoutineExerciseItem";
import CreatePostModal from "@/components/ui/common/modal/CreatePostModal";
import { useNavigationFlowContext } from "@/context/NavFlowContext";
import { useTheme } from "@/context/ThemeContext";
import WorkoutLoadingScreen from "@/components/animatedUi/WorkoutLoadingScreen";
import { usePlayWorkoutContext } from "@/context/PlayWorkoutContext";

const PlayWorkout = () => {
    const { id } = useLocalSearchParams();
    const { accessToken } = useUser();
    const { setScreenPlayExercises} = useNavigationFlowContext()
    const queryClient = useQueryClient();
    const workoutId = Number(id);
    const cachedWorkout = queryClient.getQueryData<WorkoutAPI>(['workouts', workoutId]);

    const { isDark } = useTheme();
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
            if(workout){
                setExercises(workout.exercisesInWorkout.map(exercise => ({ ...exercise })));
                setTimeout(() => {
                    setInfoSetted(true);
                }, 1500);
            }
    }, [workout]);

    const { setPlayExercises, startWorkout, isCompleted, setIsCompleted } = usePlayWorkoutContext();

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
        if (routineProgress === 1 || isCompleted) {
            if(isCompleted){
                setIsCompleted(false);
            }
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
    }, [routineProgress, isCompleted]);

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

    if (isLoading || !infoSetted) return <WorkoutLoadingScreen />;
    if (isError) return <Text>Error al cargar detalles de la rutina - {id}</Text>;

    return (
        <View className={`flex-1 
        py-2
        ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}>
            <DraggableFlatList
                ListHeaderComponent={()=><PlayWorkoutFlatlistHeader
                    workout={workout!}
                    progress={routineProgress}
                    completedExercises={Object.values(completedExercises).filter(Boolean).length}
                    totalExercises={exercises.length}
                    handlePlayWorkout={()=>{
                        //setScreenPlayExercises([...workout?.exercisesInWorkout ?? []])
                        setPlayExercises([...exercises])
                        startWorkout()
                        router.push('/(animated)/playexercise')
                    }}
                />}
                ListFooterComponent={()=><View className="h-24 " />}
                data={exercises}
                ItemSeparatorComponent={() => <View className="h-2 " />}
                onDragEnd={({ data }) => setExercises([...data])}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                scrollEnabled={true}
                containerStyle={{ flexGrow: 1 }}
            />
            

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
        </View>
    );
};

export default PlayWorkout;
