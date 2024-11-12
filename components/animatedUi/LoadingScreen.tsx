

import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const LoadingScreen = () => {

    const { isDark } = useTheme();
    return (
        <View className={`flex-1 flex-col items-center justify-center z-10 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
            <ActivityIndicator size={'large'} color={isDark ? '#fff' : '#000'} />
        </View>
    );
};

export default LoadingScreen;
