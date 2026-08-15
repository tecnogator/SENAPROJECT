# OlympusGym — sistema integral para la gestión del gimnasio

Proyecto académico y funcional desarrollado por **Edgar Mauricio Rodríguez Yule**. Integra en un solo repositorio la API REST, el frontend web y la aplicación móvil de OlympusGym, conservando los nombres usados en las evidencias anteriores.

**Repositorio público:** https://github.com/tecnogator/SENAPROJECT

## Estructura sin duplicados

```text
SENAPROJECT/
├── olympusgym-api-node-express/  API REST Node.js + Express
├── olympusgym-frontend/          aplicación web React + Vite + HTML
├── olympusgym-mobile/            aplicación React Native + Expo
├── legacy-html/                  HTML/XML entregados anteriormente
├── docs/                         arquitectura y manuales
├── release/                      ubicación del APK generado
├── scripts/                      verificaciones del repositorio
└── .github/workflows/            pruebas y generación automática del APK
```

## Funcionalidad integrada

- Registro e inicio de sesión.
- Dashboard con usuarios, clientes, rutinas e ingresos.
- Consulta y asignación de rutinas.
- Planes de alimentación.
- Suplementación.
- Membresías mensual, trimestral y anual.
- Perfil, cierre de sesión y guía de uso móvil.
- Manejo uniforme de carga, errores y respuestas HTTP.
- Modo demostración sin servidor para la aplicación móvil.
- Pruebas automáticas de API, frontend y móvil.

## Credenciales de demostración

```text
Correo:     edgar@olympusgym.test
Contraseña: Olympus123*
```

## Requisitos

- Git.
- Node.js 22.13 o superior.
- npm.
- Para desarrollo móvil: Android Studio/SDK o la aplicación Expo Go.
- Docker Desktop es opcional para ejecutar web y API juntas.

## Puesta en marcha local

Instale las dependencias una vez:

```bash
npm --prefix olympusgym-api-node-express ci
npm --prefix olympusgym-frontend ci
npm --prefix olympusgym-mobile install
```

Abra tres terminales en la raíz del repositorio:

```bash
npm run dev:api
npm run dev:web
npm run dev:mobile
```

Direcciones locales:

- API: http://localhost:3000
- Salud de la API: http://localhost:3000/health
- Frontend: http://localhost:5173
- Expo: dirección indicada por la terminal.

También puede iniciar web y API con:

```bash
docker compose up --build
```

En este caso, el frontend queda en http://localhost:8080.

## Conexión de la aplicación móvil

La app arranca en modo demostración para poder instalarla y recorrerla sin depender de un servidor externo. Para consumir la API real, copie `olympusgym-mobile/.env.example` como `.env` y configure:

```env
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api
```

- Emulador Android: `10.0.2.2` apunta al computador anfitrión.
- Teléfono físico: use la IP local del computador, por ejemplo `http://192.168.1.20:3000/api`, y mantenga ambos equipos en la misma red.

## Verificación completa

```bash
npm run validate
npm run test:api
npm run test:mobile
npm run build:web
```

El backend ejecuta la colección Postman/Newman; el móvil ejecuta pruebas unitarias con `node:test`; el frontend se valida y genera como sitio optimizado.

## Generación automática del APK en GitHub

1. Suba **todo el contenido de esta carpeta** a la raíz de `SENAPROJECT`.
2. Confirme que `.github/workflows/android-apk.yml` se encuentre en la rama principal.
3. En GitHub abra **Actions**.
4. Seleccione **Validar y generar APK OlympusGym**.
5. Pulse **Run workflow** y elija la rama deseada.
6. Cuando el proceso quede en verde, abra la ejecución.
7. Descargue el artefacto **OlympusGym-Android-APK**.
8. Dentro encontrará `OlympusGym-GA8-AA2-EV02.apk` y su suma SHA-256.

El APK generado es instalable en Android. Al ser una compilación académica de depuración, Android puede solicitar autorización para instalar aplicaciones desde el navegador o administrador de archivos.

## Evidencias y trazabilidad

Los flujos de GitHub conservan el resultado de las pruebas y el APK descargable. La documentación detallada está en:

- [Arquitectura e integración](docs/ARQUITECTURA.md)
- [Contrato de endpoints](docs/ENDPOINTS.md)
- [Manual de GitHub y APK](docs/GITHUB_Y_APK.md)

## Tecnologías

- Backend: Node.js, Express y CORS.
- Web: React, React Router, Vite y HTML5.
- Móvil: React Native, Expo y Secure Store.
- Pruebas: Newman/Postman y Node Test Runner.
- Automatización: GitHub Actions, Gradle y Android SDK.
- Contenedores: Docker y Nginx.

