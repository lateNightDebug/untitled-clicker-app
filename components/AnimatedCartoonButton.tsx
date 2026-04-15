import { ReactElement } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { theme } from "../styles/theme";

export interface AnimatedCartoonButtonProps {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  Icon?: ReactElement;
  time: number;
  isDisabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  title?: string;
}

let DURATION = 300;
const BORDER_RADIUS = 200;
const HEIGHT = 300;
const WIDTH = 300;
const SHADOW_HEIGHT = 10;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.button,
    borderRadius: BORDER_RADIUS,
    flexDirection: "row",
    gap: 8,
    height: HEIGHT,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "absolute",
    width: HEIGHT,
  },
  shadow: {
    backgroundColor: theme.colors.buttonshadow,
    borderRadius: BORDER_RADIUS,
    height: HEIGHT,
    top: SHADOW_HEIGHT,
    width: HEIGHT,
  },
  title: {
    color: theme.colors.text,
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    flexDirection: "row",
  },
});

export const AnimatedCartoonButton = ({
  accessibilityHint,
  accessibilityLabel,
  Icon,
  isDisabled = false,
  isLoading = false,
  time = 0,
  onPress,
  title,
}: AnimatedCartoonButtonProps) => {
  const transition = useSharedValue(0);
  const isActive = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    top: interpolate(transition.value, [0, 1], [0, SHADOW_HEIGHT]),
  }));

  return (
    <View style={styles.center}>
      <Pressable
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{
          busy: isLoading,
          disabled: isDisabled || isLoading,
        }}
        disabled={isDisabled || isLoading}
        hitSlop={16}
        onPress={onPress}
        onPressIn={() => {
          isActive.value = true;
          transition.value = withTiming(1, { duration: time / 2 }, () => {
            if (!isActive.value) {
              transition.value = withTiming(0, {
                duration: time / 2,
              });
            }
          });
        }}
        onPressOut={() => {
          if (transition.value === 1) {
            transition.value = withTiming(0, { duration: time / 2 });
          }
          isActive.value = false;
        }}
      >
        <View>
          <View style={styles.shadow} />
          <Animated.View
            style={[
              styles.container,
              animatedStyle,
              {
                //   opacity: isDisabled ? 0.5 : 1,
              },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.colors.text} size={18} />
            ) : (
              <>
                {Icon}
                <Text numberOfLines={1} style={styles.title}>
                  {title}
                </Text>
              </>
            )}
          </Animated.View>
        </View>
      </Pressable>
    </View>
  );
};
