import { ExerciseInWorkoutAPI, WorkoutAPI } from "@/types/interfaces/entities/plan";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { fetchWorkoutById } from "@/lib/api/actions";
import { useUser } from "@/context/UserContext";
import { PlayWorkoutFlatlistHeader } from "@/components/ui/common/flatlists/PlayWorkoutFlastlistHeader";
import PlayRoutineExerciseItem from "@/components/ui/exercises/PlayRoutineExerciseItem";
import CreatePostModal from "@/components/ui/common/modal/CreatePostModal";
import { useTheme } from "@/context/ThemeContext";
import WorkoutLoadingScreen from "@/components/animatedUi/WorkoutLoadingScreen";
import { usePlayWorkoutContext, WorkoutPlayProvider } from "@/context/PlayWorkoutContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import EditExerciseModal from "@/components/ui/common/modal/EditExerciseModal";

const PlayWorkout = () => {
    const { id } = useLocalSearchParams();
    const { accessToken } = useUser();
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

    useEffect(() => {
            if(workout){
                setExercises(workout.exercisesInWorkout.map(exercise => ({ ...exercise })));
                setTimeout(() => {
                    setInfoSetted(true);
                }, 1500);
            }
    }, [workout]);

    const { 
        setPlayExercises, 
        startWorkout, 
        isCompleted, 
        setIsCompleted,
        lastWorkoutPlayed
    } = usePlayWorkoutContext();
   
    const [showPostModal, setShowPostModal] = useState(false);
    const [showEditExerciseModal, setShowEditExerciseModal] = useState({
        visible:false,
        exercise: null
    });

    const [workoutDuration, setWorkoutDuration] = useState(0);
    const startTime = useRef(Date.now());

    useEffect(() => {
        if (isCompleted) {
            setIsCompleted(false);
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
    }, [isCompleted]);

    const getWorkoutDuration = () => {
        return Math.floor((Date.now() - startTime.current) / 1000);
    }
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minutos`;
    };

    const isLastWorkoutPlayed = lastWorkoutPlayed === workout?.id;

    const renderItem = ({ item, drag, isActive }: RenderItemParams<ExerciseInWorkoutAPI>) => {
        return <PlayRoutineExerciseItem
            exercise={item}
            onDrag={drag}
            isActive={isActive}
            handleEditExercise={() => setShowEditExerciseModal({ visible: true, exercise: item as any})}
            blocked={isLastWorkoutPlayed}
        />
    }

    if (isLoading || !infoSetted) return <WorkoutLoadingScreen />;
    if (isError) return <Text>Error al cargar detalles de la rutina - {id}</Text>;

    
    return (
        <View className={`flex-1 
        ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}>
            <DraggableFlatList
                ListHeaderComponent={()=><PlayWorkoutFlatlistHeader
                    workout={workout!}
                    totalExercises={exercises.length}
                    handlePlayWorkout={()=>{
                        setPlayExercises([...exercises])
                        startWorkout()
                        router.push('/(animated)/playexercise')
                    }}
                />}
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

            <EditExerciseModal
                visible={showEditExerciseModal.visible}
                exercise={showEditExerciseModal.exercise}
                onClose={() => setShowEditExerciseModal({ visible: false, exercise: null })}
            />
        </View>
    );
};

export default PlayWorkout;
