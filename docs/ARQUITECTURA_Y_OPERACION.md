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

El correo externo y la integración Microsoft están deshabilitados en la configuración local de demostración. La red propia de Docker y los puertos de bucle local no se presentan como un bloqueo general de conexiones salientes a Internet.

## Qué se validó

- Construcción de la imagen de aplicación y arranque con la base de laboratorio.
- Inicialización del conjunto completo de datos sintéticos.
- Salud de servicios y respuesta HTTP desde el anfitrión.
- Conservación de los datos al detener y volver a iniciar los servicios en la comprobación automatizada.
- Recorrido web de escritorio descrito en [Evidencias](EVIDENCIAS.md).

## Qué falta para un despliegue público

El proyecto tuvo un despliegue académico anterior en una VPS Ubuntu. Esa instancia dejó de estar disponible. Recuperar archivos y respaldos no equivale a haber restaurado y validado el servicio.

Antes de ofrecer una nueva demo se debe comprobar la restauración de datos, la compatibilidad de imágenes con la arquitectura de la instancia, la configuración de producción, HTTPS, permisos de base, secretos y procedencia de recursos visuales. También debe verificarse por separado la integración Power BI. No se publican accesos ni configuración operativa del servidor.

Este caso no incluye instrucciones de instalación de la aplicación porque su código y archivos necesarios permanecen privados. Los documentos permiten revisar el diseño y sus evidencias sin prometer una ejecución que este repositorio no proporciona.
