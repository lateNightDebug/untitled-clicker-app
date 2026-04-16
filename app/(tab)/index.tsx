import { AnimatedCartoonButton } from "@/components/AnimatedCartoonButton";
import { AnimatedCartoonButtonSmall } from "@/components/AnimatedCartoonButtonSmall copy";
import { user_clicker } from "@/lib/db";
import * as storage from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/storage";
import { theme } from "@/styles/theme";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
//home page and the page with the button (click click!)

const index = () => {
  const [playerStats, setPlayerStats] = useState<user_clicker>({
    base_value: 1,
    multiplier: 2,
    luck: 5,
    score: 100,
    refresh: 1000,
    auto: {
      enabled: true,
      auto_refresh: 5000,
      unlocked: false,
    },
  });

  const DEFAULTS: user_clicker = {
    base_value: 1,
    multiplier: 1,
    luck: 5,
    score: 100,
    refresh: 3000,
    auto: {
      enabled: false,
      auto_refresh: 1000,
      unlocked: false,
    },
  };
  const [isdisabled, setisdisabled] = useState<boolean>(false);
  (useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      // Invoked whenever the route is focused.
      async function loadPlayerData() {
        const saved = await storage.get<user_clicker>(
          STORAGE_KEYS.CLICKER_STATS,
        );
        console.log("local storage response", saved);
        if (saved == null) {
          storage.set(STORAGE_KEYS.CLICKER_STATS, DEFAULTS);
          setPlayerStats(DEFAULTS);
        } else {
          setPlayerStats(saved);
          console.log("focus", saved);
        }
      }

      loadPlayerData();
      console.log("Hello, I'm focused!", playerStats);

      // Return function is invoked whenever the route gets out of focus.

      return () => {
      
      };
    }, []),
  ),
    useEffect(() => {
      async function loadPlayerData(playerStats: user_clicker) {
        const saved = await storage.get<user_clicker>(
          STORAGE_KEYS.CLICKER_STATS,
        );
        console.log("pre null check", saved);
        if (saved === null) {
          console.log("setting default");
          storage.set(STORAGE_KEYS.CLICKER_STATS, playerStats);
        } else {
          setPlayerStats(saved);
        }
        playerStats;
      }

      loadPlayerData(playerStats!);
    }, []));

  useEffect(() => {
    async function setPlayerData(playerStats: user_clicker) {
      storage.set(STORAGE_KEYS.CLICKER_STATS, playerStats);
    }
    console.log("saving click", playerStats);
    setPlayerData(playerStats!);
  }, [playerStats!.score]);
  //error catch incase something goes wrong, additionally allows for db integration for save/load.

  //used to add luck mechanic to game, allows for variance in different clicks to keep things interesting!
  function getRandomInt() {
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(100);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  const click = () => {
    let points: number = playerStats!.score;
    setisdisabled(true);
    setTimeout(() => {
      setisdisabled(false);
    }, playerStats!.refresh);

    if (getRandomInt() <= playerStats!.luck) {
      points =
        playerStats!.score + playerStats!.base_value * playerStats!.multiplier;

      console.log("lucky", points);
    } else {
      points = playerStats!.score + playerStats!.base_value;
    }

    setPlayerStats({ ...playerStats!, score: points });
  };

  const autoHandler = () => {
    if (playerStats!.auto.enabled) {
      setPlayerStats({
        ...playerStats!,
        auto: {
          unlocked: true,
          enabled: false,
          auto_refresh: playerStats!.auto.auto_refresh,
        },
      });
    } else {
      setPlayerStats({
        ...playerStats!,
        auto: {
          unlocked: true,
          enabled: true,
          auto_refresh: playerStats!.auto.auto_refresh,
        },
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (playerStats.auto.enabled) {
        let autopoints: number = playerStats.score + playerStats.base_value;
        setPlayerStats({ ...playerStats, score: autopoints });
      }
    }, playerStats.auto.auto_refresh);
    return () => clearInterval(intervalId); // Cleanup
  }, [playerStats.auto.enabled]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{playerStats?.score}</Text>
      <AnimatedCartoonButton
        onPress={click}
        isDisabled={isdisabled}
        time={playerStats!.refresh}
      />
      {playerStats!.auto.unlocked ? (
        <AnimatedCartoonButtonSmall
          onPress={autoHandler}
          title={`Auto Click ${playerStats!.auto.enabled}`}
        />
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

  score: {
    textAlign: "center",
    marginTop: 100,
    marginBottom: 100,
    fontSize: 50,
    fontFamily: "OCR A Std, monospace",
    fontWeight: "bold",
  },
});
