import { useTheme } from "@/context/ThemeContext";
import { Meal, MEAL_TYPES } from "@/types/interfaces/entities/foodplan";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text } from "react-native";
import { View } from "react-native"
import { FoodItem } from "./FoodItem";

interface Props {
    meal: Meal;
}

export const DayMealItem = ({ meal}: Props) => {
    const { isDark } = useTheme();
    const defaultDayMealImg = 'https://images.pexels.com/photos/1391487/pexels-photo-1391487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    return (
        <View className={`
            flex flex-col w-full
            rounded-md `}>
                <View className='flex-row items-center'>
                    <Ionicons name='fast-food-outline' size={24} color={isDark ? "white" : "black"} />
                    <Text className={`text-lg ml-2 font-ralewayExtraBold ${isDark ? "text-white" : "text-darkGray-900"}`}>
                        {MEAL_TYPES[meal.type as unknown as keyof typeof MEAL_TYPES]}
                    </Text>
                </View>
                <View className='flex-col p-2 w-full '>
                <Image 
                    source={{ uri: meal.imageUrl ?? defaultDayMealImg }} 
                    className='w-full h-32 rounded-md' />
                    <View className='flex-row items-center p-1'>
                        <Ionicons name='restaurant-outline' size={24} color={isDark ? "white" : "black"} />
                        <Text className={`text-lg ml-2 font-ralewaySemiBold ${isDark ? "text-white" : "text-darkGray-900"}`}>
                            {meal.name}
                        </Text>
                    </View>
                    
                
                    <View className='flex-row items-center p-3'>
                        <Ionicons name='list-outline' size={24} color={isDark ? "white" : "black"} />
                        <Text className={`text-sm ml-2 font-ralewaySemiBold ${isDark ? "text-white" : "text-darkGray-900"}`}>
                            {meal.description}
                        </Text>
                    </View>

                    <View className='flex-col  items-center justify-center pl-3 '>
                        {
                            meal.foods.map((food) => (
                                <FoodItem food={food} key={food.id} />
                            ))
                        }
                    </View>
                </View>

            </View>
    )
}
