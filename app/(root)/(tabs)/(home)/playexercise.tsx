import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton"
import { useNavigationFlowContext } from "@/context/NavFlowContext"
import { useTheme } from "@/context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const PlayExercise = () => {
    const { screenExercise } = useNavigationFlowContext()
    const { isDark } = useTheme()
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkGray-500' : 'bg-white'}`}>

            <GoBackUpButton />

            <View className="flex-1 items-center justify-center min-h-screen">
                <Text className={`${textStyle}`}>  
                    {screenExercise?.nombre}
                </Text>
                <Text className={`${textStyle}`}>  
                    {screenExercise?.repeticiones} x {screenExercise?.series}
                </Text>
                <Text className={`${textStyle}`}>  
                    {screenExercise?.tiempoDescanso} seg.
                </Text>
        

                <View className="flex-row items-center justify-center">
                    <Ionicons name="play" size={24} color={isDark ? 'white' : 'black'} />
                </View>

            </View>   

        </SafeAreaView>
    )
}

export default PlayExercise
