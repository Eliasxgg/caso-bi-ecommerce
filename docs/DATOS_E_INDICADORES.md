# Datos e indicadores

## Origen y alcance

La aplicación registra un flujo simulado de catálogo, carritos, pedidos y estados. El histórico se genera mediante SQL para practicar análisis; las nuevas pruebas del prototipo se identifican por separado mediante `origen_datos`.

El histórico abarca desde enero de 2024 hasta el 13 de octubre de 2026, con corte de generación el 14 de octubre. Octubre es un mes parcial. No deben compararse sus totales con meses completos sin indicar esa diferencia. Los patrones incorporados al generador no prueban comportamiento real de consumidores ni relaciones causales.

## Capas y granularidad

PostgreSQL conserva las operaciones. Cinco vistas exponen campos para análisis; los proyectos Power BI utilizan Power Query y medidas DAX. Las vistas mantienen distintos niveles de detalle:

| Vista | Una fila por | Uso |
|---|---|---|
| `bi_carritos` | Carrito | Recorrido, estado, fechas y cotizaciones |
| `bi_condiciones_envio` | Condición de envío | Interpretación de las condiciones asociadas |
| `bi_resumen_pedidos` | Pedido | Importes de cabecera y estados |
| `bi_resumen_detalle_ventas` | Línea de pedido | Cantidad e importe de cada línea |
| `bi_resumen_productos` | Variante de producto | SKU, producto, categoría y franquicia |

Separar cabecera y líneas evita sumar varias veces el total de un pedido que contiene varios productos. Los importes históricos de las operaciones no se reconstruyen a partir del precio actual del catálogo.

## Indicadores y preguntas

| Concepto | Qué representa | Precaución |
|---|---|---|
| Total de carritos | Carritos dentro del contexto de análisis | Separar histórico simulado y prototipo |
| Abandonado actualmente | Estado actual del carrito | No incluye necesariamente todos los que abandonaron antes |
| Carrito con historial de abandono | Carrito distinto que registra al menos un episodio | Un carrito puede tener varios episodios |
| Episodios de abandono | Eventos registrados de abandono | No equivale al número de carritos distintos |
| Convertido | Carrito asociado al flujo de pedido confirmado | En la demo no implica un cobro real |
| Inicio de checkout/pago | Presencia de la fecha correspondiente | Iniciar una etapa no significa completarla |
| Ventas y unidades | Medidas de los informes Resumen | Precisar filtros, estados y tratamiento de descuentos antes de interpretar |

En los archivos TMDL existen, por ejemplo, medidas de total de carritos, carritos con abandono, llegada al checkout, inicio de pago, unidades vendidas y ventas netas de productos. Esto acredita su presencia en el proyecto conservado; sus valores actuales en Power BI Desktop siguen pendientes de actualización y revisión.

## Lectura de la captura de laboratorio

El panel web, con el filtro de histórico simulado, mostró:

- 42.900 carritos consultados.
- 29.898 convertidos, 10.868 abandonados actualmente y 2.134 vaciados.
- 15.003 episodios históricos de abandono, correspondientes a 14.245 carritos distintos con historial.

Los tres estados actuales suman 42.900. La diferencia entre 15.003 episodios y 14.245 carritos no es una discrepancia: un mismo carrito puede abandonar más de una vez. Estas cifras proceden del panel y la revisión local; no se presentan como resultados de un informe Power BI actualizado.

## Límites de interpretación

- Una cotización de envío desconocida (`NULL`) no debe convertirse automáticamente en envío gratuito (cero).
- La fecha de creación, la fecha de abandono y la fecha de compra responden preguntas distintas; hay que declarar cuál define el período.
- Confirmar un pedido y recibir su pago son eventos distintos.
- Una tasa de abandono requiere definir población, evento, período y denominador; no se publica aquí una tasa genérica que mezcle estados y episodios.
- Los datos sintéticos sirven para validar recorridos y cálculos. No permiten estimar impacto comercial ni afirmar que un costo de envío causó abandono.
