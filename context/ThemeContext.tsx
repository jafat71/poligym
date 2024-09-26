import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ isDark: false });

interface ThemeProviderProps {
    children: ReactNode; 
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    
    return (
        <ThemeContext.Provider value={{ isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
