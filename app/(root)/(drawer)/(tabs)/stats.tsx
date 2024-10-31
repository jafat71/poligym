import { BodyColors, MuscleGroupsColors } from '@/components/ui/common/body/bodyConstants';
import FemaleBack from '@/components/ui/common/body/FemaleBack';
import FemaleFront from '@/components/ui/common/body/FemaleFront';
import MaleBack from '@/components/ui/common/body/MaleBack';
import MaleFront from '@/components/ui/common/body/MaleFront';
import { exampleUser } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const Stats = () => {
  const { isDark } = useTheme()
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
    const alturaMeter = altura / 100
    const imc = peso / (alturaMeter * alturaMeter)
    return imc.toFixed(2)
  }

  return (
    <ScrollView className={`flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"} px-2`}>

      
      <View className='flex flex-row items-center justify-between mb-2'>
        <View >
          <Text className={`text-sm font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>PESO (KG)</Text>
          <Text className={`text-2xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{exampleUser.peso}</Text>
        </View>
        <View>
          <Text className={`text-sm font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>ALTURA (CM)</Text>
          <Text className={`text-2xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{exampleUser.altura}</Text>
        </View>
        <View>
          <Text className={`text-sm font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>IMC</Text>
          <Text className={`text-2xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{getIMC(exampleUser.peso, exampleUser.altura)}</Text>
        </View>
      </View>

      <View className='flex flex-row items-center justify-between mb-2'>
        <View>
          <Text className={`text-sm font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>DIAS ACTIVO</Text>
          <Text className={`text-2xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{exampleUser.diasActividad}</Text>
        </View>
        <View>
          <Text className={`text-sm font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>OBJETIVO</Text>
          <Text className={`text-2xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{exampleUser.objetivo}</Text>
        </View>

      </View>

      <Text className={`text-sm mb-2 font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>GRUPO MUSCULAR MÁS TRABAJADO</Text>

      <View className={`flex flex-row items-center justify-center rounded-lg p-2 `}>
        {
          exampleUser.genero === 'Femenino' ? (
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

      <View className={`flex flex-row items-start justify-center w-full`}>
        {Object.values(scaleColors).map((color, index) => (
          <View key={index} className="flex-row">
            <View className={`h-7 w-9`} style={{ backgroundColor: color }} />
          </View>
        ))}
      </View>

      <Text className={`text-sm my-2 font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>ESTA SEMANA</Text>

      <View className={`flex flex-row items-start`}>
        <View className='flex flex-col items-start justify-center w-1/3'>
          <Text className={`text-xs font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>Dias Activos</Text>
          <Text className={`text-sm font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
            {exampleUser.diasSeleccionados.length}
          </Text>
        </View>

        <View className='flex flex-col items-start justify-center w-1/3'>
          <Text className={`text-xs font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>Tiempo Realizado</Text>
          <Text className={`text-sm font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
            00:00h
          </Text>
        </View>

      </View>

    </ScrollView>
  );
}

export default Stats;
