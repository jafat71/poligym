import CTAButtonPrimary from "@/components/ui/common/buttons/CtaButtonPrimary";
import { SnapCarousel } from "@/components/ui/common/carousel/SnapCarousel";
import { useNavigationFlowContext } from "@/context/NavFlowContext";
import { useUser } from "@/context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

const Form01 = () => {

    const { loggedUserInfo } = useUser();
    const { tmpUser, updateInitUserShell } = useNavigationFlowContext()

    const [userName, setUserName] = useState(loggedUserInfo?.userName || "");
    const [selectedAge, setSelectedAge] = useState(tmpUser?.userAge || 18);
    const agesFlatListRef = useRef(null);
    const ages = Array.from({ length: 83 }, (_, i) => i + 18);

    const initialIndex = tmpUser?.userAge ? tmpUser?.userAge - 18 : 0

    const handleContinue = () => {
        updateInitUserShell({
            ...tmpUser,
            userAge: selectedAge
        })
        router.push('/form02')
    }
    return (
        <View className="flex-1 w-full flex flex-col items-center justify-center">
            <Text className="text-white text-4xl font-ralewayExtraBold">
                Cuéntanos de ti
            </Text>
            <Text className="text-white text-xl font-ralewaySemiBold">
                Tu nombre es:
            </Text>
            <TextInput
                className="text-2xl bg-eBlue-600 font-ralewayExtraBold text-darkGray-100 my-4 w-full text-center rounded-md p-2"
                value={userName}
                onChangeText={setUserName}
                placeholder="Tu nombre"
                placeholderTextColor="#c3c3c3"
            />

            <Ionicons name="balloon" size={24} color="white" />
            <Text className="text-white text-xl font-ralewaySemiBold mb-4">
                y tienes:
            </Text>

            <SnapCarousel
                dataOptions={ages}
                flatListRef={agesFlatListRef}
                selectedOption={selectedAge}
                setSelectedOption={setSelectedAge}
                initialIndex={initialIndex}
            />
            <Text className="text-white text-2xl font-ralewaySemiBold my-4">{selectedAge} años</Text>

            <View className='w-full'>
                <CTAButtonPrimary
                    onPress={handleContinue}
                    text="Continuar"
                />

            </View>
        </View>
    );
};

export default Form01;
