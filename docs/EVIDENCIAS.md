# Evidencias y validación

**Revisión local: 20 de noviembre de 2026.** Capturas reales de la aplicación en Windows con Docker Desktop y WSL 2. Los nombres y operaciones del panel pertenecen a una población de laboratorio, no a clientes comerciales.

## Panel de carritos

![Panel web con el histórico simulado seleccionado](capturas/carritos-historico-simulado.jpg)

La captura muestra el panel administrativo web y el selector de histórico simulado activo. Documenta 42.900 carritos, sus estados y la distinción entre episodios de abandono y carritos con historial. No es una captura de Power BI ni demuestra una mejora comercial.

La marca del prototipo conserva su identidad académica original. No existe afiliación con la tienda comercial del mismo nombre. Se incluye esta pantalla para documentar el funcionamiento del caso, sin distribuir sus recursos visuales originales ni el catálogo de productos.

## Aviso educativo de la aplicación

![Aviso educativo que identifica compras, pagos y envíos simulados y ausencia de afiliación](capturas/aviso-academico.jpg)

El aviso visible identifica el sitio como proyecto educativo y sus operaciones como simulaciones. No se realizan cobros, transacciones comerciales ni entregas reales.

## Alcance de la revisión web

| Comprobación | Observación |
|---|---|
| Inicio y catálogo | Carga visible correcta; 119 productos |
| Filtro Manga | 13 productos |
| Sesión | Se exige autenticación antes de agregar al carrito |
| Carrito y checkout | Producto y subtotal visibles; teléfono obligatorio validado |
| Administración | Acceso con cuenta de laboratorio y consulta del histórico |
| Power BI incrustado | Mensaje «Informe en preparación»; Microsoft sin configurar |

Se dejó un carrito adicional de prueba con un producto y no se completó un nuevo pedido ni un pago. El conteo posterior fue de 42.901 carritos totales y 29.898 pedidos históricos. El carrito adicional no forma parte de los 42.900 del histórico de la captura.

La revisión corresponde a navegador de escritorio. No constituye una auditoría exhaustiva, una validación móvil ni una certificación de accesibilidad o seguridad.

## Automatización de la implementación privada

La versión preparada superó comprobación de tipos, compilación y 95 pruebas. También se comprobó en CI la construcción de contenedores, la población de datos, la salud HTTP y la persistencia después de detener y volver a iniciar los servicios.

Estos resultados corresponden a la implementación privada revisada; este repositorio documental no ejecuta dichas pruebas ni publica sus logs internos. No se confunde persistencia con una restauración probada desde un respaldo.

## Evidencias pendientes

- Actualización y revisión de Resumen y Carritos en Power BI Desktop contra la base local preparada.
- Capturas actuales de los informes con fecha, filtros, indicadores y fuente explicados.
- Validación de la integración Microsoft, si se habilita.
- Restauración y despliegue público verificados antes de añadir un enlace de demostración.

No se usan capturas de la antigua VPS para representar un servicio actualmente disponible ni se fabrican pantallas de informes.
