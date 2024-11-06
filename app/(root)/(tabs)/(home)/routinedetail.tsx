import GoBackUpButton from "@/components/ui/common/buttons/GoBackUpButton";
import ExerciseCard from "@/components/ui/exercises/RoutineExerciseCard";
import HeaderRoutineComponent from "@/components/ui/routines/HeaderRoutineComponent";
import { useNavigationFlowContext } from "@/context/NavFlowContext";
import { useTheme } from "@/context/ThemeContext";
import { IndividualExercise } from "@/types/interfaces/entities/plan";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { SafeAreaView } from "react-native-safe-area-context";

const RoutineDetail = () => {
    const { screenRoutine, setScreenPlayExercises } = useNavigationFlowContext();
    const [exercises, setExercises] = useState<IndividualExercise[]>([]);
    const { isDark } = useTheme();
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`;

    const renderItem = ({ item, drag, isActive }: RenderItemParams<IndividualExercise>) => (
        <ExerciseCard exercise={item} onDrag={drag} isActive={isActive} />
    );

    useEffect(() => {
        //TODO: show skeleton while loading
        setExercises(screenRoutine?.ejercicios || []);
    }, [screenRoutine]);


    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkGray-500' : 'bg-white'}`}>
            <GoBackUpButton />
            <View className="h-[60px] w-full items-center justify-center">
                <Text className={`${textStyle} text-center text-xl font-ralewayExtraBold`}>
                    {screenRoutine?.nombre}
                </Text>
            </View>
            
            <View className="flex-1">
                <DraggableFlatList
                    ListHeaderComponent={<HeaderRoutineComponent screenRoutine={screenRoutine!} />}
                    data={exercises!}
                    onDragEnd={({ data }) => setExercises([...data])}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    scrollEnabled={true}
                    containerStyle={{ flexGrow: 1 }} // Permite que ocupe el espacio necesario sin empujar otros componentes
                />
            </View>
            <Pressable 
            onPress={() => {
                setScreenPlayExercises(exercises)
                router.push("/(tabs)/(home)/playexercise")
            }}
            className="w-full bg-eBlue-500 rounded-md p-4 my-2">
                <Text className="text-white text-center font-ralewayBold text-lg">
                    Empezar
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default RoutineDetail;
