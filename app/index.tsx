import { theme } from "@/styles/theme";
import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "../context/AuthContext";
//landing page when the app is first opened. we can use some onMount useEffects here to fetch data such as the users score and last used themes here before they load/see the full app.

export default function Index() {
  const { session, isLoading } = useAuth();
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.button} />
      </View>
    );
  }

  return <Redirect href={session ? "/(tab)" : "/login"} />;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.bg,
  },
});
