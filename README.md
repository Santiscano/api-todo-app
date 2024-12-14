## Descripcion
Aplicación de gestión de tareas construida con NestJS utilizando una arquitectura hexagonal. Incluye funcionalidades para crear, actualizar, listar y eliminar tareas, asegurando una separación clara de responsabilidades entre la lógica de negocio, acceso a datos e infraestructura. Ideal para organizar y priorizar actividades de manera eficiente.

## Instrucciónes

Para inicializar el proyecto es necesario:

1. Crear el archivo .env con las variables especificadas en el .example.env **en este caso puedes usar el .example.env para crear el .env**
2. Correr el comando para crear la base de datos con docker.
```bash
$ docker compose up -d
```

3. Instalar las dependencias necesarias con 
```bash
$ npm install
```

4. Correr el servidor, puedes correrlo con cualquiera de los siguientes comandos
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### en el repositorio esta un archivo postman que pueden usar para ejecutar las consultas.

5. los enpoints para utilizar esta api son **Todos el modulo task debe autenticarse con Bearer Token**
**http://localhost:3000/auth/register** -> POST -> registrarse
**http://localhost:3000/auth/login** -> POST -> login
**http://localhost:3000/task** -> POST -> create
**http://localhost:3000/task/{id}** -> GET -> traer una por id
**http://localhost:3000/task** -> GET -> traer todas
**http://localhost:3000/task/{id}** -> PUT -> actualizar por id
**http://localhost:3000/task/{id}** -> DELETE -> eliminar por id


6. Ejemplos de uso en el body-raw-json
**register**
```json
{
    "fullname": "santiago sierra cano",
    "email": "santiscano@gmail.com",
    "password": "Santiago123"
}
```
**login**
```json
{
    "email": "santiscano@gmail.com",
    "password": "Santiago123"
}
```
**crear**
```json
{
    "title": "crear tarea estefa",
    "description": "probar todo el crud"
}
```
**actualizar**
```json
{
    "title": "actualizacion hexagonal",
    "description": "actualizar tarea con preload",
    "status": "IN_PROGRESS"
}
```
