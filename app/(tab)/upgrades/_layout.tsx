import { theme } from "@/styles/theme";
import { Stack } from "expo-router";

export default function UpgradesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Upgrades",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.colors.bg2 },
          headerTintColor: "#fff",
          headerTitleStyle: { fontSize: 30, fontWeight: "bold" },
        }}
      />
    </Stack>
  );
}
