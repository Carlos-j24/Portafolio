---
title: "DevForge: cómo trabajo con agentes de IA sin perder el control"
date: 2026-10-05
readingTime: 5
tags: [DevForge, IA, Spec-Driven Development, PowerShell, Testing]
summary: "Lo que aprendí construyendo DevForge: un arnés para que los agentes de IA sigan las reglas de cada proyecto, specs antes que prompts y tests como única puerta de salida."
---

Los agentes de IA escriben código muy rápido. El problema no es la velocidad, es todo lo demás: cada sesión empieza de cero, no recuerdan lo que decidiste ayer, no conocen las trampas de tu proyecto y, si no les marcas límites, hacen cosas que no pediste.

Durante un tiempo resolví esto como casi todo el mundo: repitiendo el mismo contexto en cada conversación. Con DevForge quise resolverlo de verdad. Este artículo cuenta qué construí, cómo trabajo ahora y, sobre todo, qué salió en la práctica.

## Qué es DevForge

DevForge es mi ecosistema personal de desarrollo. Está escrito en PowerShell, sin dependencias externas, y hoy (v0.2.0) tiene dos módulos:

- **DevForge Doctor** diagnostica el entorno de desarrollo: Git, PowerShell 7, VS Code, Python, Node.js, Docker y Ollama. Muestra el resultado en consola o en JSON y sale con un código claro: `0` todo bien, `1` avisos, `2` error. Así lo puede leer una persona, un script o un agente. Y una regla que no se negocia: **Doctor nunca instala, cambia ni borra nada**. Diagnosticar no es modificar.
- **DevForge Init** instala un "arnés de IA" en cualquier proyecto con un solo comando, detectando su stack. Con `-Project`, Doctor revisa además que ese arnés esté sano.

## El arnés: que el agente lea las reglas antes de tocar nada

El arnés son tres archivos en la raíz del proyecto:

- **`AGENTS.md`**: las reglas del proyecto. Stack, comandos, convenciones, trampas conocidas y límites ("nunca guardes claves en el repo", "tests en verde antes de dar algo por hecho"). Es la **fuente única**: la leen Claude Code, OpenCode y cualquier agente que siga el estándar.
- **`CLAUDE.md`**: no tiene reglas propias, solo importa las otras dos. Así no hay dos versiones de la verdad que se desincronicen.
- **`MEMORY.md`**: la memoria entre sesiones. Estado actual, decisiones y por qué se tomaron, errores que no hay que repetir. Con un límite de unas 50 líneas: si la memoria crece sin control, deja de servir.

```markdown
# CLAUDE.md
Las instrucciones del proyecto viven en AGENTS.md (fuente única).

@AGENTS.md
@MEMORY.md
```

La idea es sencilla: el agente no empieza de cero, empieza leyendo lo que el proyecto ya sabe. Y cuando aprende algo nuevo, lo deja escrito para la próxima sesión.

## Specs antes que prompts

La segunda pieza es **Spec-Driven Development**. En lugar de pedirle a un agente "hazme un comando que instale el arnés", escribo primero una spec con requisitos verificables, en un formato del tipo *"CUANDO pasa X, EL SISTEMA hace Y"*:

> **RF-2:** SI un archivo del arnés ya existe, ENTONCES EL SISTEMA no lo modifica y lo informa como omitido.
>
> **RF-13:** EL SISTEMA solo escribe los archivos del arnés dentro del proyecto destino: no modifica ni borra ningún otro archivo.

Cada spec pasa por cuatro documentos: **spec** (qué y por qué), **plan** (cómo), **tareas** (en qué orden) y **validación** (cómo se comprobó cada requisito). Por encima de todo hay una **constitución** de siete principios que ninguna spec puede saltarse. El último dice: *la IA ayuda, la persona decide*. Ningún agente aprueba sus propias specs ni hace push sin revisión humana.

Lo que más me ha cambiado no es el formato, sino el momento en que se toman las decisiones. Las dudas aparecen al escribir la spec, no a mitad de la implementación. "¿Qué pasa si ya existe `CLAUDE.md`?" o "¿y si el `package.json` está mal formado?" se resuelven antes de escribir una línea de código, y quedan apuntadas como casos límite con su test.

## Tests como única puerta

Ninguna tarea se da por terminada con tests en rojo. DevForge tiene tests en Pester que corren en PowerShell 7 y en Windows PowerShell 5.1, y GitHub Actions los ejecuta en cada pull request. Sin CI en verde, no se fusiona.

Hay una regla que aprendí por las malas: **si un test pasa a la primera, no me lo creo**. Meto un fallo a propósito en el código (por ejemplo, que Init ignore `-WhatIf` y escriba igualmente) y compruebo que el test lo detecta. Si no lo detecta, el test no estaba probando nada.

## Lo que salió en la práctica

Aquí está lo interesante. Las herramientas no solo hicieron lo que decía la spec: destaparon problemas reales.

- **Init encontró basura en MedAlert.** Lo primero que hice al usarlo en un proyecto real fue simularlo con `-WhatIf`. Detectó Node.js en la raíz de MedAlert, cuando el frontend está en `frontend/`. Era un `package.json` sobrante de un `npm install` lanzado en la carpeta equivocada. Init hizo exactamente lo que decía la spec, y eso sacó a la luz un problema del proyecto.
- **Rellenar el arnés encontró un bug.** Init deja marcadores `[COMPLETAR]` en lo que no puede deducir. Al completarlos leyendo el código de MedAlert apareció un posible fallo de zona horaria en el envío de recordatorios por WhatsApp. Quedó apuntado en su `MEMORY.md`.
- **Doctor me dio un falso positivo a mí mismo.** Al revisar el arnés de DevForge, avisó de un marcador pendiente en `MEMORY.md`. No lo era: yo había escrito el marcador de forma literal al describir una tarea. Doctor cumplía la spec (contar el texto), pero la spec se quedaba corta. Ya está apuntado como idea para una spec futura: ignorar los marcadores escritos como código.
- **Las trampas de Windows van al `AGENTS.md`.** Carpetas que se creaban como archivos vacíos porque faltaba `-ItemType Directory`. Tildes rotas en PowerShell 5.1 porque los `.ps1` necesitan UTF-8 *con* BOM. Funciones de .NET que no conocen la carpeta actual de PowerShell. Cada una de estas cosas pasó una vez y ahora está escrita donde el agente la lee antes de empezar.

## Lo que me llevo

1. **El contexto se escribe, no se repite.** Si tengo que explicarle algo a un agente dos veces, va al `AGENTS.md` o al `MEMORY.md`.
2. **Una spec es un prompt que sobrevive a la sesión.** Y además se puede revisar, discutir y validar.
3. **Los contratos públicos no se tocan a la ligera.** Los códigos de salida y el esquema JSON de Doctor solo cambian con una versión mayor, porque hay scripts y agentes que dependen de ellos.
4. **La IA acelera, pero el criterio sigue siendo mío.** Los agentes escriben gran parte del código; yo decido qué se construye, reviso cada PR y no fusiono nada en rojo.

## Qué sigue

La próxima versión, la v0.3.0 *Professional Workspace*, se centra en preparar el entorno completo: configuración de VS Code, extensiones recomendadas y modelos locales con Ollama, Continue y Cline.

El código está en GitHub: [Carlos-j24/DevForge](https://github.com/Carlos-j24/DevForge). Si trabajas con agentes de IA y tienes tu propia forma de mantenerlos a raya, me encantaría conocerla.
