import { getMuscleImage } from "@/components/ui/common/body/bodyConstants"
import SmallBodyCardComponent from "@/components/ui/common/body/smallBodyCardComponent"
import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton"
import ExerciseCard from "@/components/ui/exercises/ExerciseCard"
import { useNavigationFlowContext } from "@/context/NavFlowContext"
import { useTheme } from "@/context/ThemeContext"
import { FlatList, Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const ExerciseDetail = () => {
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

export default ExerciseDetail
