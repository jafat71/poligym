import MainLogoCustomComponent from '@/components/ui/logo/mainLogo';
import MainLogoGradientComponent from '@/components/ui/logo/mainLogoGrandient';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer'
import { Pressable, Text, View } from 'react-native';

const CustomDrawerContent = () => {
    const { isDark, toggleTheme } = useTheme()
    return (
        <DrawerContentScrollView>
            <View className={`p-2 border-[1px] ${isDark ? "border-darkGray-400" : "border-darkGray-200"}  rounded-sm`}>
                <View className='p-2 rounded-lg '>
                    <View className={`pb-2 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-200"}
                    flex flex-row items-center justify-between
                    `}>
                        <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>POLIGYM</Text>
                        <Pressable
                            onPress={() => {
                                router.back()
                            }}
                        >
                            <Ionicons name="arrow-forward-circle-sharp" size={24} color={isDark ? "#fff" : "#1c1c1c"} />

                        </Pressable>
                    </View>

                    <View className={`flex flex-row items-center pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-200"}`}>
                        <View className={`rounded-full w-16 h-16 
                        flex items-center justify-center mt-2
                        border-[1px] 
                        ${isDark ? "border-darkGray-400" : "bg-darkGray-200 border-darkGray-200"}`}>
                            <Text className={` text-2xl font-raleway ${isDark ? "text-white" : "text-darkGray-400"} `}>JD</Text>
                        </View>
                        <View className={`pl-3`}>
                            <Text className={`text-lg font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Jhon Doe</Text>
                            <Text className={`text-lg font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>jhon.doe@epn.edu.ec</Text>

                        </View>
                    </View>
                </View>
            </View>
            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/profile')
                }}
                label={'Mi Perfil'}
                icon={() => (
                    <Ionicons name="person-sharp" size={24} color={`${isDark ? "white" : "#a6a6a6"}`} />
                )}
                labelStyle={{ color: isDark ? "#fff" : '#1c1c1c', fontFamily: 'Raleway-Bold', fontSize: 18 }}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/profile')
                }}
                label={'Mi Plan'}
                icon={() => (
                    <Ionicons name="calendar-clear-outline" size={24} color={`${isDark ? "white" : "#a6a6a6"}`} />
                )}
                labelStyle={{ color: isDark ? "#fff" : '#1c1c1c', fontFamily: 'Raleway-Bold', fontSize: 18 }}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/profile')
                }}
                label={'Mi Progreso'}
                icon={() => (
                    <Ionicons name="star-half" size={24} color={`${isDark ? "white" : "#a6a6a6"}`} />
                )}
                labelStyle={{ color: isDark ? "#fff" : '#1c1c1c', fontFamily: 'Raleway-Bold', fontSize: 18 }}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/profile')
                }}
                label={'Historial'}
                icon={() => (
                    <Ionicons name="reload-circle-outline" size={24} color={`${isDark ? "white" : "#a6a6a6"}`} />
                )}
                labelStyle={{ color: isDark ? "#fff" : '#1c1c1c', fontFamily: 'Raleway-Bold', fontSize: 18 }}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/profile')
                }}
                label={'Favoritos'}
                icon={() => (
                    <Ionicons name="heart-circle" size={24} color={`${isDark ? "white" : "#a6a6a6"}`} />
                )}
                labelStyle={{ color: isDark ? "#fff" : '#1c1c1c', fontFamily: 'Raleway-Bold', fontSize: 18 }}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/config')
                }}
                label={'Configuración'}
                icon={() => (
                    <Ionicons name="settings-outline" size={24} color={`${isDark ? "white" : "#a6a6a6"}`} />
                )}
                labelStyle={{ color: isDark ? "#fff" : '#1c1c1c', fontFamily: 'Raleway-Bold', fontSize: 18 }}
            />

            <DrawerItem
                onPress={() => {
                    toggleTheme()
                }}
                label={`Activar Tema ${isDark ? "Claro" : "Oscuro"}`}
                icon={() => (
                    <Ionicons name={isDark ? "sunny-outline" : "moon-outline"} size={24} color={isDark ? "#fff" : "#1c1c1c"} />

                )}
                labelStyle={{ color: isDark ? "#fff" : '#1c1c1c', fontFamily: 'Raleway-Bold', fontSize: 18 }}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(auth)/signin')

                }}
                label={'Salir'}
                icon={() => (
                    <Ionicons name="exit-outline" size={24} color={`#E11F1C`} />
                )}
                labelStyle={{ color: `#E11F1C`, fontFamily: 'Raleway-Bold', fontSize: 18 }}
            />




        </DrawerContentScrollView>
    )
}

export default function RootLayout() {
    const { isDark, toggleTheme } = useTheme()

    return (
        <Drawer
            screenOptions={{
                headerTitle: () => (
                    <View className='flex-1 w-full items-center p-4'>
                        <MainLogoCustomComponent
                            height='24'
                            principal={isDark ? "#fff" : "#1c1c1c"}
                        />
                    </View>
                ),
                headerRight: () => (
                    <View className='flex flex-row items-end justify-end px-4'>
                        <Pressable
                        onPress={()=>{toggleTheme()}}
                        >
                            <Ionicons name={isDark ? "sunny-outline" : "moon-outline"} size={24} color={isDark ? "#fff" : "#1c1c1c"} />

                        </Pressable>
                    </View>
                ),
                headerStyle: {
                    backgroundColor: isDark ? '#1c1c1c' : '#fff',
                },
                headerTintColor: isDark ? "#fff" : "#1c1c1c",
                headerTitleAlign: 'center',
                drawerStyle: {
                    backgroundColor: isDark ? '#1c1c1c' : '#fff',
                    width: '90%'
                },
                drawerLabelStyle: {
                    color: isDark ? '#1c1c1c' : '#fff',
                },
                drawerInactiveBackgroundColor: '#d9d9d9',

            }}
            drawerContent={() => <CustomDrawerContent />}

        />
    );
}
