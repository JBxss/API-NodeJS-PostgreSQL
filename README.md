# API-NodeJS-PostgreSQL-JWT / Gestión de Materiales Reciclables

Esta API RESTful permite gestionar materiales reciclables y recolecciones asociadas. Proporciona operaciones CRUD para materiales y recolecciones, y opcionalmente calcula la ruta óptima de reciclaje.

## Descripción

Este proyecto consiste en el desarrollo de una API RESTful para la gestión eficiente de materiales reciclables y sus recolecciones. La tecnología principal utilizada es Node.js con Express.js como framework para el backend, y PostgreSQL como base de datos para el almacenamiento de datos. Además, implementa un sistema de autenticación basado en JSON Web Tokens (JWT) para asegurar la seguridad y autorización de las operaciones.

## Requerimientos Técnicos

- Node.js
- PostgreSQL

## Instrucciones de Configuración y Ejecución

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando el comando `npm install`.
3. Crea una base de datos PostgreSQL y configura las credenciales en el archivo `.env`.
4. Inicia el servidor con `npm run dev`.

## Funcionalidades

- **Autenticación y Autorización:** La API utiliza JWT para autenticar y autorizar a los usuarios. El endpoint `/login` permite iniciar sesión y obtener un token JWT válido para acceder a los demás endpoints.

- **Gestión de Materiales y Recolecciones:** Se ofrecen endpoints para crear, leer, actualizar y eliminar materiales reciclables y recolecciones asociadas. Los materiales tienen atributos como nombre, peso y valor, mientras que las recolecciones incluyen el material reciclado, la cantidad recolectada y la fecha.

- **Cálculo de Ruta Óptima de Reciclaje:** La API ofrece un endpoint `/calculate` que acepta una lista de materiales y un límite de peso total. Calcula la ruta óptima de reciclaje que maximiza el valor total de los materiales sin exceder el límite de peso.

## Documentación

La documentación detallada de la API se encuentra disponible en [Postman](https://documenter.getpostman.com/view/25921242/2s9Y5YRMeJ).

## Diagrama de la Base de Datos

A continuación se muestra el diagrama de la base de datos utilizada para almacenar los materiales reciclables y las recolecciones:

![Diagrama de la Base de Datos](./img/diagramaBD.png)

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).

## Contacto

Si tienes preguntas o comentarios, no dudes en contactarme a través de correo electrónico (juanseb100@gmail.com) o en [mi perfil de GitHub](https://github.com/JBxss).
