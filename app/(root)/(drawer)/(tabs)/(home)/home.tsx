import PlanCard from '@/components/ui/plans/PlanCard'
import PlanSmallCard from '@/components/ui/plans/PlanSmallCard'
import { Level } from '@/components/ui/plans/PlanConstants'
import { TrainingPlans } from '@/constants'

import { useTheme } from '@/context/ThemeContext'
import { useUser } from '@/context/UserContext'
import React, { useRef, useState } from 'react'
import { useWindowDimensions, View } from 'react-native'

import { FlatList, Text, Animated, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

import Loading from '@/components/animatedUi/Loading'

const Home = () => {
  const { isDark } = useTheme()
  const { loggedUserInfo } = useUser()
  //Todo: fetch suggested plans
  const suggestedPlans = TrainingPlans.slice(0, 3)

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const getActualMonth = () => {
    const date = new Date()
    return date.toLocaleString('es-ES', { month: 'short' })
  }

  const getActualDay = () => {
    const date = new Date()
    return date.toLocaleString('es-ES', { day: '2-digit' })
  }

  const { height: SCREEN_HEIGHT } = useWindowDimensions()
  const [isExpanded, setIsExpanded] = useState(false)
  const heightAnim = useRef(new Animated.Value(180)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    Animated.parallel([
      Animated.spring(heightAnim, {
        toValue: isExpanded ? 180 : SCREEN_HEIGHT * 0.6,
        useNativeDriver: false,
        damping: 15
      }),
      Animated.timing(rotateAnim, {
        toValue: isExpanded ? 0 : 1,
        duration: 300,
        useNativeDriver: true
      })
    ]).start()
  }

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  if (!loggedUserInfo) return <Loading />

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

      <View className='bg-eBlue-500 rounded-lg px-2'>
        <View className='flex flex-row justify-between items-center p-2'>
          <Text className={`text-lg font-ralewayBold text-white `}>
            Explora otros planes
          </Text>
          <Pressable onPress={toggleExpand}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons
                name="chevron-down"
                size={24}
                color={"white"}
              />
            </Animated.View>
          </Pressable>
        </View>

        <Animated.View style={{ height: heightAnim }}>
          <FlatList
            className='my-2 '
            data={[...TrainingPlans]}
            renderItem={({ item }) => (
              <PlanSmallCard
                key={item.title}
                {...item}
                level={item.level as Level}
              />
            )}
            keyExtractor={(item) => item.title}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      </View>

    </SafeAreaView>
  )
}

export default Home