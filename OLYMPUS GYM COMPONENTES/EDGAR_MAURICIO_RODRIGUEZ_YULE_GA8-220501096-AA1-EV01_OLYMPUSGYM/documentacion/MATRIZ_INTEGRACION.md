# Matriz de integración de módulos

| Módulo | Componente React | Servicio Express | Seguridad | Persistencia | Evidencia |
|---|---|---|---|---|---|
| Registro e inicio de sesión | `RegisterPage`, `LoginPage`, `AuthContext` | `/api/auth/register`, `/api/auth/login` | Hash scrypt y token HMAC | `users` | Captura 01 |
| Dashboard | `DashboardPage` | `/api/dashboard/stats` | Bearer | Lectura agregada | Captura 02 |
| Rutinas | `RoutinesPage` | `/api/rutinas/*` | Bearer y validación | `rutinas` | Captura 03 |
| Alimentación | `NutritionPage` | `/api/planes/*` | Bearer y validación | `planes` | Captura 04 |
| Suplementos | `SupplementsPage` | `/api/suplementos/*` | Bearer y validación | `suplementos` | Captura 05 |
| Membresías | `MembershipPage` | `/api/membresias/*` | Bearer y reglas de precio | `membresias` | Captura 06 |
| Tutorial | `TutorialPage` | No requiere servicio | Ruta privada | Contenido React | Captura 07 |
