import { Dimensions, Pressable, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { useNavigationFlowContext } from '@/context/NavFlowContext'
import { useTheme } from '@/context/ThemeContext'
import { Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useUser } from '@/context/UserContext'
import * as Progress from 'react-native-progress';

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
        const weeks = []
        for (let i = 0; i < screenPlan?.duracion!; i++) {
            weeks[i] = screenPlan?.detalleDias
        }
        return (
            <>
                {
                    weeks.map((wk, index) => (
                        <View
                            key={index}
                            className={`w-full p-2 my-2
                        flex flex-row items-start justify-start
                        border-l border-${isDark ? "white" : "darkGray-500"}
                        `}>
                            <View className='flex flex-col items-center'>
                                <Text className={`${textStyle} text-base my-2`}>Semana {index + 1}</Text>
                                <Progress.Pie progress={0.4} size={50} color={isDark ? "white" : "#1c1c1c"} />
                            </View>

                            <View
                                className={`w-full p-2 my-2 mx-2
                                    flex flex-row items-start justify-start
                                    border-l border-${isDark ? "white" : "darkGray-500"}
                                    `}
                            >
                                <View>
                                 
                                </View>
                            </View>
                        </View>
                    ))
                }
            </>
        )
    }
    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkGray-500' : 'bg-white'}`}>

            <TouchableOpacity
                onPress={() => router.back()}
                className='absolute top-8 left-2 z-20 p-2 rounded-full bg-black/30'
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

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
                    <View className='my-2'>

                        <View className={`border-2 border-${isDark ? "white" : "darkGray-500"} p-2
                            rounded-md
                        `}>
                            <Text className={`${textStyle} text-lg`}>Información del Plan</Text>

                            <View className='flex flex-row items-start justify-center'>
                                <View className='w-1/4'>
                                    <Ionicons name='time-outline' size={22} color={isDark ? "white" : "#1c1c1c"} />
                                    <Text className={`${textStyle}`}>Duración</Text>
                                </View>
                                <Text className={`${textStyle} w-3/4`}>{screenPlan?.duracion} Semanas</Text>
                            </View>

                            <View className='flex flex-row items-start justify-center'>
                                <View className='w-1/4'>
                                    <Ionicons name='walk-outline' size={22} color={isDark ? "white" : "#1c1c1c"} />
                                    <Text className={`${textStyle}`}>Dificultad</Text>
                                </View>
                                <Text className={`${textStyle} w-3/4`}>
                                    {screenPlan?.dificultad}
                                </Text>
                            </View>

                            <View className='flex flex-row items-start justify-center'>
                                <View className='w-1/4'>
                                    <Ionicons name='book-outline' size={22} color={isDark ? "white" : "#1c1c1c"} />
                                    <Text className={`${textStyle}`}>Descripción</Text>
                                </View>
                                <Text className={`${textStyle} w-3/4`}>
                                    {screenPlan?.descripcion}
                                </Text>
                            </View>
                        </View>

                    </View>

                    <View >
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