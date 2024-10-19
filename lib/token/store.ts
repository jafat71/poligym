import * as SecureStore from "expo-secure-store";

export const getToken = async (key: string) => {
    try {
        const item = await SecureStore.getItemAsync(key);
        return item;
    } catch (error) {
        await SecureStore.deleteItemAsync(key);
        return null;
    }
}

export const saveToken = async (key: string, value: string) => {
    try {
        return SecureStore.setItemAsync(key, value);
    } catch (err) {
        return;
    }
}

export const deleteToken = async (key: string) => {
    try {
        return SecureStore.deleteItemAsync(key);
    } catch (err) {
        return;
    }
}


