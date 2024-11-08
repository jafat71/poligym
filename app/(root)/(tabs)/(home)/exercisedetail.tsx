import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton"
import { useNavigationFlowContext } from "@/context/NavFlowContext"
import { useTheme } from "@/context/ThemeContext"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons'

const ExerciseDetail = () => {
    const { screenExercise } = useNavigationFlowContext()
    const { isDark } = useTheme()
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} font-raleway`

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkGray-500' : 'bg-white'}`}>
            <GoBackUpButton />
            
            {/* Contenedor principal */}
            <View className="p-4 flex-1">
                {/* Encabezado */}
                <View className={`
                    p-6 rounded-2xl mb-6
                    ${isDark ? 'bg-darkGray-600' : 'bg-gray-100'}
                `}>
                    <Text className={`${textStyle} text-2xl font-ralewayExtraBold text-center mb-2`}>
                        {screenExercise?.nombre}
                    </Text>
                </View>

                {/* Tarjetas de información */}
                <View className="flex-row justify-between flex-wrap gap-4">
                    {/* Series */}
                    <InfoCard
                        icon="repeat-outline"
                        title="Series"
                        value={screenExercise?.series}
                        unit="series"
                        isDark={isDark}
                    />

                    {/* Repeticiones */}
                    <InfoCard
                        icon="fitness-outline"
                        title="Repeticiones"
                        value={screenExercise?.repeticiones}
                        unit="reps"
                        isDark={isDark}
                    />

                    {/* Tiempo de Descanso */}
                    <InfoCard
                        icon="time-outline"
                        title="Descanso"
                        value={screenExercise?.tiempoDescanso}
                        unit="seg"
                        isDark={isDark}
                    />
                </View>

                {/* Información adicional */}
                <View className={`
                    mt-6 p-6 rounded-2xl
                    ${isDark ? 'bg-darkGray-600' : 'bg-gray-100'}
                `}>
                    <View className="flex-row items-center mb-4">
                        <Ionicons
                            name="information-circle-outline"
                            size={24}
                            color={isDark ? '#fff' : '#374151'}
                        />
                        <Text className={`${textStyle} text-lg font-ralewayBold ml-2`}>
                            Detalles del Ejercicio
                        </Text>
                    </View>

                    <View className="space-y-4">
                        <DetailRow
                            icon="barbell-outline"
                            label="ID del Ejercicio"
                            value={screenExercise?.id.toString()}
                            isDark={isDark}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

// Componente para las tarjetas de información
const InfoCard = ({ icon, title, value, unit, isDark }) => (
    <View className={`
        p-4 rounded-xl
        ${isDark ? 'bg-darkGray-600' : 'bg-gray-100'}
        flex-1 min-w-[30%]
    `}>
        <View className="items-center">
            <Ionicons
                name={icon}
                size={24}
                color={isDark ? '#fff' : '#374151'}
                className="mb-2"
            />
            <Text className={`
                ${isDark ? 'text-white' : 'text-darkGray-500'} 
                text-sm font-ralewayBold text-center
            `}>
                {title}
            </Text>
            <Text className={`
                ${isDark ? 'text-white' : 'text-darkGray-500'} 
                text-xl font-ralewayExtraBold mt-2
            `}>
                {value}
            </Text>
            <Text className={`
                ${isDark ? 'text-white' : 'text-darkGray-500'} 
                text-sm font-raleway
            `}>
                {unit}
            </Text>
        </View>
    </View>
)

// Componente para filas de detalles
const DetailRow = ({ icon, label, value, isDark }) => (
    <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
            <Ionicons
                name={icon}
                size={20}
                color={isDark ? '#fff' : '#374151'}
            />
            <Text className={`${isDark ? 'text-white' : 'text-darkGray-500'} ml-2 font-ralewayBold`}>
                {label}
            </Text>
        </View>
        <Text className={`${isDark ? 'text-white' : 'text-darkGray-500'} font-raleway`}>
            {value}
        </Text>
    </View>
)

export default ExerciseDetail