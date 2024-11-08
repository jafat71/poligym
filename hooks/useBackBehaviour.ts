import { useUser } from "@/context/UserContext";
import { usePathname } from "expo-router";

import { useEffect } from "react";
import { BackHandler } from "react-native";

export const useBackBehaviour = () => {
    const pathname = usePathname();
    const { userLogged } = useUser();

    const handleBackPress = () => {
        if (pathname === "/home" && userLogged) {
            BackHandler.exitApp();
            return true;
        }
        return false;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        };
    }, [pathname]);


};
