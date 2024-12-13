import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, RefreshControl, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import IconButton from "@/components/ui/common/buttons/IconButton";
import SimpleInfoComponent from "@/components/ui/common/info/SimpleInfoComponent";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { NutritionPlan } from "@/types/interfaces/entities/foodplan";
import { getUserFoodPlans, getUserTrainingPlans, getUserWorkouts } from "@/lib/api/userActions";
import FoodPlanListItemSmall from "@/components/ui/foodplan/FoodPlanListItemSmall";
import FavPlanListItem from "@/components/ui/plans/FavPlanListItem";
import { TrainingPlanAPI, WorkoutAPI } from "@/types/interfaces/entities/plan";
import { List } from "react-native-paper";
import FavRoutineListCard from "@/components/ui/routines/FavRoutineListCard ";

export default function Favorites() {
    const { isDark } = useTheme();
    const { loggedUserInfo, accessToken } = useUser();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [infoVisible, setInfoVisible] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const queryClient = useQueryClient();

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
    });

    const {
        data: foodPlans = [],
        isLoading: isLoadingFoodPlans,
        isError: isErrorFoodPlans,
    } = useQuery<NutritionPlan[]>({
        queryKey: ["foodplans", "user"],
        queryFn: () => getUserFoodPlans(accessToken!, loggedUserInfo?.id!),
        initialData: queryClient.getQueryData<NutritionPlan[]>(["foodplans", "user"]),
    });

    const {
        data: trainingPlans = [],
        isLoading: isLoadingTrainingPlans,
        isError: isErrorTrainingPlans,
    } = useQuery<TrainingPlanAPI[]>({
        queryKey: ["trainingplans", "user"],
        queryFn: () => getUserTrainingPlans(accessToken!, loggedUserInfo?.id!),
        initialData: queryClient.getQueryData<TrainingPlanAPI[]>(["trainingplans", "user"]),
    });

    console.log(workouts);
    console.log(foodPlans);
    console.log(trainingPlans);

    const onRefresh = async () => {
        setIsRefreshing(true);
        try {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["workouts", "user"] }),
                queryClient.invalidateQueries({ queryKey: ["foodplans", "user"] }),
                queryClient.invalidateQueries({ queryKey: ["trainingplans", "user"] }),
            ]);
        } finally {
            setIsRefreshing(false);
        }
    };

    const data = [
        {
            title: "Rutinas",
            key: "workouts",
            icon: "body",
            data: workouts,
            isLoading,
            isError,
            renderItem: ({ item }: { item: WorkoutAPI }) => <FavRoutineListCard key={item.id} {...item} />,
        },
        {
            title: "Planes Alimenticios",
            key: "foodplans",
            icon: "nutrition",
            data: foodPlans,
            isLoading: isLoadingFoodPlans,
            isError: isErrorFoodPlans,
            renderItem: ({ item }: { item: NutritionPlan }) => <FoodPlanListItemSmall key={item.id} {...item} />,
        },
        {
            title: "Planes de Entrenamiento",
            key: "trainingplans",
            icon: "calendar",
            data: trainingPlans,
            isLoading: isLoadingTrainingPlans,
            isError: isErrorTrainingPlans,
            renderItem: ({ item }: { item: TrainingPlanAPI }) => <FavPlanListItem key={item.id} {...item} />,
        },
    ];

    return (
        <View className={`flex-1 ${isDark ? "bg-darkGray-900" : "bg-white"}`}>
            <Animated.View style={{ flex: 1, opacity: fadeAnim, backgroundColor: isDark ? "#080808" : "#fff" }}>
                <FlatList
                    ListHeaderComponent={
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
                    }
                    data={data}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
                    renderItem={({ item }) => (
                        <List.Section>
                            <List.Accordion
                                title={
                                    <Text className={`${isDark ? "text-white" : "text-darkGray-900"} font-ralewayBold text-xl`}>
                                        {item.title}
                                    </Text>
                                }
                                style={{ 
                                    backgroundColor: isDark ? "#1c1c1c" : "#f5f5f5",
                                    borderBottomWidth: 1,
                                    borderBottomColor: isDark ? "#333" : "#e0e0e0",
                                    padding: 0,
                                    alignItems: "flex-start",
                                }}
                                left={() => 
                                <View className="flex flex-row items-center pl-4">
                                    <Ionicons name={item.icon as any} size={24} color={isDark ? "white" : "#1c1c1c"} />
                                </View>
                                }
                                right={() => 
                                <View className="flex flex-row items-center ">
                                    <Text className={`${isDark ? "text-white" : "text-darkGray-900"} font-ralewaySemiBold text-xl`}>
                                        {item.data.length}
                                    </Text>
                                </View>
                                }
                            >
                                {item.isLoading ? (
                                    <Text className={`${isDark ? "text-white" : "text-darkGray-900"} font-raleway`}>Cargando...</Text>
                                ) : item.isError ? (
                                    <Text className="text-red-500 font-raleway">Error al cargar.</Text>
                                ) : item.data.length > 0 ? (
                                    <FlatList
                                        data={item.data as any}
                                        renderItem={item.renderItem as any}
                                        keyExtractor={(dataItem) => dataItem.id.toString()}
                                    />
                                ) : (
                                    <Text className={`${isDark ? "text-white" : "text-darkGray-900"} font-raleway text-sm`}>
                                        No tienes {item.title.toLowerCase()} favoritos.
                                    </Text>
                                )}
                            </List.Accordion>
                        </List.Section>
                    )}
                    keyExtractor={(item) => item.key}
                />
                <SimpleInfoComponent
                    text="En la sección Favoritos encontraras las rutinas que has marcado como favoritas y acceder a ellas fácilmente."
                    modalVisible={infoVisible}
                    toggleModal={() => setInfoVisible(!infoVisible)}
                    pressable={
                        <Text className={`text-eOrange-500 font-ralewaySemiBold`}>
                            Si deseas conocer todas nuestras rutinas, puedes hacerlo en la sección "Rutinas" de nuestra Biblioteca.
                        </Text>
                    }
                />
            </Animated.View>
        </View>
    );
}
