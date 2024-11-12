import React, { useRef } from 'react'
import { ScrollView } from 'react-native'

import { useTheme } from '@/context/ThemeContext'

import { useBackBehaviour } from '@/hooks/useBackBehaviour'

import MainHomeResume from '@/components/ui/home/HomeMainResume'
import HomeSubSection from '@/components/ui/home/HomeSubSection'
import HomeSmallSection from '@/components/ui/home/HomeSmallSection'
import { StatusBar } from 'react-native'

const Home = () => {
  useBackBehaviour()
  const { isDark } = useTheme()

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
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      <MainHomeResume scrollDown={scrollDown} />
      <HomeSubSection />
      <HomeSmallSection />
    </ScrollView>
  )
}

export default Home