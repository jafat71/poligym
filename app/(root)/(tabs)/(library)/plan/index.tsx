import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { View, FlatList, ListRenderItem, RefreshControl } from 'react-native';

import { fetchTrainingPlansPaged } from '@/lib/api/actions';

import { useTheme } from '@/context/ThemeContext';
import { useInfiniteQuery } from '@tanstack/react-query';

import { DIFFICULTY, TrainingPlanAPI } from '@/types/interfaces/entities/plan';

import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';

import { queryClient } from '@/lib/queryClient/queryClient';
import { useDebounce } from '@/hooks/useDebounce';
import CustomListEmptyComponent from '@/components/ui/common/flatlists/CustomListEmptyComponent';
import { PlanFlatlistHeader } from '@/components/ui/common/flatlists/PlanFlatlistHeader';
import { useUser } from '@/context/UserContext';
import PlanListItem from '@/components/ui/plans/PlanListItem';

export default function Plan() {
    const { isDark } = useTheme();
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<DIFFICULTY>(DIFFICULTY.ALL);
    const [isSearching, setIsSearching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { handleSearchChange } = useDebounce({ setSearchQuery, setIsSearching, setSearchInput });
    const {accessToken} = useUser()
    const {
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isError
    } = useInfiniteQuery({
        queryKey: ['trainingPlans', 'infinite'],
        initialPageParam: 0,
        staleTime: 60 * 60 * 1000, 
        queryFn: async (params) => {
            const { pageParam = 0 } = params;
            const data = await fetchTrainingPlansPaged(accessToken!,pageParam);
            data.plans.forEach(plan => {
                queryClient.setQueryData(['trainingPlans', plan.id], plan);
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

    const checkIfPlanExistsInData = useCallback((query: string) => {
        if (!data) return false;
        return data.pages.flatMap(page => page.plans).some((plan: TrainingPlanAPI) =>
            plan.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [data]);

    const filteredPlans = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => page.plans).filter((plan: TrainingPlanAPI) => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDifficulty = selectedDifficulty === DIFFICULTY.ALL || plan.level === selectedDifficulty;
            return matchesSearch && matchesDifficulty;
        });
    }, [data, searchQuery, selectedDifficulty]);

    useEffect(() => {
        if (searchQuery && !checkIfPlanExistsInData(searchQuery)) {
            fetchNextPage();
        }
    }, [searchQuery, data, checkIfPlanExistsInData, fetchNextPage]);

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await queryClient.invalidateQueries({ queryKey: ['trainingPlans'] });
        setIsRefreshing(false);
    }, [queryClient]);

    const renderItem: ListRenderItem<TrainingPlanAPI> = useCallback(({ item }) => (
        <PlanListItem {...item} />
    ), []);

    const keyExtractor = useCallback((item: TrainingPlanAPI, index: number) =>
        `${item.id}-${index}`
        , []);

    const handleEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage && !isError) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, isError, fetchNextPage]);

    const windowSize = useMemo(() => {
        if (!data) return 10; 
        const itemCount = data.pages.flatMap(page => page.plans).length;
        return itemCount;
    }, [data]);

    if (isLoading) return (<SkeletonLoadingScreen />);

    return (
        <View className={`flex-1 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}>
            <FlatList
                data={filteredPlans}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={
                    <PlanFlatlistHeader 
                        isDark={isDark}
                        searchInput={searchInput}
                        handleSearchChange={handleSearchChange}
                        isSearching={isSearching}
                        selectedDifficulty={selectedDifficulty}
                        setSelectedDifficulty={setSelectedDifficulty}
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
