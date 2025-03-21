import { useTheme } from "@/context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { Text, TouchableOpacity } from "react-native"
import { View } from "react-native"

interface SubAddNumericComponentProps {
    number: number
    subFunction: () => void
    addFunction: () => void
    title: string
}

export const SubAddNumericComponent = ({ number, subFunction, addFunction, title }: SubAddNumericComponentProps) => {
    const { isDark } = useTheme()
    return (
        <>
            <View className="flex flex-row items-center justify-between  w-full">
                <View className='flex flex-row items-center'>
                    <Text className={`text-lg ${isDark ? 'text-white' : 'text-darkGray-900'} font-ralewayExtraBold`}>{title}</Text>
                </View>

                <View className='flex flex-row items-center justify-between w-3/5'>
                    <TouchableOpacity
                        onPress={subFunction}
                        className='p-2'>
                        <Ionicons name="remove-circle" size={34} color={isDark ? '#fff' : '#374151'} />
                    </TouchableOpacity>

                    <View className='flex flex-row items-center'>
                        <Text className={`ml-2 text-2xl w-12 text-center font-semibold
                            ${isDark ? 'text-white' : 'text-darkGray-900'}
                        `}>
                            {number}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={addFunction}
                        testID='add-button'
                        className='p-2'>
                        <Ionicons name="add-circle" size={34} color={isDark ? '#fff' : '#374151'} />
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
}
