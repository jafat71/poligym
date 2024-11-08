import { View, Text, Pressable } from 'react-native'
import React from 'react'
import WeekCalendar from './weekCalendar'
import { useTheme } from '@/context/ThemeContext'
import { useUser } from '@/context/UserContext'
import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';


const TimeLineChart = () => {
    const { isDark } = useTheme();
    
    // Datos de ejemplo - 7 días
    const mockData = {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [{
            data: [45, 60, 0, 30, 75, 45, 0], // minutos de ejercicio por día
        }]
    };

    return (
        <View className="mt-4">
            <LineChart
                data={mockData}
                width={Dimensions.get('window').width - 32} // -32 para los márgenes
                height={180}
                chartConfig={{
                    backgroundColor: isDark ? '#1F2937' : '#ffffff',
                    backgroundGradientFrom: isDark ? '#1F2937' : '#ffffff',
                    backgroundGradientTo: isDark ? '#1F2937' : '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: isDark ? "#3B82F6" : "#2563EB"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                yAxisSuffix="m"
                yAxisInterval={1}
            />
        </View>
    );
};

const TimeResumeFull = () => {
    const { isDark } = useTheme()
    const { loggedUserInfo } = useUser()
    return (
        <View className={`px-4`}>
            <View className='flex flex-row items-center justify-between my-1'>
                <View className='flex flex-row items-center justify-center gap-x-1'>
                    <Ionicons name="calendar-outline" size={14} color={isDark ? "white" : "black"} />
                    <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
            font-ralewayBold 
            `}>
                        Tu semana
                    </Text>
                </View>
            </View>
            <WeekCalendar />
            <View className='flex flex-row items-start justify-between my-2'>

                <View >
                    <Text className={`font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Tiempo Trabajado</Text>
                    <Text className={`text-xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>00h00m</Text>
                </View>
                <View >
                    <Text className={`text-sm font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Dias Activo</Text>
                    <Text className={`text-xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{loggedUserInfo?.userNumberActivityDays}</Text>
                </View>

            </View>
            <TimeLineChart />
        </View>
    )
}

export default TimeResumeFull