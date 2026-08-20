
# WebReact

<p>
Proyecto de portafolio full-stack: un portal/dashboard con autenticación real, notas, chat en tiempo real y un panel de administración, pensado para mostrarse públicamente a recruiters/entrevistadores sin necesidad de crear una cuenta.
</p>

## Stack tecnológico

### Frontend (`web-front`)
- React 18 + TypeScript + Vite
- `react-router-dom` v6 para el ruteo de la app y `wouter` para el sub-router del módulo de giffy
- `fetch` nativo para las llamadas HTTP contra la API
- `socket.io-client` para el chat en tiempo real
- Bootstrap / CSS por módulo (`public/css/*.css`) + FontAwesome para iconografía
- Vitest + Testing Library para tests

### Backend (`web-back`)
- Node.js + Express (ES Modules)
- MongoDB + Mongoose
- Socket.IO (servidor) para mensajería en tiempo real
- JSON Web Tokens (`jsonwebtoken`) con esquema de access token + refresh token, revocable en logout
- `bcrypt` para el hasheo de contraseñas
- `helmet` + `express-rate-limit` en login/signup
- Vitest para tests

## Estructura del proyecto

```
Portafolios/
├── web-back/          # API REST + servidor de Socket.IO
│   ├── app.js          # punto de entrada, monta rutas, CORS y Socket.IO
│   ├── auth/            # generación/validación de JWT
│   ├── lib/               # helpers (respuestas JSON, logger, ownership, info de usuario)
│   ├── routes/                # endpoints agrupados por dominio
│   ├── schema/                 # modelos de Mongoose
│   └── scripts/                 # seed de la cuenta demo
└── web-front/          # SPA de React
    └── src/
        ├── auth/         # AuthProvider, manejo de tokens
        ├── components/    # UI organizada por feature
        ├── hooks/            # hooks de datos por feature
        ├── layout/            # layout del portal (header, menú)
        ├── routes/               # páginas, incluida la landing pública (Home.tsx)
        └── types/                   # tipos TypeScript compartidos
```

## Funcionalidades principales

- **Landing pública** en `/` con About, Skills, Experience, proyecto destacado y contacto — no requiere login.
- **Autenticación (signup / login / logout)** con JWT de doble token: `accessToken` de corta duración y `refreshToken` persistido en MongoDB para poder revocarlo. La sesión se renueva automáticamente al recargar la página.
- **Cuenta demo pública** (ver sección Login) para explorar la app autenticada sin registrarse.
- **Gestión de notas (CRUD)** por usuario, con control de ownership (no se puede editar/borrar notas de otro).
- **Perfil de usuario**: ver y editar datos propios, listar otros usuarios.
- **Panel de administración**: activa/desactiva por usuario qué módulos ve en su dashboard.
- **Chat en tiempo real** vía Socket.IO, con salas de conversación.
- **Mini-módulos adicionales**: tres en raya, buscador de películas, buscador de GIFs.

## Instalación

Clona el repositorio. Luego, en una terminal dentro de `web-front` ejecuta `npm install`, y en otra dentro de `web-back` ejecuta también `npm install`.

### Variables de entorno del backend

Copiá `web-back/.env.example` a `web-back/.env` y completá:

```
DB_CONNECTION_STRING     # cadena de conexión a MongoDB
ACCESS_TOKEN_SECRET      # secreto para firmar el access token
REFRESH_TOKEN_SECRET     # secreto para firmar el refresh token
ALLOWED_ORIGINS          # orígenes permitidos por CORS, separados por coma
PORT                     # opcional, por defecto 3100
```

### Variables de entorno del frontend

Copiá `web-front/.env.example` a `web-front/.env` (los valores por defecto ya apuntan a `localhost:3100`, así que esto es opcional para desarrollo local):

```
VITE_API_URL       # URL base de la API (termina en /api)
VITE_SOCKET_URL    # URL base del servidor de Socket.IO
```

## Correr en desarrollo

#### Backend
```
cd web-back
npx nodemon app
```
Levanta la API + Socket.IO en `http://localhost:3100`.

#### Frontend
```
cd web-front
npm run dev
```
Levanta Vite en `http://localhost:5173`.

## Correr con Docker

Requiere Docker y un `web-back/.env` ya configurado (ver arriba).

```
docker compose build
docker compose up -d
```

- Frontend (nginx sirviendo el build de producción): `http://localhost:8080`
- Backend: `http://localhost:3100`

Nota: Vite compila las variables `VITE_*` en tiempo de build, no en runtime. Si cambiás `VITE_API_URL`/`VITE_SOCKET_URL`, hay que reconstruir la imagen del frontend (`docker compose build frontend`). Los valores para Docker se pasan como build args en `docker-compose.yml`.

Para bajar el stack: `docker compose down`.

## Tests

```
cd web-back && npm test
cd web-front && npm test
```

Cobertura mínima pero enfocada en lo crítico: JWT (roundtrip y rechazo de tokens inválidos), verificación de password, la lógica de ownership que evita que un usuario edite/borre recursos de otro, y un smoke test de la landing pública.

> Nota de compatibilidad: Vitest está fijado en `2.1.9` (y `jsdom` en `25.x` en el frontend) porque las versiones más nuevas requieren Node 20+; esta configuración corre en Node 18.

## Login

<p>
Hay una cuenta demo siempre activa para explorar la app sin crear una cuenta: usuario <code>demo</code>, password <code>demo1234</code> (o el botón "Ver demo sin registrarse" / "Explore the app (demo)" en la landing y en el login). También podés crear tu propia cuenta desde la página de registro.
</p>

## Estado del proyecto

Proyecto en desarrollo activo, migrando de un ejercicio de aprendizaje a un portafolio profesional. Fases completadas hasta ahora: auditoría de seguridad, corrección de bugs críticos (IDOR, CORS abierto, filtración de passwords), limpieza de código muerto y dependencias, landing pública, tests mínimos y containerización con Docker.

Pendiente conocido:
- El bundle principal del frontend ronda 1.2MB (las rutas de la app ya están code-splitteadas con `React.lazy`; falta separar dependencias más grandes del bundle inicial).
- Quedan algunas vulnerabilidades moderadas/altas en `vite`/`react-router-dom` cuya corrección implica un salto de major version — se dejaron pendientes de una revisión aparte para no arriesgar estabilidad.
- Cobertura de tests deliberadamente mínima, no exhaustiva.
