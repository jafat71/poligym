import { useUser } from '@/context/UserContext';
import { fetchMuscleGroups } from '@/lib/api/actions';
import { useQuery } from '@tanstack/react-query';

export const useMuscles = () => {
    const {accessToken} = useUser()
    const { data: muscleGroups, isLoading: isLoadingMuscleGroups } = useQuery({
        queryKey: ['muscle-groups'],
        queryFn: () => fetchMuscleGroups(accessToken!),
        staleTime: 24 * 60 * 60 * 1000, // 1 day
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        retry: false,
    });

    return {
        muscleGroups,
        isLoadingMuscleGroups,
    }
}

export default useMuscles