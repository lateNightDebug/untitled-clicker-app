import UpgradeCard from "@/components/upgradecard";
import { user_clicker } from "@/lib/db";
import * as storage from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/storage";
import { theme } from "@/styles/theme";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useStats } from "@/context/statsContext";
//this is where the upgrades will go!
// we will likely need to make a component like the instructors AppCard to make it easier to display the list of upgrades.
//Upgrade Ideas: base per-Click score increase (1-3-5-7), multiplier (x2,x4,x6), golden button? (%chance that the button becomes gold for x amount of time, all clicks during that time are more valuable)
const index = () => {

  const stats = useStats().playerStats;
  const [upgrade, isUpgraded] = useState(false)
  const [playerStats, setPlayerStats] = useState<user_clicker>(stats!
    // {base_value: 1,
    // multiplier: 1.1,
    // luck: 5,
    // score: 0,
    // refresh: 3000,
    // upgraded: false,
    // auto: {
    //   enabled: false,
    //   auto_refresh: 5000,
    //   unlocked: false,
    // }}
  );
  useEffect(() => {
    async function loadPlayerData(playerStats: user_clicker) {
      const saved = await storage.get<user_clicker>(STORAGE_KEYS.CLICKER_STATS);
      console.log(saved);
      if (saved == null) {
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
  }, [playerStats]);
  const [pointsError, setPointsError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setPointsError("");
    }, 10000);
  }, [pointsError]);

  const upgradeBase = () => {
    if (playerStats.score < 100 * playerStats.base_value) {
      //idk, make the button shake red, highlight the cost. do something.
      setPointsError("You cant afford the Base Value Upgrade");
    } else {
      let points = playerStats.score - 100 * playerStats.base_value;
      let newValue = playerStats.base_value + 1;
      setPlayerStats({ ...playerStats, base_value: newValue, score: points, upgraded: true });
      setPointsError("");
      
    }
  };

  const upgradeMult = () => {
    if (playerStats.score < 350 ** playerStats.multiplier) {
      setPointsError("You cant afford the Multiplier Upgrade");
    } else {
      let points = playerStats.score - 350 ** playerStats.multiplier;
      let newMult = playerStats.multiplier + 0.05;
      setPlayerStats({ ...playerStats, multiplier: newMult, score: points, upgraded: true });
      setPointsError("");
      isUpgraded(true);
    }
  };

  const upgradeLuck = () => {
    if (playerStats.score < 400 * playerStats.luck) {
      setPointsError("You cant afford the Luck Upgrade");
    } else {
      let points = playerStats.score - 400 * playerStats.luck;
      let newLuck = playerStats.luck + 3;
      setPlayerStats({ ...playerStats, luck: newLuck, score: points, upgraded: true });
      setPointsError("");
      isUpgraded(true);
    }
  };

  const upgradeRate = () => {
    if (playerStats.score < 5215 - playerStats.refresh) {
      setPointsError("You cant afford the refresh rate Upgrade");
    } else {
      let points = playerStats.score - (5215 - playerStats.refresh);
      let newrate = playerStats.refresh - 250;
      setPlayerStats({ ...playerStats, refresh: newrate, score: points, upgraded: true });
      setPointsError("");
      isUpgraded(true);
    }
  };

  const enableAuto = () => {
    if (playerStats.score < 1000) {
      setPointsError("You cant afford to enable the auto clicker");
    } else {
      let points = playerStats.score - 1000;

      setPlayerStats({
        ...playerStats, upgraded: true,
        auto: {
          unlocked: true,
          enabled: false,
          auto_refresh: playerStats.auto.auto_refresh,
        },
      });
      setPointsError("");
      isUpgraded(true);
    }
  };

  const upgradeAuto = () => {
    if (playerStats.score < 6000 - playerStats.auto.auto_refresh) {
      setPointsError("You cant afford the Auto clicker speed Upgrade");
    } else {
      let points = playerStats.score - (5500 - playerStats.auto.auto_refresh);
      let newAuto = playerStats.auto.auto_refresh - 300;
      setPlayerStats({
        ...playerStats, upgraded: true,
        auto: {
          unlocked: playerStats.auto.unlocked,
          enabled: playerStats.auto.enabled,
          auto_refresh: newAuto,
        },
      });
      setPointsError("");
      isUpgraded(true);
    }
  };

  return (
    <View style={styles.container}>
      {pointsError ? (
        <Text style={styles.error}>{pointsError}</Text>
      ) : (
        <View style={styles.buffer}> 
        <Text>Your points: {playerStats.score}</Text>
        </View>
      )}
      <ScrollView>
        <Pressable onPress={upgradeBase}>
          <UpgradeCard
            title={"Base Value"}
            subtitle={`Increase base click value. current: ${playerStats.base_value}`}
            cost={100 * playerStats.base_value}
          />
        </Pressable>
        <Pressable onPress={upgradeMult}>
          <UpgradeCard
            title={"Multiplier"}
            subtitle={`Increase point multiplier (triggers based on luck) current multiplier: ${playerStats.multiplier}`}
            cost={Math.ceil(350 ** playerStats.multiplier)}
          />
        </Pressable>
        <Pressable onPress={upgradeLuck}>
          <UpgradeCard
            title={"Luck"}
            subtitle={`Increases change of getting a 'Lucky click'. current luck: ${playerStats.luck}%`}
            cost={400 * playerStats.luck}
          />
        </Pressable>
        <Pressable onPress={upgradeRate}>
          <UpgradeCard
            title={"Click Rate"}
            subtitle={`Decrease button cooldown. current cooldown: ${playerStats.multiplier}`}
            cost={5215 - playerStats.refresh}
          />
        </Pressable>
        <Pressable onPress={enableAuto}>
          <UpgradeCard
            title={"Auto Clicker"}
            subtitle={`tired of clicking? unlock the auto clicker!`}
            cost={1000}
          />
        </Pressable>
        <Pressable onPress={upgradeAuto} disabled={playerStats.auto.unlocked}>
          <UpgradeCard
            title={"Auto Clicker Rate"}
            subtitle={`Increases the Rate that the Auto Clicker triggers current rate: ${playerStats.auto.auto_refresh}`}
            cost={6000 - playerStats.auto.auto_refresh}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg,
    flex: 1,
  },

  error: {
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    color: "#ffffff",
    backgroundColor: theme.colors.button,
    margin: 15,
    borderWidth: 2,
    borderColor: theme.colors.buttonshadow,
    borderRadius: 50,
  },
  buffer: {
    padding: 12,
    margin: 15,
  },
});
