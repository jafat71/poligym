import InputRadioButtonQuestion from '@/components/ui/form/welcomeForm/InputRadioButtonQuestion';
import React from 'react';

const Form02 = () => {
    return (
        <>
            <InputRadioButtonQuestion
                question='¿Cuál es tu peso?'
                options={["Kgs", "Lbs"]}
                maxLength={3}
                keyboardType='number-pad'
                placeholder='60'
            />
            <InputRadioButtonQuestion
                question='¿Cuál es tu altura?'
                options={["Cms", "Pies"]}
                maxLength={3}
                keyboardType='number-pad'
                placeholder='170'
            />

        </>
    );
};

export default Form02;
