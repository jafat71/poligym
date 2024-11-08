import { router, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/context/ThemeContext';
import { Pressable, Text, View } from 'react-native';

export default function TabsLayout() {

  const { isDark } = useTheme()
  const tabBarBackgroundColor = isDark ? "#1c1c1c" : "#fff";
  const tabBarIconColor = isDark ? "#fff" : "#1c1c1c";
  const tabBarActiveIconColor = isDark ? "#1c1c1c" : "#fff";
  const tabBarTextColor = isDark ? "#fff" : "#1c1c1c";
  const tabBarActiveColor = "#0055f4";
  const tabBarInactiveColor = isDark ? '#fff' : '#1c1c1c';

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabBarBackgroundColor,
          height: 50,
          borderColor: isDark ? '#1c1c1c' : '#fff',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: '800',
        },
        tabBarActiveTintColor: tabBarActiveColor,
        tabBarInactiveTintColor: tabBarInactiveColor,
      }}
    >
      <Tabs.Screen name="(home)" options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="barbell-outline" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarLabel: 'Home',
        tabBarShowLabel: false,
        tabBarLabelStyle: { color: tabBarTextColor },
        
      }} 
      />
      <Tabs.Screen name="(library)" options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="library-outline" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarLabel: 'Biblioteca',
        tabBarShowLabel: false,
        tabBarLabelStyle: { color: tabBarTextColor },
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
          <Ionicons name="bar-chart" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,

        tabBarLabel: 'Stats',
        tabBarShowLabel: false,
        tabBarLabelStyle: { color: tabBarTextColor },
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
          <Ionicons name="people-sharp" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarLabel: 'Feed',
        tabBarShowLabel: false,
        tabBarLabelStyle: { color: tabBarTextColor },
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
          <Ionicons name="person" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarLabel: 'Perfil',
        tabBarShowLabel: false,
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />

    </Tabs>
  );
}
