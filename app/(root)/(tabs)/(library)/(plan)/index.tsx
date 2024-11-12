import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { View, FlatList, Text, ListRenderItem } from 'react-native';

import debounce from 'lodash/debounce';

import { fetchTrainingPlans } from '@/lib/api/actions';

import { useTheme } from '@/context/ThemeContext';
import { useQuery } from '@tanstack/react-query';

import { TrainingPlanAPI } from '@/types/interfaces/entities/plan';

import { DIFFICULTIES, DifficultySearch } from '@/constants';

import LoadingScreen from '@/components/animatedUi/LoadingScreen';
import PlanSmallCard from '@/components/ui/plans/PlanSmallCard';
import CustomSearchBar from '@/components/ui/common/searchbar/CustomSearchBar';
import FilterPill from '@/components/ui/common/pills/FilterPill';

const ListHeader = React.memo(({
    isDark,
    searchInput,
    handleSearchChange,
    isSearching,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredPlans,
}: {
    isDark: boolean;
    searchInput: string;
    handleSearchChange: (text: string) => void;
    isSearching: boolean;
    selectedDifficulty: DifficultySearch;
    setSelectedDifficulty: (difficulty: DifficultySearch) => void;
    filteredPlans: number;
}) => (
    <View className={`mb-4 p-4 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
        <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-2xl font-ralewayBold mb-4`}>
            PLANES DE ENTRENAMIENTO
        </Text>
        
        <CustomSearchBar 
            isSearching={isSearching}
            searchInput={searchInput}
            handleSearchChange={handleSearchChange}
        />

        <View className="flex-row justify-between mb-2">
            {DIFFICULTIES.map(({ value, label }) => (
                <FilterPill
                    value={value}
                    label={label}
                    selectedDifficulty={selectedDifficulty}
                    setSelectedDifficulty={setSelectedDifficulty as any}
                    isSearching={isSearching}
                />
            ))}
        </View>

        <Text className={`font-raleway text-sm mt-2 ${isDark ? "text-white" : "text-darkGray-500"}`}>
            {isSearching 
                ? "Buscando..." 
                : `${filteredPlans} plan${filteredPlans !== 1 ? 'es' : ''} encontrado${filteredPlans !== 1 ? 's' : ''}`
            }
        </Text>
    </View>
));

export default function Plan() {
    const { isDark } = useTheme();
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultySearch>('ALL');
    const [isSearching, setIsSearching] = useState(false);

    //TODO: paginar
    const { data: trainingPlans } = useQuery({
        queryKey: ['trainingPlans'],
        queryFn: fetchTrainingPlans,
        staleTime: 5 * 60 * 1000,
    });

    const debouncedSearchRef = useRef(
        debounce((query: string) => {
            setSearchQuery(query);
            setIsSearching(false);
        }, 500) 
    ).current;

    const handleSearchChange = (text: string) => {
        setSearchInput(text);
        setIsSearching(true);
        debouncedSearchRef(text);
    };

    useEffect(() => {
        return () => {
            debouncedSearchRef.cancel();
        };
    }, [debouncedSearchRef]);

    const filteredPlans = useMemo(() => {
        if (!trainingPlans) return [];
        
        return trainingPlans.filter(plan => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDifficulty = selectedDifficulty === 'ALL' || plan.level === selectedDifficulty;
            return matchesSearch && matchesDifficulty;
        });
    }, [trainingPlans, searchQuery, selectedDifficulty]);

    if (!trainingPlans) return (<LoadingScreen />);

    const renderItem: ListRenderItem<TrainingPlanAPI> = useCallback(({ item }) => (
        <PlanSmallCard {...item} />
    ), []);

    const keyExtractor = useCallback((item: TrainingPlanAPI) => 
        item.id.toString()
    , []);

    return (
        <View className={`flex-1 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}>
            <FlatList
                data={filteredPlans}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={
                    <ListHeader
                        isDark={isDark}
                        searchInput={searchInput}
                        handleSearchChange={handleSearchChange}
                        isSearching={isSearching}
                        selectedDifficulty={selectedDifficulty}
                        setSelectedDifficulty={setSelectedDifficulty}
                        filteredPlans={filteredPlans.length}
                    />
                }
                ItemSeparatorComponent={() => <View className="h-2" />}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
                keyboardShouldPersistTaps="handled" // Permite que el teclado permanezca abierto
                ListEmptyComponent={
                    <Text className={`text-center ${
                        isDark ? "text-gray-300" : "text-gray-500"
                    }`}>
                        {isSearching 
                            ? "Buscando..." 
                            : "No se encontraron planes"
                        }
                    </Text>
                }
            />

        </View>
    );
}