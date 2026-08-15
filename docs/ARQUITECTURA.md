# Arquitectura e integración de OlympusGym

## Propósito

OlympusGym centraliza la administración y la experiencia del cliente del gimnasio. El frontend web y la aplicación móvil consumen el mismo contrato REST. La API concentra reglas, validación, seguridad demostrativa y acceso a datos.

## Componentes

| Componente | Tecnología | Responsabilidad |
|---|---|---|
| Frontend web | React + Vite | Gestión desde navegador, navegación y formularios |
| Aplicación móvil | React Native + Expo | Experiencia Android para clientes del gimnasio |
| API REST | Node.js + Express | Autenticación, validación y operaciones de negocio |
| Almacenamiento | Repositorio en memoria | Datos demostrativos, reemplazable por PostgreSQL/MySQL |
| CI/CD | GitHub Actions | Pruebas, validaciones y compilación del APK |

## Flujo de integración

1. El usuario interactúa con React web o React Native.
2. El cliente ejecuta solicitudes JSON a `/api`.
3. Express valida datos y aplica las reglas del gimnasio.
4. La API devuelve códigos HTTP y JSON consistentes.
5. La interfaz actualiza el módulo correspondiente.

## Capas

| Capa | Web/móvil | API |
|---|---|---|
| Presentación | páginas, pantallas y componentes | rutas HTTP |
| Aplicación | contextos y servicios | controladores de cada ruta |
| Dominio | validadores y reglas de membresía | reglas, seguridad y validaciones |
| Datos | sesión segura y adaptadores API | `src/data/store.js` |

## Seguridad implementada

- Contraseñas transformadas antes de almacenarse.
- Respuesta pública sin `passwordHash`.
- Validación de campos, correo y longitud mínima.
- Token demostrativo entregado en el inicio de sesión.
- CORS limitado a orígenes configurados.
- Secretos y archivos `.env` excluidos de Git.
- Sesión móvil mediante `expo-secure-store`.

Para producción se debe sustituir el token demostrativo por JWT firmado, usar HTTPS, una base de datos persistente y un proveedor seguro de secretos.

## Decisiones de compatibilidad

- Se mantienen los nombres históricos `olympusgym-frontend`, `olympusgym-api-node-express` y `olympusgym-mobile`.
- Los HTML/XML anteriores se conservan en `legacy-html` como trazabilidad, pero no duplican la aplicación vigente.
- El puerto único de API es `3000`.
- La app móvil admite modo demostración y modo API real.

