# Facturador — reconstrucción de la vista con filas de producto rediseñadas

## Objetivo
Reconstruir en este proyecto la pantalla del Facturador (POS móvil) exactamente como la captura, con un único cambio en las filas del ticket: la descripción del producto ocupa toda la primera fila, y la segunda fila lleva el precio unitario, los controles de cantidad y el subtotal de la línea. Así los nombres largos se leen completos sin truncarse, manteniendo cada tarjeta compacta.

## Alcance
Solo frontend, con datos demo. Sin base de datos ni autenticación.

## Pantalla principal (/) — idéntica a la captura
- Header oscuro: menú (hamburguesa), título "Facturador", iconos de cartera, modo oscuro y salir (rojo).
- Barra de búsqueda "Escanea o busca un producto..." + botón de escanear código + botón de portapapeles.
- Chips de categorías: Contenedores, Fast Food, Pizzas, Tradicional.
- Catálogo de productos en cuadrícula con foto, nombre y precio (visible detrás/al cerrar el ticket).

## Ticket (panel inferior deslizable) — idéntico salvo las filas
- Título "Ticket" con botón X para cerrar.
- Encabezado: "Ticket actual" + "Code", y a la derecha el selector de cliente "CONSUMIDOR FINAL" con icono de usuario y flecha.
- **Filas de producto (el cambio pedido):**
  - Fila 1: foto del producto a la izquierda + descripción completa a su derecha, con quiebre de línea en 2 líneas máximo (sin truncar con "...").
  - Fila 2: precio "$X.XX c/u", botón X rojo para quitar, cantidad, botón "+", y subtotal de la línea a la derecha.
  - Compacta: foto de 40 px, texto de 13–14 px, interlineado ajustado y paddings reducidos para que la tarjeta no crezca más de lo necesario (~72–80 px con descripción de 2 líneas).
- Pie: botón "Guardar pedido" (ancho completo con icono), "Subtotal (2 u.) $3.00", "TOTAL $3.00", y la fila final con "Cancelar" (contorno) y "COBRAR $3.00" (verde).

## Datos demo
- Productos de la captura con foto: "7 Tortillas de Tiesto" ($2.00) y "Agua Aromática" ($1.00), más productos de relleno por categoría. Fotos generadas por imagen (2–3 imágenes pequeñas).
- Ticket inicial con los 2 productos de la captura (1 u. cada uno, total $3.00).
- Interacciones funcionales: sumar/restar cantidad, quitar producto, abrir/cerrar el ticket, chips que filtran el catálogo, buscador que filtra, botones Cobrar/Guardar con confirmación visual.

## Notas técnicas
- TanStack Start + Tailwind v4 con tokens semánticos en src/styles.css (nada de colores fijos en componentes).
- El ticket se implementa como panel inferior fijo con overlay (sin librerías extra); iconos con lucide-react.
- Fotos de producto como assets del proyecto; ruta / con head() propio (título y descripción de la app).
