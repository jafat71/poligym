// import { useNavigationFlowContext } from '@/context/NavFlowContext';
// import React from 'react';
// import { Text, View, ScrollView, Pressable, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { useTheme } from '@/context/ThemeContext';

// const ExerciseInfo = () => {
//     const { screenLibExercise } = useNavigationFlowContext();
//     const { isDark } = useTheme();

//     return (
//         <View className="flex-1">
//             {/* Botón de regreso */}
//             <Pressable 
//                 onPress={() => router.back()}
//                 className="absolute top-4 left-4 z-10 p-2 rounded-full"
//                 style={{
//                     backgroundColor: isDark ? 'rgba(32, 32, 32, 0.8)' : 'rgba(255, 255, 255, 0.8)',
//                 }}
//             >
//                 <Ionicons 
//                     name="arrow-back" 
//                     size={24} 
//                     color={isDark ? "#fff" : "#000"}
//                 />
//             </Pressable>

//             <ScrollView 
//                 className="flex-1"
//                 showsVerticalScrollIndicator={false}
//             >
//                 {/* Video o imagen del ejercicio */}
//                 <Image 
//                     source={{ uri: screenLibExercise?.url }}
//                     className="w-full h-64"
//                     style={{ resizeMode: 'cover' }}
//                 />

//                 <View className="px-4 pt-4">
//                     {/* Título y categoría */}
//                     <View className="mb-6">
//                         <Text 
//                             className={`font-ralewayBold text-2xl mb-2 ${
//                                 isDark ? "text-white" : "text-black"
//                             }`}
//                         >
//                             {screenLibExercise?.nombre}
//                         </Text>
//                         <View className="bg-eBlue-500 self-start px-3 py-1 rounded-full">
//                             <Text className="text-white font-ralewayMedium">
//                                 {screenLibExercise?.categoria}
//                             </Text>
//                         </View>
//                     </View>

//                     {/* Músculos trabajados */}
//                     <View className="mb-6">
//                         <Text 
//                             className={`font-ralewayBold text-lg mb-2 ${
//                                 isDark ? "text-white" : "text-black"
//                             }`}
//                         >
//                             Músculos trabajados
//                         </Text>
//                         <View className="flex-row flex-wrap gap-2">
//                             {screenLibExercise?.musculos.map((musculo, index) => (
//                                 <View 
//                                     key={index}
//                                     className={`px-3 py-1 rounded-full ${
//                                         isDark ? "bg-darkGray-400" : "bg-gray-200"
//                                     }`}
//                                 >
//                                     <Text 
//                                         className={`font-ralewayMedium ${
//                                             isDark ? "text-gray-300" : "text-gray-600"
//                                         }`}
//                                     >
//                                         {musculo}
//                                     </Text>
//                                 </View>
//                             ))}
//                         </View>
//                     </View>

//                     {/* Información adicional */}
//                     <View className="mb-6">
//                         <Text 
//                             className={`font-ralewayBold text-lg mb-2 ${
//                                 isDark ? "text-white" : "text-black"
//                             }`}
//                         >
//                             Detalles del ejercicio
//                         </Text>
//                         <View 
//                             className={`p-4 rounded-lg ${
//                                 isDark ? "bg-darkGray-400" : "bg-gray-100"
//                             }`}
//                         >
//                             {/* Dificultad */}
//                             <View className="flex-row justify-between mb-3">
//                                 <Text 
//                                     className={`font-ralewayMedium ${
//                                         isDark ? "text-gray-300" : "text-gray-600"
//                                     }`}
//                                 >
//                                     Dificultad
//                                 </Text>
//                                 <Text 
//                                     className={`font-ralewayBold ${
//                                         isDark ? "text-white" : "text-black"
//                                     }`}
//                                 >
//                                     {screenLibExercise?.dificultad}
//                                 </Text>
//                             </View>

//                             {/* Implemento */}
//                             <View className="flex-row justify-between">
//                                 <Text 
//                                     className={`font-ralewayMedium ${
//                                         isDark ? "text-gray-300" : "text-gray-600"
//                                     }`}
//                                 >
//                                     Equipamiento
//                                 </Text>
//                                 <Text 
//                                     className={`font-ralewayBold ${
//                                         isDark ? "text-white" : "text-black"
//                                     }`}
//                                 >
//                                     {screenLibExercise?.implemento}
//                                 </Text>
//                             </View>
//                         </View>
//                     </View>

//                     {/* Botón de ejecutar ejercicio */}
//                     <Pressable 
//                         onPress={() => {
//                             // Aquí iría la lógica para ejecutar el ejercicio
//                         }}
//                         className="bg-eBlue-500 p-4 rounded-lg items-center mb-6"
//                     >
//                         <Ionicons name="play-outline" size={24} color="#fff" />
//                         <Text className="text-white font-ralewayBold mt-1">
//                             Ejecutar ejercicio
//                         </Text>
//                     </Pressable>
//                 </View>
//             </ScrollView>
//         </View>
//     );
// }

// export default ExerciseInfo;