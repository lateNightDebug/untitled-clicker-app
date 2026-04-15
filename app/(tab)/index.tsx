import { AnimatedCartoonButton } from "@/components/AnimatedCartoonButton";
import { useAuth } from "@/context/AuthContext";
import { getUserClicker, user_clicker } from "@/lib/db";
import { theme } from "@/styles/theme";
import { useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
//home page and the page with the button (click click!)

const index = () => {
  const [playerStats, setPlayerStats] = useState<user_clicker>({
    base_value: 1,
    multiplier: 1.1,
    luck: 5,
    score: 0,
    refresh: 3000,
    auto: {
      enabled: false,
      auto_refresh: 5000,
      unlocked: false,
    },
  });
  const [isdisabled, setisdisabled] = useState<boolean>(false);

  //error catch incase something goes wrong, additionally allows for db integration for save/load.
  useEffect(() => {
    //replace playerStats with db stored values
    if (playerStats == null) {
      //replace newStats temp block with db info
      const data = getUserClicker(`${useAuth().user?.id}`);

      //sets saved stats as the active stats.
      setPlayerStats(data);
    }
  }, []);

  useFocusEffect(() => {
    console.log("start", playerStats);
    return () => {
      console.log("leaving", playerStats);
    };
  });

  //used to add luck mechanic to game, allows for variance in different clicks to keep things interesting!
  function getRandomInt() {
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(100);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  const click = () => {
    let points: number = playerStats.score;
    setisdisabled(true);
    setTimeout(() => {
      setisdisabled(false);
    }, playerStats.refresh);

    if (getRandomInt() <= playerStats.luck) {
      points = Math.ceil(
        playerStats.score + playerStats.base_value * playerStats.multiplier,
      );
    } else {
      points = playerStats.score + playerStats.base_value;
    }
    setPlayerStats({ ...playerStats, score: points });
  };

  const autoHandler = () => {
    if (playerStats.auto.enabled) {
      setPlayerStats({
        ...playerStats,
        auto: {
          unlocked: false,
          enabled: false,
          auto_refresh: playerStats.auto.auto_refresh,
        },
      });
    } else {
      setPlayerStats({
        ...playerStats,
        auto: {
          unlocked: false,
          enabled: true,
          auto_refresh: playerStats.auto.auto_refresh,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{playerStats.score}</Text>
      <View style={styles.button}>
        <AnimatedCartoonButton
          onPress={click}
          isDisabled={isdisabled}
          time={playerStats.refresh}
        />
      </View>
      {playerStats.auto.unlocked ? (
        <Pressable onPress={autoHandler}>
          Auto Click {playerStats.auto.enabled}
        </Pressable>
      ) : null}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg,
    flex: 1,
    alignContent: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
  },

  score: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 50,
    fontFamily: "OCR A Std, monospace",
  },
});
