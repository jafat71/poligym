import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton"
import { useNavigationFlowContext } from "@/context/NavFlowContext"
import { useTheme } from "@/context/ThemeContext"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const exerciseDetail = () => {
    const { screenExercise } = useNavigationFlowContext()
    const { isDark } = useTheme()
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkGray-500' : 'bg-white'}`}>

            <GoBackUpButton />
            <View
                className='h-[60px]'
            >
                <Text className={`
                    p-2 rounded-md
                    ${textStyle} text-center text-xl font-ralewayExtraBold`}>
                    {screenExercise?.nombre}
                </Text>

            </View>
                    
            
        </SafeAreaView>
    )
}

export default exerciseDetail
