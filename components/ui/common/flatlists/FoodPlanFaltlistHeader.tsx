import { memo } from 'react';
import { View, Text } from 'react-native';

import FilterPill from '@/components/ui/common/pills/FilterPill';
import CustomSearchBar from '@/components/ui/common/searchbar/CustomSearchBar';

import { FOOD_PLAN_CATEGORIES, FoodCategorySearch } from '@/constants';

interface FoodPlanFlatlistHeaderProps {
    isDark: boolean;
    searchInput: string;
    handleSearchChange: (text: string) => void;
    isSearching: boolean;
    selectedCategory: FoodCategorySearch;
    setSelectedCategory: (category: FoodCategorySearch) => void;
}

export const FoodPlanFlatlistHeader = memo(({
    isDark,
    searchInput,
    handleSearchChange,
    isSearching,
    selectedCategory,
    setSelectedCategory,
}: FoodPlanFlatlistHeaderProps) => (
    <View className={`mb-4 p-4 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
        <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-4xl font-ralewayBold mb-4`}>
            PLANES DE ALIMENTACIÓN
        </Text>

        <CustomSearchBar
            isSearching={isSearching}
            searchInput={searchInput}
            handleSearchChange={handleSearchChange}
            placeholder="Buscar Planes de alimentación..."
        />

        <View className="flex-row justify-between mb-2">
            {FOOD_PLAN_CATEGORIES.map(({ value, label }) => (
                <FilterPill
                    key={value}
                    value={value}
                    label={label}
                    selected={selectedCategory}
                    setSelected={setSelectedCategory as any}
                    isSearching={isSearching}
                />
            ))}
        </View>
    </View>
));
