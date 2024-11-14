import { memo } from 'react';
import { View, Text } from 'react-native';

import FilterPill from '@/components/ui/common/pills/FilterPill';
import CustomSearchBar from '@/components/ui/common/searchbar/CustomSearchBar';

import { DIFFICULTIES, DifficultySearch } from '@/constants';

interface PlanFlatlistHeaderProps {
    isDark: boolean;
    searchInput: string;
    handleSearchChange: (text: string) => void;
    isSearching: boolean;
    selectedDifficulty: DifficultySearch;
    setSelectedDifficulty: (difficulty: DifficultySearch) => void;
}

export const PlanFlatlistHeader = memo(({
    isDark,
    searchInput,
    handleSearchChange,
    isSearching,
    selectedDifficulty,
    setSelectedDifficulty,
}: PlanFlatlistHeaderProps) => (
    <View className={`mb-4 p-4 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
        <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-4xl font-ralewayBold mb-4`}>
            PLANES DE ENTRENAMIENTO
        </Text>

        <CustomSearchBar
            isSearching={isSearching}
            searchInput={searchInput}
            handleSearchChange={handleSearchChange}
            placeholder="Buscar Planes de entrenamiento..."
        />

        <View className="flex-row justify-between mb-2">
            {DIFFICULTIES.map(({ value, label }) => (
                <FilterPill
                    key={value}
                    value={value}
                    label={label}
                    selected={selectedDifficulty}
                    setSelected={setSelectedDifficulty as any}
                    isSearching={isSearching}
                />
            ))}
        </View>
    </View>
));
