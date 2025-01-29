import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { BodyColors, MuscleGroupsColors } from '@/components/ui/body/bodyConstants';
import MaleBack from '@/components/ui/body/MaleBack';
import FemaleFront from '@/components/ui/body/FemaleFront';
import FemaleBack from '@/components/ui/body/FemaleBack';
import MaleFront from '@/components/ui/body/MaleFront';
import TimeResumeFull from '@/components/ui/history/weekResumeFull';
import { StatsSmallCard } from '@/components/ui/stats/StatsSmallCard';
import { useQueryClient } from '@tanstack/react-query';
import { useHistorial } from '@/hooks/useHistorial';
import { MuscleGroups } from '@/types/types/muscles';
import { DataTable} from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { resetUserPlanProgress, resetUserPlanProgressDetails, resetUserWorkoutProgress } from '@/database/sqlite';
import { useWeekHistorial } from '@/hooks/useWeekHistorial';

export const Stats = () => {
  const { isDark } = useTheme();
  const { loggedUserInfo } = useUser();
  const { userHistorial } = useHistorial();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const {
    defaultColor,
    selectedColor,
    ...scaleColors
  } = BodyColors;
  
  const [muscleGroupsColors, setMuscleGroupsColors] = useState<MuscleGroupsColors>({
    abdominals: scaleColors.workedColor01,
    calves: scaleColors.workedColor01,
    quads: scaleColors.workedColor01,
    obliques: scaleColors.workedColor01,
    forearms: scaleColors.workedColor01,
    biceps: scaleColors.workedColor01,
    chest: scaleColors.workedColor01,
    shoulders: scaleColors.workedColor01,
    traps: scaleColors.workedColor01,
    lowerback: scaleColors.workedColor01,
    triceps: scaleColors.workedColor01,
    hamstrings: scaleColors.workedColor01,
    glutes: scaleColors.workedColor01,
    lats: scaleColors.workedColor01,
    trapsmiddle: scaleColors.workedColor01
  });
  const [muscleGroupsCount, setMuscleGroupsCount] = useState({
    abdominals: 0,
    calves: 0,
    quads: 0,
    obliques: 0,
    forearms: 0,
    biceps: 0,
    chest: 0,
    shoulders: 0,
    traps: 0,
    lowerback: 0,
    triceps: 0,
    hamstrings: 0,
    glutes: 0,
    lats: 0,
    trapsmiddle: 0
  });

  const [muscleGroupsPercentage, setMuscleGroupsPercentage] = useState({
    abdominals: 0.0,
    calves: 0.0,
    quads: 0.0,
    obliques: 0.0,
    forearms: 0.0,
    biceps: 0.0,
    chest: 0.0,
    shoulders: 0.0,
    traps: 0.0,
    lowerback: 0.0,
    triceps: 0.0,
    hamstrings: 0.0,
    glutes: 0.0,
    lats: 0.0,
    trapsmiddle: 0.0
  });

  const getIMC = (peso: number, altura: number) => {
    const alturaMeter = altura / 100;
    const imc = peso / (alturaMeter * alturaMeter);
    return imc.toFixed(2);
  };

  let muscularGroupCount = {
    abdominals: 0,
    calves: 0,
    quads: 0,
    obliques: 0,
    forearms: 0,
    biceps: 0,
    chest: 0,
    shoulders: 0,
    traps: 0,
    lowerback: 0,
    triceps: 0,
    hamstrings: 0,
    glutes: 0,
    lats: 0,
    trapsmiddle: 0
  };

  let muscularGroupPercentage = {
    abdominals: 0.0,
    calves: 0.0,
    quads: 0.0,
    obliques: 0.0,
    forearms: 0.0,
    biceps: 0.0,
    chest: 0.0,
    shoulders: 0.0,
    traps: 0.0,
    lowerback: 0.0,
    triceps: 0.0,
    hamstrings: 0.0,
    glutes: 0.0,
    lats: 0.0,
    trapsmiddle: 0.0
  };
  const paintMuscles = () => {
    const userWorkedMuscles = (userHistorial as any)?.map((workout: any) => workout.workoutWorkedMuscles);
    let totalWorkedMuscles = 0;

    for (const muscularGroupsWorkedOnWorkout of userWorkedMuscles) {
      try {
        const muscleGroups: string[] = JSON.parse(muscularGroupsWorkedOnWorkout);
        muscleGroups.forEach(muscle => {
          if (muscularGroupCount.hasOwnProperty(muscle)) {
            muscularGroupCount[muscle as keyof MuscleGroupsColors] += 1;
          }
          totalWorkedMuscles += 1;
        });
      } catch (error) {
        console.error(`Error al parsear los grupos musculares: ${muscularGroupsWorkedOnWorkout}`, error);
      }
    }
    for (const muscle in muscularGroupCount) {
      const percentage = totalWorkedMuscles > 0 ? muscularGroupCount[muscle as keyof MuscleGroupsColors] / totalWorkedMuscles : 0;
      muscularGroupPercentage[muscle as keyof MuscleGroupsColors] = percentage;
      if (percentage >= 0.75) {
        muscleGroupsColors[muscle as keyof MuscleGroupsColors] = scaleColors.workedColor09;
      } else if (percentage >= 0.15) {
        muscleGroupsColors[muscle as keyof MuscleGroupsColors] = scaleColors.workedColor08;
      } else if (percentage >= 0.1) {
        muscleGroupsColors[muscle as keyof MuscleGroupsColors] = scaleColors.workedColor07;
      }else if (percentage >= 0.050) {
        muscleGroupsColors[muscle as keyof MuscleGroupsColors] = scaleColors.workedColor06;
      }  
      else if (percentage >= 0.040) {
        muscleGroupsColors[muscle as keyof MuscleGroupsColors] = scaleColors.workedColor05;
      } else if (percentage >= 0.025) {
        muscleGroupsColors[muscle as keyof MuscleGroupsColors] = scaleColors.workedColor04;
      } else if (percentage >= 0.015) {
        muscleGroupsColors[muscle as keyof MuscleGroupsColors] = scaleColors.workedColor03;
      } else if (percentage >= 0.010) {
        muscleGroupsColors[muscle as keyof MuscleGroupsColors] = scaleColors.workedColor02;
      } else {
        muscleGroupsColors[muscle as keyof MuscleGroupsColors] = scaleColors.workedColor01;
      }
    }
    setMuscleGroupsColors(muscleGroupsColors);
    setMuscleGroupsCount(muscularGroupCount);
    setMuscleGroupsPercentage(muscularGroupPercentage);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['historyTime'] });
    queryClient.invalidateQueries({ queryKey: ['weekDays'] });
    paintMuscles();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 4000);
  };

  const handleResetData = async () => { 
    Alert.alert('¿Estás seguro de que deseas resetear tus datos?', 'Esta acción es irreversible y eliminará todos los datos recopilados.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Resetear', onPress: async () => {
        // await dropWorkoutProgressTable();
        // await dropUserPlanProgressTable();
        // await dropPlanProgressDetailsTable();
        await resetUserWorkoutProgress(loggedUserInfo?.id ?? '');
        await resetUserPlanProgress(loggedUserInfo?.id ?? '');
        await resetUserPlanProgressDetails(loggedUserInfo?.id ?? '');
        queryClient.invalidateQueries({ queryKey: ['historyTime'] });
        onRefresh();
      } }
    ]);
  }

  useEffect(() => {
    if (userHistorial) {
      paintMuscles();
    }
  }, [userHistorial]);

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
                <FemaleBack width={150} height={200} muscleColors={muscleGroupsColors} />
                <FemaleFront width={150} height={200} muscleColors={muscleGroupsColors} />
              </>
            ) : (
              <>
                <MaleBack width={150} height={200} muscleColors={muscleGroupsColors} />
                <MaleFront width={150} height={200} muscleColors={muscleGroupsColors} />
              </>
            )
          }
        </View>
        <View className="flex-col justify-between">
          <DataTable>
            <DataTable.Header>
              <DataTable.Title >
                <Text className={`text-xs font-ralewayBold ${isDark ? "text-white" : "text-black"}`}>
                  Grupo Muscular
                </Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text className={`text-xs font-ralewayBold ${isDark ? "text-white" : "text-black"}`}>
                  Rutinas
                </Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text className={`text-xs font-ralewayBold ${isDark ? "text-white" : "text-black"}`}>
                  Porcentaje (%)
                </Text>
              </DataTable.Title>
            </DataTable.Header>

            {
              Object.keys(muscularGroupCount).map((muscle, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>
                    <Text className={`text-xs font-ralewayBold ${isDark ? "text-white" : "text-black"}`}> 
                      {MuscleGroups[muscle as keyof typeof MuscleGroups]}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Text className={`text-xs  ${isDark ? "text-white" : "text-black"}`}>
                      {muscleGroupsCount[muscle as keyof typeof muscleGroupsCount]}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <View className="flex-row items-center">
                      <Text className={`text-xs  ${isDark ? "text-white" : "text-black"}`}> 
                        {muscleGroupsPercentage[muscle as keyof typeof muscleGroupsPercentage].toFixed(2)}
                      </Text>
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            }

          </DataTable>
        </View>

        <View className={`p-4 flex-col justify-between my-2 ${isDark ? "bg-darkGray-500" : "bg-darkGray-100"}`}>
          <View className="flex-row items-center justify-start">
            <Ionicons name="information-circle-outline" size={24} color={isDark ? "white" : "black"} />
            <Text className={`text-base font-ralewayBold ${isDark ? "text-white" : "text-black"}`}>
              Información
            </Text>
            </View>

            <View className="flex-row items-center justify-center"> 
              <Text className={`text-xs font-raleway ${isDark ? "text-white" : "text-black"}`}>
                La información recopilada de la ejecución de rutinas nos sirve para llevar registro
                de tus estadisticas. Si deseas resetear tus datos, puedes presionar el siguiente boton.
              </Text>
            </View>

            <TouchableOpacity className="bg-redEPN-500 p-2 my-2 rounded-lg" onPress={handleResetData}>
              <View className="flex-row items-center justify-center px-4">
                <View className="justify-start w-full">
                  <Ionicons name="trash-outline" size={24} color="white" />
                </View>
                <Text className={`absolute text-base font-ralewayBold w-full text-center text-white`}>
                  Resetear datos
                </Text>
              </View>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Stats;
