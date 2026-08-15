# OlympusGym API — Node.js + Express

Backend integrado de OlympusGym para la evidencia **GA8-220501096-AA1-EV01**. Expone servicios REST consumidos por el frontend React, aplica autenticación Bearer, validaciones, hash de contraseñas, encabezados de seguridad y persistencia local en JSON.

## Requisitos y ejecución

- Node.js 20.19 o superior
- npm

```bash
npm install
cp .env.example .env
npm start
```

Servidor: `http://localhost:3000`  
Comprobación pública: `GET http://localhost:3000/health`

## Pruebas

```bash
npm test
npm run evidence
```

`npm test` ejecuta pruebas unitarias y de integración con `node:test`. `npm run evidence` levanta Express y ejecuta la colección Postman mediante Newman.

## Endpoints

| Método | Ruta | Seguridad |
|---|---|---|
| POST | `/api/auth/register` | Público |
| POST | `/api/auth/login` | Público |
| GET | `/api/dashboard/stats` | Bearer |
| POST | `/api/planes/asignar` | Bearer |
| GET | `/api/planes/usuario/:usuarioId` | Bearer |
| POST | `/api/rutinas/asignar` | Bearer |
| GET | `/api/rutinas/usuario/:usuarioId` | Bearer |
| POST | `/api/suplementos/asignar` | Bearer |
| GET | `/api/suplementos/usuario/:usuarioId` | Bearer |
| POST | `/api/membresias/asignar` | Bearer |
| GET | `/api/membresias/usuario/:usuarioId` | Bearer |

## Persistencia

La variable `DATA_FILE` define el archivo JSON usado por el repositorio local. Para pruebas aisladas puede establecerse como `:memory:`. La separación entre rutas, middleware, utilidades y repositorio permite sustituir esta implementación por MySQL o PostgreSQL sin cambiar el contrato HTTP consumido por React.
