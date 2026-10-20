---
title: "Inventario-POS"
date: 2026-10-19
period: 2026
role: "Proyecto personal · full stack · en desarrollo"
stack: [Django, Django REST Framework, PostgreSQL, React 19, TypeScript, PWA, IndexedDB, Vitest, pytest, Docker, GitHub Actions]
repo: https://github.com/Carlos-j24/Inventario-POS
image: /projects/inventario-pos.webp
readingTime: 5
summary: "Inventario y punto de venta para ferreterías: bodega, caja, pedidos, reportes y facturación electrónica, con una caja que sigue vendiendo aunque se caiga internet."
---

## El problema

En una ferretería el inventario casi nunca cuadra. Se compra un rollo de cable y se vende por metros, el cemento sale por bultos, y la mercancía entra, se traslada y se daña sin que quede registro. Además, si se cae internet, **la caja no puede dejar de vender**.

Inventario-POS cubre el día a día del negocio en una sola aplicación web que se instala como app: **entradas a bodega, ventas que descuentan stock, caja con arqueo, pedidos del vendedor a la caja, reportes y usuarios con roles**. Está pensado primero para ferreterías; supermercados y droguerías vienen después.

## Qué hace

- **Caja (POS)** con lector de código de barras, pago mixto (efectivo, tarjeta y transferencia), vueltas, turnos por caja física y **arqueo** con faltantes y sobrantes.
- **Pedidos**: el vendedor arma el pedido y recibe un código de 4 dígitos, y la caja lo cobra. La venta guarda quién vendió y quién cobró.
- **Bodega**: entradas, existencias con alerta de mínimo, **conteos ciegos**, ajustes que requieren aprobación y traslados entre bodegas.
- **Unidades con conversión**: se compra en rollos y se vende en metros (1 rollo = 100 m).
- **Reportes**: ventas por día, caja, vendedor y medio de pago; productos más vendidos y sin movimiento; inventario valorizado a costo promedio ponderado; márgenes; y exportación a CSV para Excel.
- **Supervisión**: anulaciones, devoluciones, bandeja de ventas para revisar, usuarios y **roles editables**.
- **Facturación electrónica DIAN** en curso: numeración por caja, documento POS y factura, notas, cola de envío, contingencia sin conexión y tiquete de 80 mm con QR. Por ahora funciona con un proveedor simulado, mientras se elige el definitivo.

## Arquitectura

```text
+---------------- Navegador (PWA React) -----------------+
| Caja · Bodega · Reportes · Administración              |
| IndexedDB: catálogo, precios y ventas pendientes       |
| Service worker: la app abre sin internet               |
+--------------+---------------------------^-------------+
               | cola de sincronización    | catálogo y stock
               | (POST idempotente)        |
+--------------v---------------------------+-------------+
| Django + DRF                                           |
| cuentas · catálogo · inventario · ventas · caja · DIAN |
| services.py: reglas de negocio en transacciones        |
+--------------+-----------------------------------------+
               |
               v
          PostgreSQL        (Docker: gunicorn + WhiteNoise)
```

## Decisiones que importan

### El inventario es un libro, no un número

El stock no se guarda como un número que se sobrescribe. Cada entrada, venta, devolución, ajuste o traslado es un **movimiento del kardex** con su costo, su usuario y su fecha real, y el saldo es una caché que solo toca una función. Esa función **bloquea la fila** mientras escribe (`select_for_update`), así dos cajas que venden el mismo producto a la vez no se pisan. Hay tests de concurrencia que solo corren contra PostgreSQL, porque SQLite ignora los bloqueos.

### Una caja sin internet sigue vendiendo

El service worker abre la app sin red, y el catálogo vive en IndexedDB. Cada venta lleva un **UUID generado en el navegador**: si no se puede enviar, queda en una cola y se reintenta sola. Si el primer envío sí llegó, el servidor la reconoce y **no la duplica**. Antes que bloquear una venta, el sistema acepta quedar con stock negativo y la marca para revisión. Lo mismo hace con las ventas sin conexión de un producto que ya se contó o se desactivó.

### Permisos fijos, roles editables

El código define permisos concretos (`inventory.receive`, `sales.void`, `reports.costs`...) y el administrador arma con ellos los roles que necesite, sin tocar el código. Quien no tiene permiso de precios puede crear un producto, pero queda **pendiente de precio** e inactivo hasta que alguien autorizado se lo ponga.

### Precios con IVA incluido

Así se exhiben los precios en una ferretería. La caja suma totales y el backend separa la base y el IVA. El dinero viaja siempre como texto con dos decimales, nunca como número de coma flotante.

## Calidad

- **455 tests en pytest** (backend) y **182 en Vitest** (frontend).
- El CI corre en cada PR con **5 controles obligatorios**: pytest en Python 3.12 y 3.14, la suite completa contra PostgreSQL, el frontend (tests y tipos) y una prueba de humo de la imagen Docker.
- Trabajo con **Spec-Driven Development**: siete specs con su plan y sus tareas, y más de 50 pull requests revisados.

## Capturas

Todas con los datos de demostración del repo (`manage.py seed_demo`): una ferretería inventada con dos semanas de ventas.

![Caja con una venta en curso de cemento, cable por metros y otros productos](/gallery/inventario-pos/caja.webp)

*La caja: cable por metros, cemento por bultos y lector de código de barras.*

![Reporte de ventas del mes por día y por medio de pago](/gallery/inventario-pos/reportes.webp)

*Reportes del mes: ventas netas, IVA, devoluciones y medios de pago.*

![Existencias con productos por debajo del mínimo resaltados](/gallery/inventario-pos/existencias.webp)

*Existencias por bodega, con aviso de lo que hay que pedir.*

![Bandeja de ventas sin conexión que necesitan revisión](/gallery/inventario-pos/revision.webp)

*Una venta hecha sin conexión con un precio distinto al del catálogo queda para revisión.*

## Lo que me llevo

1. **Un sistema sin conexión se diseña desde el primer día.** El UUID por documento y los envíos idempotentes no se pueden añadir después sin rehacer las ventas.
2. **Las pruebas tienen que correr donde corre producción.** Los bloqueos y algunos errores solo aparecieron en el job de PostgreSQL, nunca en SQLite.
3. **Un test que pasa a la primera todavía no prueba nada.** Un test de redondeo con precios redondos (3.200) pasaba siempre: el centavo perdido solo aparecía con precios como 3.199,99. Por eso cada test nuevo se comprueba metiendo un fallo a propósito.
