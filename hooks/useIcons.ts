import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

const useIcons = () => {
    const [iconsloaded, setIconsloaded] = useState(false);

    useEffect(() => {
        const loadIcons = async () => {
            try {
                await Font.loadAsync(Ionicons.font);
            } catch (error) {
                console.log("Error loading Icons", error)
            } finally {
                setIconsloaded(true)
            }
        }

        loadIcons();
    }, [])


    return {
        iconsloaded
    }
}

export default useIcons