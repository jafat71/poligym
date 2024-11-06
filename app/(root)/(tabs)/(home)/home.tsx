import { TrainingPlans } from '@/constants'

import { useTheme } from '@/context/ThemeContext'
import React, { useEffect } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { HomePlanFlatlist } from '@/components/ui/plans/HomePlanFlatlist'
import { RoutinePlan } from '@/types/interfaces/entities/plan'
import WeekResumeHome from '@/components/ui/history/weekResumeHome'
import { BackHandler, Pressable, Text } from 'react-native'
import { View } from 'react-native'
import { HomeRoutineFlatlist } from '@/components/ui/plans/HomeRoutineFlatList'
import { useUser } from '@/context/UserContext'
import { usePathname } from 'expo-router'

const Home = () => {
  const { isDark } = useTheme()
  const { userLogged } = useUser()

  const pathname = usePathname(); 

  const handleBackPress = () => {
      if (pathname === '/home' && userLogged) {
          BackHandler.exitApp(); 
          return true; 
      }
      return false; 
  };

  useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [pathname]); 

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

      {/* //TODO: Small FlatList Animation */}
      <HomeRoutineFlatlist
        data={suggestedRoutines}
      />

    </SafeAreaView>
  )
}

export default Home