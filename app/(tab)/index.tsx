import { theme } from "@/styles/theme";
import { useFocusEffect } from "expo-router";
import React, { useEffect, useState, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { user_clicker, getUserClicker } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";

//home page and the page with the button (click click!)
//setPlayerStats:{(value: SetStateAction<user_clicker>): void; (arg0: any): void;}
// async function something() {
  
//     const storedStats: user_clicker = await getUserClicker(`${useAuth().user?.id}`)  
//     console.log("user data: ", storedStats)
    
//     return(storedStats)
   
// }

const index = () => {

  const [playerStats, setPlayerStats] = useState<user_clicker>(
    {
          base_value: 0,
          multiplier: 0,
          luck: 0,
          score: 0,
          refresh: 0,
          auto_unlocked: false,
          auto_enabled: false,
          auto_refresh: 0,
        }
  );

  useEffect(() => {
  async function loadUserData() {
    const data = await getUserClicker(`${useAuth().user?.id}`);
    if (data) setPlayerStats(data);
  }
  loadUserData();
}, []);

  
  //const storedStats: user_clicker = getUserClicker(`${useAuth().user?.id}`)  
  // console.log("user:", `${useAuth().user?.id}`)
  // console.log("user data: ", storedStats)
  // setPlayerStats(storedStats)

  
  const [isdisabled, setisdisabled] = useState<boolean>(false);

  useEffect(()=>{
    
    
    console.log("this better work! ",playerStats)
  },[])  
  

  //error catch incase something goes wrong, additionally allows for db integration for save/load.
  // useEffect(() => {
    
  //   //replace playerStats with db stored values
  //   if (storedStats != null) {
  //     //replace newStats temp block with db info
      
  //     setPlayerStats(storedStats);
  //     console.log("user are using stored adata!")
  //     }else{
  //       const newclicker: user_clicker = {
  //         base_value: 0,
  //         multiplier: 0,
  //         luck: 0,
  //         score: 0,
  //         refresh: 0,
  //         auto_unlocked: false,
  //         auto_enabled: false,
  //         auto_refresh: 0,
  //       }
  //     setPlayerStats(newclicker)
  //     console.log("you are using a new clicker")
  //     }
  //   },[]);

  // useFocusEffect(() => {
  //   console.log("start", playerStats);
  //   return () => {
  //     console.log("leaving", playerStats);
  //   };
  // });

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
    }, playerStats!.refresh);

    if (getRandomInt() <= playerStats.luck) {
      points = Math.ceil(
        playerStats.score + playerStats.base_value * playerStats.multiplier,
      );
    } else {
      points = playerStats.score + playerStats.base_value;
    }
    setPlayerStats({ ...playerStats!, score: points });
  };

  const autoHandler = () => {
    // if (playerStats!.auto_enabled) {
    //   setPlayerStats({
    //     ...playerStats,
    //     auto: {
    //       unlocked: false,
    //       enabled: false,
    //       auto_refresh: playerStats.auto.auto_refresh,
    //       auto_id: ""
    //     },
    //   });
    // } else {
    //   setPlayerStats({
    //     ...playerStats,
    //     auto: {
    //       unlocked: false,
    //       enabled: true,
    //       auto_refresh: playerStats.auto.auto_refresh,
    //       auto_id: ""
    //     },
    //   });
    // }
  };

  return (
    <View>
      <Text>{playerStats!.score}</Text>
      <Pressable onPress={click} style={styles.button} disabled={isdisabled}>
        <Text></Text>
      </Pressable>
      {playerStats!.auto_unlocked ? (
        <Pressable onPress={autoHandler}>
          Auto Click {playerStats!.auto_enabled}
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
