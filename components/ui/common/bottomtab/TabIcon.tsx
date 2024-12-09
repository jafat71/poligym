import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/context/ThemeContext';

interface TabIconProps {
    focused: boolean;
    color: string;
    name: string;
}

const TabIcon = ({ focused, color, name }: TabIconProps) => {
    const { isDark } = useTheme();
    const tabBarActiveColor = "#ff5722";

    return (
        <View className={`p-4 ${focused ? `${isDark ? 'bg-blueEPN-500' : 'bg-blueEPN-900'} rounded-full` : ''}`}>
            <Ionicons name={name as any} size={26} color={focused ? tabBarActiveColor : color} />
        </View>
    );
};

export default TabIcon;