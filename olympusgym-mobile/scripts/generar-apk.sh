#!/usr/bin/env bash
set -euo pipefail
npm install
npm test
npm run validate
npx expo prebuild --platform android --clean
cd android
./gradlew assembleDebug
echo "APK generado en android/app/build/outputs/apk/debug/app-debug.apk"
