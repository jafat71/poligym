import { Pressable, Text, View } from 'react-native';

import { router, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useTheme } from '@/context/ThemeContext';

import TabIcon from '@/components/ui/common/bottomtab/TabIcon';

export default function TabsLayout() {

  const { isDark } = useTheme()

  const tabBarBackgroundColor = isDark ? "#1c1c1c" : "#fff";
  const tabBarIconColor = isDark ? "#fff" : "#1c1c1c";
  const tabBarActiveIconColor = isDark ? "#1c1c1c" : "#fff";
  const tabBarActiveColor = "#0055f4";

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabBarBackgroundColor,
          height: 60,
          borderColor: isDark ? '#1c1c1c' : '#fff',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: '800',
        },
        tabBarActiveTintColor: tabBarActiveColor,
      }}
    >
      <Tabs.Screen name="(home)" options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            color={tabBarIconColor}
            name="barbell-outline"
          />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarShowLabel: false,
      }}
      />
      <Tabs.Screen name="(library)" options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            color={tabBarIconColor}
            name="library"
          />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarShowLabel: false,
      }} />
      <Tabs.Screen name="(stats)" options={{
        headerTitle: () => (
          <View className='w-full items-center p-4'>
            <Text className={`text-xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Estadísticas</Text>
          </View>
        ),
        headerLeft: () => (
          <Pressable
            onPress={() => {
              router.navigate('/(tabs)/home');
            }}
            className='ml-4'
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => {
              router.navigate('/(config)/config')
            }}
            className='mr-4'
          >
            <Ionicons name="settings-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
          </Pressable>
        ),
        headerStyle: {
          backgroundColor: isDark ? '#1c1c1c' : '#fff',
        },
        headerTintColor: isDark ? "#fff" : "#1c1c1c",
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            color={tabBarIconColor}
            name="bar-chart"
          />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarShowLabel: false,
      }} />
      <Tabs.Screen name="(community)" options={{
        headerTitle: () => (
          <View className='w-full items-center p-4'>
            <Text className={`text-xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Comunidad</Text>
          </View>
        ),
        headerLeft: () => (
          <Pressable
            onPress={() => {
              router.navigate('/(tabs)/home');
            }}
            className='ml-4'
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => {
              router.navigate('/(config)/config')
            }}
            className='mr-4'
          >
            <Ionicons name="settings-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
          </Pressable>
        ),
        headerStyle: {
          backgroundColor: isDark ? '#1c1c1c' : '#fff',
        },
        headerTintColor: isDark ? "#fff" : "#1c1c1c",
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused }) => (
          <TabIcon
          focused={focused}
          color={tabBarIconColor}
            name="people-sharp"
          />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarShowLabel: false,
      }} />
      <Tabs.Screen name="(profile)" options={{
        headerTitle: () => (
          <View className='w-full items-center p-4'>
            <Text className={`text-xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Tus Posts</Text>
          </View>
        ),
        headerLeft: () => (
          <Pressable
            onPress={() => {
              router.navigate('/(tabs)/home');
            }}
            className='ml-4'
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => {
              router.navigate('/(config)/config')
            }}
            className='mr-4'
          >
            <Ionicons name="settings-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
          </Pressable>
        ),
        headerStyle: {
          backgroundColor: isDark ? '#1c1c1c' : '#fff',
        },
        headerTintColor: isDark ? "#fff" : "#1c1c1c",
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused }) => (
          <TabIcon
          focused={focused}
          color={tabBarIconColor}
            name="person"
          />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarShowLabel: false,
      }} />

    </Tabs>
  );
}
