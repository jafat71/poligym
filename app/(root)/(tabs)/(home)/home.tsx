import React, { useRef } from 'react'
import { Pressable, Text, ScrollView, View } from 'react-native'

import { useTheme } from '@/context/ThemeContext'
import { RoutinePlan } from '@/types/interfaces/entities/plan'

import { useBackBehaviour } from '@/hooks/useBackBehaviour'

import { TrainingPlans } from '@/constants'

import { HomePlanFlatlist } from '@/components/ui/plans/HomePlanFlatlist'
import { HomeRoutineFlatlist } from '@/components/ui/plans/HomeRoutineFlatList'
import MainHomeResume from '@/components/ui/home/HomeMainResume'

const Home = () => {
  useBackBehaviour()
  const { isDark } = useTheme()
  
  const suggestedPlans = TrainingPlans.slice(0, 3)

  const suggestedRoutines: RoutinePlan[] = [
    TrainingPlans[0].detalleDias.lunes as RoutinePlan,
    TrainingPlans[0].detalleDias.miércoles as RoutinePlan,
    TrainingPlans[0].detalleDias.viernes as RoutinePlan
  ]

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollDown = () => {
      scrollViewRef.current?.scrollTo({
          y: 150,
          animated: true
      });
  };

  return (
      <ScrollView 
        ref={scrollViewRef}
        className={`flex-1 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}
        showsVerticalScrollIndicator={false}
      >
        <MainHomeResume scrollDown={scrollDown} />

        <View className="my-1">
          <View className="px-4">
            <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
                font-ralewayBold text-xl`}>
                TE PUEDEN INTERESAR
            </Text>
          </View>
          <HomePlanFlatlist
            data={suggestedPlans}
          />
        </View>

        <View className="mb-4">
          <View className="flex-row items-center justify-between px-4">
            <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
                font-ralewayBold text-xl`}>
              RUTINAS RECOMENDADAS
            </Text>
            <Pressable className="flex-row items-center">
              <Text className="text-eBlue-500 font-ralewayBold">
                Ver más
              </Text>
            </Pressable>
          </View>
          <HomeRoutineFlatlist
            data={suggestedRoutines}
          />
        </View>
      </ScrollView>
  )
}

export default Home