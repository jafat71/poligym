import { useUser } from "@/context/UserContext";
import { updateUser } from "@/lib/api/userActions";
import { NutritionPlan } from "@/types/interfaces/entities/foodplan";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react"

export const useFavoriteNutritionPlan = (nutritionPlan: NutritionPlan) => {
    const { accessToken, loggedUserInfo, setLoggedUserInfo, setUserFavFoodPlans, userFavFoodPlans } = useUser();
    const [isFavorite, setIsFavorite] = useState(
        nutritionPlan && loggedUserInfo?.nutritionIds?.includes(nutritionPlan.id)
    );

    useEffect(() => {
        if (nutritionPlan) {
            setIsFavorite(loggedUserInfo?.nutritionIds?.includes(nutritionPlan.id) ?? false)
        }
    }, [loggedUserInfo?.nutritionIds, nutritionPlan])

    const handleFollowPlan = async () => {
        setIsFavorite(!isFavorite)
        setUserFavFoodPlans([...userFavFoodPlans, nutritionPlan])
        const tmpUser = {
            userType: loggedUserInfo?.userType,
            nutritionIds: [...loggedUserInfo?.nutritionIds!, nutritionPlan.id]
        }
        setLoggedUserInfo({
            ...loggedUserInfo!,
            nutritionIds: [...loggedUserInfo?.nutritionIds!, nutritionPlan.id]
        })
        try {
            await updateUser(accessToken!, loggedUserInfo?.id!, tmpUser)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnfollowPlan = async () => {
        setIsFavorite(!isFavorite)
        setUserFavFoodPlans(userFavFoodPlans.filter((plan) => plan.id !== nutritionPlan.id))
        const tmpUser = {
            userType: loggedUserInfo?.userType,
            nutritionIds: loggedUserInfo?.nutritionIds?.filter((id) => id !== nutritionPlan.id)
        }
        setLoggedUserInfo({
            ...loggedUserInfo!,
            nutritionIds: loggedUserInfo?.nutritionIds?.filter((id) => id !== nutritionPlan.id) ?? []
        })
        try {
            await updateUser(accessToken!, loggedUserInfo?.id!, tmpUser)
        } catch (error) {
            console.log(error)
        }
    }

    return { isFavorite, handleFollowPlan, handleUnfollowPlan }
}
