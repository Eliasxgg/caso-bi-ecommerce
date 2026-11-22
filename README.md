# Abandono de compra en e-commerce · Caso de estudio BI

**Power BI · Power Query · DAX · PostgreSQL · SQL · Docker**

Analicé el recorrido de compra de un e-commerce simulado para identificar dónde se concentra el abandono y cómo se relacionan el subtotal, el envío mostrado y el umbral de envío gratuito con la conversión. El resultado es un caso académico con dos informes Power BI, reglas de medición explícitas y propuestas de negocio que se pueden evaluar.

**Estado al 22/11/2026:** la aplicación se demuestra **en local**. La instancia Oracle anterior fue eliminada; no hay una tienda web pública activa. Los informes integrados conservan su importación publicada del 19/10/2026: visualizarlos no demuestra una actualización desde la base local.

[Hallazgos y recomendaciones](docs/HALLAZGOS_Y_RECOMENDACIONES.md) · [Modelo e indicadores](docs/DATOS_E_INDICADORES.md) · [Galería y evidencias](docs/EVIDENCIAS.md) · [Participación](docs/PARTICIPACION.md)

> Proyecto universitario grupal, con asistencia de IA en implementación, datos sintéticos y documentación. Las operaciones son simuladas, sin cobros ni entregas reales ni afiliación con la tienda comercial cuyas referencias aparecen en el prototipo. La [participación individual y los aprendizajes](docs/PARTICIPACION.md) se distinguen del trabajo del equipo y del código asistido.

## El caso en cifras

Corte de los agregados locales: **21/11/2026**, origen **HISTORICO_SIMULADO**. Operaciones generadas entre enero de 2024 y el 13/10/2026; no son datos comerciales reales.

| Carritos analizados | Con algún abandono | Pedido confirmado | Compra posterior al abandono |
|---:|---:|---:|---:|
| 42,900 | 14,245 · 33.21 % | 29,898 · 69.69 % | 2,540 · 17.83 % de los que abandonaron |

Abandono y conversión se solapan: una persona puede abandonar y después comprar. No son categorías que sumen un 100 %. La recuperación exige compra; volver a abrir el carrito no basta.

## Informes Power BI

### Carritos y abandono de compra

Evolución mensual, etapa del último abandono, subtotal, umbral histórico, envío y segmento. La captura muestra el informe publicado dentro del administrador local, con origen HISTORICO_SIMULADO.

[![Informe Carritos integrado en el panel local](docs/capturas/powerbi-carritos-integrado.jpg)](docs/capturas/powerbi-carritos-integrado.jpg)

### Resumen de ventas

Ventas netas de productos, unidades y pedidos, con filtros por período, origen, categoría, franquicia y producto. La captura usa origen Todas y una importación anterior: sus **29,902 pedidos no son los 29,898 del histórico local** de la tabla anterior.

[![Informe Resumen integrado en el panel local](docs/capturas/powerbi-resumen-integrado.jpg)](docs/capturas/powerbi-resumen-integrado.jpg)

Las imágenes son evidencia de visualización, no una demo web desplegada. Pueden abrirse por separado para leer el detalle. [Fecha, filtros y diferencias entre fuentes](docs/EVIDENCIAS.md).

## Problema y pregunta principal

El escenario incorpora deliberadamente un aumento del abandono: **30 % entre enero de 2024 y junio de 2026, frente a 55 % en julio-septiembre de 2026**. Esa diferencia de 25 puntos porcentuales es una condición de la simulación, no un efecto descubierto en una empresa.

**¿En qué etapas se abandona la compra, y cómo se relacionan el subtotal y el costo de envío mostrado, incluido el umbral de envío gratuito, con la finalización del pedido?**

El análisis cubre evolución, etapas, avance a checkout/pago/pedido, subtotal y umbral, envío, segmentos y recuperación. El [mapa de preguntas y visuales](docs/DATOS_E_INDICADORES.md) explica cada indicador y su denominador.

## Cómo se construyó el análisis

1. **Operación:** la demo React/Node.js registra carritos, cotizaciones, pedidos y estados en PostgreSQL. Los snapshots conservan lo que se mostró al abandonar.
2. **SQL:** cinco vistas separan carritos, condiciones históricas, pedidos, líneas y variantes. Una fila por carrito o por línea según el hecho; sin duplicar totales de cabecera.
3. **Power Query:** limpieza y tipos, fechas para calendarios e importes de análisis elegidos entre el snapshot de abandono y el checkout.
4. **Modelo y DAX:** relaciones de filtro único y medidas de abandono, avance, conversión, recuperación y venta neta de productos. La venta neta excluye envío; no se presenta como utilidad.
5. **Comunicación:** informes con filtros y conclusiones que distinguen asociación, limitaciones y una prueba futura de negocio.

El origen de los informes es PostgreSQL en **modo Import**. Los [CSV públicos](datos/) son agregados para contrastar resultados, no el motor de la aplicación ni una copia de clientes.

## Resultados y decisiones que orientan

Esta tabla usa únicamente el recálculo local de los CSV; las imágenes conservan una importación anterior y pueden mostrar redondeos o distribuciones ligeramente diferentes.

| Resultado en la simulación | Interpretación y decisión propuesta |
|---|---|
| Checkout concentra 10,107 de 14,245 carritos con abandono: **70.95 %** | Priorizar la revisión de claridad del total y pasos del checkout; no atribuirlo a un error técnico no medido |
| Abandono de **32.89 %** entre $25 y $34.99; **25.54 %** por debajo de $25 y **21.30 %** desde $35 | Evaluar un piloto de beneficio desde $25; el rango intermedio tiene mayor tasa, no mayor volumen |
| Conversión de **72.70 %** por debajo del umbral y **82.34 %** por encima | Comparar políticas en grupos equivalentes; no interpretar los 9.64 puntos como mejora garantizada |
| Llegan al checkout **92.18 %**; inicio de pago y pedido coinciden en **69.69 %** | El generador no representa pérdida entre pago y confirmación; no permite diagnosticar rechazos bancarios |
| **2,540** compras después de abandonar: **17.83 %** de recuperación | Medir un ensayo de recordatorios autorizados frente a control; el retorno no demuestra efecto del correo |

Comparaciones de subtotal, umbral y tarifa: solo entrega a domicilio con cotización conocida. Retiro y envío desconocido no se convierten en «envío gratis». No hay casos exactamente en el umbral. [Conteos, límites y recomendaciones completas](docs/HALLAZGOS_Y_RECOMENDACIONES.md).

**La siguiente decisión sería un piloto, no bajar el umbral por intuición.** Compararía la política de $35 con un beneficio de $25 en carritos elegibles, midiendo conversión, costo logístico asumido y margen de contribución. El modelo actual no contiene todos esos costos y no demuestra retorno económico.

## Recorrido del cliente y operación

Catálogo y combinación de producto → carrito → entrega/retiro y cupón → pago **simulado** → pedido y comprobante académico. Administración gestiona catálogo, inventario, cobro y entrega simulados, historial de carritos y correos. Ese recorrido genera los hechos que consumen las vistas analíticas; el informe no reemplaza la operación.

<details>
<summary>Ver una muestra del e-commerce y de la operación</summary>

**Inicio y categorías.** Referencias visuales del prototipo académico.

![Inicio y cinco categorías](docs/capturas/inicio-categorias.jpg)

**Pago simulado.** Tarjeta de ejemplo, sin cobro ni confirmación de pedido durante la captura.

![Pago académico con tarjeta de ejemplo](docs/capturas/pago-tarjeta-simulada.jpg)

**Seguimiento operativo.** Distingue estado actual, episodios y carritos distintos con abandono.

![Carritos del histórico simulado en administración](docs/capturas/admin-carritos.jpg)

</details>

La [galería completa](docs/EVIDENCIAS.md) conserva las nueve capturas: inicio, catálogo, pago, productos, pedidos, carritos, ambos informes y aviso académico. No se fabricaron nuevas pantallas ni se modificaron los datos para esta revisión.

## Arquitectura y estado actual

| Capa | Tecnología y responsabilidad |
|---|---|
| Datos | PostgreSQL 18 y SQL: transacciones, integridad, historial y vistas |
| Analítica | Power BI Desktop, Power Query/M y DAX; publicación en Power BI Service |
| Aplicación | React 19, TypeScript, Vite, Node.js y Express 5 |
| Demo actual | Docker Compose sobre Docker Desktop/WSL 2, con volúmenes locales |
| Despliegue histórico | Oracle VPS/Ubuntu, proxy HTTPS, app, PostgreSQL y servicio interno BI; instancia eliminada |

En local, el panel puede mostrar el modelo ya publicado y consultar su fecha/cupo mediante un servicio opcional autorizado. **Ese servicio no es un gateway ni da a Microsoft acceso a localhost.** La actualización de Service desde el origen local sigue pendiente de configuración y validación. Power BI Desktop sí puede configurarse con la base local para trabajar el modelo.

[Arquitectura histórica, esquema local y operación](docs/ARQUITECTURA_Y_OPERACION.md) · [Qué se verificó y qué no](docs/EVIDENCIAS.md).

## Participación y aprendizajes

Como equipo diseñamos el problema y la base: tablas, relaciones y datos necesarios para responder las preguntas. Mi participación se centró en orientar requisitos/diseño, revisar el recorrido y relacionarlo con el análisis. Utilizamos IA para agilizar la aplicación, los scripts, la población sintética y la documentación.

Apliqué conexión PostgreSQL/CSV, preparación en Power Query, columnas y medidas DAX, relaciones, filtros, publicación e interpretación. También practiqué Docker, redes, volúmenes y el despliegue histórico en una VPS. [Actividades, alcance y aprendizajes](docs/PARTICIPACION.md).

## Documentación y reproducibilidad

- [Datos, granularidad, relaciones y fórmulas](docs/DATOS_E_INDICADORES.md).
- [Hallazgos y propuestas de evaluación](docs/HALLAZGOS_Y_RECOMENDACIONES.md).
- [Capturas, fechas y límites de validación](docs/EVIDENCIAS.md).
- [Arquitectura y operación por entorno](docs/ARQUITECTURA_Y_OPERACION.md).

Para contrastar los agregados y los enlaces internos, con Node.js 24:

```sh
node scripts/validar-caso.mjs
```

Este repositorio público contiene el caso, capturas revisadas, agregados y su validador. La implementación y configuración de laboratorio permanecen en un repositorio privado; no es necesario acceder a él para leer el caso. No se publican credenciales, respaldos, PBIX ni datos de clientes. Los recursos de terceros visibles no se atribuyen como creación propia ni reciben una licencia abierta por estar en estas capturas.
