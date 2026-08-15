# Entradas y salidas por módulo

| Módulo | Entrada móvil | Servicio | Salida esperada |
|---|---|---|---|
| Registro | nombre, email, password | `POST /api/auth/register` | 201, usuario y token |
| Login | email, password | `POST /api/auth/login` | 200, usuario y token |
| Dashboard | token | `GET /api/dashboard/stats` | Totales del gimnasio |
| Rutinas | día, ejercicio, series, repeticiones | `POST /api/rutinas/asignar` | Rutina creada |
| Rutinas | id usuario | `GET /api/rutinas/usuario/{id}` | Lista de rutinas |
| Alimentación | título, objetivo, descripción, calorías, macros y fechas | `POST /api/planes/asignar` | Plan creado |
| Suplementos | nombre, dosis, horario | `POST /api/suplementos/asignar` | Suplemento creado |
| Membresías | tipo | `POST /api/membresias/asignar` | Valor, inicio y vencimiento |

## Códigos de respuesta

- `200 OK`: consulta o acceso correcto.
- `201 Created`: recurso creado.
- `400 Bad Request`: datos inválidos.
- `401 Unauthorized`: token o credenciales inválidos.
- `404 Not Found`: usuario o recurso inexistente.
- `409 Conflict`: email duplicado.

La aplicación captura errores de red y muestra retroalimentación visible sin exponer información sensible.
