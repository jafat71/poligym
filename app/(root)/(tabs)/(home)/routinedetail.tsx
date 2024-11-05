import { getMuscleImage } from "@/components/ui/common/body/bodyConstants"
import SmallBodyCardComponent from "@/components/ui/common/body/smallBodyCardComponent"
import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton"
import ExerciseCard from "@/components/ui/exercises/ExerciseCard"
import { useNavigationFlowContext } from "@/context/NavFlowContext"
import { useTheme } from "@/context/ThemeContext"
import { FlatList, Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const RoutineDetail = () => {
    const { screenRoutine } = useNavigationFlowContext()
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
                    {screenRoutine?.nombre}
                </Text>

            </View>

            <FlatList
                className='flex-1'
                ListHeaderComponent={
                    <>


                        <View className='flex flex-row'>
                            <View className={`w-1/2 border-r border-${isDark ? "white" : "darkGray-500"} `}>
                                {
                                    screenRoutine?.musculos.map((muscle, index) => (
                                        <SmallBodyCardComponent key={index} muscleImage={getMuscleImage(muscle, 200, 100)} />
                                    ))
                                }
                            </View>
                            <View className='w-1/2 '>
                                <Text className={`${textStyle} text-center text-lg font-ralewayExtraBold`}>
                                    Grupos musculares
                                </Text>
                                {
                                    screenRoutine?.musculos.map((muscle, index) => (
                                        <Text key={index} className={`${textStyle} text-center text-base font-ralewayLight`}> {muscle}</Text>
                                    ))
                                }
                                <Text className={`${textStyle} text-center text-lg font-ralewayExtraBold`}>
                                    Dificultad
                                </Text>
                                <Text className={`${textStyle} text-center text-base font-ralewayLight`}>
                                    {screenRoutine?.dificultad}
                                </Text>
                            </View>
                        </View>
                    </>
                }
                data={screenRoutine?.ejercicios}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <ExerciseCard exercise={item} />
                )}
            />

            <Pressable className='w-full bg-eBlue-500 rounded-md p-4 my-2'>
                <Text className='text-white text-center font-ralewayBold text-lg'>
                    Empezar
                </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default RoutineDetail
