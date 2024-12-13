import { useUser } from "@/context/UserContext";
import { updateUser } from "@/lib/api/userActions";
import { TrainingPlanAPI } from "@/types/interfaces/entities/plan";
import { useEffect, useState } from "react"

export const useFavoriteTrainingPlan = (trainingPlan: TrainingPlanAPI) => {
    const { accessToken, loggedUserInfo, setLoggedUserInfo, userFavTrainingPlans, setUserFavTrainingPlans } = useUser();
    const [isFavorite, setIsFavorite] = useState(
        trainingPlan && loggedUserInfo?.trainingPlanIds?.includes(trainingPlan.id)
    );
    
    useEffect(() => {
        if (trainingPlan) {
            setIsFavorite(loggedUserInfo?.trainingPlanIds?.includes(trainingPlan.id) ?? false)
        }
    }, [loggedUserInfo?.trainingPlanIds, trainingPlan])

    const handleFavoriteTrainingPlan = async () => {
        setIsFavorite(!isFavorite)
        setUserFavTrainingPlans([...userFavTrainingPlans, trainingPlan])
        const tmpUser = {
            userType: loggedUserInfo?.userType,
            trainingPlanIds: [...loggedUserInfo?.trainingPlanIds!, trainingPlan.id]
        }
        setLoggedUserInfo({
            ...loggedUserInfo!,
            trainingPlanIds: [...loggedUserInfo?.trainingPlanIds!, trainingPlan.id]
        })
        try {
            await updateUser(accessToken!, loggedUserInfo?.id!, tmpUser)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnfavoriteTrainingPlan = async () => {
        setIsFavorite(!isFavorite)
        setUserFavTrainingPlans(userFavTrainingPlans.filter((plan) => plan.id !== trainingPlan.id))
        const tmpUser = {
            userType: loggedUserInfo?.userType,
            trainingPlanIds: loggedUserInfo?.trainingPlanIds?.filter((id) => id !== trainingPlan.id)
        }
        setLoggedUserInfo({
            ...loggedUserInfo!,
            trainingPlanIds: loggedUserInfo?.trainingPlanIds?.filter((id) => id !== trainingPlan.id) ?? []
        })
        try {
            await updateUser(accessToken!, loggedUserInfo?.id!, tmpUser)
        } catch (error) {
            console.log(error)
        }
    }

    return { isFavorite, handleFavoriteTrainingPlan, handleUnfavoriteTrainingPlan }
}
