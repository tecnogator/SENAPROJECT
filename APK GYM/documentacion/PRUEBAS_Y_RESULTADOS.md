# Pruebas y resultados

## Ejecución del 14 de agosto de 2026

Comando: `node --test tests/*.test.js`

| Grupo | Escenarios | Resultado |
|---|---:|---|
| Membresías | 5 | Aprobados |
| Validación de formularios | 6 | Aprobados |
| Integración del repositorio móvil | 4 | Aprobados |
| Total | 15 | 15 aprobados, 0 fallidos |

## Cobertura funcional

- Correos, contraseñas y campos obligatorios.
- Series y repeticiones dentro de rangos.
- Valores de planes Mensual, Trimestral y Anual.
- Cálculo de vencimiento de membresía.
- Registro de usuario y entrega de token.
- Creación/consulta de rutina.
- Integración de alimentación, suplemento y membresía.
- Actualización de rutinas e ingresos en el dashboard.

## Validación estática

El script `validate-project.mjs` analizó 26 archivos JavaScript/JSX y verificó `app.json`, `eas.json`, paquete Android, navegación y servicio API. Resultado: **aprobado**.

## Prueba de instalación

El workflow Android genera un APK debug firmado e instalable. Después de descargarlo se debe verificar apertura, autenticación, navegación, creación de módulos y cierre de sesión en un teléfono Android.
