import { TrainingPlans } from '@/constants'
import { useTheme } from '@/context/ThemeContext'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomePlanFlatlist } from '@/components/ui/plans/HomePlanFlatlist'
import { RoutinePlan } from '@/types/interfaces/entities/plan'
import WeekResumeHome from '@/components/ui/history/weekResumeHome'
import { Pressable, Text, ScrollView } from 'react-native'
import { View } from 'react-native'
import { HomeRoutineFlatlist } from '@/components/ui/plans/HomeRoutineFlatList'
import { useBackBehaviour } from '@/hooks/useBackBehaviour'
import HomeCurrentPlan from '@/components/ui/plans/HomeCurrentPlan'

const Home = () => {
  useBackBehaviour()
  const { isDark } = useTheme()
  
  const suggestedPlans = TrainingPlans.slice(0, 3)

  const suggestedRoutines: RoutinePlan[] = [
    TrainingPlans[0].detalleDias.lunes as RoutinePlan,
    TrainingPlans[0].detalleDias.miércoles as RoutinePlan,
    TrainingPlans[0].detalleDias.viernes as RoutinePlan
  ]

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <WeekResumeHome />
        <HomeCurrentPlan />

        <View className="my-1">
          <View className="px-4">
            <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
                font-ralewayBold text-xl`}>
              Planes ajustados a ti
            </Text>
          </View>
          <HomePlanFlatlist
            data={suggestedPlans}
          />
        </View>

        <View className="mb-4">
          <View className="flex-row items-center justify-between px-4">
            <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
                font-ralewayBold text-sm`}>
              Rutinas que te pueden interesar
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
    </SafeAreaView>
  )
}

export default Home