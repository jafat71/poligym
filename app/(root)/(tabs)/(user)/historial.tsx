import { View, Text } from 'react-native'
import React from 'react'
import { LastRoutines } from '@/constants'
import { useTheme } from '@/context/ThemeContext';

const historial = () => {
  const { isDark } = useTheme();    
    return (
    <View>
      {LastRoutines.map((routine, index) => (
            <View
              key={index}
              className={`p-4 mb-2 rounded-xl ${isDark ? "bg-darkGray-400" : "bg-gray-100"}`}
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className={`font-ralewayBold ${isDark ? "text-white" : "text-black"}`}>
                  {routine.rutina}
                </Text>
                <Text className={`font-ralewayMedium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {routine.duracion}
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {routine.musculos.map((muscle, idx) => (
                  <View
                    key={idx}
                    className="bg-eBlue-500 px-2 py-1 rounded-full"
                  >
                    <Text className="text-white text-xs">
                      {muscle}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
  )
}

export default historial