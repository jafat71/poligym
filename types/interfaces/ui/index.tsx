import { ReactNode } from "react";
import { KeyboardTypeOptions } from "react-native";

export interface NumericInputForm {
    title: string;
    inputPlaceholder: string;
    inputKeyboardType: KeyboardTypeOptions | undefined;
    inputValue: string | undefined;
    inputOnChangeText: ((text: string) => void) | undefined;
    inputSecure?: boolean;
    enabled?: boolean;
    maxLength?: number;
    alert?: boolean;
    alertMessage?: string;
    subFn?: () => void;
    addFn?: () => void;
}

export interface NumericInputNotBtnsForm {
    inputPlaceholder: string;
    inputKeyboardType: KeyboardTypeOptions | undefined;
    inputValue: string | undefined;
    inputOnChangeText: ((text: string) => void) | undefined;
    inputSecure?: boolean;
    enabled?: boolean;
}

export interface DoubleNumericInputForm extends NumericInputForm{
    SecsubFn: () => void;
    SecaddFn: () => void;
    SecinputPlaceholder: string;
    SecinputKeyboardType: KeyboardTypeOptions | undefined;
    SecinputValue: string | undefined;
    SecinputOnChangeText: ((text: string) => void) | undefined;
    SecinputSecure?: boolean;
    Secenabled?: boolean;
    SecmaxLength?: number;
}


export interface RadioButtonComponentProps {
    options: string[];
    rbComponentStyle?: string;
    rbIndividualRadioButtonStyle?: string;
    rbIndividualTextBtnStyle?: string;
    selectedValue: any;
    setSelectedValue: React.Dispatch<React.SetStateAction<any>>
}

export interface FloatingModalProps {
    modalVisible: boolean;
    toggleModal: () => void;
}


export interface WeekCalendarItemTimeCount {
    day: string;
    month: string;
    isToday: boolean;
    isRestDay: boolean;
    didExercise: boolean;
    dayWorkoutTime: string;
}