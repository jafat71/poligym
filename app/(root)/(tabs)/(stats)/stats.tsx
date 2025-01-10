import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, RefreshControl } from 'react-native';
import { BodyColors, MuscleGroupsColors } from '@/components/ui/body/bodyConstants';
import MaleBack from '@/components/ui/body/MaleBack';
import FemaleFront from '@/components/ui/body/FemaleFront';
import FemaleBack from '@/components/ui/body/FemaleBack';
import MaleFront from '@/components/ui/body/MaleFront';
import TimeResumeFull from '@/components/ui/history/weekResumeFull';
import { StatsSmallCard } from '@/components/ui/stats/StatsSmallCard';
import { useQueryClient } from '@tanstack/react-query';

export const Stats = () => {
  const { isDark } = useTheme();
  const { loggedUserInfo } = useUser();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const {
    defaultColor,
    selectedColor,
    ...scaleColors
  } = BodyColors;

  let muscleGroups: MuscleGroupsColors = {
    abdominals: scaleColors.workedColor01,
    calves: scaleColors.workedColor01,
    quads: scaleColors.workedColor04,
    obliques: scaleColors.workedColor05,
    forearms: scaleColors.workedColor08,
    biceps: scaleColors.workedColor08,
    chest: scaleColors.workedColor07,
    shoulders: scaleColors.workedColor04,
    traps: scaleColors.workedColor08,
    lowerback: scaleColors.workedColor07,
    triceps: scaleColors.workedColor06,
    hamstrings: scaleColors.workedColor08,
    glutes: scaleColors.workedColor02,
    lats: scaleColors.workedColor09,
    trapsmiddle: scaleColors.workedColor02
  }

  const getIMC = (peso: number, altura: number) => {
    const alturaMeter = altura / 100;
    const imc = peso / (alturaMeter * alturaMeter);
    return imc.toFixed(2);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['historyTime'] });
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      className={`flex-1 ${isDark ? "bg-darkGray-900" : "bg-white"}`}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View className="px-4">
        <View className="flex-row items-center py-2">
          <View className={`rounded-full w-20 h-20 flex items-center justify-center border-2 border-eBlue-500`}>
            {loggedUserInfo?.avatarUrl ? (
              <Image source={{ uri: loggedUserInfo.avatarUrl }}
                className='w-full h-full rounded-full'
                resizeMode='cover' />
            ) : (
              <Text className="text-4xl font-raleway text-eBlue-500">
                {loggedUserInfo?.name?.split(' ').map(name => name[0]).join('')}
              </Text>
            )}
          </View>
          <View className="pl-3 flex-1">
            <Text
              numberOfLines={2}
              className={`text-2xl font-ralewayBold text-${isDark ? 'white' : 'darkGray-500'} flex-wrap`}>
              {loggedUserInfo?.name}
            </Text>
            <Text
              numberOfLines={1}
              className={`text-xs font-raleway text-${isDark ? 'white' : 'darkGray-500'}`}>
              {loggedUserInfo?.email}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between">
          <StatsSmallCard
            label="IMC"
            value={getIMC(loggedUserInfo?.weight ?? 0, loggedUserInfo?.height ?? 0)}
          />
          <StatsSmallCard
            label="Peso (kg)"
            value={loggedUserInfo?.weight?.toString() ?? ''}
          />
          <StatsSmallCard
            label="Altura (cm)"
            value={loggedUserInfo?.height?.toString() ?? ''}
          />
        </View>
        <TimeResumeFull />

        <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-black"}`}>
          Músculos más trabajados
        </Text>
        <View className={`flex flex-row items-center justify-center rounded-lg p-2 `}>
          {
            loggedUserInfo?.gender === 'Femenino' ? (
              <>
                <FemaleBack width={150} height={200} muscleColors={muscleGroups} />
                <FemaleFront width={150} height={200} muscleColors={muscleGroups} />
              </>
            ) : (
              <>
                <MaleBack width={150} height={200} muscleColors={muscleGroups} />
                <MaleFront width={150} height={200} muscleColors={muscleGroups} />
              </>
            )
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default Stats;
