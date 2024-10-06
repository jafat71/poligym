import WeekChecklistComponent from '@/components/ui/buttons/Checklist';
import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const Form06 = () => {
    const { isDark } = useTheme()

    return (
        <>
            <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                <View className={`pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} w-full items-center`}>
                    <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>¿Cuál es tu horario preferido de entrenamiento?</Text>
                </View>

                <RadioButtonIconComponent
                    options={["Mañana", "Tarde"]}
                    icons={[
                        <Ionicons name="sunny-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="partly-sunny-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                    ]}
                    rbComponentStyle='w-full '
                    rbIndividualRadioButtonStyle='h-12 flex flex-col items-center justify-center mb-2 '
                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                />


                <WeekChecklistComponent/>

            </View>
        </>
    );
};

export default Form06;
