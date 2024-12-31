import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { useTheme } from '@/context/ThemeContext'
import { useUser } from '@/context/UserContext'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '../common/buttons/IconButton'
import { StatsWeekChart } from '../stats/StatsWeekChart'
import { FlatList } from 'react-native'
import { format } from 'date-fns'

interface Activity {
    id: number;
    date: string;
    activityType: string;
    duration: string;
    description: string;
}

const mockActivities: Activity[] = [
    {
        id: 1,
        date: '2024-12-31',
        activityType: 'Cardio',
        duration: '00h45m',
        description: 'Running on the treadmill for 45 minutes.',
    },
    {
        id: 2,
        date: '2024-12-31',
        activityType: 'Strength',
        duration: '01h00m',
        description: 'Full-body strength training.',
    },
    {
        id: 3,
        date: '2024-12-30',
        activityType: 'Yoga',
        duration: '00h30m',
        description: 'Morning yoga session.',
    },
    // Agrega más actividades según sea necesario
]

const CalendarResumeFull = () => {
    const { isDark } = useTheme()
    const { loggedUserInfo } = useUser()

    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({})

    const getInformation = () => {
        return mockActivities.filter(activity => activity.date === selectedDate)
    }

    // Marca las fechas que tienen actividades
    const marked = mockActivities.reduce((acc, activity) => {
        acc[activity.date] = { marked: true, dotColor: 'green' }
        return acc
    }, {} as { [key: string]: any })

    const handleDayPress = (day: any) => {
        setSelectedDate(day.dateString)
        setMarkedDates({
            ...marked,
            [day.dateString]: { selected: true, marked: true, selectedColor: 'blue' },
        })
    }

    const renderActivity = ({ item }: { item: Activity }) => (
        <View className='mb-4 p-4 bg-sky-100 rounded-lg'>
            <Text className={`text-xl font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"}`}>
                {item.activityType}
            </Text>
            <Text className={`text-sm font-ralewayLight ${isDark ? "text-white" : "text-darkGray-500"}`}>
                Duración: {item.duration}
            </Text>
            <Text className={`text-sm font-ralewayLight ${isDark ? "text-white" : "text-darkGray-500"} text-justify`}>
                {item.description}
            </Text>
        </View>
    )

    // Componente de encabezado que incluye el Calendario y la información adicional
    const ListHeader = () => (
        <View className='mb-4'>
            <Text className={`text-xl font-ralewayLight 
                    ${isDark ? "text-white" : "text-darkGray-500"}`}>
                Selecciona un periodo de tiempo para obervar tus rutinas
            </Text>
            <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                    ...marked,
                    ...markedDates,
                }}
                monthFormat={'yyyy MMMM'}
                onMonthChange={(month) => {
                    console.log('Mes cambiado:', month)
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
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#0055f9',
                    dayTextColor: isDark ? '#ffffff' : '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    arrowColor: 'orange',
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
                }}
            />
            <View className='my-2'>
                <Text className={`text-xl font-ralewayBold 
                    ${isDark ? "text-white" : "text-darkGray-500"}`}>
                    Información para {selectedDate}
                </Text>
                <View className='my-2'>
                    <Text className={`font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>
                        Rutinas
                    </Text>
                    <Text className={`text-3xl font-semibold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>
                        {mockActivities.filter(activity => activity.date === selectedDate).length}
                    </Text>
                </View>
                <StatsWeekChart />
            </View>
        </View>
    )

    return (
        <View className='flex-1'>
            <FlatList
                data={getInformation()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderActivity}
                ListHeaderComponent={ListHeader}
                ListEmptyComponent={
                    <Text className={`text-center text-lg font-ralewayLight 
                        ${isDark ? "text-white" : "text-darkGray-500"}`}>
                        No hay información disponible para esta fecha.
                    </Text>
                }
                contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 4 }}
            />
        </View>
    )
}

export default CalendarResumeFull