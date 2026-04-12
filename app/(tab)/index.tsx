"use client";
import { theme } from "@/styles/theme";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
//home page and the page with the button (click click!)

const index = () => {
  const [score, setScore] = useState<Number>(0);
  const [baseValue, setBaseValue] = useState<Number>(1);
  const [luck, setLuck] = useState<number>(5);
  const [mult, setmult] = useState<Number>(0.1);
  return (
    <View>
      <Text>Score</Text>

      <Pressable style={styles.button}>
        <Text></Text>
      </Pressable>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.button,
    width: 300,
    height: 300,
    borderRadius: 200,
    alignSelf: "center",
    justifyContent: "center",
  },
});
