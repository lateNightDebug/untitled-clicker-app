import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

//landing page when the app is first opened. we can use some onMount useEffects here to fetch data such as the users score and last used themes here before they load/see the full app.
export default function Index() {
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
        Lets get clickin
      </Pressable>
    </View>
  );
}
