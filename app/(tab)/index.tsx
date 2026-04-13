import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

//home page and the page with the button (click click!)

type stats = {
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
    //does the player have the auto clicker upgrade
    enabled: boolean;
    //time between auto clicker clicks.
    refresh: number;
  };
};

const index = () => {
  const [playerStats, setPlayerStats] = useState<stats>({
    baseValue: 1,
    mult: 1,
    luck: 5,
    score: 0,
    refresh: 3,
    auto: {
      enabled: false,
      refresh: 5,
    },
  });

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
        refresh: 3,
        auto: {
          enabled: false,
          refresh: 5,
        },
      };
      //sets saved stats as the active stats.
      setPlayerStats(newStats);
    }
  });

  //used to add luck mechanic to game, allows for variance in different clicks to keep things interesting!
  function getRandomInt() {
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(100);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  const click = () => {
    let points: number = playerStats!.score;

    if (getRandomInt() < playerStats!.luck) {
      points = playerStats!.score + playerStats!.baseValue * playerStats!.mult;
    } else {
      points = playerStats!.score + playerStats!.baseValue;
    }
    setPlayerStats({ ...playerStats, score: points });
  };
  return (
    <View>
      <Text>Score</Text>
      <Pressable onPress={click} style={styles.button} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 300,
    color: "",
  },
});
