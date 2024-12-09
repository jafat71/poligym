import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { View, FlatList, ListRenderItem, RefreshControl } from 'react-native';

import { fetchFoodPlansPaged, fetchTrainingPlansPaged } from '@/lib/api/actions';

import { useTheme } from '@/context/ThemeContext';
import { useInfiniteQuery } from '@tanstack/react-query';


import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';

import { queryClient } from '@/lib/queryClient/queryClient';
import { useDebounce } from '@/hooks/useDebounce';
import CustomListEmptyComponent from '@/components/ui/common/flatlists/CustomListEmptyComponent';
import { useUser } from '@/context/UserContext';
import { FoodPlanFlatlistHeader } from '@/components/ui/common/flatlists/FoodPlanFaltlistHeader';
import { FOODPLAN_CATEGORY, NutritionPlan } from '@/types/interfaces/entities/foodplan';
import FoodPlanListItem from '@/components/ui/foodplan/FoodPlanListItem';

export default function FoodPlan() {
    const { isDark } = useTheme();
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedCategory, setSelectedCategory] = useState<FOODPLAN_CATEGORY>(FOODPLAN_CATEGORY.ALL);

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
        queryKey: ['foodplans', 'infinite'],
        initialPageParam: 0,
        staleTime: 60 * 60 * 1000, // 1 hour
        queryFn: async (params) => {
            const { pageParam = 0 } = params;
            const data = await fetchFoodPlansPaged(accessToken!,pageParam);
            data.plans.forEach(plan => {
                queryClient.setQueryData(['foodplans', plan.id], plan);
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
        return data.pages.flatMap(page => page.plans).some((plan: NutritionPlan) =>
            plan.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [data]);

    const filteredPlans = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => page.plans).filter((plan: NutritionPlan) => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === FOODPLAN_CATEGORY.ALL || plan.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [data, searchQuery, selectedCategory]);

    useEffect(() => {
        if (searchQuery && !checkIfPlanExistsInData(searchQuery)) {
            fetchNextPage();
        }
    }, [searchQuery, data, checkIfPlanExistsInData, fetchNextPage]);

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await queryClient.invalidateQueries({ queryKey: ['foodplans'] });
        setIsRefreshing(false);
    }, [queryClient]);

    const renderItem: ListRenderItem<NutritionPlan> = useCallback(({ item }) => (
        <FoodPlanListItem {...item} />
    ), []);

    const keyExtractor = useCallback((item: NutritionPlan, index: number) =>
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
        <View className={`flex-1 ${isDark ? "bg-blueEPN-900" : "bg-blueEPN-500"}`}>
            <FlatList
                data={filteredPlans}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={
                    <FoodPlanFlatlistHeader 
                        isDark={isDark}
                        searchInput={searchInput}
                        handleSearchChange={handleSearchChange}
                        isSearching={isSearching}
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
                        tintColor={"#008000"}
                    />
                }
            />
        </View>
    );
}
