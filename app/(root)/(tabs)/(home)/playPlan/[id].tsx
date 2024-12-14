import { FlatList, Pressable, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { Animated } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUser } from '@/context/UserContext'
import GoBackUpButton from '@/components/ui/common/buttons/GoBackUpButton'
import { TrainingPlanAPI, WorkoutAPI } from '@/types/interfaces/entities/plan'
import { Alert } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchTrainingPlanById } from '@/lib/api/actions'
import MainLogoCustomComponent from '@/components/ui/common/logo/mainLogo'
import SquarePill from '@/components/ui/common/pills/SquarePill'
import { HomeRoutineFlatlist } from '@/components/ui/routines/HomeRoutineFlatList'
import { WorkoutsInPlanFlatList } from '@/components/ui/routines/WorkoutsInPlanFlastListComponent'
import WorkoutLoadingScreen from '@/components/animatedUi/WorkoutLoadingScreen'
import { PlayPlanFlatlistHeader } from '@/components/ui/common/flatlists/PlayPlanFlastlistHeader'

const PlayPlan = () => {
    const { isDark } = useTheme()
    const { id } = useLocalSearchParams();
    const { accessToken, loggedUserInfo } = useUser();
    const queryClient = useQueryClient();
    const planId = Number(id);
    const cachedPlan = queryClient.getQueryData<TrainingPlanAPI>(['plans', planId]);
    const [infoSetted, setInfoSetted] = useState(false);

    const { data: plan, isLoading, isError } = useQuery<TrainingPlanAPI>({
        queryKey: ['plans', id],
        queryFn: async () => fetchTrainingPlanById(accessToken!, id as string),
        initialData: cachedPlan,
        enabled: !!id,
    });

    const [workouts, setWorkouts] = useState<WorkoutAPI[]>([]);

    useEffect(() => {
        if (plan) {
            setWorkouts(plan.workouts.map(workout => ({ ...workout })));
            setTimeout(() => {
                setInfoSetted(true);
            }, 1500);
        }
    }, [plan]);

    const isUserFavorite = loggedUserInfo?.trainingPlanIds.includes(plan?.id!)

    const handleSelectPlan = () => {
    }

    if (isLoading || !infoSetted) return <WorkoutLoadingScreen />;
    if (isError) return
    return (
        <ScrollView className={`flex-1 
            ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}>
            <WorkoutsInPlanFlatList
                ListHeaderComponent={(
                    <PlayPlanFlatlistHeader
                        plan={plan!}
                    />
                )}
                data={workouts}
            />
        </ScrollView>
    )
}

export default PlayPlan