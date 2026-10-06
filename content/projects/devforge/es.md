---
title: "DevForge"
date: 2026-10-05
period: 2026
role: "Proyecto personal · en desarrollo"
stack: [PowerShell 7, Windows PowerShell 5.1, Pester, GitHub Actions, Spec-Driven Development]
repo: https://github.com/Carlos-j24/DevForge
image: /projects/devforge.webp
readingTime: 4
summary: "Ecosistema de desarrollo personal en PowerShell: Doctor diagnostica el entorno sin tocar nada e Init instala en cualquier proyecto un arnés para que los agentes de IA sigan sus reglas."
---

## El problema

Antes de empezar a trabajar en un proyecto hay dos preguntas que siempre vuelven: **¿tengo todo lo que necesito instalado?** y, desde que trabajo con agentes de IA, **¿sabe el agente cómo funciona este proyecto?** La primera se resolvía probando comandos a mano; la segunda, repitiendo el mismo contexto en cada conversación.

DevForge responde a las dos con dos herramientas de línea de comandos, escritas en PowerShell y **sin dependencias externas**.

## Qué hace (v0.2.0)

- **DevForge Doctor** revisa Git, PowerShell 7, VS Code, Python, Node.js, Docker y Ollama, y da un estado global: listo, listo con avisos o con errores. Funciona en consola y con `-Json` para scripts y agentes. Con `-Project <ruta>` revisa además el arnés de IA de un proyecto.
- **DevForge Init** instala ese arnés (`AGENTS.md`, `CLAUDE.md` y `MEMORY.md`) en cualquier proyecto, **detectando su stack** (Django, Python, Vue, Node.js, PowerShell) en la raíz y en las subcarpetas de primer nivel, con sus comandos de tests.

![DevForge Init simulando la instalación del arnés en un proyecto Django + Vue](/gallery/devforge/init.webp)

*Init con `-WhatIf`: detecta Django y Vue en subcarpetas y enseña lo que haría sin escribir nada.*

## Arquitectura

```text
scripts/
  core/     ToolCheck (modelo común) y salida por consola
  doctor/   Invoke-DevForgeDoctor.ps1
              checks -> ToolCheck[] -> consola | JSON | código de salida
  init/     Invoke-DevForgeInit.ps1
              detección de stack -> plantillas -> AGENTS.md, CLAUDE.md, MEMORY.md
templates/harness/   plantillas editables del arnés
specs/NNN-*/         spec, plan, tareas y validación de cada módulo
tests/               Pester, en PowerShell 7 y en Windows PowerShell 5.1
```

## Decisiones que importan

### Diagnosticar no es modificar

Es el primer principio de la constitución del proyecto: **un check nunca instala, cambia ni borra nada**. Doctor se puede ejecutar en cualquier máquina sin miedo, y cualquier reparación futura será explícita, opcional y pedirá confirmación.

### Lógica separada de la presentación

Cada comprobación devuelve un objeto `ToolCheck` (nombre, categoría, versión, si es obligatoria, estado y mensaje) y **solo el orquestador imprime**. Gracias a eso, la consola y el JSON salen de los mismos datos, y los tests prueban la lógica sin leer texto de la pantalla.

### Contratos que no se rompen

Los códigos de salida (`0` todo bien, `1` avisos, `2` errores) y el esquema del JSON son **contrato público**: hay scripts y agentes que dependen de ellos. Por eso solo crecen de forma compatible. Cuando Doctor aprendió a revisar el arnés, lo hizo con una categoría nueva (`HARNESS`) que no cambia nada de lo anterior.

### Init seguro por diseño

Init **solo escribe esos tres archivos**, nunca pisa uno existente sin `-Force`, ejecutarlo dos veces no cambia nada y con `-WhatIf` enseña lo que haría saliendo con el mismo código que la ejecución real. Hay un test que fotografía la carpeta antes y después para demostrar que no toca nada más.

### Compatible con Windows PowerShell 5.1

Muchos equipos con Windows siguen teniendo solo la versión 5.1. Mantener la compatibilidad trajo un aprendizaje: los `.ps1` con tildes deben guardarse en **UTF-8 con BOM**, o 5.1 los lee mal ("estÃ¡").

## Cómo se construyó

Con **Spec-Driven Development**: cada módulo tiene su spec con requisitos verificables, un plan, tareas y un documento de **validación** que enlaza cada requisito con su test. Van tres specs: Doctor (escrita después del código y mantenida al día), Init y la revisión del arnés. Si un test pasa a la primera, se rompe el código a propósito para comprobar que el test lo detecta.

El resultado: **116 tests en Pester**, que GitHub Actions ejecuta en PowerShell 7 y en 5.1 en cada pull request.

Cuento el lado del trabajo con agentes de IA en el artículo [DevForge: cómo trabajo con agentes de IA sin perder el control](/blog/devforge-ia-con-specs).

## Uso real

El primer proyecto real fue MedAlert. Init con `-WhatIf` destapó un `package.json` sobrante en su raíz, y al completar el arnés apareció un fallo de zona horaria en el envío de recordatorios. Doctor, a su vez, dio un falso positivo en el propio DevForge que ya está apuntado para una próxima spec.

## Lo que sigue

La versión 0.3.0, **Professional Workspace**, se centra en dejar listo el entorno completo: configuración de VS Code, extensiones recomendadas y modelos locales con Ollama, Continue y Cline.
