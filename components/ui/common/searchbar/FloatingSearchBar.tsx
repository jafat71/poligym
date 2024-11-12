import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useTheme } from '@/context/ThemeContext'
import { Ionicons } from '@expo/vector-icons'

interface SearchBarProps {
    placeholder: string,
    onSearch: (text: string) => void,
    onClear: () => void,
    value: string,
    onChangeText: (text: string) => void
    isVisible: boolean 
    className?: string
}

const FloatingSearchBar = ({ placeholder, onSearch, onClear, value, onChangeText, isVisible, className }: SearchBarProps) => {
    const { isDark } = useTheme()
    if (!isVisible) return null
    return (
        <View
            className={`w-full px-2 bg-inherit ${className}`}
        >
            <View className='flex flex-row justify-center items-center'>
                <TextInput
                    placeholderTextColor={isDark ? "#d9d9d9" : "#b2b2b2"}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    className={`flex-1 h-10 rounded-md border-[2px] font-ralewayBold
           border-eBlue-500  ${isDark ? "bg-darkGray-800 text-white" : "bg-darkGray-100 text-darkGray-500"}
          p-2`} />
                <Pressable className='p-2'
                    onPress={() => onSearch(value)}
                    onLongPress={onClear}      
                >
                    <Ionicons name='search' size={24} color={isDark ? "white" : "black"} />
                </Pressable>
            </View>
        </View>
    )
}

export default FloatingSearchBar