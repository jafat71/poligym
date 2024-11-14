import { useUser } from "@/context/UserContext";
import { fetchEquipment } from "@/lib/api/actions";
import { useQuery } from "@tanstack/react-query";

export const useEquipment = () => {
    const { accessToken } = useUser();
    const { data: equipments, isLoading: isLoadingEquipments } = useQuery({
        queryKey: ['equipments'],
        queryFn: () => fetchEquipment(accessToken!),
        staleTime: 24 * 60 * 60 * 1000, // 1 day
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        retry: false,
    });

    return {
        equipments,
        isLoadingEquipments,
    }
}