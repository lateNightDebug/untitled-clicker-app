import { AnimatedCartoonButton } from "@/components/AnimatedCartoonButton";
import { AnimatedCartoonButtonSmall } from "@/components/AnimatedCartoonButtonSmall copy";
import { user_clicker } from "@/lib/db";
import * as storage from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/storage";
import { theme } from "@/styles/theme";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
//home page and the page with the button (click click!)

const index = () => {
  const [playerStats, setPlayerStats] = useState<user_clicker | undefined>({
    base_value: 1,
    multiplier: 1.1,
    luck: 5,
    score: 100,
    refresh: 3000,
    auto: {
      enabled: false,
      auto_refresh: 5000,
      unlocked: true,
    },
  });
  const [isdisabled, setisdisabled] = useState<boolean>(false);

  useEffect(() => {
    async function loadPlayerData(playerStats: user_clicker) {
      const saved = await storage.get<user_clicker>(STORAGE_KEYS.CLICKER_STATS);
      console.log(saved);
      if (saved === null) {
        storage.set(STORAGE_KEYS.CLICKER_STATS, playerStats);
      } else {
        setPlayerStats(saved);
      }
      playerStats;
    }
    loadPlayerData(playerStats!);
  }, []);

  useEffect(() => {
    async function setPlayerData(playerStats: user_clicker) {
      storage.set(STORAGE_KEYS.CLICKER_STATS, playerStats);
    }
    setPlayerData(playerStats!);
  }, [playerStats!.score]);
  //error catch incase something goes wrong, additionally allows for db integration for save/load.
  useEffect(() => {
    //replace playerStats with db stored values
    if (playerStats == null) {
      //replace newStats temp block with db info
      // let data: user_clicker = getUserClicker(`${useAuth().user?.id}`);
      //sets saved stats as the active stats.
      // setPlayerStats(data);
    }
  }, []);

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
      points = Math.ceil(playerStats!.base_value * playerStats!.multiplier);
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
    const interval = setInterval(() => {
      // Your logic here (e.g., updating a countdown or fetching data)
    }, 5000); // Runs every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{playerStats!.score}</Text>

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
