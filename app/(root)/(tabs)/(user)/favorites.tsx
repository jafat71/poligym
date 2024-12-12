import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";

import IconButton from "@/components/ui/common/buttons/IconButton";
import SimpleInfoComponent from "@/components/ui/common/info/SimpleInfoComponent";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { NutritionPlan } from "@/types/interfaces/entities/foodplan";
import { fetchFoodPlanById } from "@/lib/api/actions";
import FoodPlanListItemSmall from "@/components/ui/foodplan/FoodPlanListItemSmall";
import { getUserPlans, getUserWorkouts } from "@/lib/api/userActions";
import FavRoutineListCard from "@/components/ui/routines/FavRoutineListCard ";
import { WorkoutAPI } from "@/types/interfaces/entities/plan";

export default function Favorites() {
    const { isDark } = useTheme();
    const { loggedUserInfo, accessToken } = useUser();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [infoVisible, setInfoVisible] = useState(false);

    const queryClient = useQueryClient();
    const nutritionIds = loggedUserInfo?.nutritionIds;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const {
        data: workouts = [],
        isLoading,
        isError,
    } = useQuery<WorkoutAPI[]>({
        queryKey: ["workouts", "user"],
        queryFn: () => getUserWorkouts(accessToken!, loggedUserInfo?.id!),
        initialData: queryClient.getQueryData<WorkoutAPI[]>(["workouts", "user"]),
        enabled: !!nutritionIds?.length, // Solo habilita la consulta si hay IDs disponibles
    });

    const userHasFavoritesWorkouts = workouts?.length! > 0;
    //TODO: DELETE ON SLIDE COMPONENT
    return (
        <View className={`flex-1 bg-${isDark ? "darkGray-900" : "white"}`}>
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <View className="p-4 flex flex-row justify-between items-center">
                    <View className="flex flex-col">
                        <Text
                            className={`${isDark ? "text-white" : "text-darkGray-900"} font-ralewayBold text-4xl`}
                        >
                            Favoritos
                        </Text>
                    </View>
                    <IconButton
                        icon={<Ionicons name="information-circle-outline" size={24} color={isDark ? "white" : "#1c1c1c"} />}
                        onPress={() => setInfoVisible(!infoVisible)}
                    />
                </View>

                <View className="flex-1 px-4">
                    <Text
                        className={`${isDark ? "text-white" : "text-darkGray-900"} font-ralewayBold text-xl`}
                    >
                        Tus Rutinas 
                    </Text>
                    <View className="py-2">
                        {isLoading ? (
                            <Text className={`${isDark ? "text-white" : "text-darkGray-900"} font-raleway`}>Cargando rutinas...</Text>
                        ) : isError ? (
                            <Text className="text-red-500 font-raleway">Error al cargar las rutinas.</Text>
                        ) : userHasFavoritesWorkouts && workouts.length > 0 ? (
                            <FlatList
                                data={workouts}
                                renderItem={({ item }) => <FavRoutineListCard key={item.id} {...item} />}
                                keyExtractor={(item: WorkoutAPI) => item.id.toString()}
                                ListFooterComponent={<View className="h-4" />}
                            />
                        ) : (
                            <View>
                                <Text
                                    className={`${isDark ? "text-white" : "text-darkGray-900"} font-raleway text-sm`}
                                >
                                    No tienes ningún plan alimenticio activo. Puedes descubrir nuestros planes en la
                                    sección "Planes de Alimentación" de nuestra Biblioteca.
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </Animated.View>

            <SimpleInfoComponent
                text="En la sección Favoritos encontraras las rutinas que has marcado como favoritas y acceder a ellas facilmente,"
                modalVisible={infoVisible}
                toggleModal={() => setInfoVisible(!infoVisible)}
                pressable={
                    <Text className={`text-eOrange-500 font-ralewaySemiBold`}>
                        Si deseas conocer todas nuestras rutinas, puedes hacerlo en la sección "Rutinas" de nuestra Biblioteca.
                    </Text>
                }
            />
        </View>
    );
}
