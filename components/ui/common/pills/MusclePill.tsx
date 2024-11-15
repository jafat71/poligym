import { useTheme } from '@/context/ThemeContext';
import { isValidMuscleGroup } from '@/lib/utils/isMuscle';
import { MuscleGroups } from '@/types/types/muscles';
import React, { memo } from 'react';
import { Pressable, Text } from 'react-native';

interface Props {
    muscle: string; 
    isSelected: boolean;
    onToggle: () => void;
    isSearching: boolean;
}

const MusclePill = memo(({ 
    muscle, 
    isSelected, 
    onToggle, 
    isSearching 
}: Props) => {
    const { isDark } = useTheme();

    const muscleLabel = isValidMuscleGroup(muscle) ? MuscleGroups[muscle] : muscle;

    return (
        <Pressable
            onPress={onToggle}
            className={`px-3 py-2 rounded-sm mr-1 mb-1 border-2
                ${isSelected
                    ? "border-eBlue-500 "
                    : isDark 
                        ? "border-darkGray-400 bg-transparent" 
                        : "border-darkGray-200 bg-transparent"
                }
            `}
            style={{
                opacity: isSearching ? 0.7 : 1,
            }}
        >
            <Text 
                className={`
                    ${isSelected
                        ? "text-eBlue-500"
                        : isDark 
                            ? "text-white" 
                            : "text-darkGray-500"
                    } 
                    font-ralewaySemiBold 
                    text-xs capitalize
                `}
                numberOfLines={1}
            >
                {muscleLabel}
            </Text>
        </Pressable>
    );
});

export default MusclePill;
