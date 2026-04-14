import { theme } from "@/styles/theme";
import { useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

//home page and the page with the button (click click!)

export type stats = {
  //value of each button click
  baseValue: number;
  //how much that base value gets multiplied if the click is "lucky"
  mult: number;
  //determines if a click is lucky by setting a percentage and compairing a random gen number against the users stat
  luck: number;
  //score stores users score, can be spent on upgrades page.
  score: number;
  //how long a user has to wait before the button can be clicked again (this can be upgraded).
  refresh: number;
  //auto clicker upgrade
  auto: {
    //is it unlocked?
    unlocked: boolean;
    //is auto Click turned on or off
    enabled: boolean;
    //time between auto clicker clicks.
    refresh: number;
  };
};

const index = () => {
  const [playerStats, setPlayerStats] = useState<stats>({
    baseValue: 1,
    mult: 1.1,
    luck: 5,
    score: 0,
    refresh: 3000,
    auto: {
      enabled: false,
      refresh: 5000,
      unlocked: false,
    },
  });
  const [isdisabled, setisdisabled] = useState<boolean>(false);

  //error catch incase something goes wrong, additionally allows for db integration for save/load.
  useEffect(() => {
    //replace playerStats with db stored values
    if (playerStats == null) {
      //replace newStats temp block with db info
      let newStats: stats = {
        baseValue: 1,
        mult: 1,
        luck: 5,
        score: 0,
        refresh: 3000,
        auto: {
          enabled: false,
          refresh: 5000,
          unlocked: false,
        },
      };
      //sets saved stats as the active stats.
      setPlayerStats(newStats);
    }
  });

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
        playerStats.score + playerStats.baseValue * playerStats.mult,
      );
    } else {
      points = playerStats.score + playerStats.baseValue;
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
          refresh: playerStats.auto.refresh,
        },
      });
    } else {
      setPlayerStats({
        ...playerStats,
        auto: {
          unlocked: false,
          enabled: true,
          refresh: playerStats.auto.refresh,
        },
      });
    }
  };

  return (
    <View>
      <Text>{playerStats.score}</Text>
      <Pressable onPress={click} style={styles.button} disabled={isdisabled}>
        <Text></Text>
      </Pressable>
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
  button: {
    width: 300,
    height: 300,
    backgroundColor: theme.colors.button,
    borderRadius: 200,
    borderWidth: 3,
    borderTopColor: "blue",
    borderLeftColor: "blue",
    borderBottomColor: "black",
    borderRightColor: "black",
  },
});
