import IndividualCardSkeleton from '@/components/animatedUi/IndividualCarkSkeleton';
import React from 'react';
import { Text, View } from 'react-native';
import MainLogoCustomComponent from '../logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';

interface CustomListEmptyComponentProps {
    isSearching: boolean;
    isFetchingNextPage: boolean;
    isError: boolean;
    hasNextPage: boolean;
}

const CustomListEmptyComponent = ({ isSearching, isFetchingNextPage, isError, hasNextPage }: CustomListEmptyComponentProps) => {
    const { isDark } = useTheme();

    if (isSearching || isFetchingNextPage) {
        return (
            <View className="flex-1 justify-center items-center">
                <IndividualCardSkeleton />
            </View>
        );
    }

    if (isError) {
        return (
            <View className="flex-1 justify-center items-center">
                <MainLogoCustomComponent
                        width='100'
                        height='100'
                    principal={isDark ? "#515151" : "#6b7280"}
                />
                <Text className={`text-center ${isDark ? "text-gray-300" : "text-gray-500"} text-base font-raleway`}>
                    Error al cargar la información. Por favor, inténtelo de nuevo más tarde.
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 justify-center items-center">
            {!hasNextPage ? (
                <>
                    <MainLogoCustomComponent
                        width='100'
                        height='100'
                        principal={isDark ? "#515151" : "#6b7280"}
                    />
                    <Text className={`text-center ${isDark ? "text-gray-300" : "text-gray-500"} text-base font-raleway`}>
                        No se encontraron resultados
                    </Text>
                </>
            ) : (
                <IndividualCardSkeleton />
            )}
        </View>
    );
};

export default CustomListEmptyComponent;
