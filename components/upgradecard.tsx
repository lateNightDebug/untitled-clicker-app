import { theme } from "@/styles/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
type Props = {
  title: string;
  subtitle?: string;
  cost: number;
  disabled?: boolean;
};
// React.ReactNode is a TypeScript type that means: "anything React can render."
export default function UpgradeCard({ title, subtitle, cost }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {cost ? <View>{cost}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.card,
    padding: theme.spacing.card,
    borderWidth: 2,
    borderColor: theme.colors.bg2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.gap,
    shadowOpacity: 50,
    shadowColor: theme.colors.text,
  },
  textWrap: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: theme.colors.subText,
  },
});
