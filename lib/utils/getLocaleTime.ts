export const getLocaleDateTime = (date: Date): [string, string] => {
    const optionsDate: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'America/Guayaquil', // Zona horaria de Ecuador
    };

    const optionsTime: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Guayaquil',
    };

    const formattedDate = date.toLocaleDateString('es-EC', optionsDate); // Fecha en formato local
    const formattedTime = date.toLocaleTimeString('es-EC', optionsTime); // Hora en formato local

    return [formattedDate, formattedTime];
};
