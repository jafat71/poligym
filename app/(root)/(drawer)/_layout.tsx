import MainLogoGradientComponent from '@/components/ui/logo/mainLogoGrandient';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer'
import { Text, View } from 'react-native';

const CustomDrawerContent = () => {
    const { isDark } = useTheme()
    return (
        <DrawerContentScrollView>
            <View className='p-2'>
                <Text className='text-4xl font-ralewayExtraBold text-white'>
                    POLIGYM
                </Text>
                <View className='flex flex-row items-center my-2 bg-eBlue-700 rounded-full'>
                    <View className={`w-14 h-14 scale-110 rounded-full  flex items-center justify-center p-1 ${isDark ? "bg-eBlue-500" : "bg-eBlue-900"}  `}>
                        <Ionicons name="person-circle" size={42} color={`#fff`} />
                    </View>
                    <Text className='text-3xl text-lightGreen font-ralewayBold pl-2'>Jhon Doe</Text>

                </View>
            </View>
            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/profile')
                }}
                label={'Mi Perfil'}
                icon={() => (
                    <Ionicons name="person-sharp" size={32} color={`#fff`} />
                )}
                labelStyle={{ color: 'white', fontFamily: 'Raleway-Bold', fontSize: 22 }}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/profile')
                }}
                label={'Mi Plan'}
                icon={() => (
                    <Ionicons name="calendar-clear-outline" size={32} color={`#fff`} />
                )}
                labelStyle={{ color: 'white', fontFamily: 'Raleway-Bold', fontSize: 22 }}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/profile')
                }}
                label={'Mi Progreso'}
                icon={() => (
                    <Ionicons name="star-half" size={32} color={`#fff`} />
                )}
                labelStyle={{ color: 'white', fontFamily: 'Raleway-Bold', fontSize: 22 }}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/profile')
                }}
                label={'Historial'}
                icon={() => (
                    <Ionicons name="reload-circle-outline" size={32} color={`#fff`} />
                )}
                labelStyle={{ color: 'white', fontFamily: 'Raleway-Bold', fontSize: 22 }}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/profile')
                }}
                label={'Favoritos'}
                icon={() => (
                    <Ionicons name="heart-circle" size={32} color={`#fff`} />
                )}
                labelStyle={{ color: 'white', fontFamily: 'Raleway-Bold', fontSize: 22 }}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/config')
                }}
                label={'Configuración'}
                icon={() => (
                    <Ionicons name="settings-outline" size={32} color={`#fff`} />
                )}
                labelStyle={{ color: 'white', fontFamily: 'Raleway-Bold', fontSize: 22 }}
            />

            <View style={{ flexGrow: 1 }} />

            <DrawerItem
                onPress={() => {
                    router.push('/(auth)/signin')

                }}
                label={'Salir'}
                icon={() => (
                    <Ionicons name="exit-outline" size={32} color={`#E11F1C`} />
                )}
                labelStyle={{ color: '#E11F1C', fontFamily: 'Raleway-Bold', fontSize: 22 }}
            />

        </DrawerContentScrollView>
    )
}

export default function RootLayout() {
    const { isDark } = useTheme()

    return (
        <Drawer
            screenOptions={{
                headerTitle: () => (
                    <View className='absolute '>
                        <MainLogoGradientComponent
                            height='40'
                            principal='#77FFAA'
                            secondary='#FFF'

                        />
                    </View>
                ),
                headerStyle: {
                    backgroundColor: isDark ? '#1c1c1c' : '#0059FF',
                },
                headerTintColor: '#77FFAA',
                headerTitleAlign: 'center',
                drawerStyle: {
                    backgroundColor: isDark ? '#1c1c1c' : '#16243E',
                },
                drawerLabelStyle: {
                    color: '#fff',
                },
                drawerActiveTintColor: '#77FFAA',
                drawerInactiveTintColor: '#FFF',

            }}
            drawerContent={() => <CustomDrawerContent/>}

        />
    );
}
