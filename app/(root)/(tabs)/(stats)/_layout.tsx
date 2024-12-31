import React from "react";
import { Stack } from "expo-router";

const _layout = () => {

    return (
        <Stack
            initialRouteName="stats"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="stats"
                options={{
                    animation: "fade",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="historial"
                options={{
                    animation: "fade",
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default _layout;
