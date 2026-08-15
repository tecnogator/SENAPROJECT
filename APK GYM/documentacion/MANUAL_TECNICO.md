# Manual técnico — OlympusGym Mobile

## Arquitectura

La aplicación usa componentes React Native para presentación, `AuthContext` para sesión, `GymDataContext` para el estado de los módulos y `apiClient.js` como fachada de comunicación. El cliente puede operar contra `mockApi.js` o contra la API Java/Spring Boot del proyecto.

## Requisitos de desarrollo

- Node.js 22.13 o superior.
- npm.
- Android Studio con Android SDK 36 para compilación local.
- Java 17.
- Teléfono Android 7 o superior o emulador.

## Instalación

```bash
cd olympusgym-mobile
cp .env.example .env
npm install
npm test
npm run validate
npm start
```

## Configuración de datos

Modo autónomo:

```dotenv
EXPO_PUBLIC_USE_MOCKS=true
```

Integración con Spring Boot desde emulador:

```dotenv
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080/api
```

En un teléfono físico se reemplaza `10.0.2.2` por la IP local del computador que ejecuta Spring Boot.

## Generación del APK

### Automatizada

El workflow `.github/workflows/android-apk.yml` instala dependencias, ejecuta pruebas, valida JSX, genera el proyecto Android, ejecuta `assembleDebug` y publica el APK como artefacto.

### EAS

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

### Local

```bash
npx expo prebuild --platform android --clean
cd android
./gradlew assembleDebug
```

## Instalación en teléfono

1. Copiar el APK al dispositivo.
2. Permitir instalación desde la fuente utilizada.
3. Abrir el archivo APK y confirmar.
4. Iniciar OlympusGym y probar cada módulo.

## Mantenimiento

- Mantener lógica de negocio en `domain/` y comunicación en `services/`.
- No almacenar contraseñas ni secretos en el repositorio.
- Ejecutar `npm test` y `npm run validate` antes de cada commit.
- Actualizar Expo de forma incremental y conservar compatibilidad con React Native.
