# Loadify Mobile (Expo)

This folder contains an Expo React Native app that replicates the Loadify web app UX on mobile.

Quick start

1. Install dependencies:

```powershell
cd mobile
npm install
```

2. Start Expo:

```powershell
npm run start
```

3. Run on device/emulator:

```powershell
npm run android
# or
npm run ios
```

Notes
- The mobile app calls the same download API used by the web app. Adjust endpoints in `screens/HomeScreen.tsx`.
- The contact form posts to `https://loadify.online/api/contact` by default. Update if your server runs elsewhere.
- For production builds use EAS or `expo build` and follow Expo docs.
