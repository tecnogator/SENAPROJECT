# OlympusGym Frontend

Proyecto React desarrollado para la evidencia **GA7-220501096-AA4-EV03 — Componente frontend del proyecto formativo y proyectos de clase**.

El frontend consume la API REST del backend OlympusGym desarrollado en Spring Boot. La interfaz permite registrar e iniciar sesión, consultar indicadores, administrar rutinas, planes de alimentación, suplementos y membresías, y consultar un tutorial de uso.

## Datos de la evidencia

- Aprendiz: Edgar Mauricio Rodríguez Yule
- Ficha: 3186619
- Programa: Análisis y Desarrollo de Software
- Evidencia: GA7-220501096-AA4-EV03
- Proyecto: OlympusGym

## Tecnologías

- React 19
- React Router
- Vite
- JavaScript moderno (ES Modules)
- CSS responsivo
- Fetch API
- ESLint
- Git

## Funcionalidades implementadas

- Registro de usuarios e inicio de sesión.
- Persistencia controlada de la sesión en `localStorage`.
- Protección de rutas privadas.
- Panel principal con indicadores del gimnasio.
- Consulta y asignación de rutinas.
- Consulta y asignación de planes de alimentación.
- Asignación de suplementos.
- Consulta y asignación de membresías.
- Tutorial de uso de la plataforma.
- Mensajes de carga, éxito y error.
- Diseño adaptable para escritorio, tableta y dispositivo móvil.
- Modo de demostración para revisar la interfaz sin ejecutar el backend.

## Estructura principal

```text
src/
├── components/       Componentes reutilizables
├── context/          Estado global de autenticación
├── layouts/          Estructura visual de rutas privadas
├── pages/            Vistas funcionales de la aplicación
├── services/         Integración con API y datos de demostración
├── App.jsx            Definición de rutas
├── main.jsx           Punto de entrada
└── styles.css         Estilos globales y diseño responsivo
```

## Requisitos

- Node.js 20.19 o superior.
- npm.
- Para integración real: backend OlympusGym Spring Boot activo en `http://localhost:8080` y su base de datos MySQL configurada.

## Instalación y ejecución

1. Abra una terminal dentro de `olympusgym-frontend`.
2. Instale las dependencias:

   ```bash
   npm install
   ```

3. Cree el archivo local de configuración a partir del ejemplo:

   En Windows:

   ```powershell
   Copy-Item .env.example .env
   ```

   En Linux o macOS:

   ```bash
   cp .env.example .env
   ```

4. Inicie primero el backend Spring Boot.
5. Ejecute el frontend:

   ```bash
   npm run dev
   ```

6. Abra la dirección indicada por Vite, normalmente `http://localhost:5173`.

## Modo demostración

Para evaluar solamente la interfaz con datos controlados:

```bash
npm run dev -- --mode demo
```

Credenciales de demostración:

- Correo: `maria@mail.com`
- Contraseña: `123456`

El archivo `.env.demo` activa datos simulados únicamente para la revisión visual. La configuración normal usa la API Spring Boot.

## Validación del código

```bash
npm run lint
npm run build
```

`npm run lint` comprueba los estándares definidos con ESLint y `npm run build` genera una compilación de producción.

## Endpoints integrados

| Método | Endpoint | Uso en React |
|---|---|---|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Inicio de sesión |
| GET | `/api/dashboard/stats` | Indicadores del panel |
| POST | `/api/rutinas/asignar` | Asignación de rutina |
| GET | `/api/rutinas/usuario/{id}` | Consulta de rutinas |
| POST | `/api/planes/asignar` | Asignación de plan alimenticio |
| GET | `/api/planes/usuario/{id}` | Consulta de planes |
| POST | `/api/suplementos/asignar` | Asignación de suplemento |
| POST | `/api/membresias/asignar` | Asignación de membresía |
| GET | `/api/membresias/usuario/{id}` | Consulta de membresías |

## Versionamiento

El proyecto incluye un repositorio Git local y un commit verificable. Para publicarlo en GitHub:

```bash
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```

Después de publicarlo, copie la dirección en el archivo `ENLACE_REPOSITORIO.txt` ubicado en la carpeta principal de la evidencia.

## Nota técnica de seguridad

El frontend elimina el campo `password` antes de guardar los datos de sesión. Como mejora del backend, se recomienda que las respuestas de registro e inicio de sesión nunca incluyan contraseñas y que estas se almacenen mediante hash seguro.
