import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
