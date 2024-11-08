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
                name="favorites"
                options={{
                    headerShown: false,
                    animation: "fade",

                }}
            />
            <Stack.Screen
                name="historial"
                options={{
                    headerShown: false,
                    animation: "fade",

                }}
            />
        </Stack>
    );
};

export default _layout;
