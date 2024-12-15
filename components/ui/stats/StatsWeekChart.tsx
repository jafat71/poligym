import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '@/context/ThemeContext';
import { Dimensions } from 'react-native';

export const StatsWeekChart = () => {
    const { isDark } = useTheme();

    const mockData = {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [{
            data: [45, 60, 10, 30, 75, 10, 0], // minutos de ejercicio por día
        }]
    };

    return (
        <View className="mt-4">
            <LineChart
                data={mockData}
                width={Dimensions.get('window').width} 
                height={180}
                chartConfig={{
                    backgroundColor: isDark ? '#080808' : '#ffffff',
                    backgroundGradientFrom: isDark ? '#080808' : '#ffffff',
                    backgroundGradientTo: isDark ? '#080808' : '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0,85,249, ${opacity})`,
                    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                    propsForDots: {
                        r: "0",
                    },
                    linejoinType: 'bevel',
                    paddingRight: 0,
                    fillShadowGradientOpacity: 1,
                    fillShadowGradientFrom: '#0055f9',
                    fillShadowGradientTo: '#0055f9',
                    propsForBackgroundLines: {
                        strokeWidth: 0,
                    },
                }}
                yAxisSuffix="m"
                yAxisInterval={1}
            />
        </View>
    );
};