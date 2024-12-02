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
        lastWorkoutPlayed,
        resetWorkout,
    } = usePlayWorkoutContext();
   
    const [showPostModal, setShowPostModal] = useState(false);
    const [showEditExerciseModal, setShowEditExerciseModal] = useState({
        visible:false,
        exercise: null
    });

    useEffect(() => {
        if (isCompleted) {
            setIsCompleted(false);
            restoreWorkout();
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

    const isLastWorkoutPlayed = lastWorkoutPlayed === workout?.id;
    const [hasbeenModified, setHasbeenModified] = useState(false);

    const updateExercise = (exercise: ExerciseInWorkoutAPI) => {
        setHasbeenModified(true);
        setExercises(prev => prev.map(ex => ex.id === exercise.id ? exercise : ex));
        setShowEditExerciseModal({ visible: true, exercise: exercise as any });
    }

    const restoreWorkout = () => {
        if(workout){
            setExercises(workout.exercisesInWorkout.map(exercise => ({ ...exercise })));     
            setHasbeenModified(false);
        }
    }
    
    const renderItem = ({ item, drag, isActive }: RenderItemParams<ExerciseInWorkoutAPI>) => {
        return <PlayRoutineExerciseItem
            exercise={item}
            onDrag={drag}
            isActive={isActive}
            handleEditExercise={() => setShowEditExerciseModal({ visible: true, exercise: item as any})}
            blocked={isLastWorkoutPlayed}
        />
    }

    const handlePlayWorkout = () => {
        if(isLastWorkoutPlayed){
            resetWorkout()
        }
        setPlayExercises([...exercises])
        startWorkout()
        router.push('/(animated)/playexercise')
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
                    handlePlayWorkout={handlePlayWorkout}
                    hasbeenModified={hasbeenModified}
                    restoreWorkout={restoreWorkout}
                />}
                data={exercises}
                ItemSeparatorComponent={() => <View className="h-2 " />}
                onDragEnd={({ data }) =>{ 
                    setHasbeenModified(true);
                    setExercises([...data])}}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                scrollEnabled={true}
                containerStyle={{ flexGrow: 1 }}
            />
            

            <CreatePostModal
                isVisible={showPostModal}
                onClose={() => setShowPostModal(false)}
                post={{
                    rutina: workout?.name ?? "",
                    dificultad: workout?.level ?? "",
                    fecha: new Date().toISOString(),
                }}
            />

            <EditExerciseModal
                visible={showEditExerciseModal.visible}
                exercise={showEditExerciseModal.exercise}
                onClose={() => setShowEditExerciseModal({ visible: false, exercise: null })}
                updateExercise={updateExercise}
                blocked={isLastWorkoutPlayed}
            />

        </View>
    );
};

export default PlayWorkout;
