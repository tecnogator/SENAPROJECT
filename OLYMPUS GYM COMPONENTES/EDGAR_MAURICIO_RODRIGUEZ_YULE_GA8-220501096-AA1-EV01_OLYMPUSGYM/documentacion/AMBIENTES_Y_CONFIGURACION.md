# Ambientes y configuración

## Desarrollo

- Frontend: Vite en `http://localhost:5173`.
- Backend: Express en `http://localhost:3000`.
- Persistencia: `DATA_FILE=./data/olympusgym.json`.
- Origen permitido: `FRONTEND_ORIGIN=http://localhost:5173`.

## Pruebas

- Backend aislado con `DATA_FILE=:memory:`.
- Secreto de token exclusivo de pruebas.
- `node:test` con concurrencia 1.
- Postman ejecutado mediante Newman.
- E2E headless con frontend y API reales.

## Producción

- Servir `olympusgym-frontend/dist/` desde un servidor web.
- Definir `TOKEN_SECRET` mediante variable segura y no versionada.
- Configurar `FRONTEND_ORIGIN` con el dominio de despliegue.
- Usar un volumen persistente o sustituir el repositorio JSON por PostgreSQL/MySQL.
- Terminar HTTPS en proxy inverso o plataforma de despliegue.

Los archivos `.env.example` de ambos componentes contienen las variables requeridas sin credenciales privadas.
