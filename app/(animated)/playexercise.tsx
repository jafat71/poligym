import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton"
import IconButton from "@/components/ui/common/buttons/IconButton"
import { useTheme } from "@/context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { Animated, Image, Pressable, SafeAreaView, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { usePlayWorkoutContext } from "@/context/PlayWorkoutContext"

const PlayExercise = () => {
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
    } = usePlayWorkoutContext();
    const { isDark } = useTheme()
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} font-raleway`


    const currentExercise = playExercises[currentExerciseIndex];
    const nextExercise = playExercises[currentExerciseIndex + 1];

    const progressWidth = `${((isResting ? REST_TIME : EXERCISE_TIME) - timeLeft) / (isResting ? REST_TIME : EXERCISE_TIME) * 100}%`

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkGray-100' : 'bg-darkGray-100'}`}>
            <GoBackUpButton />

            <View className={`p-8 ${isDark ? 'bg-darkGray-100' : 'bg-gray-300'} `}>
                <Image
                    source={{ uri: "https://media1.tenor.com/m/Re3T3B66V9UAAAAd/barbellsquats-gymexercisesmen.gif" }}
                    className={`w-full h-96 rounded-md border-
                        ${isDark ? 'border-darkGray-500' : 'border-gray-600'}`}
                />
            </View>

            <View className={`flex-1 flex flex-col justify-between px-4 py-2 rounded-t-2xl my-2 
                ${isDark ? 'bg-darkGray-600' : 'bg-darkGray-100'}`}>
                <Text numberOfLines={1} className={`${textStyle} text-4xl font-ralewayExtraBold mb-4`}>
                    {
                        isResting 
                        ?
                            `Descanso: ${currentExercise?.exercise?.name ?? "EJERCICIO"}` 
                        :
                            currentExercise?.exercise?.name ?? "EJERCICIO"
                    }
                </Text>

                <View className="w-full ">
                    <View className={`flex flex-row items-center justify-between`}>
                        <View className="flex flex-row items-center">
                            <Ionicons name="repeat-sharp" size={34} color={isDark ? '#fff' : '#374151'} />
                            <Text className={`${textStyle} ml-2 text-4xl font-raleway
                                ${isDark ? 'text-white' : 'text-darkGray-900'}
                            `}>
                                {currentSet}/{currentExercise?.sets}
                            </Text>
                        </View>

                        <Text className={`${textStyle} ml-2 text-4xl font-ralewayExtraBold
                            ${isDark ? 'text-white' : 'text-darkGray-900'}
                        `}>
                            x{currentExercise?.reps}
                        </Text>
                    </View>
                </View>

                <View className="items-center justify-between rounded-sm flex flex-row">

                    <IconButton
                        onPress={() => { }}
                        icon={<Ionicons name={"play-back"} size={56} color={isDark ? '#fff' : '#374151'} />}
                    />
                    <IconButton
                        onPress={togglePlay}
                        icon={<Ionicons name={isPlaying ? "pause" : "play"} size={86} color={isDark ? '#fff' : '#374151'} />}
                    />

                    <IconButton
                        onPress={() => { }}
                        icon={<Ionicons name={"heart-circle"} size={56} color={isDark ? '#fff' : '#374151'} />}
                    />
                </View>

                <TouchableHighlight 
                    onPress={handleNextExercise}
                    className={`w-full flex flex-row justify-center
                        p-2 rounded-sm
                        ${isDark ? 'bg-darkGray-100' : 'bg-gray-900'}`}>
                        <Text className={`text-center items-center
                            ${isDark ? 'text-darkGray-500' : 'text-white'}
                        text-2xl font-raleway`}>
                            Completar
                        </Text>
                </TouchableHighlight>

                <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <Animated.View
                        className={`h-full ${isResting ? 'bg-orange-400' : 'bg-eBlue-500'}`}
                        style={{
                            width: progressWidth as any,
                        }}
                    />
                </View>

                <View className="flex flex-row items-center justify-center mt-2">
                    <Ionicons name="timer-outline" size={24} color={isDark ? '#fff' : '#374151'} />
                    <Text className={`${textStyle} text-xl font-ralewayExtraBold`}>
                        {isResting ? 'Descanso: ' : ''}{timeLeft}s
                    </Text>
                </View>

                <View className={`my-2 ${isDark ? 'bg-darkGray-600' : 'bg-gray-100'}`}>
                    <Text numberOfLines={1} className={`${textStyle} items-start text-lg mb-2`}>
                        {isResting ?
                            `🛑✋` :
                            nextExercise ?
                                `Vamos 🔥🔥🔥 - Siguiente: ${nextExercise.exercise?.name ?? "EJERCICIO"}` :
                                "El último ejercicio de la rutina 😎👍"
                        }

                    </Text>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default PlayExercise
