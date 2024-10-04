import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/context/ThemeContext';

export default function TabsLayout() {

  const { isDark } = useTheme()
  const tabBarBackgroundColor = isDark ? "#1c1c1c": "#fff";
  const tabBarIconColor = isDark ? "#fff": "#1c1c1c";
  const tabBarActiveIconColor = isDark ? "#fff": "#1c1c1c";
  const tabBarTextColor =  isDark ? "#1c1c1c": "#fff";
  const tabBarActiveColor = isDark ? "#1c1c1c": "#fff";
  const tabBarInactiveColor = isDark ? '#999' : '#aaa';
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabBarBackgroundColor,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 16, 
          fontWeight: '600', 
        },
        tabBarActiveTintColor: tabBarActiveColor,
        tabBarInactiveTintColor: tabBarInactiveColor,
      }}
    >
      <Tabs.Screen name="home" options={{
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="home" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarLabel: 'Home',
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />
      <Tabs.Screen name="exercises" options={{
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="library-outline" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,
        tabBarLabel: 'Biblioteca',
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />
      <Tabs.Screen name="stats" options={{
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="bar-chart" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,

        tabBarLabel: 'Stats',
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />
      <Tabs.Screen name="feed" options={{
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="people-sharp" size={26} color={focused ? tabBarActiveColor : tabBarIconColor}  />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,

        tabBarLabel: 'Feed',
        tabBarLabelStyle: { color: tabBarTextColor },

      }} />
      <Tabs.Screen name="(profile)" options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="person" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarActiveBackgroundColor: tabBarActiveIconColor,

        tabBarLabel: 'Perfil',
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />

    </Tabs>
  );
}
