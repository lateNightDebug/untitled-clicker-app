
// local storage creation and manipulation
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  PROFILE: "profile",
  CLICKER_STATS: "stats",
} as const;

export async function get<T>(key: string): Promise<T | null> {
  const value = await AsyncStorage.getItem(key);
  if (value === null) return null;
  return JSON.parse(value) as T;
}

export async function set(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function remove(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}
