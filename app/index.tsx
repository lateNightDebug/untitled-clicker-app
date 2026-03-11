import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

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
