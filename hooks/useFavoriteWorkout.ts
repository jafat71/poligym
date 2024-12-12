import { useUser } from "@/context/UserContext";
import { updateUser } from "@/lib/api/userActions";
import { useState } from "react"

export const useFavoriteWorkout = (workoutId: number) => {
    console.log("workoutId", workoutId)
    const { accessToken, loggedUserInfo, setLoggedUserInfo } = useUser();
    const [isFavorite, setIsFavorite] = useState(loggedUserInfo?.workoutIds?.includes(workoutId) ?? false)
    const handleFavoriteWorkout = async () => {
        setIsFavorite(!isFavorite)
        const tmpUser = {
            userType: loggedUserInfo?.userType,
            workoutIds: [...loggedUserInfo?.workoutIds!, workoutId]
        }
        setLoggedUserInfo({
            ...loggedUserInfo!,
            workoutIds: [...loggedUserInfo?.workoutIds!, workoutId]
        })
        try {
            await updateUser(accessToken!, loggedUserInfo?.id!, tmpUser)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnfavoriteWorkout = async () => {
        setIsFavorite(!isFavorite)
        const tmpUser = {
            userType: loggedUserInfo?.userType,
            workoutIds: loggedUserInfo?.workoutIds?.filter((id) => id !== workoutId)
        }
        setLoggedUserInfo({
            ...loggedUserInfo!,
            workoutIds: loggedUserInfo?.workoutIds?.filter((id) => id !== workoutId) ?? []
        })
        try {
            await updateUser(accessToken!, loggedUserInfo?.id!, tmpUser)
        } catch (error) {
            console.log(error)
        }
    }

    return { isFavorite, handleFavoriteWorkout, handleUnfavoriteWorkout }
}
