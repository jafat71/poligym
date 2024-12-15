import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";


interface StatsSmallCardProps {
    label: string;
    value: string;
}

export const StatsSmallCard = ({ label, value }: StatsSmallCardProps) => {
    const { isDark } = useTheme()   
    return (
        <View
            className={`p-4 rounded-xl w-1/3`}
        >
        <Text className={`text-xs font-ralewayBold mb-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {label}
        </Text>
        <Text className={`text-3xl font-semibold ${isDark ? "text-white" : "text-black"}`}>
            {value}
        </Text>
        </View>
    );
};