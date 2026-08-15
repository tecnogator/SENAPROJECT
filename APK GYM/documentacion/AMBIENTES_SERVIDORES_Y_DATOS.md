# Ambientes, servidores y accesos a datos

## Desarrollo

| Componente | Configuración |
|---|---|
| Aplicación | Expo SDK 57 + React Native 0.86 |
| Node.js | 22.13 o superior |
| Android | API 36; paquete `com.tecnogator.olympusgym` |
| API | Spring Boot en puerto 8080 |
| Emulador | `http://10.0.2.2:8080/api` |
| Teléfono | `http://IP_DEL_COMPUTADOR:8080/api` |

## Pruebas

`EXPO_PUBLIC_USE_MOCKS=true` activa un repositorio en memoria con usuario, rutina, plan, suplemento y membresía. Esto permite ejecutar todos los módulos de forma determinista y sin depender de red.

## Integración

`EXPO_PUBLIC_USE_MOCKS=false` activa Fetch API y las mismas rutas REST documentadas en la evidencia de Spring Boot. El token se conserva con SecureStore y se envía como `Authorization: Bearer <token>`.

## Producción

- URL HTTPS para la API.
- Base MySQL administrada por el backend.
- Secretos fuera del código.
- APK firmado o AAB para Play Store.
- Registro de errores y copia de seguridad del servidor.

## Seguridad de red

Para pruebas locales se permite HTTP. Para despliegue real debe configurarse HTTPS. La aplicación no guarda contraseñas; solo conserva la sesión segura retornada por la API.
