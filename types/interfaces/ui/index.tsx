import { ReactNode } from "react";
import { KeyboardTypeOptions } from "react-native";

export interface IconTextInputFormProps {
    title: string;
    icon: ReactNode;
    inputPlaceholder: string;
    inputKeyboardType: KeyboardTypeOptions | undefined;
    inputValue: string | undefined;
    inputOnChangeText: ((text: string) => void) | undefined;
    inputSecure?: boolean;
    enabled?: boolean
}


export interface RadioButtonComponentProps {
    options: string[];
    rbComponentStyle?: string;
    rbIndividualRadioButtonStyle?: string;
    rbIndividualTextBtnStyle?: string
}

export interface FloatingModalProps {
    modalVisible: boolean;
    toggleModal: () => void;
}
