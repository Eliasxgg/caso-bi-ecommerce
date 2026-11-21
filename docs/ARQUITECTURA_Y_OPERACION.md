# Arquitectura y operación

## Componentes conservados

| Componente | Tecnología | Función |
|---|---|---|
| Interfaz | React 19, TypeScript y Vite | Catálogo, carrito, checkout simulado y administración |
| API | Node.js y Express 5 | Operaciones de aplicación y acceso a datos |
| Base | PostgreSQL 18 | Tablas operativas, funciones, triggers y vistas analíticas |
| Analítica | Power BI, Power Query y DAX | Proyectos Resumen y Carritos |
| Ejecución local | Docker Compose, Docker Desktop y WSL 2 | Construcción y coordinación de aplicación/base |

## Entorno local comprobado

El entorno preparado utiliza dos servicios: aplicación y PostgreSQL. La base se inicializa, únicamente sobre un volumen nuevo, en este orden: esquema, población sintética y vistas analíticas.

Los puertos publicados están ligados a la interfaz de bucle local. Los archivos de entorno se generan por separado con secretos propios de laboratorio y no se incluyen en el caso público. La base y los archivos subidos utilizan volúmenes independientes para conservar sus datos al recrear los contenedores.

Una comprobación de salud de PostgreSQL por TCP evita confundir el servidor temporal de inicialización con la base ya preparada. La aplicación espera a que la base esté lista. Los servicios tienen límites de memoria y rotación de logs definidos en Compose.

El correo externo está deshabilitado en la demo local. Los informes publicados y la consulta de su estado se integran mediante un servicio interno que no publica puertos ni expone su autorización al navegador. La aplicación y la base utilizan una red propia de Docker, con acceso desde el anfitrión a través de puertos de bucle local.

## Qué se validó

- Construcción de la imagen de aplicación y arranque con la base de laboratorio.
- Inicialización del conjunto completo de datos sintéticos.
- Salud de servicios y respuesta HTTP desde el anfitrión.
- Conservación de los datos al detener y volver a iniciar los servicios en la comprobación automatizada.
- Recorrido web de escritorio descrito en [Evidencias](EVIDENCIAS.md).

## Conexión de datos en VPS y en local

El proyecto se desplegó académicamente en una VPS Ubuntu. Su arquitectura distingue el origen PostgreSQL, el modelo de Power BI y la visualización del informe dentro de la aplicación.

| Entorno | Origen de datos | Configuración de Power BI |
|---|---|---|
| Despliegue en VPS | PostgreSQL alojado en el servidor | El modelo publicado utiliza la conexión del servidor y sus credenciales de lectura |
| Trabajo local | PostgreSQL de la PC, ejecutado con Docker | En Power BI Desktop se configura el servidor, puerto, base y credenciales locales antes de actualizar el modelo |

Los informes utilizan modo Import: cargan los datos al actualizar el modelo. Los filtros son interactivos sobre esos datos importados; no representan consultas en tiempo real a PostgreSQL. La fecha visible en el panel permite identificar la actualización del modelo publicado.

Para que Power BI Service actualice un origen que solo es accesible desde la PC, se necesita un gateway de datos local configurado. Conectar Power BI Desktop a la base local y visualizar un informe publicado en el panel son dos configuraciones distintas. Las credenciales permanecen fuera del repositorio público.

Este caso no incluye instrucciones de instalación de la aplicación porque su código y archivos necesarios permanecen privados. Los documentos permiten revisar el diseño y sus evidencias sin prometer una ejecución que este repositorio no proporciona.
