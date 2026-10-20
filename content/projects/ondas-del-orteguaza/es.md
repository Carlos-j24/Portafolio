---
title: "Ondas del Orteguaza"
date: 2026-10-09
period: 2026
role: "Web y app Android · en producción"
stack: [HTML5, CSS3, JavaScript, PWA, Service Worker, Media Session API, Netlify, Kotlin, Android]
repo: https://github.com/Carlos-j24/ondas-del-orteguaza
image: /projects/ondas-del-orteguaza.webp
readingTime: 4
summary: "Web y app Android de una radio cristiana de Florencia, Caquetá: transmisión en vivo que se reconecta sola, parrilla, agenda de actividades y peticiones de oración."
---

## El problema

Ondas del Orteguaza es una radio cristiana de Florencia, Caquetá, que transmite por internet. Sus oyentes escuchan sobre todo **desde el celular**, muchas veces con datos móviles inestables. Necesitaban un sitio donde darle play sin complicaciones, ver qué programa está al aire, enterarse de las actividades y enviar peticiones de oración. También querían una app en Google Play.

## Qué hace

- **Reproductor en vivo** con indicador "En vivo ahora": muestra el programa que está al aire según la hora de Colombia.
- **Parrilla de programación** de la semana, con el día de hoy resaltado.
- **Próximas actividades** con fecha, lugar y afiche.
- **Versículo del día**, rotando entre una lista.
- **Peticiones de oración** con consentimiento y política de privacidad.
- **Compartir por WhatsApp** y enlace a la **app de Google Play**.
- Se instala como app (PWA) y abre aunque no haya conexión.
- Una **app Android nativa** en Kotlin, publicada en Google Play.

## Arquitectura

```text
       content.json (parrilla, actividades, versículos, enlaces)
             |                               |
+------------v---------------+  +------------v------------------+
| Web (PWA, un solo HTML)    |  | App Android (Kotlin)          |
| reproductor + Media        |  | MediaPlayer en un servicio    |
| Session API                |  | en primer plano, notificación |
| service worker propio      |  | y foco de audio               |
+------------+---------------+  +------------+------------------+
             |                               |
             +---------------+---------------+
                             v
                Transmisión en vivo (Zeno.fm)

GitHub (main) --push--> Netlify publica la web sola
```

## Decisiones que importan

### Un solo archivo de contenido para la web y la app

La parrilla, las actividades, los versículos y los enlaces viven en `content.json`. La web lo lee, y la **app Android lo descarga de la web**. Así, para anunciar una actividad se cambia un solo archivo y aparece en los dos sitios, sin publicar una versión nueva de la app. Por eso hay campos que no se pueden quitar: la app los exige.

### La transmisión se reconecta sola

En datos móviles, el audio se corta. El reproductor reconecta **solo la transmisión**, sin recargar la página: hace 4 reintentos (a los 2, 4, 8 y 16 segundos), detecta una conexión colgada a los 15 segundos y vuelve a sonar al recuperar internet. Si una llamada o los controles del sistema pausan el audio, la interfaz deja de marcar "reproduciendo".

### Sin compilación ni framework

La web es HTML, CSS y JavaScript sin dependencias. Netlify publica la raíz del repositorio tal cual en cada push a `main`. El service worker usa estrategias distintas según el contenido: para las páginas y `content.json` va primero a la red (con 4 segundos de límite), para las imágenes usa la copia guardada y la actualiza por detrás, y **nunca guarda el audio en vivo**.

### Hecha para cada dispositivo

El programa "en vivo" y el día "Hoy" usan la **hora de Bogotá**, no la del celular. En iOS se oculta el control de volumen, porque Safari no deja cambiarlo desde la web. Dentro de la app Android se oculta el formulario de oración, como dice su política de privacidad.

## Capturas

![Parrilla de programación semanal con el día de hoy resaltado](/gallery/ondas-del-orteguaza/parrilla.webp)

*Parrilla de la semana. Es provisional: se cambiará por la programación real.*

![Tres pantallas en el celular: inicio, parrilla y actividades](/gallery/ondas-del-orteguaza/movil.webp)

*En el celular, donde la escucha la mayoría de oyentes.*

![Próximas actividades con afiche y formulario de petición de oración](/gallery/ondas-del-orteguaza/actividades-oracion.webp)

*Actividades con su afiche y peticiones de oración con consentimiento.*

## Lo que me llevo

1. **Diseñar para la red real del usuario.** La reconexión automática importa más que cualquier animación cuando se escucha con datos móviles.
2. **Separar el contenido del código.** Con `content.json`, la emisora actualiza la web y la app sin tocar código ni publicar versiones.
3. **Lo simple también se versiona.** Aunque sea un solo HTML, cada cambio va por rama, pull request y despliegue automático desde `main`.
