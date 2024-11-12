import { useState } from 'react';
import { TextInput, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';

interface Props {
    isSearching: boolean;
    searchInput: string;
    handleSearchChange: (text: string) => void;
}

const CustomSearchBar = ({ isSearching, searchInput, handleSearchChange}: Props) => {
    const { isDark } = useTheme()
    const [isActive, setIsActive] = useState(false);
    return (
        <View className={`flex-row items-center p-2  border-2 mb-4 ${
            isDark ? "border-darkGray-400" : "border-gray-300" 
        } ${isActive ? "border-eBlue-500" : ""} transition-all duration-800`}>
            {isSearching ? (
                <Ionicons 
                    name="hourglass-outline" 
                    size={24} 
                    color={isDark ? "#fff" : "#666"} 
                    className="mr-2"
                />
            ) : (
                <Ionicons 
                    name="search" 
                    size={24} 
                    color={isDark ? "#fff" : "#666"} 
                    className="mr-2"
                />
            )}
            <TextInput
                value={searchInput}
                onChangeText={handleSearchChange}
                placeholder="Buscar planes..."
                placeholderTextColor={isDark ? "#999" : "#666"}
                className={`ml-2 flex-1 font-ralewaySemiBold ${isDark ? "text-white" : "text-darkGray-500"}`}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
                blurOnSubmit={false}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}   
            />
        </View>
    );
}

export default CustomSearchBar;
