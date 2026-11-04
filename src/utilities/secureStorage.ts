import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "ftt.session.token";
const USER_KEY = "ftt.session.user";

/** Platform secure storage on devices; web previews fall back to memory only. */
const memory = new Map<string, string>();
const isWeb = Platform.OS === "web";

async function setItem(key: string, value: string) {
  if (isWeb) memory.set(key, value);
  else await SecureStore.setItemAsync(key, value);
}

async function getItem(key: string) {
  return isWeb ? memory.get(key) ?? null : SecureStore.getItemAsync(key);
}

async function deleteItem(key: string) {
  if (isWeb) memory.delete(key);
  else await SecureStore.deleteItemAsync(key);
}

export const sessionStorage = {
  save: async (token: string, userJson: string) => {
    await setItem(TOKEN_KEY, token);
    await setItem(USER_KEY, userJson);
  },
  token: () => getItem(TOKEN_KEY),
  user: () => getItem(USER_KEY),
  clear: async () => {
    await deleteItem(TOKEN_KEY);
    await deleteItem(USER_KEY);
  },
};
