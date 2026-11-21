# Hallazgos y recomendaciones

## Base del análisis

Para responder las preguntas vigentes, recalculé los indicadores del histórico simulado el 21/11/2026. Utilicé 42.900 carritos creados entre enero de 2024 y el 13 de octubre de 2026 y excluí las pruebas nuevas del prototipo.

Las consultas fueron de solo lectura sobre las vistas PostgreSQL y respetan las reglas del modelo Power BI: una fila por carrito, abandono registrado aunque después compre, recuperación con compra posterior o igual a la fecha de abandono, y snapshot de importes mostrados al abandonar cuando existe. Los resultados agregados están en [datos](../datos/).

Las capturas de los informes conservan una importación anterior. Los valores de este documento proceden de la comprobación SQL local, no de una actualización de esos informes. El generador incorpora patrones deliberados: las asociaciones que siguen no prueban causas ni impacto comercial.

## 1. Evolución del abandono

| Cohorte de creación | Carritos | Con algún abandono | Proporción |
|---|---:|---:|---:|
| Enero 2024-junio 2026 | 37.400 | 11.220 | 30,00 % |
| Julio-septiembre 2026 | 4.900 | 2.695 | 55,00 % |
| Octubre 2026, hasta el día 13 | 600 | 330 | 55,00 % |

El aumento es de 25 puntos porcentuales. Describe un escenario diseñado en los datos; no demuestra que una política de envío haya causado el cambio. Octubre es parcial y no se compara su volumen con un mes o trimestre completo.

## 2. Etapa en la que se registra el abandono

| Última etapa registrada de abandono | Carritos | Proporción de los 14.245 con abandono |
|---|---:|---:|
| Checkout iniciado | 10.107 | 70,95 % |
| Carrito revisado | 2.476 | 17,38 % |
| Productos agregados | 1.662 | 11,67 % |

La concentración orienta a revisar primero el checkout. No identifica un motivo específico ni mide tiempo por etapa. Se toma el último abandono de cada carrito, no todos sus episodios.

## 3. Avance y confirmación del pedido

| Hito | Carritos | Porcentaje de los 42.900 creados |
|---|---:|---:|
| Llegan al checkout | 39.545 | 92,18 % |
| Inician el pago | 29.898 | 69,69 % |
| Confirman un pedido | 29.898 | 69,69 % |

El denominador es el total creado, no la etapa anterior. El histórico no representa pérdida entre inicio de pago y confirmación: ambos conteos coinciden. Por eso no utilizo estos datos para atribuir abandono a rechazos de tarjeta o fallos técnicos.

## 4. Comparación con el umbral de envío gratuito

Restrinjo esta comparación a entrega a domicilio con costo de envío conocido, como en los gráficos del informe: **32.428 carritos**. Uso el umbral histórico asociado a cada carrito, no un rango fijo de precios como sustituto de esa regla.

| Relación del subtotal con el umbral | Carritos | Con abandono | Tasa de abandono | Pedidos | Conversión |
|---|---:|---:|---:|---:|---:|
| Por debajo | 22.393 | 6.050 | 27,02 % | 16.279 | 72,70 % |
| Exactamente en el umbral | 0 | — | Sin casos | — | Sin casos |
| Por encima | 10.035 | 2.137 | 21,30 % | 8.263 | 82,34 % |

La conversión es 9,64 puntos porcentuales mayor por encima del umbral, calculados antes de redondear. No se puede concluir qué pasa exactamente en el umbral, ni trasladar esa diferencia a un escenario con otro umbral. También pueden variar importe, período y composición de los grupos.

## 5. Costo de envío mostrado y continuidad

De nuevo, solo comparo entrega a domicilio con cotización conocida. Retiro y ausencia de cotización se mantienen fuera.

| Envío mostrado | Carritos | Tasa de abandono | Conversión |
|---|---:|---:|---:|
| $0 | 10.035 | 21,30 % | 82,34 % |
| $3 | 8.863 | 28,97 % | 72,02 % |
| $4 | 8.174 | 26,03 % | 72,95 % |
| $5 | 5.356 | 25,28 % | 73,43 % |

El envío de $0 se asocia con mayor conversión en esta simulación. Sin embargo, entre $3, $4 y $5 la conversión no cae conforme aumenta el costo: no hay una relación descendente simple. Además, en este conjunto el grupo de envío $0 coincide con el grupo por encima del umbral; no son dos pruebas independientes del mismo efecto.

Hay 5.468 carritos a domicilio sin una cotización utilizable en el snapshot de análisis. No los interpreto como envío gratuito ni los uso para calcular una tasa atribuible a un precio mostrado. El snapshot de abandono puede no representar la cotización final de una compra recuperada.

## 6. Clientes nuevos, recurrentes y períodos

| Segmento al crear el carrito | Carritos | Tasa de abandono | Conversión |
|---|---:|---:|---:|
| Nuevo | 21.452 | 33,60 % | 69,44 % |
| Recurrente | 21.448 | 32,81 % | 69,95 % |

Las diferencias globales son pequeñas: unos 0,79 puntos de abandono y 0,51 de conversión. No sostienen una afirmación de que los clientes nuevos presentan dificultades severas. Conviene cruzar segmento y período antes de proponer acciones distintas; el cambio temporal del 30 % al 55 % es mucho mayor que esta brecha global.

## 7. Recuperación posterior al abandono

De los 14.245 carritos con algún abandono, **2.540 confirmaron una compra posteriormente**, una recuperación del **17,83 %**. Se exige pedido y fecha de compra posterior o igual al último abandono registrado.

El resultado permite separar abandono transitorio y falta de compra al corte. No demuestra que una campaña o recordatorio haya provocado la recuperación. Abandono y conversión se solapan; sus porcentajes no deben sumarse como partes de un 100 %.

## Recomendaciones y comprobación propuesta

| Acción que propongo evaluar | Sustento | Cómo comprobarla |
|---|---|---|
| Revisar pasos, información y total del checkout | Allí se registra el 70,95 % del abandono | Comparar avance y abandono por etapa antes y después, con períodos equivalentes |
| Mostrar envío y umbral con anticipación | Diferencias entre grupos con cotización conocida | Evaluar claridad y continuidad, separando importe, segmento y período |
| Probar una política de envío antes de cambiarla definitivamente | Asociación entre umbral y conversión, sin evidencia causal | Piloto controlado que mida conversión y costo/margen; no solo ventas |
| Mantener una métrica de recuperación | 2.540 compras posteriores al abandono | Contar pedidos, no solo reactivaciones, y registrar intervenciones si existen |
| Ampliar la población de prueba | No hay igualdad exacta con el umbral ni pérdida en pago | Incorporar esos escenarios y verificar cálculos y límites |

## Conclusión

En la simulación, el checkout concentra el abandono y los grupos con envío gratuito muestran mayor continuidad. Esto sirve para priorizar preguntas y pruebas, no para afirmar causas. Mi recomendación es revisar primero la experiencia de checkout y la claridad del costo total, y evaluar cualquier cambio de umbral con un piloto que también mida costos. La recuperación posterior debe mantenerse como indicador separado.
