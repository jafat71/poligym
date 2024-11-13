import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { View, FlatList, Text, ListRenderItem, RefreshControl } from 'react-native';
import debounce from 'lodash/debounce';
import { fetchMuscleGroups, fetchWorkouts } from '@/lib/api/actions';
import { useTheme } from '@/context/ThemeContext';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { TrainingPlanAPI, WorkoutAPI } from '@/types/interfaces/entities/plan';
import { CATEGORIES, CategorySearch, DIFFICULTIES, DifficultySearch } from '@/constants';
import CustomSearchBar from '@/components/ui/common/searchbar/CustomSearchBar';
import FilterPill from '@/components/ui/common/pills/FilterPill';
import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';
import { queryClient } from '@/lib/queryClient/queryClient';
import MainLogoCustomComponent from '@/components/ui/common/logo/mainLogo';
import IndividualCardSkeleton from '@/components/animatedUi/IndividualCarkSkeleton';
import RoutineListCard from '@/components/ui/routines/RoutineListCard';
import { MuscleGroups } from '@/types/types/muscles';
import useMuscles from '@/hooks/useMuscles';
import MusclePill from '@/components/ui/common/pills/MusclePill';
import IconButton from '@/components/ui/common/buttons/IconButton';
import { Ionicons } from '@expo/vector-icons';

const ListHeader = React.memo(({
    isDark,
    searchInput,
    handleSearchChange,
    isSearching,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedCategory,
    setSelectedCategory,
    filteredWorkouts,
    muscleGroups,
    selectedMuscleGroups,
    toggleMuscleGroup,
    clearMuscleGroups,
}: {
    isDark: boolean;
    searchInput: string;
    handleSearchChange: (text: string) => void;
    isSearching: boolean;
    selectedDifficulty: DifficultySearch;
    setSelectedDifficulty: (difficulty: DifficultySearch) => void;
    selectedCategory: CategorySearch;
    setSelectedCategory: (category: CategorySearch) => void;
    filteredWorkouts: number;
    muscleGroups: MuscleGroups[];
    selectedMuscleGroups: MuscleGroups[];
    toggleMuscleGroup: (muscle: MuscleGroups) => void;
    clearMuscleGroups: () => void;
}) => (
    <View className={`mb-4 p-4 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
        <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-4xl font-ralewayBold mb-4`}>
            RUTINAS
        </Text>

        <CustomSearchBar
            isSearching={isSearching}
            searchInput={searchInput}
            handleSearchChange={handleSearchChange}
            placeholder="Buscar Rutinas..."
        />

        <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-sm font-ralewayBold mb-2`}>
            Dificultad
        </Text>
        <View className="flex-row justify-between mb-4">
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

        <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-sm font-ralewayBold mb-2`}>
            Categoría
        </Text>
        <View className="flex-row justify-between mb-4">
            {CATEGORIES.map(({ value, label }) => (
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

        <View className="flex-row justify-between items-center mb-2">
            <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-sm font-ralewayBold mb-2`}>
                Grupos Musculares 
            </Text>
            {selectedMuscleGroups.length > 0 && (
                <IconButton
                    onPress={clearMuscleGroups}
                    icon={<Ionicons name="remove-circle-outline" size={24} color="#0055f9" />}
                />
            )}
        </View>
        <View className="flex flex-row flex-wrap justify-start ">
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
    </View>
));

export default function Routine() {
    const { isDark } = useTheme();
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultySearch>('ALL');
    const [selectedCategory, setSelectedCategory] = useState<CategorySearch>('ALL');
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<MuscleGroups[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { isLoadingMuscleGroups, muscleGroups } = useMuscles();

    const { data, isLoading } = useQuery({
        queryKey: ['workouts'],
        queryFn: fetchWorkouts,
        staleTime: 1 * 60 * 1000, // 1 hour
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        retry: false,
    });

    const debouncedSearchRef = useRef(
        debounce((query: string) => {
            setSearchQuery(query);
            setIsSearching(false);
        }, 500)
    ).current;

    const handleSearchChange = useCallback((text: string) => {
        setSearchInput(text);
        setIsSearching(true);
        debouncedSearchRef(text);
    }, [debouncedSearchRef]);

    const toggleMuscleGroup = useCallback((muscle: MuscleGroups) => {
        setSelectedMuscleGroups(prev => {
            const isSelected = prev.some(m => m === muscle);
            if (isSelected) {
                return prev.filter(m => m !== muscle);
            } else {
                return [...prev, muscle];
            }
        });
    }, []);

    const clearMuscleGroups = useCallback(() => {
        setSelectedMuscleGroups([]);
    }, []);

    useEffect(() => {
        return () => {
            debouncedSearchRef.cancel();
        };
    }, [debouncedSearchRef]);

    const filteredWorkouts = useMemo(() => {
        if (!data) return [];
        return data.filter((workout: WorkoutAPI) => {
            const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDifficulty = selectedDifficulty === 'ALL' || workout.level === selectedDifficulty;
            const matchesCategory = selectedCategory === 'ALL' || workout.category === selectedCategory;
            // const matchesMuscleGroups = selectedMuscleGroups.length === 0 || 
            //     selectedMuscleGroups.some(selectedMuscle => 
            //         workout.muscles.some(workoutMuscle => 
            //             workoutMuscle === selectedMuscle
            //         )
            //     );
            
            //return matchesSearch && matchesDifficulty && matchesMuscleGroups;
            return matchesSearch && matchesDifficulty && matchesCategory;
            
        });
    }, [data, searchQuery, selectedDifficulty, selectedMuscleGroups,selectedCategory]);

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await queryClient.invalidateQueries({ queryKey: ['workouts'] });
        setIsRefreshing(false);
    }, [queryClient]);

    const renderItem: ListRenderItem<WorkoutAPI> = useCallback(({ item }) => (
        <RoutineListCard {...item} />
    ), []);

    const keyExtractor = useCallback((item: WorkoutAPI) => 
        item.id.toString()
    , []);

    if (isLoading || isLoadingMuscleGroups) return (<SkeletonLoadingScreen />);

    return (
        <View className={`flex-1 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}>
            <FlatList
                data={filteredWorkouts}
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
                        filteredWorkouts={filteredWorkouts.length}
                        muscleGroups={muscleGroups!}
                        selectedMuscleGroups={selectedMuscleGroups}
                        toggleMuscleGroup={toggleMuscleGroup}
                        clearMuscleGroups={clearMuscleGroups}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                }
                ItemSeparatorComponent={() => <View className="h-2" />}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
                onEndReachedThreshold={0.7}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center">
                        {isSearching
                            ? (<>
                                <IndividualCardSkeleton/>
                            </>)
                            : (<>
                                <MainLogoCustomComponent
                                    width='100'
                                    height='100'
                                    principal={isDark ? "#515151" : "#6b7280"}
                                />
                                <Text className={`text-center ${isDark ? "text-gray-300" : "text-gray-500"}
                                    text-base font-raleway
                                `}>No se encontraron resultados</Text>
                            </>)
                        }
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor={"#0055f9"}
                    />
                }
            />
        </View>
    );
}