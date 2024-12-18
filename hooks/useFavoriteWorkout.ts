import { useUser } from "@/context/UserContext";
import { updateUser } from "@/lib/api/userActions";
import { WorkoutAPI } from "@/types/interfaces/entities/plan";
import { useEffect, useState } from "react"

export const useFavoriteWorkout = (workout: WorkoutAPI | null) => {
    const { accessToken, loggedUserInfo, setLoggedUserInfo, setUserFavWorkouts, userFavWorkouts } = useUser();
    const [isFavorite, setIsFavorite] = useState(
        workout && loggedUserInfo?.workoutIds?.includes(workout.id)
    );

    console.log(isFavorite)

    useEffect(() => {
        if (workout) {
            setIsFavorite(loggedUserInfo?.workoutIds?.includes(workout.id) ?? false);
        }
    }, [loggedUserInfo?.workoutIds, workout]);

    const handleFavoriteWorkout = async () => {
        if (!workout) return;
        setIsFavorite(true);
        setUserFavWorkouts([...userFavWorkouts, workout]);
        const tmpUser = {
            userType: loggedUserInfo?.userType,
            workoutIds: [...loggedUserInfo?.workoutIds!, workout.id],
        };
        setLoggedUserInfo({
            ...loggedUserInfo!,
            workoutIds: [...loggedUserInfo?.workoutIds!, workout.id],
        });
        try {
            await updateUser(accessToken!, loggedUserInfo?.id!, tmpUser);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnfavoriteWorkout = async () => {
        if (!workout) return;
        setIsFavorite(false);
        setUserFavWorkouts((prev) => prev.filter((w) => w.id !== workout.id));
        const tmpUser = {
            userType: loggedUserInfo?.userType,
            workoutIds: loggedUserInfo?.workoutIds?.filter((id) => id !== workout.id),
        };
        setLoggedUserInfo({
            ...loggedUserInfo!,
            workoutIds: loggedUserInfo?.workoutIds?.filter((id) => id !== workout.id) ?? [],
        });
        try {
            await updateUser(accessToken!, loggedUserInfo?.id!, tmpUser);
        } catch (error) {
            console.log(error);
        }
    };

    return { isFavorite, handleFavoriteWorkout, handleUnfavoriteWorkout };
};