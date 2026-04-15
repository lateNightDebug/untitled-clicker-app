import { theme } from "@/styles/theme";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.bg },
        tabBarActiveTintColor: theme.colors.bg2,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          //icon here
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          //Icon here
        }}
      />
      <Tabs.Screen
        name="upgrades"
        options={{
          title: "Upgrades",
          //Icon here
        }}
      />
    </Tabs>
  );
}
