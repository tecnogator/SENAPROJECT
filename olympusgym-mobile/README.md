# OlympusGym Mobile — React Native

Aplicación móvil del proyecto OlympusGym para la evidencia **GA8-220501096-AA2-EV02 — APK: desarrollar módulos móvil según requerimientos del proyecto**.

## Identificación

- Aprendiz: Edgar Mauricio Rodríguez Yule
- Ficha: 3186619
- Programa: Análisis y Desarrollo de Software
- Paquete Android: `com.tecnogator.olympusgym`

## Tecnología

- Expo SDK 57
- React Native 0.86
- React 19.2
- Expo SecureStore
- JavaScript ES Modules
- API REST Node.js + Express de OlympusGym

## Módulos

- Registro e inicio de sesión.
- Dashboard de indicadores.
- Rutinas de entrenamiento.
- Planes de alimentación.
- Suplementos.
- Membresías.
- Perfil y guía de entrenamiento.

## Inicio en modo demostración

```bash
cp .env.example .env
npm install
npm test
npm run validate
npm start
```

El modo demostración permite verificar todos los módulos sin depender de un servidor externo. Las credenciales precargadas son `edgar@olympusgym.test` y `Olympus123*`.

## Integración con Node.js + Express

Cambiar en `.env`:

```dotenv
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api
EXPO_PUBLIC_USE_MOCKS=false
```

`10.0.2.2` representa el localhost del computador desde el emulador Android. En un teléfono físico debe utilizarse la IP local del computador, por ejemplo `http://192.168.1.20:3000/api`.

## Generar APK

### GitHub Actions — recomendado

Copiar `.github/workflows/android-apk.yml` a la raíz del repositorio, publicar la rama y ejecutar **Actions > Validar y generar APK OlympusGym > Run workflow**. Descargar el artefacto `OlympusGym-Android-APK`.

### EAS Build

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

El perfil `preview` de `eas.json` genera un APK instalable para Android.

### Compilación local

```bash
npm install
npx expo prebuild --platform android --clean
cd android
./gradlew assembleDebug
```

Resultado: `android/app/build/outputs/apk/debug/app-debug.apk`.

## Pruebas

`npm test` ejecuta 15 escenarios sobre validación, reglas de membresía e integración de los módulos. `npm run validate` analiza la sintaxis JSX y la configuración Android.

## Repositorio

Repositorio de continuidad: https://github.com/tecnogator/SENAPROJECT
