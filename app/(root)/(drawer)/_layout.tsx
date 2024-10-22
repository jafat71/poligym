import LightDarkButton from '@/components/ui/common/buttons/LightDarkButton';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer'
import { Image, Text, View } from 'react-native';

const CustomDrawerContent = () => {
    const { isDark } = useTheme()
    const { loggedUserInfo} = useUser()
    const labelStyle = {
        color: isDark ? "#fff" : '#1c1c1c',
        fontFamily: 'Raleway-Bold',
        fontSize: 20,
    }
    const itemStyle = { paddingHorizontal: 4 }

    return (
        <DrawerContentScrollView>
            <View className={`p-2 `}>
                <View className='p-4 rounded-lg '>
                    <View className={`flex flex-col items-start pb-5 `}>
                        <View className={`rounded-full w-12 h-12 
                        flex items-center justify-center mt-2
                        border-[2px] border-eBlue-500 
                        ${isDark ? "" : "bg-darkGray-200 "}`}>
                            {
                                loggedUserInfo?.userProfileImgUrl ? (
                                    <Image source={{ uri: loggedUserInfo.userProfileImgUrl }} className='w-12 h-12 rounded-full' resizeMode='contain' />
                                ) : (
                                    <Text className={` text-xl font-raleway text-eBlue-500 `}>
                                        {loggedUserInfo?.userName?.split(' ').map(name => name[0]).join('')}
                                    </Text>
                                )
                            }

                        </View>
                        <View >
                            <Text className={`text-lg font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>
                                {loggedUserInfo?.userName}
                            </Text>
                            <Text className={`text-lg font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>
                                {loggedUserInfo?.userEmail}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <DrawerItem
                onPress={() => {
                    router.push('/(profile)')
                }}
                label={'Perfil'}
                style={itemStyle}
                icon={() => (
                    <Ionicons name="person-outline" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                }}
                label={'Plan'}
                style={itemStyle}
                icon={() => (
                    <Ionicons name="calendar-clear-outline" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                }}
                style={itemStyle}
                label={'Progreso'}
                icon={() => (
                    <Ionicons name="star-outline" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                }}
                style={itemStyle}
                label={'Historial'}
                icon={() => (
                    <Ionicons name="reload-circle-outline" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                }}
                style={itemStyle}
                label={'Favoritos'}
                icon={() => (
                    <Ionicons name="heart-circle-outline" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />

            <DrawerItem
                onPress={() => {
                    router.push('/(root)/(config)/config')
                }}
                style={itemStyle}
                label={'Configuración'}
                icon={() => (
                    <Ionicons name="settings-outline" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                )}
                labelStyle={labelStyle}
            />


            <View className='flex flex-col items-start justify-end h-40 p-6'>
                <LightDarkButton />
            </View>

        </DrawerContentScrollView>
    )
}

export default function RootLayout() {
    const { isDark } = useTheme()

    return (
        <Drawer
            screenOptions={{
                headerShown: false,
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
