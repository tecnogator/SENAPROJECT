# Requerimientos y trazabilidad móvil

**Proyecto:** OlympusGym  
**Evidencia:** GA8-220501096-AA2-EV02  
**Aprendiz:** Edgar Mauricio Rodríguez Yule  
**Plataforma:** React Native para Android

| ID | Requerimiento | Módulo / código | Prueba |
|---|---|---|---|
| RM-01 | Registrar clientes | `RegisterScreen`, `AuthContext` | Validaciones y mock API |
| RM-02 | Iniciar sesión y proteger datos | `LoginScreen`, SecureStore | Sesión y token |
| RM-03 | Consultar indicadores | `DashboardScreen`, `GymDataContext` | Totales del dashboard |
| RM-04 | Asignar y consultar rutinas | `RoutinesScreen` | Creación y recuperación |
| RM-05 | Gestionar alimentación | `NutritionScreen` | Plan, macros y fechas |
| RM-06 | Gestionar suplementos | `SupplementsScreen` | Nombre, dosis y horario |
| RM-07 | Seleccionar membresía | `MembershipScreen`, `membership.js` | Valor y vigencia |
| RM-08 | Consultar perfil y guía | `ProfileScreen`, `GuideScreen` | Navegación protegida |

## Requerimientos no funcionales

- Interfaz táctil responsiva en orientación vertical.
- Arquitectura por componentes, contextos, servicios, dominio y utilidades.
- Token almacenado con Expo SecureStore.
- API Spring Boot configurable por variable de ambiente.
- Modo demostración reproducible sin servidor externo.
- Pruebas unitarias y de integración ejecutables con Node.js.
- Automatización de compilación Android en GitHub Actions.
- Código versionable sin dependencias, secretos ni binarios temporales.
