import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '@/context/ThemeContext';
import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

interface StatsCustomChartProps {
    data: number[];
    labels: string[];
}

interface ChartData {
    labels: string[];
    datasets: {
        data: number[];
    }[];
}

export const StatsCustomChart = ({ data, labels }: StatsCustomChartProps) => {
    if(!data) return null;
    if(!labels) return null;
    if (data.length === 0) return null;
    const { isDark } = useTheme();

    const [chartData, setChartData] = useState<ChartData>({
        labels: labels,
        datasets: [{
            data: [...data]
        }]
    });

    useEffect(() => {
        setChartData({
            labels: labels,
            datasets: [{ data: [...data] }]
        });
    }, [data]);

    return (
        <View className="mt-4">
            <LineChart
                data={chartData}
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