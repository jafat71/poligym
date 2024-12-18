import { FAQs, termsContent } from '@/constants'
import { View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { Text } from 'react-native'

const faq = () => {
    return (
        <FlatList
            data={FAQs}
            className='p-4'
            ListHeaderComponent={() => (
                <View className='flex flex-col items-start justify-center'>
                    <Text className={`text-4xl font-ralewayBold text-start text-darkGray-900`}>
                        Preguntas Frecuentes
                    </Text>
                    <Text className={`text-sm font-raleway text-center text-darkGray-900 mb-4`}>
                        Última actualización: 06/10/2024
                    </Text>
                </View>
            )}
            renderItem={({ item }) => (
                <View className='items-start justify-center'>
                    <Text
                        className={`text-xl font-ralewayBold text-start text-darkGray-900`}
                    >{item.title}</Text>
                    <Text
                        className={`text-sm font-raleway text-darkGray-900 text-justify`}
                    >{item.description}</Text>
                </View>
            )}
            ListFooterComponent={<View style={{ height: 50 }} />} 
            keyExtractor={(_, index) => index.toString()}
        />
    )
}

export default faq