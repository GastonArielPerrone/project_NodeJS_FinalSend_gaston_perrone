# API de productos

API REST desarrollada con Node.js, Express y Firebase Firestore para consultar y administrar productos.

## Requisitos

- Node.js y npm instalados.
- Acceso a Internet.
- Un proyecto de Firebase con Firestore habilitado y una colección llamada `products`.

La configuración de Firebase se encuentra en `src/data/data.js`. Antes de ejecutar la API, verifica que corresponda a tu proyecto de Firebase y que la configuración de Firestore permita las operaciones que necesita la aplicación. No publiques credenciales privadas ni habilites acceso irrestricto a Firestore en producción.

## Instalación y ejecución

Desde la carpeta del proyecto, instala las dependencias:

```bash
npm install
```

Inicia la API:

```bash
npm start
```

Para desarrollo, puedes usar el modo que reinicia el servidor cuando detecta cambios:

```bash
npm run dev
```

Cuando el servidor esté activo, escucha en `http://localhost:3000`. Déjalo ejecutándose mientras realizas solicitudes desde Postman.

## Endpoints disponibles

La ruta base es `/api`. Los IDs son los IDs de documento de Firestore (texto), no necesariamente números.

| Operación | Método | URL | Respuesta esperada |
| --- | --- | --- | --- |
| Listar productos | GET | `http://localhost:3000/api/products` | `200` y un array JSON |
| Consultar un producto | GET | `http://localhost:3000/api/products/:id` | `200` y un producto; `404` si no existe |
| Crear un producto | POST | `http://localhost:3000/api/products` | `201` y el producto creado |
| Actualizar un producto | PUT | `http://localhost:3000/api/products/:id` | `200` y el producto actualizado |
| Eliminar un producto | DELETE | `http://localhost:3000/api/products/:id` | `200` y confirmación de eliminación |

### Ejemplos para Postman

Para consultar un producto, primero puedes listar los productos y copiar el valor `id` devuelto. Luego envía:

```http
GET http://localhost:3000/api/products/ID_DEL_DOCUMENTO
```

Para crear un producto, selecciona `POST`, usa la URL de creación y configura **Body → raw → JSON**:

```json
{
  "name": "Conjunto Impulse F1 hombre",
  "price": 400,
  "categoryID": "automovilismo"
}
```

Para actualizarlo, selecciona `PUT`, reemplaza el ID en la URL y envía los campos que quieres guardar:

```json
{
  "name": "Conjunto Impulse F1 hombre",
  "price": 450,
  "categoryID": "automovilismo"
}
```

Para eliminarlo, selecciona `DELETE` y usa el ID del documento en la URL:

```http
DELETE http://localhost:3000/api/products/ID_DEL_DOCUMENTO
```

La respuesta confirma la eliminación y devuelve el ID. Las rutas POST y PUT leen `name`, `price` y `categoryID` del cuerpo JSON. Al actualizar, los campos enviados se escriben en el documento con esos nombres.

## Solución de problemas

- **No conecta con el servidor:** verifica que `npm start` o `npm run dev` siga ejecutándose y que la URL use el puerto `3000`.
- **404 al consultar un producto:** comprueba que copiaste el ID exacto del documento de Firestore y que existe en la colección `products`.
- **Error 500 o respuesta HTML:** revisa la salida de la terminal donde corre Node.js. Confirma la configuración de Firebase, que Firestore esté habilitado, que haya conexión a Internet y que las reglas/permisos de Firestore permitan la operación.
- **404 para una URL:** los endpoints usan `/api/products`, en singular `products` en inglés; por ejemplo, `/api/products/:id`.
