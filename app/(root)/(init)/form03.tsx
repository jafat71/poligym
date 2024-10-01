import LargeSimpleRadioButtonQuestion from '@/components/ui/form/welcomeForm/LargeSimpleRadioButton';
import React from 'react';

const Form03 = () => {
    return (
        <>
            <LargeSimpleRadioButtonQuestion
                question='¿Cuál es tu objetivo físico?'
                options={["Bajar de Peso", "Ganancia Muscular","Mantenerse en forma"]}
            />
            <LargeSimpleRadioButtonQuestion
                question='¿Cuál es tu nivel físico actual?'
                options={["Principiante", "Intermedio","Avanzado"]}
            />
        </>
    );
};

export default Form03;
