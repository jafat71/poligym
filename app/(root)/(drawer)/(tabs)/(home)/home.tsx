import PlanSmallCard from '@/components/ui/plans/PlanSmallCard'
import { Level } from '@/components/ui/plans/PlanConstants'
import { TrainingPlans } from '@/constants'

import { useTheme } from '@/context/ThemeContext'
import { useUser } from '@/context/UserContext'
import React from 'react'
import { View } from 'react-native'

import { FlatList, Text, Animated, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomePlanFlatlist } from '@/components/ui/plans/HomePlanFlatlist'
import WeekCalendar from '@/components/ui/history/weekCalendar'

const Home = () => {
  const { isDark } = useTheme()
  const { loggedUserInfo } = useUser()
  //Todo: fetch suggested plans
  const suggestedPlans = TrainingPlans.slice(0, 3)

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
        <View className='flex flex-row items-center justify-between my-2'>
          <View>
            <Text className={`text-sm font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Plan Actual</Text>
            <Text className={`text-2xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>--</Text>
          </View>
          <View >
            <Text className={`font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Tiempo Trabajado</Text>
            <Text className={`text-2xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>00h00m</Text>
          </View>
          <View>
            <Text className={`text-sm font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Dias Activo</Text>
            <Text className={`text-2xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{loggedUserInfo?.userNumberActivityDays}</Text>
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

      <Text className={`text-lg font-ralewayBold px-4
            ${isDark ? "text-white" : "text-darkGray-500"} `}>
        RUTINAS QUE TE PUEDEN INTERESAR
      </Text>

      <FlatList
        className='my-1 px-1'
        data={[...TrainingPlans]}
        renderItem={({ item }) => (
          <PlanSmallCard
            key={item.title}
            {...item}
            level={item.level as Level}
          />
        )}
        keyExtractor={(item, index) => item.title + "" + index}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default Home