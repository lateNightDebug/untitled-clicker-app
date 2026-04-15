import { theme } from "@/styles/theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.bg2 },
        tabBarActiveTintColor: theme.colors.accent,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name={focused ? "dot-circle" : "circle"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="upgrades"
        options={{
          title: "Upgrades",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name={focused ? "angle-double-up" : "angle-up"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
