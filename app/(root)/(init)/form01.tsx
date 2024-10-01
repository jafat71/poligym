
import RadioButtonComponent from '@/components/ui/buttons/RadioButton';
import SimpleInputQuestion from '@/components/ui/form/welcomeForm/SimpleInputQuestion';
import SimpleRadioButtonQuestion from '@/components/ui/form/welcomeForm/SimpleRadioButton';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';

const Form01 = () => {
    const { isDark } = useTheme()
    return (
        <>
            <SimpleInputQuestion
                question='¿Cuántos años tienes?'
                maxLength={2}
                keyboardType='number-pad'
                placeholder='18'
            />

            <SimpleRadioButtonQuestion
                question='¿Cuál es tu género?'
                options={['Hombre','Mujer']}
            />
    </>
    );
};

export default Form01;
