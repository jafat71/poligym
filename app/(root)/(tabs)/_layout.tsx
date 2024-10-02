import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/context/ThemeContext';
import MainLogoGradientComponent from '@/components/ui/logo/mainLogoGrandient';


export default function TabsLayout() {

  const { isDark } = useTheme()
  const tabBarBackgroundColor = '#0059FF';
  const tabBarIconColor = '#fff';
  const tabBarTextColor = '#fff';
  const tabBarActiveColor = '#77FFAA';
  const tabBarInactiveColor = isDark ? '#999' : '#aaa';
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabBarBackgroundColor,
          paddingVertical: 5,
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
        tabBarLabel: 'Home',
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />
      <Tabs.Screen name="exercises" options={{
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="walk" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarLabel: 'Ejercicios',
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />
      <Tabs.Screen name="stats" options={{
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="bar-chart" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarLabel: 'Stats',
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />
      <Tabs.Screen name="feed" options={{
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="people" size={26} color={focused ? tabBarActiveColor : tabBarIconColor}  />
        ),
        tabBarLabel: 'Feed',
        tabBarLabelStyle: { color: tabBarTextColor },

      }} />
      <Tabs.Screen name="(profile)" options={{
        headerTitle: () => (
          <MainLogoGradientComponent
            height='40'
            principal='#77FFAA'
            secondary='#FFF'
          />
        ), 
        headerStyle: {
          backgroundColor: isDark ? '#1c1c1c' : '#0059FF',
        },
        headerTintColor: '#77FFAA',
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused }) => (
          <Ionicons name="person" size={26} color={focused ? tabBarActiveColor : tabBarIconColor} />
        ),
        tabBarLabel: 'Perfil',
        tabBarLabelStyle: { color: tabBarTextColor },
      }} />

    </Tabs>
  );
}
