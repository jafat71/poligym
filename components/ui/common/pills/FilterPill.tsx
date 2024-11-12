import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { View } from 'react-native';

interface Props {
    value: string;
    label: string;
    selectedDifficulty: string;
    setSelectedDifficulty: (value: string) => void;
    isSearching: boolean;
}

const FilterPill = ({ value, label, selectedDifficulty, setSelectedDifficulty, isSearching }: Props) => {
    const { isDark } = useTheme();
    const isSelected = selectedDifficulty === value;
    return (
        <Pressable
        key={value}
        onPress={() => setSelectedDifficulty(value)}
        className={`px-2 py-2 rounded-sm border-2
            ${isSelected
                ? "border-eBlue-500"
                : isDark ? "border-darkGray-400" : "border-darkGray-200"
        }`}
        style={{
            opacity: isSearching ? 0.7 : 1,
        }}
    >
        <Text className={`${
            isSelected
                ? "text-eBlue-500"
                : isDark ? "text-white" : "text-darkGray-500"
        } font-ralewaySemiBold text-xs`}>
            {label}
        </Text>
    </Pressable>
    );
}

export default FilterPill;
