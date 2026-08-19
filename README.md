
# WebReact

<p>
Proyecto creado con el propósito de aprendizaje. No cuenta con una dirección de producto específica: su objetivo es servir como playground para practicar distintos temas de frontend y backend (autenticación, tiempo real, subida de archivos, integraciones con APIs externas, etc.) dentro de una misma aplicación tipo "portal/dashboard".
</p>

## Stack tecnológico

### Frontend (`web-front`)
- React 18 + TypeScript + Vite
- `react-router-dom` v6 para el ruteo (la dependencia `wouter` está instalada pero no se usa)
- `fetch` nativo para las llamadas HTTP contra la API (la dependencia `axios` está instalada pero no se usa)
- `socket.io-client` para el chat en tiempo real
- Bootstrap / CSS por módulo (`public/css/*.css`) + FontAwesome para iconografía
- `styled-components` y `reactstrap` disponibles como dependencias

### Backend (`web-back`)
- Node.js + Express (ES Modules)
- MongoDB + Mongoose
- Socket.IO (servidor) para mensajería en tiempo real
- JSON Web Tokens (`jsonwebtoken`) con esquema de access token + refresh token
- Firebase Storage para almacenamiento de imágenes de perfil
- `multer` (memoria) + `sharp` para recibir y redimensionar imágenes antes de subirlas
- `bcrypt` para el hasheo de contraseñas
- `bunyan` para logging

## Estructura del proyecto

```
webReact/
├── web-back/          # API REST + servidor de Socket.IO
│   ├── app.js          # punto de entrada, monta rutas y Socket.IO
│   ├── auth/            # generación/validación de JWT
│   ├── config/           # Firebase y Multer
│   ├── lib/               # helpers (respuestas JSON, logger, info de usuario)
│   ├── middleware/          # extracción de usuario desde el token
│   ├── routes/                # endpoints agrupados por dominio
│   ├── schema/                 # modelos de Mongoose
│   └── util/                    # subida de imágenes a Firebase
└── web-front/          # SPA de React
    └── src/
        ├── auth/         # AuthProvider, manejo de tokens
        ├── components/    # UI organizada por feature
        ├── context/        # contextos de React (ej. módulo giffy)
        ├── hooks/            # hooks de datos por feature
        ├── layout/            # layout del portal (header, menú)
        ├── logic/              # lógica de negocio local (ej. tres en raya)
        ├── pages/               # vistas del módulo giffy
        ├── routes/               # definición de rutas de la app
        ├── service/                # llamadas a la API por feature
        └── types/                   # tipos TypeScript compartidos
```

## Funcionalidades principales

- **Autenticación (signup / login / logout)** con JWT de doble token: `accessToken` de corta duración y `refreshToken` persistido en MongoDB para poder revocarlo. La sesión se renueva automáticamente al recargar la página.
- **Registro con foto de perfil**: la imagen se sube vía `multer` (en memoria), se redimensiona con `sharp` a 200x200 y se almacena en Firebase Storage.
- **Gestión de notas (CRUD)** por usuario, incluyendo marcar/desmarcar como favorita.
- **Perfil de usuario**: ver y editar datos propios, listar otros usuarios de la plataforma.
- **Panel de administración**: permite activar/desactivar por usuario qué módulos ve en su dashboard (notas, tres en raya, buscador de películas, giffy, mensajes).
- **Chat en tiempo real** vía Socket.IO, con salas de conversación (`join_room` / `send_message` / `receive_message`).
- **Mini-módulos adicionales** dentro del dashboard:
  - Tres en raya (con persistencia de estado en `localStorage`)
  - Buscador de películas (consumo de una API externa)
  - Buscador de GIFs estilo Giphy con scroll infinito
- **Dashboard central** con slideshow/carrusel de accesos directos, controlado por las banderas del panel de admin.

## Instalación

<p>
Clona el repositorio. Luego, en una terminal dentro de <code>web-front</code> ejecuta <code>npm install</code>, y en otra terminal dentro de <code>web-back</code> ejecuta también <code>npm install</code>.
</p>

### Variables de entorno del backend

El backend requiere un archivo `.env` dentro de `web-back` con las siguientes variables:

```
DB_CONNECTION_STRING     # cadena de conexión a MongoDB
ACCESS_TOKEN_SECRET      # secreto para firmar el access token
REFRESH_TOKEN_SECRET     # secreto para firmar el refresh token
API_KEY                  # config de Firebase
AUTH_DOMAIN              # config de Firebase
PROJECT_ID               # config de Firebase
STORAGE_BUCKET           # config de Firebase (Storage)
MESSAGING_SENDER_ID      # config de Firebase
APP_ID                   # config de Firebase
PORT                     # opcional, por defecto 3100
```

> La URL de la API y del socket están hardcodeadas en el frontend a `http://localhost:3100`, así que por ahora el backend debe correr en ese host/puerto para desarrollo local.

## Despliegue (desarrollo local)

#### Backend
<p>
En una terminal dentro de <code>web-back</code> ejecutar <code>npx nodemon app</code> para levantar el servidor (API + Socket.IO) en el puerto 3100.
</p>

#### Frontend
<p>
En una terminal dentro de <code>web-front</code> ejecutar <code>npm run dev</code> para levantar Vite (por defecto en el puerto 5173).
</p>

## Login

<p>
Es posible iniciar sesión ingresando "admin" como usuario y contraseña. También puedes crear tu propia cuenta desde la página de registro.
</p>

## Estado del proyecto y deuda técnica conocida

Este proyecto está en desarrollo activo/aprendizaje y tiene algunos puntos pendientes de limpieza:

- `POST /api/adminpage` está montado sin el middleware de autenticación (comentado en `app.js`) — el panel admin queda abierto sin login.
- `routes/user.js` y `middleware/userExtractor.js` son código experimental sin terminar (no se usan; el segundo tiene un typo que lo rompería).
- `schema/comentario.js` tiene un bug de copy-paste (referencia a un `noteSchema` inexistente) — la funcionalidad de comentarios no está implementada aún.
- Varios imports de `lib/trace.js` usan mayúscula distinta (`Trace.js`), lo cual funciona en macOS/Windows pero rompería en sistemas de archivos case-sensitive (ej. Linux en producción).
- En el frontend, `wouter` y `axios` están instalados pero no se usan (se usa `react-router-dom` y `fetch`); hay algunos archivos vacíos sin uso (`src/pages/pa.js`, `src/context/pp.js`, `src/logic/prueba.js`, `src/service/Users/users.js`).
- La URL de la API y del socket están hardcodeadas a `localhost`, por lo que desplegar a otro entorno requiere editar código en vez de usar variables de entorno.
