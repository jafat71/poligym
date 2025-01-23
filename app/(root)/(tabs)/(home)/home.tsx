import React, { useRef, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'

import { useTheme } from '@/context/ThemeContext'

import { useBackBehaviour } from '@/hooks/useBackBehaviour'

import MainHomeResume from '@/components/ui/home/HomeMainResume'
import HomeSubSection from '@/components/ui/home/HomeSubSection'
import HomeSmallSection from '@/components/ui/home/HomeSmallSection'
import { useQueryClient } from '@tanstack/react-query'
const Home = () => {
  useBackBehaviour()
  const { isDark } = useTheme()
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onRefresh = () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['historyTime'] });
    queryClient.invalidateQueries({ queryKey: ['weekDays'] });
    queryClient.invalidateQueries({ queryKey: ['plans', 'recommended'] });
    queryClient.invalidateQueries({ queryKey: ['workouts', 'recommended'] });
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };
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
      className={`flex-1 h-full ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          testID="refresh-control"
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <MainHomeResume 
      scrollDown={scrollDown} />
      <HomeSubSection />
      <HomeSmallSection />
    </ScrollView>
  )
}

export default Home