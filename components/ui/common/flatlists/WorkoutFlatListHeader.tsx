import { memo, useCallback, useState } from "react";
import { Text, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/context/ThemeContext";

import { MuscleGroups } from "@/types/types/muscles";

import CustomSearchBar from "../searchbar/CustomSearchBar";
import FilterPill from "../pills/FilterPill";
import IconButton from "../buttons/IconButton";
import { CATEGORY, DIFFICULTY } from "@/types/interfaces/entities/plan";

interface WorkoutFlatlistHeaderProps {
    searchInput: string;
    handleSearchChange: (text: string) => void;
    isSearching: boolean;
    selectedDifficulty: DIFFICULTY;
    setSelectedDifficulty: (difficulty: DIFFICULTY) => void;
    selectedCategory: CATEGORY;
    setSelectedCategory: (category: CATEGORY) => void;
}

export const WorkoutFlatlistHeader = memo(({
    searchInput,
    handleSearchChange,
    isSearching,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedCategory,
    setSelectedCategory,
}: WorkoutFlatlistHeaderProps) => {
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
        <View className={`p-4 ${isDark ? "bg-blueEPN-900" : "bg-blueEPN-500"}`}>
            <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-4xl font-ralewayBold mb-4`}>
                RUTINAS
            </Text>

            <CustomSearchBar    
                isSearching={isSearching}
                searchInput={searchInput}
                handleSearchChange={handleSearchChange}
                placeholder="Buscar Rutinas..."
            />

            <View className="flex-row justify-between mb-2 ">
                {Object.values(DIFFICULTY).map((value) => (
                    <FilterPill
                        key={value}
                        value={value}
                        label={value}
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
                    {Object.values(CATEGORY).map((value) => (
                        <FilterPill
                            key={value}
                            value={value}
                            label={value}
                            selected={selectedCategory}
                            setSelected={setSelectedCategory as any}
                            isSearching={isSearching}
                        />
                    ))}
                </View>

            </Animated.View>
        </View>
    )
})
