import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import MainLogoCustomComponent from "../ui/common/logo/mainLogo";
import Swiper from "react-native-swiper";
import { OnboardingItems } from "@/constants";
import { useTheme } from "@/context/ThemeContext";

const OnBoardingSwiper = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { isDark } = useTheme()
    return (
        <>
            <View className="absolute w-full top-1/4 items-center z-10 ">
                <MainLogoCustomComponent height="75" width="75" principal="#fff" />
                <View className="flex flex-row items-center justify-center">
                    <Text className={`text-3xl font-ralewayExtraBold text-white`}>
                        POLIGYM
                    </Text>
                </View>
            </View>

            <View className="flex-1 justify-around items-center text-center">
                <Swiper
                    dotColor={`${isDark ? "#fff" : "#1c1c1c"}`}
                    activeDotColor="#0059ff"
                    autoplay
                    autoplayTimeout={3}
                    loop={false}
                    showsPagination={true}
                    showsButtons={false}
                    onIndexChanged={(index) => setActiveIndex(index)}
                    loadMinimal={false}
                    bounces
                >
                    {OnboardingItems.map((obItem, index) => (
                        <View
                            key={index}
                            className={`flex flex-col items-center rounded-md h-full `}
                        >
                            <Image
                                source={{ uri: obItem.image }}
                                resizeMode="cover"
                                className="w-full h-4/5 rounded-md mb-4 opacity-75"
                            />
                            <View className="items-end p-1">
                                <Text
                                    className={`text-xl font-ralewaySemiBold break-words text-center 
                        mb-2 ${isDark ? "text-white" : "text-darkGray-500"} `}
                                >
                                    {obItem.title}
                                </Text>
                            </View>
                        </View>
                    ))}
                </Swiper>
            </View>
        </>
    );
};

export default OnBoardingSwiper;
