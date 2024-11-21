import { useTheme } from "@/context/ThemeContext";
import { Food } from "@/types/interfaces/entities/foodplan";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import SquarePill from "../common/pills/SquarePill";

interface Props {
    food: Food;
}

export const FoodItem = ({ food }: Props) => {
    const { isDark } = useTheme();
    const defaultFoodImg = 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600';
    return (
        <View className='flex-col mb-1' >
            <View className='flex-row justify-between w-full mb-2'>
                <View className='w-1/2'>
                    <View className='flex-row items-center'>
                        <Ionicons name='basket-outline' size={24} color={isDark ? "white" : "black"} />
                        <Text className={`text-sm ml-2 font-ralewaySemiBold ${isDark ? "text-white" : "text-darkGray-900"}`}>
                            {food.name}
                        </Text>
                    </View>
                    <View className='flex-row items-center'>
                        <Ionicons name='information-circle-outline' size={24} color={isDark ? "white" : "black"} />
                        <Text className={`text-sm ml-2 font-ralewaySemiBold ${isDark ? "text-white" : "text-darkGray-900"}`}>
                            {food.description}
                        </Text>
                    </View>

                </View>
                <Image
                    source={{ uri: food.imageUrl ?? defaultFoodImg }}
                    className='w-24 h-24 rounded-md ' />
            </View>
            <View className='flex-row flex-wrap gap-x-2'>
                <SquarePill
                    icon='analytics-outline'
                    text={`${food.calories} kcals`} />
                <SquarePill
                    icon='analytics-outline'
                    text={`${food.proteins}g proteina`} />
                <SquarePill
                    icon='analytics-outline'
                    text={`${food.carbs}g carbs`} />
                <SquarePill
                    icon='analytics-outline'
                    text={`${food.fats}g grasas.`} />
            </View>
        </View>
    )
}