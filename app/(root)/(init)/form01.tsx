
import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import BigIconTextInputForm from '@/components/ui/form/BigIconTextInputForm';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const Form01 = () => {
    const { isDark } = useTheme()
    const {user, setUser} = useUser()
    const [ageInput, setAgeInput] = useState(String(0));

    const handleAgeChange = (e: string) => {
        let numericValue = e.replace(/[^0-9]/g, '');
        if (numericValue.startsWith('0')) {
            numericValue = numericValue.replace(/^0+/, '');
        }
        setAgeInput(numericValue);
        if (numericValue === '') {
            setUser({
                ...user,
                userAge: 0,
            });
        } else {
            setUser({
                ...user,
                userAge: parseInt(numericValue, 10),
            });
        }
    };
    return (
        <>
            <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                <BigIconTextInputForm
                    title='¿Cuántos años tienes?'
                    icon={<Ionicons name="balloon-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                    inputKeyboardType='number-pad'
                    inputPlaceholder='18'
                    inputSecure={false}
                    inputValue={ageInput}
                    inputOnChangeText={handleAgeChange}
                    />
            </View>

            <View >
                <View className={`py-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} flex flex-col items-center`}>
                    <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu género?</Text>
                    <RadioButtonIconComponent
                        options={["Másculino", "Femenino"]}
                        icons={[
                            <Ionicons name="male"
                                size={35}
                                color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                            <Ionicons name="female"
                                size={35}
                                color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                        ]}
                        rbComponentStyle='w-full mt-2'
                        rbIndividualRadioButtonStyle='h-10 flex flex-col items-center justify-center mb-2'
                        rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                    />

                </View>
            </View>
        </>
    );
};

export default Form01;
