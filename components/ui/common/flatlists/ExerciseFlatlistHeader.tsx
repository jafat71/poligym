import { memo, useCallback, useState } from "react";
import { Text, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/context/ThemeContext";

import { MuscleGroups } from "@/types/types/muscles";

import CustomSearchBar from "../searchbar/CustomSearchBar";
import FilterPill from "../pills/FilterPill";
import IconButton from "../buttons/IconButton";
import MusclePill from "../pills/MusclePill";
import { CATEGORY, DIFFICULTY, EquipmentApi } from "@/types/interfaces/entities/plan";
import MultiFilterPill from "../pills/MultiFilterPill";

interface ExerciseFlatlistHeaderProps {
    searchInput: string;
    handleSearchChange: (text: string) => void;
    isSearching: boolean;
    selectedDifficulty: DIFFICULTY;
    setSelectedDifficulty: (difficulty: DIFFICULTY) => void;
    selectedCategory: CATEGORY;
    setSelectedCategory: (category: CATEGORY) => void;
    muscleGroups: MuscleGroups[];
    selectedMuscleGroups: MuscleGroups[];
    toggleMuscleGroup: (muscle: MuscleGroups) => void;
    clearMuscleGroups: () => void;
    equipments: EquipmentApi[];
    selectedEquipment: EquipmentApi[];
    setSelectedEquipment: (equipment: EquipmentApi[]) => void;
}

export const ExerciseFlatlistHeader = memo(({
    searchInput,
    handleSearchChange,
    isSearching,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedCategory,
    setSelectedCategory,
    muscleGroups,
    selectedMuscleGroups,
    toggleMuscleGroup,
    clearMuscleGroups,
    equipments,
    selectedEquipment,
    setSelectedEquipment,
}: ExerciseFlatlistHeaderProps) => {
    const { isDark } = useTheme();
    const [showFilters, setShowFilters] = useState(false);
    const filterAnimation = useSharedValue(0);

    const toggleFilters = useCallback(() => {
        setShowFilters(prev => !prev);
        filterAnimation.value = withSpring(filterAnimation.value === 0 ? 1 : 0, {
            damping: 15,
            stiffness: 100,
        });
    }, []);

    const filterStyle = useAnimatedStyle(() => {
        return {
            maxHeight: interpolate(
                filterAnimation.value,
                [0, 1],
                [0, 500], // Ajusta este valor según tus necesidades
            ),
            opacity: filterAnimation.value,
            transform: [{
                translateY: interpolate(
                    filterAnimation.value,
                    [0, 1],
                    [-20, 0],
                ),
            }],
        };
    });

    return (
        <View className={`p-4 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
            <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-4xl font-ralewayBold mb-4`}>
                EJERCICIOS
            </Text>

            <CustomSearchBar    
                isSearching={isSearching}
                searchInput={searchInput}
                handleSearchChange={handleSearchChange}
                placeholder="Buscar Ejercicios..."
            />

            <View className="flex-row justify-between mb-2 ">
                {Object.values(DIFFICULTY).map((difficulty) => (
                    <FilterPill
                        key={difficulty}
                        value={difficulty}
                        label={difficulty}
                        selected={selectedDifficulty}
                        setSelected={setSelectedDifficulty as any}
                        isSearching={isSearching}
                    />
                ))}
            </View>

            <View className='items-end'>
                <IconButton
                    onPress={toggleFilters}
                    icon={<Ionicons name="filter" size={24} color={isDark ? "#fff" : "#374151"} />}
                />
            </View>

            <Animated.View style={filterStyle} className="overflow-hidden ">

                <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-sm font-ralewayBold mb-2`}>
                    Categorías
                </Text>

                <View className="flex-row justify-between mb-2">
                    {Object.values(CATEGORY).map((category) => (
                        <FilterPill
                            key={category}
                            value={category}
                            label={category}
                            selected={selectedCategory}
                            setSelected={setSelectedCategory as any}
                            isSearching={isSearching}
                        />
                    ))}
                </View>

                <View className="flex-row justify-between my-2">
                    <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-sm font-ralewayBold`}>
                        Grupos Musculares
                    </Text>
                    <View className='flex-row items-center gap-2'>
                        {selectedMuscleGroups.length > 0 && (
                            <IconButton
                                onPress={clearMuscleGroups}
                                icon={<Ionicons name="remove-circle-outline" size={24} color={isDark ? "#fff" : "#374151"} />}
                            />
                        )}
                    </View>
                </View>

                <View className="flex-row flex-wrap justify-between">
                    {muscleGroups.map((muscle) => (
                        <MusclePill
                            key={muscle}
                            muscle={muscle}
                            isSelected={selectedMuscleGroups.some(m => m === muscle)}
                            onToggle={() => toggleMuscleGroup(muscle)}
                            isSearching={isSearching}
                        />
                    ))}
                </View>

                <View className="flex-row justify-between my-2">
                    <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-sm font-ralewayBold`}>
                        Equipos
                    </Text>
                    <View className='flex-row items-center gap-2'>
                        {selectedEquipment.length > 0 && (
                            <IconButton
                                onPress={() => setSelectedEquipment([])}
                                icon={<Ionicons name="remove-circle-outline" size={24} color={isDark ? "#fff" : "#374151"} />}
                            />
                        )}
                    </View>
                </View>

                <View className="flex-row flex-wrap justify-between">
                    {equipments.map((equipment) => (
                        <MultiFilterPill
                            key={equipment.name}
                            value={equipment}
                            selected={selectedEquipment}
                            setSelected={setSelectedEquipment as any}
                            isSearching={isSearching}
                        />
                    ))}
                </View>

            </Animated.View>
        </View>
    )
})