# Quick start 🔥

> hacer clone del repositorio

```
git clone git@gitlab.com:blueoceanstart/hack-a-boss/jsb13rt/mod4-node.git
```

> abrir carpeta "travels_app" con Visual Studio

```
cd mod4-node
code ./travels_app
```

> en la terminal del VS (o cualquier terminal en la carpeta travels_app):

```
npm install
```

> renombrar el .env.example a .env y rellenad todos los campos con vuestros datos

❗ \_en DATABASE_NAME deberéis poner el nombre de una base de datos que ya tengáis creada en MySQL

> crear la DB

```
npm run initDb
```

> introducir datos de prueba en la DB

```
npm run populateDb
```

> una vez hecho todo esto, solo quedaría iniciar el server

```
node src/server.js
```

# Base de datos 💾

## Tablas

posts

- id
- title \*
- description \*
- userId \*

users

- id
- email \*
- password \*
- name \*
- avatar
- registrationCode
- role

post_images

- id
- image \*
- postId \*

# API 📚

- GET /posts

  - Responde con el listado de posts

- POST /posts

  - Se necesita autenticación

  - Body (form-data):
    - title \*
    - description \*
    - images
  - Responde con los datos del post creado, incluídas las imágenes

- DELETE /posts/:id

  - Se necesita autenticación y ser el propietario

  - Responde con un mensaje indicando que el post se ha elimiado correctamente

- PUT /posts/:id

  - Se necesita autenticación y ser el propietario

  - Body (JSON):

    - title
    - description

  - Responde con los datos del post actualizado

- POST /users

  - Body (JSON):
    - email \*
    - password \*
    - name \*
  - Responde con los datos del usuario creado

- POST /login

  - Body (JSON):

    - email \*
    - password \*

    - Responde con un token para el usuario

- POST /posts/:id/like

  - Alterna dar/quitar like al post indicado en el param "id"

  - Responde indicando si se ha dado o quitado el like

- GET /posts/:id

  - Responde con los datos del post, imágenes incluídas

- GET /activate/:registrationCode

  - Responde con un mensaje indicando que se ha activado el usuario

- DELETE /users/:id

  - Se necesita autenticación y ser administrador

  - Responde con un mensaje indicando que se ha eliminado el usuario

# Dudas 🤔

Cualquier error en la app o duda que tengáis, podéis consultarme por Slack o mandarme un correo a samuel.rodriguez.rey@hackaboss.com 🤓
