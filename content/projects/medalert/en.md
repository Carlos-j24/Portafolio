---
title: "MedAlert"
date: 2026-08-02
period: 2026
role: "Personal project · full stack"
stack: [Django 6, Django REST Framework, JWT, Vue 3, TypeScript, Tailwind CSS, Vitest, ReportLab]
repo: https://github.com/Carlos-j24/MedAlert
image: /projects/medalert.webp
readingTime: 4
summary: "A web app for people who care for others to track their medications, reminders and medical appointments, with WhatsApp alerts and a PDF report per patient."
---

## The problem

Caring for someone on several treatments is, above all, a memory problem: what they take, at what time, until when, and when the next appointment is. If you care for more than one person, phone alarms and paper notes stop being enough.

That's where MedAlert comes from: a single **caregiver** account that manages all the **patients** in their care. Patients don't have their own login; everything goes through the person caring for them.

## What it does

- Multiple patients per caregiver, no limit.
- **Medications** with a frequency (every 8, 12 or 24 hours), time of the first dose and treatment length. From that, the app **generates the reminders** for every dose on its own.
- **Medical appointments** (consultation, exam, therapy or surgery) with two automatic reminders: one as far in advance as you choose and one on the day.
- **WhatsApp alerts** at the exact time of each dose or appointment.
- **PDF report** per patient: medications, treatment status, dose history and appointments.
- Password recovery by email, dark mode, search, filters and a responsive layout.

## Architecture

```text
Frontend: Vue 3 + TypeScript + Vite          Backend: Django 6 + DRF
+-----------------------------------+        +-----------------------------------+
| Views: patients, medications,     |  JWT   | REST API /api/                    |
| reminders, appointments, settings | -----> |  - patients, medications          |
| axios: refreshes the token itself | <----- |  - reminders, appointments        |
+-----------------------------------+  JSON  |  - dose history                   |
                                             |  - PDF per patient (ReportLab)    |
                                             | SQLite                            |
                                             +-----------------+-----------------+
                                                               |
                               manage.py enviar_recordatorios_whatsapp --loop
                                                               |
                                                    CallMeBot -> WhatsApp
```

## Decisions that matter

### The API generates the reminders, not the user

Nobody wants to create three reminders a day by hand for three months. When a medication is saved, the backend works out the treatment's **end date** and creates one reminder per daily dose starting from the first-dose time: every 8 hours from 06:00 gives 06:00, 14:00 and 22:00. Appointments generate theirs the same way: one in advance (hours or days, your choice) and one on the day.

### Each caregiver only sees their own data

Every query is filtered by the authenticated user. And filtering on read isn't enough: when creating or editing a medication, reminder, appointment or history entry, the backend checks the patient belongs to that caregiver, **even if someone knows another patient's id**. There are dedicated tests for that isolation.

### Security without overcomplicating it

**JWT** authentication (the frontend refreshes the token automatically), **rate limiting** on login, sign-up and password recovery, and every sensitive setting in **environment variables**: without `DJANGO_SECRET_KEY` in `.env`, Django won't even start.

### Free WhatsApp alerts, never repeated

Alerts go through **CallMeBot**, a free service. A Django command (`enviar_recordatorios_whatsapp --loop`) checks every minute what is due. To avoid repeating an alert, each reminder stores when it was last notified, and medications whose treatment has ended are skipped.

## The time-zone bug

The most interesting bug showed up after version 1.0. The server ran in **UTC** and the code used `date.today()` and `datetime.now()`. In Colombia (UTC-5) that had odd effects: if a medication was created **after 7 p.m.**, editing it moved its end date by **one day**; the PDF showed times in UTC; and everything depended on the clock of the machine it ran on.

The fix had three parts:

1. A configurable `TIME_ZONE` (defaulting to `America/Bogota`) and, everywhere in the code, `timezone.localdate()` and `timezone.localtime()` instead of Python's functions.
2. Tests with **a frozen clock**, because CI runs in UTC and otherwise the bug doesn't reproduce.
3. The rule is written down in the project's `AGENTS.md` so it doesn't creep back in.

Along the way I ruled out a suspicion: I thought reminders were being duplicated or skipped, and it was false; the offset cancelled itself out. **Reproducing it with a test before claiming a bug** saved me from fixing something that wasn't broken.

## Quality

- **47 Django tests**: sign-up, isolation between caregivers, pagination, search, rate limits, reminder generation for medications and appointments, WhatsApp, password recovery, time zone and PDF.
- **24 Vue tests** with Vitest.
- **GitHub Actions** runs backend and frontend on every pull request.

## Screenshots

All with made-up demo data.

![Medication and appointment reminders with their status](/gallery/medalert/recordatorios.webp)

*Reminders generated automatically for medications and appointments.*

![Form to book an appointment with automatic reminders](/gallery/medalert/citas.webp)

*Booking an appointment includes its automatic reminders.*

![The caregiver's patient list with PDF reports](/gallery/medalert/pacientes.webp)

*Several patients per caregiver, each with a PDF report.*

![Reminders in dark mode](/gallery/medalert/modo-oscuro.webp)

*Dark mode.*

## What I take away

1. **Dates without a time zone are a bug waiting to happen.** Since MedAlert, I decide the time zone on day one of every project.
2. **Authorization is checked on write, not just on read.** Filtering lists isn't enough if someone can send another user's id.
3. **Automate what the user would repeat.** Generating reminders from the API is what makes the app actually get used.
