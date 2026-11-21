# Mi participación y aprendizajes

## Cómo construimos el proyecto

Lo realizamos en grupo durante la universidad. Participé principalmente en orientar los requisitos, el diseño y la construcción del prototipo; mis compañeros colaboraron en la idea, el problema y la planificación del modelo de datos.

Utilicé ampliamente IA para desarrollar el código y parte del trabajo de Power BI: daba instrucciones, preguntaba por el funcionamiento, revisaba resultados y pedía ajustes. No presento la aplicación como programación manual individual ni me atribuyo dominio de todas las funciones implementadas. La preparación técnica y documental de este caso también recibió asistencia de IA.

## Cómo acotamos el análisis

En una presentación académica anterior se consideraron más variables, como dispositivo, marketing y problemas de pago. Después delimitamos la pregunta a etapas de compra, subtotal, envío mostrado, umbral, segmentos, períodos y recuperación.

En este repositorio uso ese enfoque final. Los hallazgos anteriores sobre errores técnicos o dispositivos no se trasladan a las conclusiones actuales. Las cifras vigentes se contrastaron de nuevo con el histórico de laboratorio.

## Qué quiero mostrar con el caso

Me interesa relacionar una necesidad de negocio con datos e indicadores comprensibles. Este proyecto me permite trabajar esa conexión con PostgreSQL y Power BI, y practicar cómo ejecutar los servicios con Docker.

Los puntos que preparo para explicar y repetir son: la diferencia entre abandono actual e histórico; el denominador de cada tasa; la granularidad de las vistas; el recorrido SQL → Power Query → DAX; y la función de imágenes, contenedores, redes y volúmenes.

## Aprendizajes

- Un carrito puede abandonar y después comprar: las métricas de abandono y conversión se pueden solapar.
- Un pedido y una línea de pedido tienen distinta granularidad; unirlos sin cuidado puede duplicar importes.
- Un envío desconocido no equivale a envío gratuito.
- Una asociación en datos simulados no demuestra una causa ni garantiza una mejora comercial.
- Un volumen conserva datos al recrear contenedores, pero no reemplaza una restauración probada de respaldo.

## Alcance del repositorio

Comparto documentación, capturas seleccionadas y resultados agregados de laboratorio. Mantengo privados la aplicación completa, las bases y respaldos, los archivos Power BI y las credenciales.

El prototipo utilizó referencias comerciales y recursos de terceros. No los atribuyo como creación propia y las marcas visibles no implican afiliación ni reciben una licencia abierta mediante este repositorio.
