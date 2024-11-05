import { TrainingPlans } from '@/constants'

import { useTheme } from '@/context/ThemeContext'
import React from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { HomePlanFlatlist } from '@/components/ui/plans/HomePlanFlatlist'
import { RoutinePlan } from '@/types/interfaces/entities/plan'
import WeekResumeHome from '@/components/ui/history/weekResumeHome'
import { Pressable, Text } from 'react-native'
import { View } from 'react-native'
import { HomeRoutineFlatlist } from '@/components/ui/plans/HomeRoutineFlatList'

const Home = () => {
  const { isDark } = useTheme()

  //Todo: fetch suggested plans
  const suggestedPlans = TrainingPlans.slice(0, 3)
  const suggestedRoutines: RoutinePlan[] = [
    TrainingPlans[0].detalleDias.lunes as RoutinePlan,
    TrainingPlans[0].detalleDias.miércoles as RoutinePlan,
    TrainingPlans[0].detalleDias.viernes as RoutinePlan
  ]
  return (
    <SafeAreaView className={`flex flex-1 rounded-sm 
      ${isDark ? "bg-darkGray-500" : "bg-white"} `}>
      <WeekResumeHome />
      <Text className={`text-lg font-ralewayBold px-4
            ${isDark ? "text-white" : "text-darkGray-500"} `}>
        PLANES DE ENTRENAMIENTO PARA TI
      </Text>
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

    </SafeAreaView>
  )
}

export default Home