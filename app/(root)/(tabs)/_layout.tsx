import { Pressable, StatusBar, Text, View } from 'react-native';

import { router, Tabs, usePathname } from 'expo-router';
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
          lazy: false,
        }}
      >
        <Tabs.Screen name="(home)" options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              color={tabBarIconColor}
              name="home"
            />
          ),
          tabBarActiveBackgroundColor: tabBarActiveIconColor,
          tabBarShowLabel: false,
        }}
        />
        <Tabs.Screen name="(library)" options={{
          headerTitle: () => (<></>),
          headerLeft: () => (
            <View className='ml-4'>
              <Text className={`text-xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Biblioteca</Text>
            </View>
          ),
          headerRight: () => (<>
            <View className='mr-4 flex flex-row'>
              <Pressable
                onPress={() => {
                  router.navigate('/(root)/(tabs)/(library)/plan');
                }}
                className='ml-4'
              >
                <Ionicons name="calendar-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
              </Pressable>
              <Pressable
                onPress={() => {
                  router.navigate('/(root)/(tabs)/(library)/routine');
                }}
                className='ml-4'
              >
                <Ionicons name="body-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
              </Pressable>
              <Pressable
                onPress={() => {
                  router.navigate('/(root)/(tabs)/(library)/exercise');
                }}
                className='ml-4'
              >
                <Ionicons name="barbell-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
              </Pressable>
              <Pressable
                onPress={() => {
                  router.navigate('/(root)/(tabs)/(library)/foodplan');
                }}
                className='ml-4'
              >
                <Ionicons name="nutrition-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
              </Pressable>
              <Pressable
                onPress={() => {
                  router.navigate('/(root)/(tabs)/(library)');
                }}
                className='ml-4'
              >
                <Ionicons name="library-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
              </Pressable>
            </View>
          </>),
          headerStyle: {
            backgroundColor: isDark ? '#1c1c1c' : '#fff',
          },
          headerTintColor: isDark ? "#fff" : "#1c1c1c",
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              color={tabBarIconColor}
              name="library"
            />
          ),
          tabBarAccessibilityLabel: 'Biblioteca',
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
                router.back();
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
        <Tabs.Screen name="(user)" options={{
          headerTitle: () => (
            <View className='w-full items-center'>
              <Text className={`text-xl font-ralewayBold text-start ${isDark ? 'text-white' : 'text-darkGray-500'} `}>Tú</Text>
            </View>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
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
