# OlympusGym Frontend — React

Frontend integrado de OlympusGym para la evidencia **GA8-220501096-AA1-EV02 — Módulos integrados**.

El cliente React consume la API REST desarrollada con Node.js y Express. Integra autenticación, dashboard, rutinas, alimentación, suplementos, membresías y guía de entrenamiento.

## Identificación

- Aprendiz: Edgar Mauricio Rodríguez Yule
- Ficha: 3186619
- Programa: Análisis y Desarrollo de Software
- Proyecto: OlympusGym

## Tecnologías

- React 19 y React Router
- Vite y JavaScript ES Modules
- Fetch API
- CSS responsivo
- ESLint y Git

## Ejecución integrada

1. Inicie `olympusgym-api-node-express` en `http://localhost:3000`.
2. En esta carpeta ejecute:

```bash
npm install
cp .env.example .env
npm run dev
```

3. Abra `http://localhost:5173`.

La configuración normal usa la API Node.js + Express real. El modo demo queda disponible como apoyo visual.

## Validación y compilación

```bash
npm run lint
npm run build
```

La carpeta `dist/` contiene el frontend compilado para producción.

## Integración por módulos

| Módulo React | Operaciones Node.js + Express |
|---|---|
| Autenticación | `POST /api/auth/register`, `POST /api/auth/login` |
| Dashboard | `GET /api/dashboard/stats` |
| Rutinas | `POST /api/rutinas/asignar`, `GET /api/rutinas/usuario/:id` |
| Alimentación | `POST /api/planes/asignar`, `GET /api/planes/usuario/:id` |
| Suplementos | `POST /api/suplementos/asignar`, `GET /api/suplementos/usuario/:id` |
| Membresías | `POST /api/membresias/asignar`, `GET /api/membresias/usuario/:id` |

## Repositorio público

<https://github.com/tecnogator/SENAPROJECT>

Versión histórica del componente frontend:

<https://github.com/tecnogator/SENAPROJECT/tree/4a5e460ce8d3179b3d1ad4a1e7e4b402ccb3bb80/olympusgym-frontend>
