import RadioButtonComponent from '@/components/ui/buttons/RadioButton';
import { useTheme } from '@/context/ThemeContext';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Switch, Text, TextInput, View } from 'react-native';

const Form06 = () => {
    const { isDark } = useTheme()
    const [days, setDays] = useState({
        "monday" : false,
        "tuesday" : false,
        "wednesday" : false,
        "thursday" : false,
        "friday" : false,
    });
    return (
        <>
            <View className='my-2'>
                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>¿Cuál es tu horario preferido de entrenamiento?</Text>
                <RadioButtonComponent
                    options={["Mañana", "Tarde"]}
                />

                <View className='p-2'>

                    <View className='flex flex-row items-center justify-between p-2'>
                        <Text className='text-xl text-white font-raleway'>
                            Lunes
                        </Text>
                        <Checkbox
                            className='w-10 h-10'
                            value={days.monday}
                            onValueChange={()=>setDays({
                                ...days,
                                monday: !days.monday
                            })}
                            color={days.monday ? `${ isDark ? "#0059FF" : "#16243E"}` : `${ isDark ? "#0059FF" : "#1c1c1c"}`}
                        />
                    </View>

                    <View className='flex flex-row items-center justify-between p-2'>
                        <Text className='text-xl text-white font-raleway'>
                            Martes
                        </Text>
                        <Checkbox
                            className='w-10 h-10'
                            value={days.tuesday}
                            onValueChange={()=>setDays({
                                ...days,
                                tuesday: !days.tuesday
                            })}
                            color={days.tuesday ? `${ isDark ? "#0059FF" : "#16243E"}` : `${ isDark ? "#0059FF" : "#1c1c1c"}`}
                        />
                    </View>

                    <View className='flex flex-row items-center justify-between p-2'>
                        <Text className='text-xl text-white font-raleway'>
                            Miercoles
                        </Text>
                        <Checkbox
                            className='w-10 h-10'
                            value={days.wednesday}
                            onValueChange={()=>setDays({
                                ...days,
                                wednesday: !days.wednesday
                            })}
                            color={days.wednesday ? `${ isDark ? "#0059FF" : "#16243E"}` : `${ isDark ? "#0059FF" : "#1c1c1c"}`}
                        />
                    </View>

                    <View className='flex flex-row items-center justify-between p-2'>
                        <Text className='text-xl text-white font-raleway'>
                            Jueves
                        </Text>
                        <Checkbox
                            className='w-10 h-10'
                            value={days.thursday}
                            onValueChange={()=>setDays({
                                ...days,
                                thursday: !days.thursday
                            })}
                            color={days.thursday ? `${ isDark ? "#0059FF" : "#16243E"}` : `${ isDark ? "#0059FF" : "#1c1c1c"}`}
                        />
                    </View>

                    <View className='flex flex-row items-center justify-between p-2'>
                        <Text className='text-xl text-white font-raleway'>
                            Viernes
                        </Text>
                        <Checkbox
                            className='w-10 h-10'
                            value={days.friday}
                            onValueChange={()=>setDays({
                                ...days,
                                friday: !days.friday
                            })}
                            color={days.friday ? `${ isDark ? "#0059FF" : "#16243E"}` : `${ isDark ? "#0059FF" : "#1c1c1c"}`}
                        />
                    </View>
                </View>



            </View>
        </>
    );
};

export default Form06;
