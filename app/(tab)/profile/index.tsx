import UpgradeCard from "@/components/upgradecard";
import { useAuth } from "@/context/AuthContext";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
//this is the user profile stuff. probably has a log in/signup functionality.
// this will probably also have a stack nav where the user can change which color scheme they are using for their button
// we will need to make sure we can store the users data so that when they refresh or leave and come back the score is persistent.
//additionally we will need to mark which profile (if we decide to have multiple) was last used so that the onMount grabs the last modified data
const index = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.childCont}>
        <Image
          style={styles.profileImage}
          source="https://freesvg.org/img/invader.png"
          alt="oh look, its you!"
        />
        <Pressable></Pressable>
      </View>
      <Text style={styles.username}>Your Username Here</Text>
      <Pressable onPress={handleSignOut}>
        <UpgradeCard title={"Sign out?"} subtitle="Are you sure?" cost={0} />
      </Pressable>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  profileImage: {
    height: 200,
    width: 200,
    borderWidth: 4,
    borderRadius: 200,
    marginTop: 40,
    alignContent: "center",
  },
  container: {
    flex: 1,
    alignContent: "center",
    width: "100%",
  },
  childCont: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: 250,
    flexDirection: "row",
  },
  username: {
    textAlign: "center",
    fontSize: 30,
    paddingBottom: 5,
    borderBottomWidth: 2,
    margin: 10,
  },
});
