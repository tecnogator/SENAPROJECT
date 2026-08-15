# OlympusGym API — Node.js + Express

API REST construida para la evidencia **GA7-220501096-AA5-EV02**. Mantiene las rutas funcionales usadas por el frontend React de OlympusGym.

## Requisitos

- Node.js 18 o superior
- npm

## Ejecución

```bash
npm install
npm start
```

Servidor: `http://localhost:3000`

Comprobación rápida: `GET http://localhost:3000/health`

## Pruebas con Postman/Newman

La carpeta `postman/` contiene la colección y el entorno exportables a Postman.

```bash
npm run test:api
```

Para repetir la corrida desde cero, reinicie el servidor; el almacenamiento de esta evidencia es local y temporal.

## Endpoints

| Método | Ruta |
|---|---|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| GET | `/api/dashboard/stats` |
| POST | `/api/planes/asignar` |
| POST | `/api/rutinas/asignar` |
| POST | `/api/suplementos/asignar` |
| POST | `/api/membresias/asignar` |
| GET | `/api/planes/usuario/:usuarioId` |
| GET | `/api/rutinas/usuario/:usuarioId` |

## Nota técnica

Para permitir una demostración reproducible sin depender de infraestructura externa, esta versión usa almacenamiento en memoria. La separación por rutas y datos permite sustituirlo posteriormente por MySQL conservando el contrato HTTP.
