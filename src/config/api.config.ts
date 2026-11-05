import Constants from "expo-constants";

/**
 * API origin. Set EXPO_PUBLIC_API_URL in .env (see .env.example). Android emulators reach the
 * host machine at 10.0.2.2; iOS simulators use localhost; physical devices need the host's LAN IP.
 */
const fromEnv = process.env.EXPO_PUBLIC_API_URL;
const fromConfig = (Constants.expoConfig?.extra as { apiUrl?: string } | undefined)?.apiUrl;

export const API_ORIGIN = (fromEnv || fromConfig || "http://10.0.2.2:8080").replace(/\/$/, "");
/** Version prefix of every REST endpoint; matches the server's app.api-prefix. */
export const API_PREFIX = "/api/v1";
export const API_BASE_URL = `${API_ORIGIN}${API_PREFIX}`;
export const REQUEST_TIMEOUT_MS = 15000;
