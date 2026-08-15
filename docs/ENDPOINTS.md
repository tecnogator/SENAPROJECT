# Contrato de la API OlympusGym

URL local base: `http://localhost:3000/api`

| Método | Endpoint | Entrada | Respuesta exitosa |
|---|---|---|---|
| GET | `/health` | Sin parámetros | Estado, tecnología y fecha del servidor |
| GET | `/api` | Sin parámetros | Metadatos y lista de recursos |
| POST | `/api/auth/register` | nombreCompleto, email, password | Usuario creado, HTTP 201 |
| POST | `/api/auth/login` | email, password | Usuario público y token, HTTP 200 |
| GET | `/api/dashboard/stats` | Sin parámetros | Totales del gimnasio, HTTP 200 |
| POST | `/api/rutinas/asignar` | usuario.id, día, ejercicio, series, repeticiones | Rutina creada, HTTP 201 |
| GET | `/api/rutinas/usuario/:id` | ID de usuario | Rutinas del usuario, HTTP 200 |
| POST | `/api/planes/asignar` | usuario.id y datos nutricionales | Plan creado, HTTP 201 |
| GET | `/api/planes/usuario/:id` | ID de usuario | Planes del usuario, HTTP 200 |
| POST | `/api/suplementos/asignar` | usuario.id, nombre, dosis, horario | Suplemento creado, HTTP 201 |
| GET | `/api/suplementos/usuario/:id` | ID de usuario | Suplementos del usuario, HTTP 200 |
| POST | `/api/membresias/asignar` | usuario.id, tipo | Membresía creada, HTTP 201 |
| GET | `/api/membresias/usuario/:id` | ID de usuario | Membresías del usuario, HTTP 200 |

## Ejemplo de inicio de sesión

```json
{
  "email": "edgar@olympusgym.test",
  "password": "Olympus123*"
}
```

## Estructura de error

```json
{
  "timestamp": "2026-08-14T15:00:00.000Z",
  "status": 400,
  "error": "VALIDATION_ERROR",
  "message": "Faltan campos obligatorios",
  "path": "/api/auth/register"
}
```

Los datos son demostrativos y se reinician al detener la API. Esta elección hace que la evidencia sea reproducible sin instalar una base de datos externa.

