# Mi participación y aprendizajes

## Diseño y trabajo en grupo

La actividad de la materia Inteligencia de Negocios requería usar una empresa real como referencia y plantearle un problema ficticio de BI. Elegimos NizeStore para construir ese escenario educativo. El abandono, los clientes, las ventas y las operaciones simuladas no son información de la tienda real ni un diagnóstico de su negocio.

Las referencias a su identidad visual y catálogo se utilizaron para representar el ejercicio, sin intención de suplantación, venta en nombre de la empresa, apropiación de sus recursos o comercialización. No existe afiliación con NizeStore; la marca y los recursos de terceros no se atribuyen como creación del equipo y conservan sus respectivos titulares.

El proyecto fue universitario y grupal. Como equipo definimos el problema, las preguntas de negocio y el diseño de la base de datos: tablas necesarias, relaciones y datos que debían conservarse para analizar el proceso de compra.

Participé principalmente en orientar la construcción y el diseño de la demo, revisar su funcionamiento y relacionar el flujo de compra con la información que necesitábamos analizar. El diseño de la base se trabajó en grupo; utilizamos apoyo de IA para convertir ese diseño en scripts SQL, generar datos sintéticos y construir con rapidez la aplicación web de demostración.

## Qué aprendí con Power BI

Las prácticas y el proyecto me permitieron aplicar herramientas de BI a un problema de negocio:

- Conectar Power BI directamente con PostgreSQL y configurar el origen según el entorno.
- Trabajar con CSV para importar, revisar y exportar datos, además de utilizar la conexión directa a las vistas.
- Limpiar y transformar datos en Power Query: texto, tipos, fechas, importes y valores desconocidos.
- Crear columnas personalizadas en Power Query y columnas calculadas en el modelo según la necesidad del análisis.
- Definir e interpretar medidas DAX, con sus filtros y denominadores.
- Organizar relaciones y niveles de detalle para evitar duplicar totales de pedidos al analizar sus líneas.
- Diseñar dashboards con tarjetas, gráficos, segmentadores e indicadores y explicar qué pregunta responde cada visual.
- Publicar informes e integrarlos al panel de administración.

Son aprendizajes aplicados en un contexto académico. Mi interés es poder explicar el recorrido desde el dato hasta una recomendación de negocio y repetir las tareas con comprensión de sus límites.

## Base de datos e infraestructura

El trabajo de modelado me ayudó a comprender cómo una decisión de diseño influye en el análisis: una fila por carrito, cabeceras y líneas de pedido separadas, condiciones históricas de envío y datos registrados al abandonar.

También practiqué el manejo de una VPS Ubuntu, Docker y Docker Compose: separar servicios de aplicación y base, configurar conexiones, utilizar redes y volúmenes y revisar consumo de recursos. El entorno local permite trabajar con los mismos componentes, con sus propias credenciales y datos de laboratorio.

## Uso de IA

El apoyo de IA se concentró en agilizar la implementación de la demo web, la población sintética y la escritura de scripts SQL a partir del diseño del grupo. También recibí apoyo técnico y para resolver dudas durante el proceso, incluido el trabajo con Power BI. La documentación y preparación del caso recibieron asistencia de IA.

Las decisiones del modelo y del caso se trabajaron en grupo. Distingo ese diseño, los aprendizajes que puedo explicar y el código generado con ayuda, sin atribuirme una implementación manual completa ni experiencia comercial.

## Evolución del enfoque

En presentaciones anteriores consideramos más variables. Después delimitamos el análisis a etapas, subtotal, envío mostrado, umbral, cliente, período y recuperación. Las conclusiones actuales se basan en ese enfoque y no reutilizan afirmaciones anteriores sobre dispositivos o errores de pago.

## Qué demuestra este caso

La presentación conecta una pregunta de negocio con preparación de datos, SQL, un modelo Power BI, interpretación de gráficos y propuestas que se pueden evaluar. Se conservan nueve capturas reales y agregados de laboratorio como respaldo.

La implementación completa, las credenciales y los datos importados permanecen privados. Las marcas y recursos de terceros visibles en el prototipo no se atribuyen como creación propia ni implican afiliación comercial.
