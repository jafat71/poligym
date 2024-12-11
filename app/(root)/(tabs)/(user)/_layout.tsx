import React from "react";
import { Stack } from "expo-router";

const _layout = () => {

    return (
        <Stack
            initialRouteName="index"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    animation: "simple_push",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    animation: "slide_from_right",
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
            <Stack.Screen
                name="plans"
                options={{
                    headerShown: false,
                    animation: "fade",
                }}
            />
        </Stack>
    );
};

export default _layout;
