import { View, Text, Image, StatusBar } from "react-native";
import React, { useState } from "react";
import Animated, {
    FadeIn,
    SlideInRight,
    SlideOutLeft
} from 'react-native-reanimated';
import Swiper from "react-native-swiper";
import { OnboardingItems } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import MainLogoCustomComponent from "../ui/common/logo/mainLogo";
import { LinearGradient } from "expo-linear-gradient";

const OnBoardingSwiper = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { isDark } = useTheme()

    return (
        <View className="flex-1">
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <Animated.View
                entering={FadeIn.duration(1000)}
                className="absolute w-full top-12 items-center z-10"
            >
                <MainLogoCustomComponent height="75" width="75" principal="#fff" />
                <View className="flex flex-row items-center justify-center">
                    <Text className="text-3xl font-ralewayExtraBold text-white drop-shadow-2xl">
                        POLIGYM
                    </Text>
                </View>
            </Animated.View>

            <View className="flex-1">
                <Swiper
                    dotColor={`${isDark ? "#1c1c1c" : "#fff"}`}
                    activeDotColor="#0059ff"
                    autoplay
                    autoplayTimeout={3}
                    loop={false}
                    showsPagination={true}
                    showsButtons={false}
                    onIndexChanged={setActiveIndex}
                    paginationStyle={{ bottom: 30 }}
                    removeClippedSubviews={false}
                    scrollEnabled={true}
                    decelerationRate={0.992}
                    bounces={true}
                >
                    {OnboardingItems.map((obItem, index) => (
                        <Animated.View
                            key={index}
                            className="flex-1"
                            entering={index === activeIndex ? SlideInRight.duration(400).springify().damping(20) : undefined}
                            exiting={index === activeIndex ? SlideOutLeft.duration(400).springify().damping(20) : undefined}
                        >
                            <Image
                                source={{ uri: obItem.image }}
                                resizeMode="cover"
                                className="w-full h-full"
                            />
                            <LinearGradient
                                colors={[
                                    'rgba(0,85,249,0.7)',
                                    'rgba(41,111,255,0.4)',
                                    'rgba(102,155,255,0.2)'
                                ]}
                                className="absolute top-0 left-0 right-0 bottom-0"
                            />
                            <Animated.View
                                className="absolute bottom-0 w-full p-16"

                            >
                                <Text className="text-2xl font-ralewayExtraBold text-white text-center">
                                    {obItem.title.toUpperCase()}
                                </Text>
                            </Animated.View>
                        </Animated.View>
                    ))}
                </Swiper>
            </View>
        </View>
    );
};

export default OnBoardingSwiper;