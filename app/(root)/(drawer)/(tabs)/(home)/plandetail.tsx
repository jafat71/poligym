import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { useNavigationFlowContext } from '@/context/NavFlowContext'
import { useTheme } from '@/context/ThemeContext'
import { Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const HEADER_HEIGHT = 300
const HEADER_MIN_HEIGHT = 110
const STICKY_HEADER_HEIGHT = 110

const plandetail = () => {
    const { screenPlan } = useNavigationFlowContext()
    const { isDark } = useTheme()
    const scrollY = useRef(new Animated.Value(0)).current
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-base font-raleway`
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
                    source={{ uri: screenPlan?.image }}
                    className='absolute inset-0 w-full h-full'
                    style={{ resizeMode: 'cover' }}
                />
                <View className='absolute inset-0 bg-black/40' />
            </Animated.View>

            <Animated.View
                className='absolute left-0 right-0 px-4 z-10'
                style={[titleAnimatedStyle, {
                    top: HEADER_HEIGHT - HEADER_MIN_HEIGHT,
                    height: STICKY_HEADER_HEIGHT,
                    justifyContent: 'center',
                }]}>
                <Text className={`${textStyle} text-center text-2xl font-ralewayExtraBold`}>
                    {screenPlan?.title}
                </Text>

                <View
                    className={`absolute bottom-0 right-0 left-0 py-1 h-
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
                    className={`px-4 ${isDark ? 'bg-darkGray-500' : 'bg-white'} py-2`}
                    style={{
                        transform: [{ translateY: contentTranslateY }],
                        minHeight: '100%',

                    }}
                >
                    <Pressable className='w-full bg-eBlue-500 rounded-full p-2 my-2'>
                        <Text className={`text-white text-center 
                            font-ralewayBold text-lg
                        `}>
                            Seleccionar
                        </Text>
                    </Pressable>

                    <View className='flex-row justify-between'>
                        <View className='flex flex-col items-start justify-center'>
                            <Text className={`${textStyle}`}>
                                Duración
                            </Text>
                            <Text className={`${textStyle}`}>
                                {screenPlan?.duration}
                            </Text>
                        </View>
                        <View>
                            <Text className={`${textStyle}`}>
                                Dificultad
                            </Text>
                            <Text className={`${textStyle}`}>
                                {screenPlan?.level}
                            </Text>
                        </View>
                        <View>
                            <Text className={`${textStyle}`}>
                                Usuarios
                            </Text>
                            <Text className={`${textStyle}`}>
                                {screenPlan?.users}
                            </Text>
                        </View>
                        <View>
                            <Text className={`${textStyle}`}>
                                Valoración
                            </Text>
                            <Text className={`${textStyle}`}>
                                {screenPlan?.rating}/5
                            </Text>
                        </View>
                    </View>
                    <View >
                        <Text className={`
                            ${textStyle}
                         my-2
                        `}>
                            {screenPlan?.description}
                        </Text>

                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => (
                            <View
                                key={item}
                                className={`flex-1
                                    ${isDark ? 'bg-darkGray-400' : 'bg-gray-100'}
                                    p-4 mb-4 rounded-lg
                                `}
                            >
                                <Text className={`
                                    ${isDark ? 'text-white' : 'text-darkGray-500'}
                                    text-base font-ralewayMedium
                                `}>
                                    Rutina {item}
                                </Text>
                            </View>
                        ))}
                    </View>
                </Animated.View>
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

export default plandetail