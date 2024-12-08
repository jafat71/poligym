import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { View, FlatList, ListRenderItem, RefreshControl } from 'react-native';

import { fetchExercisesPaged } from '@/lib/api/actions';

import { useTheme } from '@/context/ThemeContext';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { CATEGORY, DIFFICULTY, EquipmentApi, ExerciseAPI } from '@/types/interfaces/entities/plan';
import { MuscleGroups } from '@/types/types/muscles';

import useMuscles from '@/hooks/useMuscles';
import { useDebounce } from '@/hooks/useDebounce';

import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';
import CustomListEmptyComponent from '@/components/ui/common/flatlists/CustomListEmptyComponent';
import { ExerciseFlatlistHeader } from '@/components/ui/common/flatlists/ExerciseFlatlistHeader';
import { useEquipment } from '@/hooks/useEquipment';
import { useUser } from '@/context/UserContext';
import ExerciseListCard from '@/components/ui/exercises/ExerciseListCard';

export default function Exercise() {
    const { isDark } = useTheme();
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<DIFFICULTY>(DIFFICULTY.ALL );
    const [selectedCategory, setSelectedCategory] = useState<CATEGORY>(CATEGORY.ALL);
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<MuscleGroups[]>([]);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentApi[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { isLoadingMuscleGroups, muscleGroups } = useMuscles();
    const { isLoadingEquipments, equipments } = useEquipment();
    const { handleSearchChange } = useDebounce({ setSearchQuery, setIsSearching, setSearchInput });
    const {accessToken} = useUser()
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isError
    } = useInfiniteQuery({
        queryKey: ['exercises', 'infinite'],
        initialPageParam: 0,
        staleTime: 60 * 60 * 1000, // 1 hour
        queryFn: async (params) => {
            const { pageParam = 0 } = params;
            const data = await fetchExercisesPaged(accessToken!, pageParam);
            data.exercises.forEach(exercise => {
                queryClient.setQueryData(['exercises', exercise.id], exercise);
            });
            return data;
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.meta.lastPage > lastPage.meta.page) {
                return lastPage.meta.page;
            }
            return undefined;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        retry: 2,
    });

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

    const checkIfExerciseExistsInData = useCallback((query: string) => {
        if (!data) return false;
        return data.pages.flatMap(page => page.exercises).some((exercise: ExerciseAPI) =>
            exercise.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [data]);

    const filteredExercises = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => page.exercises).filter((exercise: ExerciseAPI) => {
            const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDifficulty = selectedDifficulty === DIFFICULTY.ALL || exercise.level === selectedDifficulty;
            const matchesCategory = selectedCategory === CATEGORY.ALL || exercise.category === selectedCategory;
            const matchesEquipment = selectedEquipment.length === 0 || 
                selectedEquipment.some(equipment => 
                    exercise.equipment.some(exerciseEquipment => {
                        return exerciseEquipment.name === equipment.name
                    })
                );
            const matchesMuscleGroups = selectedMuscleGroups.length === 0 || 
                selectedMuscleGroups.some(selectedMuscle => 
                    exercise.muscleGroups.some(workoutMuscle  => 
                        workoutMuscle === selectedMuscle
                    )
                );

            return matchesSearch && matchesDifficulty && matchesCategory && matchesMuscleGroups && matchesEquipment;

        });
    }, [data, searchQuery, selectedDifficulty, selectedMuscleGroups, selectedCategory, selectedEquipment]);

    useEffect(() => {
        if (searchQuery && !checkIfExerciseExistsInData(searchQuery)) {
            // Si no encuenctra el término en los datos cargados, sigue paginando
            fetchNextPage();
        }
    }, [searchQuery, data, checkIfExerciseExistsInData, fetchNextPage]);

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await queryClient.invalidateQueries({ queryKey: ['exercises', 'infinite'] });
        setIsRefreshing(false);
    }, [queryClient]);

    const renderItem: ListRenderItem<ExerciseAPI> = useCallback(({ item }) => (
        <ExerciseListCard {...item} />
    ), []);

    const keyExtractor = useCallback((item: ExerciseAPI) =>`${item.id}`, []);

    const handleEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage && !isError) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, isError, fetchNextPage]);

    const windowSize = useMemo(() => {
        if (!data || data.pages.length === 0) return 10; 
        const itemCount = data.pages.flatMap(page => page.exercises).length;
        return itemCount;
    }, [data]);

    if (isLoading || isLoadingMuscleGroups || isLoadingEquipments) return (<SkeletonLoadingScreen />);

    return (
        <View className={`flex-1 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}>
            <FlatList
                data={filteredExercises}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                windowSize={windowSize}
                ListHeaderComponent={
                    <ExerciseFlatlistHeader
                        searchInput={searchInput}
                        handleSearchChange={handleSearchChange}
                        isSearching={isSearching}
                        selectedDifficulty={selectedDifficulty}
                        setSelectedDifficulty={setSelectedDifficulty}
                        muscleGroups={muscleGroups!}
                        selectedMuscleGroups={selectedMuscleGroups}
                        toggleMuscleGroup={toggleMuscleGroup}
                        clearMuscleGroups={clearMuscleGroups}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        equipments={equipments!}
                        selectedEquipment={selectedEquipment}
                        setSelectedEquipment={setSelectedEquipment}
                    />
                }
                ItemSeparatorComponent={() => <View className="h-2" />}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                removeClippedSubviews={true}
                onEndReachedThreshold={0.7}
                onEndReached={handleEndReached}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                    <CustomListEmptyComponent
                    isSearching={isSearching}
                    isFetchingNextPage={isFetchingNextPage}
                    isError={isError}
                    hasNextPage={hasNextPage}
                />
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