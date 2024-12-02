import React from 'react';
import { View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { styled } from 'nativewind';
import MainLogoCustomComponent from '../logo/mainLogo';

interface CustomSnackbarProps {
    visible: boolean;
    message: string;
    color: string;
    textColor: string;
    setVisible: (visible: boolean) => void;
}

const StyledSnackbar = styled(Snackbar);

const CustomSnackbar = ({ visible, setVisible,  message = "", color = "eBlue-500", textColor }: CustomSnackbarProps) => {
    return (
        <View className="absolute bottom-0 justify-center items-center w-full z-50">
            <StyledSnackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={3000}
                className={`bg-${color} rounded-lg mx-4 w-full`}
                action={{
                    label: 'Ok',
                    labelStyle: { color: textColor, fontFamily: 'RalewayBold' },
                    onPress: () => {
                        setVisible(false);
                    },
                }}
            >
                <View className="flex-row items-center gap-x-2">
                    <MainLogoCustomComponent
                        width='30'
                        height='30'
                        principal={textColor}
                    />
                    <Text className={`text-${textColor} text-base font-ralewayBold`}>{message}</Text>
                </View>
            </StyledSnackbar>
        </View>
    );
};

export default CustomSnackbar;
