# Fun Travels Tour - Mobile

Expo (SDK 58, React Native 0.88) app with everything a customer does on the web app, against the same API: tour catalog with filters, booking with seats and meals, wallet payment, boarding pass with QR code, cancellations, wallet ledger and payments, notifications that open the related screen, support requests with replies, profile editing with photo and country-code phone, password reset, and PDF/Excel reports with a "My reports" list.

## Run

```bash
cp .env.example .env     # EXPO_PUBLIC_API_URL: http://10.0.2.2:8080 (Android emulator), http://localhost:8080 (iOS simulator), your LAN IP (device)
npm install
npx expo start
```

Card top-up stays on the web app: Stripe card entry needs a native build, not Expo Go. Bookings are paid from the wallet.

## Checks

`npm run typecheck`, `npm run lint`, and `npx expo export --platform android`. GitHub Actions runs them on every push and pull request.

## Layout

| Folder | Role |
| --- | --- |
| `src/app` | Expo Router screens only; each takes its state from a hook |
| `src/dtos` | Generated mirrors of the server DTOs; do not edit by hand |
| `src/services` | One fetch client (token, timeout, error mapping, sign-out on 401) and a service per area |
| `src/hooks`, `src/providers` | Screen logic, data loading, auth session (tokens in `expo-secure-store`) |
| `src/components` | Shared UI (Button, TextField, SelectSheet, PhoneField, InfoRow, Avatar, ...) and domain components |
| `src/config`, `constants`, `enums`, `interfaces`, `types`, `utilities` | Endpoints, theme, server enums, read models and props, UI-only types, formatting and file sharing |

Every screen maps to its web page and server endpoints in the [documentation repository](https://github.com/HussainALAradi5/fun-travels-tour-document) (`mobile/`).
