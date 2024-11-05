import { FlatList, Pressable, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { useNavigationFlowContext } from '@/context/NavFlowContext'
import { useTheme } from '@/context/ThemeContext'
import { Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '@/context/UserContext'
import RoutineWeekPlanCard from '@/components/ui/routines/RoutineWeekPlanCard'
import GoBackUpButton from '@/components/ui/common/buttons/GoBackUpButton'
import PLanDetailedInfo from '@/components/ui/plans/PLanDetailedInfo'

const HEADER_HEIGHT = 200
const HEADER_MIN_HEIGHT = 100
const STICKY_HEADER_HEIGHT = 100

const plandetail = () => {
    const { screenPlan } = useNavigationFlowContext()
    const { isDark } = useTheme()
    const scrollY = useRef(new Animated.Value(0)).current
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`
    const { userSelectedPlan, setUserSelectedPlan } = useUser()

    const imageAnimatedStyle = {
        transform: [
            {
                scale: scrollY.interpolate({
                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                    outputRange: [2, 1.75, 1.5],
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    const titleAnimatedStyle = {
        transform: [{
            translateY: scrollY.interpolate({
                inputRange: [0, HEADER_HEIGHT - STICKY_HEADER_HEIGHT],
                outputRange: [0, -(HEADER_HEIGHT - STICKY_HEADER_HEIGHT)],
                extrapolate: 'clamp'
            })
        }],
        backgroundColor: scrollY.interpolate({
            inputRange: [
                HEADER_HEIGHT - STICKY_HEADER_HEIGHT - 20,
                HEADER_HEIGHT - STICKY_HEADER_HEIGHT
            ],
            outputRange: [
                isDark ? '#1c1c1c' : '#fff',
                isDark ? '#1c1c1c' : '#fff',
            ],
            extrapolate: 'clamp'
        })

    }

    const contentTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT - STICKY_HEADER_HEIGHT],
        outputRange: [0, 0],
        extrapolate: 'clamp'
    })

    const isUserActualPlan = userSelectedPlan?.nombre === screenPlan?.nombre

    const handleSelectPlan = () => {
        setUserSelectedPlan(screenPlan)
    }

    const getPlanRoutines = () => {
        const weeks = Array.from({ length: screenPlan?.duracion! }, (_, i) => screenPlan?.detalleDias);

        return (
            <FlatList
                scrollEnabled={false}
                data={weeks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <RoutineWeekPlanCard key={index} index={index} wk={item!} />
                )}
            />
        );
    }

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkGray-500' : 'bg-white'}`}>

            <GoBackUpButton />

            <Animated.View
                className='absolute top-0 left-0 right-0'
                style={[{ height: HEADER_HEIGHT }, imageAnimatedStyle]}>
                <Animated.Image
                    source={{ uri: screenPlan?.imagenPlanEntrenamiento }}
                    className='absolute inset-0 w-full h-full opacity-75'
                    style={{ resizeMode: 'cover' }}
                />
                <View className='inset-0 flex-1 bg-eBlue-500/40 p-4' />
            </Animated.View>

            <Animated.View
                className='absolute left-0 right-0 px-4 z-10'
                style={[titleAnimatedStyle, {
                    top: HEADER_HEIGHT - HEADER_MIN_HEIGHT,
                    height: STICKY_HEADER_HEIGHT,
                    justifyContent: 'center',
                }]}>
                <Text className={`${textStyle} text-center text-xl font-ralewayExtraBold`}>
                    {screenPlan?.nombre}
                </Text>

                <View
                    className={`absolute bottom-0 right-0 left-0 py-1 
                    border-2 border-${isDark ? 'white' : 'darkGray-500'} 
                    ${isDark ? 'bg-white' : 'bg-darkGray-500'}
                    flex-row justify-center items-center
                    `}
                />

            </Animated.View>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                <View style={{ height: HEADER_HEIGHT + STICKY_HEADER_HEIGHT }} />

                <Animated.View
                    className={`px-4 ${isDark ? 'bg-darkGray-500' : 'bg-white'}`}
                    style={{
                        transform: [{ translateY: contentTranslateY }],
                        minHeight: '100%',

                    }}
                >
                    <PLanDetailedInfo screenPlan={screenPlan!} />
                    <View className=''>
                        {getPlanRoutines()}
                    </View>
                </Animated.View>
            </Animated.ScrollView>

            <Pressable onPress={handleSelectPlan} className='w-full bg-eBlue-500 rounded-md p-4 my-2'>
                <Text className='text-white text-center font-ralewayBold text-lg'>
                    Empezar
                </Text>
            </Pressable>

        </SafeAreaView>
    )
}

export default plandetail