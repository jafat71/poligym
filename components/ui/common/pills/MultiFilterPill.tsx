import React from 'react';
import { Pressable, Text } from 'react-native';
import { EquipmentApi } from '@/types/interfaces/entities/plan';
import { useTheme } from '@/context/ThemeContext';

interface Props {
    value: EquipmentApi;
    selected: EquipmentApi[];
    setSelected: (value: EquipmentApi[]) => void;
    isSearching: boolean;
}

const MultiFilterPill = ({ value, selected, setSelected, isSearching }: Props) => {
    const { isDark } = useTheme();
    const isSelected = selected.includes(value);
    return (
        <Pressable
        key={value.name}
        onPress={() => isSelected ? setSelected(selected.filter(item => item.name !== value.name)) : setSelected([...selected, value])}
        className={`px-2 py-2 rounded-sm border-2
            ${isSelected
                ? "border-eOrange-500 bg-eOrange-500/20"
                : isDark ? "border-darkGray-400" : "border-darkGray-200"
        }`}
        style={{
            opacity: isSearching ? 0.7 : 1,
        }}
    >
        <Text className={`${
            isSelected
                ? "text-eOrange-500"
                : isDark ? "text-white" : "text-darkGray-500"
        } font-ralewaySemiBold text-xs`}>
            {value.name}
        </Text>
    </Pressable>
    );
}

export default MultiFilterPill;
