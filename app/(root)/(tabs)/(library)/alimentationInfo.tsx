import { useNavigationFlowContext } from '@/context/NavFlowContext';
import React from 'react';
import { Text, View, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

const AlimentationInfo = () => {
    const { screenLibAlimentacion } = useNavigationFlowContext();
    const { isDark } = useTheme();

    return (
        <View className="flex-1">
            {/* Botón de regreso */}
            <Pressable 
                onPress={() => router.back()}
                className="absolute top-4 left-4 z-10 p-2 rounded-full"
                style={{
                    backgroundColor: isDark ? 'rgba(32, 32, 32, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                }}
            >
                <Ionicons 
                    name="arrow-back" 
                    size={24} 
                    color={isDark ? "#fff" : "#000"}
                />
            </Pressable>

            <ScrollView 
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {/* Imagen de cabecera */}
                <Image 
                    source={{ uri: screenLibAlimentacion?.imagenPlanAlimentacion }}
                    className="w-full h-48"
                    style={{ resizeMode: 'cover' }}
                />

                <View className="px-4 pt-4">
                    {/* Encabezado del plan */}
                    <View className="mb-6">
                        <Text 
                            className={`font-ralewayBold text-2xl mb-2 ${
                                isDark ? "text-white" : "text-black"
                            }`}
                        >
                            {screenLibAlimentacion?.nombre}
                        </Text>
                        <View className="flex-row justify-between items-center">
                            <View className="bg-eBlue-500 px-3 py-1 rounded-full">
                                <Text className="text-white font-ralewayMedium">
                                    {screenLibAlimentacion?.categoria}
                                </Text>
                            </View>
                            <Text 
                                className={`font-ralewayMedium ${
                                    isDark ? "text-gray-300" : "text-gray-600"
                                }`}
                            >
                                Duración: {screenLibAlimentacion?.duracion} semanas
                            </Text>
                        </View>
                    </View>

                    {/* Descripción */}
                    <View className="mb-6">
                        <Text 
                            className={`font-ralewayMedium ${
                                isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            {screenLibAlimentacion?.descripcion}
                        </Text>
                    </View>

                    {/* Plan semanal */}
                    <View className="mb-6">
                        <Text 
                            className={`font-ralewayBold text-xl mb-4 ${
                                isDark ? "text-white" : "text-black"
                            }`}
                        >
                            Plan Semanal
                        </Text>
                        {Object.entries(screenLibAlimentacion?.detalleDias || {}).map(([dia, comidas]) => (
                            <View 
                                key={dia}
                                className={`p-4 mb-4 rounded-lg ${
                                    isDark ? "bg-darkGray-400" : "bg-gray-100"
                                }`}
                            >
                                <Text 
                                    className={`font-ralewayBold text-lg mb-3 capitalize ${
                                        isDark ? "text-white" : "text-black"
                                    }`}
                                >
                                    {dia}
                                </Text>
                                
                                {/* Desayuno */}
                                <View className="mb-3">
                                    <Text 
                                        className={`font-ralewayBold mb-1 ${
                                            isDark ? "text-eBlue-500" : "text-eBlue-600"
                                        }`}
                                    >
                                        Desayuno
                                    </Text>
                                    <Text 
                                        className={`font-ralewayMedium ${
                                            isDark ? "text-gray-300" : "text-gray-600"
                                        }`}
                                    >
                                        {comidas.desayuno}
                                    </Text>
                                </View>

                                {/* Almuerzo */}
                                <View className="mb-3">
                                    <Text 
                                        className={`font-ralewayBold mb-1 ${
                                            isDark ? "text-eBlue-500" : "text-eBlue-600"
                                        }`}
                                    >
                                        Almuerzo
                                    </Text>
                                    <Text 
                                        className={`font-ralewayMedium ${
                                            isDark ? "text-gray-300" : "text-gray-600"
                                        }`}
                                    >
                                        {comidas.almuerzo}
                                    </Text>
                                </View>

                                {/* Cena */}
                                <View>
                                    <Text 
                                        className={`font-ralewayBold mb-1 ${
                                            isDark ? "text-eBlue-500" : "text-eBlue-600"
                                        }`}
                                    >
                                        Cena
                                    </Text>
                                    <Text 
                                        className={`font-ralewayMedium ${
                                            isDark ? "text-gray-300" : "text-gray-600"
                                        }`}
                                    >
                                        {comidas.cena}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Estadísticas */}
                    <View 
                        className={`p-4 mb-6 rounded-lg ${
                            isDark ? "bg-darkGray-400" : "bg-gray-100"
                        }`}
                    >
                        <Text 
                            className={`font-ralewayMedium ${
                                isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            {screenLibAlimentacion?.usos} personas siguen este plan
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default AlimentationInfo;