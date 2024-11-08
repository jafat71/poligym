import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton"
import { useNavigationFlowContext } from "@/context/NavFlowContext"
import { useTheme } from "@/context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { Text, View, Pressable, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { IndividualExercise } from "@/types/interfaces/entities/plan"
import { router } from "expo-router"

const PlayExercise = () => {
    const { screenPlayExercises } = useNavigationFlowContext()
    const { isDark } = useTheme()
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} font-raleway`
    
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const [timeLeft, setTimeLeft] = useState(15) // 15 segundos por ejercicio
    const [isPlaying, setIsPlaying] = useState(true)
    const [progress] = useState(new Animated.Value(0))

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

    useEffect(() => {
        // Reiniciar el tiempo y la animación cuando cambia el ejercicio
        setTimeLeft(15)
        progress.setValue(0)
        startProgressAnimation()
    }, [currentExerciseIndex])

    const startProgressAnimation = () => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 15000, // 15 segundos
            useNativeDriver: false,
        }).start()
    }

    const handleNext = () => {
        if (currentExerciseIndex < screenPlayExercises!.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1)
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

    const progressWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    })

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkGray-500' : 'bg-white'}`}>
            <GoBackUpButton />

            {/* Contenedor Principal */}
            <View className="flex-1 px-4 justify-between">
                {/* Información del Ejercicio Actual */}
                <View className={`
                    p-6 rounded-2xl mt-4
                    ${isDark ? 'bg-darkGray-600' : 'bg-gray-100'}
                `}>
                    <Text className={`${textStyle} text-2xl font-ralewayExtraBold text-center mb-4`}>
                        {currentExercise?.nombre}
                    </Text>

                    <View className="flex-row justify-around mb-6">
                        <InfoPill
                            icon="repeat-outline"
                            value={`${currentExercise?.series} series`}
                            isDark={isDark}
                        />
                        <InfoPill
                            icon="fitness-outline"
                            value={`${currentExercise?.repeticiones} reps`}
                            isDark={isDark}
                        />
                    </View>

                    {/* Barra de Progreso */}
                    <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <Animated.View
                            className="h-full bg-eBlue-500"
                            style={{ width: progressWidth }}
                        />
                    </View>

                    {/* Tiempo Restante */}
                    <Text className={`${textStyle} text-4xl font-ralewayExtraBold text-center my-6`}>
                        {timeLeft}s
                    </Text>
                </View>

                {/* Siguiente Ejercicio */}
                {nextExercise && (
                    <View className={`
                        p-4 rounded-xl mt-4
                        ${isDark ? 'bg-darkGray-600' : 'bg-gray-100'}
                    `}>
                        <Text className={`${textStyle} text-sm mb-2`}>Siguiente:</Text>
                        <Text className={`${textStyle} text-lg font-ralewayBold`}>
                            {nextExercise.nombre}
                        </Text>
                    </View>
                )}

                {/* Controles */}
                <View className="mb-8">
                    <View className="flex-row justify-center items-center space-x-6 mb-6">
                        {/* Play/Pause */}
                        <Pressable
                            onPress={togglePlay}
                            className={`
                                p-4 rounded-full
                                ${isDark ? 'bg-darkGray-600' : 'bg-gray-100'}
                            `}
                        >
                            <Ionicons
                                name={isPlaying ? "pause" : "play"}
                                size={32}
                                color={isDark ? '#fff' : '#374151'}
                            />
                        </Pressable>

                        {/* Completar */}
                        <Pressable
                            onPress={handleComplete}
                            className="bg-eBlue-500 px-6 py-3 rounded-xl"
                        >
                            <Text className="text-white font-ralewayBold text-lg">
                                Completar Ejercicio
                            </Text>
                        </Pressable>
                    </View>

                    {/* Progreso de la Rutina */}
                    <Text className={`${textStyle} text-center`}>
                        Ejercicio {currentExerciseIndex + 1} de {screenPlayExercises!.length}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const InfoPill = ({ icon, value, isDark }: any) => (
    <View className={`
        flex-row items-center px-4 py-2 rounded-full
        ${isDark ? 'bg-darkGray-500' : 'bg-white'}
    `}>
        <Ionicons
            name={icon}
            size={20}
            color={isDark ? '#fff' : '#374151'}
            style={{ marginRight: 8 }}
        />
        <Text className={`${isDark ? 'text-white' : 'text-darkGray-500'} font-ralewayBold`}>
            {value}
        </Text>
    </View>
)

export default PlayExercise