import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import type { DateData } from 'react-native-calendars';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { StatsWeekChart } from '../stats/StatsWeekChart';
import { FlatList } from 'react-native';
import { format, eachDayOfInterval, parseISO, endOfDay, addDays } from 'date-fns';
import { getWorkoutProgressByDate } from '@/database/sqlite';
import { getHistorialTime } from '@/lib/utils/getHistorialTime';
import { WorkoutProgress } from '@/types/interfaces/entities/progress';
import { getMinutesSumFromTime } from '@/lib/utils/getHistorialTime';
import { getLocaleDateTime } from '@/lib/utils/getLocaleTime';
import { startOfDay } from 'date-fns';
import { StatsCustomChart } from '../stats/StatsCustomChart';

const CalendarResumeFull = () => {
    const { isDark } = useTheme();
    const { loggedUserInfo } = useUser();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
    const [workouts, setWorkouts] = useState<any[]>([]);
    const [minutesSum, setMinutesSum] = useState<number>(0);
    const [minutesPerDay, setMinutesPerDay] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Estado de carga

    useEffect(() => {
        if (startDate && endDate) {
            const start = startOfDay(new Date(startDate));
            const end = startOfDay(new Date(endDate));
            getInformationRange(start, end);
        }
    }, [startDate, endDate]);

    const getInformationRange = async (start: Date, end: Date) => {
        setLoading(true); // Inicia el estado de carga
        const dates = eachDayOfInterval({
            start: startOfDay(start),
            end: startOfDay(end)
        });
        let allWorkouts: any[] = [];
        let totalMinutes = 0;
        const dailyMinutes: number[] = [];

        for (const date of dates) {
            const [workoutsForDay, minutesForDay] = await getDayInformation(date);
            allWorkouts = allWorkouts.concat(workoutsForDay);
            dailyMinutes.push(minutesForDay as number);
            totalMinutes += minutesForDay as number;
        }

        setWorkouts(allWorkouts);
        setMinutesSum(totalMinutes);
        setMinutesPerDay(dailyMinutes);
        setLoading(false); // Termina el estado de carga
    };

    const getDayInformation = async (date: Date) => {
        const [dateForSearch, _] = getLocaleDateTime(date);
        const workoutDayProgressQueried = await getWorkoutProgressByDate(loggedUserInfo?.id ?? '', dateForSearch);
        const workoutsInDay = workoutDayProgressQueried.map((workout: any) => workout.workoutDuration);
        const totalTime = getHistorialTime(workoutsInDay);
        const minutesSum = getMinutesSumFromTime(totalTime);
        return [
            workoutDayProgressQueried,
            minutesSum
        ];
    };

    const handleDayPress = (day: DateData) => {
        const adjustedDate = startOfDay(new Date(day.dateString));
        const selectedDate = addDays(adjustedDate, 1);
        if (!startDate || (startDate && endDate)) {
            setStartDate(selectedDate);
            setEndDate(null);
            setMarkedDates({
                [day.dateString]: { selected: true, startingDay: true, color: 'blue', textColor: 'white' },
            });
        } else if (startDate && !endDate) {
            let selectedStartDate = startDate;
            let selectedEndDate = selectedDate;

            if (selectedDate < startDate) {
                selectedStartDate = selectedDate;
                selectedEndDate = startDate;
            }

            const range = eachDayOfInterval({
                start: selectedStartDate,
                end: selectedEndDate,
            });

            const newMarkedDates: { [key: string]: any } = {};
            range.forEach((date, index) => {
                const dateString = format(date, 'yyyy-MM-dd');
                newMarkedDates[dateString] = {
                    color: 'blue',
                    textColor: 'white',
                    ...(index === 0 ? { startingDay: true } : {}),
                    ...(index === range.length - 1 ? { endingDay: true } : {}),
                };
            });

            setStartDate(startOfDay(selectedStartDate));
            setEndDate(endOfDay(selectedEndDate));
            setMarkedDates(newMarkedDates);
        }
    };

    const renderItem = (item: any) => {
        const workoutProgress = item.item as WorkoutProgress;
        return (
            <View className={`mb-4 p-4 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"} rounded-lg`}>
                <Text className={`text-xl font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"}`}>
                    {workoutProgress.workoutName}
                </Text>
                <Text className={`text-sm font-ralewayLight ${isDark ? "text-white" : "text-darkGray-500"}`}>
                    Duración: {workoutProgress.workoutDuration}
                </Text>
                <Text className={`text-sm font-ralewayLight ${isDark ? "text-white" : "text-darkGray-500"} text-justify`}>
                    Fecha: {workoutProgress.workoutDay}
                </Text>
                <Text className={`text-sm font-ralewayLight ${isDark ? "text-white" : "text-darkGray-500"} text-justify`}>
                    Hora: {workoutProgress.workoutHour}
                </Text>
            </View>
        );
    };

    const ListHeader = () => (
        <View className='mb-4'>
            <Text className={`text-xl font-ralewayLight 
                    ${isDark ? "text-white" : "text-darkGray-500"}`}>
                Selecciona un rango de fechas para observar tus rutinas
            </Text>
            <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                    ...markedDates,
                    ...(startDate && !endDate ? { [format(startDate, 'yyyy-MM-dd')]: { selected: true, marked: true, selectedColor: 'blue' } } : {})
                }}
                markingType={'period'}
                monthFormat={'yyyy MMMM'}
                onMonthChange={(month: DateData) => {
                    console.log('Mes cambiado:', month);
                }}
                hideExtraDays={true}
                disableMonthChange={false}
                firstDay={1}
                style={{ width: '100%' }}
                theme={{
                    backgroundColor: isDark ? '#1c1c1c' : '#ffffff',
                    calendarBackground: isDark ? '#1c1c1c' : '#ffffff',
                    textSectionTitleColor: isDark ? '#ffffff' : '#000000',
                    selectedDayBackgroundColor: '#0055f9',
                    selectedDayTextColor: isDark ? '#ffffff' : '#1aa',
                    todayTextColor: '#0055f9',
                    dayTextColor: isDark ? '#ffffff' : '#1c1c1c',
                    textDisabledColor: '#111',
                    arrowColor: '#0055f9',
                    monthTextColor: isDark ? '#ffffff' : '#000000',
                    indicatorColor: 'blue',
                    textDayFontFamily: 'Raleway-Regular',
                    textMonthFontFamily: 'Raleway-Bold',
                    textDayHeaderFontFamily: 'Raleway-Regular',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                    ...loading && {
                        dayTextColor: 'rgba(255, 255, 255, 0.5)',  // Reduce opacity when loading
                    }
                }}
            />
            {startDate && endDate && (
                <View className='my-2'>
                    <Text className={`text-xl font-ralewayBold 
                        ${isDark ? "text-white" : "text-darkGray-500"}`}>
                        Información desde {format(startDate, 'yyyy-MM-dd')} hasta {format(endDate, 'yyyy-MM-dd')}
                    </Text>
                    <View className='my-2'>
                        <Text className={`text-3xl font-semibold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>
                            Total Rutinas: {workouts.length}
                        </Text>
                        <Text className={`text-xl font-ralewayLight text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>   
                            Total minutos trabajados: {minutesSum}
                        </Text>
                    </View>
                    <StatsCustomChart data={minutesPerDay} labels={[startDate.toLocaleDateString(), endDate.toLocaleDateString()]}  />
                </View>
            )}
        </View>
    );

    return (
        <View className='flex-1'>
            {loading && (
                <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-10 bg-black bg-opacity-50">
                    <ActivityIndicator size="large" color="#fff" />
                    <Text className="text-white mt-2">Cargando...</Text>
                </View>
            )}
            <FlatList
                data={workouts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListHeaderComponent={ListHeader}
                ListEmptyComponent={
                    <Text className={`text-center text-lg font-ralewayLight 
                        ${isDark ? "text-white" : "text-darkGray-500"}`}>
                        No hay información disponible para este rango de fechas.
                    </Text>
                }
                contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 4 }}
            />
        </View>
    );
};

export default CalendarResumeFull;
