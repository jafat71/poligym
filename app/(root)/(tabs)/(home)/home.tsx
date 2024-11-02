import { TrainingPlans } from '@/constants'

import { useTheme } from '@/context/ThemeContext'
import { useUser } from '@/context/UserContext'
import React from 'react'
import { View } from 'react-native'

import { FlatList, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomePlanFlatlist } from '@/components/ui/plans/HomePlanFlatlist'
import WeekCalendar from '@/components/ui/history/weekCalendar'
import { RoutinePlan } from '@/types/interfaces/entities/plan'
import { HomeRoutineFlatlist } from '@/components/ui/plans/HomeRoutineFlatList'

const Home = () => {
  const { isDark } = useTheme()
  const { loggedUserInfo, userSelectedPlan } = useUser()
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

      <View className='px-4'>
        <View className='flex flex-row items-center justify-between mb-3'>
          <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
            font-ralewayBold 
              `}>
            Tu semana
          </Text>
          <Pressable className='flex flex-row items-center justify-center'>
            <Text className={`text-eBlue-500 font-ralewayBold`}>Ver más</Text>
          </Pressable>
        </View>
        <WeekCalendar />
        <View className='flex flex-row items-start justify-between my-2'>

          <View >
            <Text className={`font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Tiempo Trabajado</Text>
            <Text className={`text-xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>00h00m</Text>
          </View>
          <View >
            <Text className={`text-sm font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Dias Activo</Text>
            <Text className={`text-xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{loggedUserInfo?.userNumberActivityDays}</Text>
          </View>

        </View>
      </View>

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