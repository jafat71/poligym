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
    const tabBarActiveColor = "#0055f4";

    return (
        <View 
        testID={`${name}-tab`}
        className={`p-4 ${focused ? `${isDark ? 'bg-darkGray-900' : 'bg-gray-200'} rounded-full` : ''}`}>
            <Ionicons name={name as any} size={26} color={focused ? tabBarActiveColor : color} />
        </View>
    );
};

export default TabIcon;