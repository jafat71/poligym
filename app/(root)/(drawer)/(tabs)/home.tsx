import { TrainingPlans } from '@/constants'
import { useTheme } from '@/context/ThemeContext'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'



const Home = () => {
  const { isDark } = useTheme()
  return (
    <SafeAreaView className={`flex flex-1
      px-2  rounded-sm
      ${isDark ? "bg-darkGray-500" : "bg-white"} `}>

        <View className='flex flex-row items-center justify-between pb-2 '>
          <Text className={`text-xl  font-ralewayLight text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Selecciona tu plan de entrenamiento</Text>
        </View>


      <View className={`h-3/5 relative rounded-md`}>

        <Swiper
          dotColor={`${isDark ? "#66a3ff " : "#003666"}`}
        >
          {TrainingPlans.map((plan, index) => (
            <View key={index}
              className={`flex flex-1 rounded-md
              pl-4 pb-4 border-[1px] ${isDark ? "border-eBlue-300" : "border-eBlue-800"}  rounded-sm`}
            >
              <Image source={{ uri: plan.image }}
                resizeMode='cover'
                className="w-full h-full rounded-md mb-4 b opacity-30" />
              <View className='absolute items-end p-1'>
                <Text className={`text-7xl font-bold break-words 
                  mb-2 ${isDark ? "text-white" : "text-darkGray-500"} `}>
                  {plan.title}
                </Text>
              </View>

            </View>
          ))}
        </Swiper>
      </View>




    </SafeAreaView>
  )
}

export default Home