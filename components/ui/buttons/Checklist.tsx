

import { useTheme } from '@/context/ThemeContext';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const WeekChecklistComponent = () => {
    const { isDark } = useTheme()

    const [days, setDays] = useState({
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
    });
    return (
        <View className='w-full'>
            <View className='flex flex-row items-center justify-between p-2'>
                <Text className={`text-lg ${isDark ? "text-white" : "text-darkGray-500"} font-raleway`}>
                    Lunes
                </Text>
                <Checkbox
                    className='w-6 h-6'
                    value={days.monday}
                    onValueChange={() => setDays({
                        ...days,
                        monday: !days.monday
                    })}
                    color={days.monday ? `${isDark ? "#1c1c1c" : "#16243E"}` : `${isDark ? "#fff" : "#1c1c1c"}`}
                />
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
                <Text className={`text-lg ${isDark ? "text-white" : "text-darkGray-500"} font-raleway`}>
                    Martes
                </Text>
                <Checkbox
                    className='w-6 h-6'
                    value={days.tuesday}
                    onValueChange={() => setDays({
                        ...days,
                        tuesday: !days.tuesday
                    })}
                    color={days.tuesday ? `${isDark ? "#1c1c1c" : "#16243E"}` : `${isDark ? "#fff" : "#1c1c1c"}`}
                />
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
                <Text className={`text-lg ${isDark ? "text-white" : "text-darkGray-500"} font-raleway`}>
                    Miercoles
                </Text>
                <Checkbox
                    className='w-6 h-6'
                    value={days.wednesday}
                    onValueChange={() => setDays({
                        ...days,
                        wednesday: !days.wednesday
                    })}
                    color={days.wednesday ? `${isDark ? "#1c1c1c" : "#16243E"}` : `${isDark ? "#fff" : "#1c1c1c"}`}
                />
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
                <Text className={`text-lg ${isDark ? "text-white" : "text-darkGray-500"} font-raleway`}>
                    Jueves
                </Text>
                <Checkbox
                    className='w-6 h-6'
                    value={days.thursday}
                    onValueChange={() => setDays({
                        ...days,
                        thursday: !days.thursday
                    })}
                    color={days.thursday ? `${isDark ? "#1c1c1c" : "#16243E"}` : `${isDark ? "#fff" : "#1c1c1c"}`}
                />
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
                <Text className={`text-lg ${isDark ? "text-white" : "text-darkGray-500"} font-raleway`}>
                    Viernes
                </Text>
                <Checkbox
                    className='w-6 h-6'
                    value={days.friday}
                    onValueChange={() => setDays({
                        ...days,
                        friday: !days.friday
                    })}
                    color={days.friday ? `${isDark ? "#1c1c1c" : "#16243E"}` : `${isDark ? "#fff" : "#1c1c1c"}`}
                />
            </View>
        </View>
    );
};

export default WeekChecklistComponent;
