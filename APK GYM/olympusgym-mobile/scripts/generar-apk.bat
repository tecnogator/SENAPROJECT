@echo off
setlocal
call npm install
if errorlevel 1 exit /b 1
call npm test
if errorlevel 1 exit /b 1
call npm run validate
if errorlevel 1 exit /b 1
call npx expo prebuild --platform android --clean
if errorlevel 1 exit /b 1
cd android
call gradlew.bat assembleDebug
if errorlevel 1 exit /b 1
echo APK generado en android\app\build\outputs\apk\debug\app-debug.apk
endlocal
