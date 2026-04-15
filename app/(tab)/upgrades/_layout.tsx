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
          headerShadowVisible: true,
          headerStyle: { backgroundColor: theme.colors.bg },
        }}
      />
    </Stack>
  );
}
