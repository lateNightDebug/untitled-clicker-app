import { AnimatedCartoonButtonSmall } from "@/components/AnimatedCartoonButtonSmall copy";
import { useAuth } from "@/context/AuthContext";
import { user_clicker } from "@/lib/db";
import * as storage from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/storage";
import { theme } from "@/styles/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
//this is the user profile stuff. probably has a log in/signup functionality.
// this will probably also have a stack nav where the user can change which color scheme they are using for their button
// we will need to make sure we can store the users data so that when they refresh or leave and come back the score is persistent.
//additionally we will need to mark which profile (if we decide to have multiple) was last used so that the onMount grabs the last modified data
const index = () => {
  const { signOut } = useAuth();
  const [signOutText, setSignoutText] = useState("Sign out?");
  const [resetText, setResetText] = useState("Reset game.");
  const [disable, setDisable] = useState(false);

  const playerDefault: user_clicker = {
    base_value: 1,
    multiplier: 1.1,
    luck: 5,
    score: 10000,
    refresh: 5000,
    auto: {
      unlocked: false,
      enabled: false,
      auto_refresh: 10000,
    },
  };
  const handleSignOut = async () => {
    if (signOutText == "Sign out?") {
      setSignoutText("Are you sure??????");
      setTimeout(() => {
        setSignoutText("Sign out?");
      }, 5000);
    } else {
      await signOut();
      setSignoutText("Sign out?");
    }
  };
  const handleReset = () => {
    if (resetText == "Reset game.") {
      setResetText("This means you will have to start over again.");
      setTimeout(() => {
        setResetText("Reset game.");
      }, 5000);
    } else if (resetText == "This means you will have to start over again.") {
      setResetText("Are you sure?");
      setTimeout(() => {
        setResetText("Reset game.");
      }, 5000);
    } else if (resetText == "Are you sure?") {
      storage.set(STORAGE_KEYS.CLICKER_STATS, playerDefault);
      setResetText("game successfully reset!");
      setTimeout(() => {
        setResetText("Reset game.");
      }, 5000);
    }
  };
  const sorry = () => {
    alert(
      "sorry! for this build we were unable to implement cool style and theming unlock such as 'pallette swap', 'square button', and the infamous 'EXTREME MODE!!!'. we thank you for your patience and understanding. ",
    );
    setDisable(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileCircle}>
          <Image
            style={styles.profileImage}
            source="https://freesvg.org/img/invader.png"
            alt="oh look, its you!"
          />
        </View>
        <Text style={styles.username}>Your Username Here</Text>
      </View>
      <AnimatedCartoonButtonSmall
        onPress={handleSignOut}
        title={signOutText}
        Icon={<FontAwesome5 name="backspace" color="#000000" />}
      />
      <View style={styles.gap}></View>
      <AnimatedCartoonButtonSmall
        onPress={handleReset}
        title={resetText}
        Icon={<FontAwesome5 name="undo-alt" color="#000000" />}
      />
      <View style={styles.gap}></View>
      <AnimatedCartoonButtonSmall
        onPress={sorry}
        title="Cool unlocks!"
        Icon={<FontAwesome5 name="lock" color="#000000" />}
        isDisabled={disable}
      />
    </View>
  );
};
export default index;

const styles = StyleSheet.create({
  profileImage: {
    height: 100,
    width: 100,
    borderWidth: 4,
    borderRadius: 200,

    alignContent: "center",
  },
  container: {
    flex: 1,
    alignContent: "center",
    width: "100%",
    backgroundColor: theme.colors.bg,
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
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 200,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  gap: {
    padding: 10,
  },
});
