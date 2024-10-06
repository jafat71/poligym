import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

const Form03 = () => {
    const { isDark } = useTheme()
    return (
        <>
            <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} flex flex-col items-center`}>
                <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu objetivo?</Text>
                <RadioButtonIconComponent
                    options={["Bajar de Peso", "Ganar Músculo", "Mantenerse en forma"]}
                    icons={[
                        <Ionicons name="nutrition-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="barbell-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="fitness-sharp"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                    ]}
                    rbComponentStyle='w-full mt-2'
                    rbIndividualRadioButtonStyle='h-10 flex flex-col items-center justify-center mb-2'
                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                />

            </View>
            <View className={`pt-5 flex flex-col items-center`}>
                <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu experiencia?</Text>
                <RadioButtonIconComponent
                    options={["Principiante", "Intermedio", "Avanzado"]}
                    icons={[
                        <Ionicons name="star-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="star-half-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="star"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                    ]}
                    rbComponentStyle='w-full mt-2'
                    rbIndividualRadioButtonStyle='h-10 flex flex-col items-center justify-center mb-2'
                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                />

            </View>
        </>
    );
};

export default Form03;
