import { TrainingPlans } from '@/constants'

import { useTheme } from '@/context/ThemeContext'
import React from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { HomePlanFlatlist } from '@/components/ui/plans/HomePlanFlatlist'
import { RoutinePlan, TrainingPlan } from '@/types/interfaces/entities/plan'
import WeekResumeHome from '@/components/ui/history/weekResumeHome'
import { Pressable, Text } from 'react-native'
import { View } from 'react-native'
import { HomeRoutineFlatlist } from '@/components/ui/plans/HomeRoutineFlatList'
import { useBackBehaviour } from '@/hooks/useBackBehaviour'
import { useUser } from '@/context/UserContext'

const Home = () => {
  useBackBehaviour()
  const { isDark } = useTheme()
  const { userSelectedPlan } = useUser()

  const getSuggestedPlans = () => {
    //TODO: FIRST USER PLAN, THEN SUGGESTED PLANS
  }
  
  const suggestedPlans =  TrainingPlans.slice(0, 3)

  const suggestedRoutines: RoutinePlan[] = [
    TrainingPlans[0].detalleDias.lunes as RoutinePlan,
    TrainingPlans[0].detalleDias.miércoles as RoutinePlan,
    TrainingPlans[0].detalleDias.viernes as RoutinePlan
  ]


  return (
    <SafeAreaView className={`flex flex-1 rounded-sm 
      ${isDark ? "bg-darkGray-500" : "bg-white"} `}>
      <WeekResumeHome />
      <View className='px-4'>
        <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
            font-ralewayBold text-xl`}>
          Planes en base a tus objetivos
        </Text>
      </View>
      <HomePlanFlatlist
        data={suggestedPlans}
      />

      <View className='flex flex-row items-center justify-between px-4 mb-1'>
        <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
            font-ralewayBold 
              `}>
          Rutinas que te pueden interesar
        </Text>
        <Pressable className='flex flex-row items-center justify-center'>
          <Text className={`text-eBlue-500 font-ralewayBold`}>Ver más</Text>
        </Pressable>
      </View>

      <HomeRoutineFlatlist
        data={suggestedRoutines}
      />

    </SafeAreaView >
  )
}

export default Home