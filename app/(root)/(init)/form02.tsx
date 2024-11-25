import React, { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { useTheme } from '@/context/ThemeContext';

import { SnapCarousel } from '@/components/ui/common/carousel/SnapCarousel';
import { Text } from 'react-native';
import SimpleInfoComponent from '@/components/ui/common/info/SimpleInfoComponent';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';

const Form02 = () => {

    const { tmpUser, updateInitUserShell } = useNavigationFlowContext()

    const [selectedWeight, setSelectedWeight] = useState(tmpUser?.userWeight || 70);
    const weightFlatListRef = useRef(null);
    const weights = Array.from({ length: 70 }, (_, i) => i + 40);

    const [selectedHeight, setSelectedHeight] = useState(tmpUser?.userHeight || 170);
    const heightFlatListRef = useRef(null);
    const heights = Array.from({ length: 60 }, (_, i) => i + 140);

    const initialIndexWeight = tmpUser?.userWeight ? tmpUser?.userWeight - 40 : 30
    const initialIndexHeight = tmpUser?.userHeight ? tmpUser?.userHeight - 140 : 30

    const handleContinue = () => {
        updateInitUserShell({
            ...tmpUser,
            userWeight: selectedWeight,
            userHeight: selectedHeight
        })
        router.push('/form03')
    }
    return (
        <View className="flex-1 w-full flex flex-col items-center justify-between">

             <Text className="text-white text-4xl font-ralewayExtraBold">
                Cuéntanos de ti
            </Text>

            <View className={`flex flex-row w-full`}>
                
                <View className={`w-1/2 flex flex-col items-center justify-center`}>
                    <Ionicons name="scale" size={24} color="white" />
                    <Text className="text-white text-xl font-ralewaySemiBold mb-4">
                        Tu peso es:
                    </Text>
                    <SnapCarousel
                        dataOptions={weights}
                        flatListRef={weightFlatListRef}
                        selectedOption={selectedWeight}
                        setSelectedOption={setSelectedWeight}
                        initialIndex={initialIndexWeight}
                    />
                    <Text className="text-white text-2xl font-ralewaySemiBold my-4">{selectedWeight} KG</Text>

                </View>

                <View className={`w-1/2 flex flex-col items-center justify-center`}>
                    <Ionicons name="body" size={24} color="white" />
                    <Text className="text-white text-xl font-ralewaySemiBold mb-4">
                        Tu altura es:
                    </Text>
                    <SnapCarousel
                        dataOptions={heights}
                        flatListRef={heightFlatListRef}
                        selectedOption={selectedHeight}
                        setSelectedOption={setSelectedHeight}
                        initialIndex={initialIndexHeight}
                    />
                    <Text className="text-white text-2xl font-ralewaySemiBold my-4">{selectedHeight} CM</Text>
                </View>
            </View>

            <View className='w-full'>
                <CTAButtonPrimary
                    onPress={handleContinue}
                    text="Continuar"
                />

            </View>
        </View>
    );
};

export default Form02;
