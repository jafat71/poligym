import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton"
import { useNavigationFlowContext } from "@/context/NavFlowContext"
import { useTheme } from "@/context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { Text, View, Pressable, Animated, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import IconButton from "@/components/ui/common/buttons/IconButton"

const PlayExercise = () => {
    const { screenPlayExercises } = useNavigationFlowContext()
    const { isDark } = useTheme()
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} font-raleway`

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const [timeLeft, setTimeLeft] = useState(15)
    const [isPlaying, setIsPlaying] = useState(true)
    const [progress] = useState(new Animated.Value(0))

    const totalDuration = 15
    const currentExercise = screenPlayExercises![currentExerciseIndex]
    const nextExercise = screenPlayExercises![currentExerciseIndex + 1]
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [isPlaying, timeLeft])

    useEffect(() => {
        if (timeLeft === 0) {
            handleNext()
        }
    }, [timeLeft])

    const handleNext = () => {
        if (currentExerciseIndex < screenPlayExercises!.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1)
            setTimeLeft(totalDuration) // Reiniciar el tiempo
        } else {
            // Rutina completada
            router.back()
        }
    }

    const handleComplete = () => {
        handleNext()
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    // Calcular ancho de la barra de progreso
    const progressWidth = `${((totalDuration - timeLeft) / totalDuration) * 100}%`

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkGray-600' : 'bg-white'}`}>
            <GoBackUpButton />

            <View className="absolute top-0 right-0
                px-6 z-10 rounded-full translate-y-96 -translate-y-4 ">
                <Text className={`text-4xl font-ralewayExtraBold`}>
                    {currentExerciseIndex + 1} /{screenPlayExercises!.length}
                </Text>
            </View>

            <Image
                source={{ uri: "https://media1.tenor.com/m/Re3T3B66V9UAAAAd/barbellsquats-gymexercisesmen.gif" }}
                className='w-full h-96 rounded-md' />

            <View className={`flex-1 flex flex-col justify-between
                    px-4 py-2 rounded-t-2xl my-2
                    ${isDark ? 'bg-darkGray-600' : 'bg-gray-100'}
                `}>
                <Text
                    numberOfLines={1}
                    className={`${textStyle} text-4xl font-ralewayExtraBold mb-4`}>
                    {currentExercise?.exercise?.name ?? "EJERCICIO "}
                </Text>

                <View className="flex flex-row justify-between items-center mb-6 w-full ">

                    <View className="w-1/3 flex flex-col items-start">
                        <View className="flex flex-row items-center justify-center">
                            <Ionicons
                                name="repeat-outline"
                                size={24}
                                color={isDark ? '#fff' : '#374151'}
                            />
                            <Text className={`${textStyle} text-xl font-ralewayExtraBold`}>
                                1/{currentExercise?.sets}
                            </Text>
                        </View>
                        <View className="flex flex-row items-center justify-center">
                            <Ionicons
                                name="repeat-outline"
                                size={24}
                                color={isDark ? '#fff' : '#374151'}
                            />
                            <Text className={`${textStyle} text-xl font-ralewayExtraBold`}>
                                {currentExercise?.reps} reps
                            </Text>
                        </View>

                    </View>

                    <View className="w-1/3 items-center">
                        <IconButton
                            onPress={togglePlay}
                            icon={<Ionicons name={isPlaying ? "pause" : "play"} size={86} color={isDark ? '#fff' : '#374151'} />}
                        />
                    </View>
                    <View className="w-1/3 items-end">
                        <IconButton
                            onPress={handleComplete}
                            icon={<Ionicons name="checkmark-circle-outline" size={32} color={isDark ? '#fff' : '#374151'} />}
                        />
                    </View>
                </View>

                <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <Animated.View
                        className="h-full bg-eBlue-500"
                        style={{
                            width: progressWidth as any, // Explicit type cast to avoid errors
                        }}
                    />
                </View>

                <View className="flex flex-row items-center justify-center mt-2">
                    <Ionicons
                        name="timer-outline"
                        size={24}
                        color={isDark ? '#fff' : '#374151'}
                    />
                    <Text className={`${textStyle} text-xl font-ralewayExtraBold`}>
                        {timeLeft}s
                    </Text>
                </View>

                <View className={`
                        my-2
                        ${isDark ? 'bg-darkGray-600' : 'bg-gray-100'}
                    `}>
                    <Text
                        numberOfLines={1}
                        className={`${textStyle} items-start text-lg mb-2`}>
                        {nextExercise ? (
                            `Siguiente: ${nextExercise.exercise?.name ?? "EJERCICIO "}`
                        ) : (
                            "Estas cerca de completar la rutina :)"
                        )}

                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}


export default PlayExercise