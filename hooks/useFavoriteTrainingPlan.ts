import { useUser } from "@/context/UserContext";
import { updateUser } from "@/lib/api/userActions";
import { useState } from "react"

export const useFavoriteTrainingPlan = (trainingPlanId: number) => {
    const { accessToken, loggedUserInfo, setLoggedUserInfo } = useUser();
    const [isFavorite, setIsFavorite] = useState(loggedUserInfo?.trainingPlanIds?.includes(trainingPlanId) ?? false)
    const handleFavoriteTrainingPlan = async () => {
        setIsFavorite(!isFavorite)
        const tmpUser = {
            userType: loggedUserInfo?.userType,
            trainingPlanIds: [...loggedUserInfo?.trainingPlanIds!, trainingPlanId]
        }
        setLoggedUserInfo({
            ...loggedUserInfo!,
            trainingPlanIds: [...loggedUserInfo?.trainingPlanIds!, trainingPlanId]
        })
        try {
            await updateUser(accessToken!, loggedUserInfo?.id!, tmpUser)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnfavoriteTrainingPlan = async () => {
        setIsFavorite(!isFavorite)
        const tmpUser = {
            userType: loggedUserInfo?.userType,
            trainingPlanIds: loggedUserInfo?.trainingPlanIds?.filter((id) => id !== trainingPlanId)
        }
        setLoggedUserInfo({
            ...loggedUserInfo!,
            trainingPlanIds: loggedUserInfo?.trainingPlanIds?.filter((id) => id !== trainingPlanId) ?? []
        })
        try {
            await updateUser(accessToken!, loggedUserInfo?.id!, tmpUser)
        } catch (error) {
            console.log(error)
        }
    }

    return { isFavorite, handleFavoriteTrainingPlan, handleUnfavoriteTrainingPlan }
}
