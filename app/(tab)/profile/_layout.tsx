import { theme } from "@/styles/theme";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerTitleAlign: "center",
          headerShadowVisible: true,
          headerStyle: { backgroundColor: theme.colors.bg2 },
          headerTintColor: "#fff",
          headerTitleStyle: { fontSize: 30, fontWeight: "bold" },
        }}
      />
    </Stack>
  );
}
