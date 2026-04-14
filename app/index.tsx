import { router } from "expo-router";
import { Pressable, Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { theme } from "@/styles/theme";

//landing page when the app is first opened. we can use some onMount useEffects here to fetch data such as the users score and last used themes here before they load/see the full app.
export default function Index() {

  const { session, isLoading } = useAuth();

  // Week 12 - Class Code
  // Show a spinner while AsyncStorage is being read (usually < 100ms)
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  


  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>loading page or something here!</Text>
      <Pressable onPress={() => router.push("/(tab)")}>
        <Text>Lets get clickin</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/login")}>
        <Text>login</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/signup")}>
        <Text>signup</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
  },
});