## Descripcion

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
