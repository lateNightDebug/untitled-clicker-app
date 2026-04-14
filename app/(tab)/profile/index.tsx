import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useAuth } from "@/context/AuthContext";
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
    <View>
      <Text>Profile</Text>
      <Pressable onPress={handleSignOut}>
        <Text>sign out</Text>
      </Pressable>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
