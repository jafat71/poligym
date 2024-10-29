import PlanCard from '@/components/ui/plans/PlanCard'
import PlanSmallCard from '@/components/ui/plans/PlanSmallCard'
import { Level } from '@/components/ui/plans/PlanConstants'
import { TrainingPlans } from '@/constants'

import { useTheme } from '@/context/ThemeContext'
import { useUser } from '@/context/UserContext'
import React, { useRef } from 'react'
import { View } from 'react-native'

import { FlatList, Text, Animated, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const Home = () => {
  const { isDark } = useTheme()
  const { loggedUserInfo } = useUser()
  //Todo: fetch suggested plans
  const suggestedPlans = TrainingPlans.slice(0, 3)

  const scrollX = useRef(new Animated.Value(0)).current;

  const getActualMonth = () => {
    const date = new Date()
    return date.toLocaleString('es-ES', { month: 'short' })
  }

  const getActualDay = () => {
    const date = new Date()
    return date.toLocaleString('es-ES', { day: '2-digit' })
  }

  return (
    <SafeAreaView className={`flex flex-1 rounded-sm 
      ${isDark ? "bg-darkGray-500" : "bg-white"} `}>

      <View className='px-2'>
        <View className='flex flex-row items-center justify-between'>
          <View>
            <Text className={`text-2xl font-ralewayExtraBold
            ${isDark ? "text-white" : "text-darkGray-500"} `}>
              Bienvenido, {loggedUserInfo?.userName.split(' ')[0]}</Text>

            <Text className={`text-lg font-ralewayBold
            ${isDark ? "text-white" : "text-darkGray-500"} `}>
              Planes de entrenamiento
            </Text>

          </View>

          <View className='bg-eBlue-500 rounded-lg p-1 w-16 h-16 overflow-hidden'>
            <View className='bg-eBlue-700 rounded-t-md py-1'>
              <Text className='text-white font-ralewayBold text-center text-sm'>{getActualMonth()}</Text>
            </View>
            <View className='flex-1 justify-center items-center'>
              <Text className='text-white font-ralewayBold text-xl'>{getActualDay()}</Text>
            </View>
          </View>
        </View>

        <Text className={`text-lg font-ralewayLight
            ${isDark ? "text-white" : "text-darkGray-500"} `}>
          Sugeridos en base a tus objetivos
        </Text>

      </View>

      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-1 my-2"
        data={suggestedPlans}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * 300,
            index * 300,
            (index + 1) * 200
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={{
                transform: [{ scale }],
                opacity,
              }}
            >
              <PlanCard
                key={item.title}
                {...item}
                level={item.level as Level}
              />

            </Animated.View>
          );
        }}
        keyExtractor={(item, index) => item.title + "" + index}
        snapToInterval={300}
        decelerationRate="normal"
      />

      <View className=' rounded-lg px-1 h-56'>

        <View className='flex flex-row justify-between items-center px-1 py-1'>
          <Text className={`text-lg font-ralewayBold ${isDark ? 'text-white' : 'text-darkGray-500'} `}>
            Te pueden interesar
          </Text>
          <Pressable className='flex flex-row items-center justify-center'>
            <Text className={`${isDark ? 'text-white' : 'text-darkGray-500'} font-ralewayBold`}>Ver más</Text>
            <Ionicons
              name="add-circle-outline"
              size={22}
              color={isDark ? "white" : "#1c1c1c"}
            />
          </Pressable>
        </View>

        <FlatList
          className='my-1'
          data={[...TrainingPlans, ...TrainingPlans]}
          renderItem={({ item }) => (
            <PlanSmallCard
              key={item.title}
              {...item}
              level={item.level as Level}
            />
          )}
          keyExtractor={(item, index) => item.title + "" + index}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </SafeAreaView>
  )
}

export default Home