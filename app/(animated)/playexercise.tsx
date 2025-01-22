import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton"
import IconButton from "@/components/ui/common/buttons/IconButton"
import { Ionicons } from "@expo/vector-icons"
import { Animated, Image, Pressable, SafeAreaView, StatusBar, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { usePlayWorkoutContext } from "@/context/PlayWorkoutContext"
import { LinearGradient } from "expo-linear-gradient"
import { useKeepAwake } from "expo-keep-awake"
import { EquipmentApi } from "@/types/interfaces/entities/plan"
import { MuscleGroups } from "@/types/types/muscles"
const PlayExercise = () => {
    useKeepAwake();
    const {
        playExercises,
        currentExerciseIndex,
        currentSet,
        isPlaying,
        isResting,
        handleNextExercise,
        togglePlay,
        REST_TIME,
        EXERCISE_TIME,
        timeLeft,
        goBackPreviousExercise
    } = usePlayWorkoutContext();

    const currentExercise = playExercises[currentExerciseIndex];
    const progressWidth = `${((isResting ? REST_TIME : EXERCISE_TIME) - timeLeft) / (isResting ? REST_TIME : EXERCISE_TIME) * 100}%`

    return (
        <View className={`flex-1 bg-eBlue-600`}>
            <StatusBar barStyle="light-content" backgroundColor="#0055f9" />
            <GoBackUpButton />
            <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />
            <View className={`px-5 pt-7 pb-4 rounded-sm`}>
                <Image
                    source={{
                        uri: isResting ?
                            "https://media.tenor.com/4RvzriUK-wUAAAAM/hot-summer.gif"
                            : currentExercise?.exercise?.mediaUrl ?? "https://media1.tenor.com/m/Re3T3B66V9UAAAAd/barbellsquats-gymexercisesmen.gif"
                    }}
                    className={`w-full h-80 rounded-xl border-[4px] border-lightGreen`}
                    resizeMode="cover"
                />
            </View>


            <View className={`flex-1 flex flex-col justify-between px-4 py-2 rounded-t-2xl `}>
                <View className="flex flex-col items-center justify-center w-full  mb-2">
                    <Text numberOfLines={1} className={`text-white text-4xl w-full text-center font-ralewayExtraBold`}>
                        {
                            isResting
                                ?
                                `Descanso`
                                :
                                currentExercise?.exercise?.name
                        }
                    </Text>
                    <Text
                        numberOfLines={1}
                        className={`text-white text-base font-ralewayLight`}>
                        Enfoque: {currentExercise?.exercise?.muscleGroups.map((muscleGroup: MuscleGroups) =>
                            MuscleGroups[muscleGroup as unknown as keyof typeof MuscleGroups]
                        ).join(", ")}
                    </Text>
                </View>

                <View className="flex flex-col items-center justify-between">
                    <View className={`flex flex-row items-center justify-between`}>

                        <View className="flex flex-col items-center justify-center w-1/3 p-2">
                            <Ionicons name="repeat-sharp" size={30} color={'#fff'} />
                            <Text className={`text-3xl text-white`}>
                                {currentSet}/{currentExercise?.sets}
                            </Text>
                        </View>

                        <View className="flex flex-col items-center justify-center w-1/3 p-2">
                            <Ionicons name="body-outline" size={30} color={'#fff'} />
                            <Text className={`text-3xl text-white`}>
                                x{currentExercise?.reps}
                            </Text>
                        </View>

                        <View className="flex flex-col items-center justify-center w-1/3 p-2">
                            <Ionicons name="barbell-outline" size={30} color={'#fff'} />
                            <Text className={`text-3xl text-white`}>
                                {currentExercise?.weight ?? "0"}kg
                            </Text>
                        </View>

                    </View>
                    <Text
                        numberOfLines={1}
                        className={`text-white text-base font-ralewayLight`}>
                        Equipo: {
                            currentExercise?.exercise?.equipment.length > 0 ?
                                currentExercise?.exercise?.equipment.map((equipment: EquipmentApi) =>
                                    equipment.name
                                ).join(", ")
                                :
                                "Sin equipo"
                        }
                    </Text>
                </View>


                <View className="flex flex-row items-center justify-end">
                    <Text className={`text-3xl text-white`}>
                        0{timeLeft}
                    </Text>
                </View>


                <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <Animated.View
                        className={`h-full ${isResting ? 'bg-eBlue-900' : 'bg-lightGreen'}`}
                        style={{
                            width: progressWidth as any,
                        }}
                    />
                </View>

                <View className="items-center justify-between rounded-full flex flex-row">

                    <IconButton
                        onPress={goBackPreviousExercise}
                        icon={<Ionicons name={"play-back"} size={44} color={'#fff'} />}
                    />
                    <IconButton
                        onPress={togglePlay}
                        icon={<Ionicons name={isPlaying ? "pause" : "play"} size={62} color={'#fff'} />}
                    />
                    <IconButton
                        onPress={handleNextExercise}
                        icon={<Ionicons name={"checkmark-circle-outline"} size={44} color={'#fff'} />}
                    />
                </View>

            </View>
        </View>
    )
}

export default PlayExercise
