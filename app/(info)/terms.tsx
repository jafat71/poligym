import { termsContent } from '@/constants'
import { View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { Text } from 'react-native'

const terms = () => {
    return (
        <View className='flex-1'>
            <FlatList
                data={termsContent}
                className='p-4'
                ListHeaderComponent={() => (
                    <View className='flex flex-col items-start justify-center'>
                        <Text className={`text-4xl font-ralewayBold text-start text-darkGray-900`}>
                            Términos y Condiciones
                        </Text>
                        <Text className={`text-sm font-raleway text-center text-darkGray-900 mb-4`}>
                            Última actualización: 06/10/2024
                        </Text>
                        <Text className={`text-sm font-raleway min-w-full text-darkGray-900 mb-2 text-justify`}>
                                Bienvenido a la aplicación POLIGYM. Esta aplicación ha sido diseñada para facilitar a los estudiantes,
                                profesores y personal administrativo de la Escuela Politécnica Nacional el acceso a los servicios del gimnasio de la universidad.
                                Al utilizar esta aplicación, aceptas los términos y condiciones que se detallan a continuación.
                                Si no estás de acuerdo con alguno de estos términos, te recomendamos que no utilices la aplicación.
                            </Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <View className='flex flex-col items-start'>
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
        </View>
    )
}

export default terms