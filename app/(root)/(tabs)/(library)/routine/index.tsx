import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { View, FlatList, ListRenderItem, RefreshControl } from 'react-native';

import { fetchWorkoutById, fetchWorkoutsPaged } from '@/lib/api/actions';

import { useTheme } from '@/context/ThemeContext';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { WorkoutAPI } from '@/types/interfaces/entities/plan';

import { CategorySearch, DifficultySearch } from '@/constants';

import useMuscles from '@/hooks/useMuscles';
import { useDebounce } from '@/hooks/useDebounce';

import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';
import RoutineListCard from '@/components/ui/routines/RoutineListCard';
import CustomListEmptyComponent from '@/components/ui/common/flatlists/CustomListEmptyComponent';
import { WorkoutFlatlistHeader } from '@/components/ui/common/flatlists/WorkoutFlatListHeader';
import { useUser } from '@/context/UserContext';

export default function Routine() {
    const { isLoadingMuscleGroups } = useMuscles();
    const { isDark } = useTheme();
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultySearch>('ALL');
    const [selectedCategory, setSelectedCategory] = useState<CategorySearch>('ALL');
    const [isSearching, setIsSearching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { handleSearchChange } = useDebounce({ setSearchQuery, setIsSearching, setSearchInput });
    const { accessToken } = useUser()
    const queryClient = useQueryClient();
    const {
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isError
    } = useInfiniteQuery({
        queryKey: ['workouts', 'infinite'],
        initialPageParam: 0,
        staleTime: 60 * 60 * 1000, // 1 hour
        queryFn: async (params) => {
            const { pageParam = 0 } = params;
            const data = await fetchWorkoutsPaged(accessToken!, pageParam);
            data.workouts.forEach(workout => {
                queryClient.prefetchQuery({
                    queryKey: ['workouts', workout.id],
                    queryFn: async () => {
                        const individualWorkout = await fetchWorkoutById(accessToken!, workout.id.toString());
                        queryClient.setQueryData(['workouts', workout.id], individualWorkout);
                        return individualWorkout;
                    }
                });
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

    const checkIfWorkoutExistsInData = useCallback((query: string) => {
        if (!data) return false;
        return data.pages.flatMap(page => page.workouts).some((workout: WorkoutAPI) =>
            workout.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [data]);

    //TODO: Mover logica de filtrado a un modal
    const filteredWorkouts = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => page.workouts).filter((workout: WorkoutAPI) => {
            const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDifficulty = selectedDifficulty === 'ALL' || workout.level === selectedDifficulty;
            const matchesCategory = selectedCategory === 'ALL' || workout.category === selectedCategory;
            return matchesSearch && matchesDifficulty && matchesCategory;

        });
    }, [data, searchQuery, selectedDifficulty, selectedCategory]);

    useEffect(() => {
        if (searchQuery && !checkIfWorkoutExistsInData(searchQuery)) {
            // Si no encuenctra el término en los datos cargados, sigue paginando
            fetchNextPage();
        }
    }, [searchQuery, data, checkIfWorkoutExistsInData, fetchNextPage]);

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await queryClient.invalidateQueries({ queryKey: ['workouts'] });
        setIsRefreshing(false);
    }, [queryClient]);

    const renderItem: ListRenderItem<WorkoutAPI> = useCallback(({ item }) => (
        <RoutineListCard {...item} />
    ), []);

    const keyExtractor = useCallback((item: WorkoutAPI, index: number) =>
        `${item.id}-${index}`
        , []);

    const handleEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage && !isError) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, isError, fetchNextPage]);

    const windowSize = useMemo(() => {
        if (!data) return 10;
        const itemCount = data.pages.flatMap(page => page.workouts).length;
        return itemCount;
    }, [data]);

    if (isLoading || isLoadingMuscleGroups) return (<SkeletonLoadingScreen />);

    return (
        <View className={`flex-1 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}>
            <FlatList
                data={filteredWorkouts}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={
                    <WorkoutFlatlistHeader
                        searchInput={searchInput}
                        handleSearchChange={handleSearchChange}
                        isSearching={isSearching}
                        selectedDifficulty={selectedDifficulty}
                        setSelectedDifficulty={setSelectedDifficulty}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                }
                ItemSeparatorComponent={() => <View className="h-2" />}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={windowSize}
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