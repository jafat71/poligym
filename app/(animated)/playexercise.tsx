import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton"
import IconButton from "@/components/ui/common/buttons/IconButton"
import { Ionicons } from "@expo/vector-icons"
import { Animated, Image, Pressable, SafeAreaView, StatusBar, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { usePlayWorkoutContext } from "@/context/PlayWorkoutContext"
import { LinearGradient } from "expo-linear-gradient"
import { useKeepAwake } from "expo-keep-awake"
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
        <View className={`flex-1`}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[
                    'rgba(15,23,42,1)',
                    'rgba(15,23,42,1)',
                    'rgba(255,87,34,1)', //orange
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute w-full backdrop-blur-2xl bg-white/10 h-full"
            />
            <GoBackUpButton />

            <View className={`px-0 pt-7 pb-4 rounded-sm`}>
                <Image
                    source={{ uri: isResting ? 
                        "https://media.tenor.com/4RvzriUK-wUAAAAM/hot-summer.gif"
                        :"https://media1.tenor.com/m/Re3T3B66V9UAAAAd/barbellsquats-gymexercisesmen.gif" }}
                    className={`w-full h-80 rounded-xl border-[4px] border-lightGreen`}
                    resizeMode="cover"
                />
            </View>


            <View className={`flex-1 flex flex-col justify-between px-4 py-2 rounded-t-2xl backdrop-blur-2xl bg-eOrange-500/10
                border-[1px] border-eOrange-500 `}>
                <View className="flex flex-row items-center justify-center w-full">
                    <Text numberOfLines={1} className={`text-white text-4xl w-full text-center font-ralewayExtraBold mb-4`}>
                        {
                            isResting
                                ?
                                `Descanso: ${currentExercise?.exercise?.name ?? "EJERCICIO"}`
                                :
                                currentExercise?.exercise?.name ?? "EJERCICIO"
                        }
                    </Text>
                </View>
                <View className="w-full mb-4">
                    <View className={`flex flex-row items-center justify-between`}>

                    <View className="flex flex-col items-center justify-center w-1/3 border-[1px] border-white rounded-xl p-2 backdrop-blur-lg bg-eOrange-500/50">
                            <Ionicons name="repeat-sharp" size={30} color={'#fff'} />
                            <Text className={`text-3xl text-white`}>
                                {currentSet}/{currentExercise?.sets}
                            </Text>
                        </View>

                        <View className="flex flex-col items-center justify-center w-1/3 border-[1px] border-white rounded-xl p-2  backdrop-blur-lg bg-eOrange-500/50">
                            <Ionicons name="body-outline" size={30} color={'#fff'} />
                            <Text className={`text-3xl text-white`}>
                                x{currentExercise?.reps}
                            </Text>
                        </View>

                        <View className="flex flex-col items-center justify-center w-1/3 border-[1px] border-white rounded-xl p-2 backdrop-blur-lg bg-eOrange-500/50">
                            <Ionicons name="barbell-outline" size={30} color={'#fff'} />
                            <Text className={`text-3xl text-white`}>
                                {currentExercise?.weight ?? "0"}kg
                            </Text>
                        </View>

                    </View>
                </View>

                <View className="flex flex-row items-center justify-center">
                    <Ionicons name="timer-outline" size={34} color={'#fff'} />
                    <Text className={`text-6xl text-white`}>
                        {timeLeft}s
                    </Text>
                </View>


                <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    {/* animación de sonar al completar el ejercicio */}
                    <Animated.View
                        className={`h-full ${isResting ? 'bg-yellow-400' : 'bg-lightGreen'}`}
                        style={{
                            width: progressWidth as any,
                        }}
                    />
                </View>

                <View className="items-center justify-between rounded-sm flex flex-row">

                    <IconButton
                        onPress={goBackPreviousExercise}
                        icon={<Ionicons name={"play-back"} size={56} color={'#fff'} />}
                    />
                    <IconButton
                        onPress={togglePlay}
                        icon={<Ionicons name={isPlaying ? "pause" : "play"} size={86} color={'#fff'} />}
                    />

                    <IconButton
                        onPress={() => { }}
                        icon={<Ionicons name={"heart-circle"} size={56} color={'#fff'} />}
                    />
                </View>

                <TouchableHighlight
                    onPress={handleNextExercise}
                    className={`w-full flex flex-row justify-center
                        p-2 rounded-md bg-darkGray-500`}>
                    <Text className={`text-center items-center
                        text-white text-2xl font-ralewaySe`}>
                        Completar
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default PlayExercise
