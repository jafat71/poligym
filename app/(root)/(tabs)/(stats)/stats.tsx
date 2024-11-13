import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CircularProgress from 'react-native-circular-progress-indicator';
import { BodyColors, MuscleGroupsColors } from '@/components/ui/body/bodyConstants';
import { LastAlimentationPlans, LastExercisePlans, LastRoutines, exampleUser } from '@/constants';
import MaleBack from '@/components/ui/body/MaleBack';
import FemaleFront from '@/components/ui/body/FemaleFront';
import FemaleBack from '@/components/ui/body/FemaleBack';
import MaleFront from '@/components/ui/body/MaleFront';
import TimeResumeFull from '@/components/ui/history/weekResumeFull';

export const Stats = () => {
  const { isDark } = useTheme();
  const { userSelectedPlan } = useUser();

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

  // Cálculos de estadísticas
  const stats = {
    totalWorkouts: LastRoutines.length,
    totalTime: LastRoutines.reduce((acc, curr) =>
      acc + parseInt(curr.duracion), 0),
    activePlans: LastExercisePlans.filter(plan =>
      plan.estado === 'Activo').length,
    completionRate: (LastExercisePlans.filter(plan =>
      plan.estado === 'Finalizado').length / LastExercisePlans.length) * 100,
    mostWorkedMuscles: LastRoutines.reduce((acc, curr) => {
      curr.musculos.forEach(muscle => {
        acc[muscle] = (acc[muscle] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>)
  };

  return (
    <ScrollView className={`flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
      {/* Header con información básica */}
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Image
              source={{ uri: exampleUser.imagenPerfil }}
              className="w-20 h-20 rounded-full mr-4"
            />
            <View>
              <Text className={`text-2xl font-ralewayBold ${isDark ? "text-white" : "text-black"}`}>
                {exampleUser.nombre}
              </Text>
              <Text className={`text-sm font-ralewayMedium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {exampleUser.objetivo}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => router.push('/(config)/updateinformation')}
            className={`p-2 rounded-full ${isDark ? "bg-darkGray-400" : "bg-gray-100"}`}
          >
            <Ionicons name="pencil-outline" size={24} color={isDark ? "#fff" : "#000"} />
          </Pressable>
        </View>

        {/**ACTUAL WEEK STATS */}
        <TimeResumeFull />
        {/* Tarjetas de métricas principales */}
        <View className="flex-row justify-between mb-6">
          <MetricCard
            label="IMC"
            value={getIMC(exampleUser.peso, exampleUser.altura)}
            isDark={isDark}
          />
          <MetricCard
            label="Peso (kg)"
            value={exampleUser.peso.toString()}
            isDark={isDark}
          />
          <MetricCard
            label="Altura (cm)"
            value={exampleUser.altura.toString()}
            isDark={isDark}
          />
        </View>

        {/* Progreso circular */}
        <View className="flex-row justify-around mb-6">
          <View className="items-center">
            <CircularProgress
              value={stats.completionRate}
              radius={40}
              duration={2000}
              progressValueColor={isDark ? '#fff' : '#000'}
              activeStrokeColor="#0055f9"
              inActiveStrokeColor={isDark ? "#374151" : "#E5E7EB"}
              progressValueStyle={{ fontFamily: 'Raleway-Bold' }}
            />
            <Text className={`mt-2 text-sm font-ralewayMedium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Completados
            </Text>
          </View>

          <View className="items-center">
            <CircularProgress
              value={(exampleUser.diasActividad / 7) * 100}
              radius={40}
              duration={2000}
              progressValueColor={isDark ? '#fff' : '#000'}
              activeStrokeColor="#22C55E"
              inActiveStrokeColor={isDark ? "#374151" : "#E5E7EB"}
              progressValueStyle={{ fontFamily: 'Raleway-Bold' }}
              valueSuffix={'/7'}
              maxValue={7}
              valuePrefix=''
            />
            <Text className={`mt-2 text-sm font-ralewayMedium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Días activos
            </Text>
          </View>
        </View>

        {/**Muscles Stats*/}
        <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-black"}`}>
          Músculos más trabajados	
        </Text>
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
        {/* Últimas rutinas */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-black"}`}>
              Últimas rutinas
            </Text>
            <Pressable
              onPress={() => router.push('/(root)/(tabs)/(stats)/historial')}
              className="flex-row items-center"
            >
              <Ionicons
                name="time-outline"
                size={20}
                color={isDark ? "#fff" : "#000"}
                style={{ marginRight: 4 }}
              />
              <Text className={`font-ralewayMedium ${isDark ? "text-white" : "text-black"}`}>
                Historial
              </Text>
            </Pressable>
          </View>
          {LastRoutines.map((routine, index) => (
            <View
              key={index}
              className={`p-4 mb-2 rounded-xl ${isDark ? "bg-darkGray-400" : "bg-gray-100"}`}
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className={`font-ralewayBold ${isDark ? "text-white" : "text-black"}`}>
                  {routine.rutina}
                </Text>
                <Text className={`font-ralewayMedium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {routine.duracion}
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {routine.musculos.map((muscle, idx) => (
                  <View
                    key={idx}
                    className="bg-eBlue-500 px-2 py-1 rounded-full"
                  >
                    <Text className="text-white text-xs">
                      {muscle}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Planes activos */}
        <View className="mb-6">
          <Text className={`text-lg font-ralewayBold mb-3 ${isDark ? "text-white" : "text-black"}`}>
            Planes activos
          </Text>
          {LastExercisePlans.filter(plan => plan.estado === 'Activo').map((plan, index) => (
            <View
              key={index}
              className={`p-4 mb-2 rounded-xl ${isDark ? "bg-darkGray-400" : "bg-gray-100"}`}
            >
              <Text className={`font-ralewayBold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                {plan.plan}
              </Text>
              <View className="flex-row justify-between">
                <Text className={`font-ralewayMedium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Dificultad: {plan.dificultad}
                </Text>
                <Text className={`font-ralewayMedium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {plan.fecha}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Botones de acción */}
        <View className="gap-3">

          <ActionButton
            icon="heart-outline"
            label="Ver mis favoritos"
            onPress={() => router.push('/(root)/(tabs)/(stats)/favorites')}
            isDark={isDark}
          />

        </View>
      </View>
    </ScrollView>
  );
};

// Componente para métricas
const MetricCard = ({ label, value, isDark }) => (
  <View
    className={`p-4 rounded-xl ${isDark ? "bg-darkGray-400" : "bg-gray-100"}`}
    style={{ width: '31%' }}
  >
    <Text className={`text-xs font-ralewayMedium mb-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
      {label}
    </Text>
    <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-black"}`}>
      {value}
    </Text>
  </View>
);

// Componente para botones de acción
const ActionButton = ({ icon, label, onPress, isDark }) => (
  <Pressable
    onPress={onPress}
    className={`flex-row items-center p-4 rounded-xl ${isDark ? "bg-darkGray-400" : "bg-gray-100"
      }`}
  >
    <Ionicons
      name={icon}
      size={24}
      color={isDark ? "#fff" : "#000"}
      style={{ marginRight: 12 }}
    />
    <Text className={`font-ralewayMedium ${isDark ? "text-white" : "text-black"}`}>
      {label}
    </Text>
    <Ionicons
      name="chevron-forward"
      size={24}
      color={isDark ? "#fff" : "#000"}
      style={{ marginLeft: 'auto' }}
    />
  </Pressable>
);

export default Stats;