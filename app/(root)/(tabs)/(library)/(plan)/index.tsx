import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { View, FlatList, Text, ListRenderItem, RefreshControl } from 'react-native';

import debounce from 'lodash/debounce';

import { fetchTrainingPlansPaged } from '@/lib/api/actions';

import { useTheme } from '@/context/ThemeContext';
import { useInfiniteQuery } from '@tanstack/react-query';

import { TrainingPlanAPI } from '@/types/interfaces/entities/plan';

import { DIFFICULTIES, DifficultySearch } from '@/constants';

import PlanSmallCard from '@/components/ui/plans/PlanSmallCard';
import CustomSearchBar from '@/components/ui/common/searchbar/CustomSearchBar';
import FilterPill from '@/components/ui/common/pills/FilterPill';
import SkeletonLoadingScreen from '@/components/animatedUi/SkeletonLoadingScreen';

import { queryClient } from '@/lib/queryClient/queryClient';
import MainLogoCustomComponent from '@/components/ui/common/logo/mainLogo';
import IndividualCardSkeleton from '@/components/animatedUi/IndividualCarkSkeleton';


const ListHeader = React.memo(({
    isDark,
    searchInput,
    handleSearchChange,
    isSearching,
    selectedDifficulty,
    setSelectedDifficulty,
}: {
    isDark: boolean;
    searchInput: string;
    handleSearchChange: (text: string) => void;
    isSearching: boolean;
    selectedDifficulty: DifficultySearch;
    setSelectedDifficulty: (difficulty: DifficultySearch) => void;
}) => (
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

export default function Plan() {
    const { isDark } = useTheme();
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultySearch>('ALL');
    const [isSearching, setIsSearching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { 
        data, 
        isLoading, 
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isError   
    } = useInfiniteQuery({
        queryKey: ['trainingPlans','infinite'],
        initialPageParam: 0,
        staleTime: 60* 60 * 1000, // 1 hour
        queryFn: async (params) => {
            const { pageParam = 0 } = params;
            const data = await fetchTrainingPlansPaged(pageParam);
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

    // Verifica si el término de búsqueda está en los datos ya cargados
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
            const matchesDifficulty = selectedDifficulty === 'ALL' || plan.level === selectedDifficulty;
            return matchesSearch && matchesDifficulty;
        });
    }, [data, searchQuery, selectedDifficulty]);

    useEffect(() => {
        if (searchQuery && !checkIfPlanExistsInData(searchQuery)) {
            // Si no encuenctra el término en los datos cargados, sigue paginando
            fetchNextPage();
        }
    }, [searchQuery, data, checkIfPlanExistsInData, fetchNextPage]);

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await queryClient.invalidateQueries({ queryKey: ['trainingPlans'] });
        setIsRefreshing(false);
    }, [queryClient]);

    const renderItem: ListRenderItem<TrainingPlanAPI> = useCallback(({ item }) => (
        <PlanSmallCard {...item} />
    ), []);

    const keyExtractor = useCallback((item: TrainingPlanAPI, index: number) => 
        `${item.id}-${index}`
    , []);

    const handleEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage && !isError) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, isError, fetchNextPage]);

    if (isLoading) return (<SkeletonLoadingScreen />);

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
                    />
                }
                ItemSeparatorComponent={() => <View className="h-2" />}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
                onEndReachedThreshold={0.7}
                onEndReached={handleEndReached}
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
                        {isError && <Text className={`text-center ${isDark ? "text-gray-300" : "text-gray-500"}
                            text-base font-raleway
                        `}>Error al cargar la información. Por favor, inténtelo de nuevo más tarde.</Text>}
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
