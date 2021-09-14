# API de gestión para el restaurante Delilah Restó 

## Requerimientos

Para clonar el repositorio:
- Git
- Descarga: https://git-scm.com/downloads

Entorno de ejecución del servidor:
- Node.js v14.17.3
- Descarga: https://nodejs.org/es/download/


Comprobación de endpoints:
- Postman
- Descarga: https://www.postman.com/downloads/

Una vez descargado Postman se puede importar la colección desde el repositorio de Github, o seleccionando el archivo "Delilah Resto.postman_collection.json" ubicado en la raíz del directorio.

Documentación:
- Swagger
- Descarga: https://app.swaggerhub.com/apis/pablok3/delilah-resto/1.0.0


## 1 - Instalación del proyecto 

Clonar proyecto con el comando :

```bash 
git clone https://github.com/pablok3/delilah_resto.git
```

## 2 - Instalación de dependencias 

Dependencias utilizadas:

- Cors - v2.8.5
- Express - v4.17.1
- Compression - v1.7.4
- Dotenv - v10
- Moment - v2.29.1


Instalar las dependencias utilizando el comando:

```bash 
npm install
```

## 3 - Iniciando el servidor 

Ubicarse en la carpeta raiz del proyecto y ejecutar el comando: npm start. A partir de ahora ya se puede ejecutar el sistema.


# Usuario Administrador

El sistema cuenta con un usuario administrador pre establecido. Los datos de inicio de sesión del mismo son los siguientes:<br>
Usuario: admin<br>
Contraseña: 123456


# Detalle de Endpoints

-------------------------------------------------------------------------------------------------------------------------------------------------------
|     Endpoint     | Metodo |        Descripcion        | Requiere Login |  Requiere Admin | Headers |     Path    |         Ejemplo en {Body}        |
|------------------|--------|---------------------------|----------------|-----------------|---------|-------------|----------------------------------|
|      /login      |  POST  |     Inicio de sesion      |       SI       |       NO        |         |             |   {"userName_email": "flork3",   |
|                  |        |                           |                |                 |         |             |    "password": "123abc"}         |
|                  |        |                           |                |                 |         |             |                                  |
|     /register    |  POST  | Registro de nuevo usuario |       NO       |       NO        |         |             |   {                              | |                  |        |                           |                |                 |         |             |     "userName": "juanperez",     |
|                  |        |                           |                |                 |         |             |     "firstName": "Juan",         |
|                  |        |                           |                |                 |         |             |     "lastName": "Perez",         |
|                  |        |                           |                |                 |         |             |     "password": "123abc",        |
|                  |        |                           |                |                 |         |             |     "repeatPass": "123abc",      |
|                  |        |                           |                |                 |         |             |     "email": "juanp@gmail.com",  |
|                  |        |                           |                |                 |         |             |     "phone": 2964225588,         |
|                  |        |                           |                |                 |         |             |     "address": "San Martin 123"  |
|                  |        |                           |                |                 |         |             |    }                             |
|                  |        |                           |                |                 |         |             |                                  |
|------------------|--------|---------------------------|----------------|-----------------|---------|-------------|----------------------------------|
|     /products    |  GET   |    Muestra los productos  |       SI       |       NO        | userid  |             |                                  |
|                  |        |         disponibles       |                |                 |         |             |                                  |
|                  |        |                           |                |                 |         |             |                                  |
|                  |  POST  |   Crea un nuevo producto  |       SI       |       SI        | userid  |             |  {                               | |                  |        |                           |                |                 |         |             |   "name": "Producto 1",          |
|                  |        |                           |                |                 |         |             |   "description": "Ingredie...",  |
|                  |        |                           |                |                 |         |             |   "price": 500,                  |
|                  |        |                           |                |                 |         |             |   "qty": 1                       |
|                  |        |                           |                |                 |         |             |  }                               |
|                  |        |                           |                |                 |         |             |                                  |
|                  |  PUT   |   Actualiza un producto   |       SI       |       SI        | userid  |  productId  |  {                               | |                  |        |                           |                |                 |         |             |   "name": "Producto 2",          |
|                  |        |                           |                |                 |         |             |   "description": "Ingredie...",  |
|                  |        |                           |                |                 |         |             |   "price": 200,                  |
|                  |        |                           |                |                 |         |             |   "qty": 1                       |
|                  |        |                           |                |                 |         |             |  }                               |
|                  | DELETE |    Elimina un producto    |       SI       |       SI        | userid  |  productId  |                                  |
|------------------|--------|---------------------------|----------------|-----------------|---------|-------------|----------------------------------|
|     /orders      |  GET   |  Muestra ordenes activas  |       SI       |       NO        | userid  |             |                                  |
|                  |        |                           |                |                 |         |             |                                  |
|                  |  POST  |       Crea un order       |       SI       |       NO        | userid  |             | {                                | 
|                  |        |                           |                |                 |         |             |   "products": [                  | 
|                  |        |                           |                |                 |         |             |       {                          |
|                  |        |                           |                |                 |         |             |         "productId": 4,          |
|                  |        |                           |                |                 |         |             |         "qty": 10                |
|                  |        |                           |                |                 |         |             |       },                         |
|                  |        |                           |                |                 |         |             |       {                          |
|                  |        |                           |                |                 |         |             |         "productId": 1,          |
|                  |        |                           |                |                 |         |             |         "qty": 1                 |
|                  |        |                           |                |                 |         |             |       }                          |
|                  |        |                           |                |                 |         |             |   ]                              |
|                  |        |                           |                |                 |         |             | }                                |
|                  |        |                           |                |                 |         |             |                                  |
|                  |  PUT   |    Modificar una orden    |       SI       |       NO        | userid  |             | {                                |
|                  |        |         pendiente         |                |                 |         |             |    "products": [                 |
|                  |        |                           |                |                 |         |             |        {                         |
|                  |        |                           |                |                 |         |             |         "productId": 2,          | 
|                  |        |                           |                |                 |         |             |         "qty": 2                 |
|                  |        |                           |                |                 |         |             |        }                         |
|                  |        |                           |                |                 |         |             |   ]                              | 
|                  |        |                           |                |                 |         |             | }                                |
|                  | DELETE |     Eliminar una orden    |       SI       |       NO        | userid  |   orderId   |                                  |
|                  |        |         pendiente         |                |                 |         |             |                                  |
|                  |        |                           |                |                 |         |             |                                  | 
|                  |        |     Eliminar una orden    |       SI       |       SI        | userid  |   orderId   |                                  |
|                  |        |         Confirmada        |                |                 |         |             |                                  |
|                  |        |                           |                |                 |         |             |                                  |
|                  | PATCH  |  Cambiar estado de orden  |       SI       |       SI        | userid  |   orderId   | {                                |
|                  |        |                           |                |                 |         |             | "order_status": "En Preparación" |
|                  |        |                           |                |                 |         |             | }                                |
|                  |        |                           |                |                 |         |             |                                  |
| /orders/checkout |  POST  |     Confirmar orden/es    |       SI       |       NO        | userid  |             | {                                |
|                  |        |                           |                |                 |         |             |    "paymentMethodId": 4,         |
|                  |        |                           |                |                 |         |             | }                                |
|------------------|--------|---------------------------|----------------|-----------------|---------|-------------|----------------------------------|
|  /paymentMethods |  GET   |  Muestra métodos de pago  |       SI       |       SI        | userid  |             |                                  |
|                  |        |        disponibles        |                |                 |         |             |                                  |
|                  |        |                           |                |                 |         |             |                                  |
|                  |  POST  |    Crea un nuevo método   |       SI       |       SI        | userid  |             | {                                |
|                  |        |          de pago          |                |                 |         |             |    "description": "Bitcoin"      |
|                  |        |                           |                |                 |         |             | }                                |
|                  |        |                           |                |                 |         |             |                                  |
|                  |  PUT   |     Modifica un método    |       SI       |       SI        | userid  |  paymentMId | {                                |
|                  |        |          de pago          |                |                 |         |             |  "description": "Western Union"  |
|                  |        |                           |                |                 |         |             | }                                |
|                  |        |                           |                |                 |         |             |                                  |
|                  | DELETE |     Elimina un método     |                |                 |         |             |                                  |
|                  |        |          de pago          |       SI       |       SI        | userid  |  paymentMId |                                  |
-------------------------------------------------------------------------------------------------------------------------------------------------------