import LightDarkButton from '@/components/ui/buttons/LightDarkButton';
import MainLogoCustomComponent from '@/components/ui/logo/mainLogo';
import { emptyUser } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer'
import { Text, View } from 'react-native';

const CustomDrawerContent = () => {
    const { isDark, toggleTheme } = useTheme()
    const labelStyle = {
        color: isDark ? "#fff" : '#1c1c1c',
        fontFamily: 'Raleway-SemiBold',
        fontSize: 18,
    }
    const {set1InitUser} = useUser()

    return (
        <DrawerContentScrollView>
            <View className={`p-2 `}>
                <View className='p-2 rounded-lg '>
                    <View className={`pb-2 
                    flex flex-row items-center justify-between
                    `}>
                        <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>POLIGYM</Text>
                        <MainLogoCustomComponent
                            height='25'
                            width='25'
                            principal="#0055f9"
                        />
                    </View>
                    <View className={`flex flex-row items-center pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                        <View className={`rounded-full w-16 h-16 
                        flex items-center justify-center mt-2
                        border-[1px] 
                        ${isDark ? "border-darkGray-400" : "bg-darkGray-200 border-darkGray-500"}`}>
                            <Text className={` text-2xl font-raleway text-eBlue-500 `}>JD</Text>
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
                        <Ionicons name="person-sharp" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                }}
                label={'Mi Plan'}
                icon={() => (
                        <Ionicons name="calendar-clear-outline" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                }}
                label={'Mi Progreso'}
                icon={() => (
                        <Ionicons name="star-half" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                }}
                label={'Historial'}
                icon={() => (
                        <Ionicons name="reload-circle-outline" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                }}
                label={'Favoritos'}
                icon={() => (
                        <Ionicons name="heart-circle" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(profile)/config')
                }}
                label={'Configuración'}
                icon={() => (
                        <Ionicons name="settings-outline" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                    toggleTheme()
                }}
                label={`Activar Tema ${isDark ? "Claro" : "Oscuro"}`}
                icon={() => (
                        <Ionicons name={isDark ? "sunny-outline" : "moon-outline"} size={24} color={isDark ? "#fff" : "#1c1c1c"} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                    set1InitUser(emptyUser)
                    router.dismissAll()
                }}
                label={'Salir'}
                icon={() => (

                        <Ionicons name="exit-sharp" size={24} color={`#E11F1C`} />
                )}
                labelStyle={{ color: `#E11F1C`, fontFamily: 'Raleway-Bold', fontSize: 18 }}
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
                    <View className='flex-1 w-full items-center p-4'>
                        <MainLogoCustomComponent
                            height='24'
                            principal={isDark ? "#fff" : "#1c1c1c"}
                        />
                    </View>
                ),
                headerRight: () => (
                    <LightDarkButton
                        style="w-full flex flex-row items-end justify-end px-4"
                    />
                ),
                headerStyle: {
                    backgroundColor: isDark ? '#1c1c1c' : '#fff',
                },
                headerTintColor: isDark ? "#fff" : "#1c1c1c",
                headerTitleAlign: 'center',
                drawerStyle: {
                    backgroundColor: isDark ? '#1c1c1c' : '#fff',
                    width: '87%'
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
