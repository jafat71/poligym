import { router, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/context/ThemeContext';
import { Pressable, Text, View } from 'react-native';
import MainLogoCustomComponent from '@/components/ui/logo/mainLogo';
import { DrawerActions, useNavigation } from '@react-navigation/native';
export default function TabsLayout() {

  const { isDark } = useTheme()
  const tabBarBackgroundColor = isDark ? "#1c1c1c" : "#fff";
  const tabBarIconColor = isDark ? "#fff" : "#1c1c1c";
  const tabBarActiveIconColor = isDark ? "#1c1c1c" : "#fff";
  const tabBarTextColor = isDark ? "#fff" : "#1c1c1c";
  const tabBarActiveColor = "#0055f4";
  const tabBarInactiveColor = isDark ? '#fff' : '#1c1c1c';

  const navigation = useNavigation();

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
        tabBarInactiveTintColor: tabBarInactiveColor,
      }}
    >
      <Tabs.Screen name="home" options={{
        headerTitle: () => (
          <View className='w-full items-center p-4'>
            <MainLogoCustomComponent
              height='24'
              principal={isDark ? "#fff" : "#1c1c1c"}
            />
          </View>
        ),
        headerLeft: () => (
          <Pressable
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
            className='ml-4'
          >
            <Ionicons name="menu" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
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
          <Ionicons name="barbell-outline" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarLabel: 'Home',
        tabBarShowLabel: false,
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />
      <Tabs.Screen name="(library)" options={{
        headerTitle: () => (
          <View className='w-full items-center p-4'>
            <Text className={`text-xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Biblioteca</Text>
          </View>
        ),
        headerLeft: () => (
          <Pressable
            onPress={() => {
              router.navigate('/(drawer)/(tabs)/home');
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
          <Ionicons name="library-outline" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarLabel: 'Biblioteca',
        tabBarShowLabel: false,
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />
      <Tabs.Screen name="stats" options={{
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="bar-chart" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,

        tabBarLabel: 'Stats',
        tabBarShowLabel: false,
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />
      <Tabs.Screen name="feed" options={{
        headerShown: true,
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
            <MainLogoCustomComponent
              height='24'
              principal={isDark ? "#fff" : "#1c1c1c"}
            />
          </View>
        ),
        headerLeft: () => (
          <Pressable
            onPress={() => {
              router.navigate('/(drawer)/(tabs)/home');
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
