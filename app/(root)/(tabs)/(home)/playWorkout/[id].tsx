import { ExerciseInWorkoutAPI, WorkoutAPI } from "@/types/interfaces/entities/plan";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { Alert, Text, View } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { fetchWorkoutById } from "@/lib/api/actions";
import { useUser } from "@/context/UserContext";
import { PlayWorkoutFlatlistHeader } from "@/components/ui/common/flatlists/PlayWorkoutFlastlistHeader";
import PlayRoutineExerciseItem from "@/components/ui/exercises/PlayRoutineExerciseItem";
import CreatePostModal from "@/components/ui/common/modal/CreatePostModal";
import { useTheme } from "@/context/ThemeContext";
import { usePlayWorkoutContext } from "@/context/PlayWorkoutContext";
import EditExerciseModal from "@/components/ui/common/modal/EditExerciseModal";
import ExerciseInWorkoutSkeleton from "@/components/animatedUi/ExerciseInWorkoutSkeleton";
import CompletionModal from "@/components/ui/common/modal/CompletionModal";
import { insertWorkoutProgress, updateUserPlanProgress } from "@/database/sqlite";
import { PlanProgressDetails, WorkoutProgress } from "@/types/interfaces/entities/progress";
import { getLocaleDateTime } from "@/lib/utils/getLocaleTime";

const PlayWorkout = () => {
    const { id, planId, planName, weekIndex } = useLocalSearchParams();
    if(!id) return null;
    const { accessToken } = useUser();
    const queryClient = useQueryClient();
    const workoutId = Number(id);
    if(!workoutId) return null;
    const cachedWorkout = queryClient.getQueryData<WorkoutAPI>(['workouts', workoutId]);

    const { isDark } = useTheme();
    const [infoSetted, setInfoSetted] = useState(false);

    const { data: workout, isLoading, isError } = useQuery<WorkoutAPI>({
        queryKey: ['workouts', id],
        queryFn: async () => fetchWorkoutById(accessToken!, id as string),
        initialData: cachedWorkout,
        enabled: !!id,
    });


    const { loggedUserInfo } = useUser();
    const [exercises, setExercises] = useState<ExerciseInWorkoutAPI[]>([]);
    useEffect(() => {
        if (workout) {
            setExercises(workout.exercisesInWorkout.map(exercise => ({ ...exercise })));
            setInfoSetted(true);
        }
    }, [workout]);

    const {
        setPlayExercises,
        startWorkout,
        isCompleted,
        setIsCompleted,
        lastWorkoutPlayed,
        resetWorkout,
        workoutTotalDuration
    } = usePlayWorkoutContext();


    const [showPostModal, setShowPostModal] = useState(false);
    const [showEditExerciseModal, setShowEditExerciseModal] = useState({
        visible: false,
        exercise: null
    });

    const handleShare = () => {
        setShowPostModal(true);
    };

    const handleRate = (rating: number) => {
        console.log(`Rated: ${rating}`);
    };

    const [showCompletionModal, setShowCompletionModal] = useState(false);

    const { mutate: saveWorkoutProgressMutation } = useMutation({
        mutationFn: async (planProgressDetails: PlanProgressDetails) => {
            console.log("Saving workout progress", planProgressDetails)
            await updateUserPlanProgress(planProgressDetails);
        },
        onSuccess: () => {
            console.log("Workout progress saved");
        },
        onError: (error) => {
            console.log("Error saving workout progress", error);
        }   
    })

    useEffect(() => {
        if (isCompleted) {
            setIsCompleted(false);
            restoreWorkout();
            saveWorkoutProgress();
            if(!!planId && !!weekIndex && !!workoutId) {
                saveWorkoutProgressMutation({
                    planProgressId: Number(planId),
                    week: Number(weekIndex),
                    workoutId: workoutId.toString(),
                    completed: true
                })
                
            }
            setShowCompletionModal(true);
        }
    }, [isCompleted]);

    const saveWorkoutProgress = async () => {
        const date = new Date();
        const [formattedDate, formattedTime] = getLocaleDateTime(date);
        const body = {
            userId: loggedUserInfo?.id!,
            workoutId: workoutId.toString(),
            workoutName: workout?.name ?? "",
            workoutDuration: workoutTotalDuration,
            workoutDay: formattedDate,
            workoutHour: formattedTime,
            workoutWorkedMuscles: exercises.map(exercise => exercise.exercise.muscleGroups).flat()
        }
        
        await insertWorkoutProgress(body as WorkoutProgress);
    }

    let isLastWorkoutPlayed = lastWorkoutPlayed === workout?.id;
    const [hasbeenModified, setHasbeenModified] = useState(false);

    const updateExercise = (exercise: ExerciseInWorkoutAPI) => {
        setHasbeenModified(true);
        setExercises(prev => prev.map(ex => ex.id === exercise.id ? exercise : ex));
        setShowEditExerciseModal({ visible: true, exercise: exercise as any });
    }

    const restoreWorkout = () => {
        if (workout) {
            setExercises(workout.exercisesInWorkout.map(exercise => ({ ...exercise })));
            setHasbeenModified(false);
        }
    }

    const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<ExerciseInWorkoutAPI>) => {
        return <PlayRoutineExerciseItem
            exercise={item}
            onDrag={drag}
            isActive={isActive}
            handleEditExercise={() => {
                setShowEditExerciseModal({ visible: true, exercise: item as any })
            }}
            blocked={isLastWorkoutPlayed}
        />
    }, [exercises, isLastWorkoutPlayed])

    const handlePlayWorkout = () => {
        if (exercises.length === 0) return;
        if (isLastWorkoutPlayed) {
            resetWorkout()
        }
        setPlayExercises([...exercises])
        startWorkout()
        router.push('/(animated)/playexercise')
    }

    if (isError) return <Text>Error al cargar detalles de la rutina - {id}</Text>;

    return (
        <View className={`flex-1 
        ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}>
            <DraggableFlatList
                ListHeaderComponent={() => <PlayWorkoutFlatlistHeader
                    workout={workout!}
                    totalExercises={exercises.length}
                    handlePlayWorkout={handlePlayWorkout}
                    hasbeenModified={hasbeenModified}
                    restoreWorkout={restoreWorkout}
                    isLoading={isLoading}
                    planName={planName as string}
                    weekIndex={Number(weekIndex)}
                />}
                data={exercises}
                ItemSeparatorComponent={() => <View className="h-2" />}
                onDragEnd={({ data }) => {
                    //Verify if order has changed
                    if (data.every((exercise, index) => exercise.order === exercises[index].order)) return; 
                    setHasbeenModified(true);
                    setExercises([...data])
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                scrollEnabled={true}
                containerStyle={{ flexGrow: 1 }}
            />
            {
                (isLoading || !infoSetted) && (
                    <>
                        <ExerciseInWorkoutSkeleton />
                        <ExerciseInWorkoutSkeleton />
                        <ExerciseInWorkoutSkeleton />
                    </>
                )
            }

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
            />

            <CompletionModal
                visible={showCompletionModal}
                onClose={() => {
                    setShowCompletionModal(false)
                    if(!!planId && !!weekIndex && !!workoutId) {
                        Alert.alert("Guardando progreso de la rutina ...")
                        router.navigate({
                            pathname:`/(home)/playPlan/${planId}` as never,
                            params: {
                                workoutCompleted: workoutId.toString(),
                            },
                        })
                    }
                }}
                onShare={handleShare}
                onRate={handleRate}
                routineExercises={exercises}
                workoutId={workoutId}
            />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

        </View>
    );
};

export default PlayWorkout;                                            
                                            