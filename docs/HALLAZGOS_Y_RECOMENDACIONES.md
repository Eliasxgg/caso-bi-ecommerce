# Hallazgos y recomendaciones de negocio

## Cómo leer los resultados

Las fuentes visuales corresponden al dashboard **Carritos y abandono de compra**, con origen HISTORICO_SIMULADO, todos los tipos de cliente y todas las políticas. Los datos abarcan enero de 2024 al 13 de octubre de 2026. Octubre es parcial.

Distingo dos niveles de evidencia: el valor redondeado que se ve en el gráfico y el recálculo de las vistas SQL locales, disponible en [datos](../datos/). Los conteos generales y las etapas coinciden; algunas distribuciones por tarifa difieren ligeramente entre la importación publicada y la población local. Por eso identifico cada fuente antes de interpretar una cifra.

Formato numérico de los documentos: coma para miles y punto para decimales, por ejemplo **14,245**, **70.95 %** y **$34.99**. Los CSV conservan números sin separadores de miles para facilitar su importación.

## 1. ¿Cómo evoluciona el abandono?

**Fuente visual:** gráfico combinado «Carritos con abandono y convertidos por mes»: columnas de cantidades y líneas de porcentajes. Los conteos de los períodos se contrastan con [periodos.csv](../datos/periodos.csv).

| Cohorte de creación | Carritos | Con abandono | Proporción |
|---|---:|---:|---:|
| Enero 2024-junio 2026 | 37,400 | 11,220 | 30.00 % |
| Julio-septiembre 2026 | 4,900 | 2,695 | 55.00 % |
| Octubre 2026, hasta el día 13 | 600 | 330 | 55.00 % |

El aumento es de 25 puntos porcentuales. En un negocio sería una señal para investigar qué cambió; aquí es un patrón previsto en la simulación. El volumen de octubre no se compara con un mes o trimestre completo.

## 2. ¿En qué etapa se concentra el abandono?

**Fuente visual:** barras horizontales simples «¿En qué etapa abandonan?» y tarjeta «Carritos con abandono». El gráfico cuenta la última etapa de abandono registrada en cada carrito.

| Última etapa registrada | Carritos | Proporción calculada sobre 14,245 |
|---|---:|---:|
| Checkout iniciado | 10,107 | 70.95 % |
| Carrito revisado | 2,476 | 17.38 % |
| Productos agregados | 1,662 | 11.67 % |

Las cantidades se leen en las barras. El 70.95 % es el cálculo `10,107 / 14,245 × 100`, no una etiqueta adicional del gráfico. La concentración orienta a revisar primero claridad de costos y pasos del checkout; no demuestra un fallo técnico concreto.

## 3. ¿Qué proporción avanza y confirma un pedido?

**Fuente visual:** tarjetas «Llegan al checkout (%)», «Inician el pago (%)» y «Conversión a pedido». El gráfico de anillo «Estado actual de los carritos» complementa la lectura de estados actuales.

| Hito | Conteo contrastado en SQL | Porcentaje visible en el informe |
|---|---:|---:|
| Llegan al checkout | 39,545 | 92.2 % |
| Inician el pago | 29,898 | 69.7 % |
| Confirman un pedido | 29,898 | 69.7 % |

El denominador es el total de 42,900 carritos creados, no la etapa anterior. La coincidencia entre inicio de pago y pedido es una limitación del histórico generado; estos datos no permiten atribuir una pérdida a rechazos de tarjeta. El anillo muestra el estado actual: su 25.33 % abandonado no equivale a la tasa de carritos que abandonaron alguna vez.

## 4. ¿Cómo se relacionan el subtotal y el umbral con la conversión?

### Rangos fijos de subtotal

**Fuente visual:** columnas agrupadas «Abandono y conversión por subtotal». Solo entrega a domicilio con cotización conocida. Los porcentajes siguientes son los visibles en el informe; los conteos corresponden a la comprobación local de [rangos_subtotal.csv](../datos/rangos_subtotal.csv).

| Subtotal de análisis | Carritos locales | Con abandono, en el gráfico | Conversión, en el gráfico | Pedidos locales |
|---|---:|---:|---:|---:|
| Menos de $25 | 17,893 | 25.5 % | 72.6 % | 12,992 |
| $25 a $34.99 | 4,500 | 32.9 % | 73.0 % | 3,287 |
| $35 o más | 10,035 | 21.3 % | 82.3 % | 8,263 |

El rango de $25 a $34.99 tiene la mayor tasa de abandono, unos 11.6 puntos porcentuales más que el de $35 o más. No concentra la mayoría de los pedidos: en esta comparación, el mayor número está por debajo de $25. Tampoco tiene la menor conversión: 73.0 % es ligeramente mayor que 72.6 %. Abandono y conversión pueden solaparse por la recuperación posterior.

### Relación con el umbral de la política

**Fuente visual:** columnas agrupadas «Comparación con el umbral de envío gratuito». Se usa el umbral histórico asignado al carrito, no se sustituye por un rango fijo de precios. Los conteos y porcentajes exactos siguientes son el recálculo local de [umbral.csv](../datos/umbral.csv).

| Relación con el umbral | Carritos | Con abandono | Tasa de abandono | Pedidos | Conversión |
|---|---:|---:|---:|---:|---:|
| Por debajo | 22,393 | 6,050 | 27.02 % | 16,279 | 72.70 % |
| Exactamente en el umbral | 0 | — | Sin casos | — | Sin casos |
| Por encima | 10,035 | 2,137 | 21.30 % | 8,263 | 82.34 % |

El gráfico muestra esos porcentajes redondeados: 27.0 % y 21.3 % de abandono; 72.7 % y 82.3 % de conversión. La diferencia exacta de conversión es de 9.64 puntos porcentuales. No hay casos exactamente en el umbral: se confirmó en los datos, no se deduce una tasa cero por la ausencia de una barra.

Esta comparación justifica evaluar una promoción, pero no demuestra cuánto mejoraría la conversión al pasar de $35 a $25. Los grupos también pueden diferir en importe, período y composición.

## 5. ¿Cómo se relaciona el envío mostrado con la continuidad?

**Fuente visual:** columnas agrupadas «Continuidad según el costo de envío mostrado». Valores leídos del informe publicado, con entrega a domicilio y cotización conocida:

| Envío mostrado | Con abandono | Conversión |
|---|---:|---:|
| $0.00 | 21.3 % | 82.3 % |
| $3.00 | 29.2 % | 72.2 % |
| $4.00 | 25.5 % | 72.6 % |
| $5.00 | 25.8 % | 73.7 % |

El grupo con envío de $0 muestra mayor conversión. Entre $3, $4 y $5 la conversión no disminuye a medida que aumenta la tarifa: no aparece una relación descendente simple. En el conjunto local, el grupo de costo cero coincide con el que supera el umbral, por lo que no son pruebas independientes del mismo efecto.

Los conteos de [envio.csv](../datos/envio.csv) corresponden al recálculo local y no se combinan con porcentajes de la importación publicada para inferir cantidades exactas. Hay 5,468 carritos a domicilio sin cotización utilizable en el snapshot local: no significan envío gratuito y se excluyen de esta comparación.

## 6. ¿Qué diferencias hay por tipo de cliente y período?

**Fuente visual:** barras horizontales agrupadas «Clientes nuevos y recurrentes», junto con el gráfico mensual para la comparación temporal.

| Segmento al crear el carrito | Carritos locales | Abandono visible | Conversión visible |
|---|---:|---:|---:|
| Nuevo | 21,452 | 33.6 % | 69.4 % |
| Recurrente | 21,448 | 32.8 % | 69.9 % |

Las brechas globales son pequeñas: alrededor de 0.8 puntos de abandono y 0.5 de conversión. No justifican por sí solas concentrar todo el presupuesto en un tipo de cliente. Conviene evaluar segmento, subtotal y período en conjunto; el cambio temporal de 30 % a 55 % es mayor que esta diferencia global.

## 7. ¿Cuántos carritos se convierten después de abandonar?

**Fuente visual:** tarjetas «Carritos recuperados» y «Tasa de recuperación», contrastadas con «Carritos con abandono».

El informe muestra **2,540 recuperados** y **17.8 % de recuperación**. El recálculo es `2,540 / 14,245 × 100 = 17.83 %`. Se exige pedido y fecha de compra posterior o igual al último abandono registrado. Regresar al carrito sin comprar no cuenta como recuperación.

El dato muestra que parte del abandono es transitorio. No prueba que una campaña o un recordatorio haya causado esas compras.

## Referencia complementaria del Resumen de ventas

**Fuente visual:** gráfico de anillo «Ventas por categoría», informe Resumen con origen Todas. Figuras aporta **54.1 % de las ventas netas de productos** en esa importación. Sirve como contexto para evaluar visibilidad del catálogo y campañas de esa categoría; no acredita que tenga el mayor margen ni se mezcla con el denominador del informe Carritos.

## Recomendaciones de negocio y forma de evaluarlas

| Propuesta | Sustento | Prueba y métricas de decisión |
|---|---|---|
| Piloto de envío gratuito desde $25, frente a la política de $35 | Mayor abandono en $25-$34.99 y mayor conversión en los grupos con beneficio | Comparar grupos equivalentes y medir conversión, costo logístico asumido y margen de contribución por pedido y por carrito elegible |
| Mostrar costo total y progreso hacia el beneficio antes del checkout | El checkout concentra 70.95 % de los carritos con abandono | Comparar avance y abandono con períodos equivalentes; medir si la claridad mejora la continuidad |
| Probar combinaciones o complementos pertinentes en carritos menores de $25 | Este rango concentra el mayor número de pedidos de la comparación local | Medir aceptación de la sugerencia, subtotal, conversión y margen; evitar promociones que aumenten ingresos pero reduzcan la contribución |
| Evaluar recordatorios de recuperación autorizados | Se observan 2,540 compras posteriores al abandono | Registrar contacto y comparar con un grupo sin mensaje; medir pedidos incrementales, costo de campaña y recuperación |
| Evaluar presencia de Figuras en el catálogo o campañas | 54.1 % de ventas netas en Resumen, origen Todas | Contrastar margen, disponibilidad y rendimiento de campaña antes de asignar presupuesto |
| Completar escenarios del laboratorio | Sin casos exactamente en el umbral ni pérdida entre inicio de pago y pedido | Añadir esos casos para verificar las medidas y ampliar el análisis |

### Cómo decidir sobre el piloto de $25

Propongo ofrecer el beneficio a un grupo de carritos de $25 a $34.99 y compararlo con otro grupo equivalente que mantenga la política de $35. Mantendría comparables período, modalidad de entrega y tipo de cliente, y definiría antes de empezar duración, tamaño de muestra y criterio de éxito.

La conversión por sí sola no decide: el beneficio también puede subsidiar envíos de personas que habrían comprado de todos modos. Para tomar una decisión mediría ventas netas menos costo de producto, costo de envío asumido y costo promocional, tanto por pedido como por carrito elegible. El modelo actual no contiene todos esos costos; no estimo un retorno ni una ganancia que no se haya calculado.

## Conclusión

La simulación orienta a revisar el checkout y a probar una promoción acotada en el rango de $25 a $34.99. El envío gratuito aparece asociado con mayor continuidad, pero el efecto de bajar el umbral debe medirse. Las recomendaciones combinan conversión, recuperación y costos para apoyar una decisión de negocio, en lugar de tratar una tasa aislada como una garantía de rentabilidad.
