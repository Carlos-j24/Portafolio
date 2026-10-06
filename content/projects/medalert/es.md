---
title: "MedAlert"
date: 2026-08-02
period: 2026
role: "Proyecto personal · full stack"
stack: [Django 6, Django REST Framework, JWT, Vue 3, TypeScript, Tailwind CSS, Vitest, ReportLab]
repo: https://github.com/Carlos-j24/MedAlert
image: /projects/medalert.webp
readingTime: 4
summary: "Aplicación web para que una persona que cuida a otras lleve sus medicamentos, recordatorios y citas médicas, con avisos por WhatsApp y un reporte en PDF por paciente."
---

## El problema

Cuidar a alguien con varios tratamientos es, sobre todo, una cuestión de memoria: qué toma, a qué hora, hasta cuándo, y cuándo es la próxima cita. Si además cuidas a más de una persona, las alarmas del móvil y las notas en papel dejan de dar abasto.

MedAlert nace de ahí: una sola cuenta de **cuidador** desde la que se gestionan todos los **pacientes** a su cargo. El paciente no tiene usuario propio; todo pasa por quien lo cuida.

## Qué hace

- Varios pacientes por cuidador, sin límite.
- **Medicamentos** con frecuencia (cada 8, 12 o 24 horas), hora de la primera toma y duración del tratamiento. Con eso, la app **genera sola los recordatorios** de cada toma.
- **Citas médicas** (consulta, examen, terapia o cirugía) con dos recordatorios automáticos: uno con la antelación que elijas y otro el mismo día.
- **Avisos por WhatsApp** a la hora exacta de cada toma o cita.
- **Reporte en PDF** por paciente: medicamentos, estado del tratamiento, historial de tomas y citas.
- Recuperación de contraseña por correo, modo oscuro, búsqueda, filtros y diseño responsive.

## Arquitectura

```text
Frontend: Vue 3 + TypeScript + Vite          Backend: Django 6 + DRF
+-----------------------------------+        +-----------------------------------+
| Vistas: pacientes, medicamentos,  |  JWT   | API REST /api/                    |
| recordatorios, citas, ajustes     | -----> |  - pacientes, medicamentos        |
| axios: renueva el token solo      | <----- |  - recordatorios, citas, historial|
+-----------------------------------+  JSON  |  - PDF por paciente (ReportLab)   |
                                             | SQLite                            |
                                             +-----------------+-----------------+
                                                               |
                               manage.py enviar_recordatorios_whatsapp --loop
                                                               |
                                                    CallMeBot -> WhatsApp
```

## Decisiones que importan

### Los recordatorios los genera la API, no el usuario

Nadie quiere crear a mano tres recordatorios al día durante tres meses. Al guardar un medicamento, el backend calcula la **fecha de fin** del tratamiento y crea un recordatorio por cada toma del día a partir de la hora de inicio: si es cada 8 horas y empieza a las 06:00, salen 06:00, 14:00 y 22:00. Las citas generan los suyos igual: uno antes (en horas o días, a elegir) y otro el mismo día.

### Cada cuidador solo ve lo suyo

Todas las consultas se filtran por el usuario autenticado. Y no basta con filtrar al leer: al crear o editar un medicamento, recordatorio, cita o entrada del historial, el backend comprueba que el paciente pertenece a ese cuidador, **aunque alguien conozca el id de un paciente ajeno**. Hay tests específicos para ese aislamiento.

### Seguridad sin complicarlo

Autenticación con **JWT** (el frontend renueva el token automáticamente), **límite de intentos** en inicio de sesión, registro y recuperación de contraseña, y toda la configuración sensible por **variables de entorno**: sin `DJANGO_SECRET_KEY` en el `.env`, Django ni siquiera arranca.

### WhatsApp gratis y sin avisos repetidos

Los avisos usan **CallMeBot**, un servicio gratuito. Un comando de Django (`enviar_recordatorios_whatsapp --loop`) revisa cada minuto qué toca avisar. Para no repetir el mismo aviso, cada recordatorio guarda cuándo se notificó por última vez, y los medicamentos con el tratamiento ya terminado no se avisan.

## El bug de la zona horaria

El fallo más interesante apareció después de la versión 1.0. El servidor trabajaba en **UTC** y el código usaba `date.today()` y `datetime.now()`. En Colombia (UTC-5) eso tenía efectos raros: si un medicamento se creaba **después de las 19:00**, al editarlo su fecha de fin se movía **un día**; el PDF mostraba las horas en UTC; y todo dependía del reloj del equipo donde corriera.

La corrección tuvo tres partes:

1. `TIME_ZONE` configurable (por defecto `America/Bogota`) y, en todo el código, `timezone.localdate()` y `timezone.localtime()` en lugar de las funciones de Python.
2. Tests con **el reloj fijado**, porque el CI corre en UTC y si no, el fallo no se reproduce.
3. La regla quedó escrita en el `AGENTS.md` del proyecto, para que no vuelva a entrar.

De paso descarté una sospecha: creía que había recordatorios duplicados o saltados, y era falso; el desfase se compensaba solo. **Reproducirlo con un test antes de afirmar un fallo** me ahorró arreglar algo que no estaba roto.

## Calidad

- **47 tests en Django**: registro, aislamiento entre cuidadores, paginación, búsqueda, límites de intentos, generación de recordatorios de medicamentos y citas, WhatsApp, recuperación de contraseña, zona horaria y PDF.
- **24 tests en Vue** con Vitest.
- **GitHub Actions** ejecuta backend y frontend en cada pull request.

## Capturas

Todas con datos de demostración inventados.

![Recordatorios de medicamentos y citas, con su estado](/gallery/medalert/recordatorios.webp)

*Recordatorios generados automáticamente para medicamentos y citas.*

![Formulario para agendar una cita con recordatorios automáticos](/gallery/medalert/citas.webp)

*Al agendar una cita se eligen los recordatorios automáticos.*

![Lista de pacientes del cuidador con reporte en PDF](/gallery/medalert/pacientes.webp)

*Varios pacientes por cuidador, cada uno con su reporte en PDF.*

![Recordatorios en modo oscuro](/gallery/medalert/modo-oscuro.webp)

*Modo oscuro.*

## Lo que me llevo

1. **Las fechas sin zona horaria son un bug esperando a ocurrir.** Desde MedAlert, en cada proyecto decido la zona horaria el primer día.
2. **La autorización se comprueba al escribir, no solo al leer.** Filtrar listas no basta si alguien puede mandar el id de otro.
3. **Automatizar lo que el usuario repetiría.** Generar los recordatorios desde la API es lo que hace que la app se use de verdad.
