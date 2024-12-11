import IconButton from '@/components/ui/common/buttons/IconButton';
import YouPageButton from '@/components/ui/common/buttons/YouPageButton';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, StatusBar, Text, View } from 'react-native';

const Index = () => {
    const { loggedUserInfo } = useUser()
    const { isDark } = useTheme()
    return (
        <View className={`flex-1 ${isDark ? 'bg-darkGray-900' : 'bg-white'}`}>
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={isDark ? '#1c1c1c' : '#fff'}
            />
            <View className="flex-row items-center px-4 py-2">
                <View className={`rounded-full w-20 h-20 flex items-center justify-center border-2 border-eBlue-500`}>
                    {loggedUserInfo?.avatarUrl ? (
                        <Image source={{ uri: loggedUserInfo.avatarUrl }}
                            className='w-full h-full rounded-full'
                            resizeMode='cover' />
                    ) : (
                        <Text className="text-4xl font-raleway text-eBlue-500">
                            {loggedUserInfo?.name?.split(' ').map(name => name[0]).join('')}
                        </Text>
                    )}
                </View>
                <View className="pl-3 flex-1">
                    <Text
                        numberOfLines={2}
                        className={`text-2xl font-ralewayBold text-${isDark ? 'white' : 'darkGray-500'} flex-wrap`}>
                        {loggedUserInfo?.name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        className={`text-xs font-raleway text-${isDark ? 'white' : 'darkGray-500'}`}>
                        {loggedUserInfo?.email}
                    </Text>
                </View>
                <View>
                    <IconButton
                        icon={<Ionicons name="pencil-outline" size={24} color={isDark ? 'white' : '#1c1c1c'} />}
                        onPress={() => {
                            router.push('/(root)/(config)/updateinformation')
                        }}
                    />
                </View>

            </View>

            <View className='flex-1 '>

                <YouPageButton
                    onPress={() => router.push('/(root)/(user)/profile')}
                    title='Tus Posts'
                />

                <YouPageButton
                    onPress={() => { }}
                    title='Tus Favoritos'
                />

                <YouPageButton
                    onPress={() => { }}
                    title='Historial'
                />

                <YouPageButton
                    onPress={() => { router.push('/(root)/(user)/plans') }}
                    title='Tus Planes'
                />
            </View>

        </View>
    );
}

export default Index;
