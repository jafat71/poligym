import { Tabs } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/context/ThemeContext';


export default function TabsLayout() {

  const { isDark } = useTheme()

  const tabBarBackgroundColor = isDark ? '#1c1c1c' : '#fff';
  const tabBarIconColor = isDark ? '#fff' : '#000';
  const tabBarTextColor = isDark ? '#fff' : '#000';

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: tabBarBackgroundColor},
      }}      
      >
      <Tabs.Screen name="home" options={{
        headerShown: true,
        tabBarIcon: () => (
          <FontAwesome6 name="home" size={26} color={tabBarIconColor} />
        ),
        tabBarLabel: 'Home',
        tabBarLabelStyle: { color: tabBarTextColor },
        tabBarActiveBackgroundColor: "#0059FF",
      }} />
      <Tabs.Screen name="exercises" options={{
        headerShown: true,
        tabBarIcon: () => (
          <FontAwesome6 name="walk" size={26} color={tabBarIconColor} />
        ),
        tabBarLabel: 'Ejercicios',
        tabBarLabelStyle: { color: tabBarTextColor },
        tabBarActiveBackgroundColor: "#0059FF",

      }} />
      <Tabs.Screen name="stats" options={{
        headerShown: true,
        tabBarIcon: () => (
          <FontAwesome6 name="bar-chart" size={26} color={tabBarIconColor} />
        ),
        tabBarLabel: 'Stats',
        tabBarLabelStyle: { color: tabBarTextColor },
        tabBarActiveBackgroundColor: "#0059FF",

      }} />
      <Tabs.Screen name="feed" options={{
        headerShown: true,
        tabBarIcon: () => (
          <FontAwesome6 name="people" size={26} color={tabBarIconColor} />
        ),
        tabBarLabel: 'Feed',
        tabBarLabelStyle: { color: tabBarTextColor },
        tabBarActiveBackgroundColor: "#0059FF",

      }} />
      <Tabs.Screen name="profile" options={{
        headerShown: true,
        tabBarIcon: () => (
          <FontAwesome6 name="person" size={26} color={tabBarIconColor} />
        ),
        tabBarLabel: 'Profile',
        tabBarLabelStyle: { color: tabBarTextColor },
        tabBarActiveBackgroundColor: "#0059FF",

      }} />

    </Tabs>
  );
}
