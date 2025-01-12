const convertTimeToSeconds = (time: string) => {
    const [minutes, seconds] = time.split(':').map(Number);  // Divide y convierte a número
    return minutes * 60 + seconds;  // Convierte todo a segundos
};

const convertSecondsToTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);  
    const remainingSeconds = seconds % 3600;  
    const minutes = Math.floor(remainingSeconds / 60); 
    const secs = remainingSeconds % 60;  
    return `${String(hours).padStart(2, '0')}h${String(minutes).padStart(2, '0')}m${String(secs).padStart(2, '0')}s`;  // Devuelve en formato "HHhMMmSSs"
};

const sumWorkoutTimes = (times: string[]) => {
    const totalSeconds = times.reduce((sum, time) => sum + convertTimeToSeconds(time), 0);  // Suma todos los tiempos en segundos
    return convertSecondsToTime(totalSeconds);  // Convierte el total de segundos a "HHhMMmSSs"
};

export const getHistorialTime = (times: string[]) => {
    const totalWorkoutTime = sumWorkoutTimes(times);  
    return totalWorkoutTime; 
};

export const getMinutesSumFromTime = (time: string): number => {
    const [hoursPart, minutesAndSeconds] = time.split('h');
    const [minutesPart, secondsPart] = minutesAndSeconds.split('m');

    const hoursNumber = Number(hoursPart.replace(/^0+/, '')); // Remove leading zeros
    const minutesNumber = Number(minutesPart.replace(/^0+/, '')); // Remove leading zeros
    const secondsNumber = Number(secondsPart.replace(/^0+/, '').replace('s', '')); // Remove leading zeros and 's'

    return (hoursNumber * 60) + minutesNumber + Math.floor(secondsNumber / 60);
};

