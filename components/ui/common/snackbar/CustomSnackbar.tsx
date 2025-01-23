import React from 'react';
import { View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';
import MainLogoCustomComponent from '../logo/mainLogo';

interface CustomSnackbarProps {
    visible: boolean;
    message: string;
    setVisible: (visible: boolean) => void;
    translated?:boolean;
    color?:string;
}

const CustomSnackbar = ({ visible, setVisible,  message = "", translated = false, color = "red" }: CustomSnackbarProps) => {
    return (
        <View className={`${translated ? "-translate-y-72" : ""}`}>
            <Snackbar
                id="custom-snackbar"
                accessibilityLabel='custom-snackbar'
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={20000}
                style={{ 
                    backgroundColor: color, 
                    margin: 0,  
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                action={{
                    label: 'Ok',
                    labelStyle: { color: 'white', fontFamily: 'RalewayBold' },
                    onPress: () => {
                        setVisible(false);
                    },
                }}
            >
                <View className="flex-col items-center gap-x-2">
                    <Text className={`text-white text-sm font-ralewayBold`}>{message}</Text>
                </View>
            </Snackbar>
        </View>
    );
};

export default CustomSnackbar;
