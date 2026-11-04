# Fun Travels Tour - Mobile

Expo (SDK 58) React Native app for customers: browse tours, book with seats and meals, pay by wallet, tickets with QR codes, cancellations, wallet history, notifications.

## Run

```bash
cp .env.example .env     # EXPO_PUBLIC_API_URL: http://10.0.2.2:8080 (Android emulator), http://localhost:8080 (iOS simulator), LAN IP (device)
npm install
npx expo start
```

Checks: `npx tsc --noEmit`, `npx expo lint`.

## Layout

`src/app` (Expo Router screens only), `config`, `constants`, `enums`, `interfaces`, `services` (one fetch client with token, timeout, and error mapping), `providers`, `hooks`, `components`, `utilities`. Tokens are stored with `expo-secure-store`. See the [documentation repository](https://github.com/HussainALAradi5/fun-travels-tour-document) (`mobile/`).
